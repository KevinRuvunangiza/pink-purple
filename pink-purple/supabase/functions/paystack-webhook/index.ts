// supabase/functions/paystack-webhook/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-paystack-signature",
};

interface PaystackEvent {
  event: string;
  data: {
    reference: string;
    amount: number;
    status: string;
    paid_at: string;
    customer: {
      email: string;
    };
    metadata?: {
      submission_id?: string;
      service_type?: string;
    };
  };
}

function verifyPaystackSignature(body: string, signature: string, secret: string): boolean {
  const hash = createHmac("sha512", secret).update(body).digest("hex");
  return hash === signature;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get Paystack signature from headers
    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      console.error("Missing Paystack signature");
      return new Response(
        JSON.stringify({ error: "Missing signature" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get request body as text for signature verification
    const bodyText = await req.text();
    
    // Verify Paystack signature
    const paystackSecret = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecret) {
      console.error("PAYSTACK_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isValid = verifyPaystackSignature(bodyText, signature, paystackSecret);
    if (!isValid) {
      console.error("Invalid Paystack signature");
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the verified body
    const event: PaystackEvent = JSON.parse(bodyText);
    
    console.log("Paystack event received:", {
      event: event.event,
      reference: event.data.reference,
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase configuration missing");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Handle charge.success event
    if (event.event === "charge.success") {
      const { reference, amount, status, paid_at, customer, metadata } = event.data;

      // Convert amount from kobo to naira
      const amountInNaira = amount / 100;

      console.log("Processing payment:", {
        reference,
        amountInNaira,
        email: customer.email,
      });

      // Check if payment already exists
      const { data: existingPayment, error: checkError } = await supabase
        .from("payments")
        .select("id")
        .eq("paystack_reference", reference)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error("Error checking existing payment:", checkError);
      }

      if (existingPayment) {
        console.log("Payment already processed:", reference);
        return new Response(
          JSON.stringify({ message: "Payment already processed" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get submission_id from metadata or find by email
      let submissionId = metadata?.submission_id;

      if (!submissionId) {
        console.log("Searching submission by email:", customer.email);
        
        // Try to find submission by email
        const { data: submission, error: submissionError } = await supabase
          .from("submissions")
          .select("id")
          .eq("email", customer.email)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (submissionError) {
          console.warn("Could not find submission by email:", submissionError.message);
        } else if (submission) {
          submissionId = submission.id;
          console.log("Found submission:", submissionId);
        }
      }

      // Insert payment record
      const paymentData = {
        submission_id: submissionId || null,
        amount: amountInNaira,
        status: status === "success" ? "paid" : "failed",
        reference: reference,
        paystack_reference: reference,
        payment_method: "paystack",
        metadata: metadata || {},
        paid_at: paid_at,
      };

      console.log("Inserting payment data");

      const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .insert(paymentData)
        .select()
        .single();

      if (paymentError) {
        console.error("Error inserting payment:", {
          code: paymentError.code,
          message: paymentError.message,
        });
        return new Response(
          JSON.stringify({ 
            error: "Failed to record payment",
            details: paymentError.message 
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("Payment inserted successfully:", payment.id);

      // Update submission status to 'paid' if submission exists
      if (submissionId) {
        console.log("Updating submission status:", submissionId);
        
        const { data: submission, error: fetchError } = await supabase
          .from("submissions")
          .select("name, email, company_name")
          .eq("id", submissionId)
          .single();

        const { error: updateError } = await supabase
          .from("submissions")
          .update({ 
            status: "paid",
            updated_at: new Date().toISOString(),
          })
          .eq("id", submissionId);

        if (updateError) {
          console.error("Error updating submission:", updateError.message);
        } else {
          console.log("Submission updated successfully");

          // Sync to MailerLite if we have the submission details
          if (!fetchError && submission) {
            console.log("Syncing to MailerLite...");
            try {
              const mailerliteResponse = await fetch(
                "https://api.mailerlite.com/api/v1/subscribers",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "X-MailerLite-ApiKey": Deno.env.get("MAILERLITE_API_KEY") || "",
                  },
                  body: JSON.stringify({
                    email: submission.email,
                    name: submission.name,
                    fields: {
                      business_name: submission.company_name || "",
                      payment_status: "paid",
                      last_updated: new Date().toISOString(),
                    },
                  }),
                }
              );

              if (mailerliteResponse.ok) {
                console.log("MailerLite synced successfully for:", submission.email);
              } else {
                console.warn("MailerLite sync failed:", await mailerliteResponse.text());
              }
            } catch (mlError) {
              console.warn("Error syncing to MailerLite:", mlError);
            }
          }
        }
      }

      console.log("Payment processed successfully:", payment.id);

      return new Response(
        JSON.stringify({ 
          success: true, 
          payment_id: payment.id,
          message: "Payment recorded successfully" 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Handle other events if needed
    console.log("Unhandled event type:", event.event);
    return new Response(
      JSON.stringify({ message: "Event received" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Webhook error:", {
      message: error.message,
    });
    return new Response(
      JSON.stringify({ 
        error: error.message,
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
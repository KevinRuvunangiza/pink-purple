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

  console.log("🎯 Webhook received:", {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries()),
  });

  try {
    // Get Paystack signature from headers
    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      console.error("❌ Missing Paystack signature");
      return new Response(
        JSON.stringify({ error: "Missing signature" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get request body as text for signature verification
    const bodyText = await req.text();
    console.log("📦 Raw body received:", bodyText);
    
    // Verify Paystack signature
    const paystackSecret = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecret) {
      console.error("❌ PAYSTACK_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isValid = verifyPaystackSignature(bodyText, signature, paystackSecret);
    if (!isValid) {
      console.error("❌ Invalid Paystack signature");
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Signature verified successfully");

    // Parse the verified body
    const event: PaystackEvent = JSON.parse(bodyText);
    
    console.log("📨 Paystack event received:", {
      event: event.event,
      reference: event.data.reference,
      amount: event.data.amount,
      status: event.data.status,
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("❌ Supabase configuration missing");
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

      console.log("💰 Processing payment:", {
        reference,
        amountInNaira,
        email: customer.email,
        metadata,
      });

      // Check if payment already exists
      const { data: existingPayment, error: checkError } = await supabase
        .from("payments")
        .select("id")
        .eq("paystack_reference", reference)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error("❌ Error checking existing payment:", checkError);
      }

      if (existingPayment) {
        console.log("⚠️ Payment already processed:", reference);
        return new Response(
          JSON.stringify({ message: "Payment already processed" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get submission_id from metadata or find by email
      let submissionId = metadata?.submission_id;

      if (!submissionId) {
        console.log("🔍 Submission ID not in metadata, searching by email:", customer.email);
        
        // Try to find submission by email
        const { data: submission, error: submissionError } = await supabase
          .from("submissions")
          .select("id")
          .eq("email", customer.email)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (submissionError) {
          console.warn("⚠️ Could not find submission by email:", submissionError);
        } else if (submission) {
          submissionId = submission.id;
          console.log("✅ Found submission:", submissionId);
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

      console.log("💾 Inserting payment data:", paymentData);

      const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .insert(paymentData)
        .select()
        .single();

      if (paymentError) {
        console.error("❌ Error inserting payment:", {
          error: paymentError,
          code: paymentError.code,
          message: paymentError.message,
          details: paymentError.details,
          hint: paymentError.hint,
        });
        return new Response(
          JSON.stringify({ 
            error: "Failed to record payment",
            details: paymentError.message 
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("✅ Payment inserted successfully:", payment.id);

      // Update submission status to 'paid' if submission exists
      if (submissionId) {
        console.log("📝 Updating submission status:", submissionId);
        
        const { error: updateError } = await supabase
          .from("submissions")
          .update({ 
            status: "paid",
            updated_at: new Date().toISOString(),
          })
          .eq("id", submissionId);

        if (updateError) {
          console.error("❌ Error updating submission:", updateError);
        } else {
          console.log("✅ Submission updated successfully");
        }
      }

      console.log("🎉 Payment processed successfully:", payment.id);

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
    console.log("ℹ️ Unhandled event type:", event.event);
    return new Response(
      JSON.stringify({ message: "Event received" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("💥 Webhook error:", {
      error: error,
      message: error.message,
      stack: error.stack,
    });
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
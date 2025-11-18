import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

interface RequestBody {
  email: string;
  name?: string;
  businessName?: string;
  reminderTime: string;
}

const handler: Handler = async (event) => {
  // Add CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body: RequestBody = JSON.parse(event.body || "{}");
    const { email, name, businessName, reminderTime } = body;

    // Validate email
    if (!email || !email.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Email is required" }),
      };
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!MAILERLITE_API_KEY) {
      console.error("MAILERLITE_API_KEY is not set in environment variables");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server configuration error" }),
      };
    }

    // Calculate reminder date based on selection
    const getReminderDate = (option: string): string => {
      const now = new Date();
      switch (option) {
        case "3days":
          now.setDate(now.getDate() + 3);
          break;
        case "1week":
          now.setDate(now.getDate() + 7);
          break;
        case "2weeks":
          now.setDate(now.getDate() + 14);
          break;
        case "1month":
          now.setDate(now.getDate() + 30);
          break;
        default:
          now.setDate(now.getDate() + 1);
      }
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
    };

    // Prepare subscriber data for MailerLite API
    // Only includes fields that exist in your MailerLite account
    const subscriberData = {
      email: email.trim(),
      fields: {
        name: name || "",
        business_name: businessName || "",
        reminder_date: getReminderDate(reminderTime),
        payment_status: "pending",
      },
      groups: [MAILERLITE_GROUP_ID],
      status: "active",
    };

    console.log(
      "Sending to MailerLite:",
      JSON.stringify(subscriberData, null, 2)
    );

    // Call MailerLite API to add/update subscriber
    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
          Accept: "application/json",
        },
        body: JSON.stringify(subscriberData),
      }
    );

    const responseText = await response.text();
    console.log("MailerLite response status:", response.status);
    console.log("MailerLite response body:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse MailerLite response:", responseText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Invalid response from MailerLite",
          details: responseText,
        }),
      };
    }

    if (!response.ok) {
      console.error("MailerLite API error:", data);
      console.error("Full error details:", JSON.stringify(data, null, 2));

      // Handle duplicate subscriber - update instead
      if (response.status === 422 || response.status === 409) {
        // Try to update the subscriber instead
        const updateResponse = await fetch(
          `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(
            email
          )}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${MAILERLITE_API_KEY}`,
              Accept: "application/json",
            },
            body: JSON.stringify({
              fields: subscriberData.fields,
              groups: [MAILERLITE_GROUP_ID],
            }),
          }
        );

        const updateResponseText = await updateResponse.text();
        console.log("Update response status:", updateResponse.status);
        console.log("Update response body:", updateResponseText);

        if (updateResponse.ok) {
          const updateData = JSON.parse(updateResponseText);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              message: "Subscriber updated successfully",
              data: updateData,
            }),
          };
        } else {
          console.error("Update failed:", updateResponseText);
        }
      }

      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: "Failed to add subscriber to MailerLite",
          message: data.message || "Validation error",
          details: data.errors || data,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Subscriber added successfully",
        data,
      }),
    };
  } catch (error) {
    console.error("Error in add-mailerlite-subscriber function:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};

export { handler };

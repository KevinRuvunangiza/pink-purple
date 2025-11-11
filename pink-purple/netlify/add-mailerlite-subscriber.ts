import { Handler } from "@netlify/functions";

interface RequestBody {
  email: string;
  name?: string;
  businessName?: string;
  address?: string;
  reminderTime: string;
}

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body: RequestBody = JSON.parse(event.body || "{}");
    const { email, name, businessName, address, reminderTime } = body;

    // Validate email
    if (!email || !email.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required" }),
      };
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

    if (!MAILERLITE_API_KEY) {
      console.error("MAILERLITE_API_KEY is not set");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server configuration error" }),
      };
    }

    // Calculate reminder date based on selection
    const getReminderDate = (option: string): string => {
      const now = new Date();
      switch (option) {
        case "tomorrow":
          now.setDate(now.getDate() + 1);
          break;
        case "3days":
          now.setDate(now.getDate() + 3);
          break;
        case "1week":
          now.setDate(now.getDate() + 7);
          break;
        default:
          now.setDate(now.getDate() + 1);
      }
      return now.toISOString();
    };

    // Prepare subscriber data for MailerLite API
    const subscriberData = {
      email: email.trim(),
      fields: {
        name: name || "",
        business_name: businessName || "",
        address: address || "",
        reminder_date: getReminderDate(reminderTime),
        payment_status: "NOT PAID",
      },
      groups: ["Reminders"], // Add to Reminders group
      status: "active",
    };

    // Call MailerLite API to add subscriber
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        Accept: "application/json",
      },
      body: JSON.stringify(subscriberData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("MailerLite API error:", errorData);
      
      // Handle duplicate subscriber gracefully
      if (response.status === 422 && errorData.message?.includes("already exists")) {
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            success: true,
            message: "Subscriber already exists, reminder updated",
          }),
        };
      }

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "Failed to add subscriber to MailerLite",
          details: errorData,
        }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
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
      body: JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};

export { handler };
// netlify/functions/update-mailerlite-status.ts

import { Handler } from '@netlify/functions';

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, status, name, businessName } = JSON.parse(event.body || '{}');

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    if (!MAILERLITE_API_KEY) {
      console.error('MailerLite API key not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'MailerLite not configured' }),
      };
    }

    // Update subscriber fields in MailerLite
    const response = await fetch(
      'https://connect.mailerlite.com/api/subscribers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          fields: {
            name: name || '',
            business_name: businessName || '',
            payment_status: status || 'pending', // Changed from 'status' to 'payment_status'
            last_updated: new Date().toISOString(),
          },
          groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : undefined,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error('MailerLite API error:', responseData);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'Failed to update MailerLite',
          details: responseData,
        }),
      };
    }

    console.log('Updated MailerLite subscriber:', email);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'MailerLite updated successfully',
        data: responseData,
      }),
    };
  } catch (error: any) {
    console.error('Error updating MailerLite:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
    };
  }
};
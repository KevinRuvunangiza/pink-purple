// src/utils/formSubmission.ts

import { ApiService } from '../services/api.service';

interface ReminderFormData {
  name?: string;
  email: string;
  businessName?: string;
  reminderTime: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceType: string;
  message?: string;
}

function calculateReminderDate(option: string): string {
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
  return now.toISOString();
}

export async function saveReminderForm(formData: ReminderFormData): Promise<void> {
  const errors: string[] = [];
  let submissionId: string | null = null;

  // Save to Supabase first (most important)
  try {
    const { data, error } = await supabase
      name: formData.name || 'Not provided',
      email: formData.email,
      company_name: formData.businessName,
      service_type: 'Reminder Request',
      reminder_date: calculateReminderDate(formData.reminderTime),
    });
    
    const submission = await ApiService.createSubmission({
      name: formData.name || 'Not provided',
      email: formData.email,
      company_name: formData.businessName,
      service_type: 'Reminder Request',
      reminder_date: calculateReminderDate(formData.reminderTime),
      status: 'pending',
      source: 'reminder_form',
    });
    
    submissionId = submission.id;
  } catch (error: any) {
    console.error('Failed to save to database:', error.message);
    errors.push('Failed to save to database: ' + error.message);
  }

  // Save to MailerLite (secondary)
  try {
    const response = await fetch('/.netlify/functions/add-mailerlite-subscriber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        submissionId, // Include DB ID for reference
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(`MailerLite API error: ${response.status} - ${JSON.stringify(responseData)}`);
    }
  } catch (error: any) {
    console.error('❌ MailerLite save failed:', error);
    errors.push('Failed to add to mailing list: ' + error.message);
  }

  // Handle errors
  if (errors.length === 2) {
    throw new Error('Failed to save data: ' + errors.join(', '));
  }

  if (errors.length === 1) {
    console.warn('Partial save:', errors[0]);
    // Don't throw if DB saved successfully but MailerLite failed
    if (!submissionId) {
      throw new Error(errors[0]);
    }
  }
}

export async function saveContactForm(formData: ContactFormData): Promise<void> {
  const errors: string[] = [];
  let submissionId: string | null = null;

  try {
    console.log('💾 Saving contact form to Supabase...');
    
    const submission = await ApiService.createSubmission({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company_name: formData.companyName,
      service_type: formData.serviceType,
      message: formData.message,
      status: 'pending',
      source: 'landing_page',
    });
    
    submissionId = submission.id;
  } catch (error: any) {
    console.error('Failed to save to database:', error.message);
    errors.push('Failed to save to database: ' + error.message);
  }

  try {
    const response = await fetch('/.netlify/functions/add-mailerlite-subscriber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.name,
        businessName: formData.companyName,
        submissionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`MailerLite API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }
  } catch (error: any) {
    console.error('Failed to save to MailerLite:', error.message);
    errors.push('Failed to add to mailing list: ' + error.message);
  }

  if (errors.length === 2) {
    throw new Error('Failed to save data: ' + errors.join(', '));
  }

  if (errors.length === 1) {
    console.warn('⚠️ Partial save:', errors[0]);
    if (!submissionId) {
      throw new Error(errors[0]);
    }
  }
}
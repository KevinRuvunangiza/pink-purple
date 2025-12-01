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

// Calculate reminder date
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
  return now.toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

// Save reminder form to both systems
export async function saveReminderForm(formData: ReminderFormData): Promise<void> {
  const errors: string[] = [];

  // 1. Save to Supabase
  try {
    await ApiService.createSubmission({
      name: formData.name || '',
      email: formData.email,
      company_name: formData.businessName,
      service_type: 'Reminder Request',
      reminder_date: calculateReminderDate(formData.reminderTime),
      status: 'pending',
      source: 'reminder_form',
    });
    console.log('✅ Saved to Supabase');
  } catch (error) {
    console.error('❌ Supabase save failed:', error);
    errors.push('Failed to save to database');
  }

  // 2. Save to MailerLite
  try {
    const response = await fetch('/.netlify/functions/add-mailerlite-subscriber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`MailerLite API error: ${response.status}`);
    }

    console.log('✅ Saved to MailerLite');
  } catch (error) {
    console.error('❌ MailerLite save failed:', error);
    errors.push('Failed to add to mailing list');
  }

  // If both failed, throw error
  if (errors.length === 2) {
    throw new Error('Failed to save data: ' + errors.join(', '));
  }

  // If only one failed, log warning but don't throw
  if (errors.length === 1) {
    console.warn('⚠️ Partial save:', errors[0]);
  }
}

// Save contact form to both systems
export async function saveContactForm(formData: ContactFormData): Promise<void> {
  const errors: string[] = [];

  // 1. Save to Supabase
  try {
    await ApiService.createSubmission({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company_name: formData.companyName,
      service_type: formData.serviceType,
      message: formData.message,
      status: 'pending',
      source: 'landing_page',
    });
    console.log('✅ Saved to Supabase');
  } catch (error) {
    console.error('❌ Supabase save failed:', error);
    errors.push('Failed to save to database');
  }

  // 2. Save to MailerLite
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
        // Add any other fields your MailerLite function expects
      }),
    });

    if (!response.ok) {
      throw new Error(`MailerLite API error: ${response.status}`);
    }

    console.log('✅ Saved to MailerLite');
  } catch (error) {
    console.error('❌ MailerLite save failed:', error);
    errors.push('Failed to add to mailing list');
  }

  // If both failed, throw error
  if (errors.length === 2) {
    throw new Error('Failed to save data: ' + errors.join(', '));
  }

  // If only one failed, log warning but don't throw
  if (errors.length === 1) {
    console.warn('⚠️ Partial save:', errors[0]);
  }
}
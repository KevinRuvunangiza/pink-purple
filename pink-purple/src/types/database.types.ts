// src/types/database.types.ts

export type SubmissionStatus = 'pending' | 'contacted' | 'paid' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type SubmissionSource = 'landing_page' | 'reminder_form' | 'contact_form';
export type AdminRole = 'admin' | 'super_admin';

export interface Submission {
  id: string;
  name: string;
  email: string;
  service_type: string;
  phone?: string;
  company_name?: string;
  message?: string;
  reminder_date?: string;
  status: SubmissionStatus;
  source: SubmissionSource;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  submission_id?: string;
  amount: number;
  status: PaymentStatus;
  reference: string;
  paystack_reference?: string;
  payment_method?: string;
  metadata?: Record<string, any>;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SubmissionWithPayment extends Submission {
  payment_id?: string;
  amount?: number;
  payment_status?: PaymentStatus;
  payment_reference?: string;
  paid_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role: AdminRole;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  admin_id?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface DashboardStats {
  total_submissions: number;
  paid_submissions: number;
  pending_submissions: number;
  total_payments: number;
  total_revenue: number;
  submissions_this_week: number;
  payments_this_week: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface FilterParams {
  status?: SubmissionStatus;
  service_type?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
  payment_status?: PaymentStatus;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

export interface TableParams extends PaginationParams {
  filters?: FilterParams;
  sort?: SortParams;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
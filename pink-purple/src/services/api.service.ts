// src/services/api.service.ts

import { supabase } from '../lib/supabase';
import type {
  Submission,
  Payment,
  SubmissionWithPayment,
  DashboardStats,
  TableParams,
  PaginatedResponse,
  ActivityLog,
} from '../types/database.types';

export class ApiService {
  // =============================================
  // SUBMISSIONS
  // =============================================

  static async getSubmissions(
    params: TableParams
  ): Promise<PaginatedResponse<SubmissionWithPayment>> {
    const { page, pageSize, filters, sort } = params;
    const offset = (page - 1) * pageSize;

    let query = supabase
      .from('submissions_with_payments')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.service_type) {
      query = query.eq('service_type', filters.service_type);
    }
    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%`
      );
    }
    if (filters?.date_from) {
      query = query.gte('created_at', filters.date_from);
    }
    if (filters?.date_to) {
      query = query.lte('created_at', filters.date_to);
    }
    if (filters?.payment_status) {
      query = query.eq('payment_status', filters.payment_status);
    }

    // Apply sorting
    if (sort) {
      query = query.order(sort.field, { ascending: sort.direction === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    query = query.range(offset, offset + pageSize - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    };
  }

  static async getSubmissionById(id: string): Promise<SubmissionWithPayment | null> {
    const { data, error } = await supabase
      .from('submissions_with_payments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateSubmissionStatus(id: string, status: string): Promise<void> {
    const { error } = await supabase.rpc('update_submission_status', {
      p_submission_id: id,
      p_status: status,
    });

    if (error) throw error;
  }

  static async deleteSubmission(id: string): Promise<void> {
    const { error } = await supabase
      .from('submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Log activity
    await this.logActivity('delete', 'submission', id);
  }

  static async createSubmission(submission: Omit<Submission, 'id' | 'created_at' | 'updated_at'>): Promise<Submission> {
    const { data, error } = await supabase
      .from('submissions')
      .insert(submission)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // =============================================
  // PAYMENTS
  // =============================================

  static async getPayments(
    params: TableParams
  ): Promise<PaginatedResponse<Payment>> {
    const { page, pageSize, filters, sort } = params;
    const offset = (page - 1) * pageSize;

    let query = supabase
      .from('payments')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters?.payment_status) {
      query = query.eq('status', filters.payment_status);
    }
    if (filters?.date_from) {
      query = query.gte('created_at', filters.date_from);
    }
    if (filters?.date_to) {
      query = query.lte('created_at', filters.date_to);
    }

    // Apply sorting
    if (sort) {
      query = query.order(sort.field, { ascending: sort.direction === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    query = query.range(offset, offset + pageSize - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    };
  }

  // =============================================
  // DASHBOARD STATS
  // =============================================

  static async getDashboardStats(): Promise<DashboardStats> {
    const { data, error } = await supabase
      .from('dashboard_stats')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  // =============================================
  // ACTIVITY LOGS
  // =============================================

  static async logActivity(
    action: string,
    entity_type: string,
    entity_id?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await supabase.rpc('log_admin_activity', {
      p_action: action,
      p_entity_type: entity_type,
      p_entity_id: entity_id,
      p_metadata: metadata,
    });
  }

  static async getActivityLogs(page: number = 1, pageSize: number = 50): Promise<PaginatedResponse<ActivityLog>> {
    const offset = (page - 1) * pageSize;

    const { data, error, count } = await supabase
      .from('activity_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    return {
      data: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    };
  }

  // =============================================
  // SERVICE TYPES (for filters)
  // =============================================

  static async getServiceTypes(): Promise<string[]> {
    const { data, error } = await supabase
      .from('submissions')
      .select('service_type')
      .order('service_type');

    if (error) throw error;

    const uniqueTypes = [...new Set(data.map(item => item.service_type))];
    return uniqueTypes;
  }
}
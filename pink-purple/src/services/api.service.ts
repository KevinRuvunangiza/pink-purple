// src/services/api.service.ts

import type { BlogPost, BlogPostCreate, BlogPostUpdate } from "../types/blog.types";

import { supabase } from "../lib/supabase";
import type {
  Submission,
  Payment,
  SubmissionWithPayment,
  DashboardStats,
  TableParams,
  PaginatedResponse,
  SubmissionStatus,
} from "../types/database.types";

export class ApiService {
  // Create a new submission
  static async createSubmission(
    data: Partial<Submission>
  ): Promise<Submission> {
    const { data: submission, error } = await supabase
      .from("submissions")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating submission:", error);
      throw new Error(`Failed to create submission: ${error.message}`);
    }

    return submission;
  }

  // Update submission status (and sync to MailerLite)
  static async updateSubmissionStatus(
    id: string,
    status: SubmissionStatus,
    syncToMailerLite: boolean = true
  ): Promise<Submission> {
    // First, update in Supabase
    const { data: submission, error } = await supabase
      .from("submissions")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error updating submission:", error);
      throw new Error(`Failed to update submission: ${error.message}`);
    }

    // Sync to MailerLite if enabled and status is 'paid'
    if (
      syncToMailerLite &&
      submission.email &&
      (status === "paid" || status === "completed")
    ) {
      try {
        await this.syncStatusToMailerLite(
          submission.email,
          status,
          submission.name,
          submission.company_name
        );
      } catch (error) {
        console.warn("Failed to sync to MailerLite, but DB updated:", error);
        // Don't throw - DB update succeeded
      }
    }

    return submission;
  }

  // Sync status to MailerLite
  private static async syncStatusToMailerLite(
    email: string,
    status: string,
    name?: string,
    businessName?: string
  ): Promise<void> {
    const response = await fetch(
      "/.netlify/functions/update-mailerlite-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          status,
          name,
          businessName,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`MailerLite sync failed: ${JSON.stringify(error)}`);
    }
  }

  // Get payments with pagination and filters
  static async getPayments(
    params: TableParams
  ): Promise<PaginatedResponse<Payment>> {
    const { page, pageSize, filters, sort } = params;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase.from("payments").select("*", { count: "exact" });

    // Apply filters
    if (filters?.payment_status) {
      query = query.eq("status", filters.payment_status);
    }
    if (filters?.search) {
      query = query.or(
        `reference.ilike.%${filters.search}%,paystack_reference.ilike.%${filters.search}%`
      );
    }
    if (filters?.date_from) {
      query = query.gte("created_at", filters.date_from);
    }
    if (filters?.date_to) {
      query = query.lte("created_at", filters.date_to);
    }

    // Apply sorting
    if (sort) {
      query = query.order(sort.field, { ascending: sort.direction === "asc" });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    // Apply pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error fetching payments:", error);
      throw new Error(`Failed to fetch payments: ${error.message}`);
    }

    return {
      data: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    };
  }

  // Get submissions with pagination and filters
  static async getSubmissions(
    params: TableParams
  ): Promise<PaginatedResponse<SubmissionWithPayment>> {
    const { page, pageSize, filters, sort } = params;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("submissions")
      .select("*, payments(*)", { count: "exact" });

    // Apply filters
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }
    if (filters?.service_type) {
      query = query.eq("service_type", filters.service_type);
    }
    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%`
      );
    }
    if (filters?.date_from) {
      query = query.gte("created_at", filters.date_from);
    }
    if (filters?.date_to) {
      query = query.lte("created_at", filters.date_to);
    }

    // Apply sorting
    if (sort) {
      query = query.order(sort.field, { ascending: sort.direction === "asc" });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    // Apply pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error fetching submissions:", error);
      throw new Error(`Failed to fetch submissions: ${error.message}`);
    }

    // Transform data to include payment info
    const submissions: SubmissionWithPayment[] = (data || []).map(
      (sub: any) => ({
        ...sub,
        payment_id: sub.payments?.[0]?.id,
        amount: sub.payments?.[0]?.amount,
        payment_status: sub.payments?.[0]?.status,
        payment_reference: sub.payments?.[0]?.reference,
        paid_at: sub.payments?.[0]?.paid_at,
      })
    );

    return {
      data: submissions,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    };
  }

  // Get dashboard statistics
  static async getDashboardStats(): Promise<DashboardStats> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Get all submissions
    const { data: submissions, error: submissionsError } = await supabase
      .from("submissions")
      .select("*");

    if (submissionsError) {
      throw new Error(
        `Failed to fetch submissions: ${submissionsError.message}`
      );
    }

    // Get all payments
    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("*")
      .eq("status", "paid");

    if (paymentsError) {
      throw new Error(`Failed to fetch payments: ${paymentsError.message}`);
    }

    const total_submissions = submissions?.length || 0;
    const paid_submissions =
      submissions?.filter((s) => s.status === "paid").length || 0;
    const pending_submissions =
      submissions?.filter((s) => s.status === "pending").length || 0;

    const submissions_this_week =
      submissions?.filter((s) => new Date(s.created_at) >= oneWeekAgo).length ||
      0;

    const total_payments = payments?.length || 0;
    const total_revenue =
      payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    const payments_this_week =
      payments?.filter((p) => p.paid_at && new Date(p.paid_at) >= oneWeekAgo)
        .length || 0;

    return {
      total_submissions,
      paid_submissions,
      pending_submissions,
      total_payments,
      total_revenue,
      submissions_this_week,
      payments_this_week,
    };
  }

  // Get a single submission
  static async getSubmission(id: string): Promise<SubmissionWithPayment> {
    const { data, error } = await supabase
      .from("submissions")
      .select("*, payments(*)")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch submission: ${error.message}`);
    }

    return {
      ...data,
      payment_id: data.payments?.[0]?.id,
      amount: data.payments?.[0]?.amount,
      payment_status: data.payments?.[0]?.status,
      payment_reference: data.payments?.[0]?.reference,
      paid_at: data.payments?.[0]?.paid_at,
    };
  }

  // Create a payment
  static async createPayment(data: Partial<Payment>): Promise<Payment> {
    const { data: payment, error } = await supabase
      .from("payments")
      .insert([data])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create payment: ${error.message}`);
    }

    return payment;
  }

  // Update payment status
  static async updatePaymentStatus(
    id: string,
    status: string
  ): Promise<Payment> {
    const { data, error } = await supabase
      .from("payments")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update payment: ${error.message}`);
    }

    return data;
  }

  // Get activity logs with pagination
  static async getActivityLogs(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<any>> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from("activity_logs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Supabase error fetching activity logs:", error);
      throw new Error(`Failed to fetch activity logs: ${error.message}`);
    }

    return {
      data: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    };
  }

  // Get all service types
  static async getServiceTypes(): Promise<string[]> {
    const { data, error } = await supabase
      .from("submissions")
      .select("service_type")
      .neq("service_type", null);

    if (error) {
      console.error("Supabase error fetching service types:", error);
      throw new Error(`Failed to fetch service types: ${error.message}`);
    }

    // Get unique service types
    const uniqueTypes = Array.from(
      new Set(
        (data || []).map((item: any) => item.service_type).filter(Boolean)
      )
    ) as string[];

    return uniqueTypes.sort();
  }

  // Clear all dashboard data (delete all submissions and payments)
  static async clearAllData(): Promise<void> {
    try {
      // Delete all payments first (due to foreign key constraints)
      const { error: paymentsError } = await supabase
        .from("payments")
        .delete()
        .gt("created_at", "1970-01-01"); // Delete all records with created_at after epoch (which is all records)

      if (paymentsError) {
        throw new Error(`Failed to delete payments: ${paymentsError.message}`);
      }

      // Delete all submissions
      const { error: submissionsError } = await supabase
        .from("submissions")
        .delete()
        .gt("created_at", "1970-01-01"); // Delete all records with created_at after epoch (which is all records)

      if (submissionsError) {
        throw new Error(
          `Failed to delete submissions: ${submissionsError.message}`
        );
      }
    } catch (error) {
      console.error("Error clearing data:", error);
      throw new Error(
        `Failed to clear data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export class BlogService {
  // Get all published blog posts
  static async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: false });

    if (error) {
      console.error("Supabase error fetching blog posts:", error);
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }

    return data || [];
  }

  // Get a single blog post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Not found
        return null;
      }
      console.error("Supabase error fetching blog post:", error);
      throw new Error(`Failed to fetch blog post: ${error.message}`);
    }

    // Increment view count
    await this.incrementViewCount(data.id);

    return data;
  }

  // Get a single blog post by title (for backward compatibility)
  static async getPostByTitle(title: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("title", title)
      .eq("is_published", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Not found
        return null;
      }
      console.error("Supabase error fetching blog post:", error);
      throw new Error(`Failed to fetch blog post: ${error.message}`);
    }

    // Increment view count
    await this.incrementViewCount(data.id);

    return data;
  }

  // Increment view count for a blog post
  private static async incrementViewCount(id: string): Promise<void> {
    const { error } = await supabase.rpc("increment_blog_view_count", {
      post_id: id,
    });

    if (error) {
      console.warn("Failed to increment view count:", error);
      // Don't throw - this is not critical
    }
  }

  // Get posts by category
  static async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("category", category)
      .eq("is_published", true)
      .order("date", { ascending: false });

    if (error) {
      console.error("Supabase error fetching posts by category:", error);
      throw new Error(`Failed to fetch posts by category: ${error.message}`);
    }

    return data || [];
  }

  // Get all categories
  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("category")
      .eq("is_published", true);

    if (error) {
      console.error("Supabase error fetching categories:", error);
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    const uniqueCategories = Array.from(
      new Set((data || []).map((item) => item.category).filter(Boolean))
    ) as string[];

    return uniqueCategories.sort();
  }

  // Create a new blog post (admin only)
  static async createPost(post: BlogPostCreate): Promise<BlogPost> {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([post])
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating blog post:", error);
      throw new Error(`Failed to create blog post: ${error.message}`);
    }

    return data;
  }

  // Update a blog post (admin only)
  static async updatePost(post: BlogPostUpdate): Promise<BlogPost> {
    const { id, ...updateData } = post;

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error updating blog post:", error);
      throw new Error(`Failed to update blog post: ${error.message}`);
    }

    return data;
  }

  // Delete a blog post (admin only)
  static async deletePost(id: string): Promise<void> {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      console.error("Supabase error deleting blog post:", error);
      throw new Error(`Failed to delete blog post: ${error.message}`);
    }
  }

  // Toggle publish status (admin only)
  static async togglePublish(
    id: string,
    isPublished: boolean
  ): Promise<BlogPost> {
    const { data, error } = await supabase
      .from("blog_posts")
      .update({ is_published: isPublished })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error toggling publish status:", error);
      throw new Error(`Failed to toggle publish status: ${error.message}`);
    }

    return data;
  }
}

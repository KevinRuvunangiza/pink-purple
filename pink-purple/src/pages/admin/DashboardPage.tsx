// src/pages/admin/DashboardPage.tsx

import { useEffect, useState } from 'react';
import { ApiService } from '../../services/api.service';
import { StatCard } from '../../components/admin/StatCard';
import type { DashboardStats } from '../../types/database.types';

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await ApiService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard statistics</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Submissions"
          value={stats.total_submissions}
          icon="📝"
          subtitle={`${stats.submissions_this_week} this week`}
        />
        <StatCard
          title="Paid Submissions"
          value={stats.paid_submissions}
          icon="✅"
          subtitle={`${((stats.paid_submissions / stats.total_submissions) * 100).toFixed(1)}% conversion`}
        />
        <StatCard
          title="Pending"
          value={stats.pending_submissions}
          icon="⏳"
          subtitle="Awaiting action"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.total_revenue)}
          icon="💰"
          subtitle={`${stats.payments_this_week} payments this week`}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/submissions"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <span className="text-2xl mr-3">📋</span>
            <div>
              <p className="font-medium text-gray-900">View Submissions</p>
              <p className="text-sm text-gray-500">Manage all inquiries</p>
            </div>
          </a>

          <a
            href="/admin/payments"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <span className="text-2xl mr-3">💳</span>
            <div>
              <p className="font-medium text-gray-900">View Payments</p>
              <p className="text-sm text-gray-500">Track transactions</p>
            </div>
          </a>

          <a
            href="/admin/activity"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <span className="text-2xl mr-3">📊</span>
            <div>
              <p className="font-medium text-gray-900">Activity Logs</p>
              <p className="text-sm text-gray-500">View admin actions</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Submissions</span>
              <span className="font-semibold text-gray-900">{stats.submissions_this_week}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payments Received</span>
              <span className="font-semibold text-gray-900">{stats.payments_this_week}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Payments</span>
              <span className="font-semibold text-gray-900">{stats.total_payments}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{
                    width: `${(stats.paid_submissions / stats.total_submissions) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="ml-3 text-sm text-gray-600 whitespace-nowrap">
                {stats.paid_submissions} Paid
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{
                    width: `${(stats.pending_submissions / stats.total_submissions) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="ml-3 text-sm text-gray-600 whitespace-nowrap">
                {stats.pending_submissions} Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
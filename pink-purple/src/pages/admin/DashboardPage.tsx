// src/pages/admin/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { ApiService } from '../../services/api.service';
import { StatCard } from '../../components/admin/StatCard';
import type { DashboardStats } from '../../types/database.types';

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState('');

  useEffect(() => {
    loadStats();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      setError(null);
      const data = await ApiService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
      setError('Failed to load dashboard statistics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleClearData = async () => {
    if (confirmationInput !== 'DELETE ALL DATA') {
      alert('Confirmation text does not match');
      return;
    }

    setClearing(true);
    try {
      await ApiService.clearAllData();
      setShowConfirmDialog(false);
      setConfirmationInput('');
      await loadStats();
      alert('All data has been cleared successfully');
    } catch (error) {
      console.error('Failed to clear data:', error);
      alert(`Failed to clear data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-800 font-medium mb-4">
            {error || 'Failed to load dashboard statistics'}
          </p>
          <button
            onClick={loadStats}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const conversionRate = stats.total_submissions > 0 
    ? ((stats.paid_submissions / stats.total_submissions) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Welcome back! Here's what's happening.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadStats}
            className="self-start sm:self-auto px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="self-start sm:self-auto px-4 py-2 text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            🗑️ Clear Data
          </button>
        </div>
      </div>

      {/* Stats Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          subtitle={`${conversionRate}% conversion`}
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
      
      {/* Recent Activity Summary - Mobile Optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            This Week
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Submissions</span>
              <span className="font-semibold text-gray-900">
                {stats.submissions_this_week}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payments Received</span>
              <span className="font-semibold text-gray-900">
                {stats.payments_this_week}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Payments</span>
              <span className="font-semibold text-gray-900">
                {stats.total_payments}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Status Overview
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Paid</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats.paid_submissions}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(stats.paid_submissions / stats.total_submissions) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats.pending_submissions}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(stats.pending_submissions / stats.total_submissions) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => {
                setShowConfirmDialog(false);
                setConfirmationInput('');
              }}
            />

            {/* Modal */}
            <div className="relative inline-block bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                <h3 className="text-lg font-medium text-white">⚠️ Delete All Data</h3>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <p className="text-sm text-gray-700 mb-4">
                  This action will permanently delete all submissions and payments. This cannot be undone.
                </p>
                
                <p className="text-sm font-medium text-gray-900 mb-2">
                  To confirm, type: <span className="font-mono bg-gray-100 px-2 py-1 rounded">DELETE ALL DATA</span>
                </p>
                
                <input
                  type="text"
                  value={confirmationInput}
                  onChange={(e) => setConfirmationInput(e.target.value)}
                  placeholder="Type confirmation text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowConfirmDialog(false);
                      setConfirmationInput('');
                    }}
                    disabled={clearing}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearData}
                    disabled={clearing || confirmationInput !== 'DELETE ALL DATA'}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {clearing ? 'Clearing...' : 'Delete All'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
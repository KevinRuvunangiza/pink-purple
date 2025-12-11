// src/pages/admin/PaymentsPage.tsx
import { useEffect, useState } from 'react';
import { ApiService } from '../../services/api.service';
import { DataTable } from '../../components/admin/DataTable';
import { Pagination } from '../../components/admin/Pagination';
import { StatusBadge } from '../../components/admin/StatusBadge';
import type { Payment, PaginatedResponse, FilterParams } from '../../types/database.types';

export function PaymentsPage() {
  const [data, setData] = useState<PaginatedResponse<Payment> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    loadPayments();
  }, [page, statusFilter]);

  const loadPayments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const filters: FilterParams = {};
      if (statusFilter) {
        filters.payment_status = statusFilter as any;
      }

      const result = await ApiService.getPayments({
        page,
        pageSize,
        filters,
      });
      setData(result);
    } catch (error) {
      console.error('Failed to load payments:', error);
      setError('Failed to load payments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  const calculateTotalRevenue = () => {
    if (!data?.data) return 0;
    return data.data
      .filter((payment) => payment.status === 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  const columns = [
    {
      key: 'reference',
      header: 'Reference',
      sortable: true,
      render: (item: Payment) => (
        <div className="min-w-[120px]">
          <p className="font-medium text-sm truncate">{item.reference}</p>
          {item.paystack_reference && (
            <p className="text-xs text-gray-500 truncate">{item.paystack_reference}</p>
          )}
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (item: Payment) => (
        <span className="font-semibold text-gray-900 text-sm">
          {formatCurrency(item.amount)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item: Payment) => <StatusBadge status={item.status} type="payment" />,
    },
    {
      key: 'payment_method',
      header: 'Method',
      render: (item: Payment) => (
        <span className="text-sm capitalize">{item.payment_method || 'N/A'}</span>
      ),
    },
    {
      key: 'paid_at',
      header: 'Paid At',
      sortable: true,
      render: (item: Payment) => (
        <span className="text-sm text-gray-600">{formatDate(item.paid_at)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payments</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Track and manage all payment transactions
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-800 text-sm">{error}</p>
            <button
              onClick={loadPayments}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Summary Cards - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Payments</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
            {data?.total || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Paid Payments</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600 mt-2">
            {data?.data.filter((p) => p.status === 'paid').length || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(calculateTotalRevenue())}
          </p>
        </div>
      </div>

      {/* Filter Bar - Mobile Optimized */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <DataTable
        data={data?.data || []}
        columns={columns}
        isLoading={loading}
        emptyMessage="No payments found"
      />

      {data && data.total > 0 && (
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          onPageChange={setPage}
          totalItems={data.total}
          pageSize={data.pageSize}
        />
      )}
    </div>
  );
}
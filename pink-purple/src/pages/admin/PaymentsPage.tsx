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
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    loadPayments();
  }, [page, statusFilter]);

  const loadPayments = async () => {
    setLoading(true);
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
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
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
        <div>
          <p className="font-medium text-sm">{item.reference}</p>
          {item.paystack_reference && (
            <p className="text-xs text-gray-500">{item.paystack_reference}</p>
          )}
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (item: Payment) => (
        <span className="font-semibold text-gray-900">{formatCurrency(item.amount)}</span>
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
    {
      key: 'created_at',
      header: 'Created',
      sortable: true,
      render: (item: Payment) => (
        <span className="text-sm text-gray-600">{formatDate(item.created_at)}</span>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="mt-2 text-gray-600">Track and manage all payment transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Total Payments</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{data?.total || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Paid Payments</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {data?.data.filter((p) => p.status === 'paid').length || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(calculateTotalRevenue())}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
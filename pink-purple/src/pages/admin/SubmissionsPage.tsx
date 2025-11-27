// src/pages/admin/SubmissionsPage.tsx

import { useEffect, useState } from 'react';
import { ApiService } from '../../services/api.service';
import { DataTable } from '../../components/admin/DataTable';
import { Pagination } from '../../components/admin/Pagination';
import { FilterBar } from '../../components/admin/FilterBar';
import { DetailModal } from '../../components/admin/DetailModal';
import { StatusBadge } from '../../components/admin/StatusBadge';
import type {
  SubmissionWithPayment,
  FilterParams,
  PaginatedResponse,
} from '../../types/database.types';

export function SubmissionsPage() {
  const [data, setData] = useState<PaginatedResponse<SubmissionWithPayment> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState<FilterParams>({});
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithPayment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);

  useEffect(() => {
    loadServiceTypes();
  }, []);

  useEffect(() => {
    loadSubmissions();
  }, [page, filters]);

  const loadServiceTypes = async () => {
    try {
      const types = await ApiService.getServiceTypes();
      setServiceTypes(types);
    } catch (error) {
      console.error('Failed to load service types:', error);
    }
  };

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const result = await ApiService.getSubmissions({
        page,
        pageSize,
        filters,
      });
      setData(result);
    } catch (error) {
      console.error('Failed to load submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (submission: SubmissionWithPayment) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleFilterChange = (newFilters: FilterParams) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (item: SubmissionWithPayment) => (
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      ),
    },
    {
      key: 'service_type',
      header: 'Service',
      sortable: true,
      render: (item: SubmissionWithPayment) => (
        <span className="text-sm">{item.service_type}</span>
      ),
    },
    {
      key: 'company_name',
      header: 'Company',
      render: (item: SubmissionWithPayment) => (
        <span className="text-sm">{item.company_name || '-'}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item: SubmissionWithPayment) => (
        <StatusBadge status={item.status} type="submission" />
      ),
    },
    {
      key: 'payment_status',
      header: 'Payment',
      render: (item: SubmissionWithPayment) =>
        item.payment_status ? (
          <StatusBadge status={item.payment_status} type="payment" />
        ) : (
          <span className="text-sm text-gray-400">No payment</span>
        ),
    },
    {
      key: 'created_at',
      header: 'Date',
      sortable: true,
      render: (item: SubmissionWithPayment) => (
        <span className="text-sm text-gray-600">{formatDate(item.created_at)}</span>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
        <p className="mt-2 text-gray-600">
          Manage all customer inquiries and service requests
        </p>
      </div>

      <FilterBar onFilterChange={handleFilterChange} serviceTypes={serviceTypes} />

      <DataTable
        data={data?.data || []}
        columns={columns}
        onRowClick={handleRowClick}
        isLoading={loading}
        emptyMessage="No submissions found"
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

      <DetailModal
        submission={selectedSubmission}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={loadSubmissions}
      />
    </div>
  );
}
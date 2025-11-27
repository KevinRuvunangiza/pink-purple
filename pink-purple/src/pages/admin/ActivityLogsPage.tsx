// src/pages/admin/ActivityLogsPage.tsx

import { useEffect, useState } from 'react';
import { ApiService } from '../../services/api.service';
import { Pagination } from '../../components/admin/Pagination';
import type { ActivityLog, PaginatedResponse } from '../../types/database.types';

export function ActivityLogsPage() {
  const [data, setData] = useState<PaginatedResponse<ActivityLog> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    loadLogs();
  }, [page]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const result = await ApiService.getActivityLogs(page, pageSize);
      setData(result);
    } catch (error) {
      console.error('Failed to load activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'update_status':
        return '✏️';
      case 'delete':
        return '🗑️';
      case 'create':
        return '➕';
      case 'view':
        return '👁️';
      default:
        return '📝';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'delete':
        return 'text-red-600 bg-red-50';
      case 'update_status':
        return 'text-blue-600 bg-blue-50';
      case 'create':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <p className="mt-2 text-gray-600">
          Track all administrative actions and system events
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {data?.data && data.data.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {data.data.map((log) => (
              <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getActionColor(
                      log.action
                    )}`}
                  >
                    <span className="text-lg">{getActionIcon(log.action)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {log.action.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(log.created_at)}</p>
                    </div>

                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
                      <span>Entity: {log.entity_type}</span>
                      {log.entity_id && (
                        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                          {log.entity_id.substring(0, 8)}...
                        </span>
                      )}
                    </div>

                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                      <div className="mt-2">
                        <details className="text-sm">
                          <summary className="cursor-pointer text-purple-600 hover:text-purple-700">
                            View metadata
                          </summary>
                          <pre className="mt-2 p-3 bg-gray-50 rounded-lg overflow-x-auto text-xs">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </details>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">No activity logs found</div>
        )}
      </div>

      {data && data.total > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={setPage}
            totalItems={data.total}
            pageSize={data.pageSize}
          />
        </div>
      )}
    </div>
  );
}
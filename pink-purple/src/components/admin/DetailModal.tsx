// src/components/admin/DetailModal.tsx

import { useState } from 'react';
import type { SubmissionWithPayment, SubmissionStatus } from '../../types/database.types';
import { StatusBadge } from './StatusBadge';
import { ApiService } from '../../services/api.service';

interface DetailModalProps {
  submission: SubmissionWithPayment | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function DetailModal({ submission, isOpen, onClose, onUpdate }: DetailModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<SubmissionStatus>('pending');

  if (!isOpen || !submission) return null;

  const handleStatusUpdate = async () => {
    if (!submission?.id) return;
    
    setIsUpdating(true);
    try {
      await ApiService.updateSubmissionStatus(submission.id, selectedStatus);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative inline-block bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Submission Details</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {/* Basic Info */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Basic Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-900">{submission.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{submission.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{submission.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm font-medium text-gray-900">{submission.company_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Service Type</p>
                  <p className="text-sm font-medium text-gray-900">{submission.service_type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Source</p>
                  <p className="text-sm font-medium text-gray-900">{submission.source}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <StatusBadge status={submission.status} type="submission" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Submitted</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(submission.created_at)}</p>
                </div>
              </div>

              {submission.message && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-1">Message</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{submission.message}</p>
                </div>
              )}

              {submission.reminder_date && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-1">Reminder Date</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(submission.reminder_date)}</p>
                </div>
              )}
            </div>

            {/* Payment Info */}
            {submission.payment_id && (
              <div className="mb-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Payment Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(submission.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Status</p>
                    <StatusBadge status={submission.payment_status || 'pending'} type="payment" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Reference</p>
                    <p className="text-sm font-medium text-gray-900 break-all">{submission.payment_reference}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Paid At</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(submission.paid_at)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Update Status */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Update Status</h4>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as SubmissionStatus)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="paid">Paid</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={handleStatusUpdate}
                  disabled={isUpdating || selectedStatus === submission.status}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUpdating ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// src/components/admin/StatusBadge.tsx

import type { SubmissionStatus, PaymentStatus } from '../../types/database.types';

interface StatusBadgeProps {
  status: SubmissionStatus | PaymentStatus;
  type?: 'submission' | 'payment';
}

export function StatusBadge({ status, type = 'submission' }: StatusBadgeProps) {
  const getStatusStyles = () => {
    const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';
    
    if (type === 'payment') {
      switch (status) {
        case 'paid':
          return `${baseClasses} bg-green-100 text-green-800`;
        case 'pending':
          return `${baseClasses} bg-yellow-100 text-yellow-800`;
        case 'failed':
          return `${baseClasses} bg-red-100 text-red-800`;
        case 'refunded':
          return `${baseClasses} bg-gray-100 text-gray-800`;
        default:
          return `${baseClasses} bg-gray-100 text-gray-800`;
      }
    }

    // Submission status
    switch (status) {
      case 'paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'contacted':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = () => {
    if (type === 'payment') {
      switch (status) {
        case 'paid':
          return '✓';
        case 'pending':
          return '⏳';
        case 'failed':
          return '✗';
        case 'refunded':
          return '↩';
        default:
          return '•';
      }
    }

    switch (status) {
      case 'paid':
        return '✓';
      case 'completed':
        return '✓';
      case 'contacted':
        return '📞';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '✗';
      default:
        return '•';
    }
  };

  return (
    <span className={getStatusStyles()}>
      <span className="mr-1">{getStatusIcon()}</span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
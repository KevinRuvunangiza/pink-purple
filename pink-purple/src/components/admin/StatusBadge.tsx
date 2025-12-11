// src/components/admin/StatusBadge.tsx

import { CheckCircle, Clock, XCircle, RotateCcw, Circle, Phone } from 'lucide-react';
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
          return <CheckCircle className="w-4 h-4" />;
        case 'pending':
          return <Clock className="w-4 h-4" />;
        case 'failed':
          return <XCircle className="w-4 h-4" />;
        case 'refunded':
          return <RotateCcw className="w-4 h-4" />;
        default:
          return <Circle className="w-4 h-4" />;
      }
    }

    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'contacted':
        return <Phone className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <span className={getStatusStyles()}>
      <span className="mr-1">{getStatusIcon()}</span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
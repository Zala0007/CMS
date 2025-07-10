import React from 'react';

interface StatusBadgeProps {
  status: 'available' | 'occupied' | 'maintenance' | 'full';
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'available':
        return { color: 'bg-green-100 text-green-800', text: 'Available' };
      case 'occupied':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Occupied' };
      case 'maintenance':
        return { color: 'bg-red-100 text-red-800', text: 'Maintenance' };
      case 'full':
        return { color: 'bg-red-100 text-red-800', text: 'Full' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Unknown' };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2 text-sm';
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  const { color, text } = getStatusConfig();

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${color} ${getSizeClasses()}`}>
      {text}
    </span>
  );
};

export default StatusBadge;
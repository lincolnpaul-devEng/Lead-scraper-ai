
import React from 'react';
import { LeadStatus } from '../../types';

interface StatusBadgeProps {
    status: LeadStatus;
}

const statusColors: Record<LeadStatus, string> = {
    [LeadStatus.New]: 'bg-blue-100 text-blue-800',
    [LeadStatus.Contacted]: 'bg-yellow-100 text-yellow-800',
    [LeadStatus.Qualified]: 'bg-indigo-100 text-indigo-800',
    [LeadStatus.Lost]: 'bg-red-100 text-red-800',
    [LeadStatus.Converted]: 'bg-emerald-100 text-emerald-800',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    return (
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColors[status]}`}>
            {status}
        </span>
    );
};

export default StatusBadge;

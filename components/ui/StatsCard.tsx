
import React from 'react';

interface StatsCardProps {
    title: string;
    value: string;
    trend?: string;
    trendDirection?: 'up' | 'down';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, trendDirection }) => {
    const trendColor = trendDirection === 'up' ? 'text-secondary-600' : 'text-red-600';
    const trendIcon = trendDirection === 'up' ? '↑' : '↓';

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
            <div className="mt-2 flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-slate-900">{value}</p>
                {trend && (
                    <p className={`text-sm font-semibold ${trendColor}`}>
                        {trendIcon} {trend}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatsCard;


import React from 'react';
import { MOCK_LEADS } from '../constants';
import { Lead } from '../types';
import PageHeader from '../components/ui/PageHeader';
import StatsCard from '../components/ui/StatsCard';
import StatusBadge from '../components/ui/StatusBadge';
import { Link } from 'react-router-dom';

const RecentLeadsTable: React.FC<{ leads: Lead[] }> = ({ leads }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Lead Activity</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Company</th>
                        <th scope="col" className="px-6 py-3">Contact</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Last Contacted</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.slice(0, 5).map(lead => (
                        <tr key={lead.id} className="bg-white border-b hover:bg-slate-50">
                            <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{lead.companyName}</th>
                            <td className="px-6 py-4">{lead.contactName}</td>
                            <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                            <td className="px-6 py-4">{lead.lastContacted}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
         <div className="mt-4 text-right">
            <Link to="/leads" className="text-sm font-medium text-primary-600 hover:text-primary-800">
                View all leads &rarr;
            </Link>
        </div>
    </div>
);


const DashboardPage: React.FC = () => {
    return (
        <div>
            <PageHeader title="Dashboard" subtitle="Welcome back, Jane! Here's your performance overview." />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard title="New Leads" value="128" trend="+12.5%" trendDirection="up" />
                <StatsCard title="Contacted" value="64" trend="-2.1%" trendDirection="down" />
                <StatsCard title="Conversion Rate" value="8.2%" trend="+0.5%" trendDirection="up" />
                <StatsCard title="Active Campaigns" value="3" />
            </div>

            <RecentLeadsTable leads={MOCK_LEADS} />
        </div>
    );
};

export default DashboardPage;

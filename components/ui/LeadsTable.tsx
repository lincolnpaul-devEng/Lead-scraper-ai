
import React, { useState, useMemo } from 'react';
import { Lead } from '../../types';
import StatusBadge from './StatusBadge';
import { ChevronDown, ChevronUp } from 'lucide-react';

type SortConfig = {
    key: keyof Lead;
    direction: 'ascending' | 'descending';
};

const LeadsTable: React.FC<{ leads: Lead[] }> = ({ leads }) => {
    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    const filteredLeads = useMemo(() => {
        return leads.filter(lead =>
            Object.values(lead).some(value =>
                String(value).toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [leads, filter]);

    const sortedLeads = useMemo(() => {
        let sortableLeads = [...filteredLeads];
        if (sortConfig !== null) {
            sortableLeads.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableLeads;
    }, [filteredLeads, sortConfig]);

    const requestSort = (key: keyof Lead) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof Lead) => {
        if (!sortConfig || sortConfig.key !== key) {
            return null;
        }
        return sortConfig.direction === 'ascending' ? <ChevronUp className="h-4 w-4 inline ml-1" /> : <ChevronDown className="h-4 w-4 inline ml-1" />;
    };
    
    return (
        <div className="p-4 sm:p-6">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search leads..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="block w-full max-w-xs px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('companyName')}>
                                Company {getSortIcon('companyName')}
                            </th>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('contactName')}>
                                Contact {getSortIcon('contactName')}
                            </th>
                             <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('email')}>
                                Email & Phone {getSortIcon('email')}
                            </th>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('status')}>
                                Status {getSortIcon('status')}
                            </th>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('lastContacted')}>
                                Last Contacted {getSortIcon('lastContacted')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedLeads.map(lead => (
                            <tr key={lead.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    <div className="font-bold">{lead.companyName}</div>
                                    <a href={`http://${lead.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:underline">{lead.website}</a>
                                </td>
                                <td className="px-6 py-4">{lead.contactName}</td>
                                <td className="px-6 py-4">
                                     <div>{lead.email}</div>
                                     <div className="text-xs text-slate-500">{lead.phone}</div>
                                </td>
                                <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                                <td className="px-6 py-4">{lead.lastContacted}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="font-medium text-primary-600 hover:underline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {sortedLeads.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-slate-500">No leads found.</p>
                </div>
            )}
        </div>
    );
};

export default LeadsTable;

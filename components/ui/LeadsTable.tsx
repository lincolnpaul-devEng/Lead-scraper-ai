
import React, { useState, useMemo } from 'react';
import { Lead, LeadStatus } from '../../types';
import StatusBadge from './StatusBadge';
import { ChevronUp, ChevronDown, Search, X, ExternalLink, Sparkles } from '../icons';
import { enrichLeadWithAI, EnrichedData } from '../../services/geminiService';

type SortKey = keyof Lead;
type SortOrder = 'asc' | 'desc';

const useSortableData = (items: Lead[], initialSortKey: SortKey = 'companyName') => {
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: initialSortKey, order: 'asc' });

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.order === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.order === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: SortKey) => {
        let order: SortOrder = 'asc';
        if (sortConfig.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }
        setSortConfig({ key, order });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const SortableHeader: React.FC<{
    sortKey: SortKey,
    title: string,
    requestSort: (key: SortKey) => void,
    sortConfig: { key: SortKey, order: SortOrder }
}> = ({ sortKey, title, requestSort, sortConfig }) => {
    const isSorted = sortConfig.key === sortKey;
    return (
        <th scope="col" className="px-6 py-3" onClick={() => requestSort(sortKey)}>
            <div className="flex items-center cursor-pointer select-none">
                {title}
                {isSorted ? (
                    sortConfig.order === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                ) : <div className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-50"></div>}
            </div>
        </th>
    );
}

const LeadDetailModal: React.FC<{ lead: Lead; onClose: () => void }> = ({ lead, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [enrichedData, setEnrichedData] = useState<EnrichedData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleEnrich = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await enrichLeadWithAI(lead);
            setEnrichedData(data);
        } catch (err) {
            setError('Failed to enrich lead. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">{lead.companyName}</h2>
                        <p className="text-sm text-slate-500">{lead.industry} - {lead.location}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-100"><X className="h-6 w-6" /></button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Contact Person</h3>
                            <p className="text-slate-800">{lead.contactName}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Email</h3>
                            <p className="text-slate-800">{lead.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Phone</h3>
                            <p className="text-slate-800">{lead.phone}</p>
                        </div>
                         <div>
                            <h3 className="text-sm font-medium text-slate-500">Website</h3>
                            <a href={`https://${lead.website}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline flex items-center gap-1">
                                {lead.website} <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Company Size</h3>
                            <p className="text-slate-800">{lead.companySize} employees</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-500">Status</h3>
                            <StatusBadge status={lead.status} />
                        </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-slate-800">AI Enrichment</h3>
                            <button onClick={handleEnrich} disabled={isLoading} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm disabled:bg-slate-400">
                                <Sparkles className="h-4 w-4" />
                                {isLoading ? 'Enriching...' : 'Enrich with AI'}
                            </button>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        {enrichedData ? (
                            <div className="mt-4 space-y-4 text-sm text-slate-700">
                                <div>
                                    <h4 className="font-semibold text-slate-900">Company Summary</h4>
                                    <p>{enrichedData.companySummary}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Key Personnel</h4>
                                    <ul className="list-disc list-inside">
                                        {enrichedData.keyPersonnel.map(p => <li key={p.name}>{p.name} - <span className="text-slate-500">{p.role}</span></li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Recent News</h4>
                                    <p>{enrichedData.recentNews}</p>
                                </div>
                            </div>
                        ) : (
                             !isLoading && <p className="mt-2 text-sm text-slate-500">Click the button to get AI-powered insights about this company.</p>
                        )}
                        {isLoading && <div className="mt-4 text-sm text-slate-500">Generating insights...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LeadsTable: React.FC<{ leads: Lead[] }> = ({ leads }) => {
    const [filter, setFilter] = useState('');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const filteredLeads = useMemo(() => {
        if (!filter) return leads;
        const lowercasedFilter = filter.toLowerCase();
        return leads.filter(lead =>
            Object.values(lead).some(value =>
                String(value).toLowerCase().includes(lowercasedFilter)
            )
        );
    }, [leads, filter]);

    const { items: sortedLeads, requestSort, sortConfig } = useSortableData(filteredLeads);
    
    return (
        <>
            <div className="p-4 flex items-center justify-between border-b border-slate-200">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="block w-full sm:w-80 pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr className="group">
                           <SortableHeader sortKey="companyName" title="Company" requestSort={requestSort} sortConfig={sortConfig} />
                           <SortableHeader sortKey="contactName" title="Contact" requestSort={requestSort} sortConfig={sortConfig} />
                           <SortableHeader sortKey="location" title="Location" requestSort={requestSort} sortConfig={sortConfig} />
                           <SortableHeader sortKey="industry" title="Industry" requestSort={requestSort} sortConfig={sortConfig} />
                           <SortableHeader sortKey="status" title="Status" requestSort={requestSort} sortConfig={sortConfig} />
                           <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedLeads.map((lead) => (
                            <tr key={lead.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{lead.companyName}</td>
                                <td className="px-6 py-4">{lead.contactName}</td>
                                <td className="px-6 py-4">{lead.location}</td>
                                <td className="px-6 py-4">{lead.industry}</td>
                                <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                                <td className="px-6 py-4">
                                    <button onClick={() => setSelectedLead(lead)} className="font-medium text-primary-600 hover:underline">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {sortedLeads.length === 0 && (
                    <div className="text-center py-16">
                        <h3 className="text-lg font-medium text-slate-800">No leads found</h3>
                        <p className="text-slate-500 mt-1">Try adjusting your search or filter.</p>
                    </div>
                )}
            </div>
             {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}
        </>
    );
};

export default LeadsTable;

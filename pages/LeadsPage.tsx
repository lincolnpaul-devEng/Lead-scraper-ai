
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import LeadsTable from '../components/ui/LeadsTable';
import { MOCK_LEADS } from '../constants';
import { Plus } from 'lucide-react';

const LeadsPage: React.FC = () => {
    return (
        <div>
            <PageHeader title="Leads" subtitle="Manage your prospects and track your pipeline.">
                 <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    Add Lead
                </button>
            </PageHeader>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <LeadsTable leads={MOCK_LEADS} />
            </div>
        </div>
    );
};

export default LeadsPage;

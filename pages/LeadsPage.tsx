
import React, { useState } from 'react';
import { MOCK_LEADS } from '../constants';
import PageHeader from '../components/ui/PageHeader';
import LeadsTable from '../components/ui/LeadsTable';
import AddLeadModal from '../components/ui/AddLeadModal';
import { Button } from '../components/ui/button';
import { Lead } from '../types';

const LeadsPage: React.FC = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [leads, setLeads] = useState(MOCK_LEADS);

    const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'lastContacted'>) => {
        const newLead: Lead = {
            ...newLeadData,
            id: (leads.length + 1).toString(),
            lastContacted: new Date().toISOString().split('T')[0],
        };
        setLeads(prevLeads => [newLead, ...prevLeads]);
        setAddModalOpen(false);
    };

    return (
        <div>
            <PageHeader
                title="Leads"
                subtitle="Manage and track your potential customers."
            >
                <Button onClick={() => setAddModalOpen(true)}>
                    Add Lead
                </Button>
            </PageHeader>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <LeadsTable leads={leads} />
            </div>

            {isAddModalOpen && (
                <AddLeadModal
                    onClose={() => setAddModalOpen(false)}
                    onAddLead={handleAddLead}
                />
            )}
        </div>
    );
};

export default LeadsPage;

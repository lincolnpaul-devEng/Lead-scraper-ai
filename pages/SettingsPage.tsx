
import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import ProfileSettings from '../components/settings/ProfileSettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import { cn } from '../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

type Tab = 'Profile' | 'Integrations' | 'Billing';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Profile');

    const tabs: Tab[] = ['Profile', 'Integrations', 'Billing'];

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return <ProfileSettings />;
            case 'Integrations':
                return <IntegrationSettings />;
            case 'Billing':
                 return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing</CardTitle>
                            <CardDescription>Manage your subscription and payment details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">Your current plan is <strong>Growth</strong>. You can manage your subscription on the pricing page.</p>
                        </CardContent>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <PageHeader title="Settings" subtitle="Manage your account and preferences." />
            
            <div className="mb-6 border-b border-slate-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                                activeTab === tab
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default SettingsPage;

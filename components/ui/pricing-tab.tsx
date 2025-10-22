import React, { useState } from 'react';

interface PricingTabProps {
    onCycleChange: (cycle: 'monthly' | 'annually') => void;
}

const PricingTab: React.FC<PricingTabProps> = ({ onCycleChange }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

    const handleToggle = (cycle: 'monthly' | 'annually') => {
        setBillingCycle(cycle);
        onCycleChange(cycle);
    };

    return (
        <div className="flex justify-center">
            <div className="inline-flex bg-slate-200 p-1 rounded-full">
                <button
                    onClick={() => handleToggle('monthly')}
                    className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                        billingCycle === 'monthly' ? 'bg-white text-slate-800 shadow' : 'text-slate-600'
                    }`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => handleToggle('annually')}
                    className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                        billingCycle === 'annually' ? 'bg-white text-slate-800 shadow' : 'text-slate-600'
                    }`}
                >
                    Annually <span className="ml-1 px-2 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">Save 20%</span>
                </button>
            </div>
        </div>
    );
};

export default PricingTab;

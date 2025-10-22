import React, { useState } from 'react'
import { Plan } from '../../types';
import PricingTab from './pricing-tab';
import PricingCard from './pricing-card';

interface PricingSectionProps {
    plans: Plan[];
}

const PricingSection: React.FC<PricingSectionProps> = ({ plans }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

    const handleCycleChange = (cycle: 'monthly' | 'annually') => {
        setBillingCycle(cycle);
    };

    return (
        <div className="mt-12">
            <PricingTab onCycleChange={handleCycleChange} />
            <div className="mt-10 grid gap-8 md:grid-cols-3">
                {plans.map((plan) => (
                    <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} />
                ))}
            </div>
        </div>
    );
};

export default PricingSection;

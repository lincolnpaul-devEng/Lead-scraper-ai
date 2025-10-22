import React from 'react';
import PricingSection from '../components/ui/pricing-section';
import { PRICING_PLANS } from '../constants';

const PricingPage: React.FC = () => {
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Find the perfect plan
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-slate-600">
                        Start for free, then upgrade to a plan that fits your needs.
                    </p>
                </div>
                <PricingSection plans={PRICING_PLANS} />
            </div>
        </div>
    );
};

export default PricingPage;

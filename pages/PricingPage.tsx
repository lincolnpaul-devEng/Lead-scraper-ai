
import React from 'react';
import { Link } from 'react-router-dom';
import { Plan } from '../types';
import { PRICING_PLANS } from '../constants';
import { CheckCircle } from '../components/icons';

const PricingCard: React.FC<{ plan: Plan }> = ({ plan }) => (
    <div className={`relative flex flex-col p-8 bg-white border rounded-lg shadow-sm ${plan.recommended ? 'border-primary-500' : 'border-slate-200'}`}>
        {plan.recommended && (
            <div className="absolute top-0 -translate-y-1/2 px-3 py-1 text-sm font-semibold tracking-wide text-white bg-primary-600 rounded-full shadow-md">
                RECOMMENDED
            </div>
        )}
        <h3 className="text-lg font-semibold text-slate-800">{plan.name}</h3>
        <p className="mt-2 text-slate-500">{plan.leadsPerMonth}</p>
        <div className="mt-4">
            <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
            <span className="text-base font-medium text-slate-500">/month</span>
        </div>
        <Link 
            to="/signup" 
            className={`mt-6 w-full inline-block text-center px-6 py-3 text-sm font-semibold rounded-md ${plan.recommended ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-primary-50 text-primary-700 hover:bg-primary-100'}`}
        >
            Get Started
        </Link>
        <ul className="mt-8 space-y-4 text-sm text-slate-600 flex-grow">
            {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);


const PricingPage: React.FC = () => {
    return (
        <div className="bg-slate-50 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900">Simple, Transparent Pricing</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">Choose the plan that's right for your business. No hidden fees.</p>
                </div>

                <div className="mt-16 max-w-5xl mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6">
                    {PRICING_PLANS.map((plan) => (
                        <PricingCard key={plan.name} plan={plan} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;

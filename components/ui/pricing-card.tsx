import React from 'react';
import { Plan } from '../../types';
import { CheckCircle } from '../icons';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface PricingCardProps {
    plan: Plan;
    billingCycle: 'monthly' | 'annually';
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, billingCycle }) => {
    const monthlyPrice = parseInt(plan.price, 10);
    const annualPrice = Math.round(monthlyPrice * 12 * 0.8);
    const displayPrice = billingCycle === 'annually' ? Math.round(annualPrice / 12) : monthlyPrice;

    return (
        <div className={cn(
            'relative bg-white rounded-lg shadow-lg p-8 border flex flex-col',
            plan.recommended ? 'border-primary-500' : 'border-slate-200'
        )}>
            {plan.recommended && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 text-sm font-semibold tracking-wide text-white bg-primary-600 rounded-full shadow-md">
                    Most Popular
                </div>
            )}
            <h3 className="text-xl font-semibold text-slate-800">{plan.name}</h3>
            <p className="mt-4 text-slate-500">{plan.leadsPerMonth}</p>
            <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">${displayPrice}</span>
                <span className="ml-1 text-xl font-semibold text-slate-500">/mo</span>
            </div>
            {billingCycle === 'annually' && (
                <p className="text-sm text-slate-500">Billed as ${annualPrice} per year</p>
            )}

            <ul className="mt-8 space-y-4 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle className="flex-shrink-0 h-6 w-6 text-emerald-500" />
                        <span className="ml-3 text-slate-600">{feature}</span>
                    </li>
                ))}
            </ul>

            <Link to="/signup" className={cn(
                'mt-10 block w-full text-center px-6 py-3 text-base font-medium rounded-md shadow-sm transition-colors',
                plan.recommended 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            )}>
                Get Started
            </Link>
        </div>
    );
};

export default PricingCard;

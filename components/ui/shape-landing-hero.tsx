import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const buttonClasses = (variant: 'primary' | 'secondary' = 'primary') => {
    const base = 'w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variants = {
        primary: 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'text-primary-700 bg-primary-100 hover:bg-primary-200 focus:ring-primary-500',
    };
    return cn(base, variants[variant]);
};

const ShapeLandingHero: React.FC = () => {
    return (
        <section className="relative bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                        Find Your Next Customer with{' '}
                        <span className="text-primary-600">LeadScraper AI</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
                        Stop guessing. Start growing. Our AI-powered platform uncovers high-quality leads tailored to your business, so you can focus on what you do best: closing deals.
                    </p>
                    <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                        <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                            <Link to="/signup" className={buttonClasses('primary')}>
                                Get Started for Free
                            </Link>
                            <Link to="/pricing" className={buttonClasses('secondary')}>
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 -z-1 transform translate-x-1/2 translate-y-1/2 hidden md:block">
                <div className="w-96 h-96 bg-primary-100 rounded-full filter blur-3xl opacity-50"></div>
            </div>
            <div className="absolute bottom-0 left-0 -z-1 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                <div className="w-96 h-96 bg-emerald-100 rounded-full filter blur-3xl opacity-50"></div>
            </div>
        </section>
    );
};

export default ShapeLandingHero;

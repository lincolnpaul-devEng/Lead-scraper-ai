import React from 'react';
import ShapeLandingHero from '../components/ui/shape-landing-hero';
import PricingSection from '../components/ui/pricing-section';
import { PRICING_PLANS } from '../constants';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';

const testimonials = [
    {
        quote: "LeadScraper AI has been a game-changer for our sales team. We've seen a 300% increase in qualified leads in just the first quarter. The AI enrichment is scarily accurate.",
        name: "Sarah Johnson",
        designation: "VP of Sales, Innovate Inc.",
        src: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        quote: "As a startup, we need to be efficient with our resources. This tool gives us the power of a full-fledged research team at a fraction of the cost. Highly recommended.",
        name: "Michael Chen",
        designation: "CEO, Data Solutions LLC",
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    },
    {
        quote: "The quality of leads is unparalleled. We're closing bigger deals, faster. The integration with our CRM was seamless, and it has streamlined our entire workflow.",
        name: "Jessica Rodriguez",
        designation: "Marketing Director, Creative Minds Agency",
        src: "https://i.pravatar.cc/150?u=a042581f4e29026706d"
    }
];

const FeatureSection = () => (
    <section className="bg-slate-50 py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Why LeadScraper AI?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    Go beyond simple contact lists. Our platform provides deep, actionable insights.
                </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-slate-900">Precision Targeting</h3>
                    <p className="mt-2 text-base text-slate-600">
                        Find your ideal customers with dozens of filters, from company size and industry to technology stack and recent funding rounds.
                    </p>
                </div>
                <div className="text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-slate-900">AI-Powered Enrichment</h3>
                    <p className="mt-2 text-base text-slate-600">
                        Get real-time insights, including company summaries, key personnel, and recent news, to personalize your outreach and boost response rates.
                    </p>
                </div>
                <div className="text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v4z"></path></svg>
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-slate-900">Streamlined Workflow</h3>
                    <p className="mt-2 text-base text-slate-600">
                        Export leads to CSV or seamlessly integrate with your favorite CRM like Salesforce and Hubspot to keep your pipeline full.
                    </p>
                </div>
            </div>
        </div>
    </section>
);


const TestimonialSection = () => (
    <section className="bg-white py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Loved by Growing Teams</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    Don't just take our word for it. Here's what our customers are saying.
                </p>
            </div>
            <div className="mt-16">
                <AnimatedTestimonials testimonials={testimonials} />
            </div>
        </div>
    </section>
);

const HomePricingSection = () => (
    <section className="bg-slate-50 py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Simple, Transparent Pricing</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    Choose the plan that's right for your business. No hidden fees.
                </p>
            </div>
            <PricingSection plans={PRICING_PLANS} />
        </div>
    </section>
);

const HomePage: React.FC = () => {
    return (
        <>
            <ShapeLandingHero />
            <FeatureSection />
            <TestimonialSection />
            <HomePricingSection />
        </>
    );
};

export default HomePage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Layers, BarChart, CheckCircle } from '../components/icons';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';

const FeatureCard: React.FC<{ icon: React.ReactElement, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 mb-4">
            {React.cloneElement(icon, { className: "h-6 w-6" })}
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

const testimonialsData = [
    {
      quote:
        "The attention to detail and innovative features in LeadScraper AI have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=500&h=500&auto=format&fit=crop",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. LeadScraper AI's platform flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&h=500&auto=format&fit=crop",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=500&h=500&auto=format&fit=crop",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises like LeadScraper AI.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=500&h=500&auto=format&fit=crop",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=500&h=500&auto=format&fit=crop",
    },
];

const HomePage: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                        Automated B2B Lead Generation
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-primary-600 tracking-tight mt-2">
                        with AI-Powered Enrichment
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
                        Stop wasting time on manual prospecting. Find, qualify, and connect with your ideal customers faster than ever before.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link to="/signup" className="px-8 py-3 text-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-md transform hover:-translate-y-0.5 transition">
                            Get Started for Free
                        </Link>
                        <Link to="/pricing" className="px-8 py-3 text-lg font-semibold text-primary-600 bg-white hover:bg-primary-50 rounded-md border border-slate-300 shadow-md transform hover:-translate-y-0.5 transition">
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">Find Your Next Customer, Instantly</h2>
                        <p className="mt-4 text-lg text-slate-600">Powerful tools to supercharge your sales pipeline.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Search />}
                            title="Targeted Lead Search"
                            description="Filter by industry, company size, location, and technology to find laser-targeted leads."
                        />
                        <FeatureCard
                            icon={<Layers />}
                            title="AI Data Enrichment"
                            description="Go beyond basic info. Get AI-generated company summaries, key contacts, and buying signals."
                        />
                        <FeatureCard
                            icon={<BarChart />}
                            title="Actionable Analytics"
                            description="Track your outreach performance, identify your best lead sources, and optimize your strategy."
                        />
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900">Trusted by Sales Teams Worldwide</h2>
                        <div className="mt-8 flex justify-center space-x-12">
                           <p className="text-slate-500 font-semibold text-lg">Innovate Inc.</p>
                           <p className="text-slate-500 font-semibold text-lg">Growth Co.</p>
                           <p className="text-slate-500 font-semibold text-lg">Solutions LLC</p>
                           <p className="text-slate-500 font-semibold text-lg">Market Leaders</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-10 md:py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-4 md:mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">What Our Customers Say</h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Real stories from sales leaders who trust LeadScraper AI to grow their business.</p>
                    </div>
                    <AnimatedTestimonials testimonials={testimonialsData} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Ready to Grow Your Business?</h2>
                    <p className="mt-4 text-lg text-primary-200 max-w-2xl mx-auto">
                        Join thousands of companies who are closing more deals with LeadScraper AI.
                        Start your free trial today, no credit card required.
                    </p>
                    <div className="mt-8">
                        <Link to="/signup" className="px-8 py-4 text-lg font-semibold text-primary-700 bg-white hover:bg-primary-50 rounded-md shadow-lg transform hover:-translate-y-1 transition">
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
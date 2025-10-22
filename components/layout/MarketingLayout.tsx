
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Logo } from '../icons';
import { Button } from '../ui/button';

const Header: React.FC = () => (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0">
                    <Link to="/" className="flex items-center gap-2">
                        <Logo className="h-8 w-auto text-primary-600" />
                        <span className="text-xl font-bold tracking-tight text-slate-800">LeadScraper</span>
                    </Link>
                </div>
                <nav className="hidden md:flex md:space-x-8">
                    <NavLink to="/features" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'}`}>Features</NavLink>
                    <NavLink to="/use-cases" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'}`}>Use Cases</NavLink>
                    <NavLink to="/pricing" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'}`}>Pricing</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'}`}>About</NavLink>
                </nav>
                <div className="flex items-center space-x-4">
                     <Link to="/login" className="hidden md:inline-block text-sm font-medium text-slate-600 hover:text-slate-900">Sign In</Link>
                     <Link to="/signup">
                        <Button>Sign Up</Button>
                     </Link>
                </div>
            </div>
        </div>
    </header>
);

const Footer: React.FC = () => (
    <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8 xl:col-span-1">
                    <Link to="/" className="flex items-center gap-2">
                        <Logo className="h-8 w-auto text-primary-600" />
                        <span className="text-xl font-bold tracking-tight text-slate-800">LeadScraper</span>
                    </Link>
                    <p className="text-slate-500 text-sm">AI-powered lead generation to fuel your growth.</p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                    {/* Add footer links if needed */}
                </div>
            </div>
            <div className="mt-12 border-t border-slate-200 pt-8">
                <p className="text-sm text-slate-500 text-center">&copy; {new Date().getFullYear()} LeadScraper AI. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const MarketingLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MarketingLayout;

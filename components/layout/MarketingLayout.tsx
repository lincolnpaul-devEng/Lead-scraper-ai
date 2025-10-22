
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo, Menu, X } from '../icons';

const MarketingHeader: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Features', href: '#' },
        { name: 'Use Cases', href: '#' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'About', href: '#' },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                            <Logo className="h-8 w-auto"/>
                            <span className="text-xl font-bold tracking-tight text-slate-800">LeadScraper AI</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        {navItems.map((item) => (
                            <NavLink key={item.name} to={item.href} className={({isActive}) => `text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors ${isActive ? 'text-primary-600' : ''}`}>
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/login" className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-md">
                            Log In
                        </Link>
                        <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm">
                            Sign Up
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         {navItems.map((item) => (
                            <NavLink key={item.name} to={item.href} className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'}`}>
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-slate-200">
                        <div className="px-5 space-y-2">
                             <Link to="/signup" className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm">
                                Sign Up
                            </Link>
                            <Link to="/login" className="block w-full text-center px-4 py-2 text-base font-medium text-primary-600 hover:bg-primary-50 rounded-md">
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

const MarketingFooter: React.FC = () => (
    <footer className="bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} LeadScraper AI. All rights reserved.</p>
                <div className="flex space-x-6">
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-700">Privacy</a>
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-700">Terms</a>
                </div>
            </div>
        </div>
    </footer>
);

const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <MarketingHeader />
            <main className="flex-grow">{children}</main>
            <MarketingFooter />
        </div>
    );
};

export default MarketingLayout;

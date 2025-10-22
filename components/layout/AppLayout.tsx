
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo, Home, Users, Settings, X } from '../icons';
import AppHeader from './AppHeader';

const SidebarContent: React.FC = () => {
    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Leads', href: '/leads', icon: Users },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];
    return (
        <>
            <div className="h-16 flex items-center justify-center px-4 border-b border-slate-200 flex-shrink-0">
                <Link to="/dashboard" className="flex items-center gap-2 text-primary-600">
                    <Logo className="h-8 w-auto text-primary-600" />
                    <span className="text-xl font-bold tracking-tight text-slate-800">LeadScraper</span>
                </Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navItems.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                isActive
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`
                        }
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </>
    );
};


const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex bg-slate-100 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                 <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 md:hidden`}>
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>
                <div className="flex flex-col h-full">
                    <SidebarContent />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1 bg-white border-r border-slate-200">
                        <SidebarContent />
                    </div>
                </div>
            </aside>

            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                 <AppHeader onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;


import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../App';
import { Logo, Home, Users, Search, BarChart, Settings, Layers, LifeBuoy, LogOut, ChevronDown, Menu, X } from '../icons';

interface NavItemProps {
    to: string;
    icon: React.ReactElement;
    children: React.ReactNode;
    disabled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, children, disabled }) => {
    const baseClasses = "flex items-center px-3 py-2.5 text-sm font-medium rounded-md";
    const activeClasses = "bg-primary-100 text-primary-700";
    const inactiveClasses = "text-slate-600 hover:bg-slate-100 hover:text-slate-900";
    const disabledClasses = "text-slate-400 cursor-not-allowed";

    const content = (
        <>
            {React.cloneElement(icon, { className: "h-5 w-5 mr-3" })}
            <span className="flex-1">{children}</span>
        </>
    );

    if (disabled) {
        return <div className={`${baseClasses} ${disabledClasses}`}>{content}</div>;
    }

    return (
        <NavLink to={to} className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {content}
        </NavLink>
    );
};


const Sidebar: React.FC<{isSidebarOpen: boolean}> = ({ isSidebarOpen }) => {
    return (
        <aside className={`fixed inset-y-0 left-0 bg-white border-r border-slate-200 z-50 w-64 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex md:flex-col`}>
             <div className="flex items-center justify-center h-16 border-b border-slate-200 px-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-primary-600">
                    <Logo className="h-8 w-auto"/>
                    <span className="text-xl font-bold text-slate-800">LeadScraper</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-2 space-y-1">
                    <NavItem to="/dashboard" icon={<Home />}>Dashboard</NavItem>
                    <NavItem to="/leads" icon={<Users />}>Leads</NavItem>
                    <NavItem to="/search" icon={<Search />} disabled>Search</NavItem>
                    <NavItem to="/analytics" icon={<BarChart />} disabled>Analytics</NavItem>
                    <NavItem to="/integrations" icon={<Layers />} disabled>Integrations</NavItem>
                </nav>
            </div>
            <div className="px-2 py-4 border-t border-slate-200">
                <nav className="space-y-1">
                    <NavItem to="/help" icon={<LifeBuoy />} disabled>Support</NavItem>
                    <NavItem to="/settings" icon={<Settings />} disabled>Account</NavItem>
                </nav>
            </div>
        </aside>
    );
};

const AppHeader: React.FC<{toggleSidebar: () => void}> = ({ toggleSidebar }) => {
    const { logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
         <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button onClick={toggleSidebar} className="md:hidden text-slate-500 hover:text-slate-700">
                         <Menu className="h-6 w-6" />
                    </button>
                    <div className="flex-1">
                        {/* Can add breadcrumbs or page title here */}
                    </div>
                    <div className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 text-left p-2 rounded-lg hover:bg-slate-100">
                            <img className="h-8 w-8 rounded-full" src={`https://i.pravatar.cc/150?u=a042581f4e29026704d`} alt="User avatar"/>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-slate-800">Jane Doe</p>
                                <p className="text-xs text-slate-500">Growth Plan</p>
                            </div>
                            <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                <Link to="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Your Profile</Link>
                                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/30 z-40 md:hidden"></div>}
            <div className="flex-1 flex flex-col overflow-hidden">
                <AppHeader toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="container mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;

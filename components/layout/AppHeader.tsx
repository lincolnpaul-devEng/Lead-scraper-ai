import React, { useState } from 'react';
import { Search, Bell, Menu } from '../icons';
import ProfileModal from '../ui/ProfileModal';
import { useAuth } from '../../App';

const AppHeader: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    const { session } = useAuth();
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    
    const user = session?.user;
    
    // Fallback avatar if one isn't set in Supabase metadata
    const userAvatar = user?.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user?.id}`;

    return (
        <>
            <header className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-slate-200 shadow-sm">
                <button
                    type="button"
                    className="px-4 border-r border-slate-200 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
                    onClick={onMenuClick}
                >
                    <Menu className="h-6 w-6" />
                </button>
                <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-8">
                    <div className="flex-1 flex">
                        <form className="w-full flex md:ml-0" action="#" method="GET">
                            <div className="relative w-full text-slate-400 focus-within:text-slate-600">
                                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5" />
                                </div>
                                <input
                                    id="search-field"
                                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-slate-900 placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                    placeholder="Search..."
                                    type="search"
                                    name="search"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                        <button type="button" className="bg-white p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            <Bell className="h-6 w-6" />
                        </button>
                        <div className="ml-3 relative">
                            {user && (
                                <div>
                                    <button type="button" className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" onClick={() => setProfileModalOpen(prev => !prev)}>
                                        <img className="h-8 w-8 rounded-full" src={userAvatar} alt="User Avatar" />
                                    </button>
                                </div>
                            )}
                            {isProfileModalOpen && <ProfileModal onClose={() => setProfileModalOpen(false)} />}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default AppHeader;
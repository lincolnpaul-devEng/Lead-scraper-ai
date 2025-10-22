import React, { useState } from 'react';
import EditProfileModal from './EditProfileModal';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { supabase } from '../../lib/supabase';

const ProfileModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { session } = useAuth();
    const navigate = useNavigate();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    
    const user = session?.user;

    const handleLogout = async () => {
        onClose();
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (!user) return null; // Should not render if there's no user session

    const userForEditModal = {
        name: user.user_metadata?.full_name || user.email || '',
        email: user.email || '',
        role: user.user_metadata?.role || 'Sales Manager', // Default role
        avatar: user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`,
    };

    return (
        <>
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <div className="py-1">
                     <div className="px-4 py-3 border-b">
                        <p className="text-sm text-slate-900 font-semibold">Signed in as</p>
                        <p className="text-sm text-slate-600 truncate">{userForEditModal.name}</p>
                    </div>
                    <button onClick={() => { setEditModalOpen(true); onClose(); }} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        Edit Profile
                    </button>
                    <Link to="/settings" onClick={onClose} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        Settings
                    </Link>
                     <div className="border-t my-1"></div>
                     <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        Logout
                    </button>
                </div>
            </div>
            {isEditModalOpen && <EditProfileModal user={userForEditModal} onClose={() => setEditModalOpen(false)} />}
        </>
    );
};

export default ProfileModal;
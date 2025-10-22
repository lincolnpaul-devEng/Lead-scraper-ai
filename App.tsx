
import React, { createContext, useContext, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import MarketingLayout from './components/layout/MarketingLayout';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import SettingsPage from './pages/SettingsPage';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

// 1. Auth Context for providing session info throughout the app
interface AuthContextType {
    session: Session | null;
    loading: boolean;
}
const AuthContext = createContext<AuthContextType>({ session: null, loading: true });

// 2. Auth Provider component to wrap the app and manage auth state
// FIX: Changed component definition to use React.FC for consistency, which can resolve subtle TypeScript errors.
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for auth state changes (login, logout, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // Cleanup subscription on unmount
        return () => subscription.unsubscribe();
    }, []);

    const value = { session, loading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom hook for easy access to auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// 4. Component to handle routing logic based on auth state
const AppRoutes = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <Routes>
            {/* Public routes redirect to dashboard if user is logged in */}
            <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!session ? <SignUpPage /> : <Navigate to="/dashboard" />} />

            {/* Marketing pages */}
            <Route element={<MarketingLayout><Outlet /></MarketingLayout>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/pricing" element={<PricingPage />} />
            </Route>

            {/* Protected application routes */}
            <Route element={session ? <AppLayout><Outlet /></AppLayout> : <Navigate to="/login" />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
};

// 5. Main App component
const App: React.FC = () => {
    return (
        <HashRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </HashRouter>
    );
};

export default App;

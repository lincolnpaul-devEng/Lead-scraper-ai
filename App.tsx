
import React, { createContext, useContext, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';

// Layouts
import MarketingLayout from './components/layout/MarketingLayout';
import AppLayout from './components/layout/AppLayout';

// Marketing Pages
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import UseCasesPage from './pages/UseCasesPage';
import AboutPage from './pages/AboutPage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// App Pages
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import SettingsPage from './pages/SettingsPage';

// Auth Context
interface AuthContextType {
    session: Session | null;
}

const AuthContext = createContext<AuthContextType>({ session: null });

export const useAuth = () => {
    return useContext(AuthContext);
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session } = useAuth();
    if (!session) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div className="text-xl">Loading...</div></div>;
    }

    return (
        <HashRouter>
            <AuthContext.Provider value={{ session }}>
                <Routes>
                    {/* Marketing Site - Conditionally rendered */}
                    {!session && (
                      <Route element={<MarketingLayout />}>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/pricing" element={<PricingPage />} />
                          <Route path="/features" element={<FeaturesPage />} />
                          <Route path="/use-cases" element={<UseCasesPage />} />
                          <Route path="/about" element={<AboutPage />} />
                      </Route>
                    )}

                    {/* Auth */}
                    <Route path="/login" element={session ? <Navigate to="/dashboard" /> : <LoginPage />} />
                    <Route path="/signup" element={session ? <Navigate to="/dashboard" /> : <SignUpPage />} />
                    
                    {/* App */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <AppLayout><DashboardPage /></AppLayout>
                        </ProtectedRoute>
                    }/>
                    <Route path="/leads" element={
                        <ProtectedRoute>
                            <AppLayout><LeadsPage /></AppLayout>
                        </ProtectedRoute>
                    }/>
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <AppLayout><SettingsPage /></AppLayout>
                        </ProtectedRoute>
                    }/>
                    
                    {/* Redirect logic */}
                    <Route 
                        path="/" 
                        element={
                            session ? <Navigate to="/dashboard" replace /> : <Navigate to="/" />
                        } 
                    />
                    <Route path="*" element={<Navigate to={session ? "/dashboard" : "/"} replace />} />
                </Routes>
            </AuthContext.Provider>
        </HashRouter>
    );
};

export default App;

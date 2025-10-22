
import React, { useState, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import AppLayout from './components/layout/AppLayout';
import MarketingLayout from './components/layout/MarketingLayout';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppLayout><Outlet /></AppLayout> : <Navigate to="/login" />;
};

const PublicRoute: React.FC = () => {
    return <MarketingLayout><Outlet /></MarketingLayout>;
};

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Route>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            {/* Redirect root of protected area to dashboard */}
            <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          </Route>
          
          <Route path="*" element={<div className="h-screen w-full flex flex-col items-center justify-center bg-slate-100">
              <h1 className="text-4xl font-bold text-primary-600">404 - Not Found</h1>
              <p className="text-slate-600 mt-2">The page you're looking for doesn't exist.</p>
              <Link to="/" className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Go Home</Link>
          </div>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;

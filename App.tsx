import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { ManagementPage } from './pages/admin/Management';
import { ProductionPage } from './pages/worker/Production';
import { DeliveryRoutePage } from './pages/delivery/Route';
import { VisitPage } from './pages/delivery/Visit';
import { UserRole } from './types';
import { supabase } from './lib/supabase';

// Simple Auth Context simulation
interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  name: string;
}

const App: React.FC = () => {
  useEffect(() => {
    if (supabase) {
      console.log('Supabase client initialized:', supabase);
    } else {
      console.error('Supabase client not initialized. Check environment variables.');
    }
  }, []);

  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    name: ''
  });

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-800 p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Configuration Error</h1>
          <p>Supabase environment variables are missing.</p>
          <p className="mt-2 text-sm">Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.</p>
        </div>
      </div>
    );
  }

  const handleLogin = (role: UserRole, name: string) => {
    setAuth({ isAuthenticated: true, role, name });
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, role: null, name: '' });
  };

  if (!auth.isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <Layout userRole={auth.role!} userName={auth.name} onLogout={handleLogout}>
        <Routes>
          {/* Admin Routes */}
          {auth.role === 'ADMIN' && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/clients" element={<ManagementPage type="clients" />} />
              <Route path="/admin/products" element={<ManagementPage type="products" />} />
              <Route path="/admin/inventory" element={<ManagementPage type="inventory" />} />
              <Route path="/admin/users" element={<ManagementPage type="users" />} />
              <Route path="/admin/orders" element={<ProductionPage />} />
              <Route path="/admin/production" element={<ProductionPage />} />
              <Route path="/admin/invoices" element={<ManagementPage type="invoices" />} />
              <Route path="/admin/purchases" element={<ManagementPage type="purchases" />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </>
          )}

          {/* Worker Routes */}
          {auth.role === 'WORKER' && (
            <>
              <Route path="/worker/production" element={<ProductionPage />} />
              <Route path="/worker/orders" element={<ProductionPage />} />
              <Route path="/worker/inventory" element={<ManagementPage type="inventory" />} />
              <Route path="*" element={<Navigate to="/worker/production" replace />} />
            </>
          )}

          {/* Delivery Routes */}
          {auth.role === 'DELIVERY' && (
            <>
              <Route path="/delivery" element={<DeliveryRoutePage />} />
              <Route path="/delivery/visit/:clientId" element={<VisitPage />} />
              <Route path="/delivery/history" element={<ManagementPage type="clients" />} />
              <Route path="*" element={<Navigate to="/delivery" replace />} />
            </>
          )}

          <Route path="/" element={<Navigate to={
            auth.role === 'ADMIN' ? '/admin' :
              auth.role === 'WORKER' ? '/worker/production' :
                '/delivery'
          } replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
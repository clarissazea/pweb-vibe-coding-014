import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Header from './components/Common/Header';

// Pages
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import FoodFormPage from './pages/FoodFormPage';
import ExpiringSoonPage from './pages/ExpiringSoonPage';

const ProtectedLayout: React.FC<{ onSearch: (q: string) => void; globalSearchQuery: string }> = ({ onSearch, globalSearchQuery }) => {
  return (
    <>
      <Header onSearch={onSearch} />
      <main className="main-content">
        {/* Pass globalSearchQuery via props in each Route */}
        <Outlet />
      </main>
    </>
  );
};

const App: React.FC = () => {
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout onSearch={setGlobalSearchQuery} globalSearchQuery={globalSearchQuery} />}>
              <Route index element={<DashboardPage globalSearchQuery={globalSearchQuery} />} />
              <Route path="add" element={<FoodFormPage />} />
              <Route path="expiring" element={<ExpiringSoonPage />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>404 | Halaman Tidak Ditemukan</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute: React.FC<{ redirectPath?: string }> = ({ redirectPath = '/auth' }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
};

export default ProtectedRoute;

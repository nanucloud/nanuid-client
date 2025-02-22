import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const refreshToken = Cookies.get("refresh_token");
  return refreshToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
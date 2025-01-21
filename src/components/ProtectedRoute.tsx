import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedProps) => {
  const userCookie = Cookies.get("SYS-REFRESH");

  if (!userCookie) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

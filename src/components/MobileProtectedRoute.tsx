import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedProps {
  children: ReactNode;
}

const MobileProtectedRoute = ({ children }: ProtectedProps) => {
  const userCookie = Cookies.get("SYS-REFRESH");

  if (!userCookie) {
    return <Navigate to="/app/login" replace />;
  }

  return children;
};

export default MobileProtectedRoute;

import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children?: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-4 md:p-6 max-w-5xl">
      {children || <Outlet />}
    </main>
  </div>
);

export default Layout;
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  username: string;
  email: string;
}

const Layout: React.FC<LayoutProps> = ({ children  , username , email} ) => (
  <div className="flex min-h-screen bg-gray-50">
     <Sidebar />
    <main className="flex-1 p-4 md:p-6 max-w-5xl">{children}</main>
  </div>
);

export default Layout;

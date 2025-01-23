import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50">
     <Sidebar name="이동현" email="m**@*******n.cc" />
    <main className="flex-1 p-4 md:p-6 max-w-5xl">{children}</main>
  </div>
);

export default Layout;

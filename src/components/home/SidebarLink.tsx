import React from "react";
import { Link } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text, active }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 p-3 rounded-lg ${
      active ? "bg-gray-100" : "hover:bg-gray-50"
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-gray-700">{text}</span>
  </Link>
);

export default SidebarLink;

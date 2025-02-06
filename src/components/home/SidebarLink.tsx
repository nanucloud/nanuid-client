import React from "react";
import { Link } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  className?: string; // className을 받아 처리할 수 있도록 추가
  hideTextOnMobile?: boolean; // 모바일에서 텍스트를 숨길지 여부를 결정하는 props 추가
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  text,
  active,
  className,
  hideTextOnMobile = false, // 기본값은 false
}) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 p-3 rounded-lg ${active ? "bg-gray-100" : "hover:bg-gray-50"} ${className}`}
  >
    <span className="text-xl">{icon}</span>
    {/* hideTextOnMobile이 true일 때 텍스트 숨기기 */}
    <span className={`text-gray-700 ${hideTextOnMobile ? 'hidden md:inline' : 'md:inline'}`}>
      {text}
    </span>
  </Link>
);

export default SidebarLink;

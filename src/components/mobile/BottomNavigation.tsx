import React from "react";
import { useLocation } from "react-router-dom";
import { FaHome, FaKey, FaTag, FaUser } from "react-icons/fa";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { id: "home", label: "홈", icon: <FaHome />, path: "/app/home" },
    { id: "auth", label: "인증", icon: <FaKey />, path: "/app/auth" },
    { id: "token", label: "토큰", icon: <FaTag />, path: "/app/myinfo/token" },
    { id: "mypage", label: "마이페이지", icon: <FaUser />, path: "/app/mypage" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center justify-center w-full h-full ${
              location.pathname.startsWith(item.path) ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <div className="text-xl">{item.icon}</div>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;

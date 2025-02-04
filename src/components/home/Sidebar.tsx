import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { AuthService } from "../../services/AuthService";

const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState({ name: "", email: "", profileUrl: "/default_profile.png" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await AuthService.getProfile();
        setUser({
          name: profile.name,
          email: profile.email,
          profileUrl: profile.profileUrl || "/default_profile.png",
        });
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
  };

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-gray-200 hidden md:block flex-shrink-0">
      <div className="p-4">
        <img
          src="https://nanu.cc/NANU_Brand_Logo/NANU_ID_FULL_XS.svg"
          alt="NAMU Logo"
          style={{ height: "25px" }}
        />
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={user.profileUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="mt-2 px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded inline-block">
          MFA 활성화
        </div>
      </div>

      <nav className="flex-1 p-2">
        <SidebarLink to="/home" icon="🏠" text="홈" active={location.pathname === "/home"} />
        <SidebarLink to="/tokens" icon="🔑" text="토큰" active={location.pathname.startsWith("/tokens")} />
        <SidebarLink to="/security" icon="🔒" text="보안" active={location.pathname === "/auth"} />
        <SidebarLink to="/info" icon="ℹ️" text="마이페이지" active={location.pathname === "/info"} />
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors mt-4"
        >
          <div className="flex items-center gap-3">
            <span role="img" aria-label="logout" className="text-red-500">🚪</span>
            <span className="text-gray-700">로그아웃</span>
          </div>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

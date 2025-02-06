import { useLocation } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { useUserProfile } from "../UserProfileContext";
import { AuthService } from "../../services/AuthService";

const Sidebar = () => {
  const location = useLocation();
  const { userProfile, isLoading } = useUserProfile();

  const handleLogout = async () => {
    await AuthService.logout();
  };

  return (
    <aside className="fixed left-0 top-0 w-16 md:w-64 min-h-screen bg-white flex flex-col border-r border-gray-100 shadow-sm">
      {/* Logo Section - Fixed */}
      <div className="p-6 pb-4 bg-white">
        <img
          src="/nanuid_favicon.svg"
          alt="NAMU Logo"
          className="h-6 md:hidden"
        />
        <img
          src="https://nanu.cc/NANU_Brand_Logo/NANU_ID_FULL_XS.svg"
          alt="NAMU Logo"
          className="h-6 hidden md:block"
        />
      </div>

      {/* Scrollable Container */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Profile Section - 모바일에서 숨김 */}
        <div className="hidden md:block px-4 py-5 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                {isLoading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : (
                  <img
                    src={userProfile?.profileUrl || "/default_profile.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 truncate">
                {isLoading ? "로딩 중..." : userProfile?.name || "게스트"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {isLoading
                  ? "loading@example.com"
                  : userProfile?.email || "계정 정보 없음"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col px-2 py-4 gap-1">
          <SidebarLink
            to="/home"
            icon="🏠"
            text="홈"
            active={location.pathname === "/home"}
            hideTextOnMobile={true}
          />
          <SidebarLink
            to="/tokens"
            icon="🔐"
            text="토큰 관리"
            active={location.pathname.startsWith("/tokens")}
            hideTextOnMobile={true}
          />
          <SidebarLink
            to="/security"
            icon="🛡️"
            text="보안 설정"
            active={location.pathname === "/security"}
            hideTextOnMobile={true}
          />
          <SidebarLink
            to="/mypage"
            icon="📝"
            text="내 정보"
            active={location.pathname === "/mypage"}
            hideTextOnMobile={true}
          />
        </nav>

        {/* Logout Button - Fixed at bottom */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <span className="w-8 h-8 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center text-red-500">
              → 
            </span>
            <span className="hidden md:block text-gray-700 font-medium group-hover:text-red-500 transition-colors">
              로그아웃
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

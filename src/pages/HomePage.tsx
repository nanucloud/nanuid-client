import React, { useState, useEffect } from "react";
import {
  Edit,
  Smartphone,
  Lock,
  ChevronRight,
  Mail,
  LogOut,
} from "lucide-react";
import PasswordChangeDialog from "../components/mypage/PasswordChangeDialog";
import PinChangeDialog from "../components/mypage/PinChangeDialog";
import ProfileImageUpload from "../components/mypage/ProfileImageUpload";
import Layout from "../components/home/HomeLayout";
import { AuthService } from "../services/AuthService";
import { UserProfile } from "../types/Auth";

const MyPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 로컬에서 이름 수정용 state
  const [userName, setUserName] = useState<string>("");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await AuthService.getProfile();
        setProfile(data);
        setUserName(data.name); // 받아온 이름을 편집용 state에 저장
      } catch (err) {
        setError("프로필을 불러오지 못했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // 로딩 중이거나 에러가 있을 경우 간단한 메시지 표시
  if (isLoading) {
    return <div className="text-center mt-10">로딩 중...</div>;
  }

  if (error || !profile) {
    return <div className="text-center mt-10 text-red-500">{error || "프로필 데이터가 없습니다."}</div>;
  }

  return (
    <Layout username={profile.name} email={profile.email}>
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">마이페이지</h1>
          <p className="text-gray-600 mt-2">
            사용자 정보를 확인할 수 있어요
          </p>
        </header>

        {/* 프로필 섹션 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-8">
            <ProfileImageUpload
              profileImage={"/default_profile.png"} // API에서 프로필 이미지 정보가 있다면 해당 값을 사용
              userName={userName}
              className="w-16 h-16 border-2 border-blue-100"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                {isEditingName ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{userName}</h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                  </>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <Mail size={16} />
                <span className="text-sm">{profile.email}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-500 text-sm font-medium">보안 설정</h3>
            <div className="divide-y divide-gray-100">
              <PasswordChangeDialog>
                <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="text-blue-500" />
                    <span className="text-gray-700">비밀번호 변경</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </PasswordChangeDialog>

              <PinChangeDialog>
                <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-green-500" />
                    <span className="text-gray-700">보안 PIN 변경</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </PinChangeDialog>
            </div>
          </div>
        </div>

        {/* 연결된 기기 섹션은 API에서 추가 정보를 받는다면 구현 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-4">
            연결된 기기
          </h3>
          <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-xl">
            <Smartphone size={40} className="text-gray-300 mb-2" />
            <p className="text-gray-400 text-sm">연결된 기기가 없습니다</p>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <div className="mt-6">
          <button className="w-full flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut size={18} />
            <span className="text-sm">로그아웃</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;

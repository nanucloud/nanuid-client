import React, { useState } from "react";
import {
  Edit,
  Smartphone,
  Lock,
  ChevronRight,
  User,
  Mail,
  LogOut,
} from "lucide-react";
import PasswordChangeDialog from "../components/mypage/PasswordChangeDialog";
import PinChangeDialog from "../components/mypage/PinChangeDialog";
import ProfileImageUpload from "../components/mypage/ProfileImageUpload";
import Layout from "../components/home/HomeLayout";

const mockUserData = {
  name: "Lee Donghyun",
  email: "m*****n@gmail.com",
  phone: "010-****-7890",
  profileImage: "/default_profile.png",
  connectedDevices: [
    {
      loginDate: "2024.01.23 09:00",
      deviceName: "SM-P580 Android",
    },
  ],
};

const MyPage: React.FC = () => {
  const [userName, setUserName] = useState(mockUserData.name);
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <Layout username="Lee Donghyun" email="m*@*****n.cc">
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
                profileImage={mockUserData.profileImage}
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
                  <span className="text-sm">{mockUserData.email}</span>
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

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-4">
              연결된 기기
            </h3>

            {mockUserData.connectedDevices[0]?.deviceName === "NONE" ? (
              <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-xl">
                <Smartphone size={40} className="text-gray-300 mb-2" />
                <p className="text-gray-400 text-sm">연결된 기기가 없습니다</p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">
                      {mockUserData.connectedDevices[0]?.deviceName}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {mockUserData.connectedDevices[0]?.loginDate}
                    </p>
                  </div>
                  <button className="text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors">
                    연결 해제
                  </button>
                </div>
              </div>
            )}
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

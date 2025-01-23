import React, { useState } from "react";
import { Edit, Phone, Mail, User } from "lucide-react";
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
      deviceName: "SM-P580 Android"
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
          <h1 className="text-4xl font-bold">마이 페이지</h1>
          <p className="text-gray-600 mt-2">
            개인 정보를 확인하고 수정할 수 있습니다
          </p>
        </header>

        <div className="bg-white rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center border-b pb-6">
            <div className="flex items-center space-x-6">
              <ProfileImageUpload
                profileImage={mockUserData.profileImage}
                userName={userName}
              />
              <div>
                {isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="border rounded-lg px-2 py-1"
                    />
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="text-blue-500"
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold mr-2">{userName}</h2>
                    <button onClick={() => setIsEditingName(true)}>
                      <Edit size={18} className="text-gray-500" />
                    </button>
                  </div>
                )}
                <p className="text-gray-500">{mockUserData.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold">보안 설정</h3>
            <div className="space-y-3">
              <PasswordChangeDialog />
              <PinChangeDialog />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">로그인된 모바일 기기</h3>
          </div>

          {mockUserData.connectedDevices[0]?.deviceName === "NONE" ? (
            <div className="flex justify-center items-center h-32  bg-red-100 rounded-xl text-center">
              <p className="text-lg text-gray-600">로그인된 기기가 없습니다.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl pl-4 mb-4 flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-gray-800">
                  {mockUserData.connectedDevices[0]?.deviceName}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {mockUserData.connectedDevices[0]?.loginDate}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;

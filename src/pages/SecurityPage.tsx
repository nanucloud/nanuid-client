import React, { useState } from "react";
import StatusCard from "../components/home/StatusCard";
import Layout from "../components/home/HomeLayout";
import EmailAuthModal from "../components/token/EmailAuthModal";

const SecurityPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const verificationRecords = [
    {
      id: 1,
      date: "2024.1.23 AM 9:00 KST",
      device: "iPhone 13 Pro",
      location: "Seoul, Korea",
      status: "성공",
    },
    {
      id: 2,
      date: "2024.1.21 AM 2:00 KST",
      device: "Galaxy S21",
      location: "Busan, Korea",
      status: "성공",
    },
  ];

  const handleEmailAuth = (email: string) => {
    console.log("이메일 인증 요청:", email);
    setEmailVerified(true);
  };

  return (
    <Layout username="Lee Donghyun" email="m*@*****n.cc">
      <div className="max-w-5xl mx-auto">
        <EmailAuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleEmailAuth}
        />
        <header className="mb-8">
          <h1 className="text-4xl font-bold">보안</h1>
          <p className="text-gray-600 mt-2">
            보안에 관련된 정보를 확인할 수 있어요
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">인증 수단 관리</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusCard
              title="등록된 기기"
              subtitle="2대의 기기가 연결됨"
              active={true}
            />
            <StatusCard
              title="이메일 인증"
              subtitle={emailVerified ? "인증 완료" : "인증 필요"}
              active={emailVerified}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-semibold">인증 기록</h2>
            <h4 className="text-base text-gray-600">
              최근 1주일동안의 로그인 시도만 기록됩니다
            </h4>
          </div>
          <div className="bg-white rounded-xl shadow-sm">
            {verificationRecords.map((record, index) => (
              <div
                key={record.id}
                className="p-4 border-b last:border-b-0 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400 w-6">{index + 1}.</span>
                    <div>
                      <p className="font-medium">{record.device}</p>
                      <p className="text-sm text-gray-500">{record.date}</p>
                      <p className="text-sm text-gray-500">{record.location}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      record.status === "성공"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SecurityPage;

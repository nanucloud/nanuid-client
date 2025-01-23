import React from "react";
import StatusCard from "../components/home/StatusCard";
import LoginHistoryItem from "../components/home/LoginHistoryItem";
import Layout from "../components/home/HomeLayout";

const HomePage: React.FC = () => (
  <Layout>
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h2 className="text-5xl font-bold mb-1">반가워요</h2>
        <h1 className="text-5xl font-bold">이동현 님</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatusCard title="NANU ID APP MFA" subtitle="앱이 연결되지 않음" />
        <StatusCard
          title="이메일 사용 인증"
          subtitle="이메일이 인증되지 않음"
        />
        <StatusCard
          title="비밀번호"
          subtitle="이메일이 인증되지 않음"
          active={false}
        />
      </div>

      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">로그인 기록</h3>
          <button className="text-blue-500 hover:underline">전체 기록</button>
        </div>

        <LoginHistoryItem
          date="2024.1.23 AM 9:00 KST"
          service="DASHBOARD(NANUID)"
          device="Android Web"
          onClick={() => console.log("LoginHistoryItem clicked")}
        />
        <LoginHistoryItem
          date="2024.1.21 AM 2:00 KST"
          service="VocaVault Service"
          device="Windows Web"
          onClick={() => console.log("Another LoginHistoryItem clicked")}
        />
      </div>
    </div>
  </Layout>
);

export default HomePage;

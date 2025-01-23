import React from "react";
import StatusCard from "../components/home/StatusCard";
import LoginHistoryItem from "../components/home/LoginHistoryItem";
import Layout from "../components/home/HomeLayout";

const HomePage: React.FC = () => (
  <Layout username="Lee Donghyun" email="m*@*****n.cc">
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">반갑습니다</h1>
        <p className="text-gray-600 mt-2">Lee Donghyun 님의 나누아이디 사용을 환영합니다</p>
      </header>

      <h1 className="text-xl font-primary mb-2">추천 설정</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatusCard title="NANU ID APP MFA" subtitle="앱이 연결되지 않음" />
        <StatusCard
          title="이메일 사용 인증"
          subtitle="이메일이 인증되지 않음"
        />
        <StatusCard
          title="계정 유출 여부"
          subtitle="최근에 변경됨"
          active={false}
        />
      </div>

      <h1 className="text-xl font-primary mb-2">최근 활동</h1>
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

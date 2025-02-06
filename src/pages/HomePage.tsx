import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HomeService, LoginHistory, Status } from "../services/HomeService";
import StatusCard from "../components/home/StatusCard";
import LoginHistoryItem from "../components/home/LoginHistoryItem";
import Layout from "../components/home/HomeLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { useUserProfile } from "../components/UserProfileContext";

const HomePage: React.FC = () => {
  const location = useLocation();
  const { userProfile } = useUserProfile();
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (!userProfile) {
        setIsLoading(false);
        return;
      }

      try {
        const [statusData, historyData] = await Promise.all([
          HomeService.getStatusList(),
          HomeService.getLoginHistory()
        ]);

        if (isMounted) {
          setStatusList(statusData);
          setLoginHistory(historyData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생", error);
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, [userProfile]);

  if (!userProfile) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">반갑습니다</h1>
        <p className="text-gray-600 mt-2">
          {userProfile.name} 님의 나누아이디 사용을 환영합니다
        </p>
      </header>

      {isLoading ? (
        <div className="relative min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <h1 className="text-xl font-primary mb-2">추천 설정</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {statusList.map((status, index) => (
              <StatusCard
                key={index}
                title={status.title}
                subtitle={status.subtitle}
                active={status.active}
              />
            ))}
          </div>

          <h1 className="text-xl font-primary mb-2">최근 활동</h1>
          <div className="bg-white rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">로그인 기록</h3>
              <button className="text-blue-500 hover:underline">전체 기록</button>
            </div>

            {loginHistory.map((history, index) => (
              <LoginHistoryItem
                key={index}
                date={history.date}
                service={history.service}
                device={history.device}
                onClick={() => console.log(`로그인 기록 클릭됨: ${history.service}`)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
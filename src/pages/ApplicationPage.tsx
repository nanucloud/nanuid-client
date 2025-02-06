import React, { useEffect, useState } from "react";
import { useUserProfile } from "../components/UserProfileContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Application } from "../types/Application";
import { ApplicationService } from "../services/ApplicationService";
import { ApplicationCard } from "../components/application/ApplicationCard";



const ApplicationPage: React.FC = () => {
    const { userProfile } = useUserProfile();
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      let isMounted = true;
  
      async function fetchApplications() {
        if (!userProfile) {
          setIsLoading(false);
          return;
        }
  
        try {
          const data = await ApplicationService.getApplications();
          if (isMounted) {
            setApplications(data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("애플리케이션 데이터를 불러오는 중 오류 발생", error);
          if (isMounted) setIsLoading(false);
        }
      }
  
      fetchApplications();
      return () => { isMounted = false; };
    }, [userProfile]);
  
    const handleUpdateApplication = (updatedApp: Application) => {
      setApplications(apps => apps.map(app => 
        app.applicationId === updatedApp.applicationId ? updatedApp : app
      ));
    };
  
    const handleDeleteApplication = async (appId: string) => {
      const success = await ApplicationService.deleteApplication(appId);
      // if (success) {
      //   setApplications(apps => apps.filter(app => app.applicationId !== appId));
      // }
    };
  
    if (!userProfile) return null;
  
    return (
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">애플리케이션</h1>
          <p className="text-red-600 text-sm text-gray-500 mt-1">개발자 전용 (일반 사용자는 설정할 필요가 없습니다)</p>
          <p className="text-gray-600 mt-2">
            NANUID OAuth를 사용하여 안전하게 사용자 인증을 구현하세요
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
            새 애플리케이션 등록
          </button>
        </header>
  
        {isLoading ? (
          <div className="relative min-h-[200px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <ApplicationCard
                key={app.applicationId}
                application={app}
                onUpdate={handleUpdateApplication}
                onDelete={handleDeleteApplication}
              />
            ))}
          </div>
        )}
      </div>
    );
  };


export default ApplicationPage;
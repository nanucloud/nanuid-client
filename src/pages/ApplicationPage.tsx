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
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: false,
  });

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
    return () => {
      isMounted = false;
    };
  }, [userProfile]);

  const handleUpdateApplication = (updatedApp: Application) => {
    setApplications((apps) =>
      apps.map((app) =>
        app.applicationId === updatedApp.applicationId ? updatedApp : app
      )
    );
  };

  const handleDeleteApplication = async (appId: string) => {
    const success = await ApplicationService.deleteApplication(appId);
    if (success) {
      setApplications((apps) =>
        apps.filter((app) => app.applicationId !== appId)
      );
    }
  };

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newApp = await ApplicationService.createApplication(formData);
      setApplications((apps) => [...apps, newApp]);
      setShowModal(false);
      setFormData({ name: "", description: "", isPublic: false });
    } catch (error) {
      console.error("새 애플리케이션 등록 중 오류 발생", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (!userProfile) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">애플리케이션</h1>
        <p className="text-red-600 text-sm text-gray-500 mt-1">
          개발자 전용 (일반 사용자는 설정할 필요가 없습니다)
        </p>
        <p className="text-gray-600 mt-2">
          NANUID OAuth를 사용하여 안전하게 사용자 인증을 구현하세요
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
        >
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">새 애플리케이션 등록</h2>
            <form onSubmit={handleCreateApplication}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  애플리케이션 이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">설명</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm">공개 여부</span>
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationPage;

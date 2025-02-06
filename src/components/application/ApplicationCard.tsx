import { Application } from "../../types/Application";
import { useState } from "react";
import { ApplicationSettingsModal } from "./ApplicationSettingsModal";

export const ApplicationCard: React.FC<{
  application: Application;
  onUpdate: (app: Application) => void;
  onDelete: (appId: string) => void;
}> = ({ application, onUpdate, onDelete }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium">{application.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{application.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            application.isPublic ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"
          }`}>
            {application.isPublic ? "공개" : "비공개"}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-gray-500 w-24">Application ID</span>
            <code className="text-sm bg-gray-50 px-2 py-1 rounded">{application.applicationId}</code>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 w-24">Secret</span>
            <code className="text-sm bg-gray-50 px-2 py-1 rounded">{application.applicationSecret}</code>
          </div>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="mt-4 w-full py-2 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          앱 설정 관리
        </button>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <ApplicationSettingsModal
              application={application}
              onClose={() => setIsSettingsOpen(false)}
              onUpdate={(app) => {
                onUpdate(app);
                setIsSettingsOpen(false);
              }}
              onDelete={onDelete}
            />
          </div>
        </div>
      )}
    </>
  );
};
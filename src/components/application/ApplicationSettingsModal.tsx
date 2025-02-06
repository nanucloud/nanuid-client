import { useState, useEffect } from "react";
import { ApplicationService } from "../../services/ApplicationService";
import { Application } from "../../types/Application";

interface InviteUserDTO {
  email: string;
  role: "ADMIN" | "MEMBER";
}

interface InvitedUser {
  id: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  status: "PENDING" | "ACCEPTED";
  invitedAt: string;
}
export const ApplicationSettingsModal: React.FC<{
  application: Application;
  onClose: () => void;
  onUpdate: (app: Application) => void;
  onDelete: (appId: string) => void;
}> = ({ application, onClose, onUpdate, onDelete }) => {
  const [name, setName] = useState(application.name);
  const [isPublic, setIsPublic] = useState(application.isPublic);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvitedUsers = async () => {
      if (!application.isPublic) {
        //const users = await ApplicationService.getInvitedUsers(application.applicationId);
        //setInvitedUsers(users);
      }
    };
    fetchInvitedUsers();
  }, [application.applicationId, application.isPublic]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updated = await ApplicationService.updateApplication(
        application.applicationId,
        { name, isPublic }
      );
      if (updated) {
        onUpdate(updated);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setLoading(true);
    try {
      const invited = await ApplicationService.inviteUser(
        application.applicationId,
        { email: inviteEmail, role: 'MEMBER' }
      );
      //setInvitedUsers([...invitedUsers, invited]);
      setInviteEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="space-y-6 p-6">
          <div>
            <h2 className="text-lg font-medium mb-4">애플리케이션 설정</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">애플리케이션 이름</label>
                <input 
                  type="text"
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">공개 상태</label>
                <button 
                  onClick={() => setIsPublic(!isPublic)}
                  className={`w-12 h-6 rounded-full transition-colors ${isPublic ? 'bg-blue-500' : 'bg-gray-200'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {!isPublic && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">사용자 초대</label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="이메일 주소"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg"
                      />
                      <button
                        onClick={handleInvite}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                      >
                        초대
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">초대된 사용자</label>
                    <div className="space-y-2">
                      {invitedUsers.map(user => (
                        <div key={user.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>{user.email}</span>
                          <span className="text-sm text-gray-500">{user.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => onDelete(application.applicationId)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  앱 삭제
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
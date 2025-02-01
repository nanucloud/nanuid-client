import React, { useState } from "react";
import { Lock, X } from "lucide-react";

interface PasswordChangeDialogProps {
  children: React.ReactNode;
}

const PasswordChangeDialog: React.FC<PasswordChangeDialogProps> = ({ children }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handlePasswordChange = () => {
    console.log("Password change initiated");
    setIsOpen(false);
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)} 
        className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-3"> 
          <Lock size={18} className="text-blue-500" />
          <span className="text-gray-700">비밀번호 변경</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold text-gray-900">비밀번호 변경</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <input
                type="password"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handlePasswordChange}
                className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition"
              >
                비밀번호 변경
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeDialog;

import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const PasswordChangeDialog: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handlePasswordChange = () => {
    // Validation and password change logic
    console.log('Password change initiated');
    setIsOpen(false); // Close modal after submission
  };

  return (
    <div>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-gray-700 hover:text-gray-900"
      >
        <Lock size={18} className="mr-2" />
        비밀번호 변경
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <button
                onClick={handlePasswordChange}
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
              >
                비밀번호 변경
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg"
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

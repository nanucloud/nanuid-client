import React, { useState } from 'react';

interface EmailAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
}

const EmailAuthModal: React.FC<EmailAuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">이메일 인증</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="인증할 이메일을 입력하세요"
          className="w-full p-3 border rounded-lg mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={() => {
              onConfirm(email);
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            인증하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailAuthModal;
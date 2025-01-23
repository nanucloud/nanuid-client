import React, { useState } from 'react';
import { Shield, Trash2 } from 'lucide-react';

interface TokenHistoryItemProps {
  token: {
    id: string;
    service: string;
    date: string;
    device: string;
    ip: string;
    location: string;
  };
  onDelete: (id: string) => void;
  onBlockIP: (ip: string) => void;
}

const TokenHistoryItem: React.FC<TokenHistoryItemProps> = ({ token, onDelete, onBlockIP }) => {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'block'>('delete');

  const handleAction = () => {
    if (actionType === 'delete') {
      onDelete(token.id);
    } else if (actionType === 'block') {
      onBlockIP(token.ip);
    }
    setShowModal(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-lg sm:text-xl font-bold text-gray-800">{token.service}</span>
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {token.device}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div>
            <p className="text-gray-500 mb-1">날짜</p>
            <p className="font-medium text-gray-700">{token.date}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">IP 주소</p>
            <p className="font-medium text-gray-700">{token.ip}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-gray-500 mb-1">위치</p>
            <p className="font-medium text-gray-700">{token.location}</p>
          </div>
        </div>

        {/* 모바일 최적화된 액션 버튼 */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => { setActionType('delete'); setShowModal(true); }}
            className="flex items-center justify-center bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors w-full"
          >
            <Trash2 size={16} className="mr-2" />
            토큰 삭제
          </button>
          <button
            onClick={() => { setActionType('block'); setShowModal(true); }}
            className="flex items-center justify-center bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
          >
            <Shield size={16} className="mr-2" />
            IP 차단
          </button>
        </div>
      </div>

      {/* 경고 모달 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <p className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
              {actionType === 'delete' ? '정말로 이 토큰을 삭제하시겠습니까?' : 'IP를 차단하고 토큰을 삭제하시겠습니까?'}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              {actionType === 'delete' ? `서비스: ${token.service},  ${token.device} 에서 발급된 토큰을 더이상 사용할 수 없습니다!` : 
              `기존 토큰을 삭제하며 ${token.ip} / ${token.location} 에서 더이상 로그인 할 수 없습니다!`}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAction}
                className={`bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-opacity-80 transition-all`}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenHistoryItem;
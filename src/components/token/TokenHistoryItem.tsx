import React, { useState } from 'react';
import { Shield, Trash2, Globe, Clock, Monitor } from 'lucide-react';
import { FaApple, FaAndroid, FaLaptop, FaWindows } from 'react-icons/fa';  // Windows 아이콘 추가
import Token from '../../types/Token';

interface TokenHistoryItemProps {
  token: Token;
  onDelete: (id: string) => void;
  onBlockIP: (ip: string) => void;
}

const TokenHistoryItem: React.FC<TokenHistoryItemProps> = ({ token, onDelete, onBlockIP }) => {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'block'>('delete');

  const handleAction = () => {
    if (actionType === 'delete') {
      onDelete(token.refreshTokenId);
    } else {
      onBlockIP(token.ip);
    }
    setShowModal(false);
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'ANDROID':
        return <FaAndroid size={16} className="text-green-600" />;
      case 'IOS':
        return <FaApple size={16} className="text-gray-800" />;
      case 'MAC':
        return <FaLaptop size={16} className="text-gray-800" />;
      case 'WINDOWS':
        return <FaWindows size={16} className="text-blue-600" />;
      default:
        return <Monitor size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 mb-3 shadow-toss transition-all hover:shadow-toss-hover">
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            {getDeviceIcon(token.deviceType)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{token.applicationName}</h3>
            <p className="text-xs text-gray-500">{token.deviceType}</p>
          </div>
        </div>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
          Active
        </span>
      </div>

      {/* 정보 그리드 */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span className="text-gray-600">{token.authTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-gray-400" />
          <span className="text-gray-600">{token.location}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <Shield size={16} className="text-gray-400" />
          <span className="text-gray-600">{token.ip}</span>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-2 border-t pt-4">
        <button
          onClick={() => { setActionType('delete'); setShowModal(true); }}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash2 size={16} />
          <span className="text-sm">삭제하기</span>
        </button>
        <button
          onClick={() => { setActionType('block'); setShowModal(true); }}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Shield size={16} />
          <span className="text-sm">IP 차단</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {actionType === 'delete' ? '토큰 삭제' : 'IP 차단'}
              </h3>
              <p className="text-sm text-gray-500">
                {actionType === 'delete' 
                  ? `정말로 ${token.applicationId} 토큰을 삭제하시겠어요?`
                  : `이 IP 주소(${token.ip})를 차단하시겠어요?`}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAction}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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

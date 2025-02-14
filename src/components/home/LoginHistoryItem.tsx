import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Monitor, Bookmark } from "lucide-react";

interface LoginHistoryItemProps {
  date: string;
  service: string;
  device: string;
  tokenId: string;
}

const LoginHistoryItem: React.FC<LoginHistoryItemProps> = ({
  date,
  service,
  device,
  tokenId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tokens/${tokenId}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 transition-all duration-200">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <p className="text-sm">{date}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-500" />
              <p className="font-medium text-gray-900">
                서비스: {service}
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Monitor className="w-4 h-4" />
              <p className="text-sm">
                기기: {device}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleClick}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
        >
          자세히 알아보기
        </button>
      </div>
    </div>
  );
};

export default LoginHistoryItem;
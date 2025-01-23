import React from "react";

interface LoginHistoryItemProps {
  date: string;
  service: string;
  device: string;
  onClick: () => void;
}

const LoginHistoryItem: React.FC<LoginHistoryItemProps> = ({
  date,
  service,
  device,
  onClick,
}) => (
  <div className="bg-gray-100 rounded-lg p-4 mb-3">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-600 text-sm">{date}</p>
        <p className="font-medium">서비스: {service}</p>
        <p className="text-sm text-gray-600">기기: {device}</p>
      </div>
      <button
        onClick={onClick}
        className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        자세히 알아보기
      </button>
    </div>
  </div>
);

export default LoginHistoryItem;

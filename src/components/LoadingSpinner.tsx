import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-lg">사용자 정보 확인 중입니다...</p>
    </div>
  );
};

export default LoadingSpinner;
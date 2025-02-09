import React, { useState, useRef, useEffect } from "react";
import { FiLock, FiArrowRight } from "react-icons/fi";

interface OAuthPermissionDialogProps {
  serviceName: string;
  permissions: string[];
  onConfirm: () => void;
  isLoading?: boolean;
}

const OAuthPermissionDialog: React.FC<OAuthPermissionDialogProps> = ({
  serviceName,
  permissions,
  onConfirm,
  isLoading = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCancel = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.close();
    }
  };

  const handleDragStart = (clientX: number) => {
    if (isLoading) return;
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !sliderRef.current || !containerRef.current || isLoading)
      return;

    const container = containerRef.current.getBoundingClientRect();
    const maxX = container.width - sliderRef.current.offsetWidth;
    let newX = clientX - container.left - sliderRef.current.offsetWidth / 2;

    newX = Math.max(0, Math.min(newX, maxX));
    setSliderPosition(newX);

    if (newX >= maxX * 0.95) {
      setIsDragging(false);
      setSliderPosition(maxX);
      onConfirm();
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setSliderPosition(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <img 
              src="https://nanu.cc/NANU_Brand_Logo/NANU_ID_FULL_XS.svg"
              alt="NANU ID" 
              className="h-8"
            />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">{serviceName}</h2>
          <p className="text-base text-gray-600 mb-8 text-center">
            서비스를 NANU ID로 인증합니다
          </p>

          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <p className="text-gray-700 text-base mb-4">
              계속하면 다음의 정보가 위의 서비스로 제공됩니다.
            </p>
            <div className="space-y-2">
              {permissions.map((permission, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white rounded-xl p-4"
                >
                  <div className="w-1 h-4 bg-blue-500 rounded-full mr-3" />
                  <span className="text-gray-700">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div
              ref={containerRef}
              className="relative w-full h-14 rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-blue-400">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-300 via-pink-300 to-transparent rounded-r-xl"
                  style={{
                    width: `${(sliderPosition / (containerRef.current?.offsetWidth || 1)) * 100}%`,
                    transition: isDragging ? "none" : "width 0.1s ease-out",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <span className="text-white font-medium text-lg">
                    {isLoading ? "처리중..." : "밀어서 인증을 계속하세요"}
                  </span>
                </div>
              </div>
              <div
                ref={sliderRef}
                className="absolute left-0 top-0 h-full aspect-square bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center rounded-xl cursor-grab active:cursor-grabbing touch-none"
                style={{
                  transform: `translateX(${sliderPosition}px)`,
                  transition: isDragging ? "none" : "transform 0.2s ease",
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <FiArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>

            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="w-full bg-gray-100 text-gray-800 py-4 px-4 rounded-xl text-lg
                transition-transform duration-100 ease-in-out
                hover:bg-gray-200 active:scale-[0.99]
                disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthPermissionDialog;

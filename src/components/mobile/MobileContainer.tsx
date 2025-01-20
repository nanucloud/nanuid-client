import React from "react";
import BottomNavigation from "./BottomNavigation";

interface MobileContainerProps {
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default MobileContainer
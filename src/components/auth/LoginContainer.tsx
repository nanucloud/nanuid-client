import React from 'react';

interface LoginContainerProps {
  children: React.ReactNode;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center py-8">
      <div className="w-[1200px] h-[600px] bg-white shadow-lg overflow-hidden flex">
        {children}
      </div>
    </div>
  );
};

export default LoginContainer;
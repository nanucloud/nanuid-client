import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthService } from "../services/AuthService";
import { UserProfile } from "../types/Auth";

interface UserProfileContextType {
  userProfile: UserProfile | null;
  refreshProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const refreshProfile = async () => {
    try {
      const data = await AuthService.getProfile();
      setUserProfile(data);
    } catch (error) {
      console.error("프로필 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, refreshProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile은 UserProfileProvider 내부에서 사용되어야 합니다.");
  }
  return context;
};

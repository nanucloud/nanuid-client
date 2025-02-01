import React, { useState } from "react";
import { Camera } from "lucide-react";

interface ProfileImageUploadProps {
  profileImage: string;
  userName: string;
  className?: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ profileImage, userName, className }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="profile-upload" className="cursor-pointer">
        {/* 프로필 이미지 */}
        <img
          src={selectedImage || profileImage}
          alt={`${userName}의 프로필 이미지`}
          className="w-full h-full object-cover rounded-full"
        />
        
        {/* 업로드 버튼 */}
        <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-blue-600 transition">
          <Camera size={16} />
        </div>
      </label>

      {/* 파일 업로드 input (숨김) */}
      <input
        type="file"
        id="profile-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileImageUpload;

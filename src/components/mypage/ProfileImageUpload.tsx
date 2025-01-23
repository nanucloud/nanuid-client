import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface ProfileImageUploadProps {
  profileImage: string;
  userName: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ profileImage, userName }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Avatar 부분을 간단한 img 태그로 대체 */}
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <div>
        <input 
          type="file" 
          id="profile-upload" 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
        <label 
          htmlFor="profile-upload" 
          className="flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100"
        >
          <Upload size={18} className="mr-2" />
          프로필 사진 변경
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUpload;

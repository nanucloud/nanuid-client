import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TokenService } from "../services/TokenService";
import { getLocationByIP } from "../services/IpLocationService";
import Token from "../types/Token";
import {
  ArrowLeft,
  Shield,
  Globe,
  Clock,
  Monitor,
  Smartphone,
  Hash,
  Activity,
} from "lucide-react";
import { FaApple, FaAndroid, FaLaptop, FaWindows } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const TokenDetailPage: React.FC = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const navigate = useNavigate();
  const [token, setToken] = useState<Token | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenDetail = async () => {
      setIsLoading(true);
      try {
        const tokenData = await TokenService.getToken(tokenId!);
        const location = await getLocationByIP(tokenData.ip);
        setToken({ ...tokenData, location });
      } catch (err) {
        setError("토큰 정보를 불러오는데 실패했습니다.");
        console.error("Error fetching token details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenDetail();
  }, [tokenId]);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "ANDROID":
        return <FaAndroid size={24} className="text-green-600" />;
      case "IOS":
        return <FaApple size={24} className="text-gray-800" />;
      case "MAC":
        return <FaLaptop size={24} className="text-gray-800" />;
      case "WINDOWS":
        return <FaWindows size={24} className="text-blue-600" />;
      default:
        return <Monitor size={24} className="text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 text-red-600 rounded-lg">
          <p>{error || "토큰을 찾을 수 없습니다."}</p>
          <button
            onClick={() => navigate("/tokens")}
            className="mt-4 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-500"
          >
            <ArrowLeft size={16} className="mr-2" />
            토큰 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <button
          onClick={() => navigate("/tokens")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>토큰 목록으로</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">토큰 상세 정보</h1>
      </div>

      <div className="bg-white rounded-xl shadow-toss p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            {getDeviceIcon(token.deviceType)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {token.applicationName}
            </h2>
            <p className="text-gray-500">{token.deviceType}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem
            icon={<Hash className="text-blue-500" />}
            label="토큰 ID"
            value={token.refreshTokenId}
          />
          <InfoItem
            icon={<Clock className="text-green-500" />}
            label="인증 시간"
            value={token.authTime}
          />
          <InfoItem
            icon={<Globe className="text-purple-500" />}
            label="위치"
            value={token.location || "알 수 없음"}
          />
          <InfoItem
            icon={<Shield className="text-red-500" />}
            label="IP 주소"
            value={token.ip}
          />
          <InfoItem
            icon={<Smartphone className="text-orange-500" />}
            label="기기 정보"
            value={token.deviceType || "알 수 없음"}
          />
          <InfoItem
            icon={<Activity className="text-indigo-500" />}
            label="상태"
            value="Active"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-toss p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">토큰 관리</h3>
        <button
          onClick={async () => {
            try {
              await TokenService.deleteToken(token.refreshTokenId);
              navigate("/tokens");
            } catch (err) {
              console.error("Error deleting token:", err);
              setError("토큰 삭제에 실패했습니다.");
            }
          }}
          className="w-full py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <Shield size={20} />
          <span>토큰 삭제하기</span>
        </button>
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-gray-900 font-medium break-all">{value}</p>
    </div>
  </div>
);

export default TokenDetailPage;

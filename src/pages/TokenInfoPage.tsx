import { useState, useEffect } from "react";
import TokenHistoryList from "../components/token/TokenHistoryList";
import { TokenService } from "../services/TokenService"; // TokenService import 추가
import { getLocationByIP } from "../services/IpLocationService";

interface Token {
  refreshTokenId: string;
  applicationId: string;
  applicationName: string;
  deviceType: string;
  authTime: string;
  ip: string;
  location?: string;
}

const TokenInfoPage: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]); // 초기값을 빈 배열로 설정

  // 토큰 위치 정보를 업데이트하는 함수
  const fetchLocationForTokens = async (tokens: Token[]) => {
    const updatedTokens = await Promise.all(
      tokens.map(async (token) => {
        const location = await getLocationByIP(token.ip);
        return { ...token, location };
      })
    );
    setTokens(updatedTokens); // 위치 정보 업데이트
  };

  // 서버에서 실제 토큰 목록을 가져오는 함수
  const fetchTokens = async () => {
    try {
      const tokensFromServer = await TokenService.getAllTokens(); // TokenService를 통해 토큰 가져오기
      setTokens(tokensFromServer); // 가져온 토큰 목록 설정
      await fetchLocationForTokens(tokensFromServer); // 위치 정보 가져오기 (비동기)
    } catch (error) {
      console.error("토큰을 가져오는 데 실패했습니다", error);
    }
  };

  // 최초 렌더링 시 토큰 목록 가져오기
  useEffect(() => {
    fetchTokens(); // 페이지가 로드될 때 토큰 목록 가져오기
  }, []); // 최초 렌더링 시 한 번만 실행

  // 토큰 삭제 처리
  const handleDeleteToken = async (refreshTokenId: string) => {
    try {
      await TokenService.deleteToken(refreshTokenId); // TokenService를 통해 토큰 삭제
      setTokens(tokens.filter((token) => token.refreshTokenId !== refreshTokenId)); // 화면에서 해당 토큰 삭제
      console.log(`Token ${refreshTokenId} deleted`);
    } catch (error) {
      console.error("토큰 삭제 실패", error);
    }
  };

  // IP 차단 처리
  const handleBlockIP = async (ip: string) => {
    try {
      await TokenService.blockIP(ip); // TokenService를 통해 IP 차단
      console.log(`IP ${ip} blocked`);
    } catch (error) {
      console.error("IP 차단 실패", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">토큰 내역</h1>
        <p className="text-gray-600 mt-2">로그인된 토큰 기록을 관리합니다</p>
      </header>

      <TokenHistoryList
        tokens={tokens}
        onDelete={handleDeleteToken}
        onBlockIP={handleBlockIP}
      />
    </div>
  );
};

export default TokenInfoPage;

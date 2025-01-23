import { useState, useEffect } from "react";
import TokenHistoryList from "../components/token/TokenHistoryList";
import Layout from "../components/home/HomeLayout";
import { getLocationByIP } from "../services/IpLocationService";
const mockTokens = [
  {
    id: '1',
    date: '2024.1.23 AM 9:00 KST',
    service: 'DASHBOARD(NANUID)',
    device: 'Android Web',
    ip: '103.21.244.31',
    location: ''  // 초기값은 빈 문자열
  },
  {
    id: '2', 
    date: '2024.1.21 AM 2:00 KST',
    service: 'VocaVault Service',
    device: 'Windows Web',
    ip: '103.21.244.91',
    location: ''  // 초기값은 빈 문자열
  }
];

const TokenInfoPage: React.FC = () => {
  const [tokens, setTokens] = useState(mockTokens);

  const fetchLocationForTokens = async () => {
    const updatedTokens = await Promise.all(
      tokens.map(async (token) => {
        const location = await getLocationByIP(token.ip);
        return { ...token, location };
      })
    );
    setTokens(updatedTokens); // 위치 정보 업데이트
  };

  useEffect(() => {
    fetchLocationForTokens(); // 컴포넌트가 마운트될 때 위치 정보 가져오기
  }, []); // 최초 렌더링 시 한 번만 실행

  const handleDeleteToken = (id: string) => {
    setTokens(tokens.filter(token => token.id !== id));
    console.log(`Token ${id} deleted`);
  };

  const handleBlockIP = (ip: string) => {
    console.log(`IP ${ip} blocked`);
  };

  return (
    <Layout username="Lee Donghyun" email="m*@*****n.cc">
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
    </Layout>
  );
};

export default TokenInfoPage;

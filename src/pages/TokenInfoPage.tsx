import { useState, useEffect } from "react";
import TokenHistoryList from "../components/token/TokenHistoryList";
import { TokenService } from "../services/TokenService";
import { getLocationByIP } from "../services/IpLocationService";
import Token from "../types/Token";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const TokenInfoPage: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchLocationForTokens = async (tokens: Token[]) => {
    const updatedTokens = await Promise.all(
      tokens.map(async (token) => {
        const location = await getLocationByIP(token.ip);
        return { ...token, location };
      })
    );
    setTokens(updatedTokens);
  };

  const fetchTokens = async (page: number) => {
    setIsLoading(true);
    try {
      const response: any = await TokenService.getAllTokens(page);
      setTokens(response.content);
      setTotalPages(response.totalPages);
      await fetchLocationForTokens(response.content);
    } catch (error) {
      console.error("토큰을 가져오는 데 실패했습니다", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDeleteToken = async (refreshTokenId: string) => {
    try {
      await TokenService.deleteToken(refreshTokenId);
      await fetchTokens(currentPage);
    } catch (error) {
      console.error("토큰 삭제 실패", error);
    }
  };

  const handleViewDetails = (tokenId: string) => {
    navigate(`/tokens/${tokenId}`);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`
            w-10 h-10 flex items-center justify-center rounded-lg
            text-sm font-medium transition-all duration-200
            ${currentPage === i 
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100" 
              : "text-gray-600 hover:bg-gray-100"
            }
          `}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center mt-8 space-x-1">
        <button
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="처음 페이지"
        >
          <ChevronsLeft size={18} />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="이전 페이지"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="flex items-center space-x-1">
          {pages}
        </div>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="다음 페이지"
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="마지막 페이지"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">토큰 내역</h1>
        <p className="text-gray-600 mt-2">로그인된 토큰 기록을 관리합니다</p>
      </header>

      {isLoading ? (
       <LoadingSpinner />
      ) : (
        <>
          <TokenHistoryList
            tokens={tokens}
            onDelete={handleDeleteToken}
            onViewDetails={handleViewDetails}
          />
          {totalPages > 1 && renderPagination()}
        </>
      )}
    </div>
  );
};
export default TokenInfoPage;
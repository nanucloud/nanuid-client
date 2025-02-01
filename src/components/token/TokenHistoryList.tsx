import React from 'react';
import TokenHistoryItem from './TokenHistoryItem';
import Token from '../../types/Token';
import { Shield } from 'lucide-react';

interface TokenHistoryListProps {
  tokens: Token[];
  onDelete: (id: string) => void;
  onBlockIP: (ip: string) => void;
}

const TokenHistoryList: React.FC<TokenHistoryListProps> = ({ tokens, onDelete, onBlockIP }) => {
  return (
    <div className="space-y-3">
      {tokens.map((token) => (
        <TokenHistoryItem 
          key={token.id} 
          token={token}
          onDelete={onDelete}
          onBlockIP={onBlockIP}
        />
      ))}
      
      {tokens.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
          <Shield size={40} className="text-gray-300 mb-3" />
          <p className="text-gray-400 text-sm">등록된 토큰이 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default TokenHistoryList;
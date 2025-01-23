import React from 'react';
import TokenHistoryItem from './TokenHistoryItem';
import Token from '../../types/Token';

interface TokenHistoryListProps {
  tokens: Token[];
  onDelete: (id: string) => void;
  onBlockIP: (ip: string) => void;
}

const TokenHistoryList: React.FC<TokenHistoryListProps> = ({ tokens, onDelete, onBlockIP }) => {
  return (
    <div>
      {tokens.map((token) => (
        <TokenHistoryItem 
          key={token.id} 
          token={token}
          onDelete={onDelete}
          onBlockIP={onBlockIP}
        />
      ))}
    </div>
  );
};

export default TokenHistoryList;
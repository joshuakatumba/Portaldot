import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Navigation } from './Navigation';

export const Header = () => {
  const { address, connectWallet, isConnecting } = useWeb3();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="header fade-in" role="banner">
      <div className="header-left">
        <div className="logo-mark">
          <img src="/favicon.jpg" alt="GhostFund" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
        </div>
        <div>
          <div className="header-title">GhostFund</div>
          <div className="header-sub">Compliant Private DeFi Yield Vault</div>
        </div>
      </div>
      
      <div className="header-center">
        <Navigation />
      </div>

      <div className="header-right">
        <button 
          type="button" 
          className={`btn-wallet ${address ? 'connected' : ''}`} 
          onClick={connectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : address ? formatAddress(address) : 'Connect Wallet'}
        </button>
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span id="block-display">Sepolia</span>
        </div>
        <div className="chain-badge">Chain 11155111</div>
      </div>
    </header>
  );
};

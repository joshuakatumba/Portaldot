import React, { ReactNode } from 'react';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Animated mesh gradient background */}
      <div className="mesh-bg">
        <div className="mesh-blob"></div>
        <div className="mesh-blob"></div>
        <div className="mesh-blob"></div>
      </div>
      <div className="noise"></div>
      <div className="grid-lines"></div>
      <div className="scan-line"></div>

      <div className="app">
        <Header />
        
        {/* Architecture Flow */}
        <div className="arch-flow fade-in delay-1">
          <span className="arch-node active">CRE Workflow</span>
          <span className="arch-arrow">&#10132;</span>
          <span className="arch-node active">GhostFund Vault</span>
          <span className="arch-arrow">&#10132;</span>
          <span className="arch-node active">Aave V3</span>
          <span className="arch-arrow">&#10132;</span>
          <span className="arch-node active">Private Tx</span>
          <span className="arch-arrow">&#10132;</span>
          <span className="arch-node active">ACE Policy</span>
        </div>

        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="footer fade-in delay-6">
          <div>
            <span id="refresh-bar">Auto-refresh every 30s</span>
            <div className="tech-badges" style={{ marginTop: '0.6rem' }}>
              <span className="tech-badge"><span className="dot" style={{ background: 'var(--accent)' }}></span>Chainlink CRE</span>
              <span className="tech-badge"><span className="dot" style={{ background: 'var(--cyan)' }}></span>Private Tx</span>
              <span className="tech-badge"><span className="dot" style={{ background: 'var(--green)' }}></span>ACE</span>
              <span className="tech-badge"><span className="dot" style={{ background: '#f59e0b' }}></span>Aave V3</span>
              <span className="tech-badge"><span className="dot" style={{ background: 'var(--red)' }}></span>Sepolia</span>
            </div>
          </div>
          <div className="footer-links">
            <a href="https://sepolia.etherscan.io/address/0x4964991514f731CB3CF252108dFF889d30036fcb" target="_blank" rel="noopener noreferrer">Vault on Etherscan ↗</a>
            <a href="https://sepolia.etherscan.io/address/0xB9431b3be9a56a1eeA8E728326332f8B4dD51382" target="_blank" rel="noopener noreferrer">GhostToken ↗</a>
          </div>
        </footer>
      </div>
    </>
  );
};

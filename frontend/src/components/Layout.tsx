import { type ReactNode } from 'react';
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
          <span className="arch-node active">TEE Yield Engine</span>
          <span className="arch-arrow">&#10132;</span>
          <span className="arch-node active">GhostFund Vault</span>
          <span className="arch-arrow">&#10132;</span>
          <span className="arch-node active">LendDot (EVM)</span>
          <span className="arch-arrow">&#10132;</span>
          <span className="arch-node active">Stealth Transfer</span>
          <span className="arch-arrow">&#10132;</span>
          <span className="arch-node active">Dual-VM Policy</span>
        </div>

        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="footer fade-in delay-6">
          <div>
            <span id="refresh-bar">System Status: Nominal · Monitoring Portaldot Runtimes</span>
            <div className="tech-badges" style={{ marginTop: '0.6rem' }}>
              <span className="tech-badge"><span className="dot" style={{ background: 'var(--accent)' }}></span>Acurast TEE</span>
              <span className="tech-badge"><span className="dot" style={{ background: 'var(--cyan)' }}></span>Stealth Transfer</span>
              <span className="tech-badge"><span className="dot" style={{ background: 'var(--green)' }}></span>Policy Engine</span>
              <span className="tech-badge"><span className="dot" style={{ background: '#f59e0b' }}></span>LendDot (EVM)</span>
              <span className="tech-badge"><span className="dot" style={{ background: 'var(--red)' }}></span>Portaldot Native</span>
            </div>
          </div>
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Portaldot Explorer ↗</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Vault Contract ↗</a>
          </div>
        </footer>
      </div>
    </>
  );
};

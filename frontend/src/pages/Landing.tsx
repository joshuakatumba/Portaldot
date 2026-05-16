import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

export const Landing = () => {
  const { address, connectWallet, isConnecting } = useWeb3();

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">Built on Portaldot Dual-VM</div>
          <h1 className="landing-title">
            Private DeFi Yield.<br />
            <span className="landing-title-accent">Automated. Compliant. Invisible.</span>
          </h1>
          <p className="landing-subtitle">
            GhostFund is a next-generation vault that earns yield on your assets through
            automated cross-VM strategies, enforces compliance at the contract level, and
            lets you withdraw privately with stealth addresses.
          </p>
          <div className="landing-cta-group">
            {address ? (
              <Link to="/dashboard" className="landing-cta-primary">
                Open Dashboard
              </Link>
            ) : (
              <button
                type="button"
                className="landing-cta-primary"
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
            <a
              href="https://github.com/joshuakatumba/Portaldot"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-cta-secondary"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <div className="landing-hero-visual">
          <div className="landing-orb landing-orb-1"></div>
          <div className="landing-orb landing-orb-2"></div>
          <div className="landing-orb landing-orb-3"></div>
          <div className="landing-grid-overlay"></div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="landing-stats">
        <div className="landing-stat-item">
          <span className="landing-stat-value">3</span>
          <span className="landing-stat-label">Core Primitives</span>
        </div>
        <div className="landing-stat-divider"></div>
        <div className="landing-stat-item">
          <span className="landing-stat-value">ink!</span>
          <span className="landing-stat-label">Rust Smart Contracts</span>
        </div>
        <div className="landing-stat-divider"></div>
        <div className="landing-stat-item">
          <span className="landing-stat-value">XVM</span>
          <span className="landing-stat-label">Cross-VM Bridge</span>
        </div>
        <div className="landing-stat-divider"></div>
        <div className="landing-stat-item">
          <span className="landing-stat-value">5 min</span>
          <span className="landing-stat-label">Yield Check Interval</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-section-header">
          <h2 className="landing-section-title">Three Primitives, One Vault</h2>
          <p className="landing-section-desc">
            GhostFund combines automated yield, on-chain compliance, and cryptographic
            privacy into a single protocol on Portaldot.
          </p>
        </div>

        <div className="landing-feature-grid">
          {/* Feature 1: Automated Yield */}
          <div className="landing-feature-card">
            <div className="landing-feature-icon landing-feature-icon-yield">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3 className="landing-feature-title">Automated Yield</h3>
            <p className="landing-feature-desc">
              An Acurast TEE monitors DeFi yields every 5 minutes. A Python relayer
              submits optimal strategies to the vault via the Portaldot SDK. Cross-VM
              calls rebalance capital across EVM lending pools automatically.
            </p>
            <div className="landing-feature-tags">
              <span className="landing-tag">Acurast TEE</span>
              <span className="landing-tag">XVM Calls</span>
              <span className="landing-tag">LendDot</span>
            </div>
          </div>

          {/* Feature 2: Compliance */}
          <div className="landing-feature-card">
            <div className="landing-feature-icon landing-feature-icon-compliance">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="landing-feature-title">On-Chain Compliance</h3>
            <p className="landing-feature-desc">
              Every deposit passes through the PortaldotPolicyEngine before entering
              the vault. Configurable policies enforce KYC allowlists, per-transaction
              caps, and an emergency circuit breaker -- all in native ink! contracts.
            </p>
            <div className="landing-feature-tags">
              <span className="landing-tag">AllowPolicy</span>
              <span className="landing-tag">MaxPolicy</span>
              <span className="landing-tag">PausePolicy</span>
            </div>
          </div>

          {/* Feature 3: Privacy */}
          <div className="landing-feature-card">
            <div className="landing-feature-icon landing-feature-icon-privacy">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </div>
            <h3 className="landing-feature-title">Stealth Withdrawals</h3>
            <p className="landing-feature-desc">
              Withdraw to one-time stealth addresses derived from ephemeral keys,
              completely breaking the on-chain link between depositor and recipient.
              Based on an adaptation of the ERC-5564 standard for Substrate.
            </p>
            <div className="landing-feature-tags">
              <span className="landing-tag">ERC-5564</span>
              <span className="landing-tag">Ephemeral Keys</span>
              <span className="landing-tag">Unlinkable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="landing-architecture">
        <div className="landing-section-header">
          <h2 className="landing-section-title">How It Works</h2>
          <p className="landing-section-desc">
            GhostFund operates at the intersection of Portaldot's Wasm and EVM
            runtimes, bridging the security of Rust with the liquidity of Solidity.
          </p>
        </div>

        <div className="landing-arch-flow">
          <div className="landing-arch-step">
            <div className="landing-arch-number">01</div>
            <h4 className="landing-arch-label">Deposit</h4>
            <p className="landing-arch-desc">
              User deposits tokens into the GhostFundVault ink! contract.
              The PolicyEngine validates compliance before accepting funds.
            </p>
          </div>
          <div className="landing-arch-connector"></div>
          <div className="landing-arch-step">
            <div className="landing-arch-number">02</div>
            <h4 className="landing-arch-label">Optimize</h4>
            <p className="landing-arch-desc">
              The Acurast TEE analyzes APY data across protocols. The Python
              relayer submits optimal strategies to the vault on-chain.
            </p>
          </div>
          <div className="landing-arch-connector"></div>
          <div className="landing-arch-step">
            <div className="landing-arch-number">03</div>
            <h4 className="landing-arch-label">Earn</h4>
            <p className="landing-arch-desc">
              The vault executes XVM calls to deposit into EVM lending pools
              like LendDot. Capital earns yield automatically.
            </p>
          </div>
          <div className="landing-arch-connector"></div>
          <div className="landing-arch-step">
            <div className="landing-arch-number">04</div>
            <h4 className="landing-arch-label">Withdraw Privately</h4>
            <p className="landing-arch-desc">
              Users withdraw to stealth addresses. Ephemeral keys ensure no
              on-chain link between the depositor and the final recipient.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="landing-tech">
        <div className="landing-section-header">
          <h2 className="landing-section-title">Built With</h2>
        </div>
        <div className="landing-tech-grid">
          <div className="landing-tech-item">
            <span className="landing-tech-name">Rust / ink!</span>
            <span className="landing-tech-role">Smart Contracts</span>
          </div>
          <div className="landing-tech-item">
            <span className="landing-tech-name">Portaldot</span>
            <span className="landing-tech-role">Dual-VM Substrate</span>
          </div>
          <div className="landing-tech-item">
            <span className="landing-tech-name">XVM</span>
            <span className="landing-tech-role">Cross-VM Bridge</span>
          </div>
          <div className="landing-tech-item">
            <span className="landing-tech-name">Acurast</span>
            <span className="landing-tech-role">TEE Automation</span>
          </div>
          <div className="landing-tech-item">
            <span className="landing-tech-name">React + Vite</span>
            <span className="landing-tech-role">Frontend</span>
          </div>
          <div className="landing-tech-item">
            <span className="landing-tech-name">TypeScript</span>
            <span className="landing-tech-role">Type Safety</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-bottom-cta">
        <h2 className="landing-bottom-title">Ready to go private?</h2>
        <p className="landing-bottom-desc">
          Connect your wallet and start earning compliant, private DeFi yield today.
        </p>
        <div className="landing-cta-group">
          {address ? (
            <Link to="/dashboard" className="landing-cta-primary">
              Open Dashboard
            </Link>
          ) : (
            <button
              type="button"
              className="landing-cta-primary"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Launch App'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

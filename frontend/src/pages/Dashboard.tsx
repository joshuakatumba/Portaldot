import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

export const Dashboard = () => {
  const { provider, signer, address } = useWeb3();
  const [activeTab, setActiveTab] = useState<'vault' | 'lenddot'>('vault');

  return (
    <>
      {/* Stats Banner */}
      <div className="stats-banner fade-in delay-2">
        <div className="stat-card">
          <div className="stat-card-label">GhostToken Balance</div>
          <div className="stat-card-value stat-accent" id="stat-ghost-bal"><span className="skeleton skeleton-value">&nbsp;</span></div>
          <div className="stat-card-sub" id="stat-ghost-sub">Loading...</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">LendDot Supplied</div>
          <div className="stat-card-value stat-cyan" id="stat-lenddot-bal"><span className="skeleton skeleton-value">&nbsp;</span></div>
          <div className="stat-card-sub" id="stat-lenddot-sub">Loading...</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Current APY</div>
          <div className="stat-card-value stat-green" id="stat-apy"><span className="skeleton skeleton-value">&nbsp;</span></div>
          <div className="stat-card-sub">LendDot (EVM) supply rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Recommendations</div>
          <div className="stat-card-value" id="stat-rec-count"><span className="skeleton skeleton-value">&nbsp;</span></div>
          <div className="stat-card-sub" id="stat-rec-sub">Loading...</div>
        </div>
      </div>

      {/* Strategy Status */}
      <div className="card fade-in delay-3" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <span className="card-title">TEE Yield Engine</span>
          <div className="card-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Strategy Rules</div>
            <div className="data-row"><span className="data-label">Schedule</span><span className="data-value" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>Every 5 minutes</span></div>
            <div className="data-row"><span className="data-label">Deposit when</span><span className="data-value" style={{ fontSize: '0.82rem', color: 'var(--green)' }}>APY ≥ 2% + idle funds</span></div>
            <div className="data-row"><span className="data-label">Withdraw when</span><span className="data-value" style={{ fontSize: '0.82rem', color: 'var(--red)' }}>APY drops below 1%</span></div>
            <div className="data-row"><span className="data-label">Min deposit</span><span className="data-value" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>0.000001 tokens</span></div>
            <div className="data-row"><span className="data-label">Approval</span><span className="badge badge-green">Human-in-loop</span></div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Current Conditions</div>
            <div className="data-row"><span className="data-label">LendDot APY</span><span className="data-value stat-green" id="strategy-apy" style={{ fontSize: '0.9rem' }}>--</span></div>
            <div className="data-row"><span className="data-label">Idle vault funds</span><span className="data-value" id="strategy-idle" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>--</span></div>
            <div className="data-row"><span className="data-label">LendDot position</span><span className="data-value" id="strategy-lenddot" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>--</span></div>
            <div className="data-row"><span className="data-label">Next action</span><span className="badge" id="strategy-action">Checking...</span></div>
            <div className="data-row"><span className="data-label">Privacy</span><span className="badge badge-accent">PT Shielded</span></div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="live-dot"></span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Automated by Acurast TEE — runs on Portaldot network every 5 min</span>
          </div>
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Forwarder-only access · Owner approves on-chain</span>
        </div>
      </div>

      {/* Operations Panel (Owner Only) - Visible if wallet connected for now */}
      {address && (
        <div className="card ops-panel fade-in delay-3" id="ops-panel">
          <div className="card-header">
            <span className="card-title">Operations</span>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
          </div>
          <div className="ops-tabs">
            <button type="button" className={`ops-tab ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}>Vault Deposit / Withdraw</button>
            <button type="button" className={`ops-tab ${activeTab === 'lenddot' ? 'active' : ''}`} onClick={() => setActiveTab('lenddot')}>LendDot Pool</button>
          </div>

          {/* Vault Tab */}
          {activeTab === 'vault' && (
            <div className="ops-body active" id="ops-vault">
              <div className="ops-form">
                <div className="ops-field">
                  <span className="ops-label">Token</span>
                  <select className="ops-select" id="vault-token">
                    <option value="ghost">GhostToken</option>
                    <option value="test">LendDot Test Token</option>
                  </select>
                </div>
                <div className="ops-field">
                  <label className="ops-label" htmlFor="vault-amount">Amount</label>
                  <div className="ops-input-wrap">
                    <input className="ops-input" id="vault-amount" type="text" inputMode="decimal" placeholder="0.0" autoComplete="off" />
                    <button type="button" className="ops-max-btn">MAX</button>
                  </div>
                </div>
                <div className="ops-balances" id="vault-balances">
                  <div className="ops-bal-card">
                    <div className="ops-bal-label">Your Wallet</div>
                    <div className="ops-bal-value" id="vault-user-bal">--</div>
                  </div>
                  <div className="ops-bal-card">
                    <div className="ops-bal-label">Vault Balance</div>
                    <div className="ops-bal-value" id="vault-vault-bal">--</div>
                  </div>
                  <div className="ops-bal-card">
                    <div className="ops-bal-label">Allowance</div>
                    <div className="ops-bal-value" id="vault-allowance">--</div>
                  </div>
                </div>
                <div className="ops-actions">
                  <button type="button" className="ops-btn ops-btn-deposit" id="btn-vault-deposit">Deposit to Vault</button>
                  <button type="button" className="ops-btn ops-btn-withdraw" id="btn-vault-withdraw">Withdraw from Vault</button>
                  <span className="ops-status" id="vault-status"></span>
                </div>
              </div>
            </div>
          )}

          {/* LendDot Pool Tab */}
          {activeTab === 'lenddot' && (
            <div className="ops-body active" id="ops-lenddot">
              <div className="ops-form">
                <div className="ops-field">
                  <span className="ops-label">Token</span>
                  <select className="ops-select" id="lenddot-token">
                    <option value="ghost">GhostToken</option>
                    <option value="test">LendDot Test Token</option>
                  </select>
                </div>
                <div className="ops-field">
                  <label className="ops-label" htmlFor="lenddot-amount">Amount</label>
                  <div className="ops-input-wrap">
                    <input className="ops-input" id="lenddot-amount" type="text" inputMode="decimal" placeholder="0.0" autoComplete="off" />
                    <button type="button" className="ops-max-btn">MAX</button>
                  </div>
                </div>
                <div className="ops-balances" id="lenddot-balances">
                  <div className="ops-bal-card">
                    <div className="ops-bal-label">Vault Idle Balance</div>
                    <div className="ops-bal-value" id="lenddot-idle-bal">--</div>
                  </div>
                  <div className="ops-bal-card">
                    <div className="ops-bal-label">LendDot Supplied</div>
                    <div className="ops-bal-value" id="lenddot-supplied-bal">--</div>
                  </div>
                </div>
                <div className="ops-actions">
                  <button type="button" className="ops-btn ops-btn-supply" id="btn-lenddot-supply">Supply to LendDot</button>
                  <button type="button" className="ops-btn ops-btn-withdraw" id="btn-lenddot-withdraw">Withdraw from LendDot</button>
                  <span className="ops-status" id="lenddot-status"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid">
        {/* Recommendations (wide) */}
        <div className="card col-8 fade-in delay-4">
          <div className="card-header">
            <span className="card-title">Recent Recommendations</span>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3L8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></svg>
            </div>
          </div>
          <div id="recommendations">
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line" style={{ width: '80%' }}></div>
            <div className="skeleton skeleton-line" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Dual-VM Policies */}
        <div className="card col-4 fade-in delay-4">
          <div className="card-header">
            <span className="card-title">Dual-VM Policies</span>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
          </div>
          <div id="policies">
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line" style={{ width: '70%' }}></div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card col-12 fade-in delay-5">
          <div className="card-header">
            <span className="card-title">Vault Activity</span>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
          </div>
          <div id="activity-feed">
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line" style={{ width: '80%' }}></div>
          </div>
        </div>

        {/* Deployed Contracts */}
        <div className="card col-6 fade-in delay-5">
          <div className="card-header">
            <span className="card-title">Deployed Contracts</span>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
          </div>
          <div id="contracts">
            <div className="contract-row">
              <span className="contract-name">GhostFundVault</span>
              <span className="contract-addr" title="Click to copy">0x4964...6fcb</span>
            </div>
            <div className="contract-row">
              <span className="contract-name">GhostToken</span>
              <span className="contract-addr" title="Click to copy">0xB943...1382</span>
            </div>
            <div className="contract-row">
              <span className="contract-name">PolicyEngine</span>
              <span className="contract-addr" title="Click to copy">0x7324...a1E4</span>
            </div>
            <div className="contract-row">
              <span className="contract-name">PT Vault</span>
              <span className="contract-addr" title="Click to copy">0xE588...2d13</span>
            </div>
            <div className="contract-row">
              <span className="contract-name">DepositExtractor</span>
              <span className="contract-addr" title="Click to copy">0x15fb...89d4</span>
            </div>
            <div className="contract-row">
              <span className="contract-name">LendDot Pool</span>
              <span className="contract-addr" title="Click to copy">0x6Ae4...8951</span>
            </div>
          </div>
        </div>

        {/* Vault Details */}
        <div className="card col-6 fade-in delay-6">
          <div className="card-header">
            <span className="card-title">Vault Details</span>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </div>
          </div>
          <div id="vault-details">
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line" style={{ width: '70%' }}></div>
            <div className="skeleton skeleton-line" style={{ width: '55%' }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

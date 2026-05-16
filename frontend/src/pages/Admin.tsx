import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

export const Admin = () => {
  const { address } = useWeb3();
  const [isPaused, setIsPaused] = useState(false);
  const [maxDeposit, setMaxDeposit] = useState('10000');

  // Simple check for demonstration. In reality, check against contract owner
  const isOwner = address !== null; 

  if (!isOwner) {
    return (
      <div className="card fade-in delay-2" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
        <div style={{ color: 'var(--red)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--red)', marginBottom: '1rem', letterSpacing: '0.1em' }}>RESTRICTED ACCESS</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>You must connect as the PortaldotPolicyEngine owner to view this page and manage protocol parameters.</p>
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="card col-12 fade-in delay-2">
        <div className="card-header">
          <span className="card-title">Policy Control Center</span>
          <div className="card-icon" style={{ color: 'var(--red)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '1.5rem' }}>
          
          {/* Protocol Controls */}
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.25rem', letterSpacing: '0.08em' }}>Protocol Status & Controls</h3>
            
            <div className="data-row" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Emergency Pause</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Halt all deposits and strategy shifts</div>
              </div>
              <button 
                onClick={() => setIsPaused(!isPaused)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-xs)',
                  border: `1px solid ${isPaused ? 'var(--green)' : 'var(--red)'}`,
                  background: isPaused ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                  color: isPaused ? 'var(--green)' : 'var(--red)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {isPaused ? 'RESUME' : 'PAUSE'}
              </button>
            </div>

            <div className="ops-field" style={{ marginTop: '2rem' }}>
              <label className="ops-label" style={{ marginBottom: '0.75rem' }}>Max Deposit Limit (GhostToken)</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input 
                  className="ops-input" 
                  type="text" 
                  value={maxDeposit}
                  onChange={(e) => setMaxDeposit(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button className="btn-approve" style={{ padding: '0 1.5rem', height: '42px', fontSize: '0.75rem' }}>UPDATE</button>
              </div>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Per-transaction cap enforced by PortaldotPolicyEngine.</p>
            </div>
          </div>

          {/* Allowlist Registry */}
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.25rem', letterSpacing: '0.08em' }}>Compliance Allowlist</h3>
            <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1.25rem', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', letterSpacing: '0.05em' }}>
                <span>ADDRESS</span>
                <span>STATUS</span>
              </div>
              <div style={{ padding: '0.85rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>0x1234...abcd</span>
                <span className="badge badge-green" style={{ fontSize: '0.6rem' }}>APPROVED</span>
              </div>
              <div style={{ padding: '0.85rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>0x9999...efff</span>
                <span className="badge badge-red" style={{ fontSize: '0.6rem' }}>BLOCKED</span>
              </div>
              <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.1)', display: 'flex', gap: '0.75rem' }}>
                <input className="ops-input" type="text" placeholder="Add address 0x..." style={{ flex: 1, height: '38px', fontSize: '0.75rem' }} />
                <button className="btn-approve" style={{ height: '38px', padding: '0 1rem', fontSize: '0.75rem' }}>ADD</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

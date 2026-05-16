import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

export const Admin = () => {
  const { address } = useWeb3();
  const [isPaused, setIsPaused] = useState(false);
  const [maxDeposit, setMaxDeposit] = useState('10000');

  // Simple check for demonstration. In reality, check against contract owner
  const isOwner = address !== null; 

  if (!isOwner) {
    return (
      <div className="card fade-in delay-2" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>&#128274;</div>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--red)', marginBottom: '1rem' }}>RESTRICTED ACCESS</h2>
        <p style={{ color: 'var(--text-secondary)' }}>You must connect as the PortaldotPolicyEngine owner to view this page.</p>
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="card col-12 fade-in delay-2">
        <div className="card-header">
          <span className="card-title">Policy Control Center</span>
          <div className="card-icon" style={{ color: 'var(--red)' }}>&#9888;</div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
          
          {/* Protocol Controls */}
          <div>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Protocol Status</h3>
            
            <div className="data-row" style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Emergency Pause</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Halt all deposits and strategy shifts</div>
              </div>
              <button 
                onClick={() => setIsPaused(!isPaused)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  border: `1px solid ${isPaused ? 'var(--green)' : 'var(--red)'}`,
                  background: isPaused ? 'var(--green-dim)' : 'var(--red-dim)',
                  color: isPaused ? 'var(--green)' : 'var(--red)',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                {isPaused ? 'RESUME' : 'PAUSE'}
              </button>
            </div>

            <div className="ops-field" style={{ marginTop: '1.5rem' }}>
              <label className="ops-label">Max Deposit Limit (Tokens)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  className="ops-input" 
                  type="text" 
                  value={maxDeposit}
                  onChange={(e) => setMaxDeposit(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button className="btn-approve" style={{ padding: '0 1.5rem' }}>UPDATE</button>
              </div>
            </div>
          </div>

          {/* Allowlist Registry */}
          <div>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Allowlist Registry</h3>
            <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', fontSize: '0.7rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between' }}>
                <span>ADDRESS</span>
                <span>STATUS</span>
              </div>
              <div style={{ padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>0x1234...abcd</span>
                <span className="badge badge-green">APPROVED</span>
              </div>
              <div style={{ padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>0x9999...efff</span>
                <span className="badge badge-red">BLOCKED</span>
              </div>
              <div style={{ padding: '1rem', background: 'var(--glass-bg)', display: 'flex', gap: '0.5rem' }}>
                <input className="ops-input" type="text" placeholder="Add address 0x..." style={{ flex: 1, height: '32px' }} />
                <button className="btn-approve" style={{ height: '32px' }}>ADD</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

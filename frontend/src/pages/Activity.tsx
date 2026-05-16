import React, { useState, useEffect } from 'react';

const MOCK_LOGS = [
  { timestamp: '14:02:11.432', type: 'INFO', module: 'Portaldot', message: 'Syncing relay chain headers...' },
  { timestamp: '14:02:15.001', type: 'WARN', module: 'Acurast TEE', message: 'Waiting for verifiable random function response' },
  { timestamp: '14:02:18.992', type: 'SUCCESS', module: 'Acurast TEE', message: 'Report generated successfully. Attestation valid.' },
  { timestamp: '14:03:00.120', type: 'INFO', module: 'PolicyEngine', message: 'Evaluating LendDot yield parameters' },
  { timestamp: '14:03:02.441', type: 'ACTION', module: 'GhostVault', message: 'Strategy shift: Depositing 1500 tokens to LendDot' },
  { timestamp: '14:03:15.772', type: 'INFO', module: 'Stealth', message: 'New ephemeral key broadcast detected' },
];

export const Activity = () => {
  const [logs, setLogs] = useState<typeof MOCK_LOGS>([]);

  useEffect(() => {
    // Simulate incoming logs
    let index = 0;
    const interval = setInterval(() => {
      if (index < MOCK_LOGS.length) {
        setLogs(prev => [...prev, MOCK_LOGS[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getColorForType = (type: string) => {
    switch (type) {
      case 'INFO': return 'var(--text-secondary)';
      case 'WARN': return 'var(--yellow)';
      case 'SUCCESS': return 'var(--green)';
      case 'ACTION': return 'var(--cyan)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="card fade-in delay-2" style={{ height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: 0, paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-default)' }}>
        <span className="card-title">System Logs & Acurast Feed</span>
        <div className="card-icon" style={{ color: 'var(--accent)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
        </div>
      </div>
      
      <div className="console-feed" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '1rem', borderBottom: '1px dashed var(--border-default)', paddingBottom: '1rem' }}>
          [SYSTEM] Initializing secure connection to Acurast Trusted Execution Environment...<br />
          [SYSTEM] Portaldot SDK: Version 0.4.2 stable<br />
          [SYSTEM] Listening for GhostFundVault extrinsics on-chain...<br />
        </div>

        {logs.map((log, i) => (
          <div key={i} style={{ display: 'flex', gap: '1.25rem', animation: 'fadeUp 0.4s ease-out forwards', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--text-muted)', minWidth: '85px', opacity: 0.6 }}>{log.timestamp}</span>
            <span style={{ color: getColorForType(log.type), minWidth: '75px', fontWeight: 700 }}>[{log.type}]</span>
            <span style={{ color: 'var(--accent-bright)', minWidth: '110px', opacity: 0.9 }}>{log.module}</span>
            <span style={{ color: 'var(--text-primary)', lineBreak: 'anywhere' }}>{log.message}</span>
          </div>
        ))}
        
        {logs.length < MOCK_LOGS.length && (
          <div style={{ display: 'flex', gap: '1rem', opacity: 0.4, marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>&gt;</span>
            <span className="live-dot" style={{ width: '6px', height: '6px', alignSelf: 'center', background: 'var(--text-muted)', boxShadow: 'none' }}></span>
          </div>
        )}
      </div>
    </div>
  );
};

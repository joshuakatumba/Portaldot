import React, { useState, useEffect } from 'react';

const MOCK_LOGS = [
  { timestamp: '14:02:11.432', type: 'INFO', module: 'Portaldot', message: 'Syncing relay chain headers...' },
  { timestamp: '14:02:15.001', type: 'WARN', module: 'Acurast TEE', message: 'Waiting for verifiable random function response' },
  { timestamp: '14:02:18.992', type: 'SUCCESS', module: 'Acurast TEE', message: 'Report generated successfully. Attestation valid.' },
  { timestamp: '14:03:00.120', type: 'INFO', module: 'PolicyEngine', message: 'Evaluating LendDot yield parameters' },
  { timestamp: '14:03:02.441', type: 'ACTION', module: 'GhostVault', message: 'Strategy shift: Depositing 1500 tokens to Aave V3' },
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
      <div className="card-header" style={{ marginBottom: 0, paddingBottom: '1rem', borderBottom: '1px solid var(--border-default)' }}>
        <span className="card-title">System Logs & Acurast Feed</span>
        <div className="card-icon" style={{ color: 'var(--accent)' }}>&#9002;</div>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Initializing connection to Acurast Trusted Execution Environment...<br />
          Listening for Portaldot extrinsics...<br />
          --------------------------------------------------
        </div>

        {logs.map((log, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', animation: 'fadeUp 0.3s ease-out forwards' }}>
            <span style={{ color: 'var(--text-muted)', minWidth: '85px' }}>{log.timestamp}</span>
            <span style={{ color: getColorForType(log.type), minWidth: '65px' }}>[{log.type}]</span>
            <span style={{ color: 'var(--accent-bright)', minWidth: '100px' }}>{log.module}</span>
            <span style={{ color: 'var(--text-primary)' }}>{log.message}</span>
          </div>
        ))}
        
        {logs.length < MOCK_LOGS.length && (
          <div style={{ display: 'flex', gap: '1rem', opacity: 0.5 }}>
            <span style={{ color: 'var(--text-muted)' }}>&gt;</span>
            <span className="live-dot" style={{ width: '6px', height: '6px', alignSelf: 'center', background: 'var(--text-muted)', boxShadow: 'none' }}></span>
          </div>
        )}
      </div>
    </div>
  );
};

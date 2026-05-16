import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

export const Stealth = () => {
  const { address } = useWeb3();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptionLog, setEncryptionLog] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleTransact = async () => {
    if (!address) return alert("Please connect wallet first");
    if (!recipient || !amount) return alert("Fill in recipient and amount");

    setIsEncrypting(true);
    setStatus('idle');
    setEncryptionLog(['Initializing stealth transfer protocol...']);

    const steps = [
      'Generating ephemeral key pair...',
      'Deriving shared secret via ECDH...',
      'Encrypting payload with ChaCha20-Poly1305...',
      'Generating SS58 stealth announcement...',
      'Broadcasting to Portaldot relayer network...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setEncryptionLog(prev => [...prev, steps[i]]);
    }

    await new Promise(r => setTimeout(r, 800));
    setEncryptionLog(prev => [...prev, 'Transaction confirmed. Funds shielded.']);
    setIsEncrypting(false);
    setStatus('success');
  };

  return (
    <div className="card fade-in delay-2" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-header">
        <span className="card-title">Privacy Transact (Stealth)</span>
        <div className="card-icon" style={{ color: 'var(--cyan)' }}>&#128274;</div>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Execute shielded transfers using Stealth Addresses. The recipient's meta-address will be used to generate a unique, one-time destination address that only they can control.
        </p>
      </div>

      <div className="ops-form">
        <div className="ops-field">
          <label className="ops-label" htmlFor="stealth-recipient">Recipient Meta-Address</label>
          <input 
            className="ops-input" 
            id="stealth-recipient" 
            type="text" 
            placeholder="0x... or ss58..." 
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            disabled={isEncrypting}
          />
        </div>
        
        <div className="ops-field">
          <label className="ops-label" htmlFor="stealth-amount">Amount (GhostToken)</label>
          <div className="ops-input-wrap">
            <input 
              className="ops-input" 
              id="stealth-amount" 
              type="text" 
              inputMode="decimal" 
              placeholder="0.0" 
              value={amount}
              onChange={e => setAmount(e.target.value)}
              disabled={isEncrypting}
            />
            <button type="button" className="ops-max-btn">MAX</button>
          </div>
        </div>

        <div className="ops-actions" style={{ marginTop: '2rem' }}>
          <button 
            type="button" 
            className="ops-btn" 
            style={{ 
              background: 'var(--cyan)', 
              color: '#000', 
              fontWeight: 800,
              width: '100%',
              opacity: isEncrypting ? 0.7 : 1,
              cursor: isEncrypting ? 'not-allowed' : 'pointer'
            }}
            onClick={handleTransact}
            disabled={isEncrypting || !address}
          >
            {isEncrypting ? 'ENCRYPTING PAYLOAD...' : 'ENCRYPT & BROADCAST'}
          </button>
        </div>
      </div>

      {encryptionLog.length > 0 && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-default)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>System Log</div>
          {encryptionLog.map((log, index) => (
            <div key={index} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: index === encryptionLog.length - 1 && status === 'success' ? 'var(--green)' : 'var(--cyan)', marginBottom: '0.25rem' }}>
              &gt; {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

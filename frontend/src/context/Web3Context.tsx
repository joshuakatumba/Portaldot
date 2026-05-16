import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type BrowserProvider, type JsonRpcSigner, ethers } from 'ethers';

// Declare window.ethereum for TypeScript to fix the red lines
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  address: string | null;
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Basic setup if window.ethereum exists
    if (typeof window !== 'undefined' && window.ethereum) {
      const initProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(initProvider);
      
      // Check if already connected
      initProvider.listAccounts().then((accounts) => {
        if (accounts.length > 0 && isMounted) {
          setAddress(accounts[0].address);
          initProvider.getSigner().then((newSigner) => {
            if (isMounted) setSigner(newSigner);
          });
        }
      }).catch(console.error);

      // Handle account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          initProvider.getSigner().then(setSigner);
        } else {
          setAddress(null);
          setSigner(null);
        }
      };

      // Handle chain changes (like switching from Ethereum Mainnet to Arbitrum)
      const handleChainChanged = () => {
        window.location.reload(); 
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      // Cleanup function to prevent memory leaks when component unmounts
      return () => {
        isMounted = false;
        if (window.ethereum?.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  const connectWallet = async () => {
    if (!provider && !window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet.");
      return;
    }
    
    // Fallback if the user clicks connect before the provider state has been updated
    const tempProvider = provider || new ethers.BrowserProvider(window.ethereum);
    if (!provider) setProvider(tempProvider);
    
    try {
      setIsConnecting(true);
      await tempProvider.send("eth_requestAccounts", []);
      const newSigner = await tempProvider.getSigner();
      const newAddress = await newSigner.getAddress();
      setSigner(newSigner);
      setAddress(newAddress);
    } catch (error) {
      console.error("Failed to connect wallet", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Web3Context.Provider value={{ provider, signer, address, connectWallet, isConnecting }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};


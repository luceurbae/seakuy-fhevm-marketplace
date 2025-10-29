import { create } from "zustand";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { initializeFhevm } from "@/lib/fhevm";
import { toast } from "sonner";
import { useEffect } from "react";
import { getProvider } from "@/lib/wallet";

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

// This hook now wraps wagmi hooks for WalletConnect support
export const useWallet = () => {
  const { address, isConnected, chain } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  
  // Initialize FHEVM when wallet connects for privacy features
  useEffect(() => {
    const initFhevm = async () => {
      if (isConnected && address) {
        try {
          // Get chain ID from connected chain or detect from provider
          let chainId = chain?.id || 11155111; // Default to Sepolia
          
          // If using localhost/hardhat, detect it
          const provider = getProvider();
          if (provider) {
            try {
              const network = await provider.getNetwork();
              chainId = Number(network.chainId);
            } catch (e) {
              console.warn("Could not detect network, using default", e);
            }
          }
          
          console.log(`Initializing FHEVM for chain ${chainId}`);
          await initializeFhevm(chainId);
        } catch (error) {
          console.error("FHEVM initialization error:", error);
        }
      }
    };
    
    initFhevm();
  }, [isConnected, address, chain]);

  const connect = async () => {
    try {
      // Try to find injected connector (MetaMask, etc.) first, then WalletConnect
      const injectedConnector = connectors.find(c => c.id === 'injected');
      const walletConnectConnector = connectors.find(c => c.id === 'walletConnect');
      const connector = injectedConnector || walletConnectConnector || connectors[0];
      
      if (!connector) {
        throw new Error("No wallet connector available");
      }
      
      const result = await connectAsync({ connector });
      
      // Initialize FHEVM for encrypted bids, prices, etc.
      const chainId = result.chainId || 11155111;
      console.log(`Connected to chain ${chainId}, initializing FHEVM...`);
      await initializeFhevm(chainId);
      
      toast.success("Wallet connected successfully");
    } catch (error: any) {
      console.error("Connection error:", error);
      if (error.message?.includes("User rejected")) {
        toast.error("Connection cancelled");
      } else {
        toast.error(error.message || "Failed to connect wallet");
      }
    }
  };

  const disconnect = async () => {
    try {
      await disconnectAsync();
      toast.success("Wallet disconnected");
    } catch (error: any) {
      console.error("Disconnect error:", error);
    }
  };

  return {
    address: address || null,
    isConnecting: false, // wagmi handles this internally
    connect,
    disconnect,
  };
};

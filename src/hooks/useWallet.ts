import { create } from "zustand";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { initializeFhevm } from "@/lib/fhevm";
import { toast } from "sonner";
import { useEffect } from "react";

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

// This hook now wraps wagmi hooks for WalletConnect support
export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  
  // Initialize FHEVM when wallet connects for privacy features
  useEffect(() => {
    if (isConnected && address) {
      initializeFhevm().catch(console.error);
    }
  }, [isConnected, address]);

  const connect = async () => {
    try {
      // Try to find injected connector (MetaMask, etc.) first, then WalletConnect
      const injectedConnector = connectors.find(c => c.id === 'injected');
      const walletConnectConnector = connectors.find(c => c.id === 'walletConnect');
      const connector = injectedConnector || walletConnectConnector || connectors[0];
      
      if (!connector) {
        throw new Error("No wallet connector available");
      }
      
      await connectAsync({ connector });
      
      // Initialize FHEVM for encrypted bids, prices, etc.
      await initializeFhevm();
      
      toast.success("Wallet connected successfully");
    } catch (error: any) {
      console.error("Connection error:", error);
      toast.error(error.message || "Failed to connect wallet");
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

import { getAccount, getWalletClient, disconnect } from '@wagmi/core';
import { wagmiConfig } from '@/config/wagmi';
import { toast } from 'sonner';
import { initializeFhevm } from './fhevm';

export const connectWalletConnect = async (): Promise<string | null> => {
  try {
    const account = getAccount(wagmiConfig);
    
    if (!account.address) {
      toast.error("Please connect your wallet using the Connect button");
      return null;
    }

    // Initialize FHEVM for privacy features
    await initializeFhevm();
    
    toast.success(`Wallet Connected: ${account.address.slice(0, 6)}...${account.address.slice(-4)}`);
    
    return account.address;
  } catch (error: any) {
    console.error("Wallet connection error:", error);
    toast.error(error.message || "Failed to connect wallet");
    return null;
  }
};

export const disconnectWalletConnect = async () => {
  try {
    await disconnect(wagmiConfig);
    toast.success("Wallet disconnected");
  } catch (error: any) {
    console.error("Disconnect error:", error);
    toast.error("Failed to disconnect wallet");
  }
};

export const getWalletConnectClient = async () => {
  const client = await getWalletClient(wagmiConfig);
  return client;
};

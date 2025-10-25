import { create } from "zustand";
import { connectWallet } from "@/lib/wallet";
import { initializeFhevm } from "@/lib/fhevm";

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWallet = create<WalletState>((set) => ({
  address: null,
  isConnecting: false,
  
  connect: async () => {
    set({ isConnecting: true });
    try {
      const address = await connectWallet();
      if (address) {
        await initializeFhevm();
        set({ address, isConnecting: false });
      } else {
        set({ isConnecting: false });
      }
    } catch (error) {
      set({ isConnecting: false });
    }
  },
  
  disconnect: () => {
    set({ address: null });
  },
}));

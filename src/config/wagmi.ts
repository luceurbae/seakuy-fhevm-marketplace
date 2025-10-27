import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Use a public Project ID for now - users can replace with their own
export const wagmiConfig = getDefaultConfig({
  appName: 'Seakuy NFT Marketplace',
  projectId: 'c5ca7f8c5c2f5d5c9c8f5d5c9c8f5d5c', // Temporary public ID
  chains: [sepolia],
  ssr: false,
});

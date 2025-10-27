import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Seakuy NFT Marketplace',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from https://cloud.walletconnect.com/
  chains: [sepolia],
  ssr: false,
});

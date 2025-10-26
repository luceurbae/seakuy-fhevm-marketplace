import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { sepolia } from 'wagmi/chains';

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'; // You need to get this from https://cloud.walletconnect.com/

const metadata = {
  name: 'Seakuy NFT Marketplace',
  description: 'Private NFT marketplace with encrypted bids powered by Zama FHEVM',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [sepolia] as const;

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': 'hsl(var(--primary))',
  }
});

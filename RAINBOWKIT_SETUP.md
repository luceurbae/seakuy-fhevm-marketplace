# RainbowKit Setup Guide

This project uses RainbowKit for wallet connections with Zama FHEVM for privacy-preserving NFT operations.

## Setup Steps

### 1. Get WalletConnect Project ID

1. Go to https://cloud.walletconnect.com/
2. Sign up or log in
3. Create a new project
4. Copy your Project ID

### 2. Update Configuration

Open `src/config/wagmi.ts` and replace `YOUR_WALLETCONNECT_PROJECT_ID` with your actual Project ID:

```typescript
export const wagmiConfig = getDefaultConfig({
  appName: 'Seakuy NFT Marketplace',
  projectId: 'YOUR_PROJECT_ID_HERE', // Replace this
  chains: [sepolia],
  ssr: false,
});
```

## Features

### Privacy Features (Zama FHEVM)

All NFT operations use FHEVM encryption for privacy:

- **Create NFT**: Price is encrypted before minting
- **Bid on NFT**: Bid amounts are encrypted
- **Buy NFT**: Payment amounts are encrypted

FHEVM is automatically initialized when you connect your wallet.

### Supported Wallets

RainbowKit supports:
- MetaMask
- Rainbow
- WalletConnect
- Coinbase Wallet
- And many more...

## Testing

1. Connect your wallet using the "Connect Wallet" button
2. Make sure you're on Sepolia testnet
3. Try creating an NFT - the price will be encrypted using FHEVM
4. Try placing bids - amounts will be encrypted

## Network Configuration

Currently configured for:
- **Chain**: Sepolia Testnet
- **FHEVM Gateway**: https://gateway.sepolia.zama.ai

## Troubleshooting

### "User rejected action" error
- Make sure you have at least one account in your wallet
- Check that you're on the correct network (Sepolia)
- Try disconnecting and reconnecting your wallet

### FHEVM initialization errors
- Ensure your wallet is connected before performing NFT operations
- Check console logs for detailed error messages

## Privacy Guarantee

All sensitive data (prices, bids) are encrypted using Zama's FHEVM technology:
- Encrypted on the client side
- Stored encrypted on-chain
- Only authorized parties can decrypt

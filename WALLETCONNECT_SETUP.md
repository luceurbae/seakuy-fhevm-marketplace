# WalletConnect Integration Guide for Seakuy

## Overview
Your Seakuy NFT marketplace now supports WalletConnect, allowing users to connect with any wallet (MetaMask, Trust Wallet, Coinbase Wallet, etc.) instead of just browser extensions.

## Privacy Features with Zama FHEVM
All sensitive operations (bid, create, buy) use Zama's FHEVM for fully homomorphic encryption:
- **Bid amounts**: Encrypted before sending to blockchain
- **NFT prices**: Encrypted during creation and listing
- **Purchase values**: Encrypted during buy operations

The FHEVM is automatically initialized when the wallet connects.

## Setup Instructions

### 1. Get WalletConnect Project ID
1. Go to https://cloud.walletconnect.com/
2. Sign up for a free account
3. Create a new project
4. Copy your Project ID

### 2. Configure Your Project
Open `src/config/wagmi.ts` and replace:
```typescript
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';
```

With your actual Project ID:
```typescript
const projectId = 'abc123def456...'; // Your actual project ID
```

### 3. How It Works

#### Wallet Connection Flow:
1. User clicks "Connect Wallet" button
2. WalletConnect modal opens with multiple wallet options
3. User selects their preferred wallet (MetaMask, Trust Wallet, etc.)
4. FHEVM automatically initializes for privacy features
5. User can now create, bid, and buy NFTs with encrypted transactions

#### Privacy Implementation:
All functions in `src/lib/marketplace.ts` use FHEVM encryption:

```typescript
// Example: Creating NFT with encrypted price
const encryptedPrice = await fhevm.encrypt64(Number(priceWei));
await contract.mintNFT(tokenURI, encryptedPrice);

// Example: Placing encrypted bid
const encryptedBid = await fhevm.encrypt64(Number(bidWei));
await contract.placeBid(tokenId, encryptedBid);
```

### 4. Testing

1. Start your development server
2. Click "Connect Wallet"
3. Use the WalletConnect modal to connect
4. Test creating an NFT (price is encrypted)
5. Test placing a bid (amount is encrypted)
6. Test buying an NFT (payment is encrypted)

### 5. Network Configuration

The app is configured for Sepolia testnet with Zama FHEVM:
- **Chain ID**: 11155111
- **Network**: Sepolia
- **FHEVM Gateway**: Zama's Sepolia gateway
- **Privacy**: All sensitive data encrypted via FHEVM

### 6. Customization

#### Theme Colors
Edit `src/config/wagmi.ts` to match your brand:
```typescript
themeVariables: {
  '--w3m-accent': 'hsl(var(--primary))', // Uses your design system
}
```

#### Supported Chains
To add more chains, edit `src/config/wagmi.ts`:
```typescript
import { sepolia, mainnet } from 'wagmi/chains';
const chains = [sepolia, mainnet] as const;
```

## Architecture

- **`src/config/wagmi.ts`**: WalletConnect configuration
- **`src/lib/wallet-connect.ts`**: Connection utilities
- **`src/lib/fhevm.ts`**: Zama FHEVM encryption setup
- **`src/lib/marketplace.ts`**: Encrypted marketplace operations
- **`src/hooks/useWallet.ts`**: Wallet state management with auto FHEVM init
- **`src/components/Navbar.tsx`**: Connect button UI

## Troubleshooting

### Modal doesn't open
- Verify Project ID is set correctly
- Check console for errors
- Ensure WagmiProvider wraps your app in `src/main.tsx`

### Encryption fails
- FHEVM initializes automatically on wallet connect
- Check network is Sepolia (Chain ID: 11155111)
- Verify contract addresses in `src/lib/fhevm.ts`

### Transaction fails
- Ensure wallet has Sepolia ETH
- Check that price/bid values are valid numbers
- Verify FHEVM gateway is accessible

## Support

For more information:
- WalletConnect Docs: https://docs.walletconnect.com/
- Zama FHEVM Docs: https://docs.zama.ai/fhevm
- Wagmi Docs: https://wagmi.sh/

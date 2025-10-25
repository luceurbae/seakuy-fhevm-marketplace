# Seakuy - Private NFT Marketplace

A decentralized NFT marketplace built with Zama FHEVM for encrypted, private transactions on Sepolia network.

## Features

- 🔒 **Encrypted Transactions**: All NFT prices and bids are encrypted using Zama FHEVM
- 🎨 **Mint & Create**: Create and mint your own NFTs with encrypted pricing
- 🛒 **Private Trading**: Buy and sell NFTs without revealing transaction details
- 💰 **Secret Bidding**: Place bids that remain private until accepted
- 🌐 **Sepolia Network**: Built on Ethereum Sepolia testnet with FHEVM integration
- ⚡ **Modern UI**: Beautiful, responsive interface with GSAP animations

## Technology Stack

### Frontend
- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- GSAP for animations
- ethers.js for blockchain interaction
- fhevmjs for encryption
- shadcn/ui components
- Zustand for state management

### Smart Contracts
- Solidity ^0.8.24
- Zama FHEVM for confidential computing
- Deployed on Sepolia testnet

## Getting Started

### Prerequisites
- Node.js v18 or higher
- MetaMask browser extension
- Sepolia ETH for testing

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd seakuy

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Smart Contract Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Configuration

After deploying the smart contract, update the contract address in `src/config/contracts.ts`:

```typescript
export const MARKETPLACE_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

## How It Works

### Encrypted Pricing
All NFT prices are encrypted using Zama FHEVM's homomorphic encryption. This ensures:
- Sellers can set private prices
- Buyers can verify they meet the price without revealing the exact amount
- Platform maintains price confidentiality

### Private Bidding
When placing bids:
1. Bid amounts are encrypted client-side using FHEVM
2. Encrypted bids are stored on-chain
3. Only the NFT owner can view and accept bids
4. Rejected bids remain permanently private

### Secure Transactions
- Smart contract validates encrypted payments match encrypted prices
- Platform fee (2.5%) is automatically calculated
- Ownership transfers occur atomically on-chain

## Project Structure

```
src/
├── components/        # React components
│   ├── ui/           # shadcn/ui components
│   ├── Navbar.tsx    # Navigation bar
│   └── NFTCard.tsx   # NFT display card
├── pages/            # Route pages
│   ├── Index.tsx     # Landing page
│   ├── Marketplace.tsx
│   ├── NFTDetail.tsx
│   ├── CreateNFT.tsx
│   └── Profile.tsx
├── lib/              # Utilities
│   ├── fhevm.ts      # FHEVM initialization
│   ├── wallet.ts     # Wallet connection
│   └── marketplace.ts # Contract interactions
├── hooks/            # React hooks
│   └── useWallet.ts  # Wallet state management
├── contracts/        # Solidity contracts
│   └── SeakuyNFTMarketplace.sol
└── config/           # Configuration
    └── contracts.ts  # Contract addresses & ABIs
```

## Key Features Implementation

### Wallet Connection
```typescript
import { useWallet } from "@/hooks/useWallet";

const { address, connect } = useWallet();
```

### Minting NFT
```typescript
import { mintNFT } from "@/lib/marketplace";

await mintNFT(tokenURI, "2.5"); // 2.5 ETH encrypted price
```

### Buying NFT
```typescript
import { buyNFT } from "@/lib/marketplace";

await buyNFT(tokenId, "2.5"); // Encrypted payment
```

### Placing Bid
```typescript
import { placeBid } from "@/lib/marketplace";

await placeBid(tokenId, "1.8"); // Encrypted bid amount
```

## Security Considerations

- All sensitive data encrypted using FHEVM
- Smart contract includes access controls
- No plaintext price exposure on-chain
- Encrypted bid comparisons on-chain
- Test thoroughly before mainnet deployment

## Development Guidelines

- Follow TypeScript best practices
- Maintain clean code principles
- Use semantic commit messages
- Test all smart contract functions
- Validate all user inputs

## Hackathon Submission

This project demonstrates:
- Advanced use of Zama FHEVM
- Full-stack dApp development
- Modern web3 UX patterns
- Privacy-preserving transactions
- Professional code quality

## Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/)
- [Sepolia Testnet Faucet](https://sepoliafaucet.com/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [GSAP Documentation](https://greensock.com/gsap/)

## License

MIT

## Support

For questions or issues:
- Review documentation at https://docs.zama.ai/
- Check existing issues
- Open new issue with detailed description

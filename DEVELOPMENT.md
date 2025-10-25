# Seakuy - Development Guide

## Quick Start

### Development Mode (No Blockchain Required)

Test the app without deploying to blockchain:

```bash
# Install dependencies
npm install

# Run in demo mode
VITE_DEMO_MODE=true npm run dev
```

Visit `http://localhost:8080` - all features work with simulated transactions!

### Production Mode (With Blockchain)

```bash
# Normal development
npm run dev
```

Requires deployed smart contract and MetaMask with Sepolia ETH.

## Project Structure

```
seakuy/
├── src/
│   ├── contracts/          # Solidity smart contracts
│   ├── components/         # React components
│   ├── pages/             # Route pages
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   │   ├── fhevm.ts       # FHEVM encryption
│   │   ├── wallet.ts      # Wallet connection
│   │   ├── marketplace.ts # Contract interactions
│   │   └── demo-mode.ts   # Demo mode utilities
│   ├── config/            # Configuration
│   └── types/             # TypeScript types
├── scripts/               # Deployment scripts
├── hardhat.config.js      # Hardhat configuration
└── DEPLOYMENT.md          # Deployment guide
```

## Development Workflow

### 1. Local Development (Demo Mode)

**Benefits:**
- No blockchain setup needed
- Instant feedback
- Free testing
- Perfect for UI/UX development

**Limitations:**
- Simulated transactions only
- No real encryption
- No actual blockchain state

**Usage:**
```bash
VITE_DEMO_MODE=true npm run dev
```

All features work with mock data and simulated delays.

### 2. Testnet Development (Sepolia)

**Setup:**

1. **Get Sepolia ETH:**
   - Visit [sepoliafaucet.com](https://sepoliafaucet.com/)
   - Request test ETH (0.5 ETH recommended)

2. **Configure MetaMask:**
   - Add Sepolia network
   - Import test account

3. **Deploy Contract:**
   ```bash
   cd seakuy
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
   npm install fhevm fhevm-contracts
   
   # Create .env file
   echo "PRIVATE_KEY=your_private_key" > .env
   echo "SEPOLIA_RPC_URL=https://eth-sepolia.public.blastapi.io" >> .env
   
   # Deploy
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. **Update Contract Address:**
   ```typescript
   // src/config/contracts.ts
   export const MARKETPLACE_ADDRESS = "0xYOUR_DEPLOYED_ADDRESS";
   ```

5. **Start Development:**
   ```bash
   npm run dev
   ```

## Testing Strategy

### Unit Testing (Coming Soon)

```bash
npm test
```

### Smart Contract Testing

```bash
npx hardhat test
```

### Manual Testing Checklist

**Demo Mode:**
- [ ] Wallet connection simulation
- [ ] NFT minting with metadata
- [ ] Listing NFTs with prices
- [ ] Buying NFTs
- [ ] Placing bids
- [ ] Viewing user profile
- [ ] Marketplace browsing

**Testnet Mode:**
- [ ] Real wallet connection (MetaMask)
- [ ] Network switching to Sepolia
- [ ] NFT minting with encrypted price
- [ ] IPFS metadata upload
- [ ] Listing NFT with FHEVM encryption
- [ ] Buying NFT with encrypted payment
- [ ] Placing encrypted bids
- [ ] Accepting bids
- [ ] Event listening (NFTMinted, NFTSold, etc.)

## Environment Variables

Create `.env` file for production deployment:

```env
# Smart Contract Deployment
PRIVATE_KEY=your_wallet_private_key
SEPOLIA_RPC_URL=https://eth-sepolia.public.blastapi.io
ETHERSCAN_API_KEY=your_etherscan_key

# IPFS (Optional - for metadata storage)
VITE_PINATA_JWT=your_pinata_jwt

# Development
VITE_DEMO_MODE=false
```

⚠️ **Security:** Never commit `.env` to version control!

## Common Development Tasks

### Switch Between Demo and Production

```bash
# Demo mode
VITE_DEMO_MODE=true npm run dev

# Production mode
npm run dev
```

### Update Smart Contract

1. Modify `src/contracts/SeakuyNFTMarketplace.sol`
2. Redeploy:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```
3. Update address in `src/config/contracts.ts`
4. Restart dev server

### Add New NFT Metadata Field

1. Update `src/types/nft.ts`
2. Modify `CreateNFT.tsx` form
3. Update IPFS upload in `src/lib/ipfs.ts`
4. Test in demo mode first

### Debug FHEVM Encryption

```typescript
// In browser console
const fhevm = await initializeFhevm();
const encrypted = await fhevm.encrypt64(1000000000000000000); // 1 ETH in wei
console.log("Encrypted:", encrypted);
```

## Performance Optimization

### FHEVM Initialization

FHEVM instance is cached after first initialization:

```typescript
// lib/fhevm.ts
let fhevmInstance: any = null; // Cached instance
```

### Image Optimization

Use optimized image URLs:

```typescript
const imageUrl = `${nft.image}?w=400&q=80`;
```

### Lazy Loading

Components use React lazy loading for better performance.

## Troubleshooting

### "FHEVM not initialized" Error

```typescript
// Call before any encrypted operations
await initializeFhevm();
```

### "Insufficient payment" Error

Check encrypted value conversion:

```typescript
const priceWei = ethers.parseEther(priceInEth);
const encryptedPrice = await fhevm.encrypt64(Number(priceWei));
```

### MetaMask Connection Issues

1. Check network: Must be Sepolia (Chain ID: 11155111)
2. Verify contract address is correct
3. Ensure sufficient Sepolia ETH

### Demo Mode Not Working

Verify environment variable:

```bash
echo $VITE_DEMO_MODE
# Should output: true
```

## Code Style

**TypeScript:**
- Use strict types
- Prefer interfaces over types
- Use async/await over promises

**React:**
- Functional components only
- Custom hooks for reusable logic
- Clean component architecture

**Solidity:**
- Follow Solidity style guide
- Add natspec comments
- Optimize gas usage

## Git Workflow

```bash
# Feature branch
git checkout -b feature/nft-analytics

# Regular commits
git add .
git commit -m "feat: add analytics dashboard"

# Push and PR
git push origin feature/nft-analytics
```

## Next Steps

1. **Smart Contract Audit**: Before mainnet, get professional audit
2. **Enhanced Testing**: Add comprehensive test suite
3. **CI/CD Pipeline**: Automate testing and deployment
4. **Mainnet Deployment**: Follow mainnet deployment guide

## Resources

- [Zama FHEVM Docs](https://docs.zama.ai/)
- [Hardhat Docs](https://hardhat.org/)
- [Sepolia Explorer](https://sepolia.etherscan.io/)
- [React Docs](https://react.dev/)

## Support

Questions? Check:
1. This guide
2. DEPLOYMENT.md
3. README.md
4. Open an issue

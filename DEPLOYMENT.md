# Seakuy - Deployment Guide

## 🚀 Quick Start

### Option 1: Demo Mode (No Deployment Needed)

Test immediately without blockchain:

```bash
VITE_DEMO_MODE=true npm run dev
```

All features work with simulated transactions! Perfect for hackathon demos.

### Option 2: Production Deployment

Full blockchain deployment with FHEVM encryption.

---

## 📋 Prerequisites

- Node.js v18+
- MetaMask wallet with Sepolia ETH ([Get free testnet ETH](https://sepoliafaucet.com/))
- Git installed
- Basic terminal knowledge

---

## 🛠️ Step-by-Step Deployment

### Step 1: Install Dependencies

```bash
# Install frontend dependencies (already done)
npm install

# Install Hardhat for smart contract deployment
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv

# Install FHEVM libraries
npm install fhevm fhevm-contracts
```

### Step 2: Configure Environment

Create `.env` file in project root:

```bash
# Create .env file
touch .env
```

Add your configuration:

```env
PRIVATE_KEY=your_wallet_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.public.blastapi.io
ETHERSCAN_API_KEY=your_etherscan_api_key_optional
```

⚠️ **Security Warning:** Never commit `.env` to version control!

**How to get your private key:**
1. Open MetaMask
2. Click three dots → Account Details
3. Export Private Key
4. Enter password and copy key

### Step 3: Get Sepolia Testnet ETH

You need ~0.5 Sepolia ETH for deployment and testing:

1. Visit [sepoliafaucet.com](https://sepoliafaucet.com/)
2. Enter your wallet address
3. Complete captcha
4. Receive test ETH (may take 1-2 minutes)

Verify balance in MetaMask on Sepolia network.

### Step 4: Deploy Smart Contract

```bash
# Deploy to Sepolia network
npx hardhat run scripts/deploy.js --network sepolia
```

**Expected output:**
```
🚀 Starting deployment of SeakuyNFTMarketplace...
📝 Deploying with account: 0x742d35Cc...
💰 Account balance: 0.5 ETH
⏳ Deploying contract...
✅ SeakuyNFTMarketplace deployed to: 0xABCDEF123456...

📋 Next steps:
1. Update src/config/contracts.ts with this address
```

**Copy the deployed contract address!**

### Step 5: Update Frontend Configuration

Open `src/config/contracts.ts` and update:

```typescript
export const MARKETPLACE_ADDRESS = "0xYOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
```

Replace with the address from Step 4.

### Step 6: Verify Contract (Optional but Recommended)

```bash
# Verify on Etherscan
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

This makes your contract readable on [Sepolia Etherscan](https://sepolia.etherscan.io/).

### Step 7: Start Application

```bash
# Start frontend
npm run dev
```

Visit `http://localhost:8080` and connect your wallet!

---

## 🎯 Testing Your Deployment

### Test Checklist

1. **Connect Wallet:**
   - Open app in browser
   - Click "Connect Wallet"
   - Approve MetaMask connection
   - Verify wallet address displays

2. **Mint NFT:**
   - Navigate to "Create NFT"
   - Upload image and add metadata
   - Set encrypted price (e.g., "0.1" ETH)
   - Click "Mint NFT"
   - Confirm transaction in MetaMask
   - Wait for confirmation (~15 seconds)

3. **List NFT:**
   - Go to "My Profile"
   - Find your NFT
   - Click "List for Sale"
   - Set price and confirm

4. **Browse Marketplace:**
   - Navigate to "Marketplace"
   - View listed NFTs
   - Verify encrypted prices work

5. **Place Bid:**
   - Click on any listed NFT
   - Click "Place Bid"
   - Enter bid amount (encrypted)
   - Confirm transaction

6. **Buy NFT:**
   - Select NFT from marketplace
   - Click "Buy Now"
   - Confirm payment
   - Verify ownership transfer

---

## 🔧 Troubleshooting

### Contract Deployment Failed

**Error: Insufficient funds**
- Solution: Get more Sepolia ETH from faucet

**Error: Nonce too high**
- Solution: Reset MetaMask account (Settings → Advanced → Clear activity)

**Error: Contract deployment timeout**
- Solution: Increase gas limit or retry with higher gas price

### Frontend Connection Issues

**"Wallet not connected" error**
- Check MetaMask is installed
- Switch to Sepolia network in MetaMask
- Refresh page and reconnect

**"Contract not found" error**
- Verify contract address in `src/config/contracts.ts`
- Ensure contract deployment succeeded
- Check network is Sepolia

**FHEVM initialization failed**
- Clear browser cache
- Check internet connection
- Verify Sepolia RPC is responding

### Transaction Errors

**"Insufficient payment" error**
- Encrypted value mismatch
- Try with fresh FHEVM instance
- Check price is in ETH format (e.g., "0.1" not "100000000000000000")

**Transaction stuck/pending**
- Increase gas price in MetaMask
- Wait longer (Sepolia can be slow)
- Cancel and retry transaction

---

## 📊 Smart Contract Details

**Contract:** SeakuyNFTMarketplace
**Network:** Sepolia Testnet (Chain ID: 11155111)
**Encryption:** Zama FHEVM
**Platform Fee:** 2.5% (250 basis points)

### Key Functions

- `mintNFT(tokenURI, encryptedPrice)` - Create new NFT with encrypted price
- `listNFT(tokenId, encryptedPrice)` - List NFT for sale
- `buyNFT(tokenId, encryptedPayment)` - Purchase NFT with encrypted payment
- `placeBid(tokenId, encryptedBidAmount)` - Place encrypted bid
- `acceptBid(tokenId, bidIndex)` - Accept specific bid
- `getUserNFTs(address)` - Get user's NFT collection

### Events

- `NFTMinted(tokenId, owner)`
- `NFTListed(tokenId, owner)`
- `NFTSold(tokenId, from, to)`
- `BidPlaced(tokenId, bidder)`
- `BidAccepted(tokenId, winner)`

---

## 🌐 Frontend Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect Vercel:**
   - Visit [vercel.com](https://vercel.com/)
   - Import GitHub repository
   - Configure project:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Deploy!

3. **Environment Variables (None needed!):**
   - Contract address is in code
   - No API keys for frontend
   - Fully decentralized!

**Your app will be live at:** `https://your-project.vercel.app`

### Deploy to Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy

### Custom Domain

Both Vercel and Netlify support custom domains:
- Add your domain in platform settings
- Update DNS records as instructed
- Enable HTTPS automatically

---

## 🧪 Development & Testing

### Demo Mode for Development

```bash
# Test without blockchain
VITE_DEMO_MODE=true npm run dev
```

**Benefits:**
- No gas fees
- Instant transactions
- Perfect for UI testing
- Great for hackathon demos

### Local Blockchain (Hardhat Network)

```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3: Start frontend
npm run dev
```

### Smart Contract Testing

Create `test/Marketplace.test.js`:

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SeakuyNFTMarketplace", function () {
  let marketplace, owner, buyer;

  beforeEach(async function () {
    [owner, buyer] = await ethers.getSigners();
    const Marketplace = await ethers.getContractFactory("SeakuyNFTMarketplace");
    marketplace = await Marketplace.deploy();
    await marketplace.waitForDeployment();
  });

  it("Should mint NFT with encrypted price", async function () {
    const tokenURI = "ipfs://QmTest123";
    const mockEncryptedPrice = "0x1234"; // Mock encrypted value
    
    await marketplace.mintNFT(tokenURI, mockEncryptedPrice);
    const userNFTs = await marketplace.getUserNFTs(owner.address);
    
    expect(userNFTs.length).to.equal(1);
  });

  it("Should list NFT for sale", async function () {
    // Add test logic
  });

  it("Should handle bids correctly", async function () {
    // Add test logic
  });
});
```

Run tests:
```bash
npx hardhat test
```

---

## 🔐 Security Considerations

### Smart Contract Security

- ✅ All prices encrypted using FHEVM
- ✅ Bids remain private until accepted
- ✅ Platform fee handled atomically
- ✅ Ownership transfers verified on-chain
- ⚠️ **Audit recommended before mainnet deployment**

### Best Practices

1. **Never expose private keys**
   - Use `.env` for sensitive data
   - Add `.env` to `.gitignore`
   - Use environment variables in production

2. **Test thoroughly**
   - Test on Sepolia first
   - Use demo mode for UI testing
   - Write comprehensive contract tests

3. **Monitor transactions**
   - Check Sepolia Etherscan
   - Verify event emissions
   - Monitor gas usage

4. **Access controls**
   - Only NFT owners can list/accept bids
   - Encrypted values protected by FHEVM
   - Platform fee enforced by contract

---

## 🚀 Mainnet Deployment (Production)

### Prerequisites for Mainnet

- [ ] Smart contract professionally audited
- [ ] Comprehensive test coverage (>80%)
- [ ] Thorough Sepolia testing completed
- [ ] Security review completed
- [ ] Gas optimization performed
- [ ] Emergency pause mechanism implemented
- [ ] Real ETH for deployment (~$500-1000)

### Mainnet Deployment Steps

```bash
# Update hardhat.config.js with mainnet config
# Add MAINNET_RPC_URL and sufficient ETH

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet

# Verify contract
npx hardhat verify --network mainnet YOUR_CONTRACT_ADDRESS

# Update frontend config with mainnet address
```

⚠️ **Warning:** Mainnet deployment is permanent and uses real money. Triple-check everything!

---

## 📚 Additional Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/)
- [Sepolia Testnet Explorer](https://sepolia.etherscan.io/)
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Hardhat Documentation](https://hardhat.org/)
- [Ethers.js v6 Docs](https://docs.ethers.org/v6/)
- [GSAP Animation Docs](https://greensock.com/gsap/)
- [Development Guide](./DEVELOPMENT.md)

---

## 💬 Support & Community

### Getting Help

1. **Check Documentation:**
   - README.md - Project overview
   - DEVELOPMENT.md - Development guide
   - This file - Deployment guide

2. **Common Issues:**
   - See Troubleshooting section above

3. **Still Stuck?**
   - Review Zama FHEVM docs
   - Check Hardhat documentation
   - Open GitHub issue with details

### Contribution

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All dependencies installed
- [ ] `.env` configured with private key
- [ ] Sepolia ETH acquired (0.5+ ETH)
- [ ] MetaMask configured on Sepolia

### Deployment
- [ ] Smart contract deployed successfully
- [ ] Contract address copied
- [ ] Contract verified on Etherscan
- [ ] Frontend config updated with address

### Testing
- [ ] Wallet connection works
- [ ] NFT minting successful
- [ ] Listing NFTs functional
- [ ] Buying NFTs works
- [ ] Bidding system operational
- [ ] Profile page displays correctly

### Production
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] Custom domain configured (optional)
- [ ] All features tested on live site
- [ ] Performance optimized
- [ ] SEO configured

---

**🎉 Congratulations!** Your encrypted NFT marketplace is now live!

Share your deployment:
- Tweet about it
- Post on Reddit
- Share in Discord communities
- Submit to hackathon

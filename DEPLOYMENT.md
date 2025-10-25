# Seakuy - Deployment Guide

## Smart Contract Deployment

### Prerequisites
- Node.js v18+
- Hardhat installed
- MetaMask wallet with Sepolia ETH
- Sepolia RPC access

### Setup Hardhat Project

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

### Install FHEVM Dependencies

```bash
npm install fhevm fhevm-contracts
```

### Configure Hardhat

Create `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.public.blastapi.io",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    }
  }
};
```

### Deploy Smart Contract

1. Copy `src/contracts/SeakuyNFTMarketplace.sol` to `contracts/` directory in your Hardhat project

2. Create deployment script `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  const SeakuyNFTMarketplace = await hre.ethers.getContractFactory("SeakuyNFTMarketplace");
  const marketplace = await SeakuyNFTMarketplace.deploy();
  await marketplace.waitForDeployment();
  
  console.log("SeakuyNFTMarketplace deployed to:", await marketplace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

3. Deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Update Frontend Configuration

After deployment, update the contract address in your frontend:

Create `src/config/contracts.ts`:

```typescript
export const MARKETPLACE_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
export const MARKETPLACE_ABI = [...]; // Your contract ABI
```

## Frontend Deployment

### Deploy to Vercel/Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Environment Variables

No environment variables needed for frontend (fully decentralized).

## Testing

### Test Smart Contract

Create `test/Marketplace.test.js`:

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SeakuyNFTMarketplace", function () {
  it("Should mint NFT with encrypted price", async function () {
    const [owner] = await ethers.getSigners();
    const Marketplace = await ethers.getContractFactory("SeakuyNFTMarketplace");
    const marketplace = await Marketplace.deploy();
    
    // Add your tests here
  });
});
```

Run tests:
```bash
npx hardhat test
```

## Security Considerations

- All prices are encrypted using FHEVM
- Bids remain private until accepted
- Smart contract audited recommended before mainnet
- Use proper access controls
- Test thoroughly on testnet

## Support

For issues or questions:
- Check Zama FHEVM documentation: https://docs.zama.ai/
- Review Hardhat documentation: https://hardhat.org/
- Open an issue in the repository

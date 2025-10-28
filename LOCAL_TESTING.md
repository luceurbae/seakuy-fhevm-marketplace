# Local Testing Guide for Seakuy NFT Marketplace

This guide will help you test the Seakuy NFT Marketplace locally using Hardhat with Zama FHEVM, without needing the Sepolia testnet.

## Prerequisites

- Node.js v18+ installed
- npm or yarn
- MetaMask or any Web3 wallet

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Local Hardhat Node

Open a terminal and start the Hardhat node:

```bash
npx hardhat node
```

This will:
- Start a local Ethereum node at `http://127.0.0.1:8545`
- Create 10 test accounts with 10,000 ETH each
- Display the account addresses and private keys
- Keep running to process transactions

**Keep this terminal open!**

### 3. Deploy Contract to Localhost

Open a **new terminal** and deploy the contract:

```bash
npx hardhat run scripts/deploy-local.js --network localhost
```

This will deploy the `SeakuyNFTMarketplace` contract and display the deployed address.

**Copy the contract address** - you'll need it for the next step.

### 4. Update Contract Address

Update `src/config/contracts.ts` with your deployed contract address:

```typescript
export const MARKETPLACE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your address
```

### 5. Configure Environment

Create a `.env` file (if not exists) and add:

```bash
VITE_NETWORK_MODE=localhost
VITE_DEMO_MODE=false
```

### 6. Configure MetaMask for Localhost

1. Open MetaMask
2. Click the network dropdown
3. Select "Add Network" → "Add a network manually"
4. Enter the following details:
   - **Network Name**: Hardhat Local
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
5. Click "Save"

### 7. Import Test Account

From the Hardhat node terminal, copy one of the private keys shown and:

1. Open MetaMask
2. Click the account icon → "Import Account"
3. Paste the private key
4. You should now have 10,000 ETH for testing!

### 8. Start Frontend

```bash
npm run dev
```

Visit `http://localhost:5173` and your app should be ready!

## Testing Features

### Test NFT Minting

1. Connect your wallet (make sure you're on Hardhat Local network)
2. Go to "Create NFT"
3. Upload an image, add name, description, and price
4. Click "Create & Mint NFT"
5. Approve the transaction in MetaMask
6. Check your profile to see the minted NFT

### Test NFT Listing

1. Go to your Profile page
2. Click on an NFT you own
3. Click "List for Sale"
4. Set a price and confirm
5. The NFT should now appear in the Marketplace

### Test Encrypted Bids

1. Import a second test account in MetaMask
2. Switch to the second account
3. Go to Marketplace and find a listed NFT
4. Click "Place Bid"
5. Enter bid amount (encrypted using FHEVM)
6. Confirm transaction

### Test Buying NFT

1. With the second account, find a listed NFT
2. Click "Buy Now"
3. Confirm transaction with the correct price
4. The NFT should transfer to your account

## Running Tests

Run the Hardhat test suite:

```bash
npx hardhat test
```

Or test on the running localhost network:

```bash
npx hardhat test --network localhost
```

## Key Features Tested Locally

✅ **Encrypted Pricing**: All prices are encrypted using Zama FHEVM
✅ **Private Bids**: Bid amounts are encrypted and private
✅ **Secure Transactions**: Smart contract validates encrypted payments
✅ **NFT Ownership**: Track ownership and transfers on-chain
✅ **Platform Fees**: 2.5% platform fee on sales

## Troubleshooting

### "Nonce too high" Error

Reset your MetaMask account:
1. MetaMask Settings → Advanced
2. Scroll to "Clear activity tab data"
3. Click "Clear"

### Contract Not Deployed

Make sure:
1. Hardhat node is running in terminal 1
2. You deployed using `npx hardhat run scripts/deploy-local.js --network localhost`
3. You updated the contract address in `src/config/contracts.ts`

### FHEVM Initialization Error

For local testing, FHEVM uses a mocked implementation. If you see initialization errors, they can be safely ignored as the contract will work with mock encrypted data.

### Connection Refused

Make sure:
1. Hardhat node is running (`npx hardhat node`)
2. MetaMask is configured with RPC URL: `http://127.0.0.1:8545`
3. Chain ID is `31337`

## Architecture

### Local Testing Flow

```
Frontend (React) 
    ↓
RainbowKit + Wagmi (Wallet Connection)
    ↓
ethers.js (Contract Interaction)
    ↓
Hardhat Node (Local Ethereum Network - Port 8545)
    ↓
SeakuyNFTMarketplace Contract (with FHEVM)
```

### Privacy Features (Zama FHEVM)

- **Encrypted Prices**: NFT prices are encrypted on-chain
- **Private Bids**: Bid amounts are encrypted
- **Secure Comparisons**: Price comparisons happen on encrypted data
- **Access Control**: Only authorized parties can decrypt values

## Development Workflow

1. **Make Contract Changes**: Edit `src/contracts/SeakuyNFTMarketplaceLocal.sol`
2. **Recompile**: `npx hardhat compile`
3. **Redeploy**: `npx hardhat run scripts/deploy-local.js --network localhost`
4. **Update Address**: Copy new address to `src/config/contracts.ts`
5. **Test**: Interact with the new contract via the frontend

## Available Test Accounts

The Hardhat node creates 10 accounts with 10,000 ETH each. You can import multiple accounts to test:
- Multi-user interactions
- NFT transfers
- Bidding between users
- Different user perspectives

## Network Comparison

| Feature | Localhost | Sepolia Testnet |
|---------|-----------|-----------------|
| Setup Time | Instant | Requires faucet |
| Transaction Speed | Instant | 12-15 seconds |
| Cost | Free | Free testnet ETH |
| FHEVM | Mocked | Full implementation |
| Debugging | Full access | Limited |
| Reset | Easy | Must redeploy |

## Next Steps

Once local testing is complete:

1. **Deploy to Sepolia**: Use `scripts/deploy.js` for testnet deployment
2. **Update Frontend**: Change `VITE_NETWORK_MODE` to `sepolia`
3. **Get Sepolia ETH**: Use faucets for test ETH
4. **Test on Testnet**: Verify everything works on public testnet
5. **Prepare for Mainnet**: Security audit and mainnet deployment

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [ethers.js Documentation](https://docs.ethers.org/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)

## Support

If you encounter issues:
1. Check the Hardhat node logs (terminal 1)
2. Check browser console for frontend errors
3. Run `npx hardhat test` to verify contract logic
4. Review this guide for common troubleshooting steps

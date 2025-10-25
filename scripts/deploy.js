const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment of SeakuyNFTMarketplace...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");

  const SeakuyNFTMarketplace = await hre.ethers.getContractFactory("SeakuyNFTMarketplace");
  console.log("⏳ Deploying contract...");
  
  const marketplace = await SeakuyNFTMarketplace.deploy();
  await marketplace.waitForDeployment();

  const address = await marketplace.getAddress();
  console.log("✅ SeakuyNFTMarketplace deployed to:", address);

  console.log("\n📋 Next steps:");
  console.log("1. Update src/config/contracts.ts with this address:");
  console.log(`   export const MARKETPLACE_ADDRESS = "${address}";`);
  console.log("\n2. Verify contract on Etherscan:");
  console.log(`   npx hardhat verify --network sepolia ${address}`);
  console.log("\n3. Test the contract:");
  console.log("   - Connect wallet on Sepolia network");
  console.log("   - Mint test NFT");
  console.log("   - List and buy with encrypted prices");

  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
  });

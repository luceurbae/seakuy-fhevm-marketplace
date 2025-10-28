const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting LOCAL deployment of SeakuyNFTMarketplace...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");

  const SeakuyNFTMarketplace = await hre.ethers.getContractFactory("SeakuyNFTMarketplace");
  console.log("⏳ Deploying contract to localhost...");
  
  const marketplace = await SeakuyNFTMarketplace.deploy();
  await marketplace.waitForDeployment();

  const address = await marketplace.getAddress();
  console.log("✅ SeakuyNFTMarketplace deployed to:", address);

  console.log("\n📋 Next steps:");
  console.log("1. Update src/config/contracts.ts with this address:");
  console.log(`   export const MARKETPLACE_ADDRESS = "${address}";`);
  console.log("\n2. Set environment variable:");
  console.log(`   VITE_NETWORK_MODE=localhost`);
  console.log("\n3. Start the frontend:");
  console.log("   npm run dev");
  console.log("\n4. Connect wallet to localhost:8545 network");
  console.log("   - Network Name: Localhost");
  console.log("   - RPC URL: http://127.0.0.1:8545");
  console.log("   - Chain ID: 31337");
  console.log("   - Currency Symbol: ETH");

  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
  });

const hre = require("hardhat");

async function main() {
  const contractAddress = process.argv[2];

  if (!contractAddress) {
    console.error("❌ Please provide contract address");
    console.log("Usage: node scripts/verify.js <CONTRACT_ADDRESS>");
    process.exit(1);
  }

  console.log("🔍 Verifying contract at:", contractAddress);

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("✅ Contract verified successfully!");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("✓ Contract already verified");
    } else {
      console.error("❌ Verification failed:", error);
      process.exit(1);
    }
  }
}

main();

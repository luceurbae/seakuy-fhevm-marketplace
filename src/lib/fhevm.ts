import { createInstance, initFhevm } from "fhevmjs";

// Network configurations
export const LOCALHOST_CONFIG = {
  chainId: 31337,
  networkUrl: "http://127.0.0.1:8545",
  gatewayUrl: "http://localhost:8545", // Mocked gateway for local testing
};

export const SEPOLIA_CONFIG = {
  chainId: 11155111,
  networkUrl: "https://eth-sepolia.public.blastapi.io",
  gatewayUrl: "https://gateway.sepolia.zama.ai",
  kmsContractAddress: "0x9D6891A6240D6130c54ae243d8005063D05fE14b",
  aclContractAddress: "0xFee8407e2f5e3Ee68ad77cAE98c434e637f516e5",
};

let fhevmInstance: any = null;

// Detect which network to use based on chainId
const getNetworkConfig = (chainId: number) => {
  if (chainId === 31337) return LOCALHOST_CONFIG;
  return SEPOLIA_CONFIG;
};

export const initializeFhevm = async (chainId: number = 11155111) => {
  if (fhevmInstance) return fhevmInstance;
  
  // Skip FHEVM for localhost since it requires deployed contracts
  if (chainId === 31337) {
    console.log("Skipping FHEVM initialization for localhost (use demo mode for local testing)");
    return null;
  }
  
  try {
    await initFhevm();
    const config = getNetworkConfig(chainId);
    fhevmInstance = await createInstance(config);
    console.log(`FHEVM initialized successfully for Sepolia`);
    return fhevmInstance;
  } catch (error) {
    console.error("FHEVM initialization error:", error);
    console.warn("Continuing without FHEVM encryption");
    return null;
  }
};

export const getFhevmInstance = () => {
  if (!fhevmInstance) {
    throw new Error("FHEVM not initialized. Call initializeFhevm first.");
  }
  return fhevmInstance;
};

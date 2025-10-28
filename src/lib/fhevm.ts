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
  
  try {
    await initFhevm();
    const config = getNetworkConfig(chainId);
    fhevmInstance = await createInstance(config);
    console.log(`FHEVM initialized successfully for ${chainId === 31337 ? 'localhost' : 'Sepolia'}`);
    return fhevmInstance;
  } catch (error) {
    console.error("FHEVM initialization error:", error);
    // Don't throw - allow the app to continue in demo mode
    return null;
  }
};

export const getFhevmInstance = () => {
  if (!fhevmInstance) {
    throw new Error("FHEVM not initialized. Call initializeFhevm first.");
  }
  return fhevmInstance;
};

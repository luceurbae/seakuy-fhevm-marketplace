import { createInstance, initFhevm } from "fhevmjs";

export const SEPOLIA_CONFIG = {
  chainId: 11155111,
  networkUrl: "https://eth-sepolia.public.blastapi.io",
  gatewayUrl: "https://gateway.sepolia.zama.ai",
  kmsContractAddress: "0x9D6891A6240D6130c54ae243d8005063D05fE14b",
  aclContractAddress: "0xFee8407e2f5e3Ee68ad77cAE98c434e637f516e5",
};

let fhevmInstance: any = null;

export const initializeFhevm = async () => {
  if (fhevmInstance) return fhevmInstance;
  
  await initFhevm();
  
  fhevmInstance = await createInstance(SEPOLIA_CONFIG);
  
  return fhevmInstance;
};

export const getFhevmInstance = () => {
  if (!fhevmInstance) {
    throw new Error("FHEVM not initialized. Call initializeFhevm first.");
  }
  return fhevmInstance;
};

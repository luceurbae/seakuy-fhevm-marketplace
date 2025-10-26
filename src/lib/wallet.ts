import { ethers } from "ethers";
import { toast } from "sonner";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const connectWallet = async (): Promise<string | null> => {
  if (!window.ethereum) {
    toast.error("Please install MetaMask to use this dApp");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    const network = await provider.getNetwork();
    if (network.chainId !== BigInt(11155111)) {
      await switchToSepolia();
    }
    
    toast.success(`Wallet Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
    
    return address;
  } catch (error: any) {
    console.error("Wallet connection error:", error);
    toast.error(error.message || "Failed to connect wallet");
    return null;
  }
};

export const switchToSepolia = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0xaa36a7",
          chainName: "Sepolia Test Network",
          nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
          rpcUrls: ["https://eth-sepolia.public.blastapi.io"],
          blockExplorerUrls: ["https://sepolia.etherscan.io"],
        }],
      });
    }
  }
};

export const getProvider = () => {
  if (!window.ethereum) return null;
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async () => {
  const provider = getProvider();
  if (!provider) return null;
  return await provider.getSigner();
};

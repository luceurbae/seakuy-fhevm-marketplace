import { ethers } from "ethers";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const connectWallet = async (): Promise<string | null> => {
  if (!window.ethereum) {
    toast({
      title: "MetaMask Not Found",
      description: "Please install MetaMask to use this dApp",
      variant: "destructive",
    });
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
    
    toast({
      title: "Wallet Connected",
      description: `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`,
    });
    
    return address;
  } catch (error: any) {
    toast({
      title: "Connection Failed",
      description: error.message,
      variant: "destructive",
    });
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

import { ethers } from "ethers";
import { MARKETPLACE_ADDRESS, MARKETPLACE_ABI } from "@/config/contracts";
import { getSigner } from "./wallet";
import { getFhevmInstance } from "./fhevm";

export const getMarketplaceContract = async () => {
  const signer = await getSigner();
  if (!signer) throw new Error("Wallet not connected");
  return new ethers.Contract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI, signer);
};

export const mintNFT = async (tokenURI: string, priceInEth: string) => {
  const contract = await getMarketplaceContract();
  const fhevm = getFhevmInstance();
  
  const priceWei = ethers.parseEther(priceInEth);
  const encryptedPrice = await fhevm.encrypt64(Number(priceWei));
  
  const tx = await contract.mintNFT(tokenURI, encryptedPrice);
  return await tx.wait();
};

export const listNFT = async (tokenId: number, priceInEth: string) => {
  const contract = await getMarketplaceContract();
  const fhevm = getFhevmInstance();
  
  const priceWei = ethers.parseEther(priceInEth);
  const encryptedPrice = await fhevm.encrypt64(Number(priceWei));
  
  const tx = await contract.listNFT(tokenId, encryptedPrice);
  return await tx.wait();
};

export const buyNFT = async (tokenId: number, priceInEth: string) => {
  const contract = await getMarketplaceContract();
  const fhevm = getFhevmInstance();
  
  const priceWei = ethers.parseEther(priceInEth);
  const encryptedPayment = await fhevm.encrypt64(Number(priceWei));
  
  const tx = await contract.buyNFT(tokenId, encryptedPayment, {
    value: priceWei
  });
  return await tx.wait();
};

export const placeBid = async (tokenId: number, bidAmountInEth: string) => {
  const contract = await getMarketplaceContract();
  const fhevm = getFhevmInstance();
  
  const bidWei = ethers.parseEther(bidAmountInEth);
  const encryptedBid = await fhevm.encrypt64(Number(bidWei));
  
  const tx = await contract.placeBid(tokenId, encryptedBid);
  return await tx.wait();
};

export const acceptBid = async (tokenId: number, bidIndex: number, bidAmountInEth: string) => {
  const contract = await getMarketplaceContract();
  
  const bidWei = ethers.parseEther(bidAmountInEth);
  
  const tx = await contract.acceptBid(tokenId, bidIndex, {
    value: bidWei
  });
  return await tx.wait();
};

export const getUserNFTs = async (address: string): Promise<number[]> => {
  const contract = await getMarketplaceContract();
  const tokenIds = await contract.getUserNFTs(address);
  return tokenIds.map((id: bigint) => Number(id));
};

export const getBidsCount = async (tokenId: number): Promise<number> => {
  const contract = await getMarketplaceContract();
  const count = await contract.getBidsCount(tokenId);
  return Number(count);
};

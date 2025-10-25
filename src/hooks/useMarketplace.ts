import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { mintNFT, listNFT, buyNFT, placeBid, acceptBid, getUserNFTs, getBidsCount } from "@/lib/marketplace";

export const useMarketplace = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMintNFT = async (tokenURI: string, price: string) => {
    setIsLoading(true);
    try {
      const receipt = await mintNFT(tokenURI, price);
      toast({
        title: "NFT Minted Successfully",
        description: `Token ID: ${receipt.logs[0]?.topics[1]}`,
      });
      return receipt;
    } catch (error: any) {
      toast({
        title: "Minting Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleListNFT = async (tokenId: number, price: string) => {
    setIsLoading(true);
    try {
      const receipt = await listNFT(tokenId, price);
      toast({
        title: "NFT Listed",
        description: "Your NFT is now available for sale",
      });
      return receipt;
    } catch (error: any) {
      toast({
        title: "Listing Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNFT = async (tokenId: number, price: string) => {
    setIsLoading(true);
    try {
      const receipt = await buyNFT(tokenId, price);
      toast({
        title: "Purchase Successful",
        description: "NFT transferred to your wallet",
      });
      return receipt;
    } catch (error: any) {
      toast({
        title: "Purchase Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceBid = async (tokenId: number, bidAmount: string) => {
    setIsLoading(true);
    try {
      const receipt = await placeBid(tokenId, bidAmount);
      toast({
        title: "Bid Placed",
        description: "Your encrypted bid has been submitted",
      });
      return receipt;
    } catch (error: any) {
      toast({
        title: "Bid Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptBid = async (tokenId: number, bidIndex: number, bidAmount: string) => {
    setIsLoading(true);
    try {
      const receipt = await acceptBid(tokenId, bidIndex, bidAmount);
      toast({
        title: "Bid Accepted",
        description: "NFT ownership transferred",
      });
      return receipt;
    } catch (error: any) {
      toast({
        title: "Accept Bid Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserNFTs = async (address: string) => {
    try {
      return await getUserNFTs(address);
    } catch (error: any) {
      toast({
        title: "Fetch Failed",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  const fetchBidsCount = async (tokenId: number) => {
    try {
      return await getBidsCount(tokenId);
    } catch (error: any) {
      return 0;
    }
  };

  return {
    isLoading,
    mintNFT: handleMintNFT,
    listNFT: handleListNFT,
    buyNFT: handleBuyNFT,
    placeBid: handlePlaceBid,
    acceptBid: handleAcceptBid,
    getUserNFTs: fetchUserNFTs,
    getBidsCount: fetchBidsCount,
  };
};

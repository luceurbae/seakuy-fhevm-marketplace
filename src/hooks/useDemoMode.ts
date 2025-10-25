import { useState, useEffect } from "react";
import { DEMO_MODE, DEMO_NFTS, DEMO_BIDS, DEMO_WALLET_ADDRESS, generateDemoNFT, simulateTransaction } from "@/lib/demo-mode";
import { NFT, Bid } from "@/types/nft";
import { toast } from "sonner";

export const useDemoMode = () => {
  const [nfts, setNfts] = useState<NFT[]>(DEMO_NFTS);
  const [bids, setBids] = useState<Record<number, Bid[]>>(DEMO_BIDS);
  const [isLoading, setIsLoading] = useState(false);

  const mintNFT = async (title: string, description: string, image: string, price: string): Promise<number> => {
    if (!DEMO_MODE) return 0;
    
    setIsLoading(true);
    const success = await simulateTransaction("minting NFT");
    
    if (success) {
      const newTokenId = nfts.length + 1;
      const newNFT: NFT = {
        tokenId: newTokenId,
        title,
        description,
        image,
        owner: DEMO_WALLET_ADDRESS,
        price,
        isListed: false,
        tokenURI: image,
      };
      setNfts([...nfts, newNFT]);
      toast.success("NFT minted successfully in demo mode!");
      setIsLoading(false);
      return newTokenId;
    }
    
    setIsLoading(false);
    toast.error("Demo transaction failed");
    throw new Error("Demo transaction failed");
  };

  const listNFT = async (tokenId: number, price: string): Promise<void> => {
    if (!DEMO_MODE) return;
    
    setIsLoading(true);
    const success = await simulateTransaction("listing NFT");
    
    if (success) {
      setNfts(nfts.map(nft => 
        nft.tokenId === tokenId 
          ? { ...nft, isListed: true, price }
          : nft
      ));
      toast.success("NFT listed successfully in demo mode!");
    } else {
      toast.error("Demo transaction failed");
    }
    setIsLoading(false);
  };

  const buyNFT = async (tokenId: number): Promise<void> => {
    if (!DEMO_MODE) return;
    
    setIsLoading(true);
    const success = await simulateTransaction("buying NFT");
    
    if (success) {
      setNfts(nfts.map(nft => 
        nft.tokenId === tokenId 
          ? { ...nft, owner: DEMO_WALLET_ADDRESS, isListed: false }
          : nft
      ));
      toast.success("NFT purchased successfully in demo mode!");
    } else {
      toast.error("Demo transaction failed");
    }
    setIsLoading(false);
  };

  const placeBid = async (tokenId: number, encryptedAmount: string): Promise<void> => {
    if (!DEMO_MODE) return;
    
    setIsLoading(true);
    const success = await simulateTransaction("placing bid");
    
    if (success) {
      const newBid: Bid = {
        bidder: DEMO_WALLET_ADDRESS,
        encryptedAmount,
        timestamp: Date.now(),
      };
      setBids({
        ...bids,
        [tokenId]: [...(bids[tokenId] || []), newBid],
      });
      toast.success("Bid placed successfully in demo mode!");
    } else {
      toast.error("Demo transaction failed");
    }
    setIsLoading(false);
  };

  const getUserNFTs = (address: string): NFT[] => {
    return nfts.filter(nft => nft.owner.toLowerCase() === address.toLowerCase());
  };

  const getBidsForNFT = (tokenId: number): Bid[] => {
    return bids[tokenId] || [];
  };

  return {
    isDemoMode: DEMO_MODE,
    nfts,
    bids,
    isLoading,
    mintNFT,
    listNFT,
    buyNFT,
    placeBid,
    getUserNFTs,
    getBidsForNFT,
  };
};

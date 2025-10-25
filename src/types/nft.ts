export interface NFT {
  tokenId: number;
  title: string;
  description?: string;
  image: string;
  price: string;
  owner: string;
  isListed: boolean;
  tokenURI?: string;
  bidsCount?: number;
}

export interface Bid {
  bidder: string;
  timestamp: number;
  encryptedAmount: string;
}

export interface MarketplaceStats {
  totalNFTs: number;
  totalSales: number;
  totalVolume: string;
  averagePrice: string;
}

export interface UserProfile {
  address: string;
  ownedNFTs: number[];
  createdNFTs: number[];
  totalSales: number;
  totalPurchases: number;
}

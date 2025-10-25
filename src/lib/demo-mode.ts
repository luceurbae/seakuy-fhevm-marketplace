import { NFT, Bid } from "@/types/nft";

export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

export const DEMO_WALLET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

export const DEMO_NFTS: NFT[] = [
  {
    tokenId: 1,
    title: "Cosmic Dreams #001",
    description: "A mesmerizing journey through the digital cosmos",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800",
    owner: DEMO_WALLET_ADDRESS,
    price: "2.5",
    isListed: true,
    tokenURI: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800",
  },
  {
    tokenId: 2,
    title: "Neon Genesis #042",
    description: "Vibrant digital art from the neon collection",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800",
    owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    price: "1.8",
    isListed: true,
    tokenURI: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800",
  },
  {
    tokenId: 3,
    title: "Abstract Dimensions #089",
    description: "Exploring the boundaries of digital abstraction",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    owner: DEMO_WALLET_ADDRESS,
    price: "3.2",
    isListed: false,
    tokenURI: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
  },
];

export const DEMO_BIDS: Record<number, Bid[]> = {
  1: [
    {
      bidder: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
      encryptedAmount: "2.2",
      timestamp: Date.now() - 3600000,
    },
    {
      bidder: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
      encryptedAmount: "2.4",
      timestamp: Date.now() - 1800000,
    },
  ],
  2: [
    {
      bidder: DEMO_WALLET_ADDRESS,
      encryptedAmount: "1.5",
      timestamp: Date.now() - 7200000,
    },
  ],
};

export const generateDemoNFT = (tokenId: number, owner: string): NFT => ({
  tokenId,
  title: `Demo NFT #${tokenId.toString().padStart(3, "0")}`,
  description: "This is a demo NFT for testing purposes",
  image: `https://images.unsplash.com/photo-${1618005182384 + tokenId}?w=800`,
  owner,
  price: (Math.random() * 3 + 0.5).toFixed(2),
  isListed: Math.random() > 0.3,
  tokenURI: `https://images.unsplash.com/photo-${1618005182384 + tokenId}?w=800`,
});

export const simulateTransaction = async (action: string): Promise<boolean> => {
  console.log(`🎭 DEMO MODE: Simulating ${action}...`);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return Math.random() > 0.1; // 90% success rate
};

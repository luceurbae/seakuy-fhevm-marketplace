export const MARKETPLACE_ADDRESS = "0x0000000000000000000000000000000000000000";

export const MARKETPLACE_ABI = [
  "function mintNFT(string memory tokenURI, bytes calldata encryptedPrice) external returns (uint256)",
  "function listNFT(uint256 tokenId, bytes calldata encryptedPrice) external",
  "function buyNFT(uint256 tokenId, bytes calldata encryptedPayment) external payable",
  "function placeBid(uint256 tokenId, bytes calldata encryptedBidAmount) external",
  "function acceptBid(uint256 tokenId, uint256 bidIndex) external payable",
  "function getEncryptedPrice(uint256 tokenId) external view returns (uint64)",
  "function getUserNFTs(address user) external view returns (uint256[] memory)",
  "function getBidsCount(uint256 tokenId) external view returns (uint256)",
  "event NFTMinted(uint256 indexed tokenId, address indexed owner)",
  "event NFTListed(uint256 indexed tokenId, address indexed owner)",
  "event NFTSold(uint256 indexed tokenId, address indexed from, address indexed to)",
  "event BidPlaced(uint256 indexed tokenId, address indexed bidder)",
  "event BidAccepted(uint256 indexed tokenId, address indexed winner)"
];

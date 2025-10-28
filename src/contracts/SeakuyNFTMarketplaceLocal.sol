// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import "fhevm/config/ZamaFHEVMConfig.sol";

// Local version without network-specific config for Hardhat testing
contract SeakuyNFTMarketplace {
    struct NFT {
        uint256 tokenId;
        address owner;
        euint64 encryptedPrice;
        bool isListed;
        string tokenURI;
    }

    struct Bid {
        address bidder;
        euint64 encryptedAmount;
        uint256 timestamp;
    }

    mapping(uint256 => NFT) public nfts;
    mapping(uint256 => Bid[]) public bids;
    mapping(address => uint256[]) public userNFTs;
    
    uint256 public nextTokenId;
    uint256 public platformFee = 250;
    
    event NFTMinted(uint256 indexed tokenId, address indexed owner);
    event NFTListed(uint256 indexed tokenId, address indexed owner);
    event NFTSold(uint256 indexed tokenId, address indexed from, address indexed to);
    event BidPlaced(uint256 indexed tokenId, address indexed bidder);
    event BidAccepted(uint256 indexed tokenId, address indexed winner);

    function mintNFT(string memory tokenURI, bytes calldata encryptedPrice) external returns (uint256) {
        uint256 tokenId = nextTokenId++;
        
        euint64 price = TFHE.asEuint64(encryptedPrice);
        TFHE.allow(price, address(this));
        TFHE.allow(price, msg.sender);
        
        nfts[tokenId] = NFT({
            tokenId: tokenId,
            owner: msg.sender,
            encryptedPrice: price,
            isListed: false,
            tokenURI: tokenURI
        });
        
        userNFTs[msg.sender].push(tokenId);
        
        emit NFTMinted(tokenId, msg.sender);
        return tokenId;
    }

    function listNFT(uint256 tokenId, bytes calldata encryptedPrice) external {
        require(nfts[tokenId].owner == msg.sender, "Not owner");
        require(!nfts[tokenId].isListed, "Already listed");
        
        euint64 price = TFHE.asEuint64(encryptedPrice);
        TFHE.allow(price, address(this));
        TFHE.allow(price, msg.sender);
        
        nfts[tokenId].encryptedPrice = price;
        nfts[tokenId].isListed = true;
        
        emit NFTListed(tokenId, msg.sender);
    }

    function buyNFT(uint256 tokenId, bytes calldata encryptedPayment) external payable {
        require(nfts[tokenId].isListed, "Not listed");
        require(nfts[tokenId].owner != msg.sender, "Cannot buy own NFT");
        
        euint64 payment = TFHE.asEuint64(encryptedPayment);
        ebool validPayment = TFHE.ge(payment, nfts[tokenId].encryptedPrice);
        require(TFHE.decrypt(validPayment), "Insufficient payment");
        
        address previousOwner = nfts[tokenId].owner;
        
        uint256 platformCut = (msg.value * platformFee) / 10000;
        uint256 sellerAmount = msg.value - platformCut;
        
        payable(previousOwner).transfer(sellerAmount);
        
        nfts[tokenId].owner = msg.sender;
        nfts[tokenId].isListed = false;
        
        _removeFromUserNFTs(previousOwner, tokenId);
        userNFTs[msg.sender].push(tokenId);
        
        emit NFTSold(tokenId, previousOwner, msg.sender);
    }

    function placeBid(uint256 tokenId, bytes calldata encryptedBidAmount) external {
        require(nfts[tokenId].isListed, "Not listed");
        require(nfts[tokenId].owner != msg.sender, "Cannot bid on own NFT");
        
        euint64 bidAmount = TFHE.asEuint64(encryptedBidAmount);
        TFHE.allow(bidAmount, address(this));
        TFHE.allow(bidAmount, msg.sender);
        TFHE.allow(bidAmount, nfts[tokenId].owner);
        
        bids[tokenId].push(Bid({
            bidder: msg.sender,
            encryptedAmount: bidAmount,
            timestamp: block.timestamp
        }));
        
        emit BidPlaced(tokenId, msg.sender);
    }

    function acceptBid(uint256 tokenId, uint256 bidIndex) external payable {
        require(nfts[tokenId].owner == msg.sender, "Not owner");
        require(bidIndex < bids[tokenId].length, "Invalid bid");
        
        Bid memory acceptedBid = bids[tokenId][bidIndex];
        
        uint256 platformCut = (msg.value * platformFee) / 10000;
        uint256 sellerAmount = msg.value - platformCut;
        
        payable(msg.sender).transfer(sellerAmount);
        
        address previousOwner = nfts[tokenId].owner;
        nfts[tokenId].owner = acceptedBid.bidder;
        nfts[tokenId].isListed = false;
        
        _removeFromUserNFTs(previousOwner, tokenId);
        userNFTs[acceptedBid.bidder].push(tokenId);
        
        delete bids[tokenId];
        
        emit BidAccepted(tokenId, acceptedBid.bidder);
    }

    function getEncryptedPrice(uint256 tokenId) external view returns (euint64) {
        require(
            nfts[tokenId].owner == msg.sender || 
            nfts[tokenId].isListed,
            "Not authorized"
        );
        return nfts[tokenId].encryptedPrice;
    }

    function getUserNFTs(address user) external view returns (uint256[] memory) {
        return userNFTs[user];
    }

    function getBidsCount(uint256 tokenId) external view returns (uint256) {
        return bids[tokenId].length;
    }

    function _removeFromUserNFTs(address user, uint256 tokenId) private {
        uint256[] storage userTokens = userNFTs[user];
        for (uint256 i = 0; i < userTokens.length; i++) {
            if (userTokens[i] == tokenId) {
                userTokens[i] = userTokens[userTokens.length - 1];
                userTokens.pop();
                break;
            }
        }
    }
}

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SeakuyNFTMarketplace", function () {
  let marketplace;
  let owner, buyer, bidder;

  beforeEach(async function () {
    [owner, buyer, bidder] = await ethers.getSigners();
    
    const SeakuyNFTMarketplace = await ethers.getContractFactory("SeakuyNFTMarketplace");
    marketplace = await SeakuyNFTMarketplace.deploy();
    await marketplace.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await marketplace.getAddress()).to.be.properAddress;
    });

    it("Should have correct initial state", async function () {
      expect(await marketplace.nextTokenId()).to.equal(0);
      expect(await marketplace.platformFee()).to.equal(250);
    });
  });

  describe("Minting NFTs", function () {
    it("Should mint NFT with encrypted price", async function () {
      // For local testing, we use mock encrypted data
      const tokenURI = "ipfs://QmTest123";
      const encryptedPrice = ethers.randomBytes(32);

      const tx = await marketplace.mintNFT(tokenURI, encryptedPrice);
      const receipt = await tx.wait();

      expect(receipt).to.not.be.null;
      
      const userNFTs = await marketplace.getUserNFTs(owner.address);
      expect(userNFTs.length).to.equal(1);
      expect(userNFTs[0]).to.equal(0);
    });

    it("Should increment tokenId after minting", async function () {
      const tokenURI = "ipfs://QmTest123";
      const encryptedPrice = ethers.randomBytes(32);

      await marketplace.mintNFT(tokenURI, encryptedPrice);
      expect(await marketplace.nextTokenId()).to.equal(1);

      await marketplace.mintNFT(tokenURI, encryptedPrice);
      expect(await marketplace.nextTokenId()).to.equal(2);
    });
  });

  describe("Listing NFTs", function () {
    let tokenId;

    beforeEach(async function () {
      const tokenURI = "ipfs://QmTest123";
      const encryptedPrice = ethers.randomBytes(32);
      await marketplace.mintNFT(tokenURI, encryptedPrice);
      tokenId = 0;
    });

    it("Should list NFT successfully", async function () {
      const newEncryptedPrice = ethers.randomBytes(32);
      await expect(marketplace.listNFT(tokenId, newEncryptedPrice))
        .to.emit(marketplace, "NFTListed")
        .withArgs(tokenId, owner.address);
    });

    it("Should not allow non-owner to list", async function () {
      const newEncryptedPrice = ethers.randomBytes(32);
      await expect(
        marketplace.connect(buyer).listNFT(tokenId, newEncryptedPrice)
      ).to.be.revertedWith("Not owner");
    });
  });

  describe("Placing Bids", function () {
    let tokenId;

    beforeEach(async function () {
      const tokenURI = "ipfs://QmTest123";
      const encryptedPrice = ethers.randomBytes(32);
      await marketplace.mintNFT(tokenURI, encryptedPrice);
      tokenId = 0;
      
      // List the NFT
      await marketplace.listNFT(tokenId, encryptedPrice);
    });

    it("Should place bid on listed NFT", async function () {
      const encryptedBid = ethers.randomBytes(32);
      
      await expect(marketplace.connect(bidder).placeBid(tokenId, encryptedBid))
        .to.emit(marketplace, "BidPlaced")
        .withArgs(tokenId, bidder.address);

      expect(await marketplace.getBidsCount(tokenId)).to.equal(1);
    });

    it("Should not allow owner to bid on own NFT", async function () {
      const encryptedBid = ethers.randomBytes(32);
      
      await expect(
        marketplace.connect(owner).placeBid(tokenId, encryptedBid)
      ).to.be.revertedWith("Cannot bid on own NFT");
    });
  });

  describe("User NFTs", function () {
    it("Should track user NFTs correctly", async function () {
      const tokenURI = "ipfs://QmTest123";
      const encryptedPrice = ethers.randomBytes(32);

      await marketplace.mintNFT(tokenURI, encryptedPrice);
      await marketplace.mintNFT(tokenURI, encryptedPrice);
      await marketplace.connect(buyer).mintNFT(tokenURI, encryptedPrice);

      const ownerNFTs = await marketplace.getUserNFTs(owner.address);
      expect(ownerNFTs.length).to.equal(2);

      const buyerNFTs = await marketplace.getUserNFTs(buyer.address);
      expect(buyerNFTs.length).to.equal(1);
    });
  });
});

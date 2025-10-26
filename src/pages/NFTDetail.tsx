import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useDemoMode } from "@/hooks/useDemoMode";
import { useMarketplace } from "@/hooks/useMarketplace";
import { DEMO_MODE } from "@/lib/demo-mode";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "sonner";

export default function NFTDetail() {
  const { id } = useParams();
  const imageRef = useRef<HTMLDivElement>(null);
  const [bidAmount, setBidAmount] = useState("");
  const navigate = useNavigate();
  const { address } = useWallet();
  
  const demoMode = useDemoMode();
  const marketplace = useMarketplace();
  
  const nft = DEMO_MODE ? demoMode.nfts.find(n => n.tokenId === Number(id)) : null;
  const bids = DEMO_MODE ? demoMode.getBidsForNFT(Number(id)) : [];
  const isLoading = DEMO_MODE ? demoMode.isLoading : marketplace.isLoading;
  
  const isOwner = nft?.owner.toLowerCase() === address?.toLowerCase();

  const handleBuy = async () => {
    if (!nft || !address) {
      toast.error("Please connect your wallet");
      return;
    }
    
    try {
      if (DEMO_MODE) {
        await demoMode.buyNFT(nft.tokenId);
      } else {
        await marketplace.buyNFT(nft.tokenId, nft.price);
      }
      navigate("/profile");
    } catch (error) {
      console.error("Buy error:", error);
    }
  };

  const handlePlaceBid = async () => {
    if (!bidAmount || !nft || !address) {
      toast.error("Please enter a bid amount and connect wallet");
      return;
    }
    
    try {
      if (DEMO_MODE) {
        await demoMode.placeBid(nft.tokenId, bidAmount);
      } else {
        await marketplace.placeBid(nft.tokenId, bidAmount);
      }
      setBidAmount("");
    } catch (error) {
      console.error("Bid error:", error);
    }
  };
  
  if (!nft) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-6 pt-24 pb-12">
          <p className="text-center text-muted-foreground">NFT not found</p>
        </main>
      </div>
    );
  }

  useEffect(() => {
    if (!imageRef.current) return;
    
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div ref={imageRef}>
            <Card className="overflow-hidden gradient-card border-border">
              <div className="aspect-square">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{nft.title}</h1>
              <p className="text-muted-foreground">
                Owned by <span className="text-primary">{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</span>
              </p>
            </div>

            {nft.isListed && !isOwner && (
              <Card className="p-6 gradient-card border-border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                    <p className="text-3xl font-bold text-gradient">{nft.price} ETH</p>
                  </div>
                  
                  <Button 
                    onClick={handleBuy}
                    disabled={isLoading}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {isLoading ? "Processing..." : "Buy Now (Private Transaction)"}
                  </Button>
                </div>
              </Card>
            )}

            {nft.isListed && !isOwner && (
              <Card className="p-6 gradient-card border-border">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Place a Bid
                </h3>
                <div className="space-y-4">
                  <div>
                    <Input
                      type="number"
                      placeholder="Enter bid amount (ETH)"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="bg-background/50"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Your bid will be encrypted and private
                    </p>
                  </div>
                  <Button 
                    onClick={handlePlaceBid}
                    disabled={isLoading || !bidAmount}
                    className="w-full" 
                    variant="outline"
                  >
                    {isLoading ? "Placing..." : "Place Encrypted Bid"}
                  </Button>
                </div>
              </Card>
            )}

            {isOwner && bids.length > 0 && (
              <Card className="p-6 gradient-card border-border">
                <h3 className="text-xl font-bold mb-4">Bids Received</h3>
                <div className="space-y-2">
                  {bids.map((bid, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-background/50 rounded">
                      <div>
                        <p className="text-sm font-mono">{bid.bidder.slice(0, 6)}...{bid.bidder.slice(-4)}</p>
                        <p className="text-xs text-muted-foreground">{new Date(bid.timestamp).toLocaleString()}</p>
                      </div>
                      <p className="font-bold">{bid.encryptedAmount} ETH</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Card className="p-6 gradient-card border-border">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className="text-muted-foreground">
                {nft.description}
              </p>
            </Card>

            <Card className="p-6 gradient-card border-border">
              <h3 className="text-xl font-bold mb-4">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token ID</span>
                  <span className="font-mono">{nft.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span>Sepolia (FHEVM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span>{nft.isListed ? "Listed" : "Not Listed"}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

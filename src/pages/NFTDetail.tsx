import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { ShoppingCart, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NFTDetail() {
  const { id } = useParams();
  const imageRef = useRef<HTMLDivElement>(null);
  const [bidAmount, setBidAmount] = useState("");

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
                  src="https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=800&q=80"
                  alt="NFT"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Cosmic Voyager #001</h1>
              <p className="text-muted-foreground">
                Owned by <span className="text-primary">0x742d...0bEb</span>
              </p>
            </div>

            <Card className="p-6 gradient-card border-border">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                  <p className="text-3xl font-bold text-gradient">2.5 ETH</p>
                </div>
                
                <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now (Private Transaction)
                </Button>
              </div>
            </Card>

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
                <Button className="w-full" variant="outline">
                  Place Encrypted Bid
                </Button>
              </div>
            </Card>

            <Card className="p-6 gradient-card border-border">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className="text-muted-foreground">
                A unique digital artwork from the Cosmic Voyager collection. This piece represents
                the journey through the digital cosmos, combining vibrant colors and abstract forms
                to create a mesmerizing visual experience.
              </p>
            </Card>

            <Card className="p-6 gradient-card border-border">
              <h3 className="text-xl font-bold mb-4">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Address</span>
                  <span className="font-mono">0x9D68...14b</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token ID</span>
                  <span className="font-mono">{id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span>Sepolia (FHEVM)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Navbar } from "@/components/Navbar";
import { NFTCard } from "@/components/NFTCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/hooks/useWallet";
import { useDemoMode } from "@/hooks/useDemoMode";
import { DEMO_MODE } from "@/lib/demo-mode";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { address } = useWallet();
  const demoMode = useDemoMode();
  const [listPrice, setListPrice] = useState<Record<number, string>>({});
  
  const userNFTs = DEMO_MODE && address ? demoMode.getUserNFTs(address) : [];

  const handleListNFT = async (tokenId: number) => {
    const price = listPrice[tokenId];
    if (!price) {
      toast.error("Please enter a price");
      return;
    }
    
    try {
      if (DEMO_MODE) {
        await demoMode.listNFT(tokenId, price);
      }
      setListPrice({ ...listPrice, [tokenId]: "" });
    } catch (error) {
      console.error("List error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <Card className="p-8 mb-8 gradient-card border-border">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-full bg-gradient-primary flex items-center justify-center text-3xl font-bold">
              {address?.slice(2, 4).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </h1>
              <p className="text-muted-foreground">Seakuy Member</p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="owned" className="space-y-8">
          <TabsList className="bg-card">
            <TabsTrigger value="owned">Owned</TabsTrigger>
            <TabsTrigger value="created">Created</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="owned">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userNFTs.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-muted-foreground text-lg">No NFTs yet. Create your first NFT!</p>
                </div>
              ) : (
                userNFTs.map((nft) => (
                  <div key={nft.tokenId} className="space-y-3">
                    <NFTCard {...nft} />
                    {!nft.isListed && (
                      <Card className="p-4 gradient-card border-border">
                        <div className="space-y-2">
                          <Input
                            type="number"
                            placeholder="Price (ETH)"
                            value={listPrice[nft.tokenId] || ""}
                            onChange={(e) => setListPrice({ ...listPrice, [nft.tokenId]: e.target.value })}
                            className="bg-background/50"
                          />
                          <Button 
                            onClick={() => handleListNFT(nft.tokenId)}
                            disabled={demoMode.isLoading}
                            className="w-full"
                            size="sm"
                          >
                            {demoMode.isLoading ? "Listing..." : "List for Sale"}
                          </Button>
                        </div>
                      </Card>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="created">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No NFTs created yet</p>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="p-6 gradient-card border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium">Purchased Cosmic Voyager #001</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <span className="text-primary font-bold">2.5 ETH</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium">Placed bid on Digital Dreams #042</p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                  </div>
                  <span className="text-primary font-bold">1.8 ETH</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

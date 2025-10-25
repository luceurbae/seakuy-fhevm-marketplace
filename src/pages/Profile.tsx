import { Navbar } from "@/components/Navbar";
import { NFTCard } from "@/components/NFTCard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/hooks/useWallet";

const mockUserNFTs = [
  {
    tokenId: 1,
    title: "Cosmic Voyager #001",
    image: "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=800&q=80",
    price: "2.5",
    owner: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  },
  {
    tokenId: 3,
    title: "Neon Genesis #128",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80",
    price: "3.2",
    owner: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
  },
];

export default function Profile() {
  const { address } = useWallet();

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
              {mockUserNFTs.map((nft) => (
                <NFTCard key={nft.tokenId} {...nft} />
              ))}
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

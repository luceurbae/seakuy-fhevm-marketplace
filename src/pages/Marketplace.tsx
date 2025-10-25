import { Navbar } from "@/components/Navbar";
import { NFTCard } from "@/components/NFTCard";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const mockNFTs = [
  {
    tokenId: 1,
    title: "Cosmic Voyager #001",
    image: "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=800&q=80",
    price: "2.5",
    owner: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  },
  {
    tokenId: 2,
    title: "Digital Dreams #042",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
    price: "1.8",
    owner: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  },
  {
    tokenId: 3,
    title: "Neon Genesis #128",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80",
    price: "3.2",
    owner: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
  },
  {
    tokenId: 4,
    title: "Pixel Paradise #256",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    price: "4.5",
    owner: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359",
  },
];

export default function Marketplace() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Explore NFTs</h1>
          <p className="text-muted-foreground text-lg">
            Discover unique digital assets with encrypted private transactions
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockNFTs.map((nft) => (
            <NFTCard key={nft.tokenId} {...nft} />
          ))}
        </div>
      </main>
    </div>
  );
}

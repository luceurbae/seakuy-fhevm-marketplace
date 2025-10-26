import { Navbar } from "@/components/Navbar";
import { NFTCard } from "@/components/NFTCard";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useDemoMode } from "@/hooks/useDemoMode";
import { DEMO_MODE } from "@/lib/demo-mode";

export default function Marketplace() {
  const gridRef = useRef<HTMLDivElement>(null);
  const demoMode = useDemoMode();
  
  const nfts = DEMO_MODE ? demoMode.nfts.filter(nft => nft.isListed) : [];

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
          {nfts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-muted-foreground text-lg">No NFTs listed yet. Create your first NFT!</p>
            </div>
          ) : (
            nfts.map((nft) => (
              <NFTCard key={nft.tokenId} {...nft} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

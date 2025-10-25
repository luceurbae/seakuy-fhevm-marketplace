import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface NFTCardProps {
  tokenId: number;
  title: string;
  image: string;
  price: string;
  owner: string;
}

export const NFTCard = ({ tokenId, title, image, owner, price }: NFTCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Link to={`/nft/${tokenId}`}>
      <Card
        ref={cardRef}
        className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 gradient-card"
      >
        <div className="aspect-square overflow-hidden bg-muted">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg truncate">{title}</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {owner.slice(0, 6)}...{owner.slice(-4)}
            </span>
            <span className="font-bold text-primary">{price} ETH</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

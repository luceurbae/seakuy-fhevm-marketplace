import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Lock, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !featuresRef.current) return;

    gsap.fromTo(
      heroRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      featuresRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10 blur-3xl"></div>
        
        <div className="container mx-auto px-6 pt-32 pb-20 relative">
          <div ref={heroRef} className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Trade NFTs with{" "}
              <span className="text-gradient">Complete Privacy</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by Zama FHEVM encryption on Sepolia. Buy, sell, and bid on unique digital assets
              with encrypted transactions that protect your privacy.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/marketplace">
                <Button className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="outline" className="text-lg px-8 py-6">
                  Create NFT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            <div className="gradient-card p-8 rounded-xl border border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Encrypted Transactions</h3>
              <p className="text-muted-foreground">
                All transactions are encrypted using Zama FHEVM technology, ensuring complete privacy
                for buyers and sellers.
              </p>
            </div>

            <div className="gradient-card p-8 rounded-xl border border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Private Bidding</h3>
              <p className="text-muted-foreground">
                Place bids without revealing amounts to other bidders. Your bid remains confidential
                until accepted.
              </p>
            </div>

            <div className="gradient-card p-8 rounded-xl border border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Settlement</h3>
              <p className="text-muted-foreground">
                Fast and secure transactions on Sepolia network with minimal gas fees and maximum security.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

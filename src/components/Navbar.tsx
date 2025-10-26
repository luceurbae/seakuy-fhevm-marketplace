import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useWeb3Modal } from '@web3modal/wagmi/react';

export const Navbar = () => {
  const { address } = useWallet();
  const { open } = useWeb3Modal();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold">S</span>
            </div>
            <span className="text-2xl font-bold text-gradient">Seakuy</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-foreground/80 hover:text-foreground transition-colors">
              Marketplace
            </Link>
            <Link to="/create" className="text-foreground/80 hover:text-foreground transition-colors">
              Create
            </Link>
            {address && (
              <Link to="/profile" className="text-foreground/80 hover:text-foreground transition-colors">
                Profile
              </Link>
            )}
          </div>

          <Button
            onClick={() => open()}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

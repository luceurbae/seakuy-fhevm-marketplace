import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet } from "@/hooks/useWallet";

export const Navbar = () => {
  const { address } = useWallet();

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

          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

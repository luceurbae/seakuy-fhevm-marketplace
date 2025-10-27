import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState, useRef } from "react";
import { useDemoMode } from "@/hooks/useDemoMode";
import { useMarketplace } from "@/hooks/useMarketplace";
import { useWallet } from "@/hooks/useWallet";
import { DEMO_MODE } from "@/lib/demo-mode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateNFT() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const demoMode = useDemoMode();
  const marketplace = useMarketplace();
  const wallet = useWallet();
  
  const isLoading = DEMO_MODE ? demoMode.isLoading : marketplace.isLoading;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMint = async () => {
    if (!formData.name || !formData.description || !formData.price || !imagePreview) {
      toast.error("Please fill all fields and upload an image");
      return;
    }

    // Check wallet connection in production mode
    if (!DEMO_MODE && !wallet.address) {
      toast.error("Please connect your wallet first using the Connect Wallet button in the navbar");
      return;
    }

    try {
      if (DEMO_MODE) {
        await demoMode.mintNFT(formData.name, formData.description, imagePreview, formData.price);
      } else {
        // Ensure wallet is connected before minting
        if (!wallet.address) {
          toast.error("Wallet not connected. Please connect your wallet first.");
          return;
        }
        await marketplace.mintNFT(imagePreview, formData.price);
      }
      
      toast.success("NFT created successfully!");
      navigate("/profile");
    } catch (error: any) {
      console.error("Minting error:", error);
      toast.error(error.message || "Failed to mint NFT");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gradient">Create NFT</h1>
            <p className="text-muted-foreground text-lg">
              Mint your digital asset with encrypted pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 gradient-card border-border">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 gradient-card border-border">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      placeholder="NFT Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea
                      placeholder="Describe your NFT..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-background/50 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price (ETH)
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="bg-background/50"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Price will be encrypted using FHEVM
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 gradient-card border-border">
                <h3 className="font-semibold mb-3">Privacy Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Encrypted pricing using Zama FHEVM</li>
                  <li>✓ Private transaction history</li>
                  <li>✓ Protected bid amounts</li>
                </ul>
              </Card>

              <Button 
                onClick={handleMint} 
                disabled={isLoading}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {isLoading ? "Creating..." : "Create & Mint NFT"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

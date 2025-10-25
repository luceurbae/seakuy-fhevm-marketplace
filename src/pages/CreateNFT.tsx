import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function CreateNFT() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

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
              <div className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
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

              <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                Create & Mint NFT
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

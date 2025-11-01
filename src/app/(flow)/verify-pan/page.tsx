'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function VerifyPanPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/basic-info');
  };

  return (
    <div className="flex h-full flex-col animate-in fade-in-50 duration-500">
      <div className="flex-1">
        <h2 className="font-headline text-2xl font-bold tracking-tight">PAN Verification</h2>
        <p className="mt-2 text-muted-foreground">
          Please enter your PAN card number for verification.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Input 
              id="pan" 
              type="text" 
              placeholder="ABCDE1234F" 
              required 
              className="uppercase"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Enter a valid PAN number"
            />
          </div>
          <Button type="submit" className="w-full">Verify & Continue</Button>
        </form>
      </div>
    </div>
  );
}

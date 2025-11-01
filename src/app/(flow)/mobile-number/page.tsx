'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function MobileNumberPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/verify-otp');
  };

  return (
    <div className="flex h-full flex-col animate-in fade-in-50 duration-500">
      <div className="flex-1">
        <h2 className="font-headline text-2xl font-bold tracking-tight">Enter your mobile number</h2>
        <p className="mt-2 text-muted-foreground">We'll send you a one-time password (OTP) to verify your number.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <div className="flex items-center">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-secondary px-3 text-muted-foreground">
                +91
              </span>
              <Input id="mobile" type="tel" pattern="\d{10}" title="Please enter a 10-digit mobile number" placeholder="98765 43210" required className="rounded-l-none" />
            </div>
          </div>
          <Button type="submit" className="w-full">Continue</Button>
        </form>
      </div>
    </div>
  );
}

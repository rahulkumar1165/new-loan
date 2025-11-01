'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function BankAccountPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/video-verification');
  };

  return (
    <div className="flex h-full flex-col animate-in fade-in-50 duration-500">
      <div className="flex-1">
        <h2 className="font-headline text-2xl font-bold tracking-tight">Bank Account Details</h2>
        <p className="mt-2 text-muted-foreground">
          Your loan amount will be disbursed to this account.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="account-name">Account Holder Name</Label>
            <Input id="account-name" type="text" placeholder="As per bank records" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-number">Account Number</Label>
            <Input id="account-number" type="text" placeholder="Your bank account number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ifsc">IFSC Code</Label>
            <Input id="ifsc" type="text" placeholder="Your bank's IFSC code" required className="uppercase" />
          </div>
          <Button type="submit" className="w-full">Add Account & Continue</Button>
        </form>
      </div>
    </div>
  );
}

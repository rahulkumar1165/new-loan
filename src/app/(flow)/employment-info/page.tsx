'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

export default function EmploymentInfoPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/upload-documents');
  };

  return (
    <div className="flex h-full flex-col animate-in fade-in-50 duration-500">
      <div className="flex-1">
        <h2 className="font-headline text-2xl font-bold tracking-tight">Employment Details</h2>
        <p className="mt-2 text-muted-foreground">This helps us understand your financial stability.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-3">
            <Label>Employment Type</Label>
            <RadioGroup defaultValue="salaried" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="salaried" id="salaried" />
                <Label htmlFor="salaried" className="font-normal">Salaried</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="self-employed" id="self-employed" />
                <Label htmlFor="self-employed" className="font-normal">Self-Employed</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Monthly Income (in ₹)</Label>
            <Input id="salary" type="number" placeholder="e.g., 50000" required />
          </div>
          <Button type="submit" className="w-full">Save & Continue</Button>
        </form>
      </div>
    </div>
  );
}

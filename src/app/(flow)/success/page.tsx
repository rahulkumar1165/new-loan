import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center animate-in fade-in-50 duration-500">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <h2 className="font-headline mt-6 text-2xl font-bold tracking-tight">Application Submitted!</h2>
      <p className="mt-2 max-w-sm text-muted-foreground">
        Thank you for completing your loan application. We are reviewing your details and will get back to you within 2-3 business days.
      </p>
      <Button asChild className="mt-8 w-full">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}

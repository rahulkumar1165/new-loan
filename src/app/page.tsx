import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-800">
      <Card className="w-full max-w-[390px] text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="pt-4 text-2xl font-bold text-primary">
            Welcome to LoanFlow
          </CardTitle>
          <CardDescription>Your seamless path to a personal loan.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">Ready to get started? The application process is quick, secure, and easy.</p>
          <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
            <Link href="/mobile-number">Start Application</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

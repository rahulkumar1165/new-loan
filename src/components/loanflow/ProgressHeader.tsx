"use client";
import { usePathname, useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = [
  '/mobile-number',
  '/verify-otp',
  '/verify-pan',
  '/basic-info',
  '/employment-info',
  '/upload-documents',
  '/bank-account',
  '/video-verification',
];

export function ProgressHeader() {
  const pathname = usePathname();
  const router = useRouter();
  
  const currentStepIndex = steps.findIndex(step => pathname.endsWith(step));
  const progress = currentStepIndex >= 0 ? ((currentStepIndex + 1) / steps.length) * 100 : 0;
  
  const isFirstStep = pathname.endsWith(steps[0]);
  const isSuccessPage = pathname.endsWith('/success');

  if (isSuccessPage) {
    return (
       <header className="sticky top-0 z-10 border-b bg-background p-4">
        <div className="flex items-center justify-center">
            <h1 className="font-headline text-xl font-bold text-primary">
              <Link href="/">LoanFlow</Link>
            </h1>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background p-4">
      <div className="flex items-center justify-start h-8">
        {!isFirstStep && (
          <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2" onClick={() => router.back()}>
            <ChevronLeft size={24} />
          </Button>
        )}
        <h1 className="font-headline text-xl font-bold text-primary ml-2">
            <Link href="/">LoanFlow</Link>
        </h1>
      </div>
      <Progress value={progress} className="mt-4 h-2" />
    </header>
  );
}

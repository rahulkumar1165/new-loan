'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from 'react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const inputRefs = Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/verify-pan');
  };
  
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="flex h-full flex-col animate-in fade-in-50 duration-500">
      <div className="flex-1">
        <h2 className="font-headline text-2xl font-bold tracking-tight">Enter OTP</h2>
        <p className="mt-2 text-muted-foreground">
          An OTP has been sent to your mobile number.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="flex justify-center gap-2 sm:gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Input
                key={i}
                ref={inputRefs[i]}
                id={`otp-${i}`}
                type="tel"
                maxLength={1}
                className="h-14 w-12 text-center text-2xl"
                onChange={(e) => handleOtpChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                required
              />
            ))}
          </div>
          <div className="space-y-4">
            <Button type="submit" className="w-full">Verify & Continue</Button>
            <div className="text-center">
              <Button variant="link" type="button" className="text-accent">Resend OTP</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

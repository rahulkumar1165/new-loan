import type { ReactNode } from 'react';
import { ProgressHeader } from '@/components/loanflow/ProgressHeader';

export default function FlowLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-100 dark:bg-gray-900 py-4 sm:py-8">
      <main className="flex h-full w-full max-w-[390px] flex-col bg-background shadow-2xl rounded-lg overflow-hidden sm:h-auto sm:min-h-[800px]">
        <ProgressHeader />
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

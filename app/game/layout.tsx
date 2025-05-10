import { ReactNode } from 'react';

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <main className="m-0 p-0 flex items-center justify-center h-full bg-black overflow-hidden">
      <div className="w-[calc(100vh*(9/16))] h-full bg-white max-w-full max-h-full">
        {children}
      </div>
    </main>
  );
}

"use client";

import { Sidebar } from "@/components/Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-[250px_minmax(0,1fr)] max-[1080px]:grid-cols-1">
      <div className="max-[1080px]:hidden">
        <Sidebar />
      </div>
      <main className="min-w-0 px-[18px] pb-[60px] pt-[22px] sm:px-[30px]">
        <div className="mx-auto w-full max-w-[1320px]">{children}</div>
      </main>
    </div>
  );
}

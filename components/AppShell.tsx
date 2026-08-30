"use client";

import React from "react";
import { ScrapingProvider, useScraping } from "@/components/ScrapingContext";
import { TopNav } from "@/components/TopNav";
import { PortalDetailDrawer } from "@/components/PortalDetailDrawer";
import { JobDetailDrawer } from "@/components/JobDetailDrawer";
import { FindingDetailDrawer } from "@/components/FindingDetailDrawer";
import { OfferDetailDrawer } from "@/components/OfferDetailDrawer";
import { CensusIdDrawer } from "@/components/CensusIdDrawer";
import { RepairProgressBanner } from "@/components/RepairProgressBanner";
import { CommandPalette } from "@/components/CommandPalette";
import { CheckCircle2, AlertCircle } from "lucide-react";

function ShellInner({ children }: { children: React.ReactNode }) {
  const {
    selectedPortal,
    setSelectedPortal,
    selectedJob,
    setSelectedJob,
    selectedFinding,
    setSelectedFinding,
    selectedOffer,
    setSelectedOffer,
    selectedCensusPortalId,
    setSelectedCensusPortalId,
    toast,
  } = useScraping();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <TopNav />

      <main className="flex-1 px-4 py-5 sm:px-6 md:px-8 max-w-[1680px] w-full mx-auto">
        {children}
      </main>

      <PortalDetailDrawer
        portal={selectedPortal}
        onClose={() => setSelectedPortal(null)}
      />

      <JobDetailDrawer
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      <FindingDetailDrawer
        finding={selectedFinding}
        onClose={() => setSelectedFinding(null)}
      />

      <OfferDetailDrawer
        offer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
      />

      <CensusIdDrawer
        portalId={selectedCensusPortalId}
        onClose={() => setSelectedCensusPortalId(null)}
      />

      <RepairProgressBanner />

      <CommandPalette />

      {toast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 shadow-2xl text-[13px] font-medium">
          {toast.type === "success" ? (
            <CheckCircle2 size={16} className="text-success flex-none" />
          ) : (
            <AlertCircle size={16} className="text-warning flex-none" />
          )}
          <span className="text-foreground">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ScrapingProvider>
      <ShellInner>{children}</ShellInner>
    </ScrapingProvider>
  );
}

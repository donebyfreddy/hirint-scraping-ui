"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  portals,
  activeScrapeJobs,
  findingsList,
  sampleJobOffers,
  type Portal,
  type DetailedScrapeJob,
  type FindingDetail,
  type JobOfferRecord,
} from "@/data/mock-data";

export interface RepairJobState {
  id: string;
  findingId: string;
  title: string;
  portalName: string;
  totalTarget: number;
  processed: number;
  recovered: number;
  updated: number;
  unchanged: number;
  stillMissing: number;
  failed: number;
  progress: number;
  status: "RUNNING" | "COMPLETED" | "FAILED";
  logs: string[];
}

interface ScrapingContextType {
  // Drawers
  selectedPortal: Portal | null;
  setSelectedPortal: (portal: Portal | null) => void;
  selectedJob: DetailedScrapeJob | null;
  setSelectedJob: (job: DetailedScrapeJob | null) => void;
  selectedFinding: FindingDetail | null;
  setSelectedFinding: (finding: FindingDetail | null) => void;
  selectedOffer: JobOfferRecord | null;
  setSelectedOffer: (offer: JobOfferRecord | null) => void;
  selectedCensusPortalId: string | null;
  setSelectedCensusPortalId: (portalId: string | null) => void;

  // Command palette
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;

  // Active repair jobs
  activeRepair: RepairJobState | null;
  startReanalysis: (finding: FindingDetail) => void;
  cancelRepair: () => void;

  // Active toast notification
  toast: { message: string; type?: "info" | "success" | "warning" } | null;
  showToast: (message: string, type?: "info" | "success" | "warning") => void;

  // Real-time refresh state
  isRefreshing: boolean;
  triggerRefresh: () => void;
  lastRefreshTime: string;

  // Open portal by ID helper
  openPortalById: (portalId: string) => void;
  openJobById: (jobId: string) => void;
  openFindingById: (findingId: string) => void;
}

const ScrapingContext = createContext<ScrapingContextType | undefined>(undefined);

export function ScrapingProvider({ children }: { children: React.ReactNode }) {
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);
  const [selectedJob, setSelectedJob] = useState<DetailedScrapeJob | null>(null);
  const [selectedFinding, setSelectedFinding] = useState<FindingDetail | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<JobOfferRecord | null>(null);
  const [selectedCensusPortalId, setSelectedCensusPortalId] = useState<string | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeRepair, setActiveRepair] = useState<RepairJobState | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: "info" | "success" | "warning" } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState("hace unos segundos");

  // Global shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showToast = (message: string, type: "info" | "success" | "warning" = "info") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3200);
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    showToast("Comprobando estado de todos los workers y parsers…", "info");
    window.setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshTime("ahora mismo");
      showToast("Datos sincronizados con éxito", "success");
    }, 1200);
  };

  const openPortalById = (portalId: string) => {
    const p = portals.find((x) => x.id === portalId);
    if (p) setSelectedPortal(p);
  };

  const openJobById = (jobId: string) => {
    const j = activeScrapeJobs.find((x) => x.id === jobId);
    if (j) setSelectedJob(j);
  };

  const openFindingById = (findingId: string) => {
    const f = findingsList.find((x) => x.id === findingId);
    if (f) setSelectedFinding(f);
  };

  // Reanalysis background task simulator
  const startReanalysis = (finding: FindingDetail) => {
    setSelectedFinding(null); // Close finding drawer to see background banner
    const newRepair: RepairJobState = {
      id: `repair-${Date.now()}`,
      findingId: finding.id,
      title: `Reanálisis determinista: ${finding.problemField}`,
      portalName: finding.portalName,
      totalTarget: finding.affectedCount,
      processed: 0,
      recovered: 0,
      updated: 0,
      unchanged: 0,
      stillMissing: 0,
      failed: 0,
      progress: 0,
      status: "RUNNING",
      logs: [
        `Iniciando worker de reanálisis para ${finding.portalName} (${finding.affectedCount} ofertas)...`,
        `Cargando snapshots HTML y URLs canónicas de base de datos...`,
        `Aplicando parser de respaldo actualizado para ${finding.problemField}...`,
      ],
    };
    setActiveRepair(newRepair);
    showToast(`Tarea de reanálisis lanzada en segundo plano para ${finding.portalName}`, "info");

    // Simulate progress ticks
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setActiveRepair((prev) => {
          if (!prev) return null;
          const recovered = Math.round(prev.totalTarget * 0.94);
          return {
            ...prev,
            processed: prev.totalTarget,
            recovered,
            updated: recovered,
            unchanged: Math.round(prev.totalTarget * 0.04),
            stillMissing: Math.round(prev.totalTarget * 0.02),
            progress: 100,
            status: "COMPLETED",
            logs: [
              ...prev.logs,
              `Progreso 100%: ${prev.totalTarget}/${prev.totalTarget} ofertas reanalizadas`,
              `✅ ${recovered} campos recuperados y persistidos con éxito`,
              `Control diario de Calidad de datos actualizado`,
            ],
          };
        });
        showToast(`✅ Reanálisis completado: ${finding.portalName} ha recuperado los campos afectados`, "success");
      } else {
        setActiveRepair((prev) => {
          if (!prev) return null;
          const currentProcessed = Math.round((progress / 100) * prev.totalTarget);
          const currentRecovered = Math.round(currentProcessed * 0.94);
          return {
            ...prev,
            processed: currentProcessed,
            recovered: currentRecovered,
            updated: currentRecovered,
            progress,
            logs: [
              ...prev.logs,
              `Procesadas ${currentProcessed}/${prev.totalTarget} ofertas (${currentRecovered} recuperadas)...`,
            ],
          };
        });
      }
    }, 900);
  };

  const cancelRepair = () => {
    setActiveRepair(null);
    showToast("Tarea de reanálisis descartada", "info");
  };

  return (
    <ScrapingContext.Provider
      value={{
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
        commandOpen,
        setCommandOpen,
        activeRepair,
        startReanalysis,
        cancelRepair,
        toast,
        showToast,
        isRefreshing,
        triggerRefresh,
        lastRefreshTime,
        openPortalById,
        openJobById,
        openFindingById,
      }}
    >
      {children}
    </ScrapingContext.Provider>
  );
}

export function useScraping() {
  const context = useContext(ScrapingContext);
  if (!context) throw new Error("useScraping must be used within a ScrapingProvider");
  return context;
}

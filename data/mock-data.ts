// ---------------------------------------------------------------------------
// MOCK DATA — Hirint Scraping Suite (standalone UX prototype)
// Every value here is fictional/illustrative. Nothing here is fetched from a
// real service; there is no backend behind this prototype.
// ---------------------------------------------------------------------------

export type PortalStatus = "healthy" | "warning" | "critical";
export type Region = "España" | "LATAM" | "Suiza" | "Francia" | "Alemania" | "Portugal";

export interface Portal {
  id: string;
  name: string;
  shortCode: string; // 2-letter tag shown in the portal chip
  color: string; // tailwind-style hex used for the chip background
  country: string;
  countryFlag: string;
  region: Region;
  offers: number;
  lastRun: string; // human relative
  status: PortalStatus;
  coverage: number; // overall coverage 0-100
  dailyAvg: number;
  usesProxy: boolean;
  categoriesSynced: boolean;
}

export const portals: Portal[] = [
  { id: "infojobs", name: "InfoJobs", shortCode: "IJ", color: "#6d5cf5", country: "España", countryFlag: "🇪🇸", region: "España", offers: 15989, lastRun: "hace 8 h", status: "healthy", coverage: 88.2, dailyAvg: 178, usesProxy: true, categoriesSynced: true },
  { id: "computrabajo", name: "Computrabajo", shortCode: "CT", color: "#0fb8a6", country: "México", countryFlag: "🇲🇽", region: "LATAM", offers: 60981, lastRun: "hace 23 h", status: "healthy", coverage: 96.1, dailyAvg: 678, usesProxy: true, categoriesSynced: true },
  { id: "empleate", name: "Empléate (SEPE)", shortCode: "EM", color: "#2f7bf5", country: "España", countryFlag: "🇪🇸", region: "España", offers: 24161, lastRun: "hace 12 h", status: "warning", coverage: 74.3, dailyAvg: 269, usesProxy: false, categoriesSynced: true },
  { id: "magneto", name: "Magneto 365", shortCode: "M3", color: "#0fa968", country: "Colombia", countryFlag: "🇨🇴", region: "LATAM", offers: 15633, lastRun: "hace 8 h", status: "healthy", coverage: 99.4, dailyAvg: 174, usesProxy: true, categoriesSynced: true },
  { id: "jobandtalent", name: "Job&Talent", shortCode: "JT", color: "#e055a0", country: "España", countryFlag: "🇪🇸", region: "España", offers: 4218, lastRun: "hace 6 h", status: "healthy", coverage: 87.2, dailyAvg: 61, usesProxy: true, categoriesSynced: true },
  { id: "manpower", name: "Manpower", shortCode: "MP", color: "#22a8d8", country: "España", countryFlag: "🇪🇸", region: "España", offers: 686, lastRun: "hace 8 h", status: "healthy", coverage: 99.5, dailyAvg: 12, usesProxy: false, categoriesSynced: true },
  { id: "randstad", name: "Randstad", shortCode: "RA", color: "#7bbf3a", country: "España", countryFlag: "🇪🇸", region: "España", offers: 5132, lastRun: "hace 10 h", status: "healthy", coverage: 99.5, dailyAvg: 57, usesProxy: true, categoriesSynced: true },
  { id: "jobsch", name: "Jobs.ch", shortCode: "JC", color: "#e08a00", country: "Suiza", countryFlag: "🇨🇭", region: "Suiza", offers: 8940, lastRun: "hace 5 h", status: "healthy", coverage: 93.8, dailyAvg: 96, usesProxy: true, categoriesSynced: true },
  { id: "jobscout24", name: "JobScout24.ch", shortCode: "J2", color: "#e0434f", country: "Suiza", countryFlag: "🇨🇭", region: "Suiza", offers: 3102, lastRun: "hace 14 h", status: "healthy", coverage: 91.0, dailyAvg: 34, usesProxy: true, categoriesSynced: true },
  { id: "stepstone", name: "StepStone", shortCode: "SS", color: "#6d5cf5", country: "Alemania", countryFlag: "🇩🇪", region: "Alemania", offers: 11250, lastRun: "hace 7 h", status: "healthy", coverage: 90.1, dailyAvg: 121, usesProxy: true, categoriesSynced: true },
  { id: "meteojob", name: "Meteojob", shortCode: "MJ", color: "#0fb8a6", country: "Francia", countryFlag: "🇫🇷", region: "Francia", offers: 7680, lastRun: "hace 9 h", status: "healthy", coverage: 92.4, dailyAvg: 84, usesProxy: true, categoriesSynced: true },
  { id: "francetravail", name: "France Travail", shortCode: "FT", color: "#2f7bf5", country: "Francia", countryFlag: "🇫🇷", region: "Francia", offers: 22140, lastRun: "hace 4 h", status: "healthy", coverage: 98.6, dailyAvg: 245, usesProxy: false, categoriesSynced: true },
  { id: "sapo", name: "SAPO Emprego", shortCode: "SA", color: "#e055a0", country: "Portugal", countryFlag: "🇵🇹", region: "Portugal", offers: 4890, lastRun: "hace 11 h", status: "healthy", coverage: 89.7, dailyAvg: 53, usesProxy: true, categoriesSynced: true },
  { id: "netempregos", name: "Net-Empregos", shortCode: "NE", color: "#22a8d8", country: "Portugal", countryFlag: "🇵🇹", region: "Portugal", offers: 2340, lastRun: "hace 16 h", status: "warning", coverage: 71.5, dailyAvg: 26, usesProxy: true, categoriesSynced: false },
  { id: "trabajando", name: "Trabajando.cl", shortCode: "TR", color: "#7bbf3a", country: "Chile", countryFlag: "🇨🇱", region: "LATAM", offers: 1403, lastRun: "hace 9 h", status: "healthy", coverage: 95.8, dailyAvg: 15, usesProxy: true, categoriesSynced: true },
  { id: "tecoloco", name: "Tecoloco", shortCode: "TE", color: "#0fb8a6", country: "El Salvador", countryFlag: "🇸🇻", region: "LATAM", offers: 3218, lastRun: "hace 6 h", status: "healthy", coverage: 96.0, dailyAvg: 36, usesProxy: true, categoriesSynced: true },
  { id: "hellowork", name: "HelloWork", shortCode: "HW", color: "#e0434f", country: "Francia", countryFlag: "🇫🇷", region: "Francia", offers: 5460, lastRun: "hace 10 días", status: "critical", coverage: 50.0, dailyAvg: 0, usesProxy: true, categoriesSynced: true },
];

// Field coverage per portal (percentage 0-100). Used by the Calidad de datos
// screens (Resumen, portal detail, coverage bars).
export interface FieldCoverage {
  sourceJobId: number;
  description: number;
  location: number;
  company: number;
  publishedAt: number;
  language: number;
  workMode: number;
  salary: number;
  url: number;
}

export const fieldCoverageByPortal: Record<string, FieldCoverage> = {
  infojobs: { sourceJobId: 99.0, description: 94.7, location: 91.6, company: 99.4, publishedAt: 70.5, language: 84.9, workMode: 58.2, salary: 42.1, url: 100 },
  computrabajo: { sourceJobId: 99.8, description: 96.0, location: 100, company: 88.7, publishedAt: 100, language: 91.2, workMode: 61.0, salary: 38.4, url: 100 },
  empleate: { sourceJobId: 100, description: 100, location: 100, company: 27.1, publishedAt: 100, language: 96.5, workMode: 40.3, salary: 22.6, url: 100 },
  magneto: { sourceJobId: 100, description: 100, location: 100, company: 100, publishedAt: 100, language: 88.0, workMode: 55.7, salary: 51.2, url: 100 },
  jobandtalent: { sourceJobId: 100, description: 98.1, location: 96.4, company: 92.0, publishedAt: 94.6, language: 80.1, workMode: 70.5, salary: 33.9, url: 100 },
  manpower: { sourceJobId: 99.6, description: 99.6, location: 99.0, company: 100, publishedAt: 100, language: 90.0, workMode: 62.4, salary: 28.7, url: 100 },
  randstad: { sourceJobId: 99.7, description: 99.7, location: 98.8, company: 100, publishedAt: 99.7, language: 87.3, workMode: 59.1, salary: 30.5, url: 100 },
  jobsch: { sourceJobId: 100, description: 97.2, location: 99.1, company: 95.8, publishedAt: 98.0, language: 99.9, workMode: 66.7, salary: 60.8, url: 100 },
  jobscout24: { sourceJobId: 100, description: 93.4, location: 96.0, company: 90.2, publishedAt: 95.1, language: 99.7, workMode: 54.3, salary: 47.9, url: 100 },
  stepstone: { sourceJobId: 100, description: 92.0, location: 94.5, company: 93.1, publishedAt: 91.0, language: 99.8, workMode: 63.2, salary: 35.0, url: 100 },
  meteojob: { sourceJobId: 100, description: 95.5, location: 92.8, company: 89.4, publishedAt: 93.2, language: 99.6, workMode: 48.6, salary: 26.3, url: 100 },
  francetravail: { sourceJobId: 100, description: 99.1, location: 99.8, company: 98.0, publishedAt: 100, language: 99.9, workMode: 71.0, salary: 65.4, url: 100 },
  sapo: { sourceJobId: 100, description: 94.2, location: 90.6, company: 87.0, publishedAt: 90.1, language: 99.4, workMode: 44.8, salary: 18.9, url: 100 },
  netempregos: { sourceJobId: 98.4, description: 78.0, location: 71.5, company: 62.3, publishedAt: 55.2, language: 99.0, workMode: 30.1, salary: 12.4, url: 100 },
  trabajando: { sourceJobId: 100, description: 100, location: 100, company: 82.8, publishedAt: 100, language: 90.1, workMode: 41.6, salary: 20.3, url: 100 },
  tecoloco: { sourceJobId: 100, description: 96.4, location: 100, company: 91.0, publishedAt: 97.8, language: 90.5, workMode: 33.0, salary: 58.1, url: 100 },
  hellowork: { sourceJobId: 97.0, description: 88.5, location: 83.0, company: 79.2, publishedAt: 0, language: 99.5, workMode: 25.0, salary: 19.0, url: 100 },
};

// ---------------------------------------------------------------------------
// Jobs (scraping runs)
// ---------------------------------------------------------------------------

export type JobStatus = "running" | "completed" | "failed" | "queued" | "warnings";

export interface JobLogLine {
  tag?: string;
  text: string;
  kind?: "ok" | "error" | "muted" | "default";
}

export interface ScrapeJob {
  id: string;
  platform: string;
  country: string;
  countryFlag: string;
  status: JobStatus;
  progress: number; // 0-100
  processed: number;
  total: number;
  inserted: number;
  updated: number;
  unchanged: number;
  proxyProvider: string | null;
  maskedIp: string | null;
  port: number | null;
  exitCountry: string | null;
  region: Region;
  startedAt: string;
  eta: string | null;
  autonomous: boolean;
  logs: JobLogLine[];
}

export const jobs: ScrapeJob[] = [
  {
    id: "job-infojobs-es-1",
    platform: "InfoJobs",
    country: "España",
    countryFlag: "🇪🇸",
    status: "running",
    progress: 62,
    processed: 1240,
    total: 2000,
    inserted: 340,
    updated: 812,
    unchanged: 88,
    proxyProvider: "Webshare",
    maskedIp: "185.23.•••.147",
    port: 8421,
    exitCountry: "ES",
    region: "España",
    startedAt: "hace 18 min",
    eta: "~6 min",
    autonomous: false,
    logs: [
      { tag: "[SCRAPE]", text: "InfoJobs · España · sesión abierta", kind: "muted" },
      { text: "Proxy Webshare · salida España · Proxy Webshare", kind: "muted" },
      { tag: "[PAGE 12/20]", text: "62 ofertas nuevas, 8 duplicadas" },
      { text: "Categorías sincronizadas: 34/34", kind: "ok" },
      { tag: "[PAGE 13/20]", text: "58 ofertas nuevas, 12 duplicadas" },
      { text: "published_at reparado en 4 ofertas", kind: "ok" },
      { tag: "[PAGE 14/20]", text: "procesando…", kind: "muted" },
    ],
  },
  {
    id: "job-computrabajo-mx-1",
    platform: "Computrabajo",
    country: "México",
    countryFlag: "🇲🇽",
    status: "running",
    progress: 34,
    processed: 3400,
    total: 10000,
    inserted: 1180,
    updated: 2050,
    unchanged: 170,
    proxyProvider: "Webshare",
    maskedIp: "191.96.•••.22",
    port: 8354,
    exitCountry: "MX",
    region: "LATAM",
    startedAt: "hace 41 min",
    eta: "~28 min",
    autonomous: true,
    logs: [
      { tag: "[SCRAPE]", text: "Computrabajo · México · sesión abierta", kind: "muted" },
      { text: "Salida México · Proxy Webshare", kind: "muted" },
      { tag: "[PAGE 34/100]", text: "112 ofertas nuevas, 4 duplicadas" },
      { tag: "[PAGE 35/100]", text: "procesando…", kind: "muted" },
    ],
  },
  {
    id: "job-jobsch-ch-1",
    platform: "Jobs.ch",
    country: "Suiza",
    countryFlag: "🇨🇭",
    status: "queued",
    progress: 0,
    processed: 0,
    total: 1500,
    inserted: 0,
    updated: 0,
    unchanged: 0,
    proxyProvider: "Webshare",
    maskedIp: null,
    port: null,
    exitCountry: "CH",
    region: "Suiza",
    startedAt: "en cola",
    eta: null,
    autonomous: false,
    logs: [{ text: "En cola · esperando worker libre", kind: "muted" }],
  },
  {
    id: "job-manpower-es-1",
    platform: "Manpower",
    country: "España",
    countryFlag: "🇪🇸",
    status: "completed",
    progress: 100,
    processed: 686,
    total: 686,
    inserted: 12,
    updated: 660,
    unchanged: 14,
    proxyProvider: null,
    maskedIp: null,
    port: null,
    exitCountry: "ES",
    region: "España",
    startedAt: "hace 8 h",
    eta: null,
    autonomous: true,
    logs: [
      { tag: "[SCRAPE]", text: "Manpower · España · HTTP directo", kind: "muted" },
      { text: "Sin proxy: portal servido por API pública", kind: "muted" },
      { text: "686/686 ofertas procesadas", kind: "ok" },
      { text: "✅ completed · 4 min 12 s", kind: "ok" },
    ],
  },
  {
    id: "job-hellowork-fr-1",
    platform: "HelloWork",
    country: "Francia",
    countryFlag: "🇫🇷",
    status: "warnings",
    progress: 100,
    processed: 5460,
    total: 5460,
    inserted: 0,
    updated: 5460,
    unchanged: 0,
    proxyProvider: "Webshare",
    maskedIp: "51.68.•••.203",
    port: 8112,
    exitCountry: "FR",
    region: "Francia",
    startedAt: "hace 10 días",
    eta: null,
    autonomous: true,
    logs: [
      { tag: "[SCRAPE]", text: "HelloWork · Francia · sesión abierta", kind: "muted" },
      { text: "5460/5460 ofertas procesadas", kind: "ok" },
      { text: "⚠️ published_at: 0% de cobertura — selector roto tras rediseño", kind: "error" },
      { text: "Job marcado con avisos · revisar Calidad de datos", kind: "error" },
    ],
  },
  {
    id: "job-stepstone-de-1",
    platform: "StepStone",
    country: "Alemania",
    countryFlag: "🇩🇪",
    status: "failed",
    progress: 18,
    processed: 210,
    total: 1200,
    inserted: 40,
    updated: 160,
    unchanged: 10,
    proxyProvider: "Webshare",
    maskedIp: "85.214.•••.91",
    port: 8290,
    exitCountry: "DE",
    region: "Alemania",
    startedAt: "hace 2 h",
    eta: null,
    autonomous: false,
    logs: [
      { tag: "[SCRAPE]", text: "StepStone · Alemania · sesión abierta", kind: "muted" },
      { text: "403 recibido tras 210 ofertas — Akamai bloqueó la sesión", kind: "error" },
      { text: "Ejecución detenida · sin reintento automático (política anti-ban)", kind: "error" },
    ],
  },
];

export const jobsSummary = {
  workerActive: true,
  running: jobs.filter((j) => j.status === "running").length,
  queued: jobs.filter((j) => j.status === "queued").length,
  failed24h: 44,
  browsersActive: 3,
  browsersTotal: 3,
  lastRun: "hace 18 min",
};

export interface AutonomousJob {
  id: string;
  name: string;
  frequency: string;
  nextRun: string | null;
  lastRun: string;
  lastStatus: JobStatus;
  retries: string;
  sources: string[];
  enabled: boolean;
  status: "running" | "idle" | "warnings" | "disabled";
}

export const autonomousJobs: AutonomousJob[] = [
  {
    id: "auto-1",
    name: "Scraping Diario España",
    frequency: "Programado (scheduled)",
    nextRun: null,
    lastRun: "27/8, 08:04",
    lastStatus: "completed",
    retries: "0 / 3",
    sources: ["Job&Talent", "InfoJobs", "Talent.com España", "Empléate (SEPE)", "Manpower", "Randstad", "Jobs.ch", "StepStone", "Meteojob"],
    enabled: false,
    status: "disabled",
  },
  {
    id: "auto-2",
    name: "Scraping Diario LATAM",
    frequency: "Cada 6 h",
    nextRun: "27/8, 14:00",
    lastRun: "27/8, 08:00",
    lastStatus: "completed",
    retries: "1 / 3",
    sources: ["Computrabajo", "Magneto 365", "Trabajando.cl", "Tecoloco"],
    enabled: true,
    status: "running",
  },
  {
    id: "auto-3",
    name: "ATS Discovery",
    frequency: "Diario · 07:00",
    nextRun: "28/8, 07:00",
    lastRun: "27/8, 07:00",
    lastStatus: "warnings",
    retries: "2 / 3",
    sources: ["Teamtailor", "Beetween", "Talentclue", "Bizneo", "Viterbit", "Velora HR", "Workday"],
    enabled: true,
    status: "warnings",
  },
];

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export interface ExportRecord {
  id: string;
  name: string;
  note?: string;
  date: string;
  format: "CSV" | "XLSX" | "JSON" | "Google Sheets" | "PDF";
  matches: number;
  duration: string;
  status: "ready" | "expired" | "running" | "failed";
}

export const exportHistory: ExportRecord[] = [
  { id: "exp-1", name: "Ofertas + empresas · Ventas", note: "IA semántica", date: "30/07 17:47", format: "XLSX", matches: 15740, duration: "40 s", status: "expired" },
  { id: "exp-2", name: "Ofertas + empresas · Ventas", note: "IA semántica", date: "30/07 16:43", format: "XLSX", matches: 15740, duration: "38 s", status: "expired" },
  { id: "exp-3", name: "InfoJobs · España · último mes", date: "28/07 09:12", format: "CSV", matches: 4210, duration: "9 s", status: "ready" },
  { id: "exp-4", name: "Empresas con LinkedIn", date: "26/07 11:03", format: "XLSX", matches: 9880, duration: "22 s", status: "ready" },
  { id: "exp-5", name: "ATS Scraper · Bizneo", date: "24/07 08:45", format: "JSON", matches: 331, duration: "4 s", status: "ready" },
  { id: "exp-6", name: "Ofertas Suiza · Q3", date: "20/07 15:30", format: "CSV", matches: 12042, duration: "31 s", status: "failed" },
];

export const exportPresets = [
  "🇪🇸 España +200 emp +3 ofertas",
  "🔗 Empresas con LinkedIn",
  "⏳ Empresas pendientes",
  "📦 Ofertas de empresas grandes",
  "🚫 Ofertas sin LinkedIn",
  "🔍 ATS: todas",
  "🎯 ATS: con careers page",
  "✨ ATS: nuevas",
];

export const exportDatasets = [
  { id: "offers", icon: "📦", title: "Ofertas de empleo", description: "Ofertas guardadas filtradas por plataforma, país y categoría." },
  { id: "companies", icon: "🏢", title: "Empresas", description: "Empresas con datos de enriquecimiento y nº de ofertas." },
  { id: "offers-companies", icon: "🔗", title: "Ofertas + Empresa", description: "Ofertas con los datos de empresa adjuntos en cada fila." },
  { id: "ats", icon: "🔍", title: "ATS Scraper", description: "Empresas detectadas con careers page y plataforma ATS." },
];

// ---------------------------------------------------------------------------
// Data Quality — findings
// ---------------------------------------------------------------------------

export type Severity = "Crítico" | "Alto" | "Medio" | "Info";

export interface Finding {
  id: string;
  severity: Severity;
  portal: string;
  title: string;
  metric: string;
  affectedOffers: number;
  explanation: string;
  repairable: boolean;
}

export const findings: Finding[] = [
  {
    id: "find-1",
    severity: "Crítico",
    portal: "HelloWork",
    title: "HelloWork — baja cobertura de fecha (0%)",
    metric: "Cobertura de published_at",
    affectedOffers: 3200,
    explanation:
      "El selector de fecha cambió tras un rediseño del portal. El campo published_at llega vacío en el 100% de las ofertas capturadas desde el 18/08. El resto de campos (título, descripción, ubicación) no está afectado.",
    repairable: true,
  },
  {
    id: "find-2",
    severity: "Alto",
    portal: "Empléate",
    title: "Empléate — baja cobertura de empresa (27%)",
    metric: "Cobertura de company",
    affectedOffers: 17619,
    explanation:
      "El portal del SEPE no siempre publica el nombre del empleador en la ficha pública. No es un fallo del scraper: el dato no existe en la fuente para buena parte de las ofertas.",
    repairable: false,
  },
  {
    id: "find-3",
    severity: "Medio",
    portal: "OCC",
    title: "OCC — baja cobertura de fecha (34%)",
    metric: "Cobertura de published_at",
    affectedOffers: 239,
    explanation: "El listado de OCC solo expone la fecha de publicación en la vista de detalle, no en el listado; el crawler de listado no siempre visita el detalle.",
    repairable: true,
  },
  {
    id: "find-4",
    severity: "Medio",
    portal: "Net-Empregos",
    title: "Net-Empregos — categorías sin sincronizar",
    metric: "Sincronización de taxonomía",
    affectedOffers: 812,
    explanation:
      "La taxonomía nativa del portal no se sincronizó en la última ejecución (fallo parcial de red). Las categorías existentes se han mantenido intactas; no se han desactivado.",
    repairable: true,
  },
  {
    id: "find-5",
    severity: "Info",
    portal: "Indeed",
    title: "Indeed — 85% de HTML truncado",
    metric: "Integridad de HTML capturado",
    affectedOffers: 23,
    explanation: "Indeed está deshabilitado por robots.txt (sweepsBlocked). Las pocas ofertas capturadas antes de la deshabilitación quedaron con HTML parcial.",
    repairable: false,
  },
];

// ---------------------------------------------------------------------------
// Data Quality — portal detail / census (Job&Talent style)
// ---------------------------------------------------------------------------

export interface CensusRow {
  label: string;
  value: number;
  tone: "neutral" | "success" | "warning" | "danger" | "info";
}

export const jobAndTalentCensus: CensusRow[] = [
  { label: "En el portal ahora", value: 156, tone: "neutral" },
  { label: "Capturadas", value: 136, tone: "success" },
  { label: "Faltantes en Hirint", value: 20, tone: "warning" },
  { label: "Activas en BD", value: 186, tone: "info" },
  { label: "Ya no están en el portal", value: 50, tone: "neutral" },
  { label: "Cobertura", value: 87.2, tone: "success" },
];

export const censusTabs = [
  { id: "match", label: "Coincidencias", count: 136 },
  { id: "missing", label: "Faltantes en Hirint", count: 20 },
  { id: "gone", label: "Ya no está en el portal", count: 50 },
  { id: "new", label: "Nuevas", count: 14 },
  { id: "churned", label: "Bajas", count: 8 },
  { id: "duplicates", label: "Duplicados", count: 0 },
  { id: "no-id", label: "Sin ID", count: 2 },
];

// ---------------------------------------------------------------------------
// ATS Scraper
// ---------------------------------------------------------------------------

export interface AtsProvider {
  name: string;
  count: number;
  pct: number;
  color: string;
}

export const atsProviders: AtsProvider[] = [
  { name: "Teamtailor", count: 139, pct: 38, color: "var(--chart-teal)" },
  { name: "Beetween", count: 73, pct: 20, color: "var(--warning)" },
  { name: "Talentclue", count: 55, pct: 15, color: "var(--success)" },
  { name: "Bizneo", count: 33, pct: 9, color: "var(--info)" },
  { name: "Viterbit", count: 26, pct: 7, color: "var(--primary)" },
  { name: "Velora HR", count: 26, pct: 7, color: "var(--chart-cyan)" },
  { name: "Workday", count: 14, pct: 4, color: "var(--danger)" },
];

export interface AtsResult {
  id: string;
  company: string;
  domain: string;
  provider: string;
  careersUrl: string;
  discoveredAt: string;
  status: "new" | "existing" | "needs-review";
}

export const atsResults: AtsResult[] = [
  { id: "ats-1", company: "Nexora Tech", domain: "nexoratech.com", provider: "Teamtailor", careersUrl: "nexoratech.teamtailor.com", discoveredAt: "hace 2 h", status: "new" },
  { id: "ats-2", company: "Bluewave Consulting", domain: "bluewave.es", provider: "Bizneo", careersUrl: "bluewave.bizneohr.com", discoveredAt: "hace 5 h", status: "existing" },
  { id: "ats-3", company: "Orbital Logistics", domain: "orbitallog.com", provider: "Workday", careersUrl: "orbitallog.wd5.myworkdayjobs.com", discoveredAt: "hace 1 día", status: "needs-review" },
  { id: "ats-4", company: "Solaris Energy Group", domain: "solaris-energy.com", provider: "Talentclue", careersUrl: "solaris-energy.talentclue.com", discoveredAt: "hace 1 día", status: "new" },
  { id: "ats-5", company: "Verdant Foods", domain: "verdantfoods.eu", provider: "Beetween", careersUrl: "verdantfoods.beetween.com", discoveredAt: "hace 2 días", status: "existing" },
];

export const atsDailyTrend = [1, 1, 2, 1, 0, 3, 2, 1, 4, 2, 1, 0, 2, 3, 1, 2, 4, 1, 0, 1, 2, 3, 1, 2, 1, 0, 2, 1, 3, 2];

// ---------------------------------------------------------------------------
// Dashboard — recent offers table
// ---------------------------------------------------------------------------

export interface RecentOffer {
  id: string;
  title: string;
  company: string;
  portal: string;
  portalCode: string;
  portalColor: string;
  country: string;
  countryFlag: string;
  location: string;
  salary: string;
  published: string;
  ingested: string;
  status: "complete" | "review";
}

export const recentOffers: RecentOffer[] = [
  { id: "o1", title: "Líder Especialista en Almacén", company: "Tecoloco", portal: "Tecoloco", portalCode: "TE", portalColor: "#0fb8a6", country: "El Salvador", countryFlag: "🇸🇻", location: "San Salvador", salary: "1k–1,5k $", published: "22/08", ingested: "27/08", status: "complete" },
  { id: "o2", title: "Jefe de Bodega", company: "Tecoloco", portal: "Tecoloco", portalCode: "TE", portalColor: "#0fb8a6", country: "El Salvador", countryFlag: "🇸🇻", location: "San Salvador", salary: "1k–1,2k $", published: "25/08", ingested: "27/08", status: "complete" },
  { id: "o3", title: "Backend Engineer (Node.js)", company: "Nexora Tech", portal: "InfoJobs", portalCode: "IJ", portalColor: "#6d5cf5", country: "España", countryFlag: "🇪🇸", location: "Madrid (híbrido)", salary: "38k–46k €", published: "26/08", ingested: "27/08", status: "complete" },
  { id: "o4", title: "Analista de Datos Senior", company: "Grupo Bimbo", portal: "Computrabajo", portalCode: "CT", portalColor: "#0fb8a6", country: "México", countryFlag: "🇲🇽", location: "CDMX", salary: "$28,000–34,000", published: "26/08", ingested: "27/08", status: "complete" },
  { id: "o5", title: "Ingénieur DevOps", company: "Solaris Energy", portal: "Meteojob", portalCode: "MJ", portalColor: "#0fb8a6", country: "Francia", countryFlag: "🇫🇷", location: "Lyon", salary: "45k–55k €", published: "25/08", ingested: "27/08", status: "review" },
  { id: "o6", title: "Sachbearbeiter Logistik", company: "Rhein Logistik GmbH", portal: "StepStone", portalCode: "SS", portalColor: "#6d5cf5", country: "Alemania", countryFlag: "🇩🇪", location: "Köln", salary: "2.900–3.400 €", published: "24/08", ingested: "27/08", status: "complete" },
  { id: "o7", title: "Recepcionista Bilingüe", company: "Hotel Costa Azul", portal: "Empléate", portalCode: "EM", portalColor: "#2f7bf5", country: "España", countryFlag: "🇪🇸", location: "Málaga", salary: "—", published: "24/08", ingested: "27/08", status: "review" },
];

// ---------------------------------------------------------------------------
// Dashboard KPIs
// ---------------------------------------------------------------------------

export const dashboardKpis = {
  totalScraped: 164192,
  activePortals: portals.length,
  dailyAvg: 1787,
  companiesDetected: 27051,
  countriesCovered: new Set(portals.map((p) => p.country)).size,
  lastOfferTime: "08:54",
  lastOfferDate: "27 ago 2026",
};

export const dataQualityKpis = {
  offersAnalyzed: 61511,
  duplicatePct: 0.0,
  openFindings: findings.length,
  criticalFindings: findings.filter((f) => f.severity === "Crítico").length,
  mediumFindings: findings.filter((f) => f.severity === "Medio").length,
  sourcesWithoutData: 0,
  totalSources: portals.length,
  calculatedAt: "hoy 12:36 · 41 s",
};

// ---------------------------------------------------------------------------
// Data Quality — Control diario (scheduled daily scan per portal)
// ---------------------------------------------------------------------------

export interface DailyControlRow {
  portalId: string;
  scheduledAt: string; // e.g. "07:00 Europe/Madrid"
  lastRunAt: string;
  lastRunStatus: "ok" | "warning" | "error";
  durationMs: number;
  fixedFields: number;
}

export const dailyControl: DailyControlRow[] = portals.map((p, i) => ({
  portalId: p.id,
  scheduledAt: "07:00 Europe/Madrid",
  lastRunAt: i % 4 === 0 ? "hoy 07:00" : "hoy 07:01",
  lastRunStatus: p.status === "critical" ? "error" : p.status === "warning" ? "warning" : "ok",
  durationMs: 4000 + i * 850,
  fixedFields: p.status === "healthy" ? Math.round(Math.random() * 3) : p.status === "warning" ? 6 + i : 0,
}));

// ---------------------------------------------------------------------------
// Data Quality — Datos insertados (last 7 days, per portal totals)
// ---------------------------------------------------------------------------

export const insertedLast7Days = portals.slice(0, 10).map((p, i) => ({
  portalId: p.id,
  inserted: Math.round(p.dailyAvg * (5 + Math.random() * 3)),
  updated: Math.round(p.dailyAvg * (2 + Math.random() * 2)),
}));

// ---------------------------------------------------------------------------
// Data Quality — Anomalías (deterministic threshold alerts, separate from
// the main findings feed — these are volume/pattern anomalies)
// ---------------------------------------------------------------------------

export interface Anomaly {
  id: string;
  portal: string;
  title: string;
  detectedAt: string;
  kind: "volume-drop" | "volume-spike" | "duplicate-spike" | "stale-source";
  severity: Severity;
}

export const anomalies: Anomaly[] = [
  { id: "an-1", portal: "HelloWork", title: "Caída de volumen del 100% respecto a la media de 30 días", detectedAt: "hace 10 días", kind: "stale-source", severity: "Crítico" },
  { id: "an-2", portal: "Net-Empregos", title: "Ingesta un 62% por debajo de la media semanal", detectedAt: "hace 16 h", kind: "volume-drop", severity: "Alto" },
  { id: "an-3", portal: "Computrabajo", title: "Pico de duplicados tras cambio de paginación (recuperado)", detectedAt: "hace 3 días", kind: "duplicate-spike", severity: "Info" },
  { id: "an-4", portal: "StepStone", title: "Sesión bloqueada (403) a mitad de ejecución", detectedAt: "hace 2 h", kind: "stale-source", severity: "Alto" },
];

// ---------------------------------------------------------------------------
// Data Quality — Esquema de datos (data dictionary)
// ---------------------------------------------------------------------------

export interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  description: string;
  globalCoverage: number;
}

export const schemaFields: SchemaField[] = [
  { name: "source_job_id", type: "text", required: true, description: "Identificador nativo de la oferta en el portal de origen.", globalCoverage: 99.5 },
  { name: "title", type: "text", required: true, description: "Título del puesto tal cual lo publica el portal.", globalCoverage: 100 },
  { name: "description", type: "text (html)", required: true, description: "Descripción completa de la oferta.", globalCoverage: 92.4 },
  { name: "company", type: "text", required: false, description: "Nombre del empleador (cuando el portal lo expone).", globalCoverage: 78.9 },
  { name: "location", type: "text", required: false, description: "Ubicación en texto libre, normalizada donde es posible.", globalCoverage: 93.8 },
  { name: "published_at", type: "timestamp", required: false, description: "Fecha de publicación original en el portal.", globalCoverage: 84.6 },
  { name: "language", type: "text (ISO 639-1)", required: false, description: "Idioma detectado del contenido de la oferta.", globalCoverage: 94.1 },
  { name: "work_mode", type: "enum", required: false, description: "Remoto / híbrido / presencial, cuando el portal lo declara.", globalCoverage: 51.3 },
  { name: "salary", type: "text", required: false, description: "Rango salarial en texto libre; el dato suele faltar en la fuente.", globalCoverage: 36.7 },
  { name: "url", type: "text (url)", required: true, description: "URL canónica de la oferta en el portal de origen.", globalCoverage: 100 },
];

// Global coverage bars (Resumen screen)
export const globalCoverage = [
  { field: "Descripción", pct: 92.4, detail: "56.836 de 61.511 · 1 portal por debajo del umbral" },
  { field: "Ubicación", pct: 93.8, detail: "57.698 de 61.511 · 1 portal por debajo del umbral" },
  { field: "Empresa", pct: 78.9, detail: "48.532 de 61.511 · 3 portales por debajo del umbral" },
  { field: "Fecha de publicación", pct: 84.6, detail: "52.038 de 61.511 · 2 portales por debajo del umbral" },
  { field: "Modalidad de trabajo", pct: 51.3, detail: "31.555 de 61.511 · sin umbral crítico definido" },
  { field: "Salario", pct: 36.7, detail: "22.575 de 61.511 · dato ausente en la fuente para muchos portales" },
];

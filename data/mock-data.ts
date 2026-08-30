// ---------------------------------------------------------------------------
// MOCK DATA LAYER — Hirint AI Scraper / Scraping Suite (Enterprise Grade)
// Full deterministic models for Portals, Jobs, Reconciliation, Field Quality,
// Offers, Findings, Repairs, Performance, ATS Discovery, Sentinel, & Exports.
// ---------------------------------------------------------------------------

export type PortalStatus =
  | "healthy"
  | "running"
  | "warning"
  | "partial"
  | "blocked"
  | "failed"
  | "disabled";

export type CatalogueCompleteness =
  | "FULL_CATALOG_VERIFIED"
  | "PARTIAL_CATALOG"
  | "RESULT_CAP"
  | "INCREMENTAL"
  | "BLOCKED"
  | "TOTAL_UNKNOWN"
  | "NOT_VERIFIED";

export type Region = "España" | "LATAM" | "Suiza" | "Francia" | "Alemania" | "Portugal";

export interface Portal {
  id: string;
  name: string;
  shortCode: string;
  color: string;
  country: string;
  countryFlag: string;
  region: Region;
  offers: number; // DB current
  sourceLiveTotal: number; // Declared/verified portal total
  coverage: number; // 0-100
  catalogueStatus: CatalogueCompleteness;
  catalogueNote?: string;
  status: PortalStatus;
  lastRun: string; // e.g. "hace 8 min"
  lastSuccess: string; // e.g. "hoy 07:42"
  throughput: number; // offers/min
  medianThroughput: number; // offers/min median
  avgTimePerOfferMs: number;
  typicalRuntime: string;
  estimatedTimeRemaining?: string;
  usesProxy: boolean;
  proxyProvider: string;
  proxyExitCountry: string;
  proxyMaskedIp: string;
  proxyPort: number;
  categoriesSynced: boolean;
  totalCategories: number;
  activeCategories: number;
  categoriesLastSync: string;
  sourceJobIdHealth: number; // percentage
  fieldQualityScore: number; // percentage
  openFindingsCount: number;
  activeJobId?: string;
  scrapingStrategy: "API_REVERSE" | "HEADLESS_BROWSER" | "PAGINATION_HTML" | "SITEMAP_CENSUS" | "GRAPHQL_CRAWL";
}

export const portals: Portal[] = [
  {
    id: "infojobs",
    name: "InfoJobs",
    shortCode: "IJ",
    color: "#6d5cf5",
    country: "España",
    countryFlag: "🇪🇸",
    region: "España",
    offers: 15989,
    sourceLiveTotal: 18120,
    coverage: 88.2,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Censo completo enumerado vía API de búsqueda con facetas",
    status: "running",
    lastRun: "en curso",
    lastSuccess: "hoy 06:30",
    throughput: 94,
    medianThroughput: 92,
    avgTimePerOfferMs: 638,
    typicalRuntime: "24 min",
    estimatedTimeRemaining: "6 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "ES",
    proxyMaskedIp: "185.23.•••.147",
    proxyPort: 8421,
    categoriesSynced: true,
    totalCategories: 34,
    activeCategories: 34,
    categoriesLastSync: "hoy 06:15",
    sourceJobIdHealth: 99.0,
    fieldQualityScore: 89.4,
    openFindingsCount: 0,
    activeJobId: "job-infojobs-es-1",
    scrapingStrategy: "API_REVERSE",
  },
  {
    id: "computrabajo",
    name: "Computrabajo",
    shortCode: "CT",
    color: "#0fb8a6",
    country: "México",
    countryFlag: "🇲🇽",
    region: "LATAM",
    offers: 60981,
    sourceLiveTotal: 63450,
    coverage: 96.1,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Enumeración multidepartamental completada",
    status: "running",
    lastRun: "en curso",
    lastSuccess: "ayer 22:15",
    throughput: 118,
    medianThroughput: 114,
    avgTimePerOfferMs: 508,
    typicalRuntime: "52 min",
    estimatedTimeRemaining: "28 min",
    usesProxy: true,
    proxyProvider: "Webshare Datacenter",
    proxyExitCountry: "MX",
    proxyMaskedIp: "191.96.•••.22",
    proxyPort: 8354,
    categoriesSynced: true,
    totalCategories: 42,
    activeCategories: 42,
    categoriesLastSync: "hoy 05:00",
    sourceJobIdHealth: 99.8,
    fieldQualityScore: 94.2,
    openFindingsCount: 0,
    activeJobId: "job-computrabajo-mx-1",
    scrapingStrategy: "PAGINATION_HTML",
  },
  {
    id: "jobandtalent",
    name: "Job&Talent",
    shortCode: "JT",
    color: "#e055a0",
    country: "España",
    countryFlag: "🇪🇸",
    region: "España",
    offers: 4218,
    sourceLiveTotal: 156, // Live census benchmark in mock scenario
    coverage: 87.2,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "156 ofertas en portal hoy · 136 coincidencias directas",
    status: "healthy",
    lastRun: "hace 6 h",
    lastSuccess: "hoy 02:15",
    throughput: 61,
    medianThroughput: 64,
    avgTimePerOfferMs: 980,
    typicalRuntime: "14 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "ES",
    proxyMaskedIp: "185.23.•••.190",
    proxyPort: 8421,
    categoriesSynced: true,
    totalCategories: 18,
    activeCategories: 18,
    categoriesLastSync: "ayer 23:00",
    sourceJobIdHealth: 100,
    fieldQualityScore: 92.1,
    openFindingsCount: 0,
    scrapingStrategy: "API_REVERSE",
  },
  {
    id: "meteojob",
    name: "Meteojob",
    shortCode: "MJ",
    color: "#0fb8a6",
    country: "Francia",
    countryFlag: "🇫🇷",
    region: "Francia",
    offers: 127430,
    sourceLiveTotal: 315785,
    coverage: 40.3,
    catalogueStatus: "PARTIAL_CATALOG",
    catalogueNote: "Catálogo masivo en curso de ingestión (~315k anunciadas)",
    status: "healthy",
    lastRun: "hace 9 h",
    lastSuccess: "ayer 19:40",
    throughput: 84,
    medianThroughput: 82,
    avgTimePerOfferMs: 714,
    typicalRuntime: "~37 h (total)",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "FR",
    proxyMaskedIp: "51.68.•••.112",
    proxyPort: 8112,
    categoriesSynced: true,
    totalCategories: 29,
    activeCategories: 29,
    categoriesLastSync: "ayer 18:00",
    sourceJobIdHealth: 100,
    fieldQualityScore: 88.7,
    openFindingsCount: 0,
    scrapingStrategy: "HEADLESS_BROWSER",
  },
  {
    id: "hellowork",
    name: "HelloWork",
    shortCode: "HW",
    color: "#e0434f",
    country: "Francia",
    countryFlag: "🇫🇷",
    region: "Francia",
    offers: 5460,
    sourceLiveTotal: 10920,
    coverage: 50.0,
    catalogueStatus: "RESULT_CAP",
    catalogueNote: "Fallo parser published_at (0%) tras rediseño selector",
    status: "warning",
    lastRun: "hace 10 días",
    lastSuccess: "hace 10 días",
    throughput: 0,
    medianThroughput: 78,
    avgTimePerOfferMs: 769,
    typicalRuntime: "22 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "FR",
    proxyMaskedIp: "51.68.•••.203",
    proxyPort: 8112,
    categoriesSynced: true,
    totalCategories: 26,
    activeCategories: 26,
    categoriesLastSync: "hace 10 días",
    sourceJobIdHealth: 97.0,
    fieldQualityScore: 56.4,
    openFindingsCount: 1,
    scrapingStrategy: "PAGINATION_HTML",
  },
  {
    id: "magneto",
    name: "Magneto 365",
    shortCode: "M3",
    color: "#0fa968",
    country: "Colombia",
    countryFlag: "🇨🇴",
    region: "LATAM",
    offers: 15633,
    sourceLiveTotal: 15720,
    coverage: 99.4,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Censo regular sincronizado con webhook de jobs",
    status: "healthy",
    lastRun: "hace 8 h",
    lastSuccess: "hoy 00:30",
    throughput: 174,
    medianThroughput: 168,
    avgTimePerOfferMs: 344,
    typicalRuntime: "18 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "CO",
    proxyMaskedIp: "186.84.•••.54",
    proxyPort: 8421,
    categoriesSynced: true,
    totalCategories: 38,
    activeCategories: 38,
    categoriesLastSync: "hoy 00:00",
    sourceJobIdHealth: 99.8,
    fieldQualityScore: 98.9,
    openFindingsCount: 0,
    scrapingStrategy: "API_REVERSE",
  },
  {
    id: "empleate",
    name: "Empléate (SEPE)",
    shortCode: "EM",
    color: "#2f7bf5",
    country: "España",
    countryFlag: "🇪🇸",
    region: "España",
    offers: 24161,
    sourceLiveTotal: 32500,
    coverage: 74.3,
    catalogueStatus: "PARTIAL_CATALOG",
    catalogueNote: "SEPE no publica empresa en ~73% de ofertas públicas",
    status: "warning",
    lastRun: "hace 12 h",
    lastSuccess: "ayer 20:00",
    throughput: 88,
    medianThroughput: 90,
    avgTimePerOfferMs: 681,
    typicalRuntime: "45 min",
    usesProxy: false,
    proxyProvider: "Direct IP (Gov Whitelisted)",
    proxyExitCountry: "ES",
    proxyMaskedIp: "Direct Server",
    proxyPort: 443,
    categoriesSynced: true,
    totalCategories: 24,
    activeCategories: 24,
    categoriesLastSync: "ayer 19:30",
    sourceJobIdHealth: 100,
    fieldQualityScore: 71.3,
    openFindingsCount: 1,
    scrapingStrategy: "PAGINATION_HTML",
  },
  {
    id: "stepstone",
    name: "StepStone",
    shortCode: "SS",
    color: "#6d5cf5",
    country: "Alemania",
    countryFlag: "🇩🇪",
    region: "Alemania",
    offers: 11250,
    sourceLiveTotal: 12480,
    coverage: 90.1,
    catalogueStatus: "BLOCKED",
    catalogueNote: "Akamai Bot Manager 403 tras 210 ofertas en última ejecución",
    status: "blocked",
    lastRun: "hace 2 h",
    lastSuccess: "ayer 14:00",
    throughput: 0,
    medianThroughput: 85,
    avgTimePerOfferMs: 705,
    typicalRuntime: "30 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "DE",
    proxyMaskedIp: "85.214.•••.91",
    proxyPort: 8290,
    categoriesSynced: true,
    totalCategories: 31,
    activeCategories: 31,
    categoriesLastSync: "ayer 13:30",
    sourceJobIdHealth: 100,
    fieldQualityScore: 89.2,
    openFindingsCount: 1,
    scrapingStrategy: "HEADLESS_BROWSER",
  },
  {
    id: "randstad",
    name: "Randstad",
    shortCode: "RA",
    color: "#7bbf3a",
    country: "España",
    countryFlag: "🇪🇸",
    region: "España",
    offers: 5132,
    sourceLiveTotal: 5158,
    coverage: 99.5,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Feed estructurado JSON reconciliado diariamente",
    status: "healthy",
    lastRun: "hace 10 h",
    lastSuccess: "ayer 22:00",
    throughput: 71,
    medianThroughput: 74,
    avgTimePerOfferMs: 845,
    typicalRuntime: "15 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "ES",
    proxyMaskedIp: "185.23.•••.88",
    proxyPort: 8421,
    categoriesSynced: true,
    totalCategories: 20,
    activeCategories: 20,
    categoriesLastSync: "ayer 21:30",
    sourceJobIdHealth: 99.7,
    fieldQualityScore: 94.6,
    openFindingsCount: 0,
    scrapingStrategy: "API_REVERSE",
  },
  {
    id: "francetravail",
    name: "France Travail",
    shortCode: "FT",
    color: "#2f7bf5",
    country: "Francia",
    countryFlag: "🇫🇷",
    region: "Francia",
    offers: 22140,
    sourceLiveTotal: 22450,
    coverage: 98.6,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Integración API oficial France Travail v2",
    status: "healthy",
    lastRun: "hace 4 h",
    lastSuccess: "hoy 04:00",
    throughput: 245,
    medianThroughput: 240,
    avgTimePerOfferMs: 244,
    typicalRuntime: "18 min",
    usesProxy: false,
    proxyProvider: "OAuth Partner Direct",
    proxyExitCountry: "FR",
    proxyMaskedIp: "Direct API",
    proxyPort: 443,
    categoriesSynced: true,
    totalCategories: 45,
    activeCategories: 45,
    categoriesLastSync: "hoy 03:45",
    sourceJobIdHealth: 100,
    fieldQualityScore: 97.4,
    openFindingsCount: 0,
    scrapingStrategy: "API_REVERSE",
  },
  {
    id: "manpower",
    name: "Manpower",
    shortCode: "MP",
    color: "#22a8d8",
    country: "España",
    countryFlag: "🇪🇸",
    region: "España",
    offers: 686,
    sourceLiveTotal: 690,
    coverage: 99.5,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Catálogo íntegro descargado en 4m 12s",
    status: "healthy",
    lastRun: "hace 8 h",
    lastSuccess: "hoy 00:15",
    throughput: 163,
    medianThroughput: 160,
    avgTimePerOfferMs: 368,
    typicalRuntime: "4 min",
    usesProxy: false,
    proxyProvider: "Direct API",
    proxyExitCountry: "ES",
    proxyMaskedIp: "Direct API",
    proxyPort: 443,
    categoriesSynced: true,
    totalCategories: 15,
    activeCategories: 15,
    categoriesLastSync: "hoy 00:05",
    sourceJobIdHealth: 99.6,
    fieldQualityScore: 96.8,
    openFindingsCount: 0,
    scrapingStrategy: "API_REVERSE",
  },
  {
    id: "jobsch",
    name: "Jobs.ch",
    shortCode: "JC",
    color: "#e08a00",
    country: "Suiza",
    countryFlag: "🇨🇭",
    region: "Suiza",
    offers: 8940,
    sourceLiveTotal: 9530,
    coverage: 93.8,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Filtro multilingüe DE/FR/IT/EN sincronizado",
    status: "healthy",
    lastRun: "hace 5 h",
    lastSuccess: "hoy 03:00",
    throughput: 96,
    medianThroughput: 98,
    avgTimePerOfferMs: 625,
    typicalRuntime: "22 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "CH",
    proxyMaskedIp: "178.209.•••.61",
    proxyPort: 8350,
    categoriesSynced: true,
    totalCategories: 30,
    activeCategories: 30,
    categoriesLastSync: "hoy 02:45",
    sourceJobIdHealth: 100,
    fieldQualityScore: 96.2,
    openFindingsCount: 0,
    scrapingStrategy: "API_REVERSE",
  },
  {
    id: "jobscout24",
    name: "JobScout24.ch",
    shortCode: "J2",
    color: "#e0434f",
    country: "Suiza",
    countryFlag: "🇨🇭",
    region: "Suiza",
    offers: 3102,
    sourceLiveTotal: 3410,
    coverage: 91.0,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Paginación estructurada sin anomalías",
    status: "healthy",
    lastRun: "hace 14 h",
    lastSuccess: "ayer 18:00",
    throughput: 72,
    medianThroughput: 70,
    avgTimePerOfferMs: 833,
    typicalRuntime: "16 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "CH",
    proxyMaskedIp: "178.209.•••.99",
    proxyPort: 8350,
    categoriesSynced: true,
    totalCategories: 22,
    activeCategories: 22,
    categoriesLastSync: "ayer 17:30",
    sourceJobIdHealth: 100,
    fieldQualityScore: 92.8,
    openFindingsCount: 0,
    scrapingStrategy: "HEADLESS_BROWSER",
  },
  {
    id: "sapo",
    name: "SAPO Emprego",
    shortCode: "SA",
    color: "#e055a0",
    country: "Portugal",
    countryFlag: "🇵🇹",
    region: "Portugal",
    offers: 4890,
    sourceLiveTotal: 5450,
    coverage: 89.7,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Crawler multizona Lisboa/Porto/Norte",
    status: "healthy",
    lastRun: "hace 11 h",
    lastSuccess: "ayer 21:00",
    throughput: 53,
    medianThroughput: 55,
    avgTimePerOfferMs: 1132,
    typicalRuntime: "25 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "PT",
    proxyMaskedIp: "193.136.•••.14",
    proxyPort: 8421,
    categoriesSynced: true,
    totalCategories: 19,
    activeCategories: 19,
    categoriesLastSync: "ayer 20:30",
    sourceJobIdHealth: 100,
    fieldQualityScore: 84.1,
    openFindingsCount: 0,
    scrapingStrategy: "PAGINATION_HTML",
  },
  {
    id: "netempregos",
    name: "Net-Empregos",
    shortCode: "NE",
    color: "#22a8d8",
    country: "Portugal",
    countryFlag: "🇵🇹",
    region: "Portugal",
    offers: 2340,
    sourceLiveTotal: 3270,
    coverage: 71.5,
    catalogueStatus: "PARTIAL_CATALOG",
    catalogueNote: "Fallo parcial sincronización taxonomía en última ejecución",
    status: "warning",
    lastRun: "hace 16 h",
    lastSuccess: "ayer 16:00",
    throughput: 42,
    medianThroughput: 45,
    avgTimePerOfferMs: 1428,
    typicalRuntime: "28 min",
    usesProxy: true,
    proxyProvider: "Webshare Residential",
    proxyExitCountry: "PT",
    proxyMaskedIp: "193.136.•••.88",
    proxyPort: 8421,
    categoriesSynced: false,
    totalCategories: 28,
    activeCategories: 21,
    categoriesLastSync: "hace 3 días",
    sourceJobIdHealth: 98.4,
    fieldQualityScore: 68.3,
    openFindingsCount: 1,
    scrapingStrategy: "PAGINATION_HTML",
  },
  {
    id: "trabajando",
    name: "Trabajando.cl",
    shortCode: "TR",
    color: "#7bbf3a",
    country: "Chile",
    countryFlag: "🇨🇱",
    region: "LATAM",
    offers: 1403,
    sourceLiveTotal: 1465,
    coverage: 95.8,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Paginación rápida API Chile",
    status: "healthy",
    lastRun: "hace 9 h",
    lastSuccess: "ayer 23:00",
    throughput: 80,
    medianThroughput: 82,
    avgTimePerOfferMs: 750,
    typicalRuntime: "10 min",
    usesProxy: true,
    proxyProvider: "Webshare Datacenter",
    proxyExitCountry: "CL",
    proxyMaskedIp: "190.110.•••.41",
    proxyPort: 8354,
    categoriesSynced: true,
    totalCategories: 16,
    activeCategories: 16,
    categoriesLastSync: "ayer 22:30",
    sourceJobIdHealth: 100,
    fieldQualityScore: 91.5,
    openFindingsCount: 0,
    scrapingStrategy: "API_REVERSE",
  },
  {
    id: "tecoloco",
    name: "Tecoloco",
    shortCode: "TE",
    color: "#0fb8a6",
    country: "El Salvador",
    countryFlag: "🇸🇻",
    region: "LATAM",
    offers: 3218,
    sourceLiveTotal: 3350,
    coverage: 96.0,
    catalogueStatus: "FULL_CATALOG_VERIFIED",
    catalogueNote: "Scraper Centroamérica estable",
    status: "healthy",
    lastRun: "hace 6 h",
    lastSuccess: "hoy 02:00",
    throughput: 68,
    medianThroughput: 65,
    avgTimePerOfferMs: 882,
    typicalRuntime: "16 min",
    usesProxy: true,
    proxyProvider: "Webshare Datacenter",
    proxyExitCountry: "SV",
    proxyMaskedIp: "190.86.•••.19",
    proxyPort: 8354,
    categoriesSynced: true,
    totalCategories: 18,
    activeCategories: 18,
    categoriesLastSync: "hoy 01:30",
    sourceJobIdHealth: 100,
    fieldQualityScore: 92.4,
    openFindingsCount: 0,
    scrapingStrategy: "PAGINATION_HTML",
  },
];

// ---------------------------------------------------------------------------
// Native ID Reconciliation / Census Data
// ---------------------------------------------------------------------------

export interface CensusItem {
  sourceJobId: string;
  title: string;
  company: string;
  portal: string;
  sourceUrl: string;
  status:
    | "MATCH"
    | "MISSING_IN_HIRINT"
    | "NO_LONGER_IN_PORTAL"
    | "NEW_CENSUS"
    | "CHURNED_CENSUS"
    | "DUPLICATE"
    | "NO_SOURCE_ID";
  firstSeen: string;
  lastSeen: string;
  location?: string;
  salary?: string;
}

export const censusDataByPortal: Record<string, CensusItem[]> = {
  jobandtalent: [
    { sourceJobId: "JT-ES-88219", title: "Operario de Logística y Carretilla", company: "Amazon Logistics", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/88219", status: "MATCH", firstSeen: "12/08 04:00", lastSeen: "hoy 07:00", location: "San Fernando de Henares", salary: "1.450 €/mes" },
    { sourceJobId: "JT-ES-88220", title: "Mozo de Almacén Turno Noche", company: "DHL Supply Chain", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/88220", status: "MATCH", firstSeen: "14/08 09:30", lastSeen: "hoy 07:00", location: "Getafe", salary: "1.520 €/mes" },
    { sourceJobId: "JT-ES-88301", title: "Preparador de Pedidos E-commerce", company: "Inditex Logística", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/88301", status: "MISSING_IN_HIRINT", firstSeen: "hoy 06:15", lastSeen: "hoy 07:00", location: "Meco", salary: "1.480 €/mes" },
    { sourceJobId: "JT-ES-88302", title: "Conductor Repartidor Furgoneta", company: "Seur Express", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/88302", status: "MISSING_IN_HIRINT", firstSeen: "hoy 06:20", lastSeen: "hoy 07:00", location: "Coslada", salary: "1.400 €/mes" },
    { sourceJobId: "JT-ES-88303", title: "Carretillero Retráctil APQ", company: "Repsol Química", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/88303", status: "MISSING_IN_HIRINT", firstSeen: "hoy 06:22", lastSeen: "hoy 07:00", location: "Tarragona", salary: "1.750 €/mes" },
    { sourceJobId: "JT-ES-87104", title: "Auxiliar Administrativo de Tráfico", company: "Kuehne+Nagel", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/87104", status: "NO_LONGER_IN_PORTAL", firstSeen: "01/08 08:00", lastSeen: "ayer 18:00", location: "Barcelona", salary: "1.600 €/mes" },
    { sourceJobId: "JT-ES-87105", title: "Manipulador Textil Campaña", company: "Mango Logística", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/87105", status: "NO_LONGER_IN_PORTAL", firstSeen: "03/08 10:00", lastSeen: "ayer 18:00", location: "Lliçà d'Amunt", salary: "1.350 €/mes" },
    { sourceJobId: "JT-ES-88410", title: "Técnico de Mantenimiento Industrial", company: "Gestamp", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/88410", status: "NEW_CENSUS", firstSeen: "hoy 07:00", lastSeen: "hoy 07:00", location: "Abrera", salary: "2.100 €/mes" },
    { sourceJobId: "JT-ES-86991", title: "Reponedor Nocturno Gran Superficie", company: "Carrefour", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/86991", status: "CHURNED_CENSUS", firstSeen: "15/07 00:00", lastSeen: "ayer 07:00", location: "Madrid", salary: "1.300 €/mes" },
    { sourceJobId: "JT-ES-UNKNOWN", title: "Mozo Carga Descarga Contenedor", company: "Boluda Lines", portal: "Job&Talent", sourceUrl: "https://jobandtalent.com/es/jobs/no-id", status: "NO_SOURCE_ID", firstSeen: "ayer 12:00", lastSeen: "ayer 12:00", location: "Valencia", salary: "1.420 €/mes" },
  ],
  infojobs: [
    { sourceJobId: "IJ-889102", title: "Tech Lead Frontend (React / TypeScript)", company: "Cabify", portal: "InfoJobs", sourceUrl: "https://infojobs.net/madrid/tech-lead/of-i889102", status: "MATCH", firstSeen: "24/08 10:00", lastSeen: "hoy 07:30", location: "Madrid", salary: "55.000 € - 65.000 €" },
    { sourceJobId: "IJ-889103", title: "Data Engineer Senior (Snowflake / DBT)", company: "Glovo", portal: "InfoJobs", sourceUrl: "https://infojobs.net/barcelona/data-eng/of-i889103", status: "MATCH", firstSeen: "25/08 11:20", lastSeen: "hoy 07:30", location: "Barcelona", salary: "60.000 € - 72.000 €" },
    { sourceJobId: "IJ-889990", title: "Product Manager B2B SaaS", company: "Factorial HR", portal: "InfoJobs", sourceUrl: "https://infojobs.net/barcelona/pm/of-i889990", status: "MISSING_IN_HIRINT", firstSeen: "hoy 07:10", lastSeen: "hoy 07:30", location: "Barcelona", salary: "48.000 € - 56.000 €" },
    { sourceJobId: "IJ-870112", title: "Consultor SAP FI/CO", company: "Accenture", portal: "InfoJobs", sourceUrl: "https://infojobs.net/madrid/sap/of-i870112", status: "NO_LONGER_IN_PORTAL", firstSeen: "10/08 09:00", lastSeen: "ayer 19:00", location: "Madrid", salary: "42.000 € - 50.000 €" },
  ],
};

// ---------------------------------------------------------------------------
// Schema Definition — 24 Real Job Offer Fields with Tiers and Applicability
// ---------------------------------------------------------------------------

export type FieldImportance = "CRITICAL" | "IMPORTANT" | "ENRICHMENT / OPTIONAL";

export type FieldApplicability =
  | "EXPECTED"
  | "OPTIONAL"
  | "SOURCE_NOT_EXPOSED"
  | "NOT_APPLICABLE"
  | "PARSER_GAP"
  | "NOT_VERIFIED";

export interface SchemaFieldDetail {
  id: string;
  name: string;
  group:
    | "Identity"
    | "Core"
    | "Company"
    | "Location"
    | "Taxonomy"
    | "Contract & Work Mode"
    | "Salary"
    | "Dates & Lifecycle"
    | "Language & Skills";
  type: string;
  importance: FieldImportance;
  description: string;
  globalCoverage: number;
  expectedStatus: FieldApplicability;
  affectedPortalsCount: number;
}

export const schemaFieldCatalog: SchemaFieldDetail[] = [
  // Identity
  { id: "source_job_id", name: "source_job_id", group: "Identity", type: "string (native ID)", importance: "CRITICAL", description: "Identificador unívoco nativo emitido por el portal de origen.", globalCoverage: 99.5, expectedStatus: "EXPECTED", affectedPortalsCount: 2 },
  { id: "url", name: "url", group: "Identity", type: "string (url)", importance: "CRITICAL", description: "URL de la oferta en el portal de origen para rastreo y verificación.", globalCoverage: 100.0, expectedStatus: "EXPECTED", affectedPortalsCount: 0 },
  { id: "canonical_url", name: "canonical_url", group: "Identity", type: "string (url)", importance: "IMPORTANT", description: "URL normalizada libre de parámetros de seguimiento y trackers.", globalCoverage: 98.4, expectedStatus: "EXPECTED", affectedPortalsCount: 1 },

  // Core
  { id: "title", name: "title / position", group: "Core", type: "string", importance: "CRITICAL", description: "Título oficial del puesto de trabajo publicado.", globalCoverage: 100.0, expectedStatus: "EXPECTED", affectedPortalsCount: 0 },
  { id: "description", name: "description (HTML/Text)", group: "Core", type: "string (rich text)", importance: "CRITICAL", description: "Cuerpo completo de la oferta con funciones y requisitos.", globalCoverage: 94.7, expectedStatus: "EXPECTED", affectedPortalsCount: 1 },
  { id: "raw_html", name: "raw_html (Snapshot)", group: "Core", type: "string (blob)", importance: "ENRICHMENT / OPTIONAL", description: "Captura HTML original para reanálisis determinista.", globalCoverage: 91.2, expectedStatus: "OPTIONAL", affectedPortalsCount: 0 },

  // Company
  { id: "company_name", name: "company / enterprise", group: "Company", type: "string", importance: "CRITICAL", description: "Nombre de la empresa o consultora empleadora.", globalCoverage: 78.9, expectedStatus: "EXPECTED", affectedPortalsCount: 3 },
  { id: "company_id", name: "company_id (Native)", group: "Company", type: "string", importance: "IMPORTANT", description: "ID interno de la empresa en la plataforma de origen.", globalCoverage: 64.3, expectedStatus: "OPTIONAL", affectedPortalsCount: 4 },
  { id: "company_logo_url", name: "company_logo_url", group: "Company", type: "string (url)", importance: "ENRICHMENT / OPTIONAL", description: "Avatar o logotipo corporativo publicado.", globalCoverage: 48.6, expectedStatus: "OPTIONAL", affectedPortalsCount: 0 },
  { id: "company_linkedin_url", name: "company_linkedin_url", group: "Company", type: "string (url)", importance: "ENRICHMENT / OPTIONAL", description: "Página de LinkedIn detectada tras enriquecimiento.", globalCoverage: 38.2, expectedStatus: "OPTIONAL", affectedPortalsCount: 0 },

  // Location
  { id: "location_raw", name: "location (Raw)", group: "Location", type: "string", importance: "CRITICAL", description: "Texto literal de ubicación extraído del portal.", globalCoverage: 96.8, expectedStatus: "EXPECTED", affectedPortalsCount: 0 },
  { id: "city", name: "city (Normalized)", group: "Location", type: "string", importance: "IMPORTANT", description: "Municipio o ciudad normalizada según nomenclátor.", globalCoverage: 92.1, expectedStatus: "EXPECTED", affectedPortalsCount: 2 },
  { id: "province_region", name: "province / region", group: "Location", type: "string", importance: "IMPORTANT", description: "Provincia, comunidad autónoma o estado federado.", globalCoverage: 91.4, expectedStatus: "EXPECTED", affectedPortalsCount: 2 },
  { id: "country_code", name: "country_code (ISO-2)", group: "Location", type: "string (ISO 3166-1)", importance: "CRITICAL", description: "Código de país normalizado de 2 letras (ES, MX, CH, etc.).", globalCoverage: 100.0, expectedStatus: "EXPECTED", affectedPortalsCount: 0 },

  // Taxonomy
  { id: "category_raw", name: "category (Source Taxonomy)", group: "Taxonomy", type: "string", importance: "IMPORTANT", description: "Categoría tal cual está clasificada en el portal.", globalCoverage: 88.5, expectedStatus: "EXPECTED", affectedPortalsCount: 2 },
  { id: "category_normalized", name: "category_normalized (Hirint)", group: "Taxonomy", type: "string (enum)", importance: "CRITICAL", description: "Mapeo a la taxonomía estándar de 182 categorías de Hirint.", globalCoverage: 95.3, expectedStatus: "EXPECTED", affectedPortalsCount: 1 },

  // Contract & Work Mode
  { id: "contract_type", name: "contract_type", group: "Contract & Work Mode", type: "string (enum)", importance: "IMPORTANT", description: "Indefinido, temporal, prácticas, freelance.", globalCoverage: 71.2, expectedStatus: "OPTIONAL", affectedPortalsCount: 3 },
  { id: "work_mode", name: "work_mode / remote_type", group: "Contract & Work Mode", type: "enum (remoto/híbrido/presencial)", importance: "IMPORTANT", description: "Modalidad laboral declarada o inferida.", globalCoverage: 58.6, expectedStatus: "OPTIONAL", affectedPortalsCount: 0 },

  // Salary
  { id: "salary_raw", name: "salary (Literal string)", group: "Salary", type: "string", importance: "ENRICHMENT / OPTIONAL", description: "Rango salarial en texto libre publicado por la empresa.", globalCoverage: 36.7, expectedStatus: "OPTIONAL", affectedPortalsCount: 0 },
  { id: "salary_min", name: "salary_min", group: "Salary", type: "number (decimal)", importance: "ENRICHMENT / OPTIONAL", description: "Cifra mínima anualizada en moneda local.", globalCoverage: 28.4, expectedStatus: "OPTIONAL", affectedPortalsCount: 0 },
  { id: "salary_max", name: "salary_max", group: "Salary", type: "number (decimal)", importance: "ENRICHMENT / OPTIONAL", description: "Cifra máxima anualizada en moneda local.", globalCoverage: 28.4, expectedStatus: "OPTIONAL", affectedPortalsCount: 0 },
  { id: "salary_currency", name: "salary_currency", group: "Salary", type: "string (ISO 4217)", importance: "ENRICHMENT / OPTIONAL", description: "Moneda de la remuneración (EUR, USD, MXN, CHF).", globalCoverage: 36.7, expectedStatus: "OPTIONAL", affectedPortalsCount: 0 },

  // Dates & Lifecycle
  { id: "published_at", name: "published_at", group: "Dates & Lifecycle", type: "timestamp (ISO-8601)", importance: "CRITICAL", description: "Fecha y hora en que la oferta fue publicada en el portal.", globalCoverage: 84.6, expectedStatus: "EXPECTED", affectedPortalsCount: 2 },
  { id: "expires_at", name: "expires_at", group: "Dates & Lifecycle", type: "timestamp (ISO-8601)", importance: "ENRICHMENT / OPTIONAL", description: "Fecha límite de candidatura si el portal la expone.", globalCoverage: 22.1, expectedStatus: "OPTIONAL", affectedPortalsCount: 0 },
  { id: "last_active_at", name: "last_active_at", group: "Dates & Lifecycle", type: "timestamp (ISO-8601)", importance: "CRITICAL", description: "Último momento en que el scraper verificó la vigencia.", globalCoverage: 100.0, expectedStatus: "EXPECTED", affectedPortalsCount: 0 },

  // Language & Skills
  { id: "language", name: "language", group: "Language & Skills", type: "string (ISO 639-1)", importance: "IMPORTANT", description: "Idioma principal detectado en el texto de la oferta.", globalCoverage: 94.1, expectedStatus: "EXPECTED", affectedPortalsCount: 0 },
  { id: "skills_extracted", name: "skills_extracted (Tags)", group: "Language & Skills", type: "string[]", importance: "ENRICHMENT / OPTIONAL", description: "Habilidades y tecnologías extraídas por el modelo semántico.", globalCoverage: 82.0, expectedStatus: "EXPECTED", affectedPortalsCount: 0 },
];

// Deep coverage matrix per portal (24 fields)
export const fullFieldCoverageByPortal: Record<string, Record<string, number>> = {
  infojobs: {
    source_job_id: 99.0,
    url: 100,
    canonical_url: 99.8,
    title: 100,
    description: 94.7,
    company_name: 99.4,
    location_raw: 98.6,
    published_at: 70.5,
    language: 84.9,
    work_mode: 58.2,
    salary_raw: 42.1,
    category_normalized: 98.0,
    contract_type: 88.0,
    skills_extracted: 86.4,
  },
  computrabajo: {
    source_job_id: 99.8,
    url: 100,
    canonical_url: 100,
    title: 100,
    description: 96.0,
    company_name: 88.7,
    location_raw: 100,
    published_at: 100,
    language: 91.2,
    work_mode: 61.0,
    salary_raw: 38.4,
    category_normalized: 96.5,
    contract_type: 74.0,
    skills_extracted: 80.2,
  },
  empleate: {
    source_job_id: 100,
    url: 100,
    canonical_url: 100,
    title: 100,
    description: 100,
    company_name: 27.1, // SEPE problem
    location_raw: 100,
    published_at: 100,
    language: 96.5,
    work_mode: 40.3,
    salary_raw: 22.6,
    category_normalized: 91.0,
    contract_type: 96.2,
    skills_extracted: 72.0,
  },
  magneto: {
    source_job_id: 100,
    url: 100,
    canonical_url: 100,
    title: 100,
    description: 100,
    company_name: 100,
    location_raw: 100,
    published_at: 100,
    language: 88.0,
    work_mode: 55.7,
    salary_raw: 51.2,
    category_normalized: 99.2,
    contract_type: 82.0,
    skills_extracted: 90.1,
  },
  hellowork: {
    source_job_id: 97.0,
    url: 100,
    canonical_url: 98.2,
    title: 100,
    description: 88.5,
    company_name: 79.2,
    location_raw: 83.0,
    published_at: 0.0, // Parser gap bug!
    language: 99.5,
    work_mode: 25.0,
    salary_raw: 19.0,
    category_normalized: 78.4,
    contract_type: 64.0,
    skills_extracted: 62.0,
  },
  jobandtalent: {
    source_job_id: 100,
    url: 100,
    canonical_url: 100,
    title: 100,
    description: 98.1,
    company_name: 92.0,
    location_raw: 96.4,
    published_at: 94.6,
    language: 80.1,
    work_mode: 70.5,
    salary_raw: 33.9,
    category_normalized: 95.0,
    contract_type: 91.0,
    skills_extracted: 79.0,
  },
  stepstone: {
    source_job_id: 100,
    url: 100,
    canonical_url: 100,
    title: 100,
    description: 92.0,
    company_name: 93.1,
    location_raw: 94.5,
    published_at: 91.0,
    language: 99.8,
    work_mode: 63.2,
    salary_raw: 35.0,
    category_normalized: 94.0,
    contract_type: 85.0,
    skills_extracted: 88.0,
  },
};

// ---------------------------------------------------------------------------
// Findings / Anomalies (Unified Incident Model)
// ---------------------------------------------------------------------------

export type FindingSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "INFO";
export type FindingStatus = "OPEN" | "ACKNOWLEDGED" | "IGNORED" | "RESOLVED";
export type RepairabilityType = "RESCRAPE" | "AUTO" | "MANUAL" | "NOT_REPAIRABLE";

export interface FindingDetail {
  id: string;
  severity: FindingSeverity;
  status: FindingStatus;
  portalId: string;
  portalName: string;
  country: string;
  countryFlag: string;
  title: string;
  problemField: string;
  currentMetricValue: string;
  expectedThreshold: string;
  affectedCount: number;
  firstDetected: string;
  lastConfirmed: string;
  evidence: string;
  explanation: string;
  repairability: RepairabilityType;
  repairabilityReason: string;
  sampleAffectedIds: string[];
}

export const findingsList: FindingDetail[] = [
  {
    id: "find-hellowork-date",
    severity: "CRITICAL",
    status: "OPEN",
    portalId: "hellowork",
    portalName: "HelloWork",
    country: "Francia",
    countryFlag: "🇫🇷",
    title: "HelloWork — Cobertura de fecha de publicación en 0% (Selector roto)",
    problemField: "published_at",
    currentMetricValue: "0.0%",
    expectedThreshold: "≥ 90.0%",
    affectedCount: 3200,
    firstDetected: "18/08 07:12",
    lastConfirmed: "hoy 07:00",
    evidence: "Todas las 3.200 ofertas capturadas desde el 18 de agosto contienen published_at = null debido al cambio de clase CSS en el tag de fecha.",
    explanation: "El portal rediseñó su layout HTML cambiando el elemento `<time datetime='...'>` a un atributo de data-hydration JSON. Las ofertas tienen URL y HTML completo, por lo que pueden reanalizarse directamente.",
    repairability: "RESCRAPE",
    repairabilityReason: "Las URLs canónicas y snapshots existen en BD. Se puede ejecutar reanálisis por lotes con el nuevo parser corregido.",
    sampleAffectedIds: ["HW-FR-99120", "HW-FR-99121", "HW-FR-99122", "HW-FR-99125", "HW-FR-99130"],
  },
  {
    id: "find-stepstone-blocked",
    severity: "CRITICAL",
    status: "OPEN",
    portalId: "stepstone",
    portalName: "StepStone",
    country: "Alemania",
    countryFlag: "🇩🇪",
    title: "StepStone — Bloqueo Akamai Bot Manager (HTTP 403) tras 210 ofertas",
    problemField: "source_access",
    currentMetricValue: "403 Forbidden",
    expectedThreshold: "200 OK",
    affectedCount: 1038,
    firstDetected: "hoy 05:22",
    lastConfirmed: "hoy 07:10",
    evidence: "La IP de salida Webshare (85.214.•••.91) fue identificada por el fingerprint TLS de Akamai. Sesión interrumpida automáticamente.",
    explanation: "El scraper detuvo la ejecución tras el primer 403 para evitar listas negras permanentes de proxy. Requiere rotación a pool residencial dedicado.",
    repairability: "MANUAL",
    repairabilityReason: "Requiere activar rotación de fingerprint TLS en la configuración del proxy Webshare antes de reintentar.",
    sampleAffectedIds: ["SS-DE-4410", "SS-DE-4411", "SS-DE-4412"],
  },
  {
    id: "find-empleate-company",
    severity: "HIGH",
    status: "ACKNOWLEDGED",
    portalId: "empleate",
    portalName: "Empléate (SEPE)",
    country: "España",
    countryFlag: "🇪🇸",
    title: "Empléate — Cobertura de empresa en 27.1% (Limitación de la fuente pública)",
    problemField: "company_name",
    currentMetricValue: "27.1%",
    expectedThreshold: "≥ 75.0%",
    affectedCount: 17619,
    firstDetected: "01/08 00:00",
    lastConfirmed: "hoy 07:00",
    evidence: "17.619 ofertas del Servicio Público de Empleo Estatal no incluyen campo de razón social en el portal público por motivos de privacidad.",
    explanation: "No es un fallo del parser ni un defecto de scraping: el SEPE publica 'Empresa confidencial' o deja el campo vacío en ofertas gestionadas por oficinas de empleo.",
    repairability: "NOT_REPAIRABLE",
    repairabilityReason: "El dato no existe en la fuente pública ni en el código HTML de origen. Enriquecimiento posterior mediante IA semántica posible.",
    sampleAffectedIds: ["EM-ES-7710", "EM-ES-7711", "EM-ES-7712", "EM-ES-7714", "EM-ES-7719"],
  },
  {
    id: "find-netempregos-tax",
    severity: "MEDIUM",
    status: "OPEN",
    portalId: "netempregos",
    portalName: "Net-Empregos",
    country: "Portugal",
    countryFlag: "🇵🇹",
    title: "Net-Empregos — 7 categorías nativas desincronizadas tras timeout",
    problemField: "category_raw",
    currentMetricValue: "21 / 28 sincronizadas",
    expectedThreshold: "28 / 28 sincronizadas",
    affectedCount: 812,
    firstDetected: "ayer 16:00",
    lastConfirmed: "hoy 07:00",
    evidence: "Timeout de red en el endpoint /categorias durante el sync pre-scrape.",
    explanation: "La taxonomía quedó parcialmente cargada. Las categorías ya almacenadas siguen funcionando, pero las 7 nuevas no están indexadas.",
    repairability: "AUTO",
    repairabilityReason: "Se puede lanzar una sincronización forzada de taxonomía directamente desde la consola.",
    sampleAffectedIds: ["NE-PT-3301", "NE-PT-3302", "NE-PT-3303"],
  },
  {
    id: "find-magneto-source-id",
    severity: "MEDIUM",
    status: "OPEN",
    portalId: "magneto",
    portalName: "Magneto 365",
    country: "Colombia",
    countryFlag: "🇨🇴",
    title: "Magneto 365 — 2 ofertas detectadas sin source_job_id nativo",
    problemField: "source_job_id",
    currentMetricValue: "99.8%",
    expectedThreshold: "100.0%",
    affectedCount: 2,
    firstDetected: "ayer 12:40",
    lastConfirmed: "hoy 07:00",
    evidence: "2 registros guardados con UUID sintético temporal debido a payload truncado en el JSON de respuesta.",
    explanation: "La respuesta del webhook llegó cortada en 2 registros. Requiere relectura puntual del endpoint /jobs/{id}.",
    repairability: "RESCRAPE",
    repairabilityReason: "Las URLs canónicas existen; se puede reconsultar el endpoint individual de la oferta.",
    sampleAffectedIds: ["M3-CO-SYNTH-1", "M3-CO-SYNTH-2"],
  },
];

// ---------------------------------------------------------------------------
// Jobs / Worker Execution Monitoring (Real-time & History)
// ---------------------------------------------------------------------------

export type JobExecutionStatus = "RUNNING" | "QUEUED" | "COMPLETED" | "WARNINGS" | "FAILED";

export interface StructuredLogEvent {
  timestamp: string;
  category: "RUN" | "CATEGORY" | "PAGE" | "OFFER" | "IDENTITY" | "CORE" | "WORK" | "SALARY" | "DATES" | "PERSISTENCE" | "SUMMARY" | "ERROR";
  level: "INFO" | "WARN" | "ERROR" | "DEBUG";
  message: string;
  metadata?: Record<string, string | number>;
}

export interface DetailedScrapeJob {
  id: string;
  portalId: string;
  portalName: string;
  country: string;
  countryFlag: string;
  status: JobExecutionStatus;
  progress: number; // 0-100
  startedAt: string;
  elapsedTime: string;
  estimatedRemainingTime: string | null;
  expectedFinishTime: string | null;
  currentPhase: string;
  processed: number;
  totalTarget: number;
  insertedNew: number;
  updatedExisting: number;
  unchanged: number;
  failedOffers: number;
  currentSpeedOffersPerMin: number;
  averageSpeedOffersPerMin: number;
  scrapingStrategy: string;
  proxy: {
    enabled: boolean;
    provider: string;
    requestedCountry: string;
    actualExitCountry: string;
    regionPool: string;
    hostIp: string;
    port: number;
    fallbackUsed: boolean;
    rotationMode: string;
  };
  logs: StructuredLogEvent[];
}

export const activeScrapeJobs: DetailedScrapeJob[] = [
  {
    id: "job-infojobs-es-live",
    portalId: "infojobs",
    portalName: "InfoJobs",
    country: "España",
    countryFlag: "🇪🇸",
    status: "RUNNING",
    progress: 62,
    startedAt: "hoy 07:18",
    elapsedTime: "18 min 42 s",
    estimatedRemainingTime: "~6 min",
    expectedFinishTime: "07:43 (hoy)",
    currentPhase: "Páginas 14/20 · Categoría Tecnología e Informática",
    processed: 1240,
    totalTarget: 2000,
    insertedNew: 340,
    updatedExisting: 812,
    unchanged: 88,
    failedOffers: 0,
    currentSpeedOffersPerMin: 94,
    averageSpeedOffersPerMin: 92,
    scrapingStrategy: "API REST con paginación de tokens",
    proxy: {
      enabled: true,
      provider: "Webshare Residential Network",
      requestedCountry: "ES",
      actualExitCountry: "ES",
      regionPool: "Madrid / Telefónica AS3352",
      hostIp: "185.23.•••.147",
      port: 8421,
      fallbackUsed: false,
      rotationMode: "Sticky Session por categoría (10 min)",
    },
    logs: [
      { timestamp: "07:18:02", category: "RUN", level: "INFO", message: "Iniciando sesión de scraping para InfoJobs España (Modo: Incremental diario)" },
      { timestamp: "07:18:04", category: "RUN", level: "INFO", message: "Egress establecido: Webshare Residential · Pool ES · IP 185.23.•••.147" },
      { timestamp: "07:18:08", category: "CATEGORY", level: "INFO", message: "Verificando taxonomía: 34/34 categorías nativas activas y sincronizadas" },
      { timestamp: "07:22:15", category: "PAGE", level: "INFO", message: "[PAGE 01-05] 310 ofertas recuperadas · Latencia media: 480ms" },
      { timestamp: "07:22:16", category: "IDENTITY", level: "INFO", message: "310 source_job_id validados (100% integridad)" },
      { timestamp: "07:25:40", category: "PAGE", level: "INFO", message: "[PAGE 06-10] 310 ofertas recuperadas · 78 nuevas, 218 actualizadas" },
      { timestamp: "07:31:12", category: "DATES", level: "INFO", message: "published_at normalizado con éxito en 310/310 ofertas" },
      { timestamp: "07:34:50", category: "PAGE", level: "INFO", message: "[PAGE 11-13] 186 ofertas recuperadas · 62 nuevas, 124 actualizadas" },
      { timestamp: "07:36:44", category: "PERSISTENCE", level: "INFO", message: "Batch upsert completado: 340 insertadas, 812 actualizadas, 88 sin cambios" },
      { timestamp: "07:36:45", category: "PAGE", level: "INFO", message: "Procesando página 14/20..." },
    ],
  },
  {
    id: "job-computrabajo-mx-live",
    portalId: "computrabajo",
    portalName: "Computrabajo",
    country: "México",
    countryFlag: "🇲🇽",
    status: "RUNNING",
    progress: 34,
    startedAt: "hoy 06:55",
    elapsedTime: "41 min 10 s",
    estimatedRemainingTime: "~28 min",
    expectedFinishTime: "08:05 (hoy)",
    currentPhase: "Página 34/100 · Departamento CDMX y Estado de México",
    processed: 3400,
    totalTarget: 10000,
    insertedNew: 1180,
    updatedExisting: 2050,
    unchanged: 170,
    failedOffers: 0,
    currentSpeedOffersPerMin: 118,
    averageSpeedOffersPerMin: 114,
    scrapingStrategy: "HTML Parsing con headers rotativos",
    proxy: {
      enabled: true,
      provider: "Webshare Datacenter",
      requestedCountry: "MX",
      actualExitCountry: "MX",
      regionPool: "Querétaro DC-01",
      hostIp: "191.96.•••.22",
      port: 8354,
      fallbackUsed: false,
      rotationMode: "Round-robin por bloque de 25 páginas",
    },
    logs: [
      { timestamp: "06:55:00", category: "RUN", level: "INFO", message: "Iniciando worker autónomo Computrabajo México (Lote 10.000 ofertas)" },
      { timestamp: "06:55:03", category: "RUN", level: "INFO", message: "Proxy conectado: Webshare Datacenter · Salida MX · IP 191.96.•••.22" },
      { timestamp: "07:15:00", category: "PAGE", level: "INFO", message: "[PAGE 01-20] 2.000 ofertas parseadas con éxito" },
      { timestamp: "07:25:30", category: "SALARY", level: "INFO", message: "Rangos salariales detectados en 41.2% de las ofertas de CDMX" },
      { timestamp: "07:35:10", category: "PAGE", level: "INFO", message: "[PAGE 21-34] 1.400 ofertas añadidas al buffer de persistencia" },
      { timestamp: "07:36:10", category: "PERSISTENCE", level: "INFO", message: "Commit a base de datos completado (3.400 procesadas en total)" },
    ],
  },
  {
    id: "job-randstad-es-done",
    portalId: "randstad",
    portalName: "Randstad",
    country: "España",
    countryFlag: "🇪🇸",
    status: "COMPLETED",
    progress: 100,
    startedAt: "ayer 21:45",
    elapsedTime: "14 min 30 s",
    estimatedRemainingTime: null,
    expectedFinishTime: "ayer 21:59",
    currentPhase: "Completado con éxito",
    processed: 4830,
    totalTarget: 4830,
    insertedNew: 123,
    updatedExisting: 2941,
    unchanged: 1701,
    failedOffers: 65,
    currentSpeedOffersPerMin: 71,
    averageSpeedOffersPerMin: 71,
    scrapingStrategy: "API REST JSON Feed",
    proxy: {
      enabled: true,
      provider: "Webshare Residential",
      requestedCountry: "ES",
      actualExitCountry: "ES",
      regionPool: "Barcelona",
      hostIp: "185.23.•••.88",
      port: 8421,
      fallbackUsed: false,
      rotationMode: "Sticky",
    },
    logs: [
      { timestamp: "21:45:00", category: "RUN", level: "INFO", message: "Iniciando descarga de feed estructurado Randstad España" },
      { timestamp: "21:50:20", category: "OFFER", level: "INFO", message: "4.830 registros decodificados" },
      { timestamp: "21:58:10", category: "PERSISTENCE", level: "INFO", message: "123 insertadas, 2.941 actualizadas, 1.701 sin cambios, 65 descartadas por falta de descripción" },
      { timestamp: "21:59:30", category: "SUMMARY", level: "INFO", message: "✅ Ejecución finalizada en 14m 30s a 71 ofertas/min" },
    ],
  },
  {
    id: "job-hellowork-fr-warn",
    portalId: "hellowork",
    portalName: "HelloWork",
    country: "Francia",
    countryFlag: "🇫🇷",
    status: "WARNINGS",
    progress: 100,
    startedAt: "18/08 07:00",
    elapsedTime: "22 min 14 s",
    estimatedRemainingTime: null,
    expectedFinishTime: "18/08 07:22",
    currentPhase: "Finalizado con anomalías de Data Quality",
    processed: 5460,
    totalTarget: 5460,
    insertedNew: 0,
    updatedExisting: 5460,
    unchanged: 0,
    failedOffers: 0,
    currentSpeedOffersPerMin: 78,
    averageSpeedOffersPerMin: 78,
    scrapingStrategy: "PAGINATION_HTML",
    proxy: {
      enabled: true,
      provider: "Webshare Residential",
      requestedCountry: "FR",
      actualExitCountry: "FR",
      regionPool: "Paris DC-02",
      hostIp: "51.68.•••.203",
      port: 8112,
      fallbackUsed: false,
      rotationMode: "Sticky",
    },
    logs: [
      { timestamp: "07:00:00", category: "RUN", level: "INFO", message: "Iniciando HelloWork Francia" },
      { timestamp: "07:15:00", category: "DATES", level: "ERROR", message: "⚠️ published_at: 0% de cobertura — el selector CSS '.date-posted' no coincide con el DOM actual" },
      { timestamp: "07:22:14", category: "SUMMARY", level: "WARN", message: "Job completado pero marcado con AVISOS. Requiere reanálisis de published_at" },
    ],
  },
  {
    id: "job-stepstone-de-failed",
    portalId: "stepstone",
    portalName: "StepStone",
    country: "Alemania",
    countryFlag: "🇩🇪",
    status: "FAILED",
    progress: 18,
    startedAt: "hoy 05:20",
    elapsedTime: "2 min 18 s",
    estimatedRemainingTime: null,
    expectedFinishTime: null,
    currentPhase: "Abortado por bloqueo 403 Akamai",
    processed: 210,
    totalTarget: 1200,
    insertedNew: 40,
    updatedExisting: 160,
    unchanged: 10,
    failedOffers: 990,
    currentSpeedOffersPerMin: 0,
    averageSpeedOffersPerMin: 85,
    scrapingStrategy: "HEADLESS_BROWSER",
    proxy: {
      enabled: true,
      provider: "Webshare Residential",
      requestedCountry: "DE",
      actualExitCountry: "DE",
      regionPool: "Frankfurt",
      hostIp: "85.214.•••.91",
      port: 8290,
      fallbackUsed: true,
      rotationMode: "Sticky",
    },
    logs: [
      { timestamp: "05:20:00", category: "RUN", level: "INFO", message: "Iniciando StepStone Alemania con headless Chromium" },
      { timestamp: "05:22:18", category: "ERROR", level: "ERROR", message: "403 Forbidden recibido tras 210 ofertas. WAF de Akamai activó challenge de bot" },
      { timestamp: "05:22:19", category: "RUN", level: "WARN", message: "Ejecución detenida para preservar pool de IPs. Se generó incidencia en Sentinel" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Offers Catalog / Data Explorer Dataset (Representative Sample)
// ---------------------------------------------------------------------------

export interface JobOfferRecord {
  id: string;
  sourceJobId: string;
  title: string;
  company: string;
  portalId: string;
  portalName: string;
  portalCode: string;
  portalColor: string;
  country: string;
  countryFlag: string;
  location: string;
  salary: string;
  category: string;
  workMode: "Remoto" | "Híbrido" | "Presencial" | "No especificado";
  contractType: "Indefinido" | "Temporal" | "Prácticas" | "Freelance";
  publishedAt: string;
  ingestedAt: string;
  url: string;
  language: string;
  status: "COMPLETE" | "REVIEW" | "DEFECTIVE";
  missingFields: string[];
  descriptionSnippet: string;
}

export const sampleJobOffers: JobOfferRecord[] = [
  {
    id: "off-001",
    sourceJobId: "IJ-981240",
    title: "Senior Full Stack Engineer (Next.js & Node.js)",
    company: "Cabify Tech",
    portalId: "infojobs",
    portalName: "InfoJobs",
    portalCode: "IJ",
    portalColor: "#6d5cf5",
    country: "España",
    countryFlag: "🇪🇸",
    location: "Madrid (Híbrido)",
    salary: "48.000 € - 56.000 €",
    category: "Tecnología e Informática",
    workMode: "Híbrido",
    contractType: "Indefinido",
    publishedAt: "26/08/2026 09:30",
    ingestedAt: "hoy 07:22",
    url: "https://infojobs.net/madrid/senior-full-stack/of-i981240",
    language: "es",
    status: "COMPLETE",
    missingFields: [],
    descriptionSnippet: "Buscamos un Senior Full Stack Engineer para liderar la arquitectura de nuestra plataforma de movilidad y logística urbana...",
  },
  {
    id: "off-002",
    sourceJobId: "CT-MX-88129",
    title: "Analista Senior de Datos e Inteligencia de Negocio",
    company: "Grupo Bimbo Corporativo",
    portalId: "computrabajo",
    portalName: "Computrabajo",
    portalCode: "CT",
    portalColor: "#0fb8a6",
    country: "México",
    countryFlag: "🇲🇽",
    location: "Ciudad de México",
    salary: "$28,000 – $35,000 MXN",
    category: "Finanzas y Analítica",
    workMode: "Presencial",
    contractType: "Indefinido",
    publishedAt: "26/08/2026 14:15",
    ingestedAt: "hoy 07:15",
    url: "https://computrabajo.com.mx/ofertas/analista-datos-88129",
    language: "es",
    status: "COMPLETE",
    missingFields: [],
    descriptionSnippet: "Integración de pipelines ETL, modelado dimensional en Snowflake y diseño de dashboards ejecutivos en Power BI...",
  },
  {
    id: "off-003",
    sourceJobId: "HW-FR-99120",
    title: "Ingénieur Cloud & DevOps (Kubernetes / Terraform)",
    company: "Dassault Systèmes",
    portalId: "hellowork",
    portalName: "HelloWork",
    portalCode: "HW",
    portalColor: "#e0434f",
    country: "Francia",
    countryFlag: "🇫🇷",
    location: "Lyon (Télétravail partiel)",
    salary: "45.000 € - 55.000 €",
    category: "Ingeniería y DevOps",
    workMode: "Híbrido",
    contractType: "Indefinido",
    publishedAt: "— (Ausente en origen)",
    ingestedAt: "18/08 07:10",
    url: "https://hellowork.com/fr-fr/emplois/ingenieur-cloud-99120.html",
    language: "fr",
    status: "REVIEW",
    missingFields: ["published_at"],
    descriptionSnippet: "Conception, déploiement et automatisation des architectures cloud résilientes sur AWS et GCP pour nos applications critiques...",
  },
  {
    id: "off-004",
    sourceJobId: "EM-ES-7710",
    title: "Técnico Especialista en Mantenimiento Electromecánico",
    company: "— (Confidencial / SEPE)",
    portalId: "empleate",
    portalName: "Empléate (SEPE)",
    portalCode: "EM",
    portalColor: "#2f7bf5",
    country: "España",
    countryFlag: "🇪🇸",
    location: "Zaragoza (Polígono Malpica)",
    salary: "24.000 € - 28.000 €",
    category: "Mantenimiento e Instalaciones",
    workMode: "Presencial",
    contractType: "Indefinido",
    publishedAt: "24/08/2026 11:00",
    ingestedAt: "hoy 06:40",
    url: "https://sede.sepe.gob.es/empleate/ofertas/7710",
    language: "es",
    status: "REVIEW",
    missingFields: ["company_name"],
    descriptionSnippet: "Mantenimiento preventivo y correctivo de líneas automáticas de envasado, variadores de frecuencia y autómatas programables...",
  },
  {
    id: "off-005",
    sourceJobId: "JT-ES-88219",
    title: "Operario de Logística y Carretilla Frontal / Retráctil",
    company: "Amazon Logistics Spain",
    portalId: "jobandtalent",
    portalName: "Job&Talent",
    portalCode: "JT",
    portalColor: "#e055a0",
    country: "España",
    countryFlag: "🇪🇸",
    location: "San Fernando de Henares (Madrid)",
    salary: "1.450 €/mes",
    category: "Logística y Almacén",
    workMode: "Presencial",
    contractType: "Temporal",
    publishedAt: "25/08/2026 08:00",
    ingestedAt: "hoy 02:15",
    url: "https://jobandtalent.com/es/jobs/88219",
    language: "es",
    status: "COMPLETE",
    missingFields: [],
    descriptionSnippet: "Recepción de mercancía, escaneado con terminal de radiofrecuencia, ubicación en estanterías y preparación de pedidos para transporte...",
  },
  {
    id: "off-006",
    sourceJobId: "M3-CO-SYNTH-1",
    title: "Desarrollador Backend Python / FastAPI",
    company: "Rappi Colombia",
    portalId: "magneto",
    portalName: "Magneto 365",
    portalCode: "M3",
    portalColor: "#0fa968",
    country: "Colombia",
    countryFlag: "🇨🇴",
    location: "Bogotá (Remoto)",
    salary: "$7,000,000 – $9,500,000 COP",
    category: "Tecnología e Informática",
    workMode: "Remoto",
    contractType: "Indefinido",
    publishedAt: "25/08/2026 16:30",
    ingestedAt: "hoy 00:30",
    url: "https://magneto365.com/co/empleos/desarrollador-python",
    language: "es",
    status: "DEFECTIVE",
    missingFields: ["source_job_id"],
    descriptionSnippet: "Diseño de microservicios de alta concurrencia con FastAPI, Redis caching y mensajería Kafka para pagos en tiempo real...",
  },
  {
    id: "off-007",
    sourceJobId: "JC-CH-55102",
    title: "Senior Product Marketing Manager B2B",
    company: "Logitech Europe S.A.",
    portalId: "jobsch",
    portalName: "Jobs.ch",
    portalCode: "JC",
    portalColor: "#e08a00",
    country: "Suiza",
    countryFlag: "🇨🇭",
    location: "Lausanne / Vaud",
    salary: "125'000 – 140'000 CHF",
    category: "Marketing y Comunicación",
    workMode: "Híbrido",
    contractType: "Indefinido",
    publishedAt: "25/08/2026 10:00",
    ingestedAt: "hoy 03:00",
    url: "https://jobs.ch/en/vacancies/detail/55102",
    language: "en",
    status: "COMPLETE",
    missingFields: [],
    descriptionSnippet: "Drive go-to-market strategies for our enterprise collaboration suite across EMEA with key stakeholder alignment...",
  },
  {
    id: "off-008",
    sourceJobId: "RA-ES-33190",
    title: "Enfermero/a Especialista en Cuidados Intensivos",
    company: "Quirónsalud",
    portalId: "randstad",
    portalName: "Randstad",
    portalCode: "RA",
    portalColor: "#7bbf3a",
    country: "España",
    countryFlag: "🇪🇸",
    location: "Barcelona",
    salary: "32.000 € - 38.000 €",
    category: "Sanidad y Salud",
    workMode: "Presencial",
    contractType: "Indefinido",
    publishedAt: "24/08/2026 12:45",
    ingestedAt: "ayer 22:00",
    url: "https://randstad.es/candidatos/ofertas-empleo/enfermero-uci-33190",
    language: "es",
    status: "COMPLETE",
    missingFields: [],
    descriptionSnippet: "Atención directa al paciente crítico en unidad de cuidados intensivos polivalente, manejo de ventilación mecánica y monitorización hemodinámica...",
  },
];

// ---------------------------------------------------------------------------
// Sentinel Monitoring & External Availability Probes
// ---------------------------------------------------------------------------

export interface SentinelProbe {
  id: string;
  name: string;
  targetDomain: string;
  sourceType: "SEARXNG_PROBE" | "WAF_FINGERPRINT" | "ROBOTS_TXT" | "LATENCY_CANARY" | "SCHEMA_DRIFT";
  status: "HEALTHY" | "INCONCLUSIVE" | "WARNING" | "CRITICAL";
  lastCheckTime: string;
  latencyMs: number;
  evidenceText: string;
  details: string;
}

export const sentinelProbes: SentinelProbe[] = [
  {
    id: "sent-1",
    name: "SearXNG Meta-Search Probe (Careers Discovery)",
    targetDomain: "searxng.internal.hirint",
    sourceType: "SEARXNG_PROBE",
    status: "INCONCLUSIVE",
    lastCheckTime: "hace 4 min",
    latencyMs: 3420,
    evidenceText: "0 resultados devueltos en la última ráfaga de 15 consultas de prueba. Motores upstream rate-limited.",
    details: "Alerta: Si SearXNG devuelve 0 resultados, NO significa que el dataset esté limpio de hallazgos; el resultado es INCONCLUYENTE y la búsqueda está temporalmente no disponible.",
  },
  {
    id: "sent-2",
    name: "Akamai TLS WAF Probe (StepStone DE)",
    targetDomain: "stepstone.de",
    sourceType: "WAF_FINGERPRINT",
    status: "CRITICAL",
    lastCheckTime: "hace 18 min",
    latencyMs: 140,
    evidenceText: "HTTP 403 Forbidden devuelto ante peticiones con fingerprint JA3 estándar.",
    details: "El WAF ha registrado el pool de IPs Webshare en su lista de reputación. Se requiere conmutar a proxies residenciales con rotación dinámica.",
  },
  {
    id: "sent-3",
    name: "InfoJobs API Availability Canary",
    targetDomain: "api.infojobs.net",
    sourceType: "LATENCY_CANARY",
    status: "HEALTHY",
    lastCheckTime: "hace 2 min",
    latencyMs: 38,
    evidenceText: "200 OK en endpoints de autenticación y listado con latencia nominal.",
    details: "Endpoint estable, ratio de error 0.00% en las últimas 24 horas.",
  },
  {
    id: "sent-4",
    name: "SEPE Empléate SSL & Rate Limit Probe",
    targetDomain: "sede.sepe.gob.es",
    sourceType: "LATENCY_CANARY",
    status: "HEALTHY",
    lastCheckTime: "hace 6 min",
    latencyMs: 84,
    evidenceText: "200 OK directo desde IP corporativa autorizada.",
    details: "IP autorizada en lista blanca institucional.",
  },
];

// ---------------------------------------------------------------------------
// ATS Scraper Engine
// ---------------------------------------------------------------------------

export interface AtsProviderStat {
  name: string;
  count: number;
  pct: number;
  color: string;
  status: "ACTIVE" | "WARNING" | "CONFIGURING";
}

export const atsProviderStats: AtsProviderStat[] = [
  { name: "Teamtailor", count: 139, pct: 38, color: "var(--chart-teal)", status: "ACTIVE" },
  { name: "Beetween", count: 73, pct: 20, color: "var(--warning)", status: "ACTIVE" },
  { name: "Talentclue", count: 55, pct: 15, color: "var(--success)", status: "ACTIVE" },
  { name: "Bizneo", count: 33, pct: 9, color: "var(--info)", status: "ACTIVE" },
  { name: "Viterbit", count: 26, pct: 7, color: "var(--primary)", status: "ACTIVE" },
  { name: "Velora HR", count: 26, pct: 7, color: "var(--chart-cyan)", status: "ACTIVE" },
  { name: "Workday", count: 14, pct: 4, color: "var(--danger)", status: "WARNING" },
];

export interface AtsResultRecord {
  id: string;
  company: string;
  domain: string;
  provider: string;
  careersUrl: string;
  discoveredAt: string;
  status: "new" | "existing" | "needs-review";
  jobsCount: number;
}

export const atsResultRecords: AtsResultRecord[] = [
  { id: "ats-1", company: "Nexora Tech", domain: "nexoratech.com", provider: "Teamtailor", careersUrl: "https://nexoratech.teamtailor.com", discoveredAt: "hace 2 h", status: "new", jobsCount: 14 },
  { id: "ats-2", company: "Bluewave Consulting", domain: "bluewave.es", provider: "Bizneo", careersUrl: "https://bluewave.bizneohr.com", discoveredAt: "hace 5 h", status: "existing", jobsCount: 8 },
  { id: "ats-3", company: "Orbital Logistics Europe", domain: "orbitallog.com", provider: "Workday", careersUrl: "https://orbitallog.wd5.myworkdayjobs.com", discoveredAt: "hace 1 día", status: "needs-review", jobsCount: 42 },
  { id: "ats-4", company: "Solaris Energy Group", domain: "solaris-energy.com", provider: "Talentclue", careersUrl: "https://solaris-energy.talentclue.com", discoveredAt: "hace 1 día", status: "new", jobsCount: 6 },
  { id: "ats-5", company: "Verdant Foods International", domain: "verdantfoods.eu", provider: "Beetween", careersUrl: "https://verdantfoods.beetween.com", discoveredAt: "hace 2 días", status: "existing", jobsCount: 19 },
];

export const atsDailyEvolution = [12, 14, 18, 15, 9, 22, 28, 24, 35, 31, 26, 18, 29, 34, 27, 30, 42, 25, 19, 22, 31, 38, 29, 33, 28, 20, 32, 29, 44, 38];

// ---------------------------------------------------------------------------
// Exports System
// ---------------------------------------------------------------------------

export interface ExportJobRecord {
  id: string;
  name: string;
  note?: string;
  date: string;
  format: "CSV" | "XLSX" | "JSON" | "Google Sheets" | "PDF";
  dataset: string;
  matches: number;
  duration: string;
  status: "ready" | "expired" | "running" | "failed";
}

export const exportHistoryList: ExportJobRecord[] = [
  { id: "exp-1", name: "Ofertas España + Tech (Último mes)", note: "Filtro categoría IT", date: "hoy 07:10", format: "CSV", dataset: "Ofertas de empleo", matches: 4210, duration: "8 s", status: "ready" },
  { id: "exp-2", name: "Empresas con LinkedIn enriquecido", note: "IA semántica", date: "ayer 18:40", format: "XLSX", dataset: "Empresas", matches: 9880, duration: "24 s", status: "ready" },
  { id: "exp-3", name: "Reconciliación Job&Talent Censo Completo", note: "Native IDs", date: "ayer 14:15", format: "JSON", dataset: "Ofertas + Empresa", matches: 156, duration: "3 s", status: "ready" },
  { id: "exp-4", name: "Ofertas LATAM Computrabajo + Magneto", note: "Q3 Completo", date: "24/08 11:20", format: "XLSX", dataset: "Ofertas de empleo", matches: 76614, duration: "1 m 42 s", status: "expired" },
  { id: "exp-5", name: "ATS Scraper · Todos los proveedores", note: "Careers URLs", date: "22/08 09:00", format: "CSV", dataset: "ATS Scraper", matches: 366, duration: "5 s", status: "ready" },
];

export const exportPresetPills = [
  "🇪🇸 España +200 emp +3 ofertas",
  "🔗 Empresas con LinkedIn verificado",
  "🎯 Ofertas con Salario Explícito",
  "📦 Full Catalog Snapshot (61.5k)",
  "⚠️ Ofertas con Revisión Pendiente",
  "🔍 ATS Scraper: Nuevos Hallazgos",
];

export const exportDatasetOptions = [
  { id: "offers", icon: "📦", title: "Ofertas de empleo", description: "Catálogo completo de ofertas filtrables por portal, país, modalidad y campos." },
  { id: "companies", icon: "🏢", title: "Empresas", description: "Directorio de empresas con recuento de vacantes, sedes e información enriquecida." },
  { id: "offers-companies", icon: "🔗", title: "Ofertas + Empresa unificado", description: "Dataset tabular con todos los atributos de la vacante y la ficha empresarial combinados." },
  { id: "ats", icon: "🔍", title: "ATS Discovery & Careers", description: "Listado de empresas con proveedor ATS identificado y enlace directo a su careers portal." },
];

// Compatibility Aliases for components
export const sampleCensusItems = censusDataByPortal["jobandtalent"];
export const sentinelProbesList = sentinelProbes;
export interface ExportJobItem {
  id: string;
  fileName: string;
  format: string;
  portalScope: string;
  recordsCount: number;
  fileSizeBytes: string;
  createdAt: string;
}
export const exportJobsList: ExportJobItem[] = [
  { id: "exp-1", fileName: "ofertas_espana_tech_20260830.csv", format: "CSV", portalScope: "InfoJobs, Randstad, Job&Talent", recordsCount: 20207, fileSizeBytes: "8.4 MB", createdAt: "Hoy 07:10" },
  { id: "exp-2", fileName: "empresas_enriquecidas_linkedin.parquet", format: "PARQUET", portalScope: "Todas las fuentes", recordsCount: 9880, fileSizeBytes: "2.1 MB", createdAt: "Ayer 18:40" },
  { id: "exp-3", fileName: "reconciliacion_jobandtalent_full.jsonl", format: "JSONL", portalScope: "Job&Talent España", recordsCount: 156, fileSizeBytes: "142 KB", createdAt: "Ayer 14:15" },
  { id: "exp-4", fileName: "volcado_latam_q3.csv", format: "CSV", portalScope: "Computrabajo, Magneto, Tecoloco", recordsCount: 76614, fileSizeBytes: "32.6 MB", createdAt: "24/08 11:20" },
];
export const globalOverviewStats = {
  activePortalsCount: portals.length,
  healthyPortalsCount: portals.filter((p) => p.status === "healthy").length,
  runningJobsCount: activeScrapeJobs.filter((j) => j.status === "RUNNING").length,
  activeWorkersCount: activeScrapeJobs.filter((j) => j.status === "RUNNING").length,
  currentThroughputPerMin: 1470,
  averageCoveragePct: 88.4,
  criticalIncidentsCount: findingsList.filter((f) => f.severity === "CRITICAL").length,
  avgHttpLatencyMs: 342,
  scrapingSuccessRatePct: 99.2,
  attentionNeededPortalsCount: portals.filter((p) => p.status === "warning" || p.status === "blocked" || p.status === "failed").length,
  blockedPortalsCount: portals.filter((p) => p.status === "blocked").length,
  failedJobs24hCount: 1,

  // Offer Activity Today
  totalOffersInDb: 164192,
  currentActiveCatalogTotal: 164192,
  processedToday: 21840,
  newToday: 3842,
  updatedToday: 14913,
  unchangedToday: 2985,
  failedToday: 100,

  // Performance & Throughput
  globalThroughputOffersPerMin: 1470,
  currentLiveProcessingRate: 212, // Sum of active jobs
  fastestPortalName: "France Travail (245/min)",
  slowestPortalName: "Net-Empregos (42/min)",

  // Data Quality Metrics
  totalAnalyzedRecords: 61511,
  openFindingsCount: findingsList.length,
  criticalFindingsCount: findingsList.filter((f) => f.severity === "CRITICAL").length,
  sourceJobIdHealthAvg: 99.5,
  globalFieldCompleteness: 89.2,
  lastGlobalAuditTime: "hoy 07:30 · 41 s",
};

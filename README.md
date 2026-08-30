# Hirint Scraping Suite — Prototipo visual (UX)

Este proyecto es un **prototipo visual independiente** de la "Scraping Suite" de
Hirint (el módulo `ai-scrapper` de la intranet). Se ha construido para
entregarlo a una herramienta externa, **Builded.io**, como referencia de
diseño e interacción.

**No es la aplicación real.** No tiene backend, no se conecta a ninguna base
de datos ni servicio (PostgreSQL, Azure, Redis, OpenObserve, Webshare,
LinkedIn, etc.), no requiere variables de entorno y todos los datos que se ven
son ficticios, definidos en `data/mock-data.ts`. Toda la interactividad
(pestañas, drawers, barras de progreso, "pruebas de scraping") es estado de
React en el cliente — no hay llamadas de red reales.

## Cómo ejecutarlo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción, sin errores
npm run start    # sirve el build
```

No hace falta ningún `.env`.

## Fidelidad visual: qué está pasando en cada pantalla

El look "Suite" (violeta, tarjetas KPI redondeadas de 16px, Watermelon UI) es
el **diseño final al que la app real está migrando**, documentado en
`design/hirint-suite.html` del repo de la intranet. Hoy, en la app real, ese
diseño solo está terminado en **Dashboard** y **Calidad de datos**; el resto
de pantallas (Scraping, Jobs, Exportaciones, ATS Scraper) siguen usando su
maquetación "Classic" de siempre, con los colores repintados por una capa de
tokens CSS.

Este prototipo reproduce esa misma realidad, a propósito:

- **Dashboard** (`/`) y **Calidad de datos** (`/data-quality`) están
  construidas con los patrones "Suite" completos: tarjetas KPI grandes,
  paneles con `border-radius` de 16px, barras de cobertura, tablas con
  cabecera en mayúsculas sobre `surface-raised`.
- **Scraping** (`/scraping`), **Jobs** (`/jobs`), **Exportaciones**
  (`/exportaciones`) y **ATS Scraper** (`/ats-scraper`) reproducen la
  densidad y estructura de la maquetación "Classic" (tarjetas `rounded-xl`
  más compactas, botones `h-7`/`h-8`, badges tipo píldora pequeños, chips de
  provider con icono degradado) pero pintadas con la misma paleta de tokens
  violeta/semántica. El resultado es intencionalmente un poco menos pulido
  que Dashboard/Calidad de datos — así es como se ve la Suite hoy mismo en
  producción, y es justo lo que conviene mostrarle a Builded.io.

## Rutas

| Ruta | Pantalla | Estilo |
|---|---|---|
| `/` | Dashboard | Suite |
| `/scraping` | Scraping (portales, config, "probar N ofertas") | Classic + tokens Suite |
| `/jobs` | Jobs (activos, completados, autónomos, logs) | Classic + tokens Suite |
| `/exportaciones` | Exportaciones (datasets, presets, historial) | Classic + tokens Suite |
| `/data-quality` | Calidad de datos (7 sub-vistas) | Suite |
| `/ats-scraper` | ATS Scraper (dashboard + configuración) | Classic + tokens Suite |

Sub-vistas de Calidad de datos (pestañas dentro de `/data-quality`): Resumen,
Cobertura de portales, Control diario, Datos insertados, Anomalías, Esquema
de datos, Rendimiento de scraping.

## Datos simulados

Todo vive en `data/mock-data.ts`:

- `portals`: 17 portales ETT ficticios/realistas (España, LATAM, Suiza,
  Francia, Alemania, Portugal) con ofertas, cobertura, estado y proxy.
- `fieldCoverageByPortal`: cobertura por campo (source_job_id, description,
  location, company, published_at, language, work_mode, salary, url) por
  portal — incluye los ejemplos pedidos: InfoJobs (~99%/94,7%/91,6%/99,4%/
  70,5%) y HelloWork (published_at al 0%).
- `jobs` / `autonomousJobs` / `jobsSummary`: runs de scraping (uno en curso al
  62%, con proxy Webshare, IP enmascarada y ETA) y jobs autónomos programados.
- `exportHistory` / `exportDatasets` / `exportPresets`: historial y
  configuración de exportaciones.
- `findings` / `anomalies`: hallazgos deterministas de calidad de datos con
  severidad, portal, explicación y nº de ofertas afectadas — incluye el caso
  HelloWork (0% de `published_at`, ~3.200 ofertas) y el censo de portal
  Job&Talent · España (156 en portal / 136 capturadas / 20 faltantes / 186
  activas en BD / 50 ya no están / 87,2% cobertura).
- `atsProviders` / `atsResults` / `atsDailyTrend`: hallazgos de ATS Scraper.
- `schemaFields`, `dailyControl`, `insertedLast7Days`: para las sub-vistas de
  Esquema, Control diario y Datos insertados.

## Componentes principales (`components/`)

- `AppShell.tsx` / `Sidebar.tsx` — shell de dos columnas; sidebar con marca,
  selector de sección (Ofertas activo, Sentinel deshabilitado — fuera de
  alcance de este prototipo), navegación y pie de perfil.
- `PageHeader.tsx` — cabecera de página con título/subtítulo, acciones y
  botón de tema claro/oscuro. Admite `variant="suite" | "classic"` para la
  tipografía del título.
- `MetricCard.tsx` — tarjeta KPI, en dos variantes (Suite grande / Classic
  compacta).
- `PortalCard.tsx` — tarjeta de portal/plataforma con icono degradado,
  estado y toggle de proxy (pantalla Scraping).
- `JobCard.tsx` / `ProgressCard.tsx` — tarjeta de job con barra de progreso,
  contadores insertadas/actualizadas/sin cambios y datos de proxy.
- `DataTable.tsx` — tabla genérica con las dos variantes de densidad.
- `StatusBadge.tsx` / `SeverityChip` — píldoras de estado y severidad,
  basadas en los tokens semánticos (success/warning/info/danger).
- `TabNav.tsx` / `ChipTabs` — navegación por pestañas (segmentada tipo Suite
  o subrayada tipo Classic) y chips de filtro.
- `DetailDrawer.tsx` — panel lateral genérico (detalle de hallazgo, logs de
  job, detalle de portal, detalle de resultado ATS).
- `CoverageBar.tsx` — barra de cobertura de campo (Suite).
- `MockLogViewer.tsx` — visor de logs estilo terminal con cursor parpadeante.
- `components/dq/*` — las 7 sub-vistas de Calidad de datos.

## Interacciones implementadas

- Cambio de tema claro/oscuro (persistido en `localStorage`, tokens CSS).
- Navegación por pestañas en Jobs, ATS Scraper y las 7 sub-vistas de Calidad
  de datos.
- Selección de portal en Scraping y Calidad de datos → panel/drawer de
  detalle.
- "Probar N ofertas" en Scraping: simula una prueba con `setTimeout` y
  muestra un resultado ficticio de ofertas encontradas.
- "Iniciar scraping": estado de carga simulado.
- Drawers: detalle de hallazgo (con CTA "Reanalizar" simulado), logs de job,
  detalle de portal, detalle de resultado ATS — todos con cierre por click
  fuera o `Esc`.
- Exportaciones: selección de dataset/formato, botones "Descargar" /
  "Reintentar" / "Calcular registros" muestran un toast simulado (no hay
  descarga real).
- Filtros de portal/país en la tabla de "Últimas ofertas" del Dashboard.

## Dependencias de producción excluidas a propósito

Ninguna. Sin PostgreSQL, Azure OpenAI, Redis, OpenObserve, n8n, Chatwoot,
SearXNG, Webshare, LinkedIn, workers de scraping reales ni llamadas a APIs
externas. Las únicas dependencias son `next`, `react`, `react-dom` y
`lucide-react` (iconos), más `tailwindcss`/`typescript` como herramientas de
desarrollo.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Tipografía Manrope (UI)
y JetBrains Mono (valores numéricos/tabulares), cargadas con
`next/font/google`. Componentes hechos a mano siguiendo las convenciones de
shadcn/ui (mismo lenguaje de clases, sin depender del CLI ni de un registro
externo, para que el proyecto sea 100% autocontenido).

## Nota de seguridad de dependencias

`npm audit` señala CVEs conocidos de Next.js 14.2.x (DoS, SSRF y cache
poisoning en despliegues con tráfico real) que solo se resuelven saltando a
Next 16. Como este proyecto es un prototipo de solo lectura para uso local
(`npm run dev`) y no se va a desplegar con tráfico público, se ha mantenido
en la rama 14 por estabilidad. Si en algún momento se despliega en un
entorno accesible, ejecutar `npm audit fix --force` (implica migrar a
Next 16) antes de exponerlo.

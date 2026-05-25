import imgMIT from "@/assets/refs/mit.jpg";
import imgNIST from "@/assets/refs/nist.jpg";
import imgGoogle from "@/assets/refs/google.jpg";
import imgAmazon from "@/assets/refs/amazon.jpg";
import imgCOMPAS from "@/assets/refs/compas.jpg";
import imgAJL from "@/assets/refs/ajl.jpg";
import imgIBM from "@/assets/refs/ibm.jpg";
import imgStanford from "@/assets/refs/stanford.jpg";
import bookOppression from "@/assets/refs/book-oppression.jpg";
import bookRace from "@/assets/refs/book-race.jpg";
import bookWeapons from "@/assets/refs/book-weapons.jpg";
import { CornerTicks } from "./optical/primitives";

/**
 * IncidentLog — registro vertical de falhas reais em visão computacional.
 * Substitui o "blog" / carrossel editorial por um log técnico-documental.
 * Cada item parece um incident report: ID, tipo, grupo afetado, métrica
 * de falha, fonte. Não é decoração — é dossiê.
 */

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "ARCHIVAL";

type Incident = {
  id: string;          // URC-YYYY-####
  date: string;        // ISO short
  type: string;        // event type
  org: string;         // entity
  scope: string;       // affected group / locus
  severity: Severity;
  metric: { value: string; label: string };
  headline: string;
  source: string;
  href: string;
  image: string;
};

const incidents: Incident[] = [
  {
    id: "URC-2018-0001",
    date: "2018.02",
    type: "FACIAL CLASSIFICATION FAILURE",
    org: "MIT Media Lab — Gender Shades",
    scope: "Mulheres · Fitzpatrick V–VI",
    severity: "CRITICAL",
    metric: { value: "34.7%", label: "erro vs. 0.8% em homens claros" },
    headline:
      "Auditoria comercial de três classificadores de gênero (IBM, Microsoft, Face++) revelou disparidade sistemática por fototipo.",
    source: "Buolamwini & Gebru · PMLR 81",
    href: "https://proceedings.mlr.press/v81/buolamwini18a.html",
    image: imgMIT,
  },
  {
    id: "URC-2019-0014",
    date: "2019.12",
    type: "DEMOGRAPHIC BIAS — FRVT",
    org: "NIST — Face Recognition Vendor Test",
    scope: "189 algoritmos · cross-demographic",
    severity: "CRITICAL",
    metric: { value: "10–100×", label: "diferencial de falsos positivos" },
    headline:
      "Padrão federal mediu disparidade de 10 a 100 vezes em falsos positivos entre grupos demográficos.",
    source: "NIST IR 8280 · Part 3",
    href: "https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf",
    image: imgNIST,
  },
  {
    id: "URC-2015-0042",
    date: "2015.06",
    type: "AUTO-TAGGING MISCLASSIFICATION",
    org: "Google Photos",
    scope: "Pessoas negras · produção pública",
    severity: "CRITICAL",
    metric: { value: "8 anos", label: "para restaurar a categoria sem regressão" },
    headline:
      "Sistema rotulou pessoas negras como 'gorilas'. Resposta foi remover a label, não corrigir o modelo. Categoria só voltou em 2023.",
    source: "Wired / The Verge",
    href: "https://www.theverge.com/2018/1/12/16882408/google-racist-gorillas-photo-recognition-algorithm-ai",
    image: imgGoogle,
  },
  {
    id: "URC-2018-0073",
    date: "2018.07",
    type: "FALSE MATCH — LAW ENFORCEMENT",
    org: "Amazon Rekognition · ACLU test",
    scope: "Congresso dos EUA",
    severity: "HIGH",
    metric: { value: "39%", label: "dos falsos matches eram pessoas negras" },
    headline:
      "28 membros do Congresso confundidos com fichas criminais. Pessoas negras representavam 11% do grupo testado, 39% dos erros.",
    source: "ACLU · Face Surveillance Test",
    href: "https://www.aclu.org/news/privacy-technology/amazons-face-recognition-falsely-matched-28",
    image: imgAmazon,
  },
  {
    id: "URC-2016-0091",
    date: "2016.05",
    type: "PREDICTIVE SCORING BIAS",
    org: "COMPAS · ProPublica",
    scope: "Réus negros · tribunais EUA",
    severity: "HIGH",
    metric: { value: "2×", label: "mais chance de falso positivo" },
    headline:
      "Sistema de risco criminal usado por tribunais norte-americanos rotulava réus negros como reincidentes ao dobro da taxa de brancos.",
    source: "Angwin et al. · ProPublica",
    href: "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing",
    image: imgCOMPAS,
  },
  {
    id: "URC-2016-0102",
    date: "2016—",
    type: "CIVIL AUDIT INFRASTRUCTURE",
    org: "Algorithmic Justice League",
    scope: "Vendors biométricos",
    severity: "ARCHIVAL",
    metric: { value: "12+", label: "vendors auditados sob coded gaze" },
    headline:
      "Liga independente fundada por Joy Buolamwini para auditoria pública de sistemas biométricos comerciais.",
    source: "ajl.org · spin-off MIT",
    href: "https://www.ajl.org/",
    image: imgAJL,
  },
  {
    id: "URC-2019-0118",
    date: "2019.01",
    type: "DATASET REMEDIATION ATTEMPT",
    org: "IBM Research — Diversity in Faces",
    scope: "1M faces · 10 esquemas craniofaciais",
    severity: "MEDIUM",
    metric: { value: "1M", label: "imagens anotadas por morfometria" },
    headline:
      "Tentativa de equilibrar datasets de treinamento via anotação morfométrica. Retirado posteriormente por questões de consentimento.",
    source: "Merler et al. · arXiv 1901.10436",
    href: "https://arxiv.org/abs/1901.10436",
    image: imgIBM,
  },
  {
    id: "URC-2024-0210",
    date: "2024.04",
    type: "BENCHMARK COVERAGE GAP",
    org: "Stanford HAI · AI Index 2024",
    scope: "Benchmarks comerciais de visão",
    severity: "HIGH",
    metric: { value: "57%", label: "não reportam paridade demográfica" },
    headline:
      "Mais da metade dos benchmarks visuais auditados em 2024 ainda não publicam métricas de paridade entre grupos demográficos.",
    source: "Stanford HAI",
    href: "https://hai.stanford.edu/ai-index",
    image: imgStanford,
  },
  {
    id: "URC-LIT-0218",
    date: "2018",
    type: "FOUNDATIONAL LITERATURE",
    org: "Safiya Umoja Noble · NYU Press",
    scope: "Algorithms of Oppression",
    severity: "ARCHIVAL",
    metric: { value: "—", label: "leitura fundadora sobre vieses comerciais" },
    headline:
      "Como motores de busca e sistemas de classificação reforçam o racismo estrutural sob a aparência de neutralidade técnica.",
    source: "ISBN 978-1479837243",
    href: "https://nyupress.org/9781479837243/algorithms-of-oppression/",
    image: bookOppression,
  },
  {
    id: "URC-LIT-0219",
    date: "2019",
    type: "FOUNDATIONAL LITERATURE",
    org: "Ruha Benjamin · Polity",
    scope: "Race After Technology",
    severity: "ARCHIVAL",
    metric: { value: "—", label: "framework — The New Jim Code" },
    headline:
      "Discriminação codificada como infraestrutura — a discriminação não é bug, é a arquitetura padrão.",
    source: "ISBN 978-1509526406",
    href: "https://www.ruhabenjamin.com/race-after-technology",
    image: bookRace,
  },
  {
    id: "URC-LIT-0216",
    date: "2016",
    type: "FOUNDATIONAL LITERATURE",
    org: "Cathy O'Neil · Crown",
    scope: "Weapons of Math Destruction",
    severity: "ARCHIVAL",
    metric: { value: "—", label: "auditoria de modelos opacos em escala" },
    headline:
      "Como modelos preditivos opacos amplificam desigualdade quando operam em escala e sem accountability.",
    source: "ISBN 978-0553418811",
    href: "https://weaponsofmathdestructionbook.com/",
    image: bookWeapons,
  },
];

const severityColor = (s: Severity) =>
  s === "CRITICAL"
    ? "var(--signal-hot)"
    : s === "HIGH"
      ? "oklch(0.78 0.16 70)"
      : s === "MEDIUM"
        ? "oklch(0.78 0.10 220)"
        : "oklch(0.62 0.008 70)";

function IncidentRow({ inc, index }: { inc: Incident; index: number }) {
  return (
    <a
      href={inc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block reveal"
      style={{ scrollMarginTop: 120 }}
    >
      <div
        className="relative grid grid-cols-12 gap-0 border-t transition-colors duration-300"
        style={{
          borderColor: "var(--grid-line-strong)",
          background:
            "linear-gradient(180deg, oklch(0.10 0.012 35 / 0.0), oklch(0.10 0.012 35 / 0.4))",
        }}
      >
        {/* index column */}
        <div className="col-span-1 lg:col-span-1 py-8 px-4 lg:px-6 border-r"
             style={{ borderColor: "var(--grid-line)" }}>
          <div className="font-mono text-[10px] tracking-[0.32em] uppercase tabular-nums"
               style={{ color: "var(--ink-dim)" }}>
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* metadata column */}
        <div className="col-span-11 lg:col-span-3 py-8 px-4 lg:px-6 border-r space-y-3"
             style={{ borderColor: "var(--grid-line)" }}>
          <div className="font-mono text-[9.5px] tracking-[0.32em] uppercase"
               style={{ color: "var(--ink-dim)" }}>
            ID · {inc.id}
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2"
              style={{ background: severityColor(inc.severity) }}
            />
            <span
              className="font-mono text-[9.5px] tracking-[0.34em] uppercase"
              style={{ color: severityColor(inc.severity) }}
            >
              {inc.severity}
            </span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.28em] uppercase tabular-nums"
               style={{ color: "var(--ink-dim)" }}>
            {inc.date}
          </div>
        </div>

        {/* report column */}
        <div className="col-span-12 lg:col-span-6 py-8 px-4 lg:px-8 lg:border-r space-y-4"
             style={{ borderColor: "var(--grid-line)" }}>
          <div className="font-mono text-[10px] tracking-[0.32em] uppercase"
               style={{ color: "var(--ink-dim)" }}>
            {inc.type}
          </div>
          <h3 className="font-serif font-light text-[22px] lg:text-[26px] leading-[1.18] tracking-[-0.015em] text-foreground/95 max-w-[52ch]">
            {inc.headline}
          </h3>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase"
                  style={{ color: "var(--ink-dim)" }}>
              ORG · {inc.org}
            </span>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase"
                  style={{ color: "var(--ink-dim)" }}>
              SCOPE · {inc.scope}
            </span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.28em] uppercase pt-1"
               style={{ color: "var(--ink-dim)" }}>
            SOURCE · {inc.source}
            <span className="inline-block ml-2 transition-transform duration-500 group-hover:translate-x-1"
                  style={{ color: "var(--signal-cold)" }}>↗</span>
          </div>
        </div>

        {/* metric column */}
        <div className="col-span-12 lg:col-span-2 py-8 px-4 lg:px-6 flex flex-col justify-between gap-6 relative">
          {/* small thumbnail evidence */}
          <div className="relative aspect-[4/3] w-full overflow-hidden clip-notch-sm"
               style={{ border: "1px solid var(--grid-line-strong)" }}>
            <img
              src={inc.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "grayscale(1) brightness(0.55) contrast(1.1)",
              }}
            />
            <CornerTicks size={8} color="var(--signal-cold)" />
          </div>

          <div className="space-y-1.5">
            <div
              className="font-mono text-[28px] leading-none tracking-[-0.02em] tabular-nums"
              style={{ color: severityColor(inc.severity) }}
            >
              {inc.metric.value}
            </div>
            <div className="font-mono text-[9.5px] tracking-[0.22em] uppercase leading-[1.5]"
                 style={{ color: "var(--ink-dim)" }}>
              {inc.metric.label}
            </div>
          </div>
        </div>

        {/* hover scanline */}
        <span
          className="absolute left-0 right-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "var(--signal-cold)" }}
        />
      </div>
    </a>
  );
}

export function IncidentLog() {
  const critical = incidents.filter((i) => i.severity === "CRITICAL").length;

  return (
    <section
      id="incidentes"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.06 0.008 30), oklch(0.085 0.010 32))",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* section header */}
        <div className="grid grid-cols-12 gap-6 border-b pb-8 mb-0"
             style={{ borderColor: "var(--grid-line-strong)" }}>
          <div className="col-span-12 lg:col-span-6 space-y-5 reveal">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.42em] uppercase"
                    style={{ color: "var(--ink-dim)" }}>
                § 02 / INCIDENT LOG
              </span>
              <span className="h-px flex-1 max-w-[120px]"
                    style={{ background: "var(--grid-line-strong)" }} />
            </div>
            <h2 className="font-serif font-light text-[36px] md:text-[48px] lg:text-[56px] leading-[1.02] tracking-[-0.02em] text-foreground/95 max-w-[20ch]">
              Falhas documentadas que o setor preferiu esquecer.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:pl-12 flex flex-col justify-end reveal">
            <p className="text-[14px] leading-[1.7] text-foreground/55 max-w-[52ch] font-light">
              Registro técnico cronológico de eventos algorítmicos auditados
              publicamente. Cada entrada referencia o paper, relatório ou
              auditoria original. Nenhum dado fabricado.
            </p>
            <div className="mt-6 flex items-center gap-6 font-mono text-[9.5px] tracking-[0.32em] uppercase"
                 style={{ color: "var(--ink-dim)" }}>
              <span>ENTRIES · {String(incidents.length).padStart(2, "0")}</span>
              <span style={{ color: "var(--signal-hot)" }}>
                CRITICAL · {String(critical).padStart(2, "0")}
              </span>
              <span>WINDOW · 2015—2024</span>
            </div>
          </div>
        </div>

        {/* incident rows */}
        <div>
          {incidents.map((inc, i) => (
            <IncidentRow key={inc.id} inc={inc} index={i} />
          ))}
          {/* final closing border */}
          <div className="border-t" style={{ borderColor: "var(--grid-line-strong)" }} />
        </div>

        {/* footer note */}
        <div className="mt-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.32em] uppercase"
             style={{ color: "var(--ink-dim)" }}>
          <span>END OF LOG · § 02</span>
          <span>URUCUM-OPTICS · ARCHIVE v1</span>
        </div>
      </div>
    </section>
  );
}

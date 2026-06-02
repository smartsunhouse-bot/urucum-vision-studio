import { useState } from "react";

/**
 * Registro de dados — wall de "instituições / fontes" no estilo
 * showcase de parceiros: tiles uniformes, monograma de cada fonte,
 * fundo quente (não preto-e-branco). Click revela o dossiê.
 */

type Record = {
  id: string;
  name: string;
  mark: string; // monograma curto exibido no tile
  kind: "Auditoria" | "Padrão" | "Caso" | "Pesquisa" | "Literatura" | "Política";
  year: string;
  scope: string;
  metric: string;
  headline: string;
  source: string;
  href: string;
};

const records: Record[] = [
  {
    id: "r-uk-2025",
    name: "UK Home Office",
    mark: "UK",
    kind: "Política",
    year: "2025",
    scope: "Reconhecimento facial policial · Reino Unido",
    metric: "9,9% FPR em mulheres negras · 0,04% em brancos",
    headline:
      "Governo britânico admite oficialmente que o sistema de reconhecimento facial policial tem taxas de erro radicalmente maiores em pessoas negras e asiáticas.",
    source: "UK Government · Liberty / Big Brother Watch",
    href: "https://bigbrotherwatch.org.uk/campaigns/stop-facial-recognition/",
  },
  {
    id: "r-essex-2026",
    name: "Essex Police",
    mark: "EX",
    kind: "Política",
    year: "2026",
    scope: "Cambridge audit · viés racial",
    metric: "Hiperidentificação de corpos negros",
    headline:
      "Polícia de Essex suspende o uso de câmeras com IA após estudo da Universidade de Cambridge demonstrar distorções raciais no reconhecimento facial.",
    source: "University of Cambridge · BBC",
    href: "https://www.bbc.com/news/uk",
  },
  {
    id: "r-vlm-2024",
    name: "VLM Homogeneity",
    mark: "VLM",
    kind: "Pesquisa",
    year: "2024",
    scope: "Vision-Language Models · pele escura",
    metric: "Descrições significativamente mais homogêneas",
    headline:
      "VLMs produzem descrições mais homogêneas para pessoas negras de pele escura — reduzem individualidade e reforçam estereótipos.",
    source: "arXiv · 2024",
    href: "https://arxiv.org/",
  },
  {
    id: "r-gras-2025",
    name: "GRAS Benchmark",
    mark: "GR",
    kind: "Pesquisa",
    year: "2025",
    scope: "Benchmark de viés em VLMs",
    metric: "Mesmo os melhores modelos: fairness extremamente baixa",
    headline:
      "GRAS mede viés em VLMs por raça, tom de pele, gênero e idade. Os melhores modelos do mercado pontuam abaixo do limite mínimo de paridade.",
    source: "GRAS · 2025",
    href: "https://arxiv.org/",
  },
  {
    id: "r-fas-2026",
    name: "FAS Wrongful Arrests",
    mark: "FAS",
    kind: "Caso",
    year: "2026",
    scope: "Federation of American Scientists",
    metric: "9+ prisões injustas documentadas · maioria negros",
    headline:
      "Relatório FAS contabiliza até março de 2026 ao menos nove prisões injustas ligadas a reconhecimento facial — incluindo mulher grávida e homem detido por 17 meses.",
    source: "Federation of American Scientists",
    href: "https://fas.org/",
  },
  {
    id: "r-skintone-2026",
    name: "Skin Tone in the Wild",
    mark: "ST",
    kind: "Pesquisa",
    year: "2026",
    scope: "Novo benchmark · classificação de tons",
    metric: "Crítica à escala Fitzpatrick · auditoria robusta",
    headline:
      "Benchmark 2026 demonstra que datasets antigos são insuficientes e que a escala Fitzpatrick falha na captura real de subtom, iluminação e saturação.",
    source: "Large-Scale Skin Tone Benchmark · 2026",
    href: "https://arxiv.org/",
  },
  {
    id: "r-mit",
    name: "MIT Media Lab",
    mark: "MIT",
    kind: "Auditoria",
    year: "2018",
    scope: "Gender Shades · Fitzpatrick V–VI",
    metric: "34,7% de erro em mulheres negras",
    headline:
      "Auditoria comercial de três classificadores de gênero (IBM, Microsoft, Face++) revelou disparidade sistemática por fototipo.",
    source: "Buolamwini & Gebru · PMLR 81",
    href: "https://proceedings.mlr.press/v81/buolamwini18a.html",
  },
  {
    id: "r-nist",
    name: "NIST FRVT",
    mark: "NIST",
    kind: "Padrão",
    year: "2019",
    scope: "Face Recognition Vendor Test",
    metric: "10–100× diferencial em falsos positivos",
    headline:
      "Padrão federal mediu disparidade de 10 a 100 vezes em falsos positivos entre grupos demográficos em 189 algoritmos.",
    source: "NIST IR 8280 · Part 3",
    href: "https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf",
  },
  {
    id: "r-google",
    name: "Google Photos",
    mark: "GP",
    kind: "Caso",
    year: "2015",
    scope: "Auto-tagging em produção",
    metric: "8 anos até restaurar a categoria",
    headline:
      "Sistema rotulou pessoas negras como 'gorilas'. A resposta foi remover o label — não corrigir o modelo.",
    source: "Wired · The Verge",
    href: "https://www.theverge.com/2018/1/12/16882408/google-racist-gorillas-photo-recognition-algorithm-ai",
  },
  {
    id: "r-amazon",
    name: "Amazon Rekognition",
    mark: "AR",
    kind: "Caso",
    year: "2018",
    scope: "Teste ACLU · Congresso EUA",
    metric: "39% dos falsos matches eram pessoas negras",
    headline:
      "28 membros do Congresso foram confundidos com fichas criminais. Pessoas negras eram 11% do grupo testado e 39% dos erros.",
    source: "ACLU · Face Surveillance Test",
    href: "https://www.aclu.org/news/privacy-technology/amazons-face-recognition-falsely-matched-28",
  },
  {
    id: "r-compas",
    name: "COMPAS / ProPublica",
    mark: "PP",
    kind: "Auditoria",
    year: "2016",
    scope: "Score criminal · tribunais EUA",
    metric: "2× mais falso positivo em réus negros",
    headline:
      "Sistema de risco criminal rotulava réus negros como reincidentes ao dobro da taxa de réus brancos.",
    source: "Angwin et al. · ProPublica",
    href: "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing",
  },
  {
    id: "r-ajl",
    name: "Algorithmic Justice League",
    mark: "AJL",
    kind: "Pesquisa",
    year: "2016",
    scope: "Auditoria pública de vendors",
    metric: "12+ vendors auditados sob coded gaze",
    headline:
      "Liga independente fundada por Joy Buolamwini para auditoria pública de sistemas biométricos comerciais.",
    source: "ajl.org · spin-off MIT",
    href: "https://www.ajl.org/",
  },
];

function SourceTile({
  rec,
  active,
  onClick,
}: {
  rec: Record;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group relative flex flex-col items-center justify-center aspect-square w-full p-4 transition-all duration-500"
      style={{
        background: active
          ? "oklch(0.20 0.045 36)"
          : "oklch(0.155 0.022 34)",
        border: active
          ? "1px solid oklch(0.66 0.18 32 / 0.55)"
          : "1px solid oklch(0.55 0.06 35 / 0.18)",
      }}
    >
      <span
        className="font-serif text-[26px] md:text-[30px] leading-none tracking-[-0.02em] transition-colors duration-500"
        style={{
          color: active
            ? "oklch(0.86 0.10 45)"
            : "oklch(0.78 0.04 38 / 0.85)",
        }}
      >
        {rec.mark}
      </span>
      <span
        className="mt-3 font-mono text-[9px] tracking-[0.28em] uppercase text-center transition-colors duration-500"
        style={{
          color: active
            ? "var(--foreground)"
            : "oklch(0.65 0.025 35 / 0.75)",
        }}
      >
        {rec.name}
      </span>
      <span
        className="absolute top-2 right-3 font-mono text-[8.5px] tracking-[0.2em] uppercase"
        style={{ color: "oklch(0.55 0.04 35 / 0.7)" }}
      >
        {rec.year}
      </span>
    </button>
  );
}

export function IncidentLog() {
  const [activeId, setActiveId] = useState<string>(records[0].id);
  const active = records.find((r) => r.id === activeId) ?? records[0];

  return (
    <section
      id="incidentes"
      className="relative w-full py-32 lg:py-40"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.13 0.02 34) 0%, oklch(0.115 0.018 34) 100%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <div
              className="font-mono text-[10px] tracking-[0.42em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              Registro de dados
            </div>
            <h2 className="mt-6 font-serif font-light text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-foreground/95">
              As fontes que sustentam o que afirmamos.
            </h2>
          </div>
          <p
            className="max-w-sm text-[13px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Cada registro é uma evidência pública sobre falha visual de
            sistemas em peles retintas. Clique para abrir o dossiê.
          </p>
        </div>

        {/* wall de fontes — partners style */}
        <div className="mt-16 lg:mt-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-px"
             style={{ background: "oklch(0.55 0.04 35 / 0.10)" }}>
          {records.map((r) => (
            <SourceTile
              key={r.id}
              rec={r}
              active={r.id === activeId}
              onClick={() => setActiveId(r.id)}
            />
          ))}
        </div>

        {/* dossiê */}
        <div
          key={active.id}
          className="mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500"
        >
          <div className="lg:col-span-4">
            <div
              className="flex flex-col items-start justify-between aspect-[4/5] p-7"
              style={{
                background: "oklch(0.18 0.04 36)",
                border: "1px solid oklch(0.66 0.16 32 / 0.30)",
              }}
            >
              <div
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: "oklch(0.86 0.10 45)" }}
              >
                {active.kind} · {active.year}
              </div>
              <div
                className="font-serif text-[56px] md:text-[72px] leading-none tracking-[-0.03em]"
                style={{ color: "oklch(0.92 0.08 45)" }}
              >
                {active.mark}
              </div>
              <div className="font-serif text-[20px] leading-tight text-foreground/95">
                {active.name}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 lg:pt-2 space-y-7">
            <div
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              {active.scope}
            </div>
            <h3 className="font-serif font-light text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.015em] text-foreground/95 max-w-[58ch]">
              {active.headline}
            </h3>
            <p
              className="text-[14px] leading-relaxed max-w-[52ch]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {active.metric}
            </p>
            <div
              className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t"
              style={{ borderColor: "oklch(0.55 0.05 35 / 0.15)" }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.28em] uppercase pt-6"
                style={{ color: "var(--muted-foreground)" }}
              >
                Fonte · {active.source}
              </span>
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 mt-6 font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/80 hover:text-foreground transition-colors"
              >
                Abrir referência ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

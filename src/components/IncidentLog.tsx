import { useState } from "react";

/**
 * Registro de dados — formato "wall de fontes" inspirado em vitrines
 * de estudos de caso: uma faixa horizontal com os nomes das instituições
 * e, abaixo, um painel compacto com o caso em destaque.
 */

type Record = {
  id: string;
  logo: string;       // URL para SVG/PNG da marca
  name: string;        // nome (acessibilidade + fallback)
  kind: string;        // ex.: "Auditoria", "Pesquisa"
  year: string;
  scope: string;
  headline: string;
  summary: string;
  stat: { label: string; a: { name: string; value: number }; b: { name: string; value: number } };
  source: string;
  href: string;
};

const records: Record[] = [
  {
    id: "mit",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
    name: "MIT Media Lab",
    kind: "Auditoria",
    year: "2018",
    scope: "Gender Shades · Fitzpatrick V–VI",
    headline: "Disparidade sistemática em classificadores comerciais de gênero.",
    summary:
      "Buolamwini & Gebru auditaram três sistemas comerciais (IBM, Microsoft, Face++) e expuseram a falha em mulheres de pele retinta — o estudo que abriu o campo de auditoria pública de IA.",
    stat: {
      label: "Taxa de erro · classificação de gênero",
      a: { name: "Mulheres negras", value: 34.7 },
      b: { name: "Homens brancos", value: 0.8 },
    },
    source: "Buolamwini & Gebru · PMLR 81",
    href: "https://proceedings.mlr.press/v81/buolamwini18a.html",
  },
  {
    id: "nist",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/NIST_logo.svg",
    name: "NIST",
    kind: "Padrão federal",
    year: "2019",
    scope: "Face Recognition Vendor Test · IR 8280",
    headline: "189 algoritmos. Disparidade de 10 a 100 vezes em falsos positivos.",
    summary:
      "O padrão federal norte-americano confirmou, em escala massiva, que sistemas comerciais erram muito mais em rostos negros, asiáticos e indígenas do que em rostos brancos.",
    stat: {
      label: "Diferencial de falsos positivos",
      a: { name: "Pessoas negras / asiáticas", value: 100 },
      b: { name: "Pessoas brancas", value: 1 },
    },
    source: "NIST IR 8280 · Part 3",
    href: "https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf",
  },
  {
    id: "amazon",
    logo: "https://cdn.simpleicons.org/amazon/EEEEEE",
    name: "Amazon Rekognition",
    kind: "Caso",
    year: "2018",
    scope: "Teste ACLU · Congresso dos EUA",
    headline: "28 membros do Congresso confundidos com fichas criminais.",
    summary:
      "Pessoas negras eram 20% do grupo testado pela ACLU — e 39% dos falsos matches. O sistema continuou sendo vendido para polícias por anos.",
    stat: {
      label: "Pessoas negras no grupo vs. nos erros",
      a: { name: "% dos erros", value: 39 },
      b: { name: "% do grupo", value: 20 },
    },
    source: "ACLU · Face Surveillance Test",
    href: "https://www.aclu.org/news/privacy-technology/amazons-face-recognition-falsely-matched-28",
  },
  {
    id: "google",
    logo: "https://cdn.simpleicons.org/google/EEEEEE",
    name: "Google",
    kind: "Caso",
    year: "2015",
    scope: "Google Photos · auto-tagging",
    headline: "Pessoas negras rotuladas como 'gorilas' em produção.",
    summary:
      "A resposta da empresa foi remover o rótulo — não corrigir o modelo. Oito anos depois, a categoria ainda não havia sido restabelecida com segurança.",
    stat: {
      label: "Tempo até correção real do modelo",
      a: { name: "Anos sem solução", value: 8 },
      b: { name: "Anos prometidos", value: 1 },
    },
    source: "The Verge · Wired",
    href: "https://www.theverge.com/2018/1/12/16882408/google-racist-gorillas-photo-recognition-algorithm-ai",
  },
  {
    id: "ibm",
    logo: "https://cdn.simpleicons.org/ibm/EEEEEE",
    name: "IBM",
    kind: "Política corporativa",
    year: "2020",
    scope: "Encerramento de reconhecimento facial",
    headline: "IBM abandona reconhecimento facial alegando risco racial.",
    summary:
      "Em carta ao Congresso, a IBM encerrou o desenvolvimento e venda de reconhecimento facial geral, reconhecendo o uso em vigilância em massa e perfilamento racial.",
    stat: {
      label: "Posição pública da empresa",
      a: { name: "Risco racial assumido", value: 100 },
      b: { name: "Produtos mantidos", value: 0 },
    },
    source: "IBM · Carta ao Congresso EUA",
    href: "https://www.ibm.com/policy/facial-recognition-sunset-racial-justice-reforms/",
  },
  {
    id: "compas",
    name: "COMPAS",
    kind: "Auditoria",
    year: "2016",
    scope: "Score de risco criminal · ProPublica",
    headline: "Réus negros marcados como reincidentes ao dobro da taxa.",
    summary:
      "A ProPublica auditou o sistema usado em tribunais norte-americanos e mostrou que o algoritmo previa erradamente reincidência em pessoas negras com o dobro da frequência.",
    stat: {
      label: "Falsos positivos de reincidência",
      a: { name: "Réus negros", value: 45 },
      b: { name: "Réus brancos", value: 23 },
    },
    source: "Angwin et al. · ProPublica",
    href: "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing",
  },
];

function Wordmark({
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
      className="group relative px-2 py-3 transition-all duration-300"
    >
      <span
        className="font-serif text-[15px] md:text-[17px] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300"
        style={{
          color: active
            ? "oklch(0.92 0.05 40)"
            : "oklch(0.70 0.025 35 / 0.65)",
        }}
      >
        {rec.name}
      </span>
      <span
        className="absolute left-2 right-2 -bottom-px h-px transition-opacity duration-300"
        style={{
          background: "oklch(0.78 0.10 40 / 0.7)",
          opacity: active ? 1 : 0,
        }}
      />
    </button>
  );
}

function StatBar({
  label,
  value,
  max,
  highlight,
}: {
  label: string;
  value: number;
  max: number;
  highlight?: boolean;
}) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100));
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <span
          className="text-[12px] tracking-wide"
          style={{ color: "var(--muted-foreground)" }}
        >
          {label}
        </span>
        <span
          className="font-serif text-[18px] tracking-tight"
          style={{
            color: highlight
              ? "oklch(0.86 0.10 40)"
              : "oklch(0.80 0.03 35 / 0.85)",
          }}
        >
          {value}
          {value <= 100 ? "%" : ""}
        </span>
      </div>
      <div
        className="h-[3px] w-full"
        style={{ background: "oklch(0.55 0.04 35 / 0.12)" }}
      >
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: highlight
              ? "oklch(0.70 0.14 38)"
              : "oklch(0.60 0.06 36 / 0.6)",
          }}
        />
      </div>
    </div>
  );
}

export function IncidentLog() {
  const [activeId, setActiveId] = useState<string>(records[0].id);
  const active = records.find((r) => r.id === activeId) ?? records[0];
  const max = Math.max(active.stat.a.value, active.stat.b.value);

  return (
    <section
      id="incidentes"
      className="relative w-full py-28 lg:py-36"
      style={{ background: "oklch(0.115 0.018 34)" }}
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div
              className="font-mono text-[10px] tracking-[0.42em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              Registro de dados
            </div>
            <h2 className="mt-5 font-serif font-light text-[28px] md:text-[38px] leading-[1.1] tracking-[-0.02em] text-foreground/95 max-w-[20ch]">
              As fontes que sustentam o que afirmamos.
            </h2>
          </div>
          <a
            href={active.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.28em] uppercase border px-4 py-2.5 transition-colors"
            style={{
              borderColor: "oklch(0.55 0.05 35 / 0.35)",
              color: "var(--foreground)",
            }}
          >
            Ver todos os estudos
          </a>
        </div>

        {/* faixa de wordmarks */}
        <div
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 border-y py-5"
          style={{ borderColor: "oklch(0.55 0.05 35 / 0.18)" }}
        >
          {records.map((r) => (
            <Wordmark
              key={r.id}
              rec={r}
              active={r.id === activeId}
              onClick={() => setActiveId(r.id)}
            />
          ))}
        </div>

        {/* painel do caso em destaque */}
        <div
          key={active.id}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 animate-in fade-in duration-500"
        >
          <div className="lg:col-span-5">
            <div
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              Caso em destaque
            </div>
            <div className="mt-4 flex items-baseline gap-4">
              <span className="font-serif text-[34px] md:text-[42px] leading-none tracking-[-0.02em] text-foreground/95">
                {active.name}
              </span>
              <span
                className="font-mono text-[12px] tracking-wide"
                style={{ color: "var(--muted-foreground)" }}
              >
                {active.year}
              </span>
            </div>
            <p
              className="mt-5 text-[14px] leading-[1.7] max-w-[44ch]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {active.summary}
            </p>
            <div
              className="mt-6 font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ color: "oklch(0.65 0.04 35 / 0.8)" }}
            >
              {active.scope}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className="p-6 md:p-8"
              style={{
                background: "oklch(0.14 0.022 34)",
                border: "1px solid oklch(0.55 0.05 35 / 0.15)",
              }}
            >
              <div
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: "var(--muted-foreground)" }}
              >
                {active.stat.label}
              </div>
              <div className="mt-6 space-y-5">
                <StatBar
                  label={active.stat.a.name}
                  value={active.stat.a.value}
                  max={max}
                  highlight
                />
                <StatBar
                  label={active.stat.b.name}
                  value={active.stat.b.value}
                  max={max}
                />
              </div>
              <div
                className="mt-7 pt-5 flex items-center justify-between border-t text-[11px] font-mono tracking-[0.22em] uppercase"
                style={{
                  borderColor: "oklch(0.55 0.05 35 / 0.15)",
                  color: "var(--muted-foreground)",
                }}
              >
                <span>Fonte · {active.source}</span>
                <a
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Abrir ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

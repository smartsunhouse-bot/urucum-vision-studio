// O Custo da Invisibilidade — autoridade comercial via aversão à perda.
// Cards minimalistas com micro-gráficos SVG. Sem dependências.

const stats = [
  {
    kpi: "US$ 1,2T",
    label: "potencial de mercado perdido",
    detail:
      "Estimativa global de receita não capturada por produtos de IA que falham em populações sub-representadas.",
    source: "World Economic Forum · McKinsey, 2023",
    trend: [82, 74, 68, 61, 54, 48, 41, 35, 30, 24],
    direction: "down" as const,
  },
  {
    kpi: "34,7%",
    label: "erro adicional em pele negra",
    detail:
      "Diferença média de falsos negativos em sistemas comerciais de reconhecimento facial entre fototipos I e VI.",
    source: "NIST FRVT · MIT Gender Shades",
    trend: [10, 12, 14, 18, 22, 26, 30, 33, 34, 35],
    direction: "up" as const,
  },
  {
    kpi: "−62%",
    label: "conversão em fluxos KYC",
    detail:
      "Queda de conversão em onboarding biométrico quando o pipeline foi treinado sem calibração por fototipo e iluminação.",
    source: "Relato de mercado · fintechs LATAM",
    trend: [100, 96, 88, 80, 71, 63, 55, 48, 42, 38],
    direction: "down" as const,
  },
];

function Spark({ data, direction }: { data: number[]; direction: "up" | "down" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 90 - 5;
      return `${x},${y}`;
    })
    .join(" ");
  const color =
    direction === "down" ? "oklch(0.66 0.24 28)" : "oklch(0.72 0.22 28)";
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-12">
      <defs>
        <linearGradient id={`g-${direction}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,100 ${pts} 100,100`}
        fill={`url(#g-${direction})`}
      />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

export function CostOfInvisibility() {
  return (
    <section
      id="custo"
      className="relative py-28 lg:py-36"
      style={{
        background:
          "radial-gradient(900px 500px at 80% 20%, oklch(0.20 0.06 28 / 0.35), transparent 60%)," +
          "linear-gradient(180deg, oklch(0.085 0.010 32), oklch(0.095 0.012 34))",
      }}
    >
      <div className="absolute inset-0 grain-fine pointer-events-none opacity-60" />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.62 0.24 26)",
                boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
              }}
            />
            <span>02 · autoridade comercial</span>
          </div>

          <h2 className="mt-6 font-serif font-light text-[40px] md:text-[56px] lg:text-[64px] leading-[1.02] tracking-[-0.02em] text-foreground/95">
            O custo da{" "}
            <span
              className="italic"
              style={{
                color: "oklch(0.66 0.24 28)",
                textShadow: "0 0 32px oklch(0.55 0.22 25 / 0.4)",
              }}
            >
              invisibilidade.
            </span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.7] text-foreground/65">
            Sistemas que não enxergam todo mundo não falham apenas eticamente —
            falham comercialmente. Cada erro de captura é uma conta no balanço.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/8 border border-foreground/10">
          {stats.map((s) => (
            <article
              key={s.kpi}
              className="relative p-7 lg:p-9 bg-[oklch(0.095_0.012_34)] hover:bg-[oklch(0.105_0.014_34)] transition-colors duration-500"
            >
              {/* corner ticks */}
              <span className="absolute top-2 left-2 w-2 h-px bg-foreground/30" />
              <span className="absolute top-2 left-2 w-px h-2 bg-foreground/30" />
              <span className="absolute bottom-2 right-2 w-2 h-px bg-foreground/30" />
              <span className="absolute bottom-2 right-2 w-px h-2 bg-foreground/30" />

              <div className="text-[9.5px] font-mono tracking-[0.32em] uppercase text-foreground/45">
                kpi · {s.direction === "down" ? "loss" : "error rate"}
              </div>

              <div
                className="mt-4 font-serif font-light text-[52px] lg:text-[60px] leading-none tracking-[-0.03em]"
                style={{ color: "oklch(0.92 0.04 35)" }}
              >
                {s.kpi}
              </div>

              <div className="mt-3 text-[13px] uppercase tracking-[0.14em] text-foreground/80">
                {s.label}
              </div>

              <div className="mt-5">
                <Spark data={s.trend} direction={s.direction} />
              </div>

              <p className="mt-5 text-[13.5px] leading-[1.65] text-foreground/65">
                {s.detail}
              </p>

              <div className="mt-6 pt-4 border-t border-foreground/10 text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/40">
                {s.source}
              </div>
            </article>
          ))}
        </div>

        {/* Disclosure CTA for the historical timeline */}
        <div className="mt-14 flex justify-center">
          <a
            href="#entenda"
            className="group inline-flex items-center gap-3 px-5 h-11 rounded-[3px] text-[11.5px] font-mono tracking-[0.28em] uppercase text-foreground/70 hover:text-foreground/95 transition-colors duration-300"
            style={{
              border: "1px solid oklch(0.55 0.18 35 / 0.22)",
              background: "oklch(0.12 0.014 35 / 0.5)",
            }}
          >
            <span className="text-[14px] leading-none">+</span>
            Contexto histórico · 1839 → hoje
            <span className="text-base leading-none transition-transform duration-500 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SkinToneStrip } from "./SkinToneStrip";

export type SolutionData = {
  code: string;
  vertical: string;
  audience: string;
  headline: string;
  pain: string;
  benefit: string;
  useCases: string[];
  /** Code block lines (Roboflow-style) */
  snippet: { line: string; tone?: "kw" | "str" | "fn" | "comment" | "var" | "num" | "plain" }[];
  snippetTitle: string;
  install: string;
  /** Visualization cards */
  cards: { label: string; icon: "server" | "model" | "lock" | "scan" | "pulse" | "shield" }[];
  /** Visualization caption under the bbox preview */
  vizCaption: string;
  /** Bounding-box style overlay labels */
  overlays: { x: number; y: number; w: number; h: number; tag: string; conf: string }[];
  /** ROI chart rows */
  roi: { label: string; traditional: string; synthetic: string; tradPct: number; synthPct: number }[];
  /** Photometric / capture readings */
  photometric?: {
    ev: string;          // exposure value e.g. "EV -1.3"
    lum: string;         // luminance e.g. "Y' 0.31"
    iso: string;         // ISO e.g. "ISO 3200"
    shutter: string;     // shutter e.g. "1/30s"
    wb: string;          // white balance e.g. "WB 3200K"
    fitz: string;        // fitzpatrick coverage e.g. "FITZ IV–VI"
  };
  /** Operational technical state badges */
  states?: string[];
  /** Capture log lines (terminal-style) */
  logs?: { t: string; tag: "ok" | "info" | "warn"; msg: string }[];
};

function Icon({ name }: { name: SolutionData["cards"][number]["icon"] }) {
  const c = "oklch(0.78 0.20 30)";
  switch (name) {
    case "server":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="6" rx="1" stroke={c} />
          <rect x="3" y="14" width="18" height="6" rx="1" stroke={c} />
          <circle cx="7" cy="7" r="0.8" fill={c} />
          <circle cx="7" cy="17" r="0.8" fill={c} />
        </svg>
      );
    case "model":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c}>
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="5" cy="6" r="1.6" />
          <circle cx="19" cy="6" r="1.6" />
          <circle cx="5" cy="18" r="1.6" />
          <circle cx="19" cy="18" r="1.6" />
          <path d="M6.5 7l4 4M17.5 7l-4 4M6.5 17l4-4M17.5 17l-4-4" />
        </svg>
      );
    case "lock":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c}>
          <rect x="5" y="11" width="14" height="9" rx="1" />
          <path d="M8 11V8a4 4 0 018 0v3" />
        </svg>
      );
    case "scan":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c}>
          <path d="M4 8V5h3M20 8V5h-3M4 16v3h3M20 16v3h-3" />
          <path d="M4 12h16" />
        </svg>
      );
    case "pulse":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c}>
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
      );
    case "shield":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
        </svg>
      );
  }
}

function CodeLine({
  n,
  parts,
}: {
  n: number;
  parts: SolutionData["snippet"];
}) {
  const colorOf = (t?: SolutionData["snippet"][number]["tone"]) => {
    switch (t) {
      case "kw":
        return "oklch(0.72 0.18 320)";
      case "str":
        return "oklch(0.78 0.16 35)";
      case "fn":
        return "oklch(0.82 0.15 75)";
      case "comment":
        return "oklch(0.55 0.02 35)";
      case "var":
        return "oklch(0.85 0.02 220)";
      case "num":
        return "oklch(0.78 0.16 145)";
      default:
        return "oklch(0.85 0.02 35)";
    }
  };
  return (
    <div className="flex gap-4 leading-[1.85]">
      <span className="w-6 text-right text-foreground/25 select-none">{n}</span>
      <span>
        {parts.map((p, i) => (
          <span key={i} style={{ color: colorOf(p.tone) }}>
            {p.line}
          </span>
        ))}
      </span>
    </div>
  );
}

export function SolutionPage({ data }: { data: SolutionData }) {
  const lines: SolutionData["snippet"][] = [];
  let cur: SolutionData["snippet"] = [];
  for (const p of data.snippet) {
    if (p.line === "\n") {
      lines.push(cur);
      cur = [];
    } else {
      cur.push(p);
    }
  }
  if (cur.length) lines.push(cur);

  return (
    <main className="relative bg-background text-foreground">
      <SkinToneStrip />
      <Navbar />

      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 75% 30%, oklch(0.30 0.12 30 / 0.35), transparent 70%)",
          }}
        />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/45">
            <span style={{ color: "oklch(0.66 0.24 28)" }}>{data.code}</span>
            <span>Soluções</span>
            <span className="text-foreground/25">/</span>
            <span>{data.vertical}</span>
          </div>
          <h1 className="mt-6 font-serif text-[44px] md:text-[60px] leading-[1.02] tracking-[-0.02em] max-w-[18ch]">
            {data.headline}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[15px] leading-[1.7] text-foreground/65">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40 mr-2">
              Setor · {data.audience}
            </span>
          </p>
        </div>
      </section>

      <section className="relative py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-10">
          <div>
            <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/40">
              A dor real
            </div>
            <p className="mt-4 text-[16px] leading-[1.75] text-foreground/80">
              {data.pain}
            </p>
          </div>
          <div
            className="rounded-[3px] p-6"
            style={{
              background: "oklch(0.12 0.014 35 / 0.7)",
              border: "1px solid oklch(0.55 0.18 35 / 0.18)",
            }}
          >
            <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/40">
              O que entregamos
            </div>
            <p className="mt-4 text-[15px] leading-[1.7] text-foreground/85">
              {data.benefit}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex justify-center mb-6">
            <div
              className="flex items-center gap-3 px-5 py-2.5 rounded-full font-mono text-[12px] text-foreground/85"
              style={{
                background: "oklch(0.12 0.014 35 / 0.85)",
                border: "1px solid oklch(0.55 0.18 35 / 0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ color: "oklch(0.66 0.24 28)" }}>$</span>
              <span>{data.install}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="opacity-60">
                <rect x="9" y="9" width="11" height="11" rx="1.5" />
                <path d="M5 15V5a1 1 0 011-1h10" />
              </svg>
            </div>
          </div>

          <div
            className="rounded-[6px] overflow-hidden grid lg:grid-cols-[1.15fr_1fr]"
            style={{
              background: "oklch(0.10 0.012 35 / 0.92)",
              border: "1px solid oklch(0.55 0.18 35 / 0.20)",
              boxShadow: "0 40px 80px -30px oklch(0 0 0 / 0.7)",
            }}
          >
            <div className="border-b lg:border-b-0 lg:border-r border-[oklch(0.55_0.18_35_/_0.18)]">
              <div className="flex items-center gap-1.5 px-5 py-3 border-b border-[oklch(0.55_0.18_35_/_0.15)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.55_0.18_25)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.70_0.16_85)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.65_0.15_150)]" />
                <span className="ml-3 text-[10px] font-mono tracking-[0.24em] uppercase text-foreground/45">
                  {data.snippetTitle}
                </span>
              </div>
              <pre className="px-5 py-5 font-mono text-[12.5px] overflow-x-auto">
                <code>
                  {lines.map((parts, idx) => (
                    <CodeLine key={idx} n={idx + 1} parts={parts} />
                  ))}
                </code>
              </pre>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {data.cards.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-[4px] p-4 flex flex-col items-center gap-3"
                    style={{
                      background: "oklch(0.16 0.04 30 / 0.55)",
                      border: "1px solid oklch(0.55 0.18 35 / 0.25)",
                    }}
                  >
                    <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-foreground/65">
                      {c.label}
                    </div>
                    <Icon name={c.icon} />
                  </div>
                ))}
              </div>

              <div
                className="relative rounded-[4px] aspect-[16/9] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.18 0.03 30) 0%, oklch(0.10 0.012 35) 100%)",
                  border: "1px solid oklch(0.55 0.18 35 / 0.22)",
                }}
              >
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 112" preserveAspectRatio="none">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="112" stroke="oklch(0.55 0.18 35 / 0.4)" strokeWidth="0.2" />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} stroke="oklch(0.55 0.18 35 / 0.4)" strokeWidth="0.2" />
                  ))}
                </svg>

                {data.overlays.map((o, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${o.x}%`,
                      top: `${o.y}%`,
                      width: `${o.w}%`,
                      height: `${o.h}%`,
                      border: "1px solid oklch(0.72 0.22 28)",
                      boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.45)",
                    }}
                  >
                    <div
                      className="absolute -top-[14px] left-0 px-1 py-[1px] font-mono text-[8px] tracking-[0.18em] uppercase text-background"
                      style={{ background: "oklch(0.72 0.22 28)" }}
                    >
                      {o.tag} · {o.conf}
                    </div>
                  </div>
                ))}

                <div
                  className="absolute inset-x-0 h-[1px] animate-scan"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.72 0.22 28 / 0.7), transparent)",
                  }}
                />

                <div className="absolute bottom-2 left-3 font-mono text-[9px] tracking-[0.22em] uppercase text-foreground/55">
                  {data.vizCaption}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/40">
            Casos de uso
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {data.useCases.map((u, i) => (
              <div
                key={i}
                className="rounded-[3px] p-5"
                style={{
                  background: "oklch(0.12 0.014 35 / 0.6)",
                  border: "1px solid oklch(0.55 0.18 35 / 0.18)",
                }}
              >
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                  caso · {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-3 text-[14px] leading-[1.6] text-foreground/85">
                  {u}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/40">
            ROI · Sintético vs. Tradicional
          </div>
          <h2 className="mt-3 font-serif text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.01em] max-w-[24ch]">
            Mesma cobertura. 80% menos custo. Risco de privacidade próximo de zero.
          </h2>

          <div
            className="mt-10 rounded-[4px] overflow-hidden"
            style={{
              background: "oklch(0.10 0.012 35 / 0.85)",
              border: "1px solid oklch(0.55 0.18 35 / 0.20)",
            }}
          >
            <div className="grid grid-cols-[1.1fr_2fr_2fr] px-6 py-3 text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/40 border-b border-[oklch(0.55_0.18_35_/_0.15)]">
              <div>Métrica</div>
              <div>Coleta tradicional</div>
              <div>Urucum sintético</div>
            </div>

            {data.roi.map((r) => (
              <div
                key={r.label}
                className="grid grid-cols-[1.1fr_2fr_2fr] items-center px-6 py-5 border-b border-[oklch(0.55_0.18_35_/_0.10)] last:border-b-0"
              >
                <div className="text-[12px] font-mono tracking-[0.18em] uppercase text-foreground/75">
                  {r.label}
                </div>
                <div>
                  <div className="text-[13px] text-foreground/65">{r.traditional}</div>
                  <div className="mt-2 h-[3px] rounded-full bg-[oklch(0.20_0.02_35)] overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${r.tradPct}%`,
                        background: "oklch(0.55 0.06 30)",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-[13px] text-foreground/95">{r.synthetic}</div>
                  <div className="mt-2 h-[3px] rounded-full bg-[oklch(0.20_0.02_35)] overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${r.synthPct}%`,
                        background:
                          "linear-gradient(90deg, oklch(0.62 0.24 26), oklch(0.78 0.20 35))",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[13px] text-foreground/55 max-w-[60ch]">
              Nenhuma pessoa real foi fotografada. Cada amostra é gerada de forma
              programável, com ground truth pixel-perfect e proveniência rastreável.
            </p>
            <a
              href="/#contato"
              className="inline-flex items-center gap-2 self-start text-[11px] font-mono tracking-[0.22em] uppercase px-5 py-2.5 rounded-[2px]"
              style={{
                border: "1px solid oklch(0.55 0.18 35 / 0.4)",
                background: "oklch(0.14 0.018 40 / 0.6)",
              }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: "oklch(0.66 0.24 28)" }}
              />
              Solicitar acesso técnico
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

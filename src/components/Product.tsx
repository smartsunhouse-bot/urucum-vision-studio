import { useEffect, useState } from "react";

function ToneGrid() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, []);
  const tones = [
    "oklch(0.92 0.03 70)",
    "oklch(0.78 0.06 60)",
    "oklch(0.62 0.08 50)",
    "oklch(0.46 0.07 45)",
    "oklch(0.32 0.05 40)",
    "oklch(0.22 0.04 35)",
  ];
  return (
    <div className="grid grid-cols-6 gap-1.5">
      {Array.from({ length: 36 }).map((_, i) => {
        const base = tones[i % tones.length];
        const dim = ((i + tick) % 7 === 0);
        return (
          <div
            key={i}
            className="aspect-square rounded-sm transition-all duration-700"
            style={{
              background: base,
              opacity: dim ? 0.35 : 1,
              transform: dim ? "scale(0.9)" : "scale(1)",
            }}
          />
        );
      })}
    </div>
  );
}

function LightingRow() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {["brightness(0.4)", "brightness(0.75)", "brightness(1.05) saturate(0.9)", "brightness(0.9) contrast(1.15)"].map(
        (f, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-sm border border-border overflow-hidden relative"
            style={{
              background:
                "radial-gradient(ellipse at 50% 35%, oklch(0.42 0.05 40), oklch(0.18 0.02 35))",
              filter: f,
            }}
          >
            <div
              className="absolute left-1/2 top-[42%] -translate-x-1/2 w-10 h-12 rounded-full"
              style={{ background: "oklch(0.32 0.05 40)" }}
            />
            <div className="absolute bottom-1 left-1.5 text-[9px] font-mono text-foreground/60">
              EV {i - 2 < 0 ? `−${Math.abs(i - 2)}` : `+${i - 2}`}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function DermaScan() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[0, 1, 2].map((c) => (
        <div
          key={c}
          className="aspect-square rounded-sm relative overflow-hidden border border-border"
          style={{
            background: `radial-gradient(circle at 40% 40%, oklch(${0.7 - c * 0.18} 0.06 50), oklch(${0.3 - c * 0.08} 0.04 40))`,
          }}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-70">
            {Array.from({ length: 6 }).map((_, i) => (
              <circle
                key={i}
                cx={20 + i * 12}
                cy={50 + Math.sin(i + c) * 15}
                r={1.6 + (i % 3)}
                fill="none"
                stroke="oklch(0.62 0.21 32 / 0.8)"
                strokeWidth="0.5"
              />
            ))}
            <path
              d={`M5 ${60 + c * 4} Q 50 ${30 - c * 5} 95 ${55 + c * 3}`}
              stroke="oklch(0.88 0.04 75 / 0.4)"
              strokeWidth="0.4"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

function MetaPanel() {
  const rows = [
    ["EV", "−1.2"],
    ["LIGHTING", "low_light"],
    ["CAMERA", "ARRI Alexa 35"],
    ["CONTRAST", "0.84"],
    ["ST", "VI · Fitzpatrick"],
    ["WB", "3200K"],
  ];
  return (
    <div className="font-mono text-[12px] rounded-sm border border-border bg-[oklch(0.12_0.014_38)] p-5">
      <div className="text-[10px] tracking-[0.3em] text-urucum/80 mb-3">▸ FRAME_META</div>
      <div className="space-y-1.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between text-foreground/80">
            <span className="text-muted-foreground">{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-1 rounded-full overflow-hidden bg-[oklch(0.2_0.02_40)]">
        <div className="h-full w-2/3" style={{ background: "linear-gradient(90deg, oklch(0.55 0.18 35), oklch(0.7 0.16 60))" }} />
      </div>
    </div>
  );
}

const blocks = [
  { n: "01", t: "Distribuição controlada", d: "Controle programável de presença nos dados.", v: <ToneGrid /> },
  { n: "02", t: "Variação contextual", d: "A mesma imagem pode gerar dados completamente diferentes.", v: <LightingRow /> },
  { n: "03", t: "Modelagem de padrões", d: "Como sinais aparecem em diferentes contextos visuais.", v: <DermaScan /> },
  { n: "04", t: "Metadados estruturados", d: "Imagem transformada em dado auditável.", v: <MetaPanel /> },
];

export function Product() {
  return (
    <section id="produto" className="relative py-32 lg:py-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal flex items-end justify-between flex-wrap gap-6 mb-20">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.32em] text-urucum/80 mb-5">
              ◦ Produto
            </div>
            <h2 className="font-serif font-light text-4xl md:text-6xl leading-[1.02] tracking-[-0.015em] max-w-2xl">
              Quatro primitivas <span className="italic">visuais.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-[15px] leading-relaxed">
            A plataforma é construída em torno de operações verificáveis sobre captura, exposição e contexto — não geração estocástica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border/50 rounded-sm overflow-hidden">
          {blocks.map((b) => (
            <div key={b.n} className="reveal bg-background p-8 md:p-12 min-h-[420px] flex flex-col">
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-mono text-[11px] text-urucum/80 tracking-[0.25em]">{b.n}</span>
                <h3 className="font-serif text-2xl md:text-3xl">{b.t}</h3>
              </div>
              <div className="flex-1 flex items-center">
                <div className="w-full max-w-md mx-auto">{b.v}</div>
              </div>
              <p className="mt-8 text-[14px] text-muted-foreground leading-relaxed max-w-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";

/* ---------- Visuals (Linear-style product mocks) ---------- */

function CaptureConsole() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % 100), 80);
    return () => clearInterval(id);
  }, []);
  const exposures = [-2, -1, 0, 1, 2];
  return (
    <div className="rounded-lg border border-border/70 bg-[oklch(0.11_0.013_36)] overflow-hidden shadow-[0_30px_80px_-30px_oklch(0_0_0/0.7)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-urucum/80" />
          <span>capture.console</span>
        </div>
        <span>SUBJECT_017 · LOOP</span>
      </div>
      <div className="p-5 grid grid-cols-5 gap-2">
        {exposures.map((ev, i) => {
          const active = i === Math.floor(t / 20) % 5;
          const lift = ev * 0.18;
          return (
            <div
              key={ev}
              className="aspect-[3/4] rounded-sm relative overflow-hidden border transition-all duration-300"
              style={{
                borderColor: active ? "oklch(0.62 0.21 32 / 0.8)" : "oklch(0.25 0.02 40 / 0.6)",
                boxShadow: active ? "0 0 0 1px oklch(0.62 0.21 32 / 0.4), 0 0 30px -8px oklch(0.62 0.21 32 / 0.6)" : "none",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 38%, oklch(0.42 0.05 40), oklch(0.16 0.02 35))",
                  filter: `brightness(${1 + lift}) contrast(${1 - lift * 0.25})`,
                }}
              />
              <div
                className="absolute left-1/2 top-[42%] -translate-x-1/2 w-9 h-11 rounded-full"
                style={{ background: "oklch(0.32 0.05 40)" }}
              />
              <div className="absolute bottom-1.5 left-2 text-[9px] font-mono text-foreground/70">
                {ev > 0 ? `+${ev}` : ev} EV
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5 pb-4 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span>delta · {(t / 100).toFixed(2)}</span>
        <span className="text-foreground/70">● recording</span>
      </div>
    </div>
  );
}

function ToneDistribution() {
  return (
    <div className="rounded-lg border border-border/70 bg-[oklch(0.11_0.013_36)] p-5 shadow-[0_30px_80px_-30px_oklch(0_0_0/0.7)]">
      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-4">
        <span>distribution.skin_tone</span>
        <span>n = 1.2M</span>
      </div>
      <div className="flex items-end gap-1.5 h-32">
        {[18, 32, 56, 78, 92, 84, 70, 58, 44, 36, 28, 22].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-sm transition-all"
              style={{
                height: `${h}%`,
                background: `linear-gradient(180deg, oklch(${0.92 - i * 0.05} 0.04 ${75 - i * 3}), oklch(${0.7 - i * 0.04} 0.05 ${60 - i * 2}))`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
        <span>I</span><span>II</span><span>III</span><span>IV</span><span>V</span><span>VI</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] font-mono">
        <span className="text-muted-foreground">target</span>
        <span className="text-urucum">uniform · σ 0.04</span>
      </div>
    </div>
  );
}

function MetadataLedger() {
  const rows = [
    ["frame_id", "0x7af31c"],
    ["skin_tone", "VI"],
    ["exposure_ev", "−1.2"],
    ["lighting", "low_light · 3200K"],
    ["sensor", "ARRI Alexa 35"],
    ["sha256", "a4·f1·09·b6"],
  ];
  return (
    <div className="rounded-lg border border-border/70 bg-[oklch(0.11_0.013_36)] overflow-hidden shadow-[0_30px_80px_-30px_oklch(0_0_0/0.7)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
        <span>frame.meta</span>
        <span className="text-urucum">signed</span>
      </div>
      <div className="p-5 font-mono text-[12px] space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between text-foreground/85">
            <span className="text-muted-foreground">{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <div className="px-5 pb-4">
        <div className="h-1 rounded-full bg-[oklch(0.2_0.02_40)] overflow-hidden">
          <div className="h-full w-[92%]" style={{ background: "linear-gradient(90deg, oklch(0.55 0.18 35), oklch(0.7 0.16 60))" }} />
        </div>
        <div className="mt-2 text-[10px] font-mono text-muted-foreground tracking-wide">
          chain integrity · 0.92
        </div>
      </div>
    </div>
  );
}

function PipelineGraph() {
  return (
    <div className="rounded-lg border border-border/70 bg-[oklch(0.11_0.013_36)] p-5 shadow-[0_30px_80px_-30px_oklch(0_0_0/0.7)]">
      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-5">
        <span>pipeline.graph</span>
        <span>v 2.4</span>
      </div>
      <svg viewBox="0 0 320 160" className="w-full h-auto">
        {[
          { x: 20, y: 80, l: "capture" },
          { x: 110, y: 40, l: "expose" },
          { x: 110, y: 120, l: "tone" },
          { x: 200, y: 80, l: "label" },
          { x: 290, y: 80, l: "ledger" },
        ].map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="6" fill="oklch(0.14 0.018 40)" stroke="oklch(0.62 0.21 32 / 0.8)" strokeWidth="1" />
            <text x={n.x} y={n.y + 22} fontSize="9" fontFamily="JetBrains Mono" fill="oklch(0.7 0.04 70)" textAnchor="middle">
              {n.l}
            </text>
          </g>
        ))}
        {[
          ["20,80", "110,40"],
          ["20,80", "110,120"],
          ["110,40", "200,80"],
          ["110,120", "200,80"],
          ["200,80", "290,80"],
        ].map(([a, b], i) => (
          <line
            key={i}
            x1={a.split(",")[0]}
            y1={a.split(",")[1]}
            x2={b.split(",")[0]}
            y2={b.split(",")[1]}
            stroke="oklch(0.55 0.18 35 / 0.45)"
            strokeWidth="0.7"
          />
        ))}
      </svg>
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
        <span className="text-muted-foreground">throughput</span>
        <span className="text-foreground/80">10⁹ frames / day</span>
      </div>
    </div>
  );
}

/* ---------- Layout ---------- */

const features = [
  {
    n: "01",
    eyebrow: "Capture",
    title: "Captura programável de exposição.",
    body: "Defina o eixo tom × EV como parâmetro de entrada. A mesma identidade rendida sob iluminações controladas, com curva contínua e reproduzível.",
    bullets: ["Curva EV −2 → +2", "Iluminação calibrada", "Identidade preservada"],
    visual: <CaptureConsole />,
  },
  {
    n: "02",
    eyebrow: "Distribution",
    title: "Distribuição controlada de presença.",
    body: "Configure a distribuição de tons de pele do dataset como restrição explícita. Sem amostragem implícita, sem drift estatístico silencioso.",
    bullets: ["Cota por Fitzpatrick I–VI", "Verificação contínua", "Sem viés implícito"],
    visual: <ToneDistribution />,
  },
  {
    n: "03",
    eyebrow: "Provenance",
    title: "Cada frame é um dado auditável.",
    body: "Metadados assinados em todos os pontos da cadeia: sensor, exposição, iluminação, tom, contexto. Rastreabilidade ponta-a-ponta.",
    bullets: ["Assinatura por frame", "Hash determinístico", "Auditoria reversível"],
    visual: <MetadataLedger />,
  },
  {
    n: "04",
    eyebrow: "Pipeline",
    title: "Infraestrutura, não aplicativo.",
    body: "API e workers para rodar em produção. Conecta-se a pipelines de visão, identidade e biomédica sem alterar o fluxo de modelagem.",
    bullets: ["SDK Python / TS", "Workers determinísticos", "Sem dependência de UI"],
    visual: <PipelineGraph />,
  },
];

export function Product() {
  return (
    <section id="produto" className="relative py-32 lg:py-44 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal max-w-3xl mb-24">
          <div className="text-[11px] font-mono uppercase tracking-[0.32em] text-urucum/80 mb-5">
            ◦ Plataforma
          </div>
          <h2 className="font-serif font-light text-4xl md:text-6xl leading-[1.02] tracking-[-0.015em]">
            Infraestrutura visual,
            <span className="italic"> determinística.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-[16px] leading-relaxed max-w-xl">
            URUCUM AI é uma camada de captura e modelagem que opera antes do modelo. Cada operação é programável, verificável e reversível.
          </p>
        </div>

        <div className="space-y-32 lg:space-y-48">
          {features.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={f.n}
                className={`reveal grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-urucum/80 mb-5">
                    <span>{f.n}</span>
                    <span className="w-6 h-px bg-urucum/60" />
                    <span>{f.eyebrow}</span>
                  </div>
                  <h3 className="font-serif font-light text-3xl md:text-[40px] leading-[1.05] tracking-[-0.015em]">
                    {f.title}
                  </h3>
                  <p className="mt-5 text-muted-foreground text-[15.5px] leading-relaxed max-w-md">
                    {f.body}
                  </p>
                  <ul className="mt-8 space-y-3 text-[13.5px] text-foreground/80">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 font-mono">
                        <span className="w-1 h-1 rounded-full bg-urucum" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-7">{f.visual}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

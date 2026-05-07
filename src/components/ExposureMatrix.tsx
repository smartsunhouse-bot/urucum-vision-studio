import { useEffect, useState } from "react";
import faceDeep from "@/assets/face-deep.jpg";
import faceMediumDark from "@/assets/face-mediumdark.jpg";
import faceMedium from "@/assets/face-medium.jpg";
import faceLight from "@/assets/face-light.jpg";
import heatmap from "@/assets/heatmap-radiance.jpg";

type Row = {
  label: string;
  sub: string;
  src: string;
  // base brightness offset per skin tone — darker tones lose more info underexposed
  bias: number;
};

const ROWS: Row[] = [
  { label: "Pele profunda", sub: "deep", src: faceDeep, bias: -0.12 },
  { label: "Pele médio-escura", sub: "medium-deep", src: faceMediumDark, bias: -0.05 },
  { label: "Pele média", sub: "medium", src: faceMedium, bias: 0.0 },
  { label: "Pele clara", sub: "light", src: faceLight, bias: 0.08 },
];

const EVS = [
  { ev: "+2", label: "Superexposta", b: 1.55, c: 0.78, s: 0.85 },
  { ev: "+1", label: "Levemente +", b: 1.22, c: 0.92, s: 0.95 },
  { ev: "0", label: "Balanceada", b: 1.0, c: 1.0, s: 1.0 },
  { ev: "−1", label: "Levemente −", b: 0.72, c: 1.08, s: 1.05 },
  { ev: "−2", label: "Subexposta", b: 0.42, c: 1.18, s: 1.1 },
];

function evFilter(b: number, c: number, s: number, bias: number) {
  // bias shifts brightness slightly per skin tone — darker rows lose more in low EV,
  // recover less in high EV (clipped highlights)
  const brightness = Math.max(
    0.18,
    b <= 1 ? b * (1 + bias * 1.4) : b * (1 - Math.max(0, -bias) * 0.6),
  );
  return `brightness(${brightness.toFixed(3)}) contrast(${c}) saturate(${s})`;
}

export function ExposureMatrix() {
  // Slow recalibration pulse — sensor breathing
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 360), 80);
    return () => clearInterval(id);
  }, []);
  const breath = 1 + Math.sin((pulse * Math.PI) / 180) * 0.015;

  return (
    <section
      id="exposicao"
      className="relative w-full py-32 md:py-40 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 10%, oklch(0.18 0.03 30 / 0.55), transparent 60%), radial-gradient(ellipse at 90% 90%, oklch(0.22 0.06 25 / 0.4), transparent 70%), oklch(0.09 0.012 35)",
      }}
    >
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.04 70 / 0.25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.04 70 / 0.25) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* subtle red glow */}
      <div
        className="absolute -left-40 top-1/2 w-[40rem] h-[40rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.18 35 / 0.10), transparent 70%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <header className="reveal grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.34em] uppercase text-urucum mb-6">
              <span className="w-8 h-px" style={{ background: "oklch(0.62 0.21 32 / 0.7)" }} />
              Exposição não é neutra
              <span className="text-muted-foreground">/ §03</span>
            </div>
            <h2 className="font-serif font-light text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] text-foreground">
              Ela define
              <span className="italic text-foreground/85"> o que pode ser visto.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-[17px] leading-relaxed text-muted-foreground">
              O mesmo nível de exposição não produz a mesma quantidade de informação visual
              para todos os tons de pele. A diferença não é estética — é estrutural.
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <div className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground/80">
              Condições de captura afetam{" "}
              <span className="text-urucum">diretamente os dados.</span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-[10px] font-mono text-muted-foreground tracking-wider">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: "oklch(0.62 0.21 32)" }} />
                +2 EV
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full border border-foreground/50" />
                0 EV
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: "oklch(0.45 0.13 250)" }} />
                −2 EV
              </span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
          {/* LEFT — matrix */}
          <div className="lg:col-span-8 reveal">
            <div
              className="relative rounded-sm border border-border/60 bg-[oklch(0.11_0.012_35)]/80 backdrop-blur"
              style={{ boxShadow: "0 30px 80px -30px oklch(0 0 0 / 0.7)" }}
            >
              {/* panel header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 text-[10px] font-mono tracking-[0.22em] uppercase text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-urucum animate-pulse" />
                  matrix · tone × ev
                </span>
                <span>fig. 03 — capture differential</span>
              </div>

              {/* column headers */}
              <div className="grid grid-cols-[140px_repeat(5,1fr)] px-4 pt-5 pb-3 gap-px">
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/70 self-end pb-2">
                  tom de pele
                </div>
                {EVS.map((c) => (
                  <div key={c.ev} className="text-center">
                    <div className="font-serif text-xl text-foreground/90 tabular-nums">
                      {c.ev} EV
                    </div>
                    <div className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-muted-foreground/70 mt-1">
                      {c.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* rows */}
              <div className="px-4 pb-5">
                {ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[140px_repeat(5,1fr)] gap-px py-px"
                  >
                    <div className="flex flex-col justify-center pr-3 py-2">
                      <span className="text-[12px] tracking-wide text-foreground/85">
                        {row.label}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60 mt-0.5">
                        {row.sub}
                      </span>
                      <span
                        className="mt-2 h-px w-8"
                        style={{ background: "oklch(0.62 0.21 32 / 0.6)" }}
                      />
                    </div>
                    {EVS.map((c) => (
                      <div
                        key={c.ev}
                        className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.08_0.01_35)] border border-[oklch(0.2_0.02_40_/_0.5)]"
                      >
                        <img
                          src={row.src}
                          alt={`${row.label} a ${c.ev} EV`}
                          loading="lazy"
                          width={512}
                          height={640}
                          className="w-full h-full object-cover transition-[filter] duration-1000"
                          style={{
                            filter: evFilter(c.b, c.c, c.s, row.bias),
                            transform: `scale(${breath.toFixed(4)})`,
                          }}
                        />
                        {/* corner ev tag */}
                        <span className="absolute top-1.5 left-1.5 text-[9px] font-mono tracking-wider text-foreground/55">
                          {c.ev}
                        </span>
                        {/* subtle vignette to fight any banding */}
                        <span
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "radial-gradient(ellipse at center, transparent 60%, oklch(0 0 0 / 0.45))",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* axis ticks footer */}
              <div className="border-t border-border/60 px-4 py-3 flex items-center justify-between text-[10px] font-mono tracking-wider text-muted-foreground/70">
                <span>axis · y: skin tone (fitzpatrick I–VI projected)</span>
                <span>axis · x: exposure value (stops)</span>
              </div>
            </div>
          </div>

          {/* RIGHT — radiance */}
          <aside className="lg:col-span-4 reveal space-y-5">
            <div
              className="relative rounded-sm border border-border/60 bg-[oklch(0.11_0.012_35)]/80 backdrop-blur"
              style={{ boxShadow: "0 30px 80px -30px oklch(0 0 0 / 0.7)" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 text-[10px] font-mono tracking-[0.22em] uppercase text-muted-foreground">
                <span>radiância · pseudo-color</span>
                <span>λ 380–780nm</span>
              </div>
              <div className="px-4 py-4">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-muted-foreground/80 mb-3">
                  Mapa de intensidade
                </div>
                <div className="text-[11px] text-foreground/80 mb-4">
                  Exemplo · pele profunda — 0&nbsp;EV (referência balanceada)
                </div>
                <div className="relative flex gap-3">
                  <div className="relative flex-1 aspect-[4/5] overflow-hidden bg-black border border-[oklch(0.2_0.02_40_/_0.5)]">
                    <img
                      src={heatmap}
                      alt="Mapa de radiância facial — pseudo-coloração científica"
                      loading="lazy"
                      width={640}
                      height={800}
                      className="w-full h-full object-cover"
                      style={{ transform: `scale(${breath.toFixed(4)})`, transition: "transform 1s linear" }}
                    />
                    {/* crosshair */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="50" y1="0" x2="50" y2="100" stroke="oklch(0.96 0.02 80 / 0.18)" strokeDasharray="1 2" strokeWidth="0.2" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="oklch(0.96 0.02 80 / 0.18)" strokeDasharray="1 2" strokeWidth="0.2" />
                    </svg>
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-mono tracking-wider text-foreground/65">
                      RAD · 0EV
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 text-[9px] font-mono tracking-wider text-foreground/65">
                      640×800
                    </span>
                  </div>
                  {/* intensity bar */}
                  <div className="flex flex-col items-center justify-between py-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/80 [writing-mode:vertical-rl] rotate-180">
                      alta
                    </span>
                    <div
                      className="w-2 flex-1 my-2 rounded-sm border border-border/60"
                      style={{
                        background:
                          "linear-gradient(180deg, oklch(0.62 0.22 28), oklch(0.78 0.18 70), oklch(0.82 0.18 130), oklch(0.55 0.16 200), oklch(0.32 0.16 260))",
                      }}
                    />
                    <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/80 [writing-mode:vertical-rl] rotate-180">
                      baixa
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border/60 px-4 py-3 grid grid-cols-3 gap-2 text-[10px] font-mono text-muted-foreground/80">
                <div>
                  <div className="text-foreground/75 tabular-nums">0.42</div>
                  <div className="tracking-wider uppercase">μ-radiance</div>
                </div>
                <div>
                  <div className="text-foreground/75 tabular-nums">0.18</div>
                  <div className="tracking-wider uppercase">σ</div>
                </div>
                <div>
                  <div className="text-foreground/75 tabular-nums">94.6%</div>
                  <div className="tracking-wider uppercase">retention</div>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-border/60 px-5 py-5 text-[13px] leading-relaxed text-foreground/80 bg-[oklch(0.12_0.014_35)]/60">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] uppercase text-urucum mb-3">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="0.8" />
                  <circle cx="7" cy="7" r="2" fill="currentColor" />
                  <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.5" />
                </svg>
                nota técnica
              </div>
              <p>
                A mesma cena, sob diferentes níveis de exposição, produz distribuições de
                intensidade distintas. Isso altera{" "}
                <span className="text-foreground">textura, contraste, detalhe</span> e a
                informação disponível para modelos de IA — antes mesmo de qualquer treino.
              </p>
            </div>
          </aside>
        </div>

        {/* footer caption */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[10.5px] font-mono tracking-[0.18em] uppercase text-muted-foreground/70 border-t border-border/50 pt-5">
          <span>
            EV (Exposure Value) — medida da quantidade de luz que chega ao sensor.
          </span>
          <span className="text-urucum/80">URUCUM · capture · v0.3</span>
        </div>
      </div>
    </section>
  );
}

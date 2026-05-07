import { useMemo, useState } from "react";
import faceDeep from "@/assets/face-deep.jpg";
import faceMediumDark from "@/assets/face-mediumdark.jpg";
import faceMedium from "@/assets/face-medium.jpg";
import faceLight from "@/assets/face-light.jpg";

const TONES = [
  { label: "Pele profunda", sub: "deep", src: faceDeep, bias: -0.14 },
  { label: "Pele médio-escura", sub: "medium-deep", src: faceMediumDark, bias: -0.06 },
  { label: "Pele média", sub: "medium", src: faceMedium, bias: 0.0 },
  { label: "Pele clara", sub: "light", src: faceLight, bias: 0.08 },
];

const EVS = [
  { ev: -2, label: "Subexposta", b: 0.42, c: 1.18, s: 1.1 },
  { ev: -1, label: "Levemente −", b: 0.72, c: 1.08, s: 1.05 },
  { ev: 0, label: "Balanceada", b: 1.0, c: 1.0, s: 1.0 },
  { ev: 1, label: "Levemente +", b: 1.22, c: 0.92, s: 0.95 },
  { ev: 2, label: "Superexposta", b: 1.55, c: 0.78, s: 0.85 },
];

function evFilter(b: number, c: number, s: number, bias: number) {
  const brightness = Math.max(
    0.18,
    b <= 1 ? b * (1 + bias * 1.4) : b * (1 - Math.max(0, -bias) * 0.6),
  );
  return `brightness(${brightness.toFixed(3)}) contrast(${c}) saturate(${s})`;
}

/** Compute radiance metrics that respond to tone × EV. */
function metrics(toneIdx: number, evIdx: number) {
  const tone = TONES[toneIdx];
  const ev = EVS[evIdx];
  const base = 0.55 + tone.bias * 1.6 + (ev.b - 1) * 0.45;
  const mu = Math.max(0.05, Math.min(0.98, base));
  const sigma = Math.max(0.04, 0.22 - Math.abs(ev.ev) * 0.025 + Math.abs(tone.bias) * 0.3);
  // retention drops at extreme EVs and for darker tones at low EV
  const extreme = Math.abs(ev.ev) / 2;
  const retention = Math.max(
    32,
    Math.min(99.6, 99 - extreme * 22 - (ev.ev < 0 ? Math.max(0, -tone.bias) * 180 : 0) -
      (ev.ev > 0 ? Math.max(0, tone.bias) * 80 : 0)),
  );
  return { mu, sigma, retention };
}

/** Procedural radiance heatmap rendered as SVG — reacts to tone × EV. */
function RadianceMap({ toneIdx, evIdx }: { toneIdx: number; evIdx: number }) {
  const tone = TONES[toneIdx];
  const ev = EVS[evIdx];
  // intensity center derived from exposure & tone bias
  const intensity = Math.max(0, Math.min(1, 0.55 + tone.bias * 1.4 + (ev.b - 1) * 0.5));
  // contrast spread between hot & cold zones
  const spread = 0.25 + Math.abs(ev.ev) * 0.08 - tone.bias * 0.3;

  const stops = useMemo(() => {
    // 5-stop pseudo-color: blue → cyan → green → yellow → red
    // shift palette based on intensity (low intensity = mostly blue/green; high = yellow/red)
    const shift = (intensity - 0.5) * 0.6; // -0.3 .. 0.3
    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
    return [
      { o: clamp01(0.0 - shift), c: "oklch(0.32 0.16 260)" }, // deep blue
      { o: clamp01(0.28 - shift), c: "oklch(0.55 0.16 220)" }, // cyan
      { o: clamp01(0.52 - shift), c: "oklch(0.78 0.18 140)" }, // green
      { o: clamp01(0.74 - shift), c: "oklch(0.82 0.18 80)" }, // yellow
      { o: clamp01(1.0 - shift), c: "oklch(0.62 0.22 30)" }, // red
    ].sort((a, b) => a.o - b.o);
  }, [intensity]);

  // pseudo facial regions: forehead, cheeks, nose, mouth, chin, neck
  const regions = [
    { cx: 50, cy: 26, rx: 24, ry: 14, w: 1.0 }, // forehead
    { cx: 32, cy: 48, rx: 12, ry: 10, w: 1.05 }, // L cheek
    { cx: 68, cy: 48, rx: 12, ry: 10, w: 1.05 }, // R cheek
    { cx: 50, cy: 50, rx: 6, ry: 14, w: 1.15 }, // nose ridge
    { cx: 50, cy: 70, rx: 11, ry: 5, w: 0.95 }, // mouth
    { cx: 50, cy: 82, rx: 14, ry: 8, w: 0.85 }, // chin
  ];

  return (
    <svg viewBox="0 0 100 125" className="absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id="rad-base" cx="50%" cy="48%" r="60%">
          {stops.map((s, i) => (
            <stop key={i} offset={`${(s.o * 100).toFixed(1)}%`} stopColor={s.c} />
          ))}
        </radialGradient>
        <radialGradient id="rad-hot" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="oklch(0.85 0.2 60 / 0.9)" />
          <stop offset="60%" stopColor="oklch(0.6 0.2 30 / 0.0)" />
        </radialGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="1.6" /></filter>
      </defs>
      {/* base black */}
      <rect width="100" height="125" fill="black" />
      {/* head silhouette gradient ellipse */}
      <ellipse cx="50" cy="55" rx="34" ry="46" fill="url(#rad-base)" filter="url(#blur)" />
      {/* hot regions accentuating skin response */}
      {regions.map((r, i) => (
        <ellipse
          key={i}
          cx={r.cx}
          cy={r.cy}
          rx={r.rx * (1 + spread * 0.2)}
          ry={r.ry * (1 + spread * 0.2)}
          fill="url(#rad-hot)"
          opacity={Math.max(0.15, Math.min(0.95, r.w * intensity))}
          filter="url(#blur)"
        />
      ))}
      {/* dark vignette for clipped low-EV cases */}
      {ev.ev < 0 && (
        <rect
          width="100"
          height="125"
          fill="black"
          opacity={Math.min(0.7, Math.abs(ev.ev) * 0.25 + Math.max(0, -tone.bias) * 1.2)}
        />
      )}
      {/* highlight clip wash */}
      {ev.ev > 1 && (
        <rect width="100" height="125" fill="oklch(0.95 0.08 80)" opacity={0.18} />
      )}
    </svg>
  );
}

export function ExposureMatrix() {
  const [toneIdx, setToneIdx] = useState(0); // pele profunda by default
  const [evIdx, setEvIdx] = useState(2); // 0 EV

  const tone = TONES[toneIdx];
  const ev = EVS[evIdx];
  const m = metrics(toneIdx, evIdx);

  return (
    <section
      id="exposicao"
      className="relative w-full py-32 md:py-40 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 10%, oklch(0.18 0.03 30 / 0.55), transparent 60%), radial-gradient(ellipse at 90% 90%, oklch(0.22 0.06 25 / 0.4), transparent 70%), oklch(0.09 0.012 35)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.04 70 / 0.25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.04 70 / 0.25) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute -left-40 top-1/2 w-[40rem] h-[40rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.18 35 / 0.10), transparent 70%)" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <header className="reveal grid lg:grid-cols-12 gap-8 mb-14">
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
              para todos os tons de pele. Mexa nos controles abaixo para observar como a
              captura — e os dados resultantes — mudam.
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

        {/* Controls */}
        <div className="reveal grid md:grid-cols-2 gap-4 mb-6">
          {/* Tone selector */}
          <div className="rounded-sm border border-border/60 bg-[oklch(0.11_0.012_35)]/80 backdrop-blur p-4">
            <div className="flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              <span>tom de pele · subject</span>
              <span className="text-urucum">{tone.sub}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {TONES.map((t, i) => {
                const active = i === toneIdx;
                return (
                  <button
                    key={t.sub}
                    onClick={() => setToneIdx(i)}
                    className={`group relative aspect-square overflow-hidden border transition-all ${
                      active
                        ? "border-urucum"
                        : "border-border/60 hover:border-foreground/40"
                    }`}
                    style={
                      active
                        ? { boxShadow: "0 0 0 1px oklch(0.62 0.21 32 / 0.5), 0 10px 30px -10px oklch(0.55 0.18 35 / 0.4)" }
                        : undefined
                    }
                  >
                    <img src={t.src} alt={t.label} loading="lazy" className="w-full h-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 px-1.5 py-1 bg-gradient-to-t from-black/85 to-transparent text-[9.5px] font-mono uppercase tracking-wider text-foreground/85 text-left">
                      {t.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* EV slider */}
          <div className="rounded-sm border border-border/60 bg-[oklch(0.11_0.012_35)]/80 backdrop-blur p-4">
            <div className="flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              <span>nível de exposição · ev</span>
              <span className="text-urucum tabular-nums">
                {ev.ev > 0 ? "+" : ev.ev < 0 ? "−" : ""}
                {Math.abs(ev.ev)} EV · {ev.label}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={EVS.length - 1}
              step={1}
              value={evIdx}
              onChange={(e) => setEvIdx(Number(e.target.value))}
              className="w-full accent-[oklch(0.62_0.21_32)] cursor-pointer"
            />
            <div className="mt-2 grid grid-cols-5 text-[10px] font-mono tracking-wider text-muted-foreground/70">
              {EVS.map((e, i) => (
                <button
                  key={e.ev}
                  onClick={() => setEvIdx(i)}
                  className={`text-center hover:text-foreground transition-colors ${
                    i === evIdx ? "text-urucum" : ""
                  }`}
                >
                  {e.ev > 0 ? `+${e.ev}` : e.ev}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT — live face */}
          <div className="lg:col-span-7 reveal">
            <div
              className="relative rounded-sm border border-border/60 bg-[oklch(0.11_0.012_35)]/80 backdrop-blur"
              style={{ boxShadow: "0 30px 80px -30px oklch(0 0 0 / 0.7)" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 text-[10px] font-mono tracking-[0.22em] uppercase text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-urucum animate-pulse" />
                  capture · live preview
                </span>
                <span>fig. 03 — tone × ev</span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={tone.src}
                  alt={`${tone.label} a ${ev.ev} EV`}
                  className="w-full h-full object-cover transition-[filter] duration-500"
                  style={{ filter: evFilter(ev.b, ev.c, ev.s, tone.bias) }}
                  width={1024}
                  height={1280}
                />
                {/* HUD */}
                <div className="absolute inset-x-3 top-3 flex items-center justify-between text-[10px] font-mono tracking-wider text-foreground/70">
                  <span>● REC · {tone.sub.toUpperCase()}</span>
                  <span className="tabular-nums">
                    EV {ev.ev >= 0 ? `+${ev.ev}` : ev.ev}.0
                  </span>
                </div>
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] font-mono tracking-wider text-foreground/70">
                  <span>1024×1280 · RAW</span>
                  <span className="text-urucum">{ev.label}</span>
                </div>
                {["top-2 left-2","top-2 right-2","bottom-2 left-2","bottom-2 right-2"].map((p) => (
                  <span key={p} className={`absolute ${p} w-3 h-3 border border-foreground/35`} />
                ))}
              </div>
              <div className="border-t border-border/60 px-4 py-3 grid grid-cols-3 gap-2 text-[10px] font-mono text-muted-foreground/80">
                <div>
                  <div className="text-foreground/80 tabular-nums">{m.mu.toFixed(2)}</div>
                  <div className="tracking-wider uppercase">μ-radiance</div>
                </div>
                <div>
                  <div className="text-foreground/80 tabular-nums">{m.sigma.toFixed(2)}</div>
                  <div className="tracking-wider uppercase">σ</div>
                </div>
                <div>
                  <div
                    className="tabular-nums"
                    style={{
                      color:
                        m.retention > 80
                          ? "oklch(0.82 0.14 140)"
                          : m.retention > 55
                            ? "oklch(0.82 0.18 80)"
                            : "oklch(0.62 0.22 30)",
                    }}
                  >
                    {m.retention.toFixed(1)}%
                  </div>
                  <div className="tracking-wider uppercase">retention</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — radiance map */}
          <aside className="lg:col-span-5 reveal space-y-5">
            <div
              className="relative rounded-sm border border-border/60 bg-[oklch(0.11_0.012_35)]/80 backdrop-blur"
              style={{ boxShadow: "0 30px 80px -30px oklch(0 0 0 / 0.7)" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 text-[10px] font-mono tracking-[0.22em] uppercase text-muted-foreground">
                <span>radiância · pseudo-color</span>
                <span>λ 380–780nm</span>
              </div>
              <div className="px-4 py-4">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-muted-foreground/80 mb-2">
                  Mapa de intensidade
                </div>
                <div className="text-[11px] text-foreground/80 mb-4">
                  {tone.label} — {ev.ev >= 0 ? `+${ev.ev}` : ev.ev} EV · {ev.label.toLowerCase()}
                </div>
                <div className="relative flex gap-3">
                  <div className="relative flex-1 aspect-[4/5] overflow-hidden bg-black border border-[oklch(0.2_0.02_40_/_0.5)]">
                    <RadianceMap toneIdx={toneIdx} evIdx={evIdx} />
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="50" y1="0" x2="50" y2="100" stroke="oklch(0.96 0.02 80 / 0.18)" strokeDasharray="1 2" strokeWidth="0.2" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="oklch(0.96 0.02 80 / 0.18)" strokeDasharray="1 2" strokeWidth="0.2" />
                    </svg>
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-mono tracking-wider text-foreground/65">
                      RAD · {ev.ev >= 0 ? `+${ev.ev}` : ev.ev}EV
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 text-[9px] font-mono tracking-wider text-foreground/65">
                      640×800
                    </span>
                  </div>
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

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[10.5px] font-mono tracking-[0.18em] uppercase text-muted-foreground/70 border-t border-border/50 pt-5">
          <span>EV (Exposure Value) — medida da quantidade de luz que chega ao sensor.</span>
          <span className="text-urucum/80">URUCUM · capture · v0.3</span>
        </div>
      </div>
    </section>
  );
}

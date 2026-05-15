import { useEffect, useState } from "react";
import faceDeep from "@/assets/face-deep.jpg";
import faceMediumDark from "@/assets/face-mediumdark.jpg";
import faceMedium from "@/assets/face-medium.jpg";

const captures = [
  { src: faceDeep,       state: "LOW-LIGHT",     ev: "−1.7 EV", frame: "0421" },
  { src: faceMediumDark, state: "BALANCED",      ev: " 0.0 EV", frame: "0422" },
  { src: faceMedium,     state: "UNDEREXPOSED",  ev: "−0.8 EV", frame: "0423" },
];

export function Hero() {
  const [stage, setStage] = useState(0);
  const [cap, setCap] = useState(0);

  // Doherty: entrada rápida e progressiva (<400ms para sentir instantâneo)
  useEffect(() => {
    const t = [80, 220, 380, 540].map((d, i) =>
      setTimeout(() => setStage((s) => Math.max(s, i + 1)), d),
    );
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setCap((c) => (c + 1) % captures.length),
      4600,
    );
    return () => clearInterval(id);
  }, []);

  const current = captures[cap];

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px 700px at 78% 38%, oklch(0.32 0.14 28 / 0.55), transparent 60%)," +
          "radial-gradient(900px 600px at 12% 82%, oklch(0.20 0.06 25 / 0.55), transparent 65%)," +
          "linear-gradient(180deg, oklch(0.115 0.014 38), oklch(0.085 0.010 32))",
      }}
    >
      {/* deep red horizon glow */}
      <div
        className="absolute -right-[20%] top-[10%] w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px] pointer-events-none animate-breathe"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 25 / 0.28), oklch(0.30 0.12 26 / 0.10) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 50%, oklch(0.06 0.008 30 / 0.85) 100%)",
        }}
      />
      {/* sensor grain */}
      <div className="absolute inset-0 grain-fine pointer-events-none" />

      {/* CONTENT */}
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 pt-32 lg:pt-36 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-screen">
        {/* LEFT — bloco de texto coeso (Lei da Proximidade) */}
        <div className="lg:col-span-7 relative">
          {/* eyebrow */}
          <div
            className={`flex items-center gap-3 transition-all duration-500 ${
              stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.62 0.24 26)",
                boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
              }}
            />
            <span className="text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55">
              Vision Infrastructure
            </span>
          </div>

          {/* headline + sub + CTA — agrupados (proximidade) */}
          <div className="mt-5 space-y-5">
            <h1
              className={`font-serif font-light text-[44px] md:text-[64px] lg:text-[76px] leading-[1.0] tracking-[-0.025em] text-foreground/95 max-w-[15ch] transition-all duration-700 ${
                stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Visão computacional que{" "}
              <span
                className="italic"
                style={{
                  color: "oklch(0.66 0.24 28)",
                  textShadow: "0 0 32px oklch(0.55 0.22 25 / 0.45)",
                }}
              >
                enxerga todo mundo.
              </span>
            </h1>

            <p
              className={`max-w-[46ch] text-[14.5px] md:text-[15.5px] leading-[1.65] text-foreground/60 transition-opacity duration-700 ${
                stage >= 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              Infraestrutura de captura sintética calibrada por fototipo,
              exposição e iluminação — para modelos que falham menos em pele
              negra, baixa luz e cenários reais.
            </p>

            {/* CTAs — Lei da Similaridade: mesma altura, radius, tracking, padding */}
            <div
              className={`pt-2 flex flex-wrap items-center gap-3 transition-all duration-700 ${
                stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <a
                href="#produto"
                className="group relative inline-flex items-center gap-3 h-12 px-6 rounded-[3px] text-[12.5px] tracking-[0.14em] uppercase font-medium text-[oklch(0.97_0.02_80)] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.58 0.23 26), oklch(0.42 0.19 24))",
                  boxShadow:
                    "0 1px 0 oklch(0.78 0.18 30 / 0.45) inset, 0 0 0 1px oklch(0.32 0.14 24 / 0.6), 0 14px 38px -12px oklch(0.50 0.22 25 / 0.7)",
                }}
              >
                <span className="relative z-10">Falar com a equipe</span>
                <span className="relative z-10 text-base leading-none transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.66 0.24 28), oklch(0.48 0.21 24))",
                  }}
                />
              </a>
              <a
                href="/solucoes"
                className="inline-flex items-center gap-2.5 h-12 px-6 rounded-[3px] text-[12.5px] tracking-[0.14em] uppercase font-medium text-foreground/75 hover:text-foreground/95 transition-colors duration-300"
                style={{
                  border: "1px solid oklch(0.55 0.18 35 / 0.28)",
                  background: "oklch(0.14 0.018 40 / 0.5)",
                  backdropFilter: "blur(4px)",
                }}
              >
                Ver soluções
                <span className="text-base leading-none">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — peak moment: portrait + scanline */}
        <div
          className={`lg:col-span-5 relative transition-all duration-700 delay-150 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div
            className="relative aspect-square w-full max-w-[460px] mx-auto"
            style={{ filter: "drop-shadow(0 40px 90px oklch(0 0 0 / 0.7))" }}
          >
            {/* orbital rings */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none animate-[spin_80s_linear_infinite]"
              style={{ border: "1px dashed oklch(0.55 0.18 35 / 0.14)", transform: "scale(1.12)" }}
            />
            <div
              className="absolute inset-0 rounded-full pointer-events-none animate-[spin_120s_linear_infinite_reverse]"
              style={{ border: "1px solid oklch(0.55 0.18 35 / 0.08)", transform: "scale(1.20)" }}
            />

            {/* portrait disc */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.14 0.018 35) 0%, oklch(0.085 0.010 32) 75%)",
                boxShadow:
                  "inset 0 0 90px 20px oklch(0.06 0.008 30 / 0.95), 0 0 0 1px oklch(0.55 0.18 35 / 0.18)",
              }}
            >
              {captures.map((c, i) => (
                <img
                  key={i}
                  src={c.src}
                  alt={`Captura técnica — ${c.state.toLowerCase()}`}
                  className={`absolute inset-0 w-full h-full object-cover animate-ev transition-opacity duration-[1600ms] ease-out ${
                    i === cap ? "opacity-[0.78]" : "opacity-0"
                  }`}
                  style={{
                    filter: "contrast(0.95) saturate(0.78) brightness(0.92)",
                    maskImage:
                      "radial-gradient(circle at 50% 48%, black 38%, transparent 78%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 48%, black 38%, transparent 78%)",
                  }}
                  width={1024}
                  height={1024}
                  loading="eager"
                />
              ))}

              {/* warm glow + outer fade */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 80%, oklch(0.50 0.20 26 / 0.18), transparent 55%)," +
                    "radial-gradient(circle at 50% 50%, transparent 44%, oklch(0.06 0.008 30 / 0.92) 80%)",
                }}
              />

              {/* CV overlays — bbox + landmarks */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <g stroke="oklch(0.72 0.22 28)" fill="none">
                  <rect x="32" y="26" width="36" height="46" strokeWidth="0.18" opacity="0.55" />
                  <path d="M30 26 L30 32 M30 26 L36 26" strokeWidth="0.5" />
                  <path d="M70 26 L70 32 M70 26 L64 26" strokeWidth="0.5" />
                  <path d="M30 72 L30 66 M30 72 L36 72" strokeWidth="0.5" />
                  <path d="M70 72 L70 66 M70 72 L64 72" strokeWidth="0.5" />
                </g>
                <g fill="oklch(0.78 0.22 28)">
                  {[
                    [40, 42],[60, 42],[50, 50],[44, 56],[56, 56],[50, 60],
                    [38, 38],[42, 36],[46, 36],[54, 36],[58, 36],[62, 38],
                    [42, 64],[46, 66],[50, 67],[54, 66],[58, 64],
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="0.55" />
                  ))}
                </g>
              </svg>

              {/* scanline */}
              <div
                className="absolute left-0 right-0 h-px pointer-events-none animate-scan"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.72 0.20 28 / 0.7), transparent)",
                  boxShadow: "0 0 18px oklch(0.62 0.24 26 / 0.7)",
                }}
              />
            </div>

            {/* HUD único — bottom: STATE / MODEL / EV (Miller: 1 painel só) */}
            <div
              className="absolute -bottom-2 inset-x-0 font-mono text-[9px] tracking-[0.28em] uppercase pointer-events-none px-3 py-2.5"
              style={{
                background: "oklch(0.10 0.012 35 / 0.85)",
                border: "1px solid oklch(0.55 0.18 35 / 0.22)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <div className="text-foreground/40">state</div>
                  <div key={cap} className="text-foreground/90 animate-fade-in">
                    {current.state}
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-foreground/40">model</div>
                  <div className="text-[oklch(0.78_0.20_28)]">urucum-vision · v4</div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-foreground/40">ev · frame</div>
                  <div key={`ev-${cap}`} className="text-foreground/90 tabular-nums animate-fade-in">
                    {current.ev} · #{current.frame}
                  </div>
                </div>
              </div>

              {/* exposure bar */}
              <div className="mt-2.5 relative h-px w-full bg-foreground/15">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-1000"
                  style={{
                    left: `${[18, 50, 36][cap]}%`,
                    background: "oklch(0.72 0.20 28)",
                    boxShadow: "0 0 10px oklch(0.62 0.24 26 / 0.9)",
                  }}
                />
              </div>
            </div>

            {/* HUD REC — top right (único acento secundário) */}
            <div className="absolute -top-2 right-0 flex items-center gap-1.5 text-[9px] font-mono tracking-[0.32em] uppercase text-[oklch(0.68_0.26_27)] pointer-events-none">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[oklch(0.62_0.26_27)] animate-breathe"
                style={{ boxShadow: "0 0 8px oklch(0.62 0.26 27 / 0.9)" }}
              />
              REC · LIVE
            </div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[9.5px] font-mono tracking-[0.36em] text-foreground/40 uppercase">
        <span>scroll</span>
        <span className="w-px h-6 bg-foreground/25 animate-breathe" />
      </div>
    </section>
  );
}

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

  useEffect(() => {
    const t = [200, 700, 1400, 2100, 2800].map((d, i) =>
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
      {/* layer 1 — deep red horizon glow (breathing) */}
      <div
        className="absolute -right-[20%] top-[10%] w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px] pointer-events-none animate-breathe"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 25 / 0.28), oklch(0.30 0.12 26 / 0.10) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* layer 2 — optical curve (lens / exposure curve) — constrained to right column, never crosses text */}
      <svg
        className="hidden lg:block absolute -right-[14%] top-[6%] w-[58vw] h-[58vw] max-w-[820px] max-h-[820px] pointer-events-none animate-drift opacity-[0.55] mix-blend-screen"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden
      >
        <defs>
          <radialGradient id="lensFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="oklch(0.62 0.24 26 / 0.28)" />
            <stop offset="55%"  stopColor="oklch(0.32 0.14 26 / 0.14)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="lensRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="oklch(0.72 0.22 28 / 0.55)" />
            <stop offset="50%"  stopColor="oklch(0.50 0.20 26 / 0.20)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <mask id="lensCut">
            <rect width="600" height="600" fill="white" />
            <circle cx="380" cy="270" r="240" fill="black" />
          </mask>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        <circle cx="300" cy="300" r="262" fill="url(#lensFill)" mask="url(#lensCut)" filter="url(#softBlur)" />
        <circle cx="300" cy="300" r="262" fill="none" stroke="url(#lensRim)" strokeWidth="0.6" mask="url(#lensCut)" />
        <circle cx="300" cy="300" r="248" fill="none" stroke="oklch(0.55 0.20 26 / 0.18)" strokeWidth="0.3" mask="url(#lensCut)" strokeDasharray="0.6 2.2" />
      </svg>

      {/* layer 3 — vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 50%, oklch(0.06 0.008 30 / 0.85) 100%)",
        }}
      />

      {/* layer 4 — sensor grain (animated, very fine) */}
      <div className="absolute inset-0 grain-fine pointer-events-none" />

      {/* CONTENT */}
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 pt-32 lg:pt-36 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-screen">
        {/* LEFT — text */}
        <div className="lg:col-span-7 relative">
          {/* label block */}
          <div
            className={`transition-all duration-700 ${stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            <div className="flex items-center gap-3">
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
              <span className="hidden md:inline text-[10.5px] font-mono tracking-[0.36em] uppercase text-foreground/30">
                · 001
              </span>
            </div>
            <p className="mt-7 font-serif text-xl md:text-[22px] text-foreground/75 leading-snug max-w-md">
              Nós não geramos imagens.
            </p>
          </div>

          {/* headline */}
          <h1
            className={`mt-9 font-serif font-light text-[44px] md:text-[64px] lg:text-[78px] leading-[0.98] tracking-[-0.025em] text-foreground/95 max-w-[14ch] transition-all duration-1000 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Controlamos como o<br />
            mundo aparece nos{" "}
            <span
              className="italic"
              style={{
                color: "oklch(0.66 0.24 28)",
                textShadow:
                  "0 0 32px oklch(0.55 0.22 25 / 0.55), 0 1px 0 oklch(0 0 0 / 0.4)",
              }}
            >
              dados.
            </span>
          </h1>

          {/* sub */}
          <p
            className={`mt-9 max-w-[42ch] text-[14.5px] md:text-[15.5px] leading-[1.7] text-foreground/60 transition-opacity duration-1000 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
          >
            Infraestrutura para geração e modelagem de datasets visuais com
            controle programável de tons de pele, iluminação, exposição e
            contexto.
          </p>

          {/* buttons */}
          <div
            className={`mt-10 flex flex-wrap items-center gap-3 transition-all duration-1000 ${
              stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href="#produto"
              className="group relative inline-flex items-center gap-3 text-[13px] tracking-[0.08em] uppercase font-medium px-6 py-3.5 rounded-[3px] text-[oklch(0.97_0.02_80)] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.58 0.23 26), oklch(0.42 0.19 24))",
                boxShadow:
                  "0 1px 0 oklch(0.78 0.18 30 / 0.45) inset, 0 0 0 1px oklch(0.32 0.14 24 / 0.6), 0 14px 38px -12px oklch(0.50 0.22 25 / 0.7)",
              }}
            >
              <span className="relative z-10">Explorar plataforma</span>
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
              href="#documentacao"
              className="inline-flex items-center gap-2.5 text-[12.5px] tracking-[0.16em] uppercase font-mono px-5 py-3.5 rounded-[3px] text-foreground/70 hover:text-foreground/95 transition-colors duration-300"
              style={{
                border: "1px solid oklch(0.55 0.18 35 / 0.22)",
                background: "oklch(0.14 0.018 40 / 0.4)",
                backdropFilter: "blur(4px)",
              }}
            >
              <span className="w-1 h-1 rounded-full bg-foreground/40" />
              Ver documentação
            </a>
          </div>

          {/* tiny technical line */}
          <div
            className={`mt-12 flex items-center gap-5 text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/35 transition-opacity duration-1000 ${
              stage >= 5 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>BT.709</span>
            <span className="w-px h-3 bg-foreground/20" />
            <span>EV −2.0 → +2.0</span>
            <span className="w-px h-3 bg-foreground/20" />
            <span>FRAME · VARIABLE</span>
          </div>
        </div>

        {/* RIGHT — capture panel */}
        <div
          className={`lg:col-span-5 relative transition-all duration-1000 delay-200 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div
            className="relative aspect-[3/4] w-full max-w-[420px] mx-auto rounded-[2px] overflow-hidden"
            style={{
              background: "oklch(0.10 0.012 35)",
              boxShadow:
                "0 0 0 1px oklch(0.55 0.18 35 / 0.18), 0 40px 100px -30px oklch(0 0 0 / 0.85), 0 0 80px -20px oklch(0.50 0.22 25 / 0.25)",
            }}
          >
            {/* portraits stack — fade between */}
            {captures.map((c, i) => (
              <img
                key={i}
                src={c.src}
                alt={`Captura técnica — ${c.state.toLowerCase()}`}
                className={`absolute inset-0 w-full h-full object-cover animate-ev transition-opacity duration-[1400ms] ease-out ${
                  i === cap ? "opacity-100" : "opacity-0"
                }`}
                width={1024}
                height={1024}
                loading="eager"
              />
            ))}

            {/* dim vignette inside frame */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 55%, transparent 45%, oklch(0.06 0.008 30 / 0.75))",
              }}
            />

            {/* scanline */}
            <div
              className="absolute left-0 right-0 h-px pointer-events-none animate-scan"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.72 0.20 28 / 0.55), transparent)",
                boxShadow: "0 0 14px oklch(0.62 0.24 26 / 0.7)",
              }}
            />

            {/* corner brackets */}
            {[
              "top-3 left-3 border-l border-t",
              "top-3 right-3 border-r border-t",
              "bottom-3 left-3 border-l border-b",
              "bottom-3 right-3 border-r border-b",
            ].map((pos, i) => (
              <span
                key={i}
                className={`absolute ${pos} w-3 h-3 pointer-events-none`}
                style={{ borderColor: "oklch(0.78 0.18 30 / 0.55)" }}
              />
            ))}

            {/* HUD top */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[9.5px] font-mono tracking-[0.28em] uppercase pointer-events-none">
              <span className="flex items-center gap-1.5 text-[oklch(0.68_0.26_27)]">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[oklch(0.62_0.26_27)] animate-breathe"
                  style={{ boxShadow: "0 0 8px oklch(0.62 0.26 27 / 0.9)" }}
                />
                REC
              </span>
              <span className="text-foreground/55">CAPTURE · LOOP</span>
            </div>

            {/* HUD bottom */}
            <div className="absolute bottom-3 inset-x-3 pointer-events-none">
              <div className="flex items-end justify-between text-[9.5px] font-mono tracking-[0.28em] uppercase">
                <div className="space-y-1">
                  <div className="text-foreground/40">STATE</div>
                  <div
                    key={cap}
                    className="text-foreground/90 animate-fade-in"
                  >
                    {current.state}
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-foreground/40">EV · FRAME</div>
                  <div
                    key={`ev-${cap}`}
                    className="text-foreground/90 tabular-nums animate-fade-in"
                  >
                    {current.ev} · #{current.frame}
                  </div>
                </div>
              </div>

              {/* exposure bar */}
              <div className="mt-3 relative h-px w-full bg-foreground/15">
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
          </div>

          {/* side label */}
          <div className="hidden md:flex absolute -right-2 top-0 bottom-0 flex-col items-center justify-between text-[9px] font-mono tracking-[0.34em] uppercase text-foreground/35"
               style={{ writingMode: "vertical-rl" }}>
            <span>fig. 01 · subject deep</span>
            <span>sensor · live</span>
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

import { useEffect, useState } from "react";
import faceDeep from "@/assets/face-deep.jpg";
import { BoundingBox, ConfidenceBar, MonoMeta } from "./optical/primitives";

/**
 * Hero "Detection Attempt"
 * Câmera tentando detectar um rosto. Confidence oscila, bbox se redesenha,
 * status alterna entre TRACKING / LOST. Headline em serif crítica.
 * Microcopy em mono. Nada cyberpunk — frio, instrumental, documental.
 */
export function Hero() {
  const [conf, setConf] = useState(87);
  const [status, setStatus] = useState<"TRACKING" | "LOST" | "LOW CONFIDENCE">(
    "TRACKING",
  );
  const [stage, setStage] = useState(0);

  // staged entrance for the editorial text
  useEffect(() => {
    const t = [120, 280, 460, 640].map((d, i) =>
      window.setTimeout(() => setStage((s) => Math.max(s, i + 1)), d),
    );
    return () => t.forEach(window.clearTimeout);
  }, []);

  // confidence loop — tries to lock, drops, fails
  useEffect(() => {
    const seq: Array<[number, typeof status]> = [
      [87, "TRACKING"],
      [62, "LOW CONFIDENCE"],
      [41, "LOW CONFIDENCE"],
      [31, "LOW CONFIDENCE"],
      [18, "LOST"],
      [22, "LOST"],
      [54, "LOW CONFIDENCE"],
      [73, "TRACKING"],
    ];
    let i = 0;
    const id = window.setInterval(() => {
      const [v, s] = seq[i % seq.length];
      setConf(v);
      setStatus(s);
      i++;
    }, 1700);
    return () => window.clearInterval(id);
  }, []);

  const bboxState =
    status === "LOST" ? "lost" : status === "TRACKING" ? "locked" : "tracking";

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(900px 600px at 80% 30%, oklch(0.18 0.05 28 / 0.55), transparent 65%)," +
          "linear-gradient(180deg, oklch(0.085 0.010 32), oklch(0.06 0.008 30))",
      }}
    >
      {/* faint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px)," +
            "linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 grain-fine pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 lg:pt-32 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-screen">
        {/* LEFT — editorial */}
        <div className="lg:col-span-7 relative">
          {/* eyebrow */}
          <div
            className={`flex items-center gap-3 transition-opacity duration-500 ${
              stage >= 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              className="font-mono text-[10px] tracking-[0.42em] uppercase"
              style={{ color: "var(--ink-dim)" }}
            >
              § 01 / DETECTION ATTEMPT
            </span>
            <span className="h-px flex-1 max-w-[120px]" style={{ background: "var(--grid-line-strong)" }} />
            <span
              className="font-mono text-[10px] tracking-[0.42em] uppercase tabular-nums"
              style={{ color: "var(--signal-hot)" }}
            >
              SIG · {status}
            </span>
          </div>

          {/* headline */}
          <h1
            className={`mt-8 font-serif font-light text-[44px] md:text-[64px] lg:text-[84px] leading-[0.98] tracking-[-0.025em] text-foreground/95 max-w-[16ch] transition-all duration-700 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            O sistema{" "}
            <span className="italic animate-glitch" style={{ color: "var(--signal-hot)" }}>
              não consegue
            </span>{" "}
            <br className="hidden md:block" />
            te reconhecer.
          </h1>

          {/* mono log subtitle */}
          <div
            className={`mt-8 max-w-[58ch] space-y-2 font-mono text-[11.5px] leading-[1.85] tracking-[0.04em] transition-opacity duration-700 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--ink-dim)" }}
          >
            <div>
              <span className="text-foreground/30">&gt;</span>{" "}
              FACIAL_DETECTION_FAILURE · GROUP=FITZPATRICK_V–VI
            </div>
            <div>
              <span className="text-foreground/30">&gt;</span>{" "}
              SKIN_RESPONSE=FAILED · LIGHT_SCORE=LOW · BIAS=COMPOUNDING
            </div>
            <div>
              <span className="text-foreground/30">&gt;</span>{" "}
              URUCUM — infraestrutura de captura sintética calibrada por fototipo,
              exposição e iluminação. Para que o sistema enxergue o que sempre
              ignorou.
            </div>
          </div>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-wrap items-center gap-3 transition-all duration-700 ${
              stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href="#produto"
              className="group inline-flex items-center gap-3 h-11 px-5 font-mono text-[11px] tracking-[0.28em] uppercase clip-notch-sm"
              style={{
                color: "var(--ink)",
                background: "var(--signal-hot)",
                boxShadow: "0 0 0 1px oklch(0.78 0.22 28 / 0.4)",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5"
                style={{ background: "var(--ink)" }}
              />
              View System
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#entenda"
              className="inline-flex items-center gap-3 h-11 px-5 font-mono text-[11px] tracking-[0.28em] uppercase clip-notch-sm"
              style={{
                color: "var(--ink-dim)",
                border: "1px solid var(--grid-line-strong)",
                background: "oklch(0.10 0.012 35 / 0.5)",
              }}
            >
              Read Incident Log
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* RIGHT — detection canvas */}
        <div
          className={`lg:col-span-5 relative transition-all duration-700 delay-200 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div
            className="relative aspect-[4/5] w-full max-w-[440px] mx-auto clip-notch overflow-hidden"
            style={{
              background: "oklch(0.07 0.008 30)",
              border: "1px solid var(--grid-line-strong)",
              boxShadow: "0 60px 120px -30px oklch(0 0 0 / 0.8)",
            }}
          >
            {/* portrait — grayscale, low light */}
            <img
              src={faceDeep}
              alt="Tentativa de detecção facial em pele Fitzpatrick VI sob baixa luz"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "grayscale(0.4) brightness(0.55) contrast(1.15) saturate(0.7)",
              }}
            />

            {/* dark vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, transparent 35%, oklch(0.06 0.008 30 / 0.85) 100%)",
              }}
            />

            {/* sensor noise */}
            <div className="absolute inset-0 grain-fine pointer-events-none" />

            {/* bounding box — centered on face area */}
            <div className="absolute" style={{ inset: "18% 22% 30% 22%" }}>
              <BoundingBox label={status} state={bboxState} />
            </div>

            {/* scanline */}
            <div
              className="absolute left-0 right-0 h-px pointer-events-none animate-scan"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.78 0.10 220 / 0.6), transparent)",
              }}
            />

            {/* top HUD strip */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-3 py-2 font-mono text-[9px] tracking-[0.32em] uppercase"
                 style={{ color: "var(--ink-dim)", background: "oklch(0.06 0.008 30 / 0.5)" }}>
              <span>CAM 01 · IR-OFF</span>
              <span style={{ color: "var(--signal-hot)" }}>
                <span className="inline-block w-1.5 h-1.5 mr-1.5 align-middle animate-live"
                      style={{ background: "currentColor" }} />
                REC
              </span>
            </div>

            {/* bottom HUD — confidence + meta */}
            <div
              className="absolute bottom-0 inset-x-0 p-3 space-y-3"
              style={{
                background:
                  "linear-gradient(180deg, transparent, oklch(0.05 0.008 30 / 0.95))",
              }}
            >
              <ConfidenceBar value={conf} />
              <div className="grid grid-cols-3 gap-3 pt-1">
                <MonoMeta label="EV" value="−1.8" />
                <MonoMeta label="ITA" value="VI" />
                <MonoMeta label="MODEL" value="v4" accent />
              </div>
            </div>
          </div>

          {/* below canvas — incident filename */}
          <div className="mt-3 text-center font-mono text-[9.5px] tracking-[0.36em] uppercase"
               style={{ color: "var(--ink-dim)" }}>
            CAPTURE_URC-2024-0317.raw · 3840×4800 · 12-bit
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.42em] uppercase"
           style={{ color: "var(--ink-dim)" }}>
        SCROLL TO § 02
        <span className="w-px h-8 animate-breathe" style={{ background: "var(--grid-line-strong)" }} />
      </div>
    </section>
  );
}

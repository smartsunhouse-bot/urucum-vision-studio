import { useEffect, useState } from "react";
import faceDeep from "@/assets/face-deep.jpg";
import { BoundingBox, ConfidenceBar, MonoMeta } from "./optical/primitives";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Hero — paleta Urucum.
 */

const techLabels: { label: string; gloss: string }[] = [
  { label: "Radiometria Adaptativa", gloss: "Ajusta a resposta do sensor à luz real da cena antes da imagem virar dado." },
  { label: "Preservação Fotométrica", gloss: "Mantém a fidelidade de brilho, cor e tom ao longo de todo o pipeline visual." },
  { label: "Processamento Local (Edge)", gloss: "Correção acontece no dispositivo, sem enviar imagem crua para a nuvem." },
  { label: "Infraestrutura para Visão Computacional", gloss: "Camada base que sustenta biometria, diagnóstico, vigilância e robótica." },
  { label: "Integração via API", gloss: "Encaixa em qualquer stack de captura, ETL visual ou modelo de IA existente." },
];

export function Hero() {
  const [stage, setStage] = useState(0);
  // 0 = CENA A (falha), 1 = CENA B (reconstrução)
  const [scene, setScene] = useState<0 | 1>(0);
  const [conf, setConf] = useState(31);
  const [status, setStatus] = useState<"TRACKING" | "LOST" | "LOW CONFIDENCE">(
    "LOW CONFIDENCE",
  );

  useEffect(() => {
    const t = [120, 280, 460, 640, 820].map((d, i) =>
      window.setTimeout(() => setStage((s) => Math.max(s, i + 1)), d),
    );
    return () => t.forEach(window.clearTimeout);
  }, []);

  // Loop de 8s entre as duas cenas
  useEffect(() => {
    let raf = 0;
    let start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) % 8000) / 8000; // 0..1 no ciclo
      if (t < 0.5) {
        // CENA A — falha
        setScene(0);
        const sub = t / 0.5; // 0..1
        // confiança oscila baixa
        const seq = [28, 41, 18, 33, 22, 47, 19];
        const idx = Math.floor(sub * seq.length) % seq.length;
        setConf(seq[idx]);
        setStatus(seq[idx] < 25 ? "LOST" : "LOW CONFIDENCE");
      } else {
        // CENA B — reconstrução
        setScene(1);
        const sub = (t - 0.5) / 0.5; // 0..1
        setConf(Math.round(35 + sub * 58)); // 35 → 93
        setStatus(sub > 0.55 ? "TRACKING" : "LOW CONFIDENCE");
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const bboxState =
    status === "LOST" ? "lost" : status === "TRACKING" ? "locked" : "tracking";

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-hero"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-screen">
        {/* LEFT — editorial */}
        <div className="lg:col-span-7 relative">
          <div
            className={`flex items-center gap-3 transition-opacity duration-500 ${
              stage >= 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              className="font-mono text-[10px] tracking-[0.42em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              Infraestrutura de visão
            </span>
            <span
              className="h-px flex-1 max-w-[120px]"
              style={{ background: "var(--border)" }}
            />
          </div>

          <h1
            className={`mt-8 font-serif font-light text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0] tracking-[-0.025em] text-foreground/95 max-w-[22ch] transition-all duration-700 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Se um sistema depende de imagem, ele depende de{" "}
            <span className="italic text-foreground/80">
              como essa imagem foi construída.
            </span>
          </h1>


          <p
            className={`mt-7 max-w-[56ch] text-[15px] md:text-[17px] leading-[1.65] font-light transition-opacity duration-700 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--muted-foreground)" }}
          >
            Infraestrutura para melhorar dados visuais antes que alimentem
            sistemas de visão computacional e inteligência artificial.
          </p>

          {/* Labels técnicos */}
          <div
            className={`mt-8 flex flex-wrap gap-x-5 gap-y-2 transition-opacity duration-700 ${
              stage >= 4 ? "opacity-100" : "opacity-0"
            }`}
          >
            {techLabels.map((item, i) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-[11px] tracking-wide text-foreground/70 hover:text-foreground transition-colors decoration-dotted underline-offset-4 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    aria-label={`${item.label} — definição`}
                  >
                    <span
                      className="inline-block w-1 h-1 rounded-full"
                      style={{
                        background:
                          i % 2 === 0 ? "var(--primary-glow)" : "var(--border)",
                      }}
                    />
                    {item.label}
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[260px] text-[12px] leading-snug">
                  {item.gloss}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-wrap items-center gap-3 transition-all duration-700 ${
              stage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href="#produto"
              className="group inline-flex items-center gap-3 h-12 px-6 font-mono text-[11px] tracking-[0.28em] uppercase rounded-[2px] transition-colors"
              style={{
                color: "var(--foreground)",
                background: "transparent",
                border: "1px solid oklch(0.55 0.10 35 / 0.55)",
              }}
            >
              Ver o produto
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#incidentes"
              className="inline-flex items-center gap-3 h-12 px-6 font-mono text-[11px] tracking-[0.28em] uppercase rounded-[2px] text-foreground/70 hover:text-foreground transition-colors"
            >
              Entenda melhor
              <span>↓</span>
            </a>
          </div>
        </div>


        {/* RIGHT — loop de duas cenas */}
        <div
          className={`lg:col-span-5 relative transition-all duration-700 delay-200 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Scene tag */}
          <div className="flex items-center justify-between mb-3 font-mono text-[9.5px] tracking-[0.32em] uppercase"
               style={{ color: "var(--muted-foreground)" }}>
            <span>
              <span style={{ color: "var(--primary-glow)" }}>● REC</span>
              {"  "}— captura ao vivo
            </span>
            <span key={scene} className="animate-in fade-in duration-500">
              {scene === 0 ? "cena 01 · falha" : "cena 02 · reconstrução"}
            </span>
          </div>

          <div
            className="relative aspect-[4/5] w-full max-w-[440px] mx-auto rounded-[3px] overflow-hidden"
            style={{
              background: "oklch(0.10 0.012 35)",
              border: "1px solid var(--border)",
              boxShadow: "0 60px 120px -30px oklch(0 0 0 / 0.6)",
            }}
          >
            {/* base image — filtro muda por cena */}
            <img
              src={faceDeep}
              alt="Captura facial em pele Fitzpatrick VI"
              className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-[2000ms] ease-out"
              style={{
                filter:
                  scene === 0
                    ? "grayscale(0.45) brightness(0.42) contrast(1.35) saturate(0.55)"
                    : "grayscale(0) brightness(0.92) contrast(1.05) saturate(1.05)",
              }}
            />

            {/* CENA A — clipping/vinheta escura */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-[1800ms]"
              style={{
                opacity: scene === 0 ? 1 : 0,
                background:
                  "radial-gradient(ellipse at 50% 40%, transparent 25%, oklch(0.05 0.008 32 / 0.85) 95%)",
              }}
            />

            {/* CENA A — scanline de exposição instável */}
            {scene === 0 && (
              <div
                className="absolute inset-x-0 h-[2px] pointer-events-none"
                style={{
                  top: "0%",
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.66 0.24 28 / 0.55), transparent)",
                  animation: "scan-a 1.8s linear infinite",
                  boxShadow: "0 0 10px oklch(0.66 0.24 28 / 0.5)",
                }}
              />
            )}

            {/* CENA B — varredura de reconstrução (linha azul-quente) */}
            {scene === 1 && (
              <>
                <div
                  className="absolute inset-x-0 h-[1px] pointer-events-none"
                  style={{
                    top: "0%",
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.78 0.14 75 / 0.85), transparent)",
                    animation: "scan-b 3.4s ease-in-out infinite",
                    boxShadow:
                      "0 0 18px oklch(0.78 0.14 75 / 0.7), 0 4px 30px oklch(0.66 0.24 28 / 0.35)",
                  }}
                />
                {/* grade leve indicando radiance mapping */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(0.78 0.14 75 / 0.18) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.14 75 / 0.18) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
              </>
            )}

            {/* bounding box */}
            <div className="absolute" style={{ inset: "18% 22% 30% 22%" }}>
              <BoundingBox label={status} state={bboxState} />
            </div>

            {/* HUD bottom */}
            <div
              className="absolute bottom-0 inset-x-0 p-3 space-y-3"
              style={{
                background:
                  "linear-gradient(180deg, transparent, oklch(0.08 0.010 32 / 0.95))",
              }}
            >
              <ConfidenceBar value={conf} />
              <div className="grid grid-cols-4 gap-2 pt-1">
                <MonoMeta
                  label="EV"
                  value={scene === 0 ? "−2.4" : "−0.6"}
                />
                <MonoMeta label="ITA" value="VI" />
                <MonoMeta
                  label="PIPE"
                  value={scene === 0 ? "RAW" : "URC"}
                  accent={scene === 1}
                />
                <MonoMeta
                  label="REC"
                  value={scene === 0 ? "OFF" : "ON"}
                  accent={scene === 1}
                />
              </div>
            </div>
          </div>

          {/* legendas das cenas */}
          <div className="mt-3 grid grid-cols-2 gap-3 text-[10px] font-mono tracking-[0.22em] uppercase"
               style={{ color: "var(--muted-foreground)" }}>
            <div
              className="px-3 py-2 rounded-[2px] transition-colors duration-500"
              style={{
                border: "1px solid var(--border)",
                background:
                  scene === 0 ? "oklch(0.20 0.04 30 / 0.55)" : "transparent",
                color: scene === 0 ? "var(--foreground)" : undefined,
              }}
            >
              01 · captura crua
            </div>
            <div
              className="px-3 py-2 rounded-[2px] transition-colors duration-500"
              style={{
                border: "1px solid var(--border)",
                background:
                  scene === 1 ? "oklch(0.20 0.04 30 / 0.55)" : "transparent",
                color: scene === 1 ? "var(--foreground)" : undefined,
              }}
            >
              02 · pipeline urucum
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-a {
          0%   { top: 8%;  opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { top: 92%; opacity: 0; }
        }
        @keyframes scan-b {
          0%   { top: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

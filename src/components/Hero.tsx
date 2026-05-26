import { useEffect, useState } from "react";
import faceDeep from "@/assets/face-deep.jpg";
import { BoundingBox, ConfidenceBar, MonoMeta } from "./optical/primitives";

/**
 * Hero — paleta Urucum (vinho/terracota), sem grid técnico nem scanline global.
 * Headline editorial em português, CTAs em português.
 */
export function Hero() {
  const [conf, setConf] = useState(87);
  const [status, setStatus] = useState<"TRACKING" | "LOST" | "LOW CONFIDENCE">(
    "TRACKING",
  );
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t = [120, 280, 460, 640].map((d, i) =>
      window.setTimeout(() => setStage((s) => Math.max(s, i + 1)), d),
    );
    return () => t.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    const seq: Array<[number, typeof status]> = [
      [87, "TRACKING"],
      [62, "LOW CONFIDENCE"],
      [41, "LOW CONFIDENCE"],
      [31, "LOW CONFIDENCE"],
      [18, "LOST"],
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
      className="relative min-h-screen w-full overflow-hidden bg-hero"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 lg:pt-32 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-screen">
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
            className={`mt-8 font-serif font-light text-[44px] md:text-[64px] lg:text-[84px] leading-[0.98] tracking-[-0.025em] text-foreground/95 max-w-[16ch] transition-all duration-700 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Visão computacional{" "}
            <span className="italic" style={{ color: "var(--primary-glow)" }}>
              que enxerga
            </span>{" "}
            todo mundo.
          </h1>

          <p
            className={`mt-8 max-w-[58ch] text-[15px] md:text-[16px] leading-[1.7] font-light transition-opacity duration-700 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--muted-foreground)" }}
          >
            Infraestrutura de captura sintética calibrada por fototipo,
            iluminação e contexto. A Urucum reduz falhas em pele negra e em
            condições reais — o que sempre foi invisível, agora é mensurável.
          </p>

          {/* CTAs em português */}
          <div
            className={`mt-10 flex flex-wrap items-center gap-3 transition-all duration-700 ${
              stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href="#produto"
              className="group inline-flex items-center gap-3 h-12 px-6 font-mono text-[11px] tracking-[0.28em] uppercase rounded-[2px]"
              style={{
                color: "var(--primary-foreground)",
                background: "var(--primary)",
                boxShadow: "0 14px 40px -12px oklch(0.50 0.22 25 / 0.6)",
              }}
            >
              Ver o produto
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#incidentes"
              className="inline-flex items-center gap-3 h-12 px-6 font-mono text-[11px] tracking-[0.28em] uppercase rounded-[2px] text-foreground/85 hover:text-foreground transition-colors"
              style={{
                border: "1px solid var(--border)",
                background: "oklch(0.18 0.02 40 / 0.5)",
              }}
            >
              Entenda melhor
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
            className="relative aspect-[4/5] w-full max-w-[440px] mx-auto rounded-[3px] overflow-hidden"
            style={{
              background: "oklch(0.10 0.012 35)",
              border: "1px solid var(--border)",
              boxShadow: "0 60px 120px -30px oklch(0 0 0 / 0.6)",
            }}
          >
            <img
              src={faceDeep}
              alt="Detecção facial em pele Fitzpatrick VI"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter:
                  "grayscale(0.2) brightness(0.7) contrast(1.1) saturate(0.85)",
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, transparent 40%, oklch(0.10 0.012 35 / 0.7) 100%)",
              }}
            />

            <div className="absolute" style={{ inset: "18% 22% 30% 22%" }}>
              <BoundingBox label={status} state={bboxState} />
            </div>

            <div
              className="absolute bottom-0 inset-x-0 p-3 space-y-3"
              style={{
                background:
                  "linear-gradient(180deg, transparent, oklch(0.08 0.010 32 / 0.95))",
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
        </div>
      </div>
    </section>
  );
}

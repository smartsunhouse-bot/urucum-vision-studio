import { useEffect, useState } from "react";
import { ProductDevice } from "@/components/hero/ProductDevice";

/**
 * Hero — estética de referência traduzida para a paleta Urucum.
 * Fundo escuro, glow quente, interface real do produto à direita.
 */

export function Hero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t = [120, 320, 520, 720, 920].map((d, i) =>
      window.setTimeout(() => setStage((s) => Math.max(s, i + 1)), d),
    );
    return () => t.forEach(window.clearTimeout);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-background"
      aria-label="Introdução"
    >
      {/* ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none hero-glow"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 75% 45%, oklch(0.48 0.16 28 / 0.28), transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 20% 80%, oklch(0.28 0.08 25 / 0.28), transparent 60%)," +
            "linear-gradient(180deg, oklch(0.13 0.018 40), oklch(0.10 0.012 35))",
        }}
      />

      {/* soft noise grain — microscopic film */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center min-h-screen">
        {/* LEFT — copy */}
        <div className="lg:col-span-5 relative z-10">
          <div
            className={`transition-opacity duration-500 ${
              stage >= 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              className="font-mono text-[11px] tracking-[0.34em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              PELE • IMAGEM • VISÃO COMPUTACIONAL
            </span>
          </div>

          <h1
            className={`mt-6 font-serif font-medium text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.06] tracking-[-0.025em] text-foreground max-w-[18ch] text-balance transition-all duration-700 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Antes de virar dado, a imagem precisa ser confiável.
          </h1>

          <p
            className={`font-editorial mt-5 max-w-[48ch] text-[17px] sm:text-[18px] leading-[1.5] text-pretty transition-opacity duration-700 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
          >
            A Urucum é uma infraestrutura de processamento de imagem que calibra
            e preserva informações visuais antes que elas entrem em sistemas de
            saúde, visão computacional e outras aplicações.
          </p>

          <div
            className={`mt-8 flex flex-col sm:flex-row gap-3 transition-all duration-700 ${
              stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href="#produto"
              className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg text-[14px] font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow:
                  "0 1px 0 oklch(1 0 0 / 0.08) inset, 0 10px 28px -12px oklch(0.55 0.22 25 / 0.55)",
              }}
            >
              Ver a Urucum em ação
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="#api"
              className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-[oklch(0.34_0.02_40)] text-[14px] font-medium tracking-wide text-foreground transition-colors duration-300 hover:bg-[oklch(0.18_0.02_40)] hover:border-[oklch(0.45_0.03_40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="font-mono text-[12px] text-muted-foreground" aria-hidden="true">
                {"</>"}
              </span>
              Integrar via API
            </a>
          </div>

          <p
            className={`mt-6 font-mono text-[11px] tracking-[0.14em] uppercase leading-[1.7] transition-opacity duration-700 ${
              stage >= 5 ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--muted-foreground)" }}
          >
            API REST · Entra no fluxo de imagem que você já usa
          </p>
        </div>

        {/* RIGHT — produto real */}
        <div
          className={`lg:col-span-7 relative transition-all duration-1000 delay-200 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <ProductDevice />
        </div>
      </div>
    </section>
  );
}

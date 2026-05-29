import { useEffect, useState } from "react";
import faceDeep from "@/assets/face-deep.jpg";
import faceMediumDark from "@/assets/face-mediumdark.jpg";

/**
 * Hero — palco cinematográfico inspirado em layouts editoriais premium.
 * Container arredondado único: imagem ocupa o lado direito em altura cheia,
 * mini-cartão de preview flutua no topo-esquerdo, headline editorial
 * grande ancorada no rodapé-esquerdo, CTAs discretos abaixo.
 */

export function Hero() {
  const [scene, setScene] = useState<0 | 1>(0);

  useEffect(() => {
    const id = window.setInterval(() => setScene((s) => (s === 0 ? 1 : 0)), 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative w-full bg-hero overflow-hidden pt-28 lg:pt-32 pb-10"
    >
      <div className="absolute inset-0 grain pointer-events-none opacity-60" />

      <div className="relative max-w-[1320px] mx-auto px-4 lg:px-6">
        {/* PALCO */}
        <div
          className="relative rounded-[32px] overflow-hidden"
          style={{
            background: "oklch(0.11 0.014 35)",
            border: "1px solid oklch(0.55 0.10 35 / 0.18)",
            boxShadow:
              "0 80px 160px -40px oklch(0 0 0 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.05)",
            minHeight: "min(78vh, 720px)",
          }}
        >
          {/* IMAGEM — ocupa o palco inteiro, com gradiente que escurece a esquerda */}
          <div className="absolute inset-0">
            <img
              src={faceDeep}
              alt="Captura facial em pele Fitzpatrick VI"
              className="absolute inset-0 w-full h-full object-cover transition-[filter,opacity] duration-[1800ms] ease-out"
              style={{
                objectPosition: "70% center",
                filter:
                  scene === 0
                    ? "grayscale(0.5) brightness(0.45) contrast(1.3) saturate(0.55)"
                    : "grayscale(0) brightness(0.95) contrast(1.05) saturate(1.05)",
              }}
            />
            {/* gradiente que esconde a metade esquerda para a tipografia respirar */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.08 0.010 32) 0%, oklch(0.08 0.010 32 / 0.92) 30%, oklch(0.08 0.010 32 / 0.55) 50%, transparent 75%)",
              }}
            />
            {/* vinheta inferior */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, oklch(0.06 0.008 32 / 0.7) 100%)",
              }}
            />
          </div>

          {/* MINI-CARTÃO — preview flutuante (topo esquerdo) */}
          <div
            className="absolute left-5 top-5 lg:left-7 lg:top-7 w-[230px] rounded-[18px] p-2.5 backdrop-blur-xl z-20"
            style={{
              background: "oklch(0.10 0.012 35 / 0.78)",
              border: "1px solid oklch(1 0 0 / 0.10)",
              boxShadow: "0 20px 40px -10px oklch(0 0 0 / 0.6)",
            }}
          >
            <div
              className="relative h-[120px] rounded-[12px] overflow-hidden mb-2.5"
              style={{ background: "oklch(0.08 0.010 32)" }}
            >
              <img
                src={faceMediumDark}
                alt="Registro 0427"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(0.2) contrast(1.05)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, oklch(0 0 0 / 0.6))",
                }}
              />
              <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "oklch(0.66 0.24 28)",
                    boxShadow: "0 0 8px oklch(0.66 0.24 28 / 0.8)",
                  }}
                />
                <span
                  className="font-mono text-[8.5px] tracking-[0.3em] uppercase text-foreground/90"
                >
                  registro · 0427
                </span>
              </div>
            </div>
            <div className="px-1">
              <div className="font-serif text-[13px] leading-tight text-foreground/95">
                Fototipo VI · captura crua
              </div>
              <p
                className="mt-1 text-[10px] leading-[1.5] font-light"
                style={{ color: "var(--muted-foreground)" }}
              >
                Modelo abaixo do limite operacional.
              </p>
            </div>
          </div>

          {/* META top-right */}
          <div className="absolute right-6 top-7 hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.32em] uppercase"
               style={{ color: "var(--muted-foreground)" }}>
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.66 0.24 28)",
                boxShadow: "0 0 8px oklch(0.66 0.24 28 / 0.8)",
              }}
            />
            ao vivo · pipeline {scene === 0 ? "01 · raw" : "02 · urucum"}
          </div>

          {/* HEADLINE — ancorada no rodapé-esquerdo */}
          <div className="relative z-10 h-full min-h-[inherit] flex flex-col justify-end p-6 lg:p-12">
            <div className="max-w-[560px]">
              <h1 className="font-serif font-light text-[30px] md:text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.025em] text-foreground/95">
                Se um sistema depende de imagem,{" "}
                <span className="italic text-foreground/70">
                  ele depende de como ela foi construída.
                </span>
              </h1>

              <p
                className="mt-6 max-w-[44ch] text-[14px] md:text-[15px] leading-[1.6] font-light"
                style={{ color: "var(--muted-foreground)" }}
              >
                Se seu tom não está no dataset, ele não existe no modelo.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#produto"
                  className="group inline-flex items-center gap-3 h-11 px-5 font-mono text-[11px] tracking-[0.28em] uppercase rounded-full transition-colors"
                  style={{
                    color: "var(--foreground)",
                    background: "oklch(0.16 0.02 35 / 0.7)",
                    border: "1px solid oklch(0.55 0.10 35 / 0.45)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Ver o produto
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#incidentes"
                  className="inline-flex items-center gap-3 h-11 px-4 font-mono text-[11px] tracking-[0.28em] uppercase rounded-full text-foreground/65 hover:text-foreground transition-colors"
                >
                  Entenda melhor
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

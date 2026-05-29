import { useEffect, useState } from "react";
import faceDeep from "@/assets/face-deep.jpg";
import { ConfidenceBar, MonoMeta } from "./optical/primitives";

/**
 * Hero — formato cinematográfico:
 * um único "palco" arredondado, com mídia à direita,
 * mini-cartão flutuante (preview de registro) e headline editorial abaixo.
 */

const techLabels = [
  "HDR Reconstruction",
  "Exposure Equalization",
  "Skin-aware Imaging",
];

export function Hero() {
  const [scene, setScene] = useState<0 | 1>(0);
  const [conf, setConf] = useState(31);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) % 8000) / 8000;
      if (t < 0.5) {
        setScene(0);
        const seq = [28, 41, 18, 33, 22, 47, 19];
        setConf(seq[Math.floor((t / 0.5) * seq.length) % seq.length]);
      } else {
        setScene(1);
        setConf(Math.round(35 + ((t - 0.5) / 0.5) * 58));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="top"
      className="relative w-full bg-hero overflow-hidden pt-32 lg:pt-36 pb-20"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-4 lg:px-8">
        {/* Top eyebrow row */}
        <div
          className={`flex items-center justify-between mb-6 transition-opacity duration-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className="font-mono text-[10px] tracking-[0.42em] uppercase"
            style={{ color: "var(--muted-foreground)" }}
          >
            ● ao vivo · infraestrutura de visão
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.42em] uppercase hidden md:inline"
            style={{ color: "var(--muted-foreground)" }}
          >
            urucum / pipeline 02 · reconstrução
          </span>
        </div>

        {/* PALCO — container arredondado */}
        <div
          className={`relative rounded-[28px] overflow-hidden transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            background:
              "linear-gradient(180deg, oklch(0.12 0.014 35) 0%, oklch(0.08 0.010 32) 100%)",
            border: "1px solid oklch(0.55 0.10 35 / 0.18)",
            boxShadow:
              "0 80px 160px -40px oklch(0 0 0 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.04)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            {/* LEFT — texto */}
            <div className="lg:col-span-7 relative p-8 lg:p-14 flex flex-col justify-between">
              {/* labels técnicos no topo */}
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {techLabels.map((label, i) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] uppercase"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <span
                      className="inline-block w-1 h-1 rounded-full"
                      style={{
                        background:
                          i % 2 === 0 ? "var(--primary-glow)" : "var(--border)",
                      }}
                    />
                    {label}
                  </span>
                ))}
              </div>

              {/* headline grande no rodapé do palco */}
              <div className="mt-16 lg:mt-0">
                <h1 className="font-serif font-light text-[42px] md:text-[58px] lg:text-[76px] leading-[0.98] tracking-[-0.025em] text-foreground/95 max-w-[18ch]">
                  Se um sistema depende de imagem,{" "}
                  <span className="italic text-foreground/70">
                    ele depende de como ela foi construída.
                  </span>
                </h1>

                <p
                  className="mt-7 max-w-[48ch] text-[15px] md:text-[16px] leading-[1.6] font-light"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Se seu tom não está no dataset, ele não existe no modelo.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href="#produto"
                    className="group inline-flex items-center gap-3 h-12 px-6 font-mono text-[11px] tracking-[0.28em] uppercase rounded-full transition-colors"
                    style={{
                      color: "var(--foreground)",
                      background: "oklch(0.16 0.02 35 / 0.7)",
                      border: "1px solid oklch(0.55 0.10 35 / 0.45)",
                    }}
                  >
                    Ver o produto
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <a
                    href="#incidentes"
                    className="inline-flex items-center gap-3 h-12 px-5 font-mono text-[11px] tracking-[0.28em] uppercase rounded-full text-foreground/65 hover:text-foreground transition-colors"
                  >
                    Entenda melhor
                    <span>↓</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — mídia + mini-cartão flutuante */}
            <div className="lg:col-span-5 relative min-h-[420px] lg:min-h-full">
              <div className="absolute inset-3 lg:inset-4 rounded-[20px] overflow-hidden">
                <img
                  src={faceDeep}
                  alt="Captura facial em pele Fitzpatrick VI"
                  className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-[2000ms] ease-out"
                  style={{
                    filter:
                      scene === 0
                        ? "grayscale(0.45) brightness(0.45) contrast(1.3) saturate(0.6)"
                        : "grayscale(0) brightness(0.95) contrast(1.05) saturate(1.05)",
                  }}
                />

                {/* vinheta cinematográfica */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 60% 45%, transparent 30%, oklch(0.06 0.008 32 / 0.7) 100%)",
                  }}
                />

                {/* varredura sutil cena B */}
                {scene === 1 && (
                  <div
                    className="absolute inset-x-0 h-px pointer-events-none"
                    style={{
                      top: "0%",
                      background:
                        "linear-gradient(90deg, transparent, oklch(0.78 0.14 75 / 0.8), transparent)",
                      animation: "scan-b 3.4s ease-in-out infinite",
                      boxShadow: "0 0 18px oklch(0.78 0.14 75 / 0.6)",
                    }}
                  />
                )}

                {/* MINI-CARTÃO flutuante — preview de registro */}
                <div
                  className="absolute left-4 top-4 w-[210px] rounded-[14px] p-3 backdrop-blur-xl"
                  style={{
                    background: "oklch(0.10 0.012 35 / 0.78)",
                    border: "1px solid oklch(1 0 0 / 0.08)",
                    boxShadow: "0 20px 40px -10px oklch(0 0 0 / 0.6)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-[8.5px] tracking-[0.3em] uppercase"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      registro · 0427
                    </span>
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "oklch(0.66 0.24 28)",
                        boxShadow: "0 0 8px oklch(0.66 0.24 28 / 0.8)",
                      }}
                    />
                  </div>
                  <div className="font-serif text-[13px] leading-tight text-foreground/95">
                    Fototipo VI · captura crua
                  </div>
                  <p
                    className="mt-1.5 text-[10.5px] leading-[1.5] font-light"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Modelo não reconhece o rosto. Confiança abaixo do limite operacional.
                  </p>
                </div>

                {/* HUD inferior — apenas barra fina */}
                <div
                  className="absolute bottom-0 inset-x-0 p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, oklch(0.06 0.008 32 / 0.92))",
                  }}
                >
                  <ConfidenceBar value={conf} />
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <MonoMeta label="EV" value={scene === 0 ? "−2.4" : "−0.6"} />
                    <MonoMeta label="ITA" value="VI" />
                    <MonoMeta
                      label="PIPE"
                      value={scene === 0 ? "RAW" : "URC"}
                      accent={scene === 1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

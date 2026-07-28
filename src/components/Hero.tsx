import { useEffect, useState } from "react";
import heroOptics from "@/assets/hero-optics.png.asset.json";

/**
 * Hero — estética de referência traduzida para a paleta Urucum.
 * Fundo escuro, glow quente, imagem 3D de infraestrutura óptica à direita.
 */

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 4,
}));

export function Hero() {
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState("");

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
            "radial-gradient(ellipse 70% 60% at 75% 45%, oklch(0.48 0.16 28 / 0.35), transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 20% 80%, oklch(0.28 0.08 25 / 0.28), transparent 60%)," +
            "linear-gradient(180deg, oklch(0.13 0.018 40), oklch(0.10 0.012 35))",
        }}
      />

      {/* fine grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.96 0.005 80 / 0.5) 1px, transparent 1px)," +
            "linear-gradient(90deg, oklch(0.96 0.005 80 / 0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full motion-reduce:opacity-0"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: "oklch(0.78 0.14 65 / 0.55)",
              boxShadow: "0 0 8px oklch(0.78 0.14 65 / 0.45)",
              animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* subtle scanline */}
      <div
        className="absolute inset-x-0 h-[1px] pointer-events-none motion-reduce:hidden"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.14 65 / 0.5), transparent)",
          animation: "scan-sweep 8s linear infinite",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12 pt-32 sm:pt-36 lg:pt-44 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-screen">
        {/* LEFT — copy */}
        <div className="lg:col-span-6 relative z-10">
          <div
            className={`flex items-center gap-3 transition-opacity duration-500 ${
              stage >= 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              className="h-px w-8"
              style={{ background: "oklch(0.55 0.18 35 / 0.6)" }}
            />
            <span
              className="font-mono text-[11px] tracking-[0.34em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              Infraestrutura de visão
            </span>
          </div>

          <h1
            className={`mt-6 sm:mt-8 font-serif font-light text-[34px] sm:text-[46px] md:text-[58px] lg:text-[68px] leading-[1.05] tracking-[-0.025em] text-foreground max-w-[18ch] transition-all duration-700 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Infraestrutura de{" "}
            <span className="italic text-foreground/85">
              visão computacional.
            </span>
          </h1>

          <p
            className={`mt-5 sm:mt-6 max-w-[52ch] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-light transition-opacity duration-700 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--muted-foreground)" }}
          >
            Calibração paramétrica adaptativa direto na captura. Corrigimos viés
            de cor, exposição e textura cutânea antes do dado alimentar seu
            modelo — com foco em fototipos IV–VI.
          </p>

          {/* email + CTA */}
          <div
            className={`mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-all duration-700 ${
              stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <label htmlFor="hero-email" className="sr-only">
              Endereço de e-mail
            </label>
            <input
              id="hero-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="h-12 flex-1 max-w-[320px] px-4 rounded-lg text-[14px] bg-[oklch(0.16_0.02_40)] border border-[oklch(0.28_0.02_40)] text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <a
              href="#contato"
              className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow:
                  "0 1px 0 oklch(1 0 0 / 0.08) inset, 0 10px 28px -12px oklch(0.55 0.22 25 / 0.55)",
              }}
            >
              Começar
              <span
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>

          <p
            className={`mt-3 text-[12px] transition-opacity duration-700 ${
              stage >= 4 ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--muted-foreground)" }}
          >
            Análise técnica gratuita para times de ML e produto.
          </p>
        </div>

        {/* RIGHT — optics image */}
        <div
          className={`lg:col-span-6 relative flex items-center justify-center transition-all duration-700 delay-200 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div
            className="relative w-full max-w-[560px] aspect-square"
            aria-hidden="true"
          >
            {/* glow behind image */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(circle at center, oklch(0.55 0.22 25 / 0.6), transparent 65%)",
              }}
            />

            <img
              src={heroOptics.url}
              alt="Lente e sensor CMOS com raio de luz vermelho-laranja representando a captura radiométrica da Urucum"
              width={1024}
              height={1024}
              className="relative w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter:
                  "drop-shadow(0 40px 80px oklch(0 0 0 / 0.5))",
              }}
            />

            {/* floating label */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.28em] uppercase whitespace-nowrap"
              style={{
                background: "oklch(0.12 0.015 35 / 0.85)",
                border: "1px solid oklch(0.35 0.03 40 / 0.5)",
                color: "var(--muted-foreground)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle animate-live"
                style={{ background: "var(--primary-glow)" }}
              />
              captura · radiometria · edge
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes particle-float {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.35; }
          50% { transform: translate3d(0, -12px, 0); opacity: 0.85; }
        }
        @keyframes scan-sweep {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

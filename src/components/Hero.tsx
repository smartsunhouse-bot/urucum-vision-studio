import { useEffect, useState } from "react";
import sensibilidade from "@/assets/sensibilidade-parametrica.png.asset.json";
import fototiposCalibrados from "@/assets/fototipos-calibrados.jpg";

const heroSlides = [
  {
    src: sensibilidade.url,
    alt: "Gráficos de sensibilidade paramétrica: variação de lambda, gamma e sigma em função do ITA — princípio inventivo da patente Urucum.",
    caption: {
      title: "Acurácia física (ITA)",
      body: "Calibração paramétrica profunda — λ, γ, σ — que respeita a física da luz e preserva a textura local da pele retinta.",
    },
  },
  {
    src: fototiposCalibrados,
    alt: "Quatro rostos de pessoas negras retintas com sobreposição discreta de detecção de visão computacional e etiquetas técnicas indicando ITA, fototipo e latência.",
    caption: {
      title: "Fototipos IV–VI · em tempo real",
      body: "Identificação, iluminação e validação em milissegundos. Sem se mover, sem procurar luz artificial.",
    },
  },
] as const;

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

      {/* soft noise grain — microscopic film */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* faint optical curves — spectral trajectories */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="spectral" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.78 0.14 65)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.78 0.14 65)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.55 0.22 25)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M -100 620 Q 400 420 900 500 T 1600 380" stroke="url(#spectral)" strokeWidth="0.7" fill="none" />
        <path d="M -100 680 Q 500 520 1000 560 T 1600 460" stroke="url(#spectral)" strokeWidth="0.5" fill="none" />
        <path d="M -100 560 Q 350 380 850 440 T 1600 320" stroke="url(#spectral)" strokeWidth="0.4" fill="none" />
      </svg>

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
              background: "oklch(0.78 0.14 65 / 0.45)",
              boxShadow: "0 0 6px oklch(0.78 0.14 65 / 0.35)",
              animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

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
              className="h-12 flex-1 max-w-[320px] px-4 rounded-lg text-[14px] text-left bg-[oklch(0.16_0.02_40)] border border-[oklch(0.28_0.02_40)] text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            className="relative w-full max-w-[620px] aspect-square"
            aria-hidden="true"
          >
            {/* warm halo behind lens — bleeds into background */}
            <div
              className="absolute inset-[-10%] rounded-full blur-[80px] opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 55% 50%, oklch(0.55 0.22 25 / 0.55), oklch(0.32 0.09 25 / 0.25) 45%, transparent 70%)",
              }}
            />

            <img
              src={heroOptics.url}
              alt="Lente e sensor CMOS com raio de luz vermelho-laranja representando a captura radiométrica da Urucum"
              width={1024}
              height={1024}
              className="relative w-full h-full object-contain"
              style={{
                filter:
                  "drop-shadow(0 30px 60px oklch(0 0 0 / 0.55)) drop-shadow(0 0 40px oklch(0.55 0.22 25 / 0.25))",
                maskImage:
                  "radial-gradient(ellipse 75% 75% at 50% 50%, #000 60%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 75% at 50% 50%, #000 60%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes particle-float {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.3; }
          50% { transform: translate3d(0, -14px, 0); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}

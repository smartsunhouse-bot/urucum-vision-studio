import { useEffect, useState } from "react";
import { RadiometricField } from "@/components/optical/RadiometricField";
import { CornerTicks, MonoMeta } from "@/components/optical/primitives";

/**
 * Hero — estética de referência traduzida para a paleta Urucum.
 * Fundo escuro, glow quente, reconstrução radiométrica abstrata à direita.
 */

// PRNG determinístico (mulberry32) — evita mismatch de hidratação SSR/cliente.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(rand() * 100).toFixed(4)}%`,
  top: `${(rand() * 100).toFixed(4)}%`,
  size: rand() * 2 + 1,
  delay: rand() * 4,
  duration: rand() * 3 + 4,
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
        <div className="lg:col-span-7 relative z-10">
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
            className={`mt-6 sm:mt-8 font-serif font-medium text-[34px] sm:text-[46px] md:text-[58px] lg:text-[68px] leading-[1.05] tracking-[-0.025em] text-foreground max-w-[18ch] transition-all duration-700 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Antes de virar dado,
            <br />
            a imagem precisa ser confiável.
          </h1>

          <p
            className={`font-editorial mt-5 sm:mt-6 max-w-[52ch] text-[17px] sm:text-[18px] md:text-[19px] leading-[1.5] transition-opacity duration-700 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
          >
            A Urucum é uma infraestrutura de processamento de imagem que calibra
            e preserva informações visuais antes que elas entrem em sistemas de
            saúde, visão computacional e outras aplicações.
          </p>

          {/* email + CTA */}
          <div
            className={`mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch max-w-[520px] rounded-lg overflow-hidden border border-[oklch(0.28_0.02_40)] bg-[oklch(0.16_0.02_40)] transition-all duration-700 ${
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
              placeholder="Seu e-mail corporativo"
              className="h-12 flex-1 min-w-0 px-4 text-[14px] text-left bg-transparent text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            />
            <a
              href="#contato"
              className="group inline-flex items-center justify-center gap-2 h-12 px-6 shrink-0 text-[13px] font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow:
                  "0 1px 0 oklch(1 0 0 / 0.08) inset, 0 10px 28px -12px oklch(0.55 0.22 25 / 0.55)",
              }}
            >
              Solicitar Acesso
              <span
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>

          <p
            className={`mt-6 max-w-[52ch] text-[14px] sm:text-[15px] leading-[1.65] font-light transition-opacity duration-700 ${
              stage >= 4 ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--muted-foreground)" }}
          >
            Do celular ao modelo.
            <br />
            A imagem passa primeiro pela Urucum.
          </p>

        </div>

        {/* RIGHT — abstract radiometric reconstruction */}
        <div
          className={`lg:col-span-5 relative flex flex-col items-center justify-center transition-all duration-700 delay-200 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative w-full max-w-[520px] aspect-square">
            {/* glow ambiente */}
            <div
              aria-hidden="true"
              className="absolute inset-[-6%] rounded-full blur-[90px] opacity-45"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.50 0.18 30 / 0.35), transparent 68%)",
              }}
            />

            {/* anel de abertura — ancora o campo como instrumento óptico */}
            <div
              aria-hidden="true"
              className="absolute inset-[3%] rounded-full"
              style={{
                border: "1px solid oklch(0.62 0.14 40 / 0.22)",
                boxShadow: "inset 0 0 70px oklch(0.50 0.18 30 / 0.14)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-[13%] rounded-full"
              style={{ border: "1px solid oklch(0.62 0.14 40 / 0.10)" }}
            />

            {/* campo radiométrico */}
            <RadiometricField className="relative" />

            {/* moldura industrial — ticks nos cantos */}
            <CornerTicks size={16} className="text-[oklch(0.78_0.12_45_/_0.5)]" />

            {/* metadados mono — linguagem óptica coerente com o HUD */}
            <div className="absolute top-0.5 left-0.5">
              <MonoMeta label="SENSOR" value="RADIOMÉTRICO" />
            </div>
            <div className="absolute bottom-0.5 right-0.5">
              <MonoMeta label="ALVO" value="CALIBRAGEM" accent />
            </div>
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

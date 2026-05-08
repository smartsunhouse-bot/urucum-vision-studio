import { useEffect, useRef, useState, type ReactElement } from "react";

type Chapter = {
  year: string;
  kicker: string;
  title: string;
  body: string;
  detail: string;
  scene: (p: number) => ReactElement;
};

const chapters: Chapter[] = [
  {
    year: "1839",
    kicker: "Origem química",
    title: "A imagem nasce calibrada.",
    body:
      "O daguerreótipo é apresentado em Paris. A química da prata, os tempos de exposição e os manuais de iluminação são definidos a partir de um único referente — a pele branca europeia.",
    detail:
      "Rostos negros aparecem como manchas. O problema é descrito como “limitação técnica”, não como decisão.",
    scene: (p) => (
      <svg viewBox="0 0 1600 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="sun1" cx="62%" cy="38%" r="55%">
            <stop offset="0%" stopColor="oklch(0.78 0.18 60 / 0.85)" />
            <stop offset="35%" stopColor="oklch(0.45 0.16 32 / 0.55)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="floor1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.18 0.03 38)" />
            <stop offset="100%" stopColor="oklch(0.06 0.01 30)" />
          </linearGradient>
          <radialGradient id="vig1" cx="50%" cy="50%" r="75%">
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="oklch(0.05 0.008 30 / 0.95)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#floor1)" />
        {/* dust motes / volumetric light */}
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 137 + p * 200) % 1600;
          const y = 100 + ((i * 53 + p * 80) % 700);
          return (
            <circle key={i} cx={x} cy={y} r={0.6 + (i % 3) * 0.4} fill="oklch(0.85 0.05 70 / 0.35)" />
          );
        })}
        {/* light beam through window */}
        <polygon
          points={`${900 + p * 30},0 ${1200 + p * 40},0 ${1500},900 ${600},900`}
          fill="oklch(0.78 0.16 55 / 0.10)"
        />
        <circle cx={1000 + p * 60} cy={340 - p * 20} r={520} fill="url(#sun1)" />
        {/* horizon scan lines */}
        {Array.from({ length: 90 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2="1600"
            y1={i * 10 + (p * 6)}
            y2={i * 10 + (p * 6)}
            stroke="oklch(0.88 0.04 75 / 0.025)"
            strokeWidth="1"
          />
        ))}
        <rect width="1600" height="900" fill="url(#vig1)" />
      </svg>
    ),
  },
  {
    year: "1950",
    kicker: "A norma industrial",
    title: "Shirley Card.",
    body:
      "Kodak distribui a Shirley Card aos laboratórios do mundo: uma mulher branca como referência absoluta de cor, tom e densidade. Toda a cadeia de revelação química é calibrada para esse rosto.",
    detail:
      "Por décadas, a fidelidade do retrato é definida por uma única identidade.",
    scene: (p) => (
      <svg viewBox="0 0 1600 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.16 0.02 38)" />
            <stop offset="100%" stopColor="oklch(0.08 0.01 30)" />
          </linearGradient>
          <radialGradient id="spot2" cx="50%" cy="42%" r="45%">
            <stop offset="0%" stopColor="oklch(0.78 0.10 70 / 0.55)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="vig2" cx="50%" cy="50%" r="75%">
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="oklch(0.05 0.008 30 / 0.95)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#bg2)" />
        <ellipse cx="800" cy="380" rx="700" ry="260" fill="url(#spot2)" />
        {/* color reference patches like a Shirley card */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = 280 + i * 130;
          const lightness = 0.95 - i * 0.09;
          const chroma = i === 0 ? 0 : 0.05 + i * 0.005;
          const hue = 75 - i * 3;
          return (
            <g key={i} transform={`translate(${x}, ${360 + Math.sin((p + i) * 1.2) * 4})`}>
              <rect
                width="100"
                height="280"
                fill={`oklch(${lightness} ${chroma} ${hue})`}
                opacity={0.9}
              />
              <rect width="100" height="280" fill="none" stroke="oklch(0 0 0 / 0.4)" strokeWidth="1" />
            </g>
          );
        })}
        {/* tape & label */}
        <rect x="240" y="700" width="1120" height="60" fill="oklch(0.18 0.02 40)" stroke="oklch(0.52 0.22 25 / 0.4)" strokeWidth="0.5" />
        <text x="800" y="738" fill="oklch(0.85 0.05 70 / 0.7)" fontFamily="JetBrains Mono" fontSize="16" letterSpacing="8" textAnchor="middle">
          KODAK · SHIRLEY · NORMAL · CAUCASIAN REFERENCE
        </text>
        {/* film grain lines */}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={i} x1="0" x2="1600" y1={i * 30 + p * 8} y2={i * 30 + p * 8} stroke="oklch(0.88 0.04 75 / 0.02)" />
        ))}
        <rect width="1600" height="900" fill="url(#vig2)" />
      </svg>
    ),
  },
  {
    year: "1977",
    kicker: "A reforma comercial",
    title: "A mudança não veio por nós.",
    body:
      "Fabricantes de móveis e de chocolate reclamam à Kodak: madeiras escuras e barras de chocolate não aparecem corretamente. A indústria reformula seus filmes.",
    detail:
      "A correção dos tons escuros chega como demanda comercial. Não como reparação.",
    scene: (p) => (
      <svg viewBox="0 0 1600 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bg3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.14 0.02 36)" />
            <stop offset="100%" stopColor="oklch(0.07 0.01 30)" />
          </linearGradient>
          <radialGradient id="warm3" cx="35%" cy="60%" r="55%">
            <stop offset="0%" stopColor="oklch(0.50 0.14 40 / 0.55)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="vig3" cx="50%" cy="50%" r="75%">
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="oklch(0.05 0.008 30 / 0.95)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#bg3)" />
        <ellipse cx="500" cy="540" rx="700" ry="320" fill="url(#warm3)" />
        {/* densitometric scan strips */}
        <g opacity="0.88">
          <rect x="220" y="280" width="380" height="380" fill="oklch(0.28 0.05 38)" />
          <rect x="600" y="280" width="180" height="380" fill="oklch(0.20 0.04 35)" />
          <rect x="780" y="280" width="360" height="380" fill="oklch(0.34 0.06 40)" />
          <rect x="1140" y="280" width="220" height="380" fill="oklch(0.16 0.03 30)" />
        </g>
        {/* moving scan line */}
        <rect
          x={220 + p * 1140}
          y="260"
          width="2"
          height="420"
          fill="oklch(0.58 0.23 24)"
          opacity="0.85"
        />
        <rect
          x={220 + p * 1140 - 40}
          y="260"
          width="80"
          height="420"
          fill="oklch(0.58 0.23 24 / 0.08)"
        />
        {/* readout */}
        <text x="220" y="730" fill="oklch(0.85 0.05 70 / 0.6)" fontFamily="JetBrains Mono" fontSize="14" letterSpacing="6">
          DENSITOMETRY · WALNUT / DARK CHOCOLATE / MAHOGANY
        </text>
        <text x="220" y="760" fill="oklch(0.52 0.22 25 / 0.8)" fontFamily="JetBrains Mono" fontSize="12" letterSpacing="4">
          CLIENT REQUEST · MFG. ASSOCIATION
        </text>
        <rect width="1600" height="900" fill="url(#vig3)" />
      </svg>
    ),
  },
  {
    year: "2010",
    kicker: "Sensores digitais",
    title: "O viés migra para o silício.",
    body:
      "Algoritmos de auto-exposição, balanço de branco e detecção facial herdam as mesmas premissas. Câmeras de smartphone falham em rostos negros sob baixa luz. Sistemas de reconhecimento erram desproporcionalmente.",
    detail:
      "O que era química, virou estatística. O que era manual, virou modelo.",
    scene: (p) => (
      <svg viewBox="0 0 1600 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bg4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.10 0.012 35)" />
            <stop offset="100%" stopColor="oklch(0.06 0.008 30)" />
          </linearGradient>
          <radialGradient id="vig4" cx="50%" cy="50%" r="75%">
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="oklch(0.05 0.008 30 / 0.95)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#bg4)" />
        {/* sensor grid (Bayer-like) */}
        {Array.from({ length: 18 }).map((_, r) =>
          Array.from({ length: 32 }).map((_, c) => {
            const v = (Math.sin(r * 0.6 + c * 0.4 + p * 2.4) + 1) / 2;
            const dist = Math.hypot(r - 9, c - 16) / 18;
            const intensity = Math.max(0, 1 - dist) * v;
            return (
              <rect
                key={`${r}-${c}`}
                x={80 + c * 45}
                y={80 + r * 40}
                width="40"
                height="34"
                fill={`oklch(${0.10 + intensity * 0.55} ${0.04 + intensity * 0.16} ${30 + intensity * 8})`}
              />
            );
          }),
        )}
        {/* face detection box that misses */}
        <g opacity={0.7}>
          <rect
            x={520 + Math.sin(p * 6) * 30}
            y={260 + Math.cos(p * 5) * 20}
            width="280"
            height="320"
            fill="none"
            stroke="oklch(0.58 0.23 24 / 0.7)"
            strokeWidth="1.4"
            strokeDasharray="6 4"
          />
          <text
            x={520 + Math.sin(p * 6) * 30}
            y={250 + Math.cos(p * 5) * 20}
            fill="oklch(0.58 0.23 24 / 0.85)"
            fontFamily="JetBrains Mono"
            fontSize="11"
            letterSpacing="3"
          >
            FACE · CONFIDENCE 0.{Math.floor(12 + p * 30)}
          </text>
        </g>
        {/* horizontal scan */}
        <rect x={80} y={80 + p * 720} width="1440" height="2" fill="oklch(0.58 0.23 24 / 0.7)" />
        <rect width="1600" height="900" fill="url(#vig4)" />
      </svg>
    ),
  },
  {
    year: "Hoje",
    kicker: "Escala algorítmica",
    title: "O viés foi automatizado.",
    body:
      "Sistemas de IA são treinados sobre arquivos visuais que carregam um século e meio de calibragem. Cada inferência repete e amplifica decisões tomadas antes da fotografia digital existir.",
    detail: "Nenhum modelo corrige o que nunca foi capturado.",
    scene: (p) => (
      <svg viewBox="0 0 1600 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="core5" cx="50%" cy="50%" r="20%">
            <stop offset="0%" stopColor="oklch(0.78 0.18 30 / 0.7)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="vig5" cx="50%" cy="50%" r="75%">
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="oklch(0.05 0.008 30 / 0.95)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="oklch(0.08 0.012 32)" />
        {/* particle constellation */}
        {Array.from({ length: 220 }).map((_, i) => {
          const a = (i / 220) * Math.PI * 2 + p * 0.6;
          const r = 220 + Math.sin(i * 0.7 + p * 3) * 80 + (i % 5) * 14;
          const x = 800 + Math.cos(a) * r * 1.8;
          const y = 450 + Math.sin(a) * r * 0.9;
          const op = 0.25 + ((i * 13) % 100) / 200;
          return (
            <circle key={i} cx={x} cy={y} r={0.8 + (i % 4) * 0.4} fill={`oklch(0.58 0.23 24 / ${op})`} />
          );
        })}
        {/* faint orbits */}
        {[180, 280, 380, 480].map((r, i) => (
          <ellipse
            key={r}
            cx="800"
            cy="450"
            rx={r * 1.6}
            ry={r * 0.8}
            fill="none"
            stroke={`oklch(0.85 0.04 70 / ${0.05 + i * 0.02})`}
            strokeWidth="0.5"
            transform={`rotate(${p * 8 + i * 3} 800 450)`}
          />
        ))}
        <circle cx="800" cy="450" r="120" fill="url(#core5)" />
        <circle cx="800" cy="450" r="64" fill="none" stroke="oklch(0.85 0.05 70 / 0.55)" strokeWidth="0.6" />
        <text x="800" y="455" textAnchor="middle" fill="oklch(0.88 0.04 75 / 0.85)" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="6">
          INFERENCE
        </text>
        <rect width="1600" height="900" fill="url(#vig5)" />
      </svg>
    ),
  },
];

function ChapterScene({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[180vh] border-t border-border/30"
    >
      {/* Sticky cinematic scene */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: 0.55 + progress * 0.35 }}
        >
          {chapter.scene(progress)}
        </div>
        <div className="absolute inset-0 grain pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.10 0.012 35 / 0.6) 0%, transparent 25%, transparent 65%, oklch(0.10 0.012 35 / 0.95) 100%)",
          }}
        />

        <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 lg:px-16">
          {/* Year + kicker */}
          <div className="absolute left-6 lg:left-16 top-[14vh] flex items-baseline gap-6">
            <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-urucum/80">
              № {String(index + 1).padStart(2, "0")} · {chapter.kicker}
            </span>
          </div>
          <div
            className="absolute left-6 lg:left-16 top-[20vh] font-serif font-light leading-[0.85] tracking-[-0.04em] text-foreground/95 tabular-nums"
            style={{
              fontSize: "clamp(96px, 16vw, 240px)",
              transform: `translateY(${(1 - progress) * 30}px)`,
              opacity: 0.95,
            }}
          >
            {chapter.year}
          </div>

          {/* Text panel */}
          <div className="absolute right-6 lg:right-16 bottom-[12vh] w-full max-w-xl">
            <div
              className="transition-all duration-700"
              style={{
                opacity: progress > 0.15 ? 1 : 0,
                transform: `translateY(${progress > 0.15 ? 0 : 20}px)`,
              }}
            >
              <h3 className="font-serif text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.015em] text-foreground">
                {chapter.title}
              </h3>
              <p className="mt-5 text-[14.5px] leading-[1.65] text-foreground/75">
                {chapter.body}
              </p>
              <div className="mt-6 pt-5 border-t border-border/60">
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-urucum/90 leading-relaxed">
                  {chapter.detail}
                </p>
              </div>
            </div>
          </div>

          {/* Progress rail */}
          <div className="absolute left-6 lg:left-16 bottom-[8vh] flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
            <span>{String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</span>
            <div className="w-40 h-px bg-border relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0"
                style={{ width: `${progress * 100}%`, background: "oklch(0.62 0.21 32)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Timeline() {
  return (
    <>
      {/* Intro */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="reveal">
            <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.4em] uppercase text-urucum/90 mb-6">
              <span className="w-6 h-px bg-urucum/60" style={{ background: "oklch(0.52 0.22 25 / 0.6)" }} />
              Linha do tempo da invisibilidade
            </div>
            <h2 className="font-serif font-light text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.02em] max-w-3xl text-foreground">
              186 anos
              <span className="italic text-foreground/70"> de calibragem.</span>
            </h2>
            <div className="mt-10 grid md:grid-cols-2 gap-10 max-w-3xl">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                A inteligência artificial não inventou o viés visual. Ela o
                herdou. Cada decisão técnica — química, óptica, eletrônica —
                depositou uma camada sobre quem podia ser visto.
              </p>
              <p className="text-[15px] leading-relaxed text-foreground/80">
                Esta linha do tempo reconstrói o caminho da imagem antes de
                virar dado.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-4 text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
              <span>05 capítulos</span>
              <span className="w-px h-3 bg-border" />
              <span>1839 — hoje</span>
              <span className="w-px h-3 bg-border" />
              <span>scroll para avançar</span>
            </div>
          </div>
        </div>
      </section>

      {chapters.map((c, i) => (
        <ChapterScene key={c.year} chapter={c} index={i} />
      ))}

      {/* Outro */}
      <section className="relative py-40 lg:py-56 border-t border-border/40 overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center reveal">
          <blockquote className="font-serif text-3xl md:text-[44px] leading-[1.18] tracking-[-0.01em] text-foreground/95">
            “Quando pessoas negras dizem que foram apagadas, isso não é metáfora.
            <span className="block mt-5 text-foreground/65">
              A câmera — símbolo de memória e existência — nunca foi calibrada para elas.”
            </span>
          </blockquote>
        </div>
      </section>
    </>
  );
}

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
    body: "O daguerreótipo é apresentado em Paris. A química da prata, os tempos de exposição e os manuais de iluminação são definidos a partir de um único referente — a pele branca europeia.",
    detail: "Rostos negros aparecem como manchas. O problema é descrito como “limitação técnica”, não como decisão.",
    scene: (p) => (
      <svg viewBox="0 0 800 600" className="w-full h-full">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="oklch(0.55 0.16 35 / 0.55)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="oklch(0.10 0.012 35)" />
        <circle cx={400 + p * 40} cy="300" r="220" fill="url(#g1)" />
        {Array.from({ length: 40 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2="800"
            y1={i * 16 + p * 4}
            y2={i * 16 + p * 4}
            stroke="oklch(0.88 0.04 75 / 0.04)"
            strokeWidth="1"
          />
        ))}
        <circle cx="400" cy="300" r={180 - p * 60} fill="none" stroke="oklch(0.62 0.21 32 / 0.5)" strokeWidth="0.6" />
      </svg>
    ),
  },
  {
    year: "1950",
    kicker: "A norma industrial",
    title: "Shirley Card.",
    body: "Kodak distribui a Shirley Card aos laboratórios do mundo: uma mulher branca como referência absoluta de cor, tom e densidade. Toda a cadeia de revelação química é calibrada para esse rosto.",
    detail: "Por décadas, a fidelidade do retrato é definida por uma única identidade.",
    scene: (p) => (
      <svg viewBox="0 0 800 600" className="w-full h-full">
        <rect width="800" height="600" fill="oklch(0.12 0.014 38)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={120 + i * 110}
            y={150}
            width="90"
            height="280"
            fill={`oklch(${0.92 - i * 0.05} 0.04 ${75 - i * 4})`}
            opacity={0.85}
            transform={`translate(0, ${Math.sin((p + i) * 1.2) * 6})`}
          />
        ))}
        <text
          x="400"
          y="100"
          fill="oklch(0.62 0.21 32 / 0.7)"
          fontFamily="JetBrains Mono"
          fontSize="11"
          letterSpacing="6"
          textAnchor="middle"
        >
          REFERENCE · NORMAL · CAUCASIAN
        </text>
        <line x1="60" y1="470" x2="740" y2="470" stroke="oklch(0.62 0.21 32 / 0.4)" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    year: "1977",
    kicker: "A reforma comercial",
    title: "A mudança não veio por nós.",
    body: "Fabricantes de móveis e de chocolate reclamam à Kodak: madeiras escuras e barras de chocolate não aparecem corretamente. A indústria reformula seus filmes.",
    detail: "A correção dos tons escuros chega como demanda comercial. Não como reparação.",
    scene: (p) => (
      <svg viewBox="0 0 800 600" className="w-full h-full">
        <rect width="800" height="600" fill="oklch(0.11 0.013 36)" />
        <g opacity="0.85">
          <rect x="120" y="200" width="220" height="220" fill="oklch(0.28 0.05 38)" />
          <rect x="360" y="200" width="100" height="220" fill="oklch(0.22 0.04 35)" />
          <rect x="480" y="200" width="200" height="220" fill="oklch(0.34 0.06 40)" />
        </g>
        <rect
          x={120 + p * 560}
          y="180"
          width="2"
          height="260"
          fill="oklch(0.62 0.21 32)"
        />
        <text x="60" y="500" fill="oklch(0.7 0.04 70 / 0.6)" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="3">
          DENSITY SCAN · WOOD / CHOCOLATE
        </text>
      </svg>
    ),
  },
  {
    year: "2010",
    kicker: "Sensores digitais",
    title: "O viés migra para o silício.",
    body: "Algoritmos de auto-exposição, balanço de branco e detecção facial herdam as mesmas premissas. Câmeras de smartphone falham em rostos negros sob baixa luz. Sistemas de reconhecimento erram desproporcionalmente.",
    detail: "O que era química, virou estatística. O que era manual, virou modelo.",
    scene: (p) => (
      <svg viewBox="0 0 800 600" className="w-full h-full">
        <rect width="800" height="600" fill="oklch(0.10 0.012 35)" />
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 16 }).map((_, c) => {
            const v = (Math.sin(r * 0.6 + c * 0.4 + p * 2) + 1) / 2;
            return (
              <rect
                key={`${r}-${c}`}
                x={80 + c * 40}
                y={80 + r * 36}
                width="34"
                height="30"
                fill={`oklch(${0.18 + v * 0.45} 0.06 ${40 + v * 10})`}
              />
            );
          }),
        )}
        <rect
          x={80}
          y={80 + p * 380}
          width="640"
          height="2"
          fill="oklch(0.62 0.21 32 / 0.7)"
        />
      </svg>
    ),
  },
  {
    year: "Hoje",
    kicker: "Escala algorítmica",
    title: "O viés foi automatizado.",
    body: "Sistemas de IA são treinados sobre arquivos visuais que carregam um século e meio de calibragem. Cada inferência repete e amplifica decisões tomadas antes da fotografia digital existir.",
    detail: "Nenhum modelo corrige o que nunca foi capturado.",
    scene: (p) => (
      <svg viewBox="0 0 800 600" className="w-full h-full">
        <rect width="800" height="600" fill="oklch(0.10 0.012 35)" />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2 + p * 0.5;
          const r = 220 + Math.sin(i * 0.7 + p * 3) * 30;
          const x = 400 + Math.cos(a) * r;
          const y = 300 + Math.sin(a) * r * 0.7;
          return (
            <circle key={i} cx={x} cy={y} r="1.4" fill="oklch(0.62 0.21 32 / 0.7)" />
          );
        })}
        <circle cx="400" cy="300" r="60" fill="none" stroke="oklch(0.88 0.04 75 / 0.5)" strokeWidth="0.6" />
        <text x="400" y="305" textAnchor="middle" fill="oklch(0.88 0.04 75 / 0.7)" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="4">
          INFERENCE
        </text>
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
              <h3 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.015em] text-foreground">
                {chapter.title}
              </h3>
              <p className="mt-6 text-[15.5px] md:text-[16.5px] leading-relaxed text-foreground/75">
                {chapter.body}
              </p>
              <p className="mt-5 text-[13px] font-mono uppercase tracking-[0.18em] text-urucum/80 leading-relaxed">
                {chapter.detail}
              </p>
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
          <div className="text-[11px] font-mono uppercase tracking-[0.4em] text-urucum/70 mb-10">
            ◦ Fim da linha do tempo
          </div>
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

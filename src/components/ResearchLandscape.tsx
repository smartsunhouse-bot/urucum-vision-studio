import { useRef, useState, useEffect } from "react";
import faceLight from "@/assets/face-light.jpg";
import faceMedium from "@/assets/face-medium.jpg";
import faceMediumDark from "@/assets/face-mediumdark.jpg";
import faceDeep from "@/assets/face-deep.jpg";
import portrait from "@/assets/portrait.jpg";

// Research & Context — reinterpretação premium de um "logo wall".
// Cada card é uma referência real, clicável, com lockup monocromático,
// imagem humana editorial sutil, e um micro-dado tipográfico.
// Sem clientes fake, sem manifesto. Estética: Stripe / Linear / Nothing.

type Kind = "paper" | "standard" | "case" | "book" | "lab";

type Ref = {
  kind: Kind;
  lockup: string;        // wordmark text (renderizado como logo monocromática)
  sub?: string;          // sub-lockup (departamento / autor)
  year: string;
  headline: string;      // editorial title
  insight: string;       // micro-data point (HUGE number / short phrase)
  insightLabel: string;  // unit / context
  source: string;        // citation footer
  href: string;
  image: string;
};

const KIND_LABEL: Record<Kind, string> = {
  paper: "paper",
  standard: "standard",
  case: "case study",
  book: "book",
  lab: "lab",
};

const refs: Ref[] = [
  {
    kind: "paper",
    lockup: "MIT",
    sub: "Media Lab — Gender Shades",
    year: "2018",
    headline: "Auditoria comercial de classificadores de gênero.",
    insight: "34.7%",
    insightLabel: "erro em mulheres de pele escura vs. 0,8% em homens claros",
    source: "Buolamwini & Gebru · PMLR 81",
    href: "https://proceedings.mlr.press/v81/buolamwini18a.html",
    image: faceDeep,
  },
  {
    kind: "standard",
    lockup: "NIST",
    sub: "Face Recognition Vendor Test",
    year: "2019",
    headline: "Avaliação de viés demográfico em 189 algoritmos.",
    insight: "10–100×",
    insightLabel: "diferença de falsos positivos entre grupos demográficos",
    source: "NIST IR 8280 · Part 3: Demographic Effects",
    href: "https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf",
    image: faceLight,
  },
  {
    kind: "case",
    lockup: "Google",
    sub: "Photos — incident report",
    year: "2015",
    headline: "Sistema de tags rotulou pessoas negras como gorilas.",
    insight: "8 anos",
    insightLabel: "para reintroduzir a categoria sem regressão de bias",
    source: "BBC / Wired · auditoria pública",
    href: "https://www.theverge.com/2018/1/12/16882408/google-racist-gorillas-photo-recognition-algorithm-ai",
    image: faceMediumDark,
  },
  {
    kind: "case",
    lockup: "Amazon",
    sub: "Rekognition — ACLU test",
    year: "2018",
    headline: "28 membros do Congresso confundidos com fichas criminais.",
    insight: "39%",
    insightLabel: "dos falsos matches eram pessoas negras (11% do Congresso)",
    source: "ACLU · Test of Amazon's Face Surveillance",
    href: "https://www.aclu.org/news/privacy-technology/amazons-face-recognition-falsely-matched-28",
    image: faceMedium,
  },
  {
    kind: "case",
    lockup: "COMPAS",
    sub: "ProPublica — Machine Bias",
    year: "2016",
    headline: "Sistema de risco criminal usado por tribunais nos EUA.",
    insight: "2×",
    insightLabel: "mais chance de falso positivo para réus negros",
    source: "Angwin, Larson, Mattu, Kirchner · ProPublica",
    href: "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing",
    image: portrait,
  },
  {
    kind: "lab",
    lockup: "AJL",
    sub: "Algorithmic Justice League",
    year: "2016—",
    headline: "Infraestrutura civil para auditoria de sistemas biométricos.",
    insight: "12+",
    insightLabel: "vendors auditados sob o protocolo coded gaze",
    source: "ajl.org · MIT Media Lab spin-off",
    href: "https://www.ajl.org/",
    image: faceDeep,
  },
  {
    kind: "lab",
    lockup: "IBM",
    sub: "Diversity in Faces",
    year: "2019",
    headline: "Dataset com 1M de faces anotadas por morfometria craniofacial.",
    insight: "1M",
    insightLabel: "imagens com 10 esquemas de codificação facial",
    source: "Merler et al. · IBM Research",
    href: "https://arxiv.org/abs/1901.10436",
    image: faceMedium,
  },
  {
    kind: "lab",
    lockup: "Stanford",
    sub: "HAI — Human-Centered AI",
    year: "2024",
    headline: "AI Index Report · estado da equidade em sistemas de visão.",
    insight: "57%",
    insightLabel: "dos benchmarks visuais não reportam paridade demográfica",
    source: "Stanford HAI · AI Index 2024",
    href: "https://hai.stanford.edu/ai-index",
    image: faceLight,
  },
  {
    kind: "book",
    lockup: "Algorithms of Oppression",
    sub: "Safiya Umoja Noble · NYU Press",
    year: "2018",
    headline: "Como motores de busca reforçam o racismo estrutural.",
    insight: "—",
    insightLabel: "leitura fundamental sobre vieses em sistemas comerciais",
    source: "ISBN 978-1479837243 · UCLA",
    href: "https://nyupress.org/9781479837243/algorithms-of-oppression/",
    image: faceMediumDark,
  },
  {
    kind: "book",
    lockup: "Race After Technology",
    sub: "Ruha Benjamin · Polity",
    year: "2019",
    headline: "The New Jim Code — discriminação codificada em infraestrutura.",
    insight: "—",
    insightLabel: "framework para análise crítica de tecnologias preditivas",
    source: "ISBN 978-1509526406 · Princeton",
    href: "https://www.ruhabenjamin.com/race-after-technology",
    image: faceDeep,
  },
  {
    kind: "book",
    lockup: "Weapons of Math Destruction",
    sub: "Cathy O'Neil · Crown",
    year: "2016",
    headline: "Como modelos opacos ampliam desigualdade em escala.",
    insight: "—",
    insightLabel: "referência sobre auditoria de modelos preditivos",
    source: "ISBN 978-0553418811",
    href: "https://weaponsofmathdestructionbook.com/",
    image: portrait,
  },
];

function Lockup({ text, sub }: { text: string; sub?: string }) {
  // Lockup monocromática — tratamento tipográfico tipo "logo wall".
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="font-serif font-light leading-none tracking-[-0.02em] text-[22px] lg:text-[24px]"
        style={{ color: "oklch(0.96 0.01 35)" }}
      >
        {text}
      </div>
      {sub && (
        <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/45 leading-tight">
          {sub}
        </div>
      )}
    </div>
  );
}

export function ResearchLandscape() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-ref-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section
      id="referencias"
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{
        background:
          "radial-gradient(1100px 600px at 80% 10%, oklch(0.16 0.04 28 / 0.35), transparent 65%)," +
          "linear-gradient(180deg, oklch(0.078 0.010 32), oklch(0.072 0.010 30))",
      }}
    >
      <div className="absolute inset-0 grain-fine pointer-events-none opacity-50" />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: "oklch(0.62 0.24 26)",
                  boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
                }}
              />
              <span>02 · research &amp; context</span>
            </div>

            <h2 className="mt-6 font-serif font-light text-[40px] md:text-[52px] lg:text-[60px] leading-[1.02] tracking-[-0.02em] text-foreground/95">
              Fontes que moldam{" "}
              <span
                className="italic"
                style={{
                  color: "oklch(0.78 0.06 35)",
                }}
              >
                esta tecnologia.
              </span>
            </h2>
            <p className="mt-6 max-w-[58ch] text-[15px] leading-[1.7] text-foreground/60">
              Um recorte do landscape técnico que sustenta a Urucum AI —
              papers, padrões, casos públicos e literatura. Cada cartão aponta
              para a fonte primária.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="w-11 h-11 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors duration-300"
              style={{
                border: "1px solid oklch(0.55 0.18 35 / 0.22)",
                background: "oklch(0.10 0.012 32 / 0.6)",
                backdropFilter: "blur(6px)",
              }}
            >
              <span className="text-lg leading-none">←</span>
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Próximo"
              className="w-11 h-11 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors duration-300"
              style={{
                border: "1px solid oklch(0.55 0.18 35 / 0.22)",
                background: "oklch(0.10 0.012 32 / 0.6)",
                backdropFilter: "blur(6px)",
              }}
            >
              <span className="text-lg leading-none">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroller */}
      <div className="relative mt-16">
        {/* fade edges */}
        <div
          className="absolute inset-y-0 left-0 w-24 lg:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.078 0.010 32) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 lg:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(-90deg, oklch(0.078 0.010 32) 0%, transparent 100%)",
          }}
        />

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 lg:px-12 pb-6"
          style={{
            scrollbarWidth: "none",
            scrollPaddingLeft: "48px",
            scrollPaddingRight: "48px",
          }}
        >
          <style>{`#referencias [data-scroller]::-webkit-scrollbar{display:none}`}</style>
          {refs.map((r, i) => (
            <a
              key={r.lockup + i}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              data-ref-card
              className="group relative shrink-0 snap-start w-[320px] md:w-[360px] lg:w-[400px] flex flex-col transition-all duration-500"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.105 0.014 34 / 0.85), oklch(0.085 0.010 32 / 0.85))",
                border: "1px solid oklch(0.55 0.18 35 / 0.14)",
                backdropFilter: "blur(8px)",
                minHeight: "520px",
              }}
            >
              {/* corner ticks */}
              <span className="absolute top-2 left-2 w-2 h-px bg-foreground/30" />
              <span className="absolute top-2 left-2 w-px h-2 bg-foreground/30" />
              <span className="absolute bottom-2 right-2 w-2 h-px bg-foreground/30" />
              <span className="absolute bottom-2 right-2 w-px h-2 bg-foreground/30" />

              {/* Image — human presence, editorial monochrome */}
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={r.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  style={{
                    filter: "grayscale(1) contrast(1.05) brightness(0.62)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.10 0.01 32 / 0.2) 0%, oklch(0.085 0.01 32 / 0.95) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-30 transition-opacity duration-700 group-hover:opacity-50"
                  style={{
                    background:
                      "radial-gradient(400px 200px at 50% 100%, oklch(0.55 0.20 28 / 0.5), transparent 70%)",
                  }}
                />

                {/* top meta */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[9.5px] font-mono tracking-[0.32em] uppercase text-foreground/75">
                    {KIND_LABEL[r.kind]}
                  </span>
                  <span className="text-[9.5px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                    {r.year}
                  </span>
                </div>

                {/* lockup overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                  <Lockup text={r.lockup} sub={r.sub} />
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 flex flex-col px-6 py-6 gap-5">
                <p className="text-[15px] leading-[1.5] text-foreground/85 font-serif font-light">
                  {r.headline}
                </p>

                {/* Insight */}
                <div className="flex items-baseline gap-3">
                  <div
                    className="font-serif font-light leading-none tracking-[-0.03em] text-[36px] lg:text-[42px]"
                    style={{ color: "oklch(0.92 0.04 35)" }}
                  >
                    {r.insight}
                  </div>
                </div>
                <p className="text-[12.5px] leading-[1.55] text-foreground/55">
                  {r.insightLabel}
                </p>

                <div className="mt-auto pt-5 border-t border-foreground/10 flex items-center justify-between gap-3">
                  <span className="text-[9.5px] font-mono tracking-[0.22em] uppercase text-foreground/45 truncate">
                    {r.source}
                  </span>
                  <span
                    className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/55 group-hover:text-foreground/95 transition-colors duration-300 shrink-0 flex items-center gap-1.5"
                  >
                    fonte
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* progress rail */}
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 mt-6">
          <div
            className="relative h-px w-full"
            style={{ background: "oklch(0.30 0.02 32 / 0.4)" }}
          >
            <div
              className="absolute top-0 left-0 h-px transition-[width] duration-200"
              style={{
                width: `${Math.max(8, progress * 100)}%`,
                background:
                  "linear-gradient(90deg, oklch(0.62 0.24 26 / 0.0), oklch(0.78 0.10 32 / 0.8))",
              }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[9.5px] font-mono tracking-[0.32em] uppercase text-foreground/40">
            <span>{refs.length} referências · arraste ou navegue</span>
            <span>{String(Math.round(progress * 100)).padStart(2, "0")} / 100</span>
          </div>
        </div>
      </div>
    </section>
  );
}

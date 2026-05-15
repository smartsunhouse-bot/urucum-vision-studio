import { useEffect, useRef, useState } from "react";
import img1839 from "@/assets/timeline-1839.jpg";
import img1950 from "@/assets/timeline-1950.jpg";
import img1977 from "@/assets/timeline-1977.jpg";
import img2010 from "@/assets/timeline-2010.jpg";
import imgToday from "@/assets/timeline-today.jpg";

type Chapter = {
  year: string;
  kicker: string;
  title: string;
  body: string;
  detail: string;
  image: string;
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
    image: img1839,
  },
  {
    year: "1950",
    kicker: "A norma industrial",
    title: "Shirley Card.",
    body:
      "Kodak distribui a Shirley Card aos laboratórios do mundo: uma mulher branca como referência absoluta de cor, tom e densidade. Toda a cadeia de revelação química é calibrada para esse rosto.",
    detail:
      "Por décadas, a fidelidade do retrato é definida por uma única identidade.",
    image: img1950,
  },
  {
    year: "1977",
    kicker: "A reforma comercial",
    title: "A mudança não veio por nós.",
    body:
      "Fabricantes de móveis e de chocolate reclamam à Kodak: madeiras escuras e barras de chocolate não aparecem corretamente. A indústria reformula seus filmes.",
    detail:
      "A correção dos tons escuros chega como demanda comercial. Não como reparação.",
    image: img1977,
  },
  {
    year: "2010",
    kicker: "Sensores digitais",
    title: "O viés migra para o silício.",
    body:
      "Algoritmos de auto-exposição, balanço de branco e detecção facial herdam as mesmas premissas. Câmeras de smartphone falham em rostos negros sob baixa luz. Sistemas de reconhecimento erram desproporcionalmente.",
    detail:
      "O que era química, virou estatística. O que era manual, virou modelo.",
    image: img2010,
  },
  {
    year: "Hoje",
    kicker: "Escala algorítmica",
    title: "O viés foi automatizado.",
    body:
      "Sistemas de IA são treinados sobre arquivos visuais que carregam um século e meio de calibragem. Cada inferência repete e amplifica decisões tomadas antes da fotografia digital existir.",
    detail: "Nenhum modelo corrige o que nunca foi capturado.",
    image: imgToday,
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

  // cinematic curves
  const easeIn = Math.min(1, Math.max(0, (progress - 0.05) / 0.25));
  const easeOut = Math.min(1, Math.max(0, 1 - (progress - 0.7) / 0.25));
  const enter = Math.min(easeIn, easeOut);
  const parallaxBg = (progress - 0.5) * 60;
  const parallaxYr = (progress - 0.5) * 120;

  return (
    <section
      ref={ref}
      className="relative min-h-[220vh] border-t border-border/10"
    >
      {/* Sticky cinematic scene */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[oklch(0.05_0.006_30)]">
        {/* PLANO 1 — background image (parallax + slow zoom + DOF leve) */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxBg}px, 0) scale(${1.06 + progress * 0.09})`,
            opacity: 0.55 + enter * 0.4,
            transition: "opacity 800ms ease",
            filter: `contrast(1.18) saturate(1.10) brightness(0.92)`,
          }}
        >
          <img
            src={chapter.image}
            alt={`${chapter.year} — ${chapter.title}`}
            loading="lazy"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* PLANO 1.5 — grading shadow→urucum (warm palette only) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(95deg, oklch(0.06 0.010 30 / 0.70) 0%, oklch(0.08 0.012 30 / 0.30) 35%, transparent 55%, oklch(0.30 0.14 28 / 0.20) 80%, oklch(0.42 0.20 26 / 0.42) 100%)",
            mixBlendMode: "soft-light",
          }}
        />
        {/* sombra densa à direita para destacar o painel glass */}
        <div
          className="absolute inset-y-0 right-0 w-[55%] pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, oklch(0.04 0.006 30 / 0.88) 0%, oklch(0.04 0.006 30 / 0.5) 40%, transparent 100%)",
          }}
        />
        {/* sombra inferior */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent, oklch(0.04 0.006 30 / 0.92))",
          }}
        />
        {/* sombra superior fina */}
        <div
          className="absolute inset-x-0 top-0 h-[20%] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.04 0.006 30 / 0.7), transparent)",
          }}
        />

        {/* halo cream warm (backlight cinematográfico — paleta urucum) */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 520,
            height: 520,
            top: "12%",
            left: "8%",
            background:
              "radial-gradient(circle, oklch(0.78 0.08 60 / 0.18), transparent 65%)",
            filter: "blur(40px)",
            opacity: 0.6 * enter,
            transform: `translate3d(0, ${(1 - enter) * 20}px, 0)`,
            transition: "opacity 900ms ease, transform 900ms ease",
          }}
        />

        {/* film grain leve */}
        <div className="absolute inset-0 grain pointer-events-none opacity-60" />

        {/* vignette suave */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, oklch(0.04 0.006 30 / 0.7) 100%)",
          }}
        />

        {/* CONTEÚDO — composição em terços */}
        <div className="absolute inset-0 max-w-[1500px] mx-auto px-6 lg:px-20">
          {/* PLANO 2 — ano ghost outline (profundidade) */}
          <div
            className="absolute left-4 lg:left-16 top-[24vh] font-serif font-extralight leading-[0.82] tracking-[-0.05em] tabular-nums select-none pointer-events-none"
            style={{
              fontSize: "clamp(140px, 22vw, 320px)",
              transform: `translate3d(0, ${parallaxYr}px, 0)`,
              opacity: 0.10 + enter * 0.18,
              color: "transparent",
              WebkitTextStroke: "1px oklch(0.85 0.05 60 / 0.42)",
            }}
          >
            {chapter.year}
          </div>

          {/* PLANO 3 — coluna editorial à esquerda (proximidade: bloco coeso) */}
          <div
            className="absolute left-6 lg:left-20 bottom-[18vh] w-[min(92vw,520px)]"
            style={{
              opacity: enter,
              transform: `translateY(${(1 - enter) * 28}px)`,
              transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: "oklch(0.72 0.20 30)",
                  boxShadow: "0 0 12px oklch(0.62 0.22 28 / 0.9)",
                }}
              />
              <span
                className="font-mono text-[10.5px] font-semibold tracking-[0.42em] uppercase"
                style={{ color: "oklch(0.82 0.08 55)" }}
              >
                Cap. {String(index + 1).padStart(2, "0")} · {chapter.kicker}
              </span>
            </div>

            {/* ano sólido — foco */}
            <div
              className="font-serif font-light leading-[0.9] tracking-[-0.04em] tabular-nums text-foreground"
              style={{
                fontSize: "clamp(48px, 6vw, 88px)",
                textShadow: "0 8px 40px oklch(0 0 0 / 0.7)",
              }}
            >
              {chapter.year}
            </div>

            {/* título serif */}
            <h3
              className="mt-4 font-serif text-[26px] md:text-[34px] leading-[1.1] tracking-[-0.015em] text-foreground/95 max-w-[20ch]"
              style={{ textShadow: "0 2px 16px oklch(0 0 0 / 0.85)" }}
            >
              {chapter.title}
            </h3>
          </div>

          {/* PLANO 4 — painel glass à direita (foreground) */}
          <div className="absolute right-6 lg:right-20 top-1/2 -translate-y-1/2 w-[min(92vw,420px)] hidden md:block">
            <div
              className="p-7 backdrop-blur-xl"
              style={{
                opacity: enter,
                transform: `translateY(${(1 - enter) * 18}px)`,
                transition: "all 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                background:
                  "linear-gradient(160deg, oklch(0.10 0.014 35 / 0.65), oklch(0.06 0.008 30 / 0.75))",
                border: "1px solid oklch(0.55 0.12 35 / 0.22)",
                borderLeft: "1px solid oklch(0.65 0.18 30 / 0.55)",
                boxShadow:
                  "0 50px 100px -40px oklch(0 0 0 / 0.95), inset 0 1px 0 oklch(1 0 0 / 0.04)",
              }}
            >
              <p className="text-[14.5px] leading-[1.7] text-foreground/85">
                {chapter.body}
              </p>
              <div className="mt-6 pt-5 border-t border-foreground/10">
                <p
                  className="text-[11px] font-mono font-semibold uppercase tracking-[0.24em] leading-relaxed"
                  style={{ color: "oklch(0.82 0.16 38)" }}
                >
                  {chapter.detail}
                </p>
              </div>
            </div>
          </div>

          {/* mobile fallback — body abaixo */}
          <div
            className="absolute md:hidden left-6 right-6 bottom-[6vh] p-5 backdrop-blur-xl"
            style={{
              opacity: enter,
              background:
                "linear-gradient(160deg, oklch(0.10 0.014 35 / 0.7), oklch(0.06 0.008 30 / 0.8))",
              border: "1px solid oklch(0.55 0.12 35 / 0.22)",
            }}
          >
            <p className="text-[13.5px] leading-[1.65] text-foreground/85">
              {chapter.body}
            </p>
          </div>

          {/* régua técnica vertical no terço */}
          <div
            className="hidden lg:block absolute top-[12vh] bottom-[12vh] left-[33%] w-px pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent, oklch(0.55 0.12 35 / 0.28), transparent)",
              opacity: enter * 0.7,
            }}
          />

          {/* Progress rail — limpo, sem REC/timecode falso */}
          <div
            className="absolute left-6 lg:left-20 bottom-[8vh] flex items-center gap-4 text-[10px] font-mono tracking-[0.3em] uppercase text-foreground/45"
            style={{ opacity: enter, transition: "opacity 700ms ease" }}
          >
            <span className="text-foreground/70 tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
            <div className="w-40 h-px bg-foreground/15 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 transition-[width] duration-300 ease-out"
                style={{
                  width: `${progress * 100}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.55 0.20 28), oklch(0.82 0.16 50))",
                  boxShadow: "0 0 12px oklch(0.62 0.22 28 / 0.65)",
                }}
              />
            </div>
            <span className="text-foreground/50">linha da invisibilidade</span>
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
            <div
              className="flex items-center gap-3 text-[11px] font-mono font-semibold tracking-[0.4em] uppercase mb-6"
              style={{ color: "oklch(0.78 0.19 38)" }}
            >
              <span className="w-6 h-px" style={{ background: "oklch(0.72 0.20 38 / 0.8)" }} />
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

      {/* Outro — câmara escura, citação como peça */}
      <section
        className="relative py-44 lg:py-60 overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 600px at 50% 40%, oklch(0.16 0.04 30 / 0.7), transparent 70%)," +
            "linear-gradient(180deg, oklch(0.06 0.008 30), oklch(0.085 0.012 32) 50%, oklch(0.05 0.006 30))",
          borderTop: "1px solid oklch(0.55 0.18 35 / 0.18)",
        }}
      >
        {/* halo urucum atrás da citação */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 760,
            height: 760,
            background:
              "radial-gradient(circle, oklch(0.55 0.22 26 / 0.16), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        {/* feixe vertical de luz */}
        <div
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent, oklch(0.65 0.18 32 / 0.35) 50%, transparent)",
          }}
        />
        <div className="absolute inset-0 grain pointer-events-none opacity-70" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, oklch(0.04 0.006 30 / 0.85) 100%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center reveal">
          <div
            className="font-serif leading-none select-none pointer-events-none mb-2"
            style={{
              fontSize: "clamp(120px, 18vw, 220px)",
              color: "transparent",
              WebkitTextStroke: "1px oklch(0.62 0.22 28 / 0.35)",
              textShadow: "0 0 60px oklch(0.55 0.22 26 / 0.25)",
            }}
          >
            “
          </div>
          <blockquote className="font-serif text-3xl md:text-[44px] leading-[1.18] tracking-[-0.01em] text-foreground/95">
            Quando pessoas negras dizem que foram apagadas, isso não é metáfora.
            <span className="block mt-5 text-foreground/65">
              A câmera — símbolo de memória e existência — nunca foi calibrada para elas.
            </span>
          </blockquote>
          <div className="mt-12 flex items-center justify-center gap-4 text-[10px] font-mono tracking-[0.4em] uppercase text-foreground/40">
            <span className="w-10 h-px bg-foreground/20" />
            <span style={{ color: "oklch(0.78 0.16 38)" }}>fim · linha da invisibilidade</span>
            <span className="w-10 h-px bg-foreground/20" />
          </div>
        </div>
      </section>
    </>
  );
}

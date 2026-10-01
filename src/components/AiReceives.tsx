import { Camera, MessageCircle, Smartphone, ArrowRight, ArrowDown } from "lucide-react";

const ACCENT = "oklch(0.66 0.24 28)";

type Algoritmo = {
  nome: string;
  src: string;
  ita: string;
  monk: string;
  destaque?: boolean;
};

const ALGORITMOS: Algoritmo[] = [
  { nome: "Original", src: "/images/story/alg-original.png", ita: "-3.3°", monk: "Monk 5" },
  { nome: "Gamma (0.8)", src: "/images/story/alg-gamma.png", ita: "16.7°", monk: "Monk 4" },
  { nome: "Reinhard", src: "/images/story/alg-reinhard.png", ita: "-18.8°", monk: "Monk 6" },
  { nome: "Durand", src: "/images/story/alg-durand.png", ita: "43.8°", monk: "Monk 2" },
  { nome: "MSR Retinex", src: "/images/story/alg-msr.png", ita: "82.1°", monk: "Monk 1" },
  { nome: "CLAHE", src: "/images/story/alg-clahe.png", ita: "-3.5°", monk: "Monk 5" },
  { nome: "Histogram Eq.", src: "/images/story/alg-histeq.png", ita: "-9.3°", monk: "Monk 5" },
  { nome: "AGCWD", src: "/images/story/alg-agcwd.png", ita: "21.7°", monk: "Monk 4" },
  { nome: "Urucum", src: "/images/story/alg-urucum.png", ita: "-3.3°", monk: "Monk 5", destaque: true },
];

function ChapterHeader({ n, titulo, children }: { n: string; titulo: string; children?: React.ReactNode }) {
  return (
    <header className="reveal max-w-3xl">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[12px] tracking-[0.3em] text-foreground/40">{n}.</span>
        <h2 className="font-serif font-light text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.02em] text-foreground/95">
          {titulo}
        </h2>
      </div>
      {children && (
        <p className="mt-6 max-w-[58ch] text-[15px] leading-[1.75] text-foreground/60">{children}</p>
      )}
    </header>
  );
}

function Figure({
  src,
  alt,
  label,
  ita,
  monk,
  destaque,
  tall,
}: {
  src: string;
  alt: string;
  label: string;
  ita?: string;
  monk?: string;
  destaque?: boolean;
  tall?: boolean;
}) {
  return (
    <figure className="flex flex-col gap-4 min-w-0">
      <div
        className="relative overflow-hidden rounded-sm bg-black/40"
        style={destaque ? { boxShadow: `0 0 0 1px ${ACCENT}, 0 0 40px -12px ${ACCENT}` } : undefined}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full ${tall ? "aspect-[3/4]" : "aspect-[3/2]"} object-cover`}
        />
      </div>
      <figcaption className="flex flex-col gap-1">
        <span
          className="font-mono text-[10.5px] tracking-[0.3em] uppercase"
          style={{ color: destaque ? ACCENT : undefined }}
        >
          <span className={destaque ? "" : "text-foreground/55"}>{label}</span>
        </span>
        {ita && (
          <span className="font-mono text-[12px] text-foreground/75">
            {"ITA "}
            {ita}
            <span className="text-foreground/35">{" · "}</span>
            {monk}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function ProblemChapter() {
  return (
    <div className="py-24 md:py-32">
      <ChapterHeader n="02" titulo="O problema">
        Toda imagem de pele passa por um caminho antes de chegar a qualquer sistema. E em cada etapa,
        algo da pele real se perde.
      </ChapterHeader>

      <div className="reveal mt-14 grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center">
        <div className="overflow-hidden rounded-sm">
          <img
            src="/images/story/back-original.png"
            alt="Fotografia das costas de um paciente com pele escura e lesões, como registrada pela câmera"
            className="w-full aspect-[3/2] object-cover"
          />
        </div>

        <ol className="flex flex-col gap-0" aria-label="Caminho da imagem">
          {[
            { t: "Foto", d: "Luz, câmera e exposição variam a cada captura." },
            { t: "Compressão", d: "WhatsApp, apps e servidores reduzem a imagem." },
            { t: "Perda de informação", d: "Tons, texturas e contraste da pele se degradam." },
          ].map((s, i, arr) => (
            <li key={s.t} className="flex flex-col">
              <div className="flex flex-col gap-2 border-t border-border/25 py-6">
                <span
                  className="font-sans text-[15px] tracking-[0.12em] uppercase"
                  style={{ color: i === arr.length - 1 ? ACCENT : undefined }}
                >
                  <span className={i === arr.length - 1 ? "" : "text-foreground/85"}>{s.t}</span>
                </span>
                <span className="text-[14px] leading-[1.7] text-foreground/55">{s.d}</span>
              </div>
              {i < arr.length - 1 && (
                <ArrowDown aria-hidden="true" className="size-4 text-foreground/30 mb-2" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ComparisonChapter() {
  return (
    <div className="py-24 md:py-32 border-t border-border/25">
      <ChapterHeader n="03" titulo="O que acontece com a imagem">
        A mesma foto, três destinos. Métodos tradicionais tentam melhorar a imagem — e acabam
        clareando a pele. A Urucum melhora sem mudar quem a pessoa é.
      </ChapterHeader>

      <div className="reveal mt-14 grid sm:grid-cols-3 gap-6 md:gap-8">
        <Figure
          src="/images/story/alg-original.png"
          alt="Imagem original das costas do paciente"
          label="Original"
          ita="-3.3°"
          monk="Monk 5"
        />
        <Figure
          src="/images/story/alg-msr.png"
          alt="Mesma imagem processada por MSR Retinex, com a pele visivelmente clareada"
          label="Método tradicional"
          ita="82.1°"
          monk="Monk 1"
        />
        <Figure
          src="/images/story/alg-urucum.png"
          alt="Mesma imagem processada pela Urucum, preservando o tom de pele original"
          label="Urucum"
          ita="-3.3°"
          monk="Monk 5"
          destaque
        />
      </div>

      <p className="reveal mt-8 max-w-[60ch] text-[13.5px] leading-[1.75] text-foreground/50">
        O método tradicional moveu o tom de pele de Monk 5 para Monk 1. Para um sistema, é outra
        pessoa.
      </p>

      <div className="reveal mt-20">
        <span className="block font-mono text-[10.5px] tracking-[0.3em] uppercase text-foreground/45">
          Teste comparativo · 8 algoritmos, mesma imagem
        </span>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {ALGORITMOS.slice(1).map((a) => (
            <Figure
              key={a.nome}
              src={a.src}
              alt={`Imagem processada por ${a.nome}`}
              label={a.nome}
              ita={a.ita}
              monk={a.monk}
              destaque={a.destaque}
            />
          ))}
        </div>
      </div>

      <div className="reveal mt-24 grid md:grid-cols-[1fr_1fr_1fr] gap-6 md:gap-8">
        <Figure
          src="/images/story/leg-original.png"
          alt="Foto original de tornozelo com pele escura, capturada com celular"
          label="Captura real · celular"
          tall
        />
        <Figure
          src="/images/story/leg-urucum.png"
          alt="Mesma foto do tornozelo processada pela Urucum"
          label="Processada · Urucum"
          ita="-30.4°"
          monk="Monk 6"
          destaque
          tall
        />
        <Figure
          src="/images/story/leg-mask.png"
          alt="Máscara de pele detectada pela Urucum sobre a foto do tornozelo"
          label="Máscara de pele"
          tall
        />
      </div>
      <p className="reveal mt-8 max-w-[60ch] text-[13.5px] leading-[1.75] text-foreground/50">
        Em uma foto de celular, com luz ruim e pele Monk 6, o tom é preservado com 94% de
        confiabilidade.
      </p>
    </div>
  );
}

function Statement() {
  return (
    <div className="reveal py-24 md:py-32 border-t border-border/25 text-center">
      <p
        className="font-editorial text-[28px] md:text-[44px] leading-[1.2] max-w-[26ch] mx-auto text-foreground/95"
        style={{ textWrap: "balance" }}
      >
        A Urucum não decide o que a imagem significa.{" "}
        <span className="italic" style={{ color: ACCENT }}>
          Ela melhora a qualidade do que o sistema recebe.
        </span>
      </p>
    </div>
  );
}

function SystemChapter() {
  const fontes = [
    { icon: Camera, label: "Câmera" },
    { icon: MessageCircle, label: "WhatsApp" },
    { icon: Smartphone, label: "Aplicativo" },
  ];
  const destinos = ["Triagem", "Acompanhamento", "Telemedicina", "Visão computacional"];

  return (
    <div className="py-24 md:py-32 border-t border-border/25">
      <ChapterHeader n="04" titulo="O que o sistema recebe">
        A Urucum fica entre a captura e o sistema. Tudo que chega depois dela chega com a pele
        preservada.
      </ChapterHeader>

      <div className="reveal mt-16 flex flex-col lg:flex-row items-stretch lg:items-center gap-6 lg:gap-8">
        <ul className="flex lg:flex-col gap-3 justify-center" aria-label="Fontes de imagem">
          {fontes.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 border border-border/30 rounded-sm px-4 py-3 text-[13px] text-foreground/75"
            >
              <Icon aria-hidden="true" className="size-4 text-foreground/50" />
              {label}
            </li>
          ))}
        </ul>

        <ArrowRight aria-hidden="true" className="hidden lg:block size-5 text-foreground/30 shrink-0" />
        <ArrowDown aria-hidden="true" className="lg:hidden size-5 text-foreground/30 self-center" />

        <div
          className="flex flex-col gap-4 rounded-sm p-4 lg:w-[300px] shrink-0"
          style={{ boxShadow: `0 0 0 1px ${ACCENT}, 0 0 60px -20px ${ACCENT}` }}
        >
          <span className="font-mono text-[11px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>
            Urucum
          </span>
          <div className="grid grid-cols-2 gap-2">
            <img
              src="/images/story/back-urucum.png"
              alt="Imagem processada pela Urucum"
              className="w-full aspect-[3/2] object-cover rounded-sm"
            />
            <img
              src="/images/story/back-mask.png"
              alt="Máscara de pele detectada"
              className="w-full aspect-[3/2] object-cover rounded-sm"
            />
          </div>
          <span className="font-mono text-[11px] text-foreground/60">
            {"ITA -3.3° · Monk 5 · 90% confiabilidade"}
          </span>
        </div>

        <ArrowRight aria-hidden="true" className="hidden lg:block size-5 text-foreground/30 shrink-0" />
        <ArrowDown aria-hidden="true" className="lg:hidden size-5 text-foreground/30 self-center" />

        <div className="flex-1 flex flex-col gap-4 border border-border/30 rounded-sm p-6">
          <span className="font-sans text-[15px] tracking-[0.12em] uppercase text-foreground/90">
            Sistema
          </span>
          <ul className="flex flex-wrap gap-2" aria-label="Aplicações do sistema">
            {destinos.map((d) => (
              <li
                key={d}
                className="font-mono text-[11px] tracking-[0.12em] uppercase px-3 py-2 rounded-full border border-border/30 text-foreground/65"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="reveal mt-20 max-w-[62ch] text-[13.5px] leading-[1.75] text-foreground/45">
        A Urucum é uma camada de processamento fotométrico adaptativo para imagens de pele,
        posicionada antes dos sistemas de visão computacional. Não é um sistema de diagnóstico e
        não substitui redes neurais, dermatologistas ou sistemas clínicos.
      </p>
    </div>
  );
}

export function AiReceives() {
  return (
    <section
      id="o-que-a-ia-recebe"
      aria-label="Do problema ao sistema"
      className="relative bg-background border-t border-border/30"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12">
        <ProblemChapter />
        <ComparisonChapter />
        <Statement />
        <SystemChapter />
      </div>
    </section>
  );
}

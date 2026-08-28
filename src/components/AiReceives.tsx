// Seção de transição entre a linha histórica e a tecnologia da Urucum.
// Compara dois caminhos — SEM URUCUM / COM URUCUM — em quatro etapas de
// processo. Sem alegações clínicas, sem linguagem exagerada: a Urucum é uma
// camada de processamento fotométrico posicionada ANTES dos modelos de visão.

const ETAPAS = [
  {
    n: "01",
    titulo: "CAPTURA",
    sem: "A imagem é capturada sob condições variáveis de iluminação, exposição e dispositivo.",
    com: "A imagem é caracterizada para compreender suas condições fotométricas antes do processamento.",
  },
  {
    n: "02",
    titulo: "PROCESSAMENTO",
    sem: "Métodos de processamento transformam a imagem para melhorar contraste, iluminação ou aparência.",
    com: "A correção é adaptada às características fotométricas observadas na imagem.",
  },
  {
    n: "03",
    titulo: "IMAGEM",
    sem: "A transformação pode alterar a distribuição dos tons e outras características visuais da pele.",
    com: "O processamento busca melhorar a representação da imagem preservando características fotométricas mensuráveis.",
  },
  {
    n: "04",
    titulo: "VISÃO COMPUTACIONAL",
    sem: "O modelo recebe a imagem processada.",
    com: "O modelo recebe uma imagem preparada antes da inferência.",
  },
];

function StepRow({
  etapa,
}: {
  etapa: (typeof ETAPAS)[number];
}) {
  return (
    <div className="grid md:grid-cols-[200px_1fr_1fr] gap-6 md:gap-10 border-b border-border/50 py-10 first:pt-0 last:border-b-0">
      {/* Número + etapa */}
      <div className="flex md:flex-col items-baseline md:items-start gap-3">
        <span className="font-mono text-[12px] tracking-[0.3em] text-foreground/45">
          {etapa.n}
        </span>
        <h3 className="font-serif text-[17px] md:text-[19px] tracking-[0.08em] uppercase text-foreground/90">
          {etapa.titulo}
        </h3>
      </div>

      {/* SEM URUCUM */}
      <div className="rounded-[4px] border border-border/60 bg-card/40 px-6 py-6">
        <span className="block font-mono text-[11px] tracking-[0.3em] uppercase text-foreground/45 mb-4">
          Sem Urucum
        </span>
        <p className="text-[14.5px] leading-[1.7] text-foreground/65 max-w-none">
          {etapa.sem}
        </p>
      </div>

      {/* COM URUCUM */}
      <div
        className="rounded-[4px] px-6 py-6"
        style={{
          border: "1px solid oklch(0.55 0.18 35 / 0.35)",
          background: "oklch(0.15 0.020 35 / 0.5)",
        }}
      >
        <span
          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase mb-4"
          style={{ color: "oklch(0.66 0.20 30)" }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "oklch(0.62 0.22 28)" }}
          />
          Com Urucum
        </span>
        <p className="text-[14.5px] leading-[1.7] text-foreground/85 max-w-none">
          {etapa.com}
        </p>
      </div>
    </div>
  );
}

export function AiReceives() {
  return (
    <section
      id="o-que-a-ia-recebe"
      aria-labelledby="ai-receives-heading"
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.078 0.010 30), oklch(0.105 0.014 36) 30%, oklch(0.105 0.014 36) 70%, oklch(0.095 0.012 34))",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        {/* Cabeçalho — transição editorial */}
        <div className="reveal max-w-3xl">
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.42em] uppercase text-foreground/55">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.62 0.24 26)",
                boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
              }}
            />
            <span>O que a IA recebe</span>
          </div>

          <h2
            id="ai-receives-heading"
            className="mt-7 font-serif font-medium text-[34px] md:text-[52px] leading-[1.06] tracking-[-0.02em] text-foreground/95"
          >
            O problema começa antes do modelo.
          </h2>

          <p className="mt-6 max-w-[58ch] text-[15px] leading-[1.75] text-foreground/65">
            Uma câmera captura uma imagem. Algoritmos transformam essa imagem.
            Modelos de inteligência artificial aprendem a partir dela. A Urucum
            atua nesse intervalo: antes que a imagem se torne dado para a visão
            computacional.
          </p>
        </div>

        {/* Fluxo linear — quatro verbos */}
        <ol
          className="reveal mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] tracking-[0.24em] uppercase text-foreground/55"
          aria-label="Fluxo de processamento da imagem"
        >
          {["Captura", "Processamento", "Imagem", "Visão computacional"].map(
            (label, i, arr) => (
              <li key={label} className="flex items-center gap-4">
                <span className="text-foreground/70">{label}</span>
                {i < arr.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-foreground/30 select-none"
                  >
                    →
                  </span>
                )}
              </li>
            ),
          )}
        </ol>

        {/* Comparação em quatro etapas */}
        <div
          className="reveal mt-16 border-t border-border/50"
          role="list"
          aria-label="Comparação entre pipeline sem Urucum e com Urucum"
        >
          {ETAPAS.map((etapa) => (
            <div role="listitem" key={etapa.n}>
              <StepRow etapa={etapa} />
            </div>
          ))}
        </div>

        {/* Fechamento */}
        <div className="reveal mt-24 md:mt-32 text-center">
          <p className="font-serif font-medium text-[28px] md:text-[44px] leading-[1.12] tracking-[-0.015em] text-foreground/95 max-w-[22ch] mx-auto">
            Antes da IA enxergar, a imagem precisa estar preparada.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-10 h-px w-24"
            style={{ background: "oklch(0.55 0.18 35 / 0.4)" }}
          />

          <p className="mt-10 max-w-[62ch] mx-auto text-[13.5px] leading-[1.75] text-foreground/50">
            A Urucum é uma camada de processamento fotométrico adaptativo para
            imagens de pele, posicionada antes dos sistemas de visão
            computacional. Não é um sistema de diagnóstico e não substitui
            redes neurais, dermatologistas ou sistemas clínicos.
          </p>
        </div>
      </div>
    </section>
  );
}

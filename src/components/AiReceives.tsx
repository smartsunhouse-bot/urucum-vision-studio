// Seção de transição entre a linha histórica e a tecnologia da Urucum.
// Fluxo editorial aberto — sem cards, sem caixas. Apenas linhas finas de
// separação e tipografia flutuando sobre o fundo.

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

function StepRow({ etapa }: { etapa: (typeof ETAPAS)[number] }) {
  return (
    <div className="grid md:grid-cols-[180px_1fr_1fr] gap-8 md:gap-12 border-t border-border/25 py-12 md:py-16">
      {/* Número + etapa */}
      <div className="flex md:flex-col items-baseline md:items-start gap-3">
        <span className="font-mono text-[12px] tracking-[0.3em] text-foreground/40">
          {etapa.n}
        </span>
        <h3 className="font-sans text-[15px] md:text-[16px] tracking-[0.12em] uppercase text-foreground/85">
          {etapa.titulo}
        </h3>
      </div>

      {/* SEM URUCUM */}
      <div className="min-w-0">
        <span className="block font-mono text-[10.5px] tracking-[0.3em] uppercase text-foreground/40 mb-4">
          Sem Urucum
        </span>
        <p className="text-[14.5px] leading-[1.75] text-foreground/55 max-w-[42ch]">
          {etapa.sem}
        </p>
      </div>

      {/* COM URUCUM */}
      <div className="min-w-0 md:border-l md:border-border/25 md:pl-12">
        <span
          className="block font-mono text-[10.5px] tracking-[0.3em] uppercase mb-4"
          style={{ color: "oklch(0.68 0.20 30)" }}
        >
          Com Urucum
        </span>
        <p className="text-[14.5px] leading-[1.75] text-foreground/85 max-w-[42ch]">
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
      className="relative bg-background border-t border-border/30"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12 py-28 md:py-40">
        {/* Cabeçalho */}
        <div className="reveal max-w-3xl">
          <span className="font-mono text-[11px] tracking-[0.34em] uppercase text-foreground/50">
            O que a IA recebe
          </span>

          <h2
            id="ai-receives-heading"
            className="mt-7 font-sans font-medium text-[32px] md:text-[52px] leading-[1.06] tracking-[-0.025em] text-foreground/95"
          >
            O problema começa antes do modelo.
          </h2>

          <p className="mt-6 max-w-[58ch] text-[15px] leading-[1.75] text-foreground/60">
            Uma câmera captura uma imagem. Algoritmos transformam essa imagem.
            Modelos de inteligência artificial aprendem a partir dela. A Urucum
            atua nesse intervalo: antes que a imagem se torne dado para a visão
            computacional.
          </p>
        </div>

        {/* Fluxo linear */}
        <ol
          className="reveal mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11.5px] tracking-[0.24em] uppercase text-foreground/50"
          aria-label="Fluxo de processamento da imagem"
        >
          {["Captura", "Processamento", "Imagem", "Visão computacional"].map(
            (label, i, arr) => (
              <li key={label} className="flex items-center gap-4">
                <span className="text-foreground/70">{label}</span>
                {i < arr.length - 1 && (
                  <span aria-hidden="true" className="text-foreground/25 select-none">
                    →
                  </span>
                )}
              </li>
            ),
          )}
        </ol>

        {/* Etapas */}
        <div
          className="reveal mt-20"
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
        <div className="reveal mt-32 md:mt-40 text-center border-t border-border/25 pt-24">
          <p
            className="font-editorial text-[28px] md:text-[46px] leading-[1.2] max-w-[24ch] mx-auto"
            style={{ textWrap: "balance" }}
          >
            “Antes da IA enxergar, a imagem precisa estar preparada.”
          </p>

          <p className="mt-12 max-w-[62ch] mx-auto text-[13.5px] leading-[1.75] text-foreground/45">
            A Urucum é uma camada de processamento fotométrico adaptativo para
            imagens de pele, posicionada antes dos sistemas de visão
            computacional. Não é um sistema de diagnóstico e não substitui redes
            neurais, dermatologistas ou sistemas clínicos.
          </p>
        </div>
      </div>
    </section>
  );
}

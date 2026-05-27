// A Base Científica — fichas de arquivo (dossiê) com aba superior + linha leve.
// Substitui os antigos cards quadrados por silhuetas de "arquivo morto" /
// pasta suspensa, mantendo a mesma informação editorial.

const refs = [
  {
    code: "DOC-01",
    title: "Race After Technology",
    author: "Ruha Benjamin",
    year: "2019",
    quote:
      "Ferramentas neutras não existem. Cada câmera carrega a história de quem ela foi calibrada para enxergar.",
    tag: "sociologia da tecnologia · Princeton",
  },
  {
    code: "DOC-02",
    title: "Algorithms of Oppression",
    author: "Safiya Umoja Noble",
    year: "2018",
    quote:
      "O viés algorítmico não é um bug — é um espelho amplificado das ausências nos dados de treino.",
    tag: "data studies · UCLA",
  },
  {
    code: "DOC-03",
    title: "Gender Shades",
    author: "Joy Buolamwini · Timnit Gebru",
    year: "2018",
    quote:
      "A taxa de erro em mulheres negras chegou a 34,7% — contra 0,8% em homens brancos. A falha é estrutural.",
    tag: "MIT Media Lab · auditoria comercial",
  },
  {
    code: "DOC-04",
    title: "Pele Alvo",
    author: "Silvio Almeida",
    year: "2018",
    quote:
      "O racismo estrutural se inscreve também nos instrumentos técnicos: o sensor é uma das suas materialidades.",
    tag: "filosofia do direito · USP",
  },
];

export function ScientificBase() {
  return (
    <section
      id="ciencia"
      className="relative py-28 lg:py-36"
      style={{
        background:
          "radial-gradient(800px 500px at 18% 30%, oklch(0.18 0.05 30 / 0.45), transparent 60%)," +
          "linear-gradient(180deg, oklch(0.095 0.012 34), oklch(0.082 0.010 32))",
      }}
    >
      <div className="absolute inset-0 grain-fine pointer-events-none opacity-50" />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.62 0.24 26)",
                boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
              }}
            />
            <span>03 · base científica · arquivo</span>
          </div>

          <h2 className="mt-6 font-serif font-light text-[40px] md:text-[56px] lg:text-[64px] leading-[1.02] tracking-[-0.02em] text-foreground/95">
            A ciência já{" "}
            <span
              className="italic"
              style={{
                color: "oklch(0.66 0.24 28)",
                textShadow: "0 0 32px oklch(0.55 0.22 25 / 0.4)",
              }}
            >
              havia avisado.
            </span>
          </h2>
          <p className="mt-6 max-w-[58ch] text-[15px] leading-[1.7] text-foreground/65">
            Quatro décadas de literatura técnica, sociológica e jurídica
            descrevem o mesmo padrão. A Urucum AI traduz esse acúmulo em
            infraestrutura — não em manifesto.
          </p>
        </div>

        {/* Fichas de arquivo — silhueta de pasta com aba superior */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {refs.map((r, idx) => (
            <article key={r.title} className="relative group">
              {/* Aba (tab) do arquivo */}
              <div className="absolute -top-3 left-6 flex items-center gap-2 px-3 h-6 font-mono text-[9.5px] tracking-[0.32em] uppercase z-10"
                   style={{
                     color: "var(--muted-foreground)",
                     background: "oklch(0.105 0.014 34)",
                     border: "1px solid oklch(0.55 0.18 35 / 0.25)",
                     borderBottom: "none",
                     clipPath:
                       "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%)",
                   }}>
                <span style={{ color: "oklch(0.66 0.24 28)" }}>{r.code}</span>
                <span className="opacity-50">·</span>
                <span>{r.year}</span>
              </div>

              {/* Corpo da ficha — linha fina, sem preenchimento pesado */}
              <div
                className="relative pt-10 pb-9 pl-8 pr-7 transition-colors duration-500 group-hover:border-[oklch(0.55_0.18_35_/_0.45)]"
                style={{
                  border: "1px solid oklch(0.55 0.18 35 / 0.22)",
                  background:
                    "linear-gradient(180deg, oklch(0.105 0.014 34 / 0.6), oklch(0.092 0.012 32 / 0.4))",
                }}
              >
                {/* margem interna tipo formulário arquivado */}
                <span
                  className="absolute left-3 top-3 bottom-3 w-px"
                  style={{ background: "oklch(0.55 0.18 35 / 0.18)" }}
                />
                {/* furos de fichário */}
                <span className="absolute left-[5px] top-9 w-[3px] h-[3px] rounded-full"
                      style={{ background: "oklch(0.55 0.18 35 / 0.5)" }} />
                <span className="absolute left-[5px] top-1/2 w-[3px] h-[3px] rounded-full"
                      style={{ background: "oklch(0.55 0.18 35 / 0.5)" }} />
                <span className="absolute left-[5px] bottom-9 w-[3px] h-[3px] rounded-full"
                      style={{ background: "oklch(0.55 0.18 35 / 0.5)" }} />

                <div className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/45">
                  referência arquivada · vol. {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  className="mt-3 font-serif font-light text-[26px] lg:text-[32px] leading-[1.08] tracking-[-0.015em]"
                  style={{ color: "oklch(0.94 0.03 35)" }}
                >
                  {r.title}
                </h3>
                <div className="mt-2 text-[13px] text-foreground/65 font-mono tracking-wide">
                  {r.author}
                </div>

                <blockquote
                  className="relative mt-7 pl-5 text-[15px] leading-[1.75] text-foreground/82 italic font-serif"
                  style={{ borderLeft: "1px solid oklch(0.55 0.18 35 / 0.4)" }}
                >
                  “{r.quote}”
                </blockquote>

                <div className="mt-7 pt-4 flex items-center justify-between border-t border-foreground/10">
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/45">
                    {r.tag}
                  </span>
                  {/* carimbo "arquivado" */}
                  <span
                    className="font-mono text-[8.5px] tracking-[0.4em] uppercase px-2 py-0.5 rotate-[-4deg]"
                    style={{
                      color: "oklch(0.66 0.24 28 / 0.85)",
                      border: "1px solid oklch(0.66 0.24 28 / 0.45)",
                    }}
                  >
                    arquivado
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

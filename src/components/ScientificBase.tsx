// A Base Científica — autoridade epistêmica via citações.

const refs = [
  {
    title: "Race After Technology",
    author: "Ruha Benjamin",
    year: "2019",
    quote:
      "Ferramentas neutras não existem. Cada câmera carrega a história de quem ela foi calibrada para enxergar.",
    tag: "sociologia da tecnologia · Princeton",
  },
  {
    title: "Algorithms of Oppression",
    author: "Safiya Umoja Noble",
    year: "2018",
    quote:
      "O viés algorítmico não é um bug — é um espelho amplificado das ausências nos dados de treino.",
    tag: "data studies · UCLA",
  },
  {
    title: "Gender Shades",
    author: "Joy Buolamwini · Timnit Gebru",
    year: "2018",
    quote:
      "A taxa de erro em mulheres negras chegou a 34,7% — contra 0,8% em homens brancos. A falha é estrutural.",
    tag: "MIT Media Lab · auditoria comercial",
  },
  {
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
            <span>03 · base científica</span>
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/8 border border-foreground/10">
          {refs.map((r) => (
            <article
              key={r.title}
              className="relative p-7 lg:p-10 bg-[oklch(0.092_0.012_34)] hover:bg-[oklch(0.102_0.014_34)] transition-colors duration-500 flex flex-col gap-6"
            >
              <span className="absolute top-2 left-2 w-2 h-px bg-foreground/25" />
              <span className="absolute top-2 left-2 w-px h-2 bg-foreground/25" />

              <div className="flex items-start justify-between gap-6">
                {/* Minimal "book cover" */}
                <div
                  className="shrink-0 w-16 h-24 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.18 0.04 30), oklch(0.12 0.02 28))",
                    boxShadow:
                      "inset 0 0 0 1px oklch(0.55 0.18 35 / 0.25), 0 8px 24px -8px oklch(0 0 0 / 0.6)",
                  }}
                >
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{
                      background: "oklch(0.62 0.24 26)",
                      boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.6)",
                    }}
                  />
                  <span className="absolute inset-x-2 bottom-2 text-[6.5px] font-mono tracking-[0.28em] uppercase text-foreground/55 leading-tight">
                    {r.year}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/40">
                    referência · {r.year}
                  </div>
                  <h3
                    className="mt-2 font-serif font-light text-[24px] lg:text-[28px] leading-[1.1] tracking-[-0.01em]"
                    style={{ color: "oklch(0.94 0.03 35)" }}
                  >
                    {r.title}
                  </h3>
                  <div className="mt-1.5 text-[13px] text-foreground/65">
                    {r.author}
                  </div>
                </div>
              </div>

              <blockquote
                className="relative pl-5 text-[15px] leading-[1.7] text-foreground/80 italic font-serif"
                style={{ borderLeft: "1px solid oklch(0.55 0.18 35 / 0.4)" }}
              >
                “{r.quote}”
              </blockquote>

              <div className="pt-4 border-t border-foreground/10 text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/45">
                {r.tag}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

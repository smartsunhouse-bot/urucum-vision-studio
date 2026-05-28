// Base científica — versão silenciosa.
// Sem códigos DOC, sem aba de arquivo, sem furos, sem carimbos.
// Apenas tipografia, respiro e a mesma frase repetida como mantra editorial,
// atribuída a quatro vozes que sustentam o pensamento da Urucum.

const voices = [
  { author: "Ruha Benjamin", context: "Race After Technology · 2019" },
  { author: "Safiya Umoja Noble", context: "Algorithms of Oppression · 2018" },
  { author: "Joy Buolamwini", context: "Gender Shades · MIT · 2018" },
  { author: "Silvio Almeida", context: "Racismo Estrutural · 2018" },
];

const phrase = "O problema não começa no modelo. Começa na imagem.";

export function ScientificBase() {
  return (
    <section
      id="ciencia"
      className="relative py-40 lg:py-56"
      style={{ background: "oklch(0.095 0.012 34)" }}
    >
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho mínimo */}
        <div className="max-w-2xl">
          <div
            className="font-mono text-[10px] tracking-[0.42em] uppercase"
            style={{ color: "var(--muted-foreground)" }}
          >
            Base científica
          </div>
          <h2 className="mt-8 font-serif font-light text-[34px] md:text-[46px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] text-foreground/95">
            A ciência já havia avisado.
          </h2>
        </div>

        {/* Quatro vozes, muito espaço entre elas */}
        <div className="mt-24 lg:mt-32 space-y-24 lg:space-y-32">
          {voices.map((v, i) => (
            <article
              key={v.author}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-baseline"
            >
              <div className="lg:col-span-3">
                <div
                  className="font-mono text-[10px] tracking-[0.36em] uppercase"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-4 font-serif text-[20px] leading-tight text-foreground/95">
                  {v.author}
                </div>
                <div
                  className="mt-2 text-[12px] font-mono tracking-wide"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {v.context}
                </div>
              </div>

              <blockquote className="lg:col-span-9 font-serif font-light text-[24px] md:text-[30px] lg:text-[34px] leading-[1.25] tracking-[-0.015em] text-foreground/90 max-w-[28ch]">
                {phrase}
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

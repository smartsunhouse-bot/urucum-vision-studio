// Base científica — versão concisa.
// Uma única tese forte, seguida das quatro vozes como referência editorial.

const voices = [
  { author: "Ruha Benjamin", context: "Race After Technology · 2019" },
  { author: "Safiya Umoja Noble", context: "Algorithms of Oppression · 2018" },
  { author: "Joy Buolamwini", context: "Gender Shades · MIT · 2018" },
  { author: "Silvio Almeida", context: "Racismo Estrutural · 2018" },
];

export function ScientificBase() {
  return (
    <section
      id="ciencia"
      className="relative py-32 lg:py-44"
      style={{ background: "oklch(0.095 0.012 34)" }}
    >
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        <div
          className="font-mono text-[10px] tracking-[0.42em] uppercase"
          style={{ color: "var(--muted-foreground)" }}
        >
          Base científica
        </div>

        <h2 className="mt-10 font-serif font-light text-[40px] md:text-[58px] lg:text-[72px] leading-[1.02] tracking-[-0.025em] text-foreground/95 max-w-[18ch]">
          O problema não começa no modelo.
          <span className="block italic text-foreground/70">
            Começa na imagem.
          </span>
        </h2>

        <p
          className="mt-10 max-w-[58ch] text-[15px] md:text-[17px] leading-[1.7] font-light"
          style={{ color: "var(--muted-foreground)" }}
        >
          A literatura crítica de visão computacional já demonstrou, há mais
          de uma década, que o viés racial em sistemas de reconhecimento
          não é um defeito de modelo — é uma decisão de dataset.
        </p>

        {/* Vozes como referência editorial, linha única */}
        <div
          className="mt-20 lg:mt-24 pt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t"
          style={{ borderColor: "oklch(0.55 0.05 35 / 0.15)" }}
        >
          {voices.map((v, i) => (
            <div key={v.author}>
              <div
                className="font-mono text-[9.5px] tracking-[0.32em] uppercase"
                style={{ color: "var(--muted-foreground)" }}
              >
                {String(i + 1).padStart(2, "0")} · Referência
              </div>
              <div className="mt-4 font-serif text-[19px] leading-tight text-foreground/95">
                {v.author}
              </div>
              <div
                className="mt-2 text-[12px] font-mono tracking-wide"
                style={{ color: "var(--muted-foreground)" }}
              >
                {v.context}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

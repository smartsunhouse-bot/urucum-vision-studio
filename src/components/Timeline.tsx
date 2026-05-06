const blocks = [
  {
    year: "1839",
    tag: "origem",
    title: "Daguerreótipo",
    body: "A fotografia nasce na Europa. Parâmetros de exposição e iluminação calibrados para pele branca. Rostos negros superexpostos, tons apagados.",
  },
  {
    year: "1950s",
    tag: "formalização",
    title: "Shirley Card — Kodak",
    body: "A indústria adota uma mulher branca como referência absoluta de cor. Toda a cadeia de captura é calibrada para um único rosto.",
  },
  {
    year: "1970s",
    tag: "ruptura",
    title: "A mudança não veio por representatividade.",
    body: "Empresas reclamam que objetos escuros não aparecem corretamente. A indústria ajusta seus parâmetros por necessidade comercial.",
  },
  {
    year: "Hoje",
    tag: "escala",
    title: "O viés foi automatizado.",
    body: "Sistemas de inteligência artificial herdam os mesmos padrões de captura e os escalam para bilhões de decisões.",
  },
];

export function Timeline() {
  return (
    <section className="relative py-40 lg:py-56 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="reveal max-w-3xl">
          <div className="text-[11px] font-mono tracking-[0.32em] uppercase text-urucum/80 mb-6">
            ◦ Capítulo I · Contexto histórico
          </div>
          <h2 className="font-serif font-light text-4xl md:text-6xl leading-[1.02] tracking-[-0.015em]">
            Um padrão que durou
            <span className="italic"> séculos.</span>
          </h2>
          <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-muted-foreground max-w-2xl">
            <p>
              Antes da inteligência artificial, já existia um padrão invisível.
              A fotografia não surgiu em um vácuo.
            </p>
            <p>
              Foi desenvolvida dentro de sociedades racialmente hierarquizadas, e seus parâmetros técnicos — exposição, iluminação e resposta química — foram calibrados para um único tipo de pele.
            </p>
            <p className="text-foreground/80">
              Esse padrão se propagou silenciosamente por gerações de tecnologia.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-32">
          <div
            className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, oklch(0.55 0.18 35 / 0.5) 10%, oklch(0.55 0.18 35 / 0.5) 90%, transparent)",
            }}
          />
          <ol className="space-y-32 md:space-y-44">
            {blocks.map((b, i) => {
              const right = i % 2 === 1;
              return (
                <li key={b.year} className="relative reveal">
                  <span
                    className="absolute left-0 md:left-1/2 -translate-x-1/2 top-2 w-4 h-4 rounded-full"
                    style={{
                      background: "oklch(0.14 0.018 40)",
                      boxShadow: "0 0 0 1px oklch(0.55 0.18 35 / 0.6), 0 0 24px 2px oklch(0.55 0.18 35 / 0.45)",
                    }}
                  />
                  <div
                    className={`md:grid md:grid-cols-2 md:gap-16 ${right ? "md:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div className={`pl-8 md:pl-0 ${right ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                      <div className="font-serif text-5xl md:text-6xl text-foreground/90 leading-none">
                        {b.year}
                      </div>
                      <div className="mt-3 text-[11px] font-mono uppercase tracking-[0.3em] text-urucum/80">
                        {b.tag}
                      </div>
                    </div>
                    <div className={`pl-8 md:pl-0 mt-6 md:mt-0 ${right ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                      <h3 className="font-serif text-2xl md:text-3xl leading-snug text-foreground">
                        {b.title}
                      </h3>
                      <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground max-w-md md:inline-block">
                        {b.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Final quote */}
        <div className="reveal mt-44 max-w-3xl mx-auto text-center">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-urucum/70 mb-8">
            ◦ Conclusão do capítulo
          </div>
          <blockquote className="font-serif text-3xl md:text-[42px] leading-[1.18] tracking-[-0.01em] text-foreground/95">
            “Quando pessoas negras dizem que foram apagadas, isso não é metáfora.
            <span className="block mt-4 text-foreground/70">
              A câmera — símbolo de memória e existência — nunca foi calibrada para elas.”
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

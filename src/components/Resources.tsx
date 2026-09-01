const items = [
  {
    id: "patente",
    code: "IP",
    title: "Propriedade Intelectual",
    desc: "Patente técnica da pipeline radiométrica adaptativa da Urucum: preservação fotométrica em fototipos IV–VI sob baixa luz.",
    meta: "Depósito técnico · BR · pipeline λ γ σ",
  },
  {
    id: "suporte",
    code: "DX",
    title: "Suporte ao Desenvolvedor",
    desc: "Canal direto com engenheiros que integram a pipeline: revisão de payload, tuning de parâmetros e validação de manifesto.",
    meta: "Resposta técnica em até 1 dia útil",
    href: "#contato",
  },
];

export function Resources() {
  return (
    <section
      id="recursos"
      className="relative py-32 lg:py-44 border-t border-border/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal max-w-2xl mb-16">
          <div className="flex items-center gap-3 text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55 mb-5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.62 0.24 26)",
                boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
              }}
            />
            <span>Recursos</span>
          </div>
          <h2 className="font-serif font-light text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] text-foreground/95">
            Ecossistema em volta da{" "}
            <span className="italic" style={{ color: "oklch(0.66 0.24 28)" }}>
              integração.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((i) => (
            <div
              key={i.id}
              id={i.id}
              className="reveal scroll-mt-28 rounded-sm border border-border bg-[oklch(0.11_0.014_36)] p-8"
            >
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.32em] uppercase text-muted-foreground">
                <span className="text-urucum/80">{i.code}</span>
                <span>{i.meta}</span>
              </div>
              <h3 className="mt-5 font-serif text-2xl text-foreground/95">
                {i.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground max-w-[52ch]">
                {i.desc}
              </p>
              {i.href && (
                <a
                  href={i.href}
                  className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-mono uppercase tracking-[0.2em] text-urucum/90 hover:text-urucum transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  Falar com um engenheiro →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

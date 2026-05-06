const stats = [
  { k: "−71%", l: "redução de variância entre grupos" },
  { k: "0.92", l: "consistência de resposta inter-tonal" },
  { k: "3.4×", l: "robustez sob low-light" },
  { k: "100%", l: "rastreabilidade de metadados" },
];

export function Results() {
  return (
    <section id="resultados" className="relative py-32 lg:py-44 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal max-w-2xl mb-20">
          <div className="text-[11px] font-mono uppercase tracking-[0.32em] text-urucum/80 mb-5">
            ◦ Resultados
          </div>
          <h2 className="font-serif font-light text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em]">
            Estabilidade <span className="italic">mensurável.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-[15.5px] leading-relaxed">
            Resultados agregados de pipelines em produção. Métricas validadas em datasets controlados de visão biomédica e identidade.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 rounded-sm overflow-hidden">
          {stats.map((s) => (
            <div key={s.l} className="reveal bg-background p-8 md:p-10 min-h-[200px] flex flex-col justify-between">
              <div className="font-serif text-5xl md:text-6xl tracking-tight text-foreground">
                {s.k}
              </div>
              <div className="text-[12.5px] text-muted-foreground leading-relaxed">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

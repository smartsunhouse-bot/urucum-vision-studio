const developerIncludes = [
  "Acesso ao endpoint /v1/generate",
  "Controle paramétrico λ · γ · σ",
  "Manifesto determinístico por seed",
  "Latência de borda 14.4 ms",
];

const enterpriseIncludes = [
  "Processamento local (on-premise)",
  "Segurança bancária · isolamento de rede",
  "Compliance médico e trilha de auditoria",
  "Engenharia dedicada na integração",
];

export function Pricing() {
  return (
    <section
      id="precos"
      className="relative py-32 lg:py-44 border-t border-border/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal max-w-2xl mb-16">
          <div className="text-[11px] font-mono uppercase tracking-[0.32em] text-urucum/80 mb-5">
            ◦ Preços
          </div>
          <h2 className="font-serif font-light text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em]">
            Comece por requisição.{" "}
            <span className="italic">Escale por contrato.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Self-serve */}
          <div className="reveal rounded-sm border border-border bg-[oklch(0.11_0.014_36)] p-8 flex flex-col">
            <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Plano Desenvolvedor · self-serve
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-5xl leading-none text-foreground">
                R$ 0,04
              </span>
              <span className="text-[13px] text-muted-foreground">
                / requisição
              </span>
            </div>
            <p className="mt-4 text-[14px] leading-[1.65] text-muted-foreground max-w-[46ch]">
              Valor fixo por chamada de API. Para testar, prototipar e integrar
              em aplicações menores — sem contrato mínimo.
            </p>
            <ul className="mt-8 space-y-3 border-t border-border/60 pt-6">
              {developerIncludes.map((i) => (
                <li key={i} className="flex gap-3 text-[13.5px] text-foreground/80">
                  <span className="font-mono text-[11px] text-urucum/80 mt-[3px]">
                    ▸
                  </span>
                  {i}
                </li>
              ))}
            </ul>
            <a
              href="/auth"
              className="mt-8 inline-flex items-center justify-center h-11 px-5 rounded-lg text-[13px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Obter chave de API
            </a>
          </div>

          {/* Enterprise */}
          <div className="reveal rounded-sm border border-border bg-[oklch(0.10_0.012_35)] p-8 flex flex-col">
            <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Plano Enterprise · bancos & saúde
            </div>
            <div className="mt-6 font-serif text-4xl leading-none text-foreground">
              Sob consulta
            </div>
            <p className="mt-4 text-[14px] leading-[1.65] text-muted-foreground max-w-[48ch]">
              Precisa de processamento local (on-premise), segurança bancária ou
              compliance médico? Entre em contato com nossa engenharia.
            </p>
            <ul className="mt-8 space-y-3 border-t border-border/60 pt-6">
              {enterpriseIncludes.map((i) => (
                <li key={i} className="flex gap-3 text-[13.5px] text-foreground/80">
                  <span className="font-mono text-[11px] text-urucum/80 mt-[3px]">
                    ▸
                  </span>
                  {i}
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center justify-center h-11 px-5 rounded-lg text-[13px] font-medium text-foreground/90 border border-[oklch(0.35_0.03_40_/0.6)] hover:border-[oklch(0.45_0.04_40_/0.8)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Falar com engenharia
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

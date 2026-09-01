const plans = [
  {
    label: "TESTE · SEM CARTÃO",
    name: "Semente",
    price: "Grátis",
    phrase: "Pra testar a calibração antes de decidir.",
    bullets: [
      "Limite de requisições/mês incluído",
      "Sem cartão de crédito",
      "Suporte via comunidade",
    ],
    cta: "Criar conta gratuita",
    featured: false,
  },
  {
    label: "SELF-SERVE",
    name: "Broto",
    price: "R$ 0,25",
    priceSuffix: "/ requisição",
    phrase: "Pra prototipar e integrar sem contrato.",
    bullets: ["Paga só pelo que usar", "Sem mensalidade fixa", "Ativa na hora"],
    cta: "Começar agora",
    featured: false,
  },
  {
    label: "PRODUÇÃO EM ESCALA",
    name: "Floração",
    price: "Mínimo mensal",
    priceSuffix: "+ uso",
    phrase: "Pra quem já processa volume real todo mês.",
    bullets: [
      "Suporte prioritário",
      "Compliance LGPD para dados de saúde",
      "SLA de resposta",
    ],
    cta: "Começar agora",
    featured: false,
  },
  {
    label: "LICENCIAMENTO · HARDWARE & SAÚDE",
    name: "Colheita",
    price: "Sob consulta",
    phrase: "Pra rodar dentro do seu hardware, sem dado saindo.",
    bullets: [
      "Processamento on-device/on-premise",
      "Licenciamento da patente",
      "Nenhuma imagem sai do seu ambiente",
    ],
    cta: "Falar com vendas",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section
      id="precos"
      className="relative py-28 sm:py-36 lg:py-44 border-t border-border/40"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20 sm:mb-24">
          <div className="flex items-center gap-3 text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.62 0.24 26)",
                boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
              }}
            />
            <span>Preços</span>
          </div>

          <h2 className="mt-6 sm:mt-8 font-serif font-light text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em] text-foreground/95">
            Comece por requisição.{" "}
            <span className="italic" style={{ color: "oklch(0.66 0.24 28)" }}>
              Escale por contrato.
            </span>
          </h2>
        </div>

        {/* Colunas editoriais abertas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-border/40">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="relative flex flex-col min-w-0 py-10 lg:py-12 lg:pr-8 lg:pl-8 lg:first:pl-0 border-b border-border/25 lg:border-b-0 lg:border-l lg:first:border-l-0 border-l-0"
            >
              {plan.featured && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 lg:left-8 lg:first:left-0 h-px w-16"
                  style={{ background: "var(--peach)" }}
                />
              )}

              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground break-words">
                {plan.label}
              </div>

              <h3
                className={`mt-6 font-sans font-medium text-[19px] tracking-[-0.01em] ${
                  plan.featured ? "text-peach" : "text-foreground"
                }`}
              >
                {plan.name}
              </h3>

              <div className="mt-4 font-sans font-bold text-[30px] sm:text-[34px] leading-[1.1] tracking-[-0.03em] text-foreground break-words">
                {plan.price}
                {plan.priceSuffix && (
                  <span className="block mt-1 font-normal text-[13px] tracking-normal text-muted-foreground">
                    {plan.priceSuffix}
                  </span>
                )}
              </div>

              <p className="mt-5 text-[14px] leading-[1.6] text-muted-foreground max-w-[30ch]">
                {plan.phrase}
              </p>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[13.5px] leading-[1.55] text-foreground/80"
                  >
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                      style={{
                        backgroundColor: plan.featured
                          ? "var(--peach)"
                          : "var(--muted-foreground)",
                      }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">{bullet}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className={`mt-10 inline-flex items-center gap-2 text-[13px] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  plan.featured
                    ? "text-peach hover:brightness-125"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {plan.cta}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

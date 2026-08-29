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
    featured: false,
  },
  {
    label: "SELF-SERVE",
    name: "Broto",
    price: "R$ 0,25 / requisição",
    phrase: "Pra prototipar e integrar sem contrato.",
    bullets: ["Paga só pelo que usar", "Sem mensalidade fixa", "Ativa na hora"],
    featured: false,
  },
  {
    label: "PRODUÇÃO EM ESCALA",
    name: "Floração",
    price: "Mínimo mensal + uso",
    phrase: "Pra quem já processa volume real todo mês.",
    bullets: [
      "Suporte prioritário",
      "Compliance LGPD para dados de saúde",
      "SLA de resposta",
    ],
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
    featured: true,
  },
];

export function Pricing() {
  return (
    <section
      id="precos"
      className="relative py-24 sm:py-32 lg:py-40 border-t border-border/40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-peach/20 bg-peach/5 text-[11px] font-mono uppercase tracking-[0.22em] text-peach">
            <span className="w-1 h-1 rounded-full bg-peach" aria-hidden="true" />
            Preços
          </span>

          <h2 className="mt-6 sm:mt-8">
            <span className="block font-sans font-bold text-[34px] sm:text-[44px] md:text-[54px] lg:text-[62px] leading-[1.05] tracking-[-0.025em] text-white">
              Comece por requisição.
            </span>
            <span
              className="block mt-1 italic text-[34px] sm:text-[44px] md:text-[54px] lg:text-[62px] leading-[1.05] tracking-[-0.02em] text-peach"
              style={{ fontFamily: "var(--font-editorial)" }}
            >
              Escale por contrato.
            </span>
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col h-full p-7 sm:p-8 lg:p-9 rounded-xl bg-[#18120E] border transition-all duration-300 ${
                plan.featured
                  ? "border-peach shadow-[0_0_40px_-16px_rgba(255,122,89,0.35)]"
                  : "border-white/[0.08] hover:border-white/[0.14]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 sm:left-8 lg:left-9 inline-flex items-center px-2.5 py-1 rounded-md bg-peach text-[10px] font-bold uppercase tracking-[0.12em] text-[#18120E]">
                  Topo de valor
                </span>
              )}

              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80">
                {plan.label}
              </div>

              <h3 className="mt-5 font-sans font-semibold text-[22px] sm:text-[24px] tracking-[-0.01em] text-foreground">
                {plan.name}
              </h3>

              <div className="mt-3 font-sans font-bold text-[28px] sm:text-[32px] leading-none text-foreground">
                {plan.price}
              </div>

              <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.55] text-muted-foreground">
                {plan.phrase}
              </p>

              <ul className="mt-6 sm:mt-7 space-y-2.5 border-t border-white/[0.08] pt-6">
                {plan.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[13px] sm:text-[14px] text-foreground/85"
                  >
                    <span
                      className="mt-[5px] w-1 h-1 rounded-full shrink-0"
                      style={{
                        backgroundColor: plan.featured
                          ? "var(--peach)"
                          : "var(--muted-foreground)",
                      }}
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className={`mt-auto pt-7 inline-flex items-center justify-center h-12 px-5 rounded-lg text-[13px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  plan.featured
                    ? "bg-peach text-[#18120E] hover:brightness-110"
                    : "bg-white/[0.06] text-foreground border border-white/[0.10] hover:bg-white/[0.10] hover:border-white/[0.16]"
                }`}
              >
                {plan.name === "Semente"
                  ? "Criar conta gratuita"
                  : plan.featured
                    ? "Falar com vendas"
                    : "Começar agora"}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

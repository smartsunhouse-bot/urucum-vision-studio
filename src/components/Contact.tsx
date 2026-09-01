export function Contact() {
  return (
    <section id="contato" className="relative py-40 lg:py-56 border-t border-border/40 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.18 35 / 0.18), transparent 65%)" }}
      />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div className="reveal">
          <div className="flex items-center justify-center gap-3 text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55 mb-8">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.62 0.24 26)",
                boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
              }}
            />
            <span>Contato</span>
          </div>
          <h2 className="font-serif font-light text-3xl md:text-5xl leading-[1.18] tracking-[-0.01em] text-foreground/95">
            Não controlamos apenas quem aparece nos dados.
            <span className="block mt-4 italic text-urucum">
              Controlamos como a imagem é formada antes de virar dado.
            </span>
          </h2>

          <form className="mt-16 max-w-md mx-auto flex items-center gap-2 border-b border-border/70 focus-within:border-urucum/60 transition-colors pb-3">
            <input
              type="email"
              placeholder="email@instituição.org"
              className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-muted-foreground/70 text-foreground"
            />
            <button
              type="button"
              className="text-[12px] font-mono tracking-wider uppercase text-urucum hover:text-foreground transition-colors"
            >
              Solicitar acesso →
            </button>
          </form>
          <p className="mt-4 text-[12px] text-muted-foreground">
            Acesso por convite · Pipelines auditáveis · Contratos institucionais
          </p>
        </div>
      </div>

    </section>
  );
}

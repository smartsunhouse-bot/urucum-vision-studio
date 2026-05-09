export function Footer() {
  const cols = [
    {
      label: "Produto",
      items: ["Vision Engine", "Exposure Matrix", "Datasets", "API"],
    },
    {
      label: "Infraestrutura",
      items: ["Pipelines", "Auditoria", "Observabilidade", "Status"],
    },
    {
      label: "Pesquisa",
      items: ["Linha do tempo", "Publicações", "Whitepapers", "Referências"],
    },
    {
      label: "Companhia",
      items: ["Manifesto", "Contato", "Imprensa", "Carreiras"],
    },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-[oklch(0.10_0.012_35)] overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none opacity-60" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80rem] h-[40rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.50 0.22 25 / 0.10), transparent 60%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-24 pb-10">
        {/* Wordmark + tagline */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-border/40">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "oklch(0.52 0.22 25)" }}
              />
              <span className="font-serif text-2xl tracking-[-0.01em] text-foreground">
                URUCUM <span className="italic text-urucum">AI</span>
              </span>
            </div>
            <p className="mt-6 max-w-md text-[14.5px] leading-[1.7] text-foreground/85">
              Infraestrutura de visão computacional para geração e modelagem de
              datasets visuais com controle programável de tons de pele,
              iluminação e exposição.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.28em] text-muted-foreground">
              <span className="px-2 py-1 border border-border/60 rounded-sm">
                ITU-R BT.709
              </span>
              <span className="px-2 py-1 border border-border/60 rounded-sm">
                EV −2 / +2
              </span>
              <span className="px-2 py-1 border border-border/60 rounded-sm">
                Audit-grade
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.label}>
                <div className="text-[10.5px] font-mono uppercase tracking-[0.32em] text-urucum/90 mb-5">
                  ◦ {c.label}
                </div>
                <ul className="space-y-3">
                  {c.items.map((it) => (
                    <li key={it}>
                      <a
                        href="#"
                        className="text-[13.5px] text-foreground/80 hover:text-urucum transition-colors"
                      >
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Technical strip */}
        <div className="py-8 border-b border-border/40 grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] font-mono uppercase tracking-[0.28em]">
          <div>
            <div className="text-muted-foreground/70">Build</div>
            <div className="mt-1 text-foreground/90 tabular-nums">
              v0.9.4 · 2026.05
            </div>
          </div>
          <div>
            <div className="text-muted-foreground/70">Region</div>
            <div className="mt-1 text-foreground/90">SP · BER</div>
          </div>
          <div>
            <div className="text-muted-foreground/70">Pipelines</div>
            <div className="mt-1 text-foreground/90 tabular-nums">
              4.2K active
            </div>
          </div>
          <div>
            <div className="text-muted-foreground/70">Status</div>
            <div className="mt-1 flex items-center gap-2 text-foreground/90">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.72 0.16 145)" }}
              />
              All systems nominal
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11.5px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "oklch(0.52 0.22 25)" }}
            />
            <span className="text-foreground/80">
              URUCUM AI · Vision Infrastructure
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Auditoria
            </a>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { SkinToneStrip } from "./SkinToneStrip";

export function Footer() {
  const links = ["Manifesto", "Produto", "Pesquisa", "Contato"];

  return (
    <footer className="relative bg-[oklch(0.10_0.012_35)] overflow-hidden">
      <SkinToneStrip />
      <div className="absolute inset-0 grain pointer-events-none opacity-50" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Wordmark */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "oklch(0.52 0.22 25)" }}
            />
            <span className="font-serif text-2xl tracking-[-0.01em] text-foreground">
              URUCUM <span className="italic text-urucum">AI</span>
            </span>
          </div>
          <p className="mt-5 max-w-md text-[14px] leading-[1.7] text-foreground/75">
            Não geramos imagens. Controlamos como o mundo aparece nos dados.
          </p>

          {/* Nav */}
          <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[11px] font-mono uppercase tracking-[0.28em]">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-foreground/70 hover:text-urucum transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-6 border-t border-border/40 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
          <span>© 2026 URUCUM AI</span>
          <span className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "oklch(0.72 0.16 145)" }}
            />
            All systems nominal
          </span>
        </div>
      </div>
    </footer>
  );
}

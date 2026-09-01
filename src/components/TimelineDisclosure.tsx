import { useState } from "react";
import { Timeline } from "./Timeline";

// Divulgação progressiva: a linha do tempo histórica fica escondida por
// padrão. Quem quer só o produto não é sobrecarregado; quem quer contexto,
// abre o capítulo.
export function TimelineDisclosure() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="entenda"
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.082 0.010 32), oklch(0.078 0.010 30))",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: "oklch(0.62 0.24 26)",
                  boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
                }}
              />
              <span>linha do tempo</span>
            </div>

            <h2 className="mt-6 font-serif font-light text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em] text-foreground/95">
              Entenda{" "}
              <span
                className="italic"
                style={{ color: "oklch(0.66 0.24 28)" }}
              >
                de onde vem
              </span>{" "}
              o erro.
            </h2>
            <p className="mt-5 max-w-[54ch] text-[14.5px] leading-[1.65] text-foreground/60">
              Um resgate histórico das decisões técnicas que moldaram a captura
              de imagem. Siga o fluxo ou vá direto para a infraestrutura.
            </p>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="timeline-content"
            className="group inline-flex items-center gap-3 px-5 h-12 rounded-[3px] text-[11.5px] font-mono tracking-[0.28em] uppercase text-foreground/80 hover:text-foreground transition-colors duration-300"
            style={{
              border: "1px solid oklch(0.55 0.18 35 / 0.3)",
              background: "oklch(0.13 0.016 36 / 0.6)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span className="text-[14px] leading-none">{open ? "−" : "+"}</span>
            {open ? "Recolher linha do tempo" : "Abrir linha do tempo"}
            <span
              className={`text-base leading-none transition-transform duration-500 ${
                open ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>
        </div>
      </div>

      <div
        id="timeline-content"
        className={`overflow-hidden transition-[max-height,opacity] duration-700 ease-out ${
          open ? "max-h-[20000px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <Timeline />
      </div>
    </section>
  );
}

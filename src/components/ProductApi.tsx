/**
 * ProductApi — "Corrija a imagem em uma linha de código."
 * Layout: título + subtítulo à esquerda, coluna de aplicações e bloco de código à direita.
 * Sem depoimentos, sem prova social. Só código e onde a Urucum se aplica.
 */

const APPS = [
  { id: "derma", label: "Dermatologia digital e telemedicina", glyph: "✚" },
  { id: "cosmetica", label: "Plataformas cosméticas e prova virtual", glyph: "◍" },
  { id: "espelhos", label: "Espelhos inteligentes e simuladores", glyph: "▣" },
  { id: "biometria", label: "Biometria e verificação de identidade", glyph: "◈" },
  { id: "sinteticos", label: "Geração de dados sintéticos para treino de IA", glyph: "⌗" },
  { id: "edge", label: "Câmeras e dispositivos de captura (edge/firmware)", glyph: "⌁" },
];

const C = {
  kw: "oklch(0.72 0.16 32)", // keyword — urucum
  fn: "oklch(0.86 0.10 68)", // função
  str: "oklch(0.80 0.09 95)", // string
  cmt: "oklch(0.60 0.02 40)", // comentário
  txt: "oklch(0.88 0.01 60)", // texto base
  num: "oklch(0.78 0.13 45)",
};

type Tok = [string, string];
const L = (...t: Tok[]) => t;

const CODE: Tok[][] = [
  L(["import ", C.kw], ["urucum", C.txt]),
  [],
  L(["client", C.txt], [" = ", C.txt], ["urucum", C.fn], [".", C.txt], ["Client", C.fn], ["(", C.txt], ["api_key", C.txt], ["=", C.txt], ['"SUA_CHAVE"', C.str], [")", C.txt]),
  [],
  L(["# Corrige a imagem pelo ITA extraído da captura", C.cmt]),
  L(["imagem_corrigida", C.txt], [" = ", C.txt], ["client", C.txt], [".", C.txt], ["calibrar", C.fn], ["(", C.txt]),
  L(["    imagem", C.txt], ["=", C.txt], ['"selfie.jpg"', C.str], [",", C.txt]),
  L(["    modo", C.txt], ["=", C.txt], ['"adaptativo"', C.str], ["  # radiometria, ruído e contraste por ITA", C.cmt]),
  L([")", C.txt]),
  [],
  L(["imagem_corrigida", C.txt], [".", C.txt], ["save", C.fn], ["(", C.txt], ['"resultado.jpg"', C.str], [")", C.txt]),
  [],
  L(["# API em desenvolvimento — exemplo de integração (em breve)", C.cmt]),
];

export function ProductApi() {
  return (
    <section
      id="api"
      className="relative border-t py-28 lg:py-44"
      style={{
        background:
          "radial-gradient(1200px 600px at 15% 0%, oklch(0.13 0.03 30 / 0.6), transparent 62%), oklch(0.055 0.008 32)",
        borderColor: "oklch(0.42 0.08 30 / 0.32)",
      }}
      aria-labelledby="api-title"
    >
      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* LEFT — título */}
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ background: "oklch(0.62 0.21 32 / 0.7)" }} />
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: "var(--muted-foreground)" }}
              >
                Integração
              </span>
            </div>

            <h2
              id="api-title"
              className="mt-7 font-serif font-light text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.04] tracking-[-0.02em] text-foreground/95 max-w-[16ch]"
            >
              Corrija a imagem em{" "}
              <span className="italic" style={{ color: "oklch(0.72 0.20 30)" }}>
                uma linha de código.
              </span>
            </h2>

            <p
              className="mt-6 max-w-[46ch] text-[15px] sm:text-[16px] leading-[1.7] font-light"
              style={{ color: "var(--muted-foreground)" }}
            >
              A API da Urucum entra no pipeline de visão computacional que você já
              usa — sem substituir modelo, câmera ou infraestrutura existente.
            </p>

            <div
              className="mt-8 inline-flex items-center gap-2 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.24em]"
              style={{
                border: "1px solid oklch(0.42 0.08 30 / 0.45)",
                color: "oklch(0.78 0.06 60)",
                background: "oklch(0.09 0.012 32 / 0.7)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.7 0.22 28)" }}
              />
              REST · SDK Python · Edge
            </div>
          </div>

          {/* RIGHT — apps + código */}
          <div
            className="lg:col-span-7 reveal flex flex-col md:flex-row gap-10 md:gap-0"
          >
            {/* coluna de aplicações */}
            <div className="w-full md:w-[240px] md:shrink-0 md:pr-8">
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/45 pb-3 mb-3 border-b" style={{ borderColor: "oklch(0.42 0.08 30 / 0.3)" }}>
                Onde se aplica
              </div>
              <ul className="space-y-4">
                {APPS.map((a) => (
                  <li key={a.id} className="flex items-start gap-3 group">
                    <span
                      className="mt-px w-6 h-6 shrink-0 flex items-center justify-center text-[11px]"
                      style={{
                        border: "1px solid oklch(0.7 0.22 28 / 0.45)",
                        color: "oklch(0.78 0.16 38)",
                        background: "oklch(0.10 0.014 32 / 0.8)",
                      }}
                      aria-hidden="true"
                    >
                      {a.glyph}
                    </span>
                    <span className="text-[12px] leading-[1.45] text-foreground/70 group-hover:text-foreground/95 transition-colors">
                      {a.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* bloco de código */}
            <div className="min-w-0 flex-1 md:pl-8 md:border-l md:border-border/25">
              <div
                className="flex items-center justify-between pb-3 border-b"
                style={{ borderColor: "oklch(0.42 0.08 30 / 0.28)" }}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/50">
                  calibrar.py
                </span>
                <span className="font-mono text-[9px] tracking-[0.22em] uppercase" style={{ color: "oklch(0.72 0.16 34)" }}>
                  Python
                </span>
              </div>
              <pre className="pt-5 overflow-x-auto font-mono text-[11px] sm:text-[12px] leading-[1.85]">
                <code>
                  {CODE.map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line.length === 0
                        ? " "
                        : line.map(([t, color], j) => (
                            <span key={j} style={{ color }}>
                              {t}
                            </span>
                          ))}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ProductApi — integração REST real da API Urucum.
 * Mantém o layout editorial: aplicações à esquerda, exemplo de código à direita.
 */

const APPLICATIONS = [
  { label: "Telemedicina e dermatologia digital", glyph: "✚" },
  { label: "Plataformas de saúde que recebem imagens de pele", glyph: "◍" },
  { label: "Fluxos de revisão e padronização de imagens", glyph: "▣" },
  { label: "Pesquisa e avaliação de qualidade de captura", glyph: "◈" },
  { label: "Sistemas que analisam ITA e região de pele", glyph: "⌗" },
];

const COLORS = {
  kw: "oklch(0.72 0.16 32)",
  fn: "oklch(0.86 0.10 68)",
  str: "oklch(0.80 0.09 95)",
  cmt: "oklch(0.60 0.02 40)",
  txt: "oklch(0.88 0.01 60)",
};

type Token = [string, string];
const line = (...tokens: Token[]) => tokens;

const EXAMPLE: Token[][] = [
  line(["import ", COLORS.kw], ["requests", COLORS.txt]),
  [],
  line(["with ", COLORS.kw], ["open", COLORS.fn], ["(", COLORS.txt], ['"imagem.jpg"', COLORS.str], [", ", COLORS.txt], ['"rb"', COLORS.str], [") ", COLORS.txt], ["as ", COLORS.kw], ["arquivo", COLORS.txt], [":", COLORS.txt]),
  line(["    resposta", COLORS.txt], [" = ", COLORS.txt], ["requests", COLORS.txt], [".", COLORS.txt], ["post", COLORS.fn], ["(", COLORS.txt]),
  line(["        ", COLORS.txt], ['"https://sua-api/api/processar"', COLORS.str], [",", COLORS.txt]),
  line(["        files", COLORS.txt], ["={", COLORS.txt], ['"file"', COLORS.str], [": (", COLORS.txt], ['"imagem.jpg"', COLORS.str], [", ", COLORS.txt], ["arquivo", COLORS.txt], [", ", COLORS.txt], ['"image/jpeg"', COLORS.str], [")},", COLORS.txt]),
  line(["    )", COLORS.txt]),
  [],
  line(["resultado", COLORS.txt], [" = ", COLORS.txt], ["resposta", COLORS.txt], [".", COLORS.txt], ["json", COLORS.fn], ["()", COLORS.txt]),
  [],
  line(["print", COLORS.fn], ["(", COLORS.txt], ['resultado["status_captura"]', COLORS.str], [")", COLORS.txt]),
  line(["print", COLORS.fn], ["(", COLORS.txt], ['resultado["ita_original"]', COLORS.str], [")", COLORS.txt]),
  line(["print", COLORS.fn], ["(", COLORS.txt], ['resultado["ita_recuperado"]', COLORS.str], [")", COLORS.txt]),
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
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-5">
            <div className="flex items-center gap-3 text-[10.5px] font-mono uppercase tracking-[0.42em] text-foreground/55">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  background: "oklch(0.62 0.24 26)",
                  boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
                }}
              />
              <span>Integração</span>
            </div>

            <h2
              id="api-title"
              className="mt-7 max-w-[17ch] font-serif text-[34px] font-light leading-[1.04] tracking-[-0.02em] text-foreground/95 sm:text-[44px] lg:text-[56px]"
            >
              Padronize imagens de pele com a{" "}
              <span className="italic" style={{ color: "oklch(0.72 0.20 30)" }}>
                API Urucum.
              </span>
            </h2>

            <p className="mt-6 max-w-[47ch] text-[15px] font-light leading-[1.7] text-muted-foreground sm:text-[16px]">
              A API recebe uma imagem, avalia a captura, identifica a região de pele
              e aplica uma correção fotométrica adaptativa quando necessário. Ela
              se integra ao fluxo da sua aplicação por API REST, sem substituir a
              câmera ou o sistema que você já utiliza.
            </p>

            <div
              className="mt-8 inline-flex items-center gap-2 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.2em]"
              style={{
                border: "1px solid oklch(0.42 0.08 30 / 0.45)",
                color: "oklch(0.78 0.06 60)",
                background: "oklch(0.09 0.012 32 / 0.7)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "oklch(0.7 0.22 28)" }}
              />
              API REST · JPEG · PNG · WEBP
            </div>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40">
              Imagem de pele
            </p>
          </div>

          <div className="reveal flex flex-col gap-9 md:flex-row md:gap-0 lg:col-span-7">
            <div className="w-full md:w-[240px] md:shrink-0 md:pr-8">
              <div
                className="mb-3 border-b pb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/45"
                style={{ borderColor: "oklch(0.42 0.08 30 / 0.3)" }}
              >
                Onde pode ser aplicada
              </div>
              <ul className="space-y-4">
                {APPLICATIONS.map((application) => (
                  <li key={application.label} className="group flex items-start gap-3">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center text-[11px]"
                      style={{
                        border: "1px solid oklch(0.7 0.22 28 / 0.45)",
                        color: "oklch(0.78 0.16 38)",
                        background: "oklch(0.10 0.014 32 / 0.8)",
                      }}
                      aria-hidden="true"
                    >
                      {application.glyph}
                    </span>
                    <span className="text-[12px] leading-[1.45] text-foreground/70 transition-colors group-hover:text-foreground/95">
                      {application.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 flex-1 md:border-l md:border-border/25 md:pl-8">
              <div
                className="flex items-center justify-between border-b pb-3"
                style={{ borderColor: "oklch(0.42 0.08 30 / 0.28)" }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                  exemplo.py
                </span>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.22em]"
                  style={{ color: "oklch(0.72 0.16 34)" }}
                >
                  Python · requests
                </span>
              </div>

              <pre className="overflow-x-auto pt-5 font-mono text-[10px] leading-[1.9] sm:text-[11px]">
                <code>
                  {EXAMPLE.map((tokens, index) => (
                    <div key={index} className="whitespace-pre">
                      {tokens.length === 0
                        ? " "
                        : tokens.map(([value, color], tokenIndex) => (
                            <span key={tokenIndex} style={{ color }}>
                              {value}
                            </span>
                          ))}
                    </div>
                  ))}
                </code>
              </pre>

              <div
                className="mt-5 border-t pt-4"
                style={{ borderColor: "oklch(0.42 0.08 30 / 0.28)" }}
              >
                <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/40">
                  Campos consultados no retorno
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] text-foreground/70">
                  <span>status_captura</span>
                  <span>ita_original</span>
                  <span>ita_recuperado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          className="mt-12 border-t pt-5 text-[11px] leading-[1.65] text-foreground/50"
          style={{ borderColor: "oklch(0.42 0.08 30 / 0.28)" }}
        >
          A Urucum auxilia na análise e padronização visual da imagem. Não realiza
          diagnóstico e não substitui a avaliação profissional.
        </p>
      </div>
    </section>
  );
}

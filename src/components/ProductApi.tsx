import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, CircleAlert, Contrast, ScanFace, ShieldCheck, Upload, Waves } from "lucide-react";

const stages = [
  {
    id: "upload", number: "01", title: "Envio da imagem", short: "Imagem recebida",
    description: "A pessoa envia uma imagem de pele pelo endpoint da API. O arquivo segue para análise sem alterar a imagem original.",
    signal: "POST /v1/analyze", icon: Upload,
    output: "Arquivo recebido", detail: "JPEG · PNG · captura original"
  },
  {
    id: "validate", number: "02", title: "Validação e leitura", short: "Leitura segura",
    description: "A API verifica se consegue abrir o arquivo e prepara os pixels para processamento. Uma captura inválida ou inadequada retorna um erro claro.",
    signal: "INPUT → PIXELS", icon: ShieldCheck,
    output: "Imagem legível", detail: "Formato · dimensões · integridade"
  },
  {
    id: "mask", number: "03", title: "Máscara de pele + ITA", short: "Região e medição",
    description: "A região identificada como pele delimita as medições. A partir dela, a API calcula o ITA e estima as classificações de tom associadas.",
    signal: "MASK · ITA", icon: ScanFace,
    output: "Máscara + ITA", detail: "Medição localizada na região de pele"
  },
  {
    id: "quality", number: "04", title: "Qualidade da captura", short: "Captura avaliada",
    description: "Exposição, contraste, nitidez e proporção da região de pele são avaliados. A captura recebe um status e uma indicação de confiança.",
    signal: "QUALITY CHECK", icon: Contrast,
    output: "Status + confiança", detail: "Capturas inadequadas podem ser rejeitadas"
  },
  {
    id: "gate", number: "05", title: "Gate de exposição", short: "Decisão adaptativa",
    description: "O brilho médio da região de pele orienta a decisão: se a exposição estiver adequada, a imagem é preservada; se houver subexposição, segue para correção proporcional.",
    signal: "EXPOSURE GATE", icon: Waves,
    output: "Preservar ou corrigir", detail: "Decisão baseada no brilho médio da pele"
  },
  {
    id: "process", number: "06", title: "Processamento adaptativo", short: "Correção localizada",
    description: "Quando necessário, a correção Urucum atua proporcionalmente e somente nos pixels dentro da máscara de pele, preservando o restante da imagem.",
    signal: "MASKED PROCESSING", icon: ScanFace,
    output: "Imagem processada", detail: "Ajuste proporcional · máscara aplicada"
  },
  {
    id: "return", number: "07", title: "Retorno da API", short: "Resultado estruturado",
    description: "A resposta reúne imagem processada, máscara, ITA antes e depois, classificações estimadas e informações sobre a qualidade da captura.",
    signal: "JSON · IMAGE · MASK", icon: Check,
    output: "Dados prontos para integrar", detail: "Resultado visual + metadados"
  },
];

export function ProductApi() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];
  const ActiveIcon = active.icon;
  const go = (direction: number) => setActiveIndex((index) => Math.max(0, Math.min(stages.length - 1, index + direction)));

  return (
    <section
      id="api"
      className="relative overflow-hidden border-t py-24 sm:py-32 lg:py-40"
      style={{
        background: "radial-gradient(950px 520px at 12% 0%, oklch(0.15 0.045 30 / .5), transparent 64%), linear-gradient(180deg, oklch(0.065 0.01 32), oklch(0.09 0.014 34))",
        borderColor: "oklch(0.42 0.08 30 / .32)",
      }}
      aria-labelledby="api-title"
    >
      <div className="pointer-events-none absolute -right-40 top-16 h-[420px] w-[420px] rounded-full blur-3xl opacity-[.08]" style={{ background: "oklch(0.62 0.24 26)" }} />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="reveal max-w-3xl">
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[.38em] text-foreground/55">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "oklch(0.68 0.22 28)", boxShadow: "0 0 12px oklch(0.68 0.22 28 / .8)" }} />
              <span>Por dentro da API</span>
            </div>
            <h2 id="api-title" className="mt-6 max-w-[18ch] font-serif text-[36px] font-light leading-[1.06] tracking-[-.025em] text-foreground/95 sm:text-[48px] lg:text-[60px]">
              Da captura ao resultado, <span className="italic" style={{ color: "oklch(0.72 0.19 31)" }}>passo a passo.</span>
            </h2>
            <p className="mt-5 max-w-[58ch] text-[14px] font-light leading-[1.75] text-muted-foreground sm:text-[15px]">
              Veja como a Urucum analisa a captura, decide se precisa corrigir a exposição e devolve imagem e dados prontos para o seu fluxo.
            </p>
          </div>

          <div className="reveal flex items-center justify-between gap-4 lg:justify-end">
            <div className="font-mono text-[9px] uppercase tracking-[.24em] text-foreground/45">
              <span className="text-urucum/90">{String(activeIndex + 1).padStart(2, "0")}</span> / 07 etapas
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} disabled={activeIndex === 0} aria-label="Etapa anterior" className="flex h-10 w-10 items-center justify-center border border-border/60 text-foreground/75 transition hover:border-urucum/60 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30">
                <ArrowLeft size={15} />
              </button>
              <button type="button" onClick={() => go(1)} disabled={activeIndex === stages.length - 1} aria-label="Próxima etapa" className="flex h-10 w-10 items-center justify-center border border-border/60 text-foreground/75 transition hover:border-urucum/60 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30">
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="reveal mt-12 border-y py-7 sm:mt-16 sm:py-9" style={{ borderColor: "oklch(0.55 0.05 35 / .2)" }}>
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[.28em] text-foreground/42">Fluxo de processamento</span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[.22em] text-foreground/35 sm:inline">Toque em uma etapa para explorar</span>
          </div>
          <div className="flex snap-x snap-mandatory gap-0 overflow-x-auto pb-3 scrollbar-none" role="list" aria-label="Etapas do fluxo da API">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const selected = index === activeIndex;
              return (
                <div key={stage.id} role="listitem" className="flex min-w-[188px] snap-start items-center sm:min-w-0 sm:flex-1">
                  <button type="button" onClick={() => setActiveIndex(index)} aria-current={selected ? "step" : undefined} aria-label={`Etapa ${stage.number}: ${stage.title}`} className="group relative z-10 flex w-full flex-col items-start text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-urucum/80">
                    <span className="flex items-center gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300" style={{ borderColor: selected ? "oklch(0.72 0.19 31 / .8)" : "oklch(0.55 0.05 35 / .35)", background: selected ? "oklch(0.22 0.055 31 / .8)" : "oklch(0.1 0.015 34)", color: selected ? "oklch(0.82 0.12 48)" : "oklch(0.68 0.03 45)" }}>
                        <Icon size={15} strokeWidth={1.6} />
                      </span>
                      <span className="h-px w-[calc(100%-3.25rem)] sm:hidden" style={{ background: "oklch(0.55 0.05 35 / .28)" }} />
                    </span>
                    <span className="mt-3 font-mono text-[9px] tracking-[.18em]" style={{ color: selected ? "oklch(0.76 0.13 38)" : "oklch(0.58 0.03 40)" }}>{stage.number} · {stage.signal}</span>
                    <span className="mt-1 max-w-[16ch] pr-3 text-[11px] leading-[1.45] text-foreground/75 transition group-hover:text-foreground sm:text-[12px]">{stage.short}</span>
                  </button>
                  {index < stages.length - 1 && <span className="mx-2 hidden h-px flex-1 sm:block" style={{ background: "linear-gradient(90deg, oklch(0.65 0.12 35 / .5), oklch(0.55 0.05 35 / .18))" }} aria-hidden="true" />}
                </div>
              );
            })}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[9px] font-mono uppercase tracking-[.18em] text-foreground/35 sm:hidden"><ArrowRight size={11} /> Deslize para ver as etapas</div>
        </div>

        <div className="reveal mt-8 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div key={active.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.28em] text-foreground/45">
              <span style={{ color: "oklch(0.72 0.19 31)" }}>{active.number}</span>
              <ChevronRight size={12} />
              <span>Etapa selecionada</span>
            </div>
            <h3 className="mt-4 font-serif text-[27px] font-light leading-tight text-foreground/95 sm:text-[32px]">{active.title}</h3>
            <p className="mt-4 max-w-[52ch] text-[13px] leading-[1.8] text-muted-foreground sm:text-[14px]">{active.description}</p>
          </div>

          <div className="relative overflow-hidden border p-5 sm:p-7" style={{ borderColor: "oklch(0.55 0.05 35 / .22)", background: "linear-gradient(135deg, oklch(0.12 0.018 34 / .92), oklch(0.085 0.012 34 / .94))" }}>
            <div className="absolute inset-y-0 left-0 w-px" style={{ background: "linear-gradient(transparent, oklch(0.7 0.18 33 / .55), transparent)" }} />
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "oklch(0.55 0.05 35 / .18)" }}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "oklch(0.24 0.06 32 / .65)", color: "oklch(0.8 0.12 42)" }}><ActiveIcon size={16} /></span>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[.22em] text-foreground/40">Saída desta etapa</div>
                  <div className="mt-1 text-[13px] text-foreground/85">{active.output}</div>
                </div>
              </div>
              <span className="hidden font-mono text-[9px] tracking-[.16em] text-foreground/38 sm:block">{active.signal}</span>
            </div>

            {active.id === "gate" ? (
              <div className="grid gap-3 pt-5 sm:grid-cols-2">
                <div className="flex items-center gap-3 border p-3" style={{ borderColor: "oklch(0.55 0.05 35 / .2)", background: "oklch(0.09 0.012 34 / .55)" }}>
                  <Check size={15} style={{ color: "oklch(0.72 0.12 75)" }} />
                  <div><div className="text-[12px] text-foreground/80">Exposição adequada</div><div className="mt-1 text-[10px] text-muted-foreground">Preservar imagem</div></div>
                </div>
                <div className="flex items-center gap-3 border p-3" style={{ borderColor: "oklch(0.65 0.14 34 / .32)", background: "oklch(0.16 0.035 32 / .42)" }}>
                  <ArrowRight size={15} style={{ color: "oklch(0.76 0.15 38)" }} />
                  <div><div className="text-[12px] text-foreground/80">Subexposição detectada</div><div className="mt-1 text-[10px] text-muted-foreground">Corrigir proporcionalmente</div></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-5">
                <span className="font-mono text-[9px] uppercase tracking-[.18em] text-foreground/38">Inclui</span>
                <span className="text-[11px] text-foreground/70">{active.detail}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex items-start gap-3 border-t pt-5 text-[11px] leading-[1.65] text-foreground/45" style={{ borderColor: "oklch(0.55 0.05 35 / .18)" }}>
          <CircleAlert size={14} className="mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.15 37)" }} />
          <p>A API auxilia na análise e padronização visual da imagem. Não realiza diagnóstico e não substitui avaliação profissional.</p>
        </div>
      </div>
    </section>
  );
}

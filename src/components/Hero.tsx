import { useEffect, useState } from "react";
import sensorMacro from "@/assets/hero-biometria-falha.jpg";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Hero — paleta Urucum.
 */

const techLabels: { label: string; gloss: string }[] = [
  { label: "Infraestrutura Radiométrica Adaptativa", gloss: "Ajusta a resposta do sensor à luz real da cena antes da imagem virar dado." },
  { label: "Preservação de Textura Cutânea (Fiel à Realidade)", gloss: "Mantém brilho, cor e microtextura de peles escuras sem perda no pipeline." },
  { label: "Processamento Local (Edge & Firmware Integrado)", gloss: "Correção acontece no dispositivo, sem enviar imagem crua para a nuvem." },
  { label: "Infraestrutura para Visão Computacional", gloss: "Camada base que sustenta biometria, diagnóstico, vigilância e robótica." },
  { label: "Integração Plug-and-Play via API", gloss: "Encaixa em qualquer stack de captura, ETL visual ou modelo de IA existente." },
];

export function Hero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t = [120, 280, 460, 640, 820].map((d, i) =>
      window.setTimeout(() => setStage((s) => Math.max(s, i + 1)), d),
    );
    return () => t.forEach(window.clearTimeout);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-hero"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-screen">
        {/* LEFT — editorial */}
        <div className="lg:col-span-7 relative">
          <div
            className={`flex items-center gap-3 transition-opacity duration-500 ${
              stage >= 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              className="font-mono text-[10px] tracking-[0.42em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              Infraestrutura de visão
            </span>
            <span
              className="h-px flex-1 max-w-[120px]"
              style={{ background: "var(--border)" }}
            />
          </div>

          <h1
            className={`mt-8 font-serif font-light text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0] tracking-[-0.025em] text-foreground/95 max-w-[22ch] transition-all duration-700 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Se a sua IA depende de imagem, ela depende de{" "}
            <span className="italic text-foreground/80">
              como o sensor captura o mundo.
            </span>
          </h1>

          <p
            className={`mt-7 max-w-[58ch] text-[15px] md:text-[17px] leading-[1.65] font-light transition-opacity duration-700 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--muted-foreground)" }}
          >
            Calibração paramétrica adaptativa local, direto na captura. Corrige
            viés de cor e preserva a textura de peles escuras na raiz do
            sensor — reduzindo custo com processamento pesado e modelos
            sobrecarregados a jusante.
          </p>

          {/* Labels técnicos */}
          <div
            className={`mt-8 flex flex-col gap-2 transition-opacity duration-700 ${
              stage >= 4 ? "opacity-100" : "opacity-0"
            }`}
          >
            {techLabels.map((item, i) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="group inline-flex items-center gap-3 text-left text-[12px] md:text-[13px] tracking-wide text-foreground/75 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    aria-label={`${item.label} — definição`}
                  >
                    <span
                      className="font-mono text-[10px] tabular-nums tracking-[0.2em]"
                      style={{ color: "var(--primary-glow)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="h-px w-4"
                      style={{ background: "var(--border)" }}
                    />
                    <span className="decoration-dotted underline-offset-4 group-hover:underline">
                      {item.label}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[260px] text-[12px] leading-snug">
                  {item.gloss}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* CTA único — foco em conversão */}
          <div
            className={`mt-10 flex flex-wrap items-center gap-3 transition-all duration-700 ${
              stage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href="#contato"
              className="group inline-flex items-center gap-3 h-12 px-6 font-mono text-[11px] tracking-[0.28em] uppercase rounded-[2px] transition-colors"
              style={{
                color: "var(--primary-foreground)",
                background: "var(--primary)",
                boxShadow: "0 1px 0 oklch(1 0 0 / 0.08) inset, 0 10px 28px -12px oklch(0.55 0.22 25 / 0.55)",
              }}
            >
              Agendar demonstração técnico-científica
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT — sensor macro */}
        <div
          className={`lg:col-span-5 relative transition-all duration-700 delay-200 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between mb-3 font-mono text-[9.5px] tracking-[0.32em] uppercase"
               style={{ color: "var(--muted-foreground)" }}>
            <span>
              <span style={{ color: "var(--primary-glow)" }}>●</span>{"  "}sensor · cmos macro
            </span>
            <span>λ · radiância</span>
          </div>

          <div
            className="relative aspect-[4/5] w-full max-w-[440px] mx-auto rounded-[3px] overflow-hidden"
            style={{
              background: "oklch(0.10 0.012 35)",
              border: "1px solid var(--border)",
              boxShadow: "0 60px 120px -30px oklch(0 0 0 / 0.6)",
            }}
          >
            <img
              src={sensorMacro}
              alt="Macro de sensor CMOS com resposta radiométrica visível"
              className="absolute inset-0 w-full h-full object-cover"
              width={800}
              height={1000}
            />

            {/* varredura sutil */}
            <div
              className="absolute inset-x-0 h-[1px] pointer-events-none"
              style={{
                top: "0%",
                background:
                  "linear-gradient(90deg, transparent, oklch(0.78 0.14 75 / 0.7), transparent)",
                animation: "scan-b 4.2s ease-in-out infinite",
                boxShadow: "0 0 14px oklch(0.78 0.14 75 / 0.55)",
              }}
            />

            {/* legenda técnica minimalista */}
            <div
              className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between font-mono text-[10px] tracking-[0.24em] uppercase"
              style={{
                color: "var(--foreground)",
                background:
                  "linear-gradient(180deg, transparent, oklch(0.06 0.008 32 / 0.92))",
              }}
            >
              <div>
                <div style={{ color: "var(--muted-foreground)" }}>pipeline</div>
                <div className="mt-1">URC · edge</div>
              </div>
              <div className="text-right">
                <div style={{ color: "var(--muted-foreground)" }}>ita</div>
                <div className="mt-1">I — VI</div>
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-[380px] mx-auto text-center text-[11px] tracking-[0.18em] uppercase font-mono"
             style={{ color: "var(--muted-foreground)" }}>
            correção na raiz — antes do dado alimentar o modelo
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scan-b {
          0%   { top: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useState } from "react";

const SOURCE = { src: "/images/urucum-case-face.png", w: 740, h: 549 };

const CROPS = {
  original: { x: 42, y: 51, w: 198, h: 298 },
  processed: { x: 273, y: 51, w: 198, h: 298 },
  mask: { x: 505, y: 51, w: 198, h: 298 },
} as const;

type CropKey = keyof typeof CROPS;

const STAGES: { label: string; crop: CropKey; caption: string }[] = [
  { label: "Original", crop: "original", caption: "Captura recebida" },
  { label: "Processamento", crop: "mask", caption: "Pele detectada · 34%" },
  { label: "Urucum", crop: "processed", caption: "Exposição recalibrada" },
  { label: "Image Ready", crop: "processed", caption: "Confiabilidade 93%" },
];

const STAGE_MS = 3400;

function CropLayer({ crop, visible }: { crop: CropKey; visible: boolean }) {
  const c = CROPS[crop];
  return (
    <img
      src={SOURCE.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="absolute max-w-none select-none transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      style={{
        width: `${(SOURCE.w / c.w) * 100}%`,
        left: `${(-c.x / c.w) * 100}%`,
        top: `${(-c.y / c.h) * 100}%`,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

export function ProductDevice() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(STAGES.length - 1);
      return;
    }
    const id = window.setInterval(
      () => setStage((s) => (s + 1) % STAGES.length),
      STAGE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  const current = STAGES[stage];
  const activeCrop = current.crop;
  const ready = stage === STAGES.length - 1;

  return (
    <figure className="relative w-full mx-auto max-w-[620px]" aria-label="Interface do produto Urucum processando uma imagem de pele">
      {/* screen */}
      <div className="relative rounded-[18px] p-[10px] sm:p-[12px] bg-[oklch(0.09_0.006_40)] border border-[oklch(0.30_0.015_40)] shadow-[0_40px_80px_-30px_oklch(0_0_0/0.8),0_0_0_1px_oklch(1_0_0/0.03)_inset]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-[oklch(0.13_0.012_40)]">
          {/* app bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 h-6 sm:h-7 border-b border-[oklch(0.25_0.015_40)]">
            <span className="font-serif text-[10px] sm:text-[12px] text-foreground">
              urucum<span style={{ color: "var(--urucum-red)" }}>·</span>ia
            </span>
            <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-muted-foreground">
              API v0.1
            </span>
          </div>

          <div className="flex h-[calc(100%-1.5rem)] sm:h-[calc(100%-1.75rem)] gap-3 sm:gap-5 p-3 sm:p-5">
            {/* copy + pipeline */}
            <div className="flex flex-1 min-w-0 flex-col">
              <p className="font-serif text-[12px] sm:text-[17px] md:text-[19px] leading-[1.15] text-foreground text-pretty">
                Imagens de pele, preparadas para serem confiáveis.
              </p>
              <p className="hidden sm:block mt-2 text-[9px] md:text-[10px] leading-[1.55] text-muted-foreground text-pretty">
                A Urucum analisa a qualidade da captura e recalibra imagens de
                pele antes que elas sejam usadas em fluxos de saúde e visão
                computacional.
              </p>

              <ol className="mt-auto flex flex-col gap-1 sm:gap-1.5" aria-label="Etapas do processamento">
                {STAGES.map((s, i) => {
                  const done = i < stage;
                  const active = i === stage;
                  return (
                    <li key={s.label} className="flex items-center gap-2" aria-current={active ? "step" : undefined}>
                      <span
                        aria-hidden="true"
                        className="h-[5px] w-[5px] rounded-full transition-colors duration-700"
                        style={{
                          background: active
                            ? "var(--urucum-red)"
                            : done
                              ? "oklch(0.70 0.04 60)"
                              : "oklch(0.32 0.015 40)",
                        }}
                      />
                      <span
                        className="font-mono text-[7px] sm:text-[9px] tracking-[0.16em] uppercase transition-colors duration-700"
                        style={{
                          color: active
                            ? "var(--foreground)"
                            : done
                              ? "var(--muted-foreground)"
                              : "oklch(0.48 0.02 50)",
                        }}
                      >
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* image viewer */}
            <div className="relative h-full aspect-[198/298] shrink-0 overflow-hidden rounded-[3px] border border-[oklch(0.28_0.015_40)] bg-black">
              {(Object.keys(CROPS) as CropKey[]).map((k) => (
                <CropLayer key={k} crop={k} visible={k === activeCrop} />
              ))}

              {stage === 1 && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 h-px motion-reduce:hidden"
                  style={{
                    background: "oklch(0.85 0.04 60 / 0.55)",
                    animation: `device-scan ${STAGE_MS}ms cubic-bezier(0.45,0,0.55,1) forwards`,
                  }}
                />
              )}

              <div className="absolute inset-x-0 bottom-0 hidden sm:flex items-center justify-between gap-2 px-2 py-1.5 bg-[oklch(0.10_0.01_40/0.82)] backdrop-blur-sm">
                <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.12em] uppercase text-foreground/85 truncate" aria-live="polite">
                  {current.caption}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-[7px] sm:text-[8px] tracking-[0.12em] uppercase transition-opacity duration-700"
                  style={{ color: "var(--urucum-red)", opacity: ready ? 1 : 0 }}
                >
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chin */}
      <div className="mx-[2px] -mt-[10px] h-[26px] sm:h-[34px] rounded-b-[16px] bg-[linear-gradient(180deg,oklch(0.72_0.012_60),oklch(0.60_0.012_55))] shadow-[0_1px_0_oklch(1_0_0/0.25)_inset]" aria-hidden="true" />

      {/* stand */}
      <div className="flex flex-col items-center" aria-hidden="true">
        <div
          className="h-[40px] sm:h-[56px] w-[22%] bg-[linear-gradient(180deg,oklch(0.50_0.01_55),oklch(0.66_0.012_60))]"
          style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" }}
        />
        <div className="h-[6px] w-[34%] rounded-[3px] bg-[linear-gradient(180deg,oklch(0.70_0.012_60),oklch(0.54_0.01_55))] shadow-[0_14px_24px_-8px_oklch(0_0_0/0.7)]" />
      </div>

      <figcaption className="sr-only">
        Sequência: imagem original, detecção de pele, recalibração pela Urucum e
        imagem pronta para uso.
      </figcaption>

      <style>{`
        @keyframes device-scan {
          from { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          to { top: 100%; opacity: 0; }
        }
      `}</style>
    </figure>
  );
}

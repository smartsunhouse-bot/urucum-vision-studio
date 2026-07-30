const tones = [
  "oklch(0.88 0.04 70)",
  "oklch(0.74 0.06 55)",
  "oklch(0.58 0.08 48)",
  "oklch(0.42 0.07 42)",
  "oklch(0.28 0.05 38)",
];
const exposures = ["+2 EV", "+1 EV", "0 EV", "−1 EV", "−2 EV"];

function heat(t: number, e: number) {
  // pseudo color heatmap based on tone + exposure
  const v = Math.min(1, Math.max(0, t * 0.18 + (2 - e) * 0.18));
  if (v < 0.25) return "oklch(0.45 0.18 250)";
  if (v < 0.5) return "oklch(0.7 0.16 165)";
  if (v < 0.75) return "oklch(0.85 0.16 95)";
  return "oklch(0.65 0.22 30)";
}

export function TechnicalGrid() {
  return (
    <section id="performance" className="relative py-32 lg:py-44 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal max-w-2xl mb-16">
          <div className="text-[11px] font-mono uppercase tracking-[0.32em] text-urucum/80 mb-5">
            ◦ Fig. 02 · Reference matrix
          </div>
          <h2 className="font-serif font-light text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em]">
            Exposição não é neutra.
            <span className="block italic mt-2 text-foreground/70">
              Ela define o que pode ser visto.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="reveal">
            <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-1.5 items-center">
              <div />
              {exposures.map((e) => (
                <div key={e} className="text-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {e}
                </div>
              ))}
              {tones.map((tone, ti) => (
                <div key={ti} className="contents">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground text-right pr-2">
                    ST {ti + 1}
                  </div>
                  {exposures.map((_, ei) => {
                    // simulate exposure on tone
                    const lift = (2 - ei) * 0.12;
                    return (
                      <div
                        key={ei}
                        className="aspect-square rounded-sm relative overflow-hidden border border-border/60"
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            background: tone,
                            filter: `brightness(${1 + lift}) contrast(${1 - lift * 0.3})`,
                          }}
                        />
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle at 40% 35%, oklch(1 0 0 / 0.18), transparent 70%)",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <p className="mt-6 text-[12px] font-mono text-muted-foreground tracking-wide">
              fig. 02a — same subject across skin tone × exposure axes
            </p>
          </div>

          <div className="reveal">
            <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-1.5 items-center">
              <div />
              {exposures.map((e) => (
                <div key={e} className="text-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {e}
                </div>
              ))}
              {tones.map((_, ti) => (
                <div key={ti} className="contents">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground text-right pr-2">
                    ST {ti + 1}
                  </div>
                  {exposures.map((_, ei) => (
                    <div
                      key={ei}
                      className="aspect-square rounded-sm border border-border/60"
                      style={{ background: heat(ti, ei) }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <span>low signal</span>
              <span
                className="flex-1 h-1.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.45 0.18 250), oklch(0.7 0.16 165), oklch(0.85 0.16 95), oklch(0.65 0.22 30))",
                }}
              />
              <span>high signal</span>
            </div>
            <p className="mt-3 text-[12px] font-mono text-muted-foreground tracking-wide">
              fig. 02b — pseudo-color intensity map
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

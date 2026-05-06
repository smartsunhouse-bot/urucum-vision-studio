import { useEffect, useState } from "react";

const steps = [
  ["01", "Definir distribuição"],
  ["02", "Modelar variações"],
  ["03", "Gerar datasets"],
  ["04", "Treinar modelos"],
];

const code = `dataset = urucum.generate(
  skin_tone="dark_dominant",
  lighting="low_light",
  exposure_ev=-1,
  context="clinical"
)

model.train(dataset)`;

function colorize(line: string) {
  return line
    .replace(/(".*?")/g, '<span style="color:oklch(0.78 0.14 60)">$1</span>')
    .replace(/\b(\-?\d+(?:\.\d+)?)\b/g, '<span style="color:oklch(0.7 0.16 30)">$1</span>')
    .replace(/\b(urucum|model)\b/g, '<span style="color:oklch(0.62 0.21 32)">$1</span>')
    .replace(/\b(generate|train)\b/g, '<span style="color:oklch(0.85 0.04 75)">$1</span>')
    .replace(/(\bdataset\b)/g, '<span style="color:oklch(0.78 0.05 70)">$1</span>');
}

export function HowItWorks() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= code.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, []);

  const visible = code.slice(0, shown);
  const lines = visible.split("\n");
  const showThumbs = shown >= code.length - 5;

  return (
    <section id="como-funciona" className="relative py-32 lg:py-44 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 reveal">
          <div className="text-[11px] font-mono uppercase tracking-[0.32em] text-urucum/80 mb-5">
            ◦ Como funciona
          </div>
          <h2 className="font-serif font-light text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] mb-12">
            Quatro etapas. Determinísticas.
          </h2>
          <ol className="space-y-8">
            {steps.map(([n, t]) => (
              <li key={n} className="flex items-baseline gap-6 border-t border-border/40 pt-6 first:border-t-0 first:pt-0">
                <span className="font-mono text-[11px] tracking-[0.25em] text-urucum/80">{n}</span>
                <span className="font-serif text-2xl md:text-[28px] text-foreground/90">{t}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7 reveal">
          <div className="rounded-sm overflow-hidden border border-border bg-[oklch(0.10_0.012_36)]"
               style={{ boxShadow: "var(--shadow-elegant)" }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-[oklch(0.13_0.015_38)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.55_0.18_35)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.45_0.06_55)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.35_0.04_60)]" />
              <span className="ml-3 text-[11px] font-mono text-muted-foreground tracking-wide">urucum/pipeline.py</span>
            </div>
            <pre className="font-mono text-[13.5px] leading-[1.7] p-6 overflow-x-auto">
              {lines.map((ln, i) => (
                <div key={i} className="flex">
                  <span className="select-none w-8 text-right pr-4 text-muted-foreground/60">{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: colorize(ln) || "&nbsp;" }} />
                  {i === lines.length - 1 && shown < code.length && (
                    <span className="ml-0.5 inline-block w-2 h-4 bg-urucum align-middle" style={{ background: "oklch(0.62 0.21 32)" }} />
                  )}
                </div>
              ))}
            </pre>
            <div
              className={`grid grid-cols-6 gap-1.5 p-4 border-t border-border/60 transition-opacity duration-700 ${showThumbs ? "opacity-100" : "opacity-0"}`}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{
                    background: `radial-gradient(circle at 40% 40%, oklch(${0.5 - (i % 4) * 0.08} 0.06 ${40 + i * 3}), oklch(0.16 0.02 36))`,
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
              ))}
            </div>
            <div className={`px-4 pb-4 grid grid-cols-3 gap-4 text-[10.5px] font-mono text-muted-foreground transition-opacity duration-700 ${showThumbs ? "opacity-100" : "opacity-0"}`}>
              <div><span className="text-foreground/70">12,488</span> samples</div>
              <div><span className="text-foreground/70">EV −1.0 ± 0.2</span></div>
              <div><span className="text-foreground/70">manifest.json</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

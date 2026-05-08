import { useEffect, useState } from "react";
import portrait from "@/assets/face-deep.jpg";

function useTypewriter(text: string, speed = 38, start = 0) {
  const [out, setOut] = useState("");
  useEffect(() => {
    const t0 = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, start);
    return () => clearTimeout(t0);
  }, [text, speed, start]);
  return out;
}

export function Hero() {
  const typed = useTypewriter("Nós não geramos imagens.", 42, 700);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t = [400, 1800, 3100, 4400, 5200].map((d, i) =>
      setTimeout(() => setStage((s) => Math.max(s, i + 1)), d),
    );
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-hero grain"
    >
      {/* ambient crescent */}
      <svg
        className="absolute -right-[25%] top-[5%] w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] opacity-[0.45] pointer-events-none animate-drift"
        viewBox="0 0 600 600"
        fill="none"
      >
        <defs>
          <radialGradient id="moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.58 0.23 24 / 0.5)" />
            <stop offset="60%" stopColor="oklch(0.30 0.12 26 / 0.22)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <mask id="cut">
            <rect width="600" height="600" fill="white" />
            <circle cx="380" cy="280" r="240" fill="black" />
          </mask>
        </defs>
        <circle cx="300" cy="300" r="260" fill="url(#moon)" mask="url(#cut)" />
      </svg>

      <div
        className="absolute left-[8%] top-[60%] w-[40rem] h-[40rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.50 0.22 25 / 0.18), transparent 65%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-36 pb-32 flex flex-col items-center text-center">
        {/* TOP — início (kicker + headline) */}
        <div
          className={`transition-opacity duration-700 ${stage >= 0 ? "opacity-100" : "opacity-0"}`}
        >
          <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.36em] uppercase text-urucum font-mono">
            <span
              className="w-8 h-px"
              style={{ background: "oklch(0.52 0.22 25 / 0.7)" }}
            />
            Vision Infrastructure
            <span
              className="w-8 h-px"
              style={{ background: "oklch(0.52 0.22 25 / 0.7)" }}
            />
          </span>
        </div>

        <p
          className={`mt-10 font-serif text-2xl md:text-[28px] text-foreground/85 leading-snug ${
            typed.length < 24 ? "caret" : ""
          }`}
        >
          {typed}
        </p>

        <h1 className="mt-6 font-serif font-light text-5xl md:text-7xl lg:text-[88px] leading-[0.96] tracking-[-0.025em] text-foreground max-w-5xl">
          <span
            className={`block transition-all duration-1000 ${stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            Controlamos como o mundo
          </span>
          <span
            className={`block transition-all duration-1000 delay-200 ${stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            aparece nos <span className="italic text-urucum">dados.</span>
          </span>
        </h1>

        <p
          className={`mt-10 max-w-2xl text-base md:text-[17px] leading-relaxed text-muted-foreground transition-opacity duration-1000 ${
            stage >= 3 ? "opacity-100" : "opacity-0"
          }`}
        >
          Infraestrutura para geração e modelagem de datasets visuais com
          controle programável de tons de pele, iluminação, exposição e
          contexto.
        </p>

        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 ${
            stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <a
            href="#produto"
            className="group inline-flex items-center gap-2 text-sm tracking-wide px-5 py-3 rounded-sm text-[oklch(0.96_0.02_80)]"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.50 0.22 25), oklch(0.40 0.18 24))",
              boxShadow: "0 10px 40px -10px oklch(0.50 0.22 25 / 0.55)",
            }}
          >
            Explorar plataforma
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#documentacao"
            className="inline-flex items-center gap-2 text-sm tracking-wide px-5 py-3 rounded-sm border border-border text-foreground/85 hover:text-foreground hover:border-urucum/40 transition-colors"
          >
            Ver documentação
          </a>
        </div>

        {/* BOTTOM — circular portrait (rodapé do hero) */}
        <div className="mt-24 relative">
          <div
            className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border border-border"
            style={{
              boxShadow:
                "0 30px 80px -20px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.52 0.22 25 / 0.18) inset",
            }}
          >
            <img
              src={portrait}
              alt="Captura de referência — pele profunda a 0 EV"
              className="w-full h-full object-cover animate-light"
              width={1024}
              height={1024}
            />
            <div
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 60%, transparent 55%, oklch(0.10 0.012 35 / 0.85))",
              }}
            />
          </div>

          {/* concentric rings */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none animate-drift"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="oklch(0.52 0.22 25 / 0.4)"
              strokeWidth="0.15"
              strokeDasharray="0.6 1.4"
            />
          </svg>

          {/* tick labels around */}
          <div className="absolute -inset-6 pointer-events-none">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[9px] font-mono tracking-[0.3em] uppercase text-urucum/80">
              0 EV
            </span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-[9px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
              fig. 01 · reference
            </span>
            <span className="absolute top-1/2 -left-2 -translate-y-1/2 -translate-x-full text-[9px] font-mono tracking-[0.3em] uppercase text-muted-foreground rotate-180" style={{ writingMode: "vertical-rl" }}>
              subject · deep
            </span>
            <span className="absolute top-1/2 -right-2 -translate-y-1/2 translate-x-full text-[9px] font-mono tracking-[0.3em] uppercase text-muted-foreground" style={{ writingMode: "vertical-rl" }}>
              capture · loop
            </span>
          </div>
        </div>

        {/* technical metrics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8 max-w-4xl w-full text-left border-t border-border/60 pt-10">
          {[
            { k: "EV RANGE", v: "−2.0 → +2.0" },
            { k: "COLOR PROFILE", v: "ITU-R BT.709" },
            { k: "CAPTURE STATE", v: "DYNAMIC LOW-LIGHT" },
            { k: "FRAME RESPONSE", v: "VARIABLE" },
          ].map((m) => (
            <div key={m.k} className="space-y-2">
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
                {m.k}
              </div>
              <div className="font-serif text-[18px] md:text-[20px] text-foreground/90 tabular-nums">
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase">
        scroll ↓
      </div>
    </section>
  );
}

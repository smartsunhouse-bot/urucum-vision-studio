import { useEffect, useState } from "react";
import portrait from "@/assets/exposure-matrix.png";

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
      {/* Crescent / exposure curve */}
      <svg
        className="absolute -right-[20%] top-[10%] w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px] opacity-[0.55] pointer-events-none animate-drift"
        viewBox="0 0 600 600"
        fill="none"
      >
        <defs>
          <radialGradient id="moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.62 0.21 32)" stopOpacity="0.55" />
            <stop offset="60%" stopColor="oklch(0.32 0.12 28)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <mask id="cut">
            <rect width="600" height="600" fill="white" />
            <circle cx="380" cy="280" r="240" fill="black" />
          </mask>
        </defs>
        <circle cx="300" cy="300" r="260" fill="url(#moon)" mask="url(#cut)" />
        <circle
          cx="300"
          cy="300"
          r="260"
          fill="none"
          stroke="oklch(0.55 0.18 35 / 0.35)"
          strokeWidth="0.6"
          mask="url(#cut)"
        />
      </svg>

      {/* soft glow */}
      <div className="absolute left-[10%] top-[55%] w-[40rem] h-[40rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.18 35 / 0.18), transparent 65%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div
            className={`transition-opacity duration-700 ${stage >= 0 ? "opacity-100" : "opacity-0"}`}
          >
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-urucum/90 font-mono">
              <span className="w-6 h-px bg-urucum/70" style={{ background: "oklch(0.62 0.21 32 / 0.7)" }} />
              Vision Infrastructure
            </span>
          </div>

          <p
            className={`font-serif text-2xl md:text-[28px] text-foreground/85 leading-snug ${
              typed.length < 24 ? "caret" : ""
            }`}
          >
            {typed}
          </p>

          <h1 className="font-serif font-light text-5xl md:text-7xl leading-[0.98] tracking-[-0.02em] text-foreground">
            <span
              className={`block transition-all duration-1000 ${stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            >
              Controlamos
            </span>
            <span
              className={`block transition-all duration-1000 delay-200 ${stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            >
              como o mundo aparece
            </span>
            <span
              className={`block transition-all duration-1000 delay-500 ${stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            >
              nos <span className="italic text-urucum">dados.</span>
            </span>
          </h1>

          <p
            className={`max-w-xl text-base md:text-[17px] leading-relaxed text-muted-foreground transition-opacity duration-1000 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
          >
            Infraestrutura para geração e modelagem de datasets visuais com controle programável de tons de pele, iluminação, exposição e contexto.
          </p>

          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-1000 ${
              stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href="#produto"
              className="group inline-flex items-center gap-2 text-sm tracking-wide px-5 py-3 rounded-sm text-[oklch(0.96_0.02_80)]"
              style={{
                background: "linear-gradient(180deg, oklch(0.55 0.18 35), oklch(0.42 0.16 30))",
                boxShadow: "0 10px 40px -10px oklch(0.55 0.18 35 / 0.55)",
              }}
            >
              Explorar plataforma
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#documentacao"
              className="inline-flex items-center gap-2 text-sm tracking-wide px-5 py-3 rounded-sm border border-border text-foreground/85 hover:text-foreground hover:border-urucum/40 transition-colors"
            >
              Ver documentação
            </a>
          </div>

          <div className="pt-8 grid grid-cols-3 gap-6 max-w-md text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
            <div><div className="text-foreground/70">EV –2 → +2</div><div>exposure</div></div>
            <div><div className="text-foreground/70">ITU-R BT.709</div><div>colorimetry</div></div>
            <div><div className="text-foreground/70">10⁹ frames</div><div>throughput</div></div>
          </div>
        </div>

        {/* Right: portrait demo */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-border bg-[oklch(0.10_0.012_35)]"
               style={{ boxShadow: "var(--shadow-elegant)" }}>
            <img
              src={portrait}
              alt="Matriz tom de pele × exposição — referência técnica de captura"
              className="w-full h-full object-cover"
              width={1536}
              height={1024}
            />
            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: "linear-gradient(180deg, transparent 60%, oklch(0.10 0.012 35 / 0.8))" }} />
            {/* HUD overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono tracking-wider text-foreground/70">
              <span>● REC · CAPTURE.LOOP</span>
              <span>4096×5120 · RAW</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono tracking-wider text-foreground/70">
              <span>MATRIX · TONE × EV</span>
              <span className="text-urucum">FIG. 02 · REFERENCE</span>
            </div>
            {/* corner ticks */}
            {["top-2 left-2","top-2 right-2","bottom-2 left-2","bottom-2 right-2"].map((p) => (
              <span key={p} className={`absolute ${p} w-3 h-3 border border-foreground/40`} />
            ))}
          </div>
          <div className="mt-3 text-[11px] font-mono text-muted-foreground tracking-wide">
            fig. 02 — skin tone × exposure (EV) reference matrix
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase">
        scroll ↓
      </div>
    </section>
  );
}

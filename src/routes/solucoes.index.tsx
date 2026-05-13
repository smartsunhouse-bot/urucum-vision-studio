import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkinToneStrip } from "@/components/SkinToneStrip";
import { allSolutions } from "@/lib/solutions-data";
import type { SolutionData } from "@/components/SolutionPage";

export const Route = createFileRoute("/solucoes/")({
  head: () => ({
    meta: [
      { title: "Soluções — URUCUM AI" },
      {
        name: "description",
        content:
          "Visão computacional equitativa para FinTechs, saúde e smart cities — datasets sintéticos com cobertura tonal completa.",
      },
      { property: "og:title", content: "Soluções — URUCUM AI" },
      {
        property: "og:description",
        content:
          "Biometria, diagnóstico médico e vigilância urbana com paridade real entre fototipos.",
      },
    ],
  }),
  component: SolucoesIndex,
});

/* -------------------------------------------------------------- */

function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return (
    <span className="text-shimmer font-mono tabular-nums">
      {v}
      {suffix}
    </span>
  );
}

/* mini animated preview that lives inside each card */
function MiniPreview({ data }: { data: SolutionData }) {
  return (
    <div
      className="relative aspect-[16/9] rounded-[3px] overflow-hidden mt-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.03 30) 0%, oklch(0.09 0.012 35) 100%)",
        border: "1px solid oklch(0.55 0.18 35 / 0.22)",
      }}
    >
      {/* grid */}
      <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 200 112" preserveAspectRatio="none">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="112" stroke="oklch(0.55 0.18 35 / 0.5)" strokeWidth="0.2" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} stroke="oklch(0.55 0.18 35 / 0.5)" strokeWidth="0.2" />
        ))}
      </svg>

      {/* bbox overlays — pulse */}
      {data.overlays.slice(0, 3).map((o, i) => (
        <div
          key={i}
          className="absolute animate-lock"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: `${o.w}%`,
            height: `${o.h}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <div
            className="absolute -top-[12px] left-0 px-1 py-[1px] font-mono text-[7.5px] tracking-[0.18em] uppercase text-background"
            style={{ background: "oklch(0.72 0.22 28)" }}
          >
            {o.tag}·{o.conf}
          </div>
        </div>
      ))}

      {/* horizontal sweep */}
      <div
        className="absolute top-0 bottom-0 w-[40%] animate-scan-x pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.22 28 / 0.18), transparent)",
        }}
      />
      {/* vertical scan line */}
      <div
        className="absolute inset-x-0 h-[1px] animate-scan pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.22 28 / 0.7), transparent)",
        }}
      />

      {/* live tag */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 px-1.5 py-[2px] rounded-[2px] font-mono text-[8px] tracking-[0.22em] uppercase text-foreground/85"
        style={{ background: "oklch(0.10 0.012 35 / 0.7)", border: "1px solid oklch(0.55 0.18 35 / 0.3)" }}
      >
        <span className="w-[5px] h-[5px] rounded-full animate-live" style={{ background: "oklch(0.72 0.22 28)" }} />
        LIVE
      </div>

      <div className="absolute bottom-2 left-2 font-mono text-[8.5px] tracking-[0.22em] uppercase text-foreground/55">
        {data.vizCaption}
      </div>
    </div>
  );
}

function SolutionCard({ slug, data, index }: { slug: string; data: SolutionData; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // mouse-tracked glow
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // headline ROI metric — pull strongest synthPct delta
  const top = [...data.roi].sort((a, b) => Math.abs(b.synthPct - b.tradPct) - Math.abs(a.synthPct - a.tradPct))[0];
  const delta = Math.abs(top.synthPct - top.tradPct);

  return (
    <Link
      ref={ref}
      to="/solucoes/$slug"
      params={{ slug }}
      onMouseMove={onMove}
      className="solution-card group relative block rounded-[4px] p-7 overflow-hidden"
      style={{
        background: "oklch(0.12 0.014 35 / 0.7)",
        border: "1px solid oklch(0.55 0.18 35 / 0.22)",
        animation: `fade-in 0.7s ${index * 120}ms both`,
      }}
    >
      {/* mouse glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), oklch(0.55 0.20 30 / 0.18), transparent 60%)",
        }}
      />

      {/* corner ticks */}
      {[
        ["top-2 left-2", "border-t border-l"],
        ["top-2 right-2", "border-t border-r"],
        ["bottom-2 left-2", "border-b border-l"],
        ["bottom-2 right-2", "border-b border-r"],
      ].map(([pos, b]) => (
        <span
          key={pos}
          className={`absolute ${pos} w-3 h-3 ${b}`}
          style={{ borderColor: "oklch(0.66 0.24 28 / 0.6)" }}
        />
      ))}

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/45">
            <span style={{ color: "oklch(0.66 0.24 28)" }}>{data.code}</span>
            <span>{data.audience.split(" · ")[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.24em] uppercase text-foreground/55">
            <span className="w-[5px] h-[5px] rounded-full animate-live" style={{ background: "oklch(0.72 0.22 28)" }} />
            ATIVO
          </div>
        </div>

        <h2 className="mt-5 font-serif text-[22px] leading-[1.15] tracking-[-0.01em] text-foreground/95 group-hover:text-foreground transition-colors">
          {data.headline}
        </h2>
        <p className="mt-4 text-[13px] leading-[1.65] text-foreground/60">
          {data.benefit}
        </p>

        <MiniPreview data={data} />

        {/* headline metric */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-[9.5px] font-mono tracking-[0.3em] uppercase text-foreground/45">
              {top.label}
            </div>
            <div className="text-[20px] font-serif leading-none">
              <CountUp to={delta} suffix="%" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div>
              <div className="text-[9px] font-mono tracking-[0.22em] uppercase text-foreground/35 mb-1">tradicional</div>
              <div className="h-[2px] rounded-full bg-[oklch(0.20_0.02_35)] overflow-hidden">
                <div
                  className="h-full animate-bar"
                  style={{
                    width: `${top.tradPct}%`,
                    background: "oklch(0.55 0.06 30)",
                    animationDelay: `${300 + index * 120}ms`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-[0.22em] uppercase text-foreground/35 mb-1">urucum</div>
              <div className="h-[2px] rounded-full bg-[oklch(0.20_0.02_35)] overflow-hidden">
                <div
                  className="h-full animate-bar"
                  style={{
                    width: `${top.synthPct}%`,
                    background: "linear-gradient(90deg, oklch(0.62 0.24 26), oklch(0.78 0.20 35))",
                    animationDelay: `${500 + index * 120}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-[10.5px] font-mono tracking-[0.28em] uppercase text-foreground/70 group-hover:text-foreground transition-colors">
            Abrir vertical
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: "oklch(0.66 0.24 28)" }}
            >
              →
            </span>
          </div>
          <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-foreground/35">
            v1.4 · stable
          </div>
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------- */

function SolucoesIndex() {
  // animated counters in hero strip
  return (
    <main className="relative bg-background text-foreground">
      <SkinToneStrip />
      <Navbar />

      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60 animate-breathe"
          style={{
            background:
              "radial-gradient(60% 50% at 75% 30%, oklch(0.30 0.12 30 / 0.35), transparent 70%)",
          }}
        />
        {/* ambient drifting grid */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full opacity-[0.07] animate-drift pointer-events-none"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`gv${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="oklch(0.66 0.24 28)" strokeWidth="0.4" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`gh${i}`} x1="0" y1={i * 50} x2="1200" y2={i * 50} stroke="oklch(0.66 0.24 28)" strokeWidth="0.4" />
          ))}
        </svg>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/45">
            <span className="w-[6px] h-[6px] rounded-full animate-live" style={{ background: "oklch(0.72 0.22 28)" }} />
            <span style={{ color: "oklch(0.66 0.24 28)" }}>§</span>
            Soluções por indústria
            <span className="text-foreground/25">/</span>
            <span>3 verticais ativas</span>
          </div>
          <h1 className="mt-6 font-serif text-[44px] md:text-[60px] leading-[1.02] tracking-[-0.02em] max-w-[20ch]">
            Visão computacional confiável onde a luz costuma falhar.
          </h1>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.7] text-foreground/65">
            Três infraestruturas verticais. Cada uma calibrada para o cenário
            crítico do cliente — sem coletar uma única foto de pessoa real.
          </p>

          {/* live stat strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { k: "FOTÓTIPOS COBERTOS", v: 6, s: "/6" },
              { k: "REDUÇÃO DE ERRO", v: 95, s: "%" },
              { k: "AMOSTRAS SINTÉTICAS", v: 12, s: "M+" },
              { k: "PII EXPOSTA", v: 0, s: "" },
            ].map((m, i) => (
              <div
                key={m.k}
                className="relative rounded-[3px] px-4 py-3 overflow-hidden"
                style={{
                  background: "oklch(0.12 0.014 35 / 0.7)",
                  border: "1px solid oklch(0.55 0.18 35 / 0.18)",
                  animation: `fade-in 0.6s ${i * 90}ms both`,
                }}
              >
                <div className="text-[8.5px] font-mono tracking-[0.3em] uppercase text-foreground/40">
                  {m.k}
                </div>
                <div className="mt-2 font-serif text-[26px] leading-none">
                  <CountUp to={m.v} suffix={m.s} duration={1100 + i * 200} />
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-[1px]"
                  style={{ background: "linear-gradient(90deg, transparent, oklch(0.66 0.24 28 / 0.6), transparent)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-5">
          {allSolutions.map(({ slug, data }, i) => (
            <SolutionCard key={slug} slug={slug} data={data} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

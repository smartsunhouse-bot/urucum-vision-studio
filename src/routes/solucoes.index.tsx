import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
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
          "Infraestrutura de visão computacional calibrada por fototipo: biometria, diagnóstico clínico e CFTV operando dentro do envelope fotométrico real.",
      },
      { property: "og:title", content: "Soluções — URUCUM AI" },
      {
        property: "og:description",
        content:
          "Observabilidade visual e captura sintética validada para cenários onde a luz costuma falhar.",
      },
    ],
  }),
  component: SolucoesIndex,
});

/* ───────────────────────── primitives ───────────────────────── */

const TERRA = "oklch(0.58 0.16 30)";       // muted urucum (signal, not decoration)
const HAIR  = "oklch(0.50 0.12 35 / 0.20)"; // hairline border
const PANEL = "oklch(0.13 0.014 35 / 0.78)";

/** Capture viewport — animações pausadas; ativam só no hover do card */
function CaptureViewport({ data }: { data: SolutionData }) {
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 60% 30%, oklch(0.20 0.025 30) 0%, oklch(0.08 0.010 35) 70%)",
        border: `1px solid ${HAIR}`,
      }}
    >
      {/* technical grid — static */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.14]" viewBox="0 0 200 125" preserveAspectRatio="none">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="125" stroke={TERRA} strokeWidth="0.15" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 10} x2="200" y2={i * 10} stroke={TERRA} strokeWidth="0.15" />
        ))}
        <line x1="100" y1="55" x2="100" y2="70" stroke={TERRA} strokeWidth="0.4" />
        <line x1="92" y1="62.5" x2="108" y2="62.5" stroke={TERRA} strokeWidth="0.4" />
      </svg>

      {/* corner crosshairs — static */}
      {[
        { c: "top-2 left-2",  r: "border-t-[1.5px] border-l-[1.5px]" },
        { c: "top-2 right-2", r: "border-t-[1.5px] border-r-[1.5px]" },
        { c: "bottom-2 left-2",  r: "border-b-[1.5px] border-l-[1.5px]" },
        { c: "bottom-2 right-2", r: "border-b-[1.5px] border-r-[1.5px]" },
      ].map(({ c, r }) => (
        <span key={c} className={`absolute ${c} w-2.5 h-2.5 ${r}`} style={{ borderColor: TERRA }} />
      ))}

      {/* bounding boxes — static, pulse só no hover */}
      {data.overlays.slice(0, 3).map((o, i) => (
        <div
          key={i}
          className="absolute [animation-play-state:paused] group-hover:[animation-play-state:running] animate-lock"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: `${o.w}%`,
            height: `${o.h}%`,
            border: `1px solid ${TERRA}`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <div
            className="absolute -top-[11px] left-0 px-1 py-[1px] font-mono text-[7.5px] tracking-[0.18em] uppercase"
            style={{ background: "oklch(0.10 0.012 35 / 0.92)", color: TERRA, border: `1px solid ${HAIR}` }}
          >
            {o.tag}·{o.conf}
          </div>
        </div>
      ))}

      {/* scan line — só no hover */}
      <div
        className="absolute inset-x-0 h-[1px] opacity-0 group-hover:opacity-50 group-hover:animate-scan pointer-events-none transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${TERRA}, transparent)` }}
      />

      {/* HUD bottom caption — static */}
      <div className="absolute bottom-1.5 left-2 right-2 flex justify-between items-center font-mono text-[8px] tracking-[0.22em] uppercase text-foreground/45">
        <span>{data.vizCaption}</span>
        <span>{data.photometric?.ev ?? "—"}</span>
      </div>
    </div>
  );
}

/* ───────────────────────── card ───────────────────────── */

function SolutionCard({ slug, data, index }: { slug: string; data: SolutionData; index: number }) {
  return (
    <Link
      to="/solucoes/$slug"
      params={{ slug }}
      className="group relative block p-7 overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
      style={{
        background: PANEL,
        border: `1px solid ${HAIR}`,
        animation: `fade-in 0.7s ${index * 120}ms both`,
      }}
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[9.5px] font-mono tracking-[0.36em] uppercase text-foreground/40">
          <span style={{ color: TERRA }}>{data.code}</span>
          <span className="text-foreground/25">/</span>
          <span>vertical · {String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="text-[8.5px] font-mono tracking-[0.28em] uppercase text-foreground/30">
          v1.4
        </div>
      </div>

      <h2 className="mt-5 font-serif text-[22px] leading-[1.18] tracking-[-0.01em] text-foreground/95">
        {data.headline}
      </h2>
      <div className="mt-2 text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/40">
        {data.audience}
      </div>

      {/* viewport */}
      <div className="mt-6">
        <CaptureViewport data={data} />
      </div>

      {/* benefit + arrow */}
      <div className="mt-6 pt-5 flex items-center justify-between gap-4" style={{ borderTop: `1px solid ${HAIR}` }}>
        <p className="text-[12.5px] leading-[1.55] text-foreground/55 max-w-[34ch]">
          {data.benefit}
        </p>
        <span className="shrink-0 inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/60 group-hover:text-foreground transition-colors">
          abrir
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ color: TERRA }}>→</span>
        </span>
      </div>
    </Link>
  );
}

/* ───────────────────────── page ───────────────────────── */

function SolucoesIndex() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <main className="relative bg-background text-foreground">
      <SkinToneStrip />
      <Navbar />

      {/* HERO — institutional, silent */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* ambient grid — extremely subtle */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`gv${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" stroke={TERRA} strokeWidth="0.3" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`gh${i}`} x1="0" y1={i * 50} x2="1200" y2={i * 50} stroke={TERRA} strokeWidth="0.3" />
          ))}
        </svg>

        <div ref={ref} className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/40">
            <span className="w-[6px] h-[6px] animate-live" style={{ background: TERRA }} />
            <span style={{ color: TERRA }}>§</span>
            visual infrastructure
            <span className="text-foreground/20">/</span>
            <span>observability</span>
            <span className="text-foreground/20">/</span>
            <span>3 verticais</span>
          </div>

          <h1 className="mt-8 font-serif text-[44px] md:text-[64px] leading-[1.04] tracking-[-0.025em] max-w-[20ch] text-foreground/95">
            Visão computacional confiável onde a luz costuma falhar.
          </h1>

          <p className="mt-8 max-w-[58ch] text-[14.5px] leading-[1.75] text-foreground/55">
            Três infraestruturas verticais. Cada uma calibrada para o envelope
            fotométrico real do cliente — exposição, luminância, fototipo e
            ruído de sensor — antes do modelo decidir.
          </p>

          {/* technical state strip — replaces fake metric strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: HAIR }}>
            {[
              { k: "calibration", v: "low-light calibrated" },
              { k: "tonal coverage", v: "fitzpatrick I–VI" },
              { k: "exposure", v: "photometric balanced" },
              { k: "capture", v: "synthetic · validated" },
            ].map((m, i) => (
              <div
                key={m.k}
                className="px-4 py-4"
                style={{
                  background: "oklch(0.10 0.012 35 / 0.85)",
                  animation: `fade-in 0.6s ${i * 90}ms both`,
                }}
              >
                <div className="flex items-center gap-2 text-[8.5px] font-mono tracking-[0.3em] uppercase text-foreground/35">
                  <span className="w-[4px] h-[4px] animate-live" style={{ background: TERRA, animationDelay: `${i * 0.4}s` }} />
                  {m.k}
                </div>
                <div className="mt-2 text-[12.5px] font-mono tracking-[0.04em] text-foreground/85">
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARDS */}
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

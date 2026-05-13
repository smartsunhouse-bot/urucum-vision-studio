import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkinToneStrip } from "@/components/SkinToneStrip";
import { allSolutions } from "@/lib/solutions-data";

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

function SolucoesIndex() {
  return (
    <main className="relative bg-background text-foreground">
      <SkinToneStrip />
      <Navbar />

      <section className="relative pt-40 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 75% 30%, oklch(0.30 0.12 30 / 0.35), transparent 70%)",
          }}
        />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/45">
            <span style={{ color: "oklch(0.66 0.24 28)" }}>§</span>{" "}
            Soluções por indústria
          </div>
          <h1 className="mt-6 font-serif text-[44px] md:text-[60px] leading-[1.02] tracking-[-0.02em] max-w-[20ch]">
            Visão computacional confiável onde a luz costuma falhar.
          </h1>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.7] text-foreground/65">
            Três infraestruturas verticais. Cada uma calibrada para o cenário
            crítico do cliente — sem coletar uma única foto de pessoa real.
          </p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-5">
          {allSolutions.map(({ slug, data }) => (
            <Link
              key={slug}
              to="/solucoes/$slug"
              params={{ slug }}
              className="group block rounded-[4px] p-7 transition-colors duration-500"
              style={{
                background: "oklch(0.12 0.014 35 / 0.7)",
                border: "1px solid oklch(0.55 0.18 35 / 0.20)",
              }}
            >
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.36em] uppercase text-foreground/45">
                <span style={{ color: "oklch(0.66 0.24 28)" }}>{data.code}</span>
                <span>{data.audience.split(" · ")[0]}</span>
              </div>
              <h2 className="mt-5 font-serif text-[22px] leading-[1.15] tracking-[-0.01em] text-foreground/95 group-hover:text-foreground">
                {data.headline}
              </h2>
              <p className="mt-4 text-[13px] leading-[1.65] text-foreground/60">
                {data.benefit}
              </p>
              <div className="mt-7 inline-flex items-center gap-2 text-[10.5px] font-mono tracking-[0.28em] uppercase text-foreground/70 group-hover:text-foreground transition-colors">
                Abrir vertical
                <span style={{ color: "oklch(0.66 0.24 28)" }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

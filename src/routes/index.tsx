import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { IncidentLog } from "@/components/IncidentLog";
import { ScientificBase } from "@/components/ScientificBase";
import { TimelineDisclosure } from "@/components/TimelineDisclosure";
import { ExposureMatrix } from "@/components/ExposureMatrix";
import { Product } from "@/components/Product";
import { TechnicalGrid } from "@/components/TechnicalGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { Results } from "@/components/Results";
import { Docs } from "@/components/Docs";
import { Resources } from "@/components/Resources";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "URUCUM AI — Infraestrutura de Visão" },
      {
        name: "description",
        content:
          "Infraestrutura para geração e modelagem de datasets visuais com controle programável de tons de pele, iluminação, exposição e contexto.",
      },
      { property: "og:title", content: "URUCUM AI — Infraestrutura de Visão" },
      {
        property: "og:description",
        content:
          "Não geramos imagens. Controlamos como o mundo aparece nos dados.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main id="main" className="relative">
      <Navbar />
      <Hero />
      <IncidentLog />
      <Product />
      <ExposureMatrix />
      <TechnicalGrid />
      <HowItWorks />
      <Results />
      <TimelineDisclosure />
      <Docs />
      <Resources />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}

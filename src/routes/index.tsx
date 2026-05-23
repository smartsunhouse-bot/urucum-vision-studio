import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CostOfInvisibility } from "@/components/CostOfInvisibility";
import { ScientificBase } from "@/components/ScientificBase";
import { TimelineDisclosure } from "@/components/TimelineDisclosure";
import { ExposureMatrix } from "@/components/ExposureMatrix";
import { Product } from "@/components/Product";
import { TechnicalGrid } from "@/components/TechnicalGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { Results } from "@/components/Results";
import { Docs } from "@/components/Docs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SkinToneStrip } from "@/components/SkinToneStrip";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "URUCUM AI — Vision Infrastructure" },
      {
        name: "description",
        content:
          "Infraestrutura para geração e modelagem de datasets visuais com controle programável de tons de pele, iluminação, exposição e contexto.",
      },
      { property: "og:title", content: "URUCUM AI — Vision Infrastructure" },
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
    <main className="relative">
      <SkinToneStrip />
      <Navbar />
      <Hero />
      <CostOfInvisibility />
      <ScientificBase />
      <Product />
      <ExposureMatrix />
      <TechnicalGrid />
      <HowItWorks />
      <Results />
      <TimelineDisclosure />
      <Docs />
      <Contact />
      <Footer />
    </main>
  );
}

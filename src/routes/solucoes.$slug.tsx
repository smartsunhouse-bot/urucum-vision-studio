import { createFileRoute, notFound } from "@tanstack/react-router";
import { SolutionPage } from "@/components/SolutionPage";
import { allSolutions } from "@/lib/solutions-data";

export const Route = createFileRoute("/solucoes/$slug")({
  head: ({ params }) => {
    const found = allSolutions.find((s) => s.slug === params?.slug);
    const title = found
      ? `${found.data.vertical} — URUCUM AI`
      : "Solução — URUCUM AI";
    const desc = found?.data.benefit ?? "Soluções verticais URUCUM AI.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: SolutionRoute,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-foreground/70 font-mono text-sm">
      Solução não encontrada.
    </div>
  ),
});

function SolutionRoute() {
  const { slug } = Route.useParams();
  const found = allSolutions.find((s) => s.slug === slug);
  if (!found) throw notFound();
  return <SolutionPage data={found.data} />;
}

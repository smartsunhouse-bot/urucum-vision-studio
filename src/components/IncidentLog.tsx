import { useState } from "react";
import imgMIT from "@/assets/refs/mit.jpg";
import imgNIST from "@/assets/refs/nist.jpg";
import imgGoogle from "@/assets/refs/google.jpg";
import imgAmazon from "@/assets/refs/amazon.jpg";
import imgCOMPAS from "@/assets/refs/compas.jpg";
import imgAJL from "@/assets/refs/ajl.jpg";
import imgIBM from "@/assets/refs/ibm.jpg";
import imgStanford from "@/assets/refs/stanford.jpg";
import bookOppression from "@/assets/refs/book-oppression.jpg";
import bookRace from "@/assets/refs/book-race.jpg";
import bookWeapons from "@/assets/refs/book-weapons.jpg";

/**
 * Registro de dados — grid de marcas/instituições referenciadas.
 * Estilo "logo wall" sutil. Ao clicar em um registro, abre a ficha técnica
 * com a evidência (paper, auditoria, livro) que embasa a Urucum.
 */

type Record = {
  id: string;
  name: string;        // exibido como rótulo curto sob/no logo
  kind: "Auditoria" | "Padrão" | "Caso" | "Pesquisa" | "Literatura";
  year: string;
  scope: string;
  metric: string;
  headline: string;
  source: string;
  href: string;
  image: string;
};

const records: Record[] = [
  {
    id: "r-mit",
    name: "MIT Media Lab",
    kind: "Auditoria",
    year: "2018",
    scope: "Gender Shades · Fitzpatrick V–VI",
    metric: "34,7% de erro em mulheres negras",
    headline:
      "Auditoria comercial de três classificadores de gênero (IBM, Microsoft, Face++) revelou disparidade sistemática por fototipo.",
    source: "Buolamwini & Gebru · PMLR 81",
    href: "https://proceedings.mlr.press/v81/buolamwini18a.html",
    image: imgMIT,
  },
  {
    id: "r-nist",
    name: "NIST",
    kind: "Padrão",
    year: "2019",
    scope: "Face Recognition Vendor Test",
    metric: "10–100× diferencial em falsos positivos",
    headline:
      "Padrão federal mediu disparidade de 10 a 100 vezes em falsos positivos entre grupos demográficos em 189 algoritmos.",
    source: "NIST IR 8280 · Part 3",
    href: "https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf",
    image: imgNIST,
  },
  {
    id: "r-google",
    name: "Google Photos",
    kind: "Caso",
    year: "2015",
    scope: "Auto-tagging em produção",
    metric: "8 anos até restaurar a categoria",
    headline:
      "Sistema rotulou pessoas negras como 'gorilas'. A resposta foi remover o label — não corrigir o modelo.",
    source: "Wired · The Verge",
    href: "https://www.theverge.com/2018/1/12/16882408/google-racist-gorillas-photo-recognition-algorithm-ai",
    image: imgGoogle,
  },
  {
    id: "r-amazon",
    name: "Amazon Rekognition",
    kind: "Caso",
    year: "2018",
    scope: "Teste ACLU · Congresso EUA",
    metric: "39% dos falsos matches eram pessoas negras",
    headline:
      "28 membros do Congresso foram confundidos com fichas criminais. Pessoas negras eram 11% do grupo testado e 39% dos erros.",
    source: "ACLU · Face Surveillance Test",
    href: "https://www.aclu.org/news/privacy-technology/amazons-face-recognition-falsely-matched-28",
    image: imgAmazon,
  },
  {
    id: "r-compas",
    name: "COMPAS / ProPublica",
    kind: "Auditoria",
    year: "2016",
    scope: "Score criminal · tribunais EUA",
    metric: "2× mais falso positivo em réus negros",
    headline:
      "Sistema de risco criminal rotulava réus negros como reincidentes ao dobro da taxa de réus brancos.",
    source: "Angwin et al. · ProPublica",
    href: "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing",
    image: imgCOMPAS,
  },
  {
    id: "r-ajl",
    name: "Algorithmic Justice League",
    kind: "Pesquisa",
    year: "2016—",
    scope: "Auditoria pública de vendors biométricos",
    metric: "12+ vendors auditados sob coded gaze",
    headline:
      "Liga independente fundada por Joy Buolamwini para auditoria pública de sistemas biométricos comerciais.",
    source: "ajl.org · spin-off MIT",
    href: "https://www.ajl.org/",
    image: imgAJL,
  },
  {
    id: "r-ibm",
    name: "IBM Research",
    kind: "Pesquisa",
    year: "2019",
    scope: "Diversity in Faces",
    metric: "1M imagens anotadas por morfometria",
    headline:
      "Tentativa de equilibrar datasets via anotação morfométrica. Retirado posteriormente por questões de consentimento.",
    source: "Merler et al. · arXiv 1901.10436",
    href: "https://arxiv.org/abs/1901.10436",
    image: imgIBM,
  },
  {
    id: "r-stanford",
    name: "Stanford HAI",
    kind: "Pesquisa",
    year: "2024",
    scope: "AI Index · benchmarks comerciais",
    metric: "57% sem paridade demográfica reportada",
    headline:
      "Mais da metade dos benchmarks visuais auditados em 2024 ainda não publicam métricas de paridade entre grupos.",
    source: "Stanford HAI",
    href: "https://hai.stanford.edu/ai-index",
    image: imgStanford,
  },
  {
    id: "r-noble",
    name: "Algorithms of Oppression",
    kind: "Literatura",
    year: "2018",
    scope: "Safiya Umoja Noble · NYU Press",
    metric: "Leitura fundadora sobre vieses comerciais",
    headline:
      "Como motores de busca e sistemas de classificação reforçam o racismo estrutural sob a aparência de neutralidade técnica.",
    source: "ISBN 978-1479837243",
    href: "https://nyupress.org/9781479837243/algorithms-of-oppression/",
    image: bookOppression,
  },
  {
    id: "r-benjamin",
    name: "Race After Technology",
    kind: "Literatura",
    year: "2019",
    scope: "Ruha Benjamin · Polity",
    metric: "Framework — The New Jim Code",
    headline:
      "Discriminação codificada como infraestrutura: a discriminação não é bug, é a arquitetura padrão.",
    source: "ISBN 978-1509526406",
    href: "https://www.ruhabenjamin.com/race-after-technology",
    image: bookRace,
  },
  {
    id: "r-oneil",
    name: "Weapons of Math Destruction",
    kind: "Literatura",
    year: "2016",
    scope: "Cathy O'Neil · Crown",
    metric: "Auditoria de modelos opacos em escala",
    headline:
      "Como modelos preditivos opacos amplificam desigualdade quando operam em escala e sem accountability.",
    source: "ISBN 978-0553418811",
    href: "https://weaponsofmathdestructionbook.com/",
    image: bookWeapons,
  },
];

export function IncidentLog() {
  const [activeId, setActiveId] = useState<string>(records[0].id);
  const active = records.find((r) => r.id === activeId) ?? records[0];

  return (
    <section
      id="incidentes"
      className="relative w-full py-24 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.13 0.018 40), oklch(0.10 0.012 35))",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* header */}
        <div className="text-center max-w-[60ch] mx-auto reveal">
          <div
            className="font-mono text-[10px] tracking-[0.42em] uppercase"
            style={{ color: "var(--muted-foreground)" }}
          >
            Registro de dados
          </div>
          <h2 className="mt-5 font-serif font-light text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-foreground/95">
            Pesquisa, padrões e casos que fundamentam a Urucum.
          </h2>
          <p
            className="mt-5 text-[14.5px] leading-[1.7] font-light"
            style={{ color: "var(--muted-foreground)" }}
          >
            Cada marca abaixo é uma evidência pública — auditorias, padrões
            federais, casos documentados e literatura fundadora. Toque em um
            registro para ler a ficha.
          </p>
        </div>

        {/* logo grid */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px"
             style={{ background: "var(--border)", border: "1px solid var(--border)" }}>
          {records.map((r) => {
            const isActive = r.id === activeId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveId(r.id)}
                className="group relative aspect-[5/3] flex items-center justify-center px-4 py-5 transition-colors duration-300"
                style={{
                  background: isActive
                    ? "oklch(0.18 0.025 35)"
                    : "oklch(0.13 0.018 40)",
                }}
                aria-pressed={isActive}
              >
                <img
                  src={r.image}
                  alt={r.name}
                  className="max-h-full max-w-full object-contain transition-all duration-500"
                  style={{
                    filter: isActive
                      ? "grayscale(0) brightness(1) contrast(1.05)"
                      : "grayscale(1) brightness(0.9) opacity(0.55)",
                  }}
                />
                <span
                  className="absolute bottom-2 left-3 font-mono text-[8.5px] tracking-[0.28em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {r.kind} · {r.year}
                </span>
                {isActive && (
                  <span
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* dossier — expands on active */}
        <div
          key={active.id}
          className="mt-px grid grid-cols-1 lg:grid-cols-12 gap-0 animate-in fade-in duration-500"
          style={{
            background: "oklch(0.16 0.022 38)",
            border: "1px solid var(--border)",
            borderTop: "none",
          }}
        >
          <div
            className="lg:col-span-4 p-8 lg:p-10 flex items-center justify-center"
            style={{
              background: "oklch(0.12 0.014 36)",
              borderRight: "1px solid var(--border)",
            }}
          >
            <img
              src={active.image}
              alt={active.name}
              className="max-h-[140px] max-w-full object-contain"
            />
          </div>
          <div className="lg:col-span-8 p-8 lg:p-10 space-y-5">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.3em] uppercase"
                 style={{ color: "var(--muted-foreground)" }}>
              <span style={{ color: "var(--primary-glow)" }}>{active.kind}</span>
              <span>·</span>
              <span>{active.year}</span>
              <span>·</span>
              <span>{active.scope}</span>
            </div>
            <h3 className="font-serif font-light text-[22px] md:text-[28px] leading-[1.2] tracking-[-0.015em] text-foreground/95 max-w-[52ch]">
              {active.headline}
            </h3>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.24em] uppercase rounded-[2px]"
                style={{
                  background: "oklch(0.22 0.06 30 / 0.55)",
                  color: "var(--foreground)",
                  border: "1px solid oklch(0.55 0.18 35 / 0.3)",
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--primary-glow)" }}
                />
                {active.metric}
              </span>
            </div>
            <div className="pt-4 flex items-center gap-3 border-t"
                 style={{ borderColor: "var(--border)" }}>
              <span
                className="font-mono text-[10px] tracking-[0.28em] uppercase pt-4"
                style={{ color: "var(--muted-foreground)" }}
              >
                Fonte · {active.source}
              </span>
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 mt-4 font-mono text-[10px] tracking-[0.28em] uppercase hover:translate-x-0.5 transition-transform"
                style={{ color: "var(--primary-glow)" }}
              >
                Abrir referência ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

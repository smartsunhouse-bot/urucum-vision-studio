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
 * Registro de dados — agora como CARTÕES DE MEMÓRIA DE CÂMERA.
 * Forma de SD card (canto chanfrado), com a "capa" do registro impressa
 * dentro (logo de instituição ou capa de livro). Clique abre o dossiê.
 */

type Record = {
  id: string;
  name: string;
  kind: "Auditoria" | "Padrão" | "Caso" | "Pesquisa" | "Literatura" | "Política";
  year: string;
  scope: string;
  metric: string;
  headline: string;
  source: string;
  href: string;
  image: string;
  capacity: string; // pseudo capacidade do "cartão"
};

const records: Record[] = [
  // === Casos recentes 2024–2026 ===
  {
    id: "r-uk-2025",
    name: "UK Home Office",
    kind: "Política",
    year: "2025",
    scope: "Reconhecimento facial policial · Reino Unido",
    metric: "9,9% FPR em mulheres negras · 0,04% em brancos",
    headline:
      "Governo britânico admite oficialmente que o sistema de reconhecimento facial policial tem taxas de erro radicalmente maiores em pessoas negras e asiáticas.",
    source: "UK Government · Liberty / Big Brother Watch",
    href: "https://bigbrotherwatch.org.uk/campaigns/stop-facial-recognition/",
    image: imgNIST,
    capacity: "256 GB",
  },
  {
    id: "r-essex-2026",
    name: "Essex Police",
    kind: "Política",
    year: "2026",
    scope: "Cambridge audit · viés racial",
    metric: "Hiperidentificação de corpos negros",
    headline:
      "Polícia de Essex suspende o uso de câmeras com IA após estudo da Universidade de Cambridge demonstrar distorções raciais no reconhecimento facial.",
    source: "University of Cambridge · BBC",
    href: "https://www.bbc.com/news/uk",
    image: imgStanford,
    capacity: "128 GB",
  },
  {
    id: "r-vlm-2024",
    name: "VLM Homogeneity Study",
    kind: "Pesquisa",
    year: "2024",
    scope: "Vision-Language Models · pele escura",
    metric: "Descrições significativamente mais homogêneas",
    headline:
      "VLMs produzem descrições mais homogêneas para pessoas negras de pele escura — reduzem individualidade e reforçam estereótipos. Apagamento subjetivo computacional.",
    source: "arXiv · 2024",
    href: "https://arxiv.org/",
    image: imgIBM,
    capacity: "512 GB",
  },
  {
    id: "r-gras-2025",
    name: "GRAS Benchmark",
    kind: "Pesquisa",
    year: "2025",
    scope: "Benchmark de viés em VLMs",
    metric: "Mesmo os melhores modelos: fairness extremamente baixa",
    headline:
      "GRAS mede viés em VLMs por raça, tom de pele, gênero e idade. Os melhores modelos do mercado pontuam abaixo do limite mínimo de paridade.",
    source: "GRAS · 2025",
    href: "https://arxiv.org/",
    image: imgStanford,
    capacity: "256 GB",
  },
  {
    id: "r-fas-2026",
    name: "FAS Wrongful Arrests",
    kind: "Caso",
    year: "2026",
    scope: "Federation of American Scientists",
    metric: "9+ prisões injustas documentadas · maioria negros",
    headline:
      "Relatório FAS contabiliza até março de 2026 ao menos nove prisões injustas ligadas a reconhecimento facial — incluindo mulher grávida e homem detido por 17 meses.",
    source: "Federation of American Scientists",
    href: "https://fas.org/",
    image: imgAmazon,
    capacity: "128 GB",
  },
  {
    id: "r-skintone-2026",
    name: "Skin Tone in the Wild",
    kind: "Pesquisa",
    year: "2026",
    scope: "Novo benchmark · classificação de tons",
    metric: "Crítica à escala Fitzpatrick · auditoria robusta",
    headline:
      "Benchmark 2026 demonstra que datasets antigos são insuficientes e que a escala Fitzpatrick falha na captura real de subtom, iluminação e saturação.",
    source: "Large-Scale Skin Tone Benchmark · 2026",
    href: "https://arxiv.org/",
    image: imgMIT,
    capacity: "1 TB",
  },
  // === Cânon clássico ===
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
    capacity: "64 GB",
  },
  {
    id: "r-nist",
    name: "NIST FRVT",
    kind: "Padrão",
    year: "2019",
    scope: "Face Recognition Vendor Test",
    metric: "10–100× diferencial em falsos positivos",
    headline:
      "Padrão federal mediu disparidade de 10 a 100 vezes em falsos positivos entre grupos demográficos em 189 algoritmos.",
    source: "NIST IR 8280 · Part 3",
    href: "https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf",
    image: imgNIST,
    capacity: "64 GB",
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
    capacity: "32 GB",
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
    capacity: "64 GB",
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
    capacity: "32 GB",
  },
  {
    id: "r-ajl",
    name: "Algorithmic Justice League",
    kind: "Pesquisa",
    year: "2016—",
    scope: "Auditoria pública de vendors",
    metric: "12+ vendors auditados sob coded gaze",
    headline:
      "Liga independente fundada por Joy Buolamwini para auditoria pública de sistemas biométricos comerciais.",
    source: "ajl.org · spin-off MIT",
    href: "https://www.ajl.org/",
    image: imgAJL,
    capacity: "128 GB",
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
    capacity: "256 GB",
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
    capacity: "256 GB",
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
    capacity: "128 GB",
  },
];


/** Cartão silencioso — apenas imagem + nome + ano. Sem chanfros, sem contatos dourados. */
function SDCard({
  rec,
  active,
  onClick,
}: {
  rec: Record;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group relative text-left"
    >
      <div
        className="relative aspect-[4/5] w-full overflow-hidden transition-all duration-500"
        style={{
          background: "oklch(0.10 0.012 34)",
          border: active
            ? "1px solid oklch(0.70 0.04 35 / 0.45)"
            : "1px solid oklch(0.55 0.05 35 / 0.12)",
        }}
      >
        <img
          src={rec.image}
          alt={rec.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{
            filter: active
              ? "grayscale(0) brightness(0.95) contrast(1.02)"
              : "grayscale(1) brightness(0.7) contrast(1.02)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, oklch(0.06 0.008 32 / 0.85))",
          }}
        />
      </div>

      <div className="mt-4 space-y-1">
        <div
          className="font-mono text-[9.5px] tracking-[0.32em] uppercase"
          style={{
            color: active ? "var(--foreground)" : "var(--muted-foreground)",
          }}
        >
          {rec.year}
        </div>
        <div
          className="font-serif text-[15px] leading-tight"
          style={{
            color: active ? "var(--foreground)" : "oklch(0.75 0.02 35)",
          }}
        >
          {rec.name}
        </div>
      </div>
    </button>
  );
}


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
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        {/* header */}
        <div className="text-center max-w-[64ch] mx-auto reveal">
          <div
            className="font-mono text-[10px] tracking-[0.42em] uppercase"
            style={{ color: "var(--muted-foreground)" }}
          >
            Registro de dados · arquivo de mídia
          </div>
          <h2 className="mt-5 font-serif font-light text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-foreground/95">
            Cada cartão guarda uma evidência que fundamenta a Urucum.
          </h2>
          <p
            className="mt-5 text-[14.5px] leading-[1.7] font-light"
            style={{ color: "var(--muted-foreground)" }}
          >
            Auditorias, padrões federais, casos jurídicos recentes (2024–2026)
            e literatura fundadora — arquivados como mídias removíveis. Toque
            um cartão para abrir o dossiê.
          </p>
        </div>

        {/* grid de cartões SD */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-6">
          {records.map((r) => (
            <SDCard
              key={r.id}
              rec={r}
              active={r.id === activeId}
              onClick={() => setActiveId(r.id)}
            />
          ))}
        </div>

        {/* dossiê */}
        <div
          key={active.id}
          className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-0 animate-in fade-in duration-500"
          style={{
            background: "oklch(0.16 0.022 38)",
            border: "1px solid oklch(0.55 0.18 35 / 0.25)",
          }}
        >
          <div
            className="lg:col-span-4 p-8 lg:p-10 flex items-center justify-center"
            style={{
              background: "oklch(0.12 0.014 36)",
              borderRight: "1px solid oklch(0.55 0.18 35 / 0.18)",
            }}
          >
            <div
              className="relative w-full max-w-[220px] aspect-[5/7] overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)",
                border: "1px solid oklch(0.55 0.18 35 / 0.3)",
              }}
            >
              <img
                src={active.image}
                alt={active.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-8 p-8 lg:p-10 space-y-5">
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span style={{ color: "var(--primary-glow)" }}>{active.kind}</span>
              <span>·</span>
              <span>{active.year}</span>
              <span>·</span>
              <span>{active.scope}</span>
              <span>·</span>
              <span>cap. {active.capacity}</span>
            </div>
            <h3 className="font-serif font-light text-[22px] md:text-[28px] leading-[1.2] tracking-[-0.015em] text-foreground/95 max-w-[58ch]">
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
            <div
              className="pt-4 flex items-center gap-3 border-t"
              style={{ borderColor: "oklch(0.55 0.18 35 / 0.18)" }}
            >
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

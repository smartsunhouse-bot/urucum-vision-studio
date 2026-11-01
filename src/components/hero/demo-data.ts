export type DemoScene = {
  label: string;
  shortLabel: string;
  caption: string;
  image: string;
  metrics?: { label: string; value: string }[];
};

// Edite apenas este objeto para trocar as imagens e números da demonstração.
export const demoScenes: DemoScene[] = [
  { label: "Captura", shortLabel: "Captura", caption: "Uma imagem entra no fluxo — pelo app, plataforma ou API REST.", image: "/images/story/back-original.png" },
  { label: "Análise da captura", shortLabel: "Análise", caption: "A qualidade da captura é verificada antes de qualquer correção.", image: "/images/story/back-original.png", metrics: [{ label: "Nitidez", value: "adequada" }, { label: "Iluminação", value: "requer atenção" }, { label: "Contraste", value: "adequado" }, { label: "Resolução", value: "adequada" }, { label: "Pele detectada", value: "74%" }] },
  { label: "Pele e tom", shortLabel: "Pele e tom", caption: "A pele é isolada e o tom é estimado por ITA, sem rede neural.", image: "/images/story/back-mask.png", metrics: [{ label: "Máscara de pele", value: "74%" }, { label: "ITA", value: "−3,3°" }, { label: "CIELAB", value: "L* · b*" }] },
  { label: "Correção adaptada", shortLabel: "Correção", caption: "A correção acontece só onde precisa, dosada pelo tom da pele.", image: "/images/story/back-urucum.png" },
  { label: "Imagem pronta", shortLabel: "Pronta", caption: "Imagem e métricas estruturadas retornam ao seu fluxo.", image: "/images/story/back-urucum.png", metrics: [{ label: "Estado", value: "IMAGE READY" }, { label: "Formato", value: "REST / MCP" }] },
];

export const demoJson = ['{', '  "status": "IMAGE_READY",', '  "ita": -3.3,', '  "skin_area": 0.74', '}'];

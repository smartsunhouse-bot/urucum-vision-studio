
# Crítica de Direção de Arte — Urucum AI

## 1. Diagnóstico do estado atual

O site hoje carrega o discurso certo, mas veste o uniforme errado. Ele fala de invisibilidade algorítmica usando a gramática visual de uma SaaS B2B genérica: cards retangulares com `rounded-md`, hierarquia de blog (H2 + parágrafo + CTA), seções empilhadas com respiro uniforme, ícones decorativos, sem tensão óptica. O resultado é um site **legível mas inerte** — não causa o desconforto que o tema exige.

Problemas concretos identificados:

- **Cards homogêneos**: `Product`, `TechnicalGrid`, `Results`, `HowItWorks` e `ScientificBase` usam a mesma anatomia (border 1px, padding 24-32, título + corpo). Vira ruído visual repetido.
- **Hero passivo**: headline + subheadline + dois botões. Não há "câmera tentando ver". Não há tempo, não há falha, não há vigilância. Só copy boa.
- **"Notícias/Research" como blog**: `ResearchLandscape` ficou editorial-elegante, mas o usuário pediu **incident reports**, não revista.
- **Falta gramática de visão computacional**: zero bounding boxes reais, zero HUD, zero scanlines integradas ao conteúdo, zero metadata óptica (frame ID, confidence, light score) usada como ornamento estrutural.
- **Excesso de centralização**: tudo é `mx-auto max-w-*`. Falta assimetria, deslocamentos, sangrias industriais.
- **Tipografia única**: sem contraste entre voz institucional (serif crítica) e voz de máquina (mono técnico). Tudo é sans neutro.
- **Animação ausente**: o site é estático. Para um produto sobre captura em tempo real, isso é uma traição ao discurso.

---

## 2. Nova direção: "Optical Infrastructure"

Linguagem visual derivada de **firmware de câmera industrial + relatórios desclassificados + interfaces de pesquisa NVIDIA/Blackmagic**. Não é cyberpunk. É **frio, documental, instrumental**.

### Princípios
1. **Toda informação tem coordenadas.** IDs, hashes, timestamps, frame counters acompanham títulos como metadata permanente.
2. **A câmera está sempre ligada.** Microanimações contínuas em background (scanline lenta, ruído de sensor, crosshair que respira) sem nunca virar showreel.
3. **Falha como estética.** Glitches sutis, dropouts de confidence, tracking quebrado aparecem como decoração funcional, não efeito.
4. **Assimetria industrial.** Grids de 12 colunas com sangrias, recortes diagonais, módulos de larguras diferentes. Nada centralizado por default.
5. **Duas vozes tipográficas.**
   - **Editorial crítica**: serif display (Instrument Serif) para manifesto e citações.
   - **Instrumental/máquina**: mono (JetBrains Mono) para metadata, IDs, status.
   - Body em sans neutro discreto (Inter) — peso 300/400 apenas.

### Paleta refinada (tokens em `src/styles.css`)
- `--bg`: `oklch(0.08 0.012 30)` — preto com undertone quente quase imperceptível
- `--bg-elevated`: `oklch(0.11 0.014 30)`
- `--ink`: `oklch(0.96 0.005 80)` — off-white papel
- `--ink-dim`: `oklch(0.62 0.008 70)`
- `--signal`: `oklch(0.68 0.19 32)` — urucum/ember, usado com extrema parcimônia (apenas confidence/alertas)
- `--signal-cold`: `oklch(0.78 0.10 220)` — azul sensor, para tracking/bounding boxes
- `--grid-line`: `oklch(0.96 0.005 80 / 0.06)`
- `--scanline`: `oklch(0.96 0.005 80 / 0.03)`

---

## 3. Nova arquitetura de seções

```text
┌─────────────────────────────────────────────────────────────┐
│ 00 ─ OpticalHUD (frame global: crosshair canto, frame ID,   │
│      lat/long fake, timestamp ao vivo, scanline contínua)   │
├─────────────────────────────────────────────────────────────┤
│ 01 ─ Hero "Detection Attempt"                               │
│      Câmera tentando detectar rosto negro. Bounding box     │
│      pisca, confidence cai de 87% → 31% → LOST. Headline    │
│      aparece quando o tracking falha.                       │
├─────────────────────────────────────────────────────────────┤
│ 02 ─ Manifesto editorial (1 frase serif gigante, sangrada)  │
├─────────────────────────────────────────────────────────────┤
│ 03 ─ IncidentLog (substitui ResearchLandscape como blog)    │
│      Lista vertical tipo terminal/registro classificado.    │
├─────────────────────────────────────────────────────────────┤
│ 04 ─ OpticalModules (substitui TechnicalGrid)               │
│      Cards-como-cartão-SD/módulo-de-câmera.                 │
├─────────────────────────────────────────────────────────────┤
│ 05 ─ Product "Capture Stack" (assimétrico, com HUD vivo)    │
├─────────────────────────────────────────────────────────────┤
│ 06 ─ ScientificBase (fichas biométricas de pesquisadores)   │
├─────────────────────────────────────────────────────────────┤
│ 07 ─ Timeline (mantida em disclosure, repaginada)           │
├─────────────────────────────────────────────────────────────┤
│ 08 ─ Contact / "Request clearance"                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Componentes novos (anatomia)

### `OpticalHUD` (overlay global, position: fixed)
Quatro crosshairs nos cantos, frame counter rodando (`FRAME #04821 → #04822`), timestamp UTC ao vivo, scanline horizontal de 1px que desce a viewport a cada 8s. Pointer-events none. Opacidade 0.35.

### `DetectionHero`
- Imagem em grayscale com `clip-path` parcial simulando "área detectada".
- Bounding box SVG animado que se redesenha a cada 3s tentando "encontrar" o rosto, com confidence numérica caindo.
- Headline aparece com efeito de tipografia "renderizando" (char-by-char) somente após o terceiro tracking falhar.
- Subheadline em mono pequeno, alinhada à esquerda como log.
- CTAs estilo "REQUEST ACCESS / VIEW SYSTEM" — sem rounded, border 1px ember, font mono uppercase tracking-widest.

### `IncidentCard` (anatomia compartilhada para reports, módulos, evidências)
```
┌──────────────────────────────────────────────┐
│ ◤ ID: URC-2024-0317      [▮ CRITICAL]   ◥   │ ← canto cortado real (clip-path)
│ ──────────────────────────────────────────── │
│ FACIAL DETECTION FAILURE                     │ ← mono uppercase
│ Affected group: Fitzpatrick V–VI             │ ← sans light
│                                              │
│ ░░░░░▓▓▓▓▓░░░  confidence 31%                │ ← barra ascii
│                                              │
│ LAT 23.5505°S  LON 46.6333°W                 │
│ FRAME #04821   LIGHT SCORE: LOW              │
│ ◣                                          ◢ │
└──────────────────────────────────────────────┘
```
Sem `border-radius`. Cantos cortados com `clip-path: polygon(...)`. Background `--bg-elevated`. Border 1px `--grid-line`. Hover: bordas ficam `--signal-cold`, scanline curta cruza o card uma vez.

### `OpticalModule` (cards-cartão-SD)
Proporção 3:2 horizontal. Lado esquerdo: "chip" visual (grid de pontos representando sensor). Lado direito: metadata + título. Slot inferior com "CAPACITY / FORMAT / SPEED CLASS" reapropriado para tech specs do produto.

### `BiometricCard` (para pesquisadores em ScientificBase)
Foto do autor em grayscale com landmarks faciais sobrepostos (68 pontos SVG estáticos), nome em mono, instituição, "quote" em serif italic abaixo. Parece ficha de identificação científica.

---

## 5. Motion design

- **Global**: scanline contínua, frame counter incrementando, timestamp UTC ao vivo. Tudo `prefers-reduced-motion: respect`.
- **Reveal**: elementos entram com `clip-path` revelando da esquerda + char-stagger no mono. Nunca fade simples.
- **Hover em cards**: ruído digital de 200ms + reset da bounding box.
- **Cursor (desktop)**: micro crosshair seguindo o mouse com coordenadas vivas em mono ao lado. Some em mobile.
- **Transições de seção**: separadores horizontais de 1px com ticks marcando "0%, 25%, 50%, 75%, 100%" como régua de timecode.

---

## 6. Tipografia

- Display crítico: **Instrument Serif** (já disponível no preset usado)
- Body: **Inter** weight 300/400, tracking levemente negativo em sizes grandes
- Máquina: **JetBrains Mono** weight 400, uppercase, tracking-wider, sempre em cor `--ink-dim`
- Hierarquia: H1 serif 72-120px; H2 mono uppercase 12-14px (eyebrow); H3 sans medium 24px

---

## 7. UX / interações

- Navbar vira régua técnica fina (12px height) com seções numeradas `01 · 02 · 03`.
- Scroll progress vira um "timeline scrubber" no rodapé esquerdo com timecode.
- Cada seção tem um ID visível tipo `§ 03 / INCIDENT LOG` no canto superior direito sticky durante a leitura da seção.
- Acesso ao produto vira "REQUEST CLEARANCE" — formulário estilo terminal.

---

## 8. Plano de implementação (faseado)

Dado o escopo, proponho executar em **3 ondas**. A cada onda você revisa antes de continuar.

### Onda 1 — Fundação (esta resposta, se aprovada)
1. Atualizar tokens em `src/styles.css` (nova paleta, scanline, grid-line, fontes mono+serif via `@import`).
2. Criar `src/components/optical/OpticalHUD.tsx` (overlay global) e montar em `routes/index.tsx`.
3. Criar primitives reutilizáveis: `IncidentCard`, `OpticalModule`, `MonoMeta`, `CornerTicks`, `Scanline`, `BoundingBox`.
4. Refazer `Hero.tsx` como `DetectionHero` com bounding box animada e confidence drop.
5. Refazer Navbar como régua técnica numerada.

### Onda 2 — Conteúdo
6. Substituir `ResearchLandscape` por `IncidentLog` (lista vertical tipo registro classificado, com os mesmos casos reais reformatados como incident reports).
7. Refazer `TechnicalGrid` usando `OpticalModule`.
8. Refazer `ScientificBase` com `BiometricCard` + landmarks SVG.
9. Refazer `Product` com layout assimétrico + HUD vivo.

### Onda 3 — Polimento
10. Cursor crosshair desktop, section IDs sticky, timeline scrubber.
11. Motion design (reveal clip-path, char-stagger, ruído em hover).
12. Repaginar `Timeline` dentro do disclosure com mesma linguagem.
13. Refazer `Contact` como "Request Clearance" terminal.

---

## Detalhes técnicos

- Stack mantida (TanStack Start + Tailwind v4 tokens em `src/styles.css`).
- Tokens novos via CSS custom properties oklch — zero cores hardcoded em componentes.
- Fontes adicionadas via `@import` em `src/styles.css` (Instrument Serif + JetBrains Mono + Inter já presentes via Google Fonts).
- SVG inline para bounding boxes, landmarks, crosshairs (performance + theming via `currentColor`).
- `prefers-reduced-motion` respeitado em todas as animações contínuas.
- Zero bibliotecas novas — usar `clip-path`, CSS animations, e `requestAnimationFrame` apenas para frame counter/timestamp.

---

**Confirma a direção e começo pela Onda 1?** Se quiser ajustar paleta, tipografia, ou trocar a ordem das ondas, me diga antes de eu codar.


# Auditoria Mobile — Contraste, Fonte e Teclado

Escopo: revisar o site (foco no viewport 384px atual) e corrigir problemas de acessibilidade em três eixos, sem alterar identidade visual (urucum, Playfair, tokens já definidos).

## 1. Achados confirmados (via leitura de código)

**Contraste (WCAG AA — mínimo 4.5:1 para texto normal, 3:1 para large text)**
- Uso repetido de `text-foreground/30`, `/35`, `/40`, `/45` em labels mono uppercase (Hero, Product, ResearchLandscape, IncidentLog, solucoes.index, Timeline). Sobre `--background` escuro, essas opacidades caem para ~2:1–3:1. Falha AA.
- `text-urucum/85` em labels pequenos sobre fundo escuro — validar; provável borderline.
- Placeholders e texto de suporte com `text-foreground/55` em fontes ≤11px falham AA (só passam como large text quando ≥18.66px bold / 24px regular).

**Tamanho de fonte / legibilidade mobile**
- Blocos de texto informativo em `text-[8px]` a `text-[10.5px]` no Product.tsx, IncidentLog, solucoes.index, ResearchLandscape. Em 384px CSS isso fica <11px físico — abaixo do mínimo confortável (12px) e do recomendado (14–16px para corpo).
- Corpo (`<p>`) em `text-[11.5px]` a `text-[12.5px]` no Product/solucoes — deveria ser ≥14px em mobile.
- Headline Hero já ajustada (30px mobile) — ok.

**Teclado / navegação**
- Vários `onClick` estão em elementos `<button>` reais (bom), mas alguns cards clicáveis em IncidentLog/solucoes.index usam `<button>` sem `focus-visible` explícito → depender do default do browser em fundo escuro é invisível.
- Sem `Skip to content` link.
- Navbar mobile: verificar se o menu hambúrguer (se existir) tem `aria-expanded`, `aria-controls`, e foco trapado quando aberto.
- Tap targets: botões mono uppercase com padding pequeno (`py-3 px-4` em Product footer) — validar 44×44.
- Tooltips do Hero (glossário): abrem em hover; em mobile precisam abrir também em focus/tap (Radix Tooltip já cobre focus, mas confirmar que não bloqueia leitura).
- Vídeo do Hero: `autoplay muted loop` sem `aria-hidden` e sem controles — se puramente decorativo, marcar `aria-hidden="true"` e garantir `prefers-reduced-motion` respeitado.

## 2. Correções propostas (uma passada de acessibilidade)

**A. Contraste**
- Substituir opacidades <60 em texto informativo por tokens: `text-muted-foreground` (ajustar variável no `src/styles.css` para garantir ≥4.5:1 sobre `--background`) ou `text-foreground/70` como piso.
- Labels mono decorativos que precisam ficar discretos: manter `/55` mas apenas quando não carregam informação essencial; caso contrário subir para `/75`.
- Auditar `text-urucum/85` sobre preto — subir para `/100` (o próprio urucum #C2410C já tem contraste ok).

**B. Tipografia mobile**
- Piso de 12px para labels mono e 14px para corpo em `<640px`. Ajustes com breakpoint: `text-[11px] sm:text-[9.5px]` (aumenta no mobile, reduz no desktop, ao contrário do padrão atual).
- Componentes a ajustar: `Hero.tsx` (legenda), `Product.tsx` (todos os labels e corpo), `IncidentLog.tsx` (dossier bars/labels), `ResearchLandscape.tsx` (cards), `solucoes.index.tsx` (cards e hero).

**C. Teclado e ARIA**
- Adicionar estilo global `:focus-visible` com anel urucum (2px offset) em `src/styles.css` para `button, a, [role="button"]`.
- Adicionar `<a href="#main" className="sr-only focus:not-sr-only …">Pular para o conteúdo</a>` no `__root.tsx` e `id="main"` no `<main>`.
- Marcar vídeo decorativo do Hero com `aria-hidden="true"` e `tabIndex={-1}`.
- Verificar Navbar mobile: se houver menu colapsável, garantir `aria-expanded` e fechamento por Esc (Radix já cobre se estiver usando Sheet/DropdownMenu).
- Confirmar tap targets ≥44×44 nos CTAs e nos "logo tiles" do IncidentLog (aumentar padding onde necessário).
- Adicionar `prefers-reduced-motion` guard nas animações do Hero (stage 1–5), Timeline scroll, e vídeo (pausar).

## 3. Entregáveis

Um único PR de acessibilidade tocando:
- `src/styles.css` — token `--muted-foreground` mais claro, regra global de `:focus-visible`, media query `prefers-reduced-motion`.
- `src/routes/__root.tsx` — skip link, `<main id="main">` (verificar se já existe layout com main único).
- `src/components/Hero.tsx` — pisos de fonte mobile, `aria-hidden` no vídeo, respeitar reduce-motion.
- `src/components/Product.tsx` — subir todos os `text-[8-11px]` para pisos mobile e ajustar opacidades.
- `src/components/IncidentLog.tsx` — contraste labels, focus ring nos logo tiles, tap target ≥44px.
- `src/components/ResearchLandscape.tsx` — mesma passada.
- `src/routes/solucoes.index.tsx` — mesma passada.
- `src/components/Navbar.tsx` — validar menu mobile e focus.

## 4. Verificação

Após implementar:
- Rodar Playwright em viewport 384×702 (mobile atual do usuário), tirar screenshots do Hero, Product, IncidentLog, Solucoes.
- Checar contraste com script (calcular ratio dos tokens finais).
- Testar Tab-navigation registrando ordem de foco e visibilidade do anel.

## Fora de escopo
- Não alterar layout, cores de marca, ou copy.
- Não redesenhar componentes — só ajustes de tamanho/opacidade/ARIA/foco.

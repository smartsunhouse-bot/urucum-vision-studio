import { useEffect, useRef, useState } from "react";
import urucumLogo from "@/assets/urucum-logo.png";

const timelineItems = [
  {
    code: "01",
    title: "A Linha da Invisibilidade",
    sub: "1839 → hoje",
    desc: "Seis capítulos sobre como o erro nasceu na química do filme e sobreviveu no sensor digital.",
    href: "/#entenda",
  },
  {
    code: "02",
    title: "O Custo da Invisibilidade",
    sub: "Registro de dados",
    desc: "Casos documentados de falha em biometria, diagnóstico e vigilância em peles retintas.",
    href: "/#registro",
  },
  {
    code: "03",
    title: "A Virada",
    sub: "Capítulo 06",
    desc: "O momento em que a linha do tempo deixa de ser problema e vira infraestrutura de captura.",
    href: "/#entenda",
  },
];

const infraItems = [
  {
    code: "01",
    title: "Módulo Paramétrico",
    sub: "λ · γ · σ",
    desc: "A matemática por trás da API: ajustes minuciosos de lambda, gamma e sigma sobre a curva de exposição.",
    href: "/#exposicao",
  },
  {
    code: "02",
    title: "Performance · 14.4 ms",
    sub: "Borda",
    desc: "Gráficos de velocidade de processamento e consumo de memória sob carga real.",
    href: "/#performance",
  },
  {
    code: "03",
    title: "Pipeline de Captura",
    sub: "HDR · radiância",
    desc: "Como a radiometria adaptativa preserva detalhe fotométrico em fototipos IV–VI.",
    href: "/#produto",
  },
];

const resourceItems = [
  {
    code: "01",
    title: "Documentação da API",
    sub: "Guia de integração",
    desc: "Endpoints, parâmetros e manifesto determinístico — integração direta no seu editor.",
    href: "/#documentacao",
  },
  {
    code: "02",
    title: "Propriedade Intelectual",
    sub: "Patente técnica",
    desc: "Detalhes da patente da pipeline radiométrica adaptativa da Urucum.",
    href: "/#patente",
  },
  {
    code: "03",
    title: "Suporte ao Desenvolvedor",
    sub: "Canal direto",
    desc: "Fale com engenheiros que estão integrando a pipeline em produção.",
    href: "/#suporte",
  },
];

const links: { href: string; label: string }[] = [
  { href: "/#entenda", label: "Linha do Tempo" },
  { href: "/#produto", label: "Infraestrutura" },
  { href: "/#recursos", label: "Recursos" },
  { href: "/#precos", label: "Preços" },
];


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const open = (key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenKey(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenKey(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-4 sm:pt-5 px-4 sm:px-6 lg:px-10">
      <nav
        className={`max-w-[1200px] mx-auto h-[58px] sm:h-[64px] rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-[oklch(0.12_0.015_35_/0.92)] border border-[oklch(0.30_0.03_40_/0.45)] backdrop-blur-xl shadow-lg"
            : "bg-[oklch(0.12_0.015_35_/0.75)] border border-[oklch(0.30_0.03_40_/0.30)] backdrop-blur-md"
        }`}
        aria-label="Navegação principal"
      >
        <div className="h-full px-4 sm:px-5 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* logo */}
          <a
            href="/"
            aria-label="URUCUM IA — página inicial"
            className="flex items-center gap-2.5 group leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
          >
            <img
              src={urucumLogo}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="h-6 w-auto select-none block transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ mixBlendMode: "screen", opacity: 0.8 }}
            />
            <span
              className="font-semibold uppercase leading-none text-[17px] sm:text-[19px]"
              style={{
                fontFamily: "'Playfair Display', 'Fraunces', Georgia, serif",
                letterSpacing: "-0.01em",
                color: "#E2E8F0",
              }}
            >
              URUCUM <span style={{ color: "#C2410C" }}>IA</span>
            </span>
          </a>

          {/* desktop links — centered */}
          <ul className="hidden md:flex items-center justify-center gap-7 lg:gap-9">
            {links.map((l) => {
              const dropdown =
                l.label === "Produto"
                  ? { key: "produto", items: productPillars, width: "w-[640px]" }
                  : l.label === "Soluções"
                    ? { key: "solucoes", items: industries, width: "w-[560px]" }
                    : null;
              const isOpen = dropdown ? openKey === dropdown.key : false;
              return (
                <li
                  key={l.href}
                  className={dropdown ? "relative" : undefined}
                  onMouseEnter={dropdown ? () => open(dropdown.key) : undefined}
                  onMouseLeave={dropdown ? scheduleClose : undefined}
                >
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] tracking-wide text-foreground/75 hover:text-foreground transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm py-1"
                    aria-haspopup={dropdown ? true : undefined}
                    aria-expanded={dropdown ? isOpen : undefined}
                  >
                    {l.label}
                    {dropdown && (
                      <span className="text-[8px] text-foreground/40 leading-none">▾</span>
                    )}
                  </a>

                  {dropdown && isOpen && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${dropdown.width} z-50`}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <div
                        className="rounded-xl p-5 grid grid-cols-3 gap-3"
                        style={{
                          background: "oklch(0.10 0.012 35 / 0.96)",
                          border: "1px solid oklch(0.55 0.18 35 / 0.22)",
                          backdropFilter: "blur(14px)",
                          boxShadow:
                            "0 30px 60px -20px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.55 0.18 35 / 0.08)",
                        }}
                      >
                        {dropdown.items.map((p) => (
                          <a
                            key={p.code}
                            href={p.href}
                            className="group block p-3.5 rounded-lg transition-colors duration-300 hover:bg-[oklch(0.18_0.02_35_/_0.6)]"
                          >
                            <div className="flex items-center gap-2 text-[9px] font-mono tracking-[0.32em] uppercase text-foreground/40">
                              <span style={{ color: "oklch(0.66 0.24 28)" }}>{p.code}</span>
                              <span>{"sub" in p ? (p as { sub: string }).sub : "Indústria"}</span>
                            </div>
                            <div className="mt-2 font-serif text-[15px] leading-tight text-foreground/95 group-hover:text-foreground transition-colors">
                              {p.title}
                            </div>
                            <p className="mt-2 text-[11px] leading-[1.55] text-foreground/55 normal-case tracking-normal font-sans">
                              {p.desc}
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/auth"
              className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-lg text-[12px] font-medium text-foreground/85 hover:text-foreground border border-[oklch(0.35_0.03_40_/0.55)] hover:border-[oklch(0.45_0.04_40_/0.7)] bg-transparent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Entrar
            </a>
            <a
              href="/#contato"
              className="hidden md:inline-flex items-center justify-center h-9 px-4 rounded-lg text-[12px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow: "0 1px 0 oklch(1 0 0 / 0.08) inset, 0 6px 18px -8px oklch(0.55 0.22 25 / 0.5)",
              }}
            >
              Solicitar acesso
            </a>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-foreground/85 hover:text-foreground"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block w-5 h-4">
                <span className={`absolute left-0 right-0 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 right-0 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? "top-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden max-w-[1200px] mx-auto mt-2 overflow-hidden transition-[max-height,opacity] duration-300 rounded-2xl ${mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          background: "oklch(0.10 0.012 35 / 0.98)",
          border: mobileOpen ? "1px solid var(--border)" : "none",
          backdropFilter: "blur(14px)",
        }}
        aria-hidden={!mobileOpen}
      >
        <ul className="px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-2 text-[15px] text-foreground/90 hover:text-foreground border-b border-border/30"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-3 flex flex-col gap-2">
            <a
              href="/auth"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-10 px-4 rounded-lg text-[14px] font-medium text-foreground/85 border border-[oklch(0.35_0.03_40_/0.55)]"
            >
              Entrar
            </a>
            <a
              href="/#contato"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-10 px-4 rounded-lg text-[14px] font-medium"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Solicitar acesso
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

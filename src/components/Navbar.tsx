import { useEffect, useRef, useState } from "react";
import urucumLogo from "@/assets/urucum-logo.png";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/#produto", label: "Produto" },
  { href: "/#tecnologia", label: "Tecnologia" },
  { href: "/#precos", label: "Preços" },
];

const productPillars = [
  {
    code: "01",
    title: "Sintética API",
    sub: "Geração on-demand",
    desc: "Painel programável: fototipos IV–VI, iluminação, clima, sensores. Output via POST /v1/generate_faces.",
    href: "#produto",
  },
  {
    code: "02",
    title: "Datasets Pré-Treinados",
    sub: "Core libraries",
    desc: "Bancos massivos prontos: biométrico base, estresse lumínico, dermatológico clínico em peles retintas.",
    href: "#produto",
  },
  {
    code: "03",
    title: "Motor de Anotação",
    sub: "Pixel-perfect ground truth",
    desc: "Segmentação semântica, 68+ landmarks faciais. Export COCO JSON, YOLO txt, Pascal VOC.",
    href: "#produto",
  },
];

const industries = [
  { code: "α", title: "Biometria & FinTechs", desc: "KYC, liveness e auditoria biométrica em fototipos IV–VI.", href: "/solucoes/biometria" },
  { code: "β", title: "Saúde & Telemedicina", desc: "Dermatologia clínica e imagem médica em peles retintas.", href: "/solucoes/diagnostico" },
  { code: "γ", title: "Smart Cities & CFTV", desc: "Vigilância urbana sob baixa luz e sombras críticas.", href: "/solucoes/smart-cities" },
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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-xl bg-background/55 border-b border-border/40"
          : ""
      }`}
    >
      <nav className="max-w-[1320px] mx-auto px-5 md:px-6 lg:px-12 h-[72px] md:h-[84px] grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-10" aria-label="Navegação principal">

        {/* logo lockup — wordmark é protagonista, logo é selo */}
        <a
          href="/"
          aria-label="URUCUM IA — página inicial"
          className="flex items-center gap-3 group leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <span
            className="font-semibold uppercase leading-none text-[22px] lg:text-[26px]"
            style={{
              fontFamily: "'Playfair Display', 'Fraunces', Georgia, serif",
              letterSpacing: "-0.01em",
              color: "#E2E8F0",
            }}
          >
            URUCUM <span style={{ color: "#C2410C" }}>IA</span>
          </span>
          <img
            src={urucumLogo}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="h-7 lg:h-8 w-auto select-none block transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ mixBlendMode: "screen", opacity: 0.65 }}
          />
        </a>

        {/* nav */}
        <ul className="hidden md:flex items-center justify-end gap-8">
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
                  className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] tracking-wide text-foreground/75 hover:text-foreground transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm py-1"
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
                    className={`absolute right-0 top-full pt-4 ${dropdown.width} z-50`}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div
                      className="rounded-[3px] p-5 grid grid-cols-3 gap-3"
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
                          className="group block p-3.5 rounded-[2px] transition-colors duration-300 hover:bg-[oklch(0.18_0.02_35_/_0.6)]"
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

        <div className="flex items-center gap-2">
          <a
            href="/#contato"
            className="hidden sm:inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-md transition-all duration-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 1px 0 oklch(1 0 0 / 0.08) inset, 0 8px 24px -10px oklch(0.55 0.22 25 / 0.55)",
            }}
          >
            Solicitar acesso
            <span aria-hidden="true">→</span>
          </a>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-foreground/85 hover:text-foreground"
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
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          background: "oklch(0.10 0.012 35 / 0.98)",
          borderTop: mobileOpen ? "1px solid var(--border)" : "none",
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
          <li className="mt-3">
            <a
              href="/#contato"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 text-[14px] font-medium px-5 py-3 rounded-md w-full justify-center"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Solicitar acesso <span aria-hidden="true">→</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}


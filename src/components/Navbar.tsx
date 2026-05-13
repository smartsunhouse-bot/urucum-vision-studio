import { useEffect, useRef, useState } from "react";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/#produto", label: "Produto" },
  { href: "/#tecnologia", label: "Tecnologia / Ética" },
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
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <nav className="max-w-[1320px] mx-auto px-6 lg:px-12 h-[68px] grid grid-cols-[auto_1fr_auto] items-center gap-10">
        {/* logo */}
        <a href="/" className="flex items-center gap-3 group">
          <span
            className="relative inline-block w-[7px] h-[7px] rounded-full"
            style={{
              background: "oklch(0.62 0.24 26)",
              boxShadow: "0 0 14px oklch(0.62 0.24 26 / 0.85)",
            }}
          />
          <span className="text-[11px] font-mono tracking-[0.42em] uppercase text-foreground/85">
            Urucum
            <span className="text-foreground/35"> / </span>
            <span style={{ color: "oklch(0.66 0.24 28)" }}>AI</span>
          </span>
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
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-mono tracking-[0.22em] uppercase text-foreground/55 hover:text-foreground/95 transition-colors duration-500"
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

        <a
          href="/#contato"
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.22em] uppercase px-4 py-2 rounded-[2px] text-foreground/85 hover:text-foreground transition-colors duration-500"
          style={{
            border: "1px solid oklch(0.55 0.18 35 / 0.32)",
            background: "oklch(0.14 0.018 40 / 0.5)",
          }}
        >
          <span
            className="inline-block w-1 h-1 rounded-full"
            style={{ background: "oklch(0.66 0.24 28)" }}
          />
          Solicitar acesso
        </a>
      </nav>
    </header>
  );
}

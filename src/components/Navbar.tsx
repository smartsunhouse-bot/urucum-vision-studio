import { useEffect, useState } from "react";

const links = [
  { href: "#produto", label: "Produto" },
  { href: "#como-funciona", label: "Sistema" },
  { href: "#resultados", label: "Resultados" },
  { href: "#documentacao", label: "Documentação" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a href="#top" className="flex items-center gap-3 group">
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

        {/* nav — pushed right, breathable */}
        <ul className="hidden md:flex items-center justify-end gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[11.5px] font-mono tracking-[0.22em] uppercase text-foreground/55 hover:text-foreground/95 transition-colors duration-500"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
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

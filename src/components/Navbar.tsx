import { useEffect, useState } from "react";

const links = [
  { href: "#produto", label: "Produto" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#resultados", label: "Resultados" },
  { href: "#documentacao", label: "Documentação" },
  { href: "#contato", label: "Contato" },
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-border" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative inline-block w-2.5 h-2.5 rounded-full bg-[oklch(0.55_0.18_35)] glow-red" />
          <span className="text-sm tracking-[0.22em] uppercase text-foreground/90">
            Urucum<span className="text-urucum"> AI</span>
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[12.5px] tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contato"
          className="text-[12.5px] tracking-wide text-foreground/90 border border-border px-3.5 py-1.5 rounded-sm hover:border-urucum/60 hover:text-urucum transition-colors"
          style={{ borderColor: "oklch(0.55 0.18 35 / 0.35)" }}
        >
          Solicitar acesso
        </a>
      </nav>
    </header>
  );
}

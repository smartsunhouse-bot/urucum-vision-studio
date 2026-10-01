
/* ============================================================
   URUCUM / AI — Dashboard técnico
   ============================================================ */

/* ---------- atoms ---------- */

function Label({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-[9.5px] font-mono uppercase tracking-[0.32em] text-urucum/85">
      <div className="flex items-center gap-2">
        <span className="text-urucum">▸</span>
        <span>{children}</span>
      </div>
      {right && <span className="text-foreground/35 tracking-[0.22em]">{right}</span>}
    </div>
  );
}

function Panel({
  children,
  className = "",
  pad = "p-4",
}: {
  children: React.ReactNode;
  className?: string;
  pad?: string;
}) {
  return (
    <div className={`relative ${pad} ${className}`}>
      {children}
    </div>
  );
}

/* ---------- metrics ---------- */

function MetricsPanel() {
  const rows = [
    ["SNR (dB)", "28.4"],
    ["D-RE (EV)", "2.73"],
    ["DETALHE (%)", "92.6"],
    ["RETENÇÃO TONAL", "99.2"],
  ];
  return (
    <Panel pad="py-8" className="min-w-0">
      <Label>MÉTRICAS</Label>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {rows.map(([k, v]) => (
          <div key={k}>
            <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/55">{k}</div>
            <div className="font-serif text-[22px] text-foreground/95 leading-none mt-0.5">{v}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ---------- main section ---------- */

export function Product() {
  return (
    <section
      id="produto"
      className="relative border-t"
      style={{
        background:
          "radial-gradient(1400px 700px at 80% -10%, oklch(0.12 0.04 30 / 0.55), transparent 60%), linear-gradient(180deg, oklch(0.05 0.008 30), oklch(0.04 0.006 30))",
        borderColor: "oklch(0.42 0.08 30 / 0.35)",
      }}
    >
      {/* grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
      }} />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 py-28 lg:py-40">
        {/* ============= MID DASHBOARD ============= */}
        <div className="border-t border-border/25">
          <MetricsPanel />
        </div>

        {/* signature */}
        <div className="mt-16 pt-8 border-t border-border/25 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.32em] text-foreground/40">
          <span><span className="text-urucum/80">URUCUM AI</span> — CAPTURE · UNDERSTAND · REPRESENT</span>
          <span>FIG. 03 · v 2.4</span>
        </div>
      </div>
    </section>
  );
}

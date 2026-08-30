
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

/* ---------- mid row: radiance map / sensor curve / segmentation / metrics ---------- */

function SensorChart() {
  return (
    <Panel pad="p-4" className="md:border-l md:border-border/25">
      <Label>RESPOSTA DO SENSOR × COMPRIMENTO DE ONDA</Label>
      <div className="relative mt-4">
        <svg viewBox="0 0 320 140" className="w-full h-44">
          {/* grid */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((y) => (
            <line key={y} x1="30" y1={20 + y * 100} x2="310" y2={20 + y * 100} stroke="oklch(0.3 0.04 30 / 0.3)" strokeWidth="0.3" />
          ))}
          {[400, 500, 600, 700, 800].map((x, i) => (
            <line key={x} x1={30 + i * 70} y1="20" x2={30 + i * 70} y2="120" stroke="oklch(0.3 0.04 30 / 0.3)" strokeWidth="0.3" />
          ))}
          {/* curves */}
          {[
            { color: "oklch(0.62 0.22 28)", peak: 0.65, label: "R" },
            { color: "oklch(0.72 0.18 145)", peak: 0.4, label: "G" },
            { color: "oklch(0.65 0.18 245)", peak: 0.2, label: "B" },
            { color: "oklch(0.55 0.16 35)", peak: 0.78, label: "DEEP" },
          ].map((c, ci) => {
            const path = Array.from({ length: 60 }).map((_, i) => {
              const x = i / 59;
              const y = Math.exp(-Math.pow((x - c.peak) * 6, 2));
              return `${ci === 0 && i === 0 ? "M" : "L"} ${30 + x * 280} ${120 - y * 100}`;
            }).join(" ");
            return <path key={ci} d={`M ${path.slice(2)}`} fill="none" stroke={c.color} strokeWidth="1.4" />;
          })}
          {/* axis labels */}
          {[400, 500, 600, 700, 800].map((x, i) => (
            <text key={x} x={30 + i * 70} y="135" fontSize="8" fontFamily="monospace" fill="oklch(0.65 0.02 60)" textAnchor="middle">{x}</text>
          ))}
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((y) => (
            <text key={y} x="25" y={24 + (1 - y) * 100} fontSize="8" fontFamily="monospace" fill="oklch(0.65 0.02 60)" textAnchor="end">{y.toFixed(1)}</text>
          ))}
          <text x="170" y="148" fontSize="8" fontFamily="monospace" fill="oklch(0.55 0.02 60)" textAnchor="middle">COMPRIMENTO DE ONDA (nm)</text>
        </svg>
        {/* legend */}
        <div className="absolute top-1 right-2 grid grid-cols-2 gap-x-3 gap-y-0.5 text-[8.5px] font-mono">
          {[
            ["SENSOR R", "oklch(0.62 0.22 28)"],
            ["SENSOR G", "oklch(0.72 0.18 145)"],
            ["SENSOR B", "oklch(0.65 0.18 245)"],
            ["PELE PROFUNDA", "oklch(0.55 0.16 35)"],
          ].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5 text-foreground/65">
              <span className="w-2 h-px" style={{ background: c }} />
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function Segmentation() {
  return (
    <Panel pad="p-4">
      <Label>SEGMENTAÇÃO DE PELE</Label>
      <div className="grid grid-cols-[1.2fr_auto] gap-3 mt-3 items-stretch">
        <div className="relative aspect-square" style={{ background: "oklch(0.05 0.006 30)" }}>
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 50% 42% at 50% 50%, oklch(0.3 0.06 30), oklch(0.12 0.02 30) 75%)",
          }} />
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {Array.from({ length: 40 }).map((_, i) => {
              const x = 20 + Math.random() * 60;
              const y = 20 + Math.random() * 60;
              return <circle key={i} cx={x} cy={y} r="0.5" fill="oklch(0.7 0.22 28 / 0.7)" />;
            })}
            <path d="M 35 30 Q 50 25 65 30" stroke="oklch(0.7 0.22 28 / 0.8)" strokeWidth="0.5" fill="none" />
            <path d="M 30 55 Q 50 65 70 55" stroke="oklch(0.7 0.22 28 / 0.8)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="flex flex-col justify-center gap-2 text-[9px] font-mono uppercase tracking-[0.18em]">
          {[
            ["EPIDERME", "oklch(0.6 0.04 60)"],
            ["LESÃO", "oklch(0.7 0.22 28)"],
            ["MANCHA", "oklch(0.65 0.18 35)"],
            ["VASCULARIZAÇÃO", "oklch(0.55 0.16 28)"],
            ["TEXTURA", "oklch(0.6 0.04 60)"],
          ].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5 text-foreground/65">
              <span className="w-2 h-2" style={{ background: c }} />
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function MetricsPanel() {
  const rows = [
    ["SNR (dB)", "28.4"],
    ["D-RE (EV)", "2.73"],
    ["DETALHE (%)", "92.6"],
    ["RETENÇÃO TONAL", "99.2"],
  ];
  return (
    <Panel pad="p-4">
      <Label>MÉTRICAS</Label>
      <div className="mt-4 space-y-4">
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

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        {/* ============= MID DASHBOARD ============= */}
        <div className="grid lg:grid-cols-[2fr_1fr_0.7fr] gap-0" >
          <SensorChart />
          <Segmentation />
          <MetricsPanel />
        </div>

        {/* signature */}
        <div className="mt-10 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.32em] text-foreground/40">
          <span><span className="text-urucum/80">URUCUM AI</span> — CAPTURE · UNDERSTAND · REPRESENT</span>
          <span>FIG. 03 · v 2.4</span>
        </div>
      </div>
    </section>
  );
}

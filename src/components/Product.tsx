import urucumLogo from "@/assets/urucum-logo.png";

/* ============================================================
   URUCUM / AI — Dashboard técnico
   "Captura determina percepção. Dados definem justiça."
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
    <div
      className={`relative ${pad} ${className}`}
      style={{
        border: "1px solid oklch(0.42 0.08 30 / 0.32)",
        background:
          "linear-gradient(180deg, oklch(0.10 0.014 32 / 0.85), oklch(0.07 0.010 30 / 0.85))",
      }}
    >
      {/* corner ticks */}
      <span className="absolute -top-px -left-px w-2 h-2 border-t border-l" style={{ borderColor: "oklch(0.66 0.20 30 / 0.6)" }} />
      <span className="absolute -top-px -right-px w-2 h-2 border-t border-r" style={{ borderColor: "oklch(0.66 0.20 30 / 0.6)" }} />
      <span className="absolute -bottom-px -left-px w-2 h-2 border-b border-l" style={{ borderColor: "oklch(0.66 0.20 30 / 0.6)" }} />
      <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r" style={{ borderColor: "oklch(0.66 0.20 30 / 0.6)" }} />
      {children}
    </div>
  );
}

/* ---------- face thumbnail (stylized) ---------- */

function FaceTile({
  tone,
  ev,
  variant = "raw",
}: {
  tone: number; // 0..1 (deep → light)
  ev: number;
  variant?: "raw" | "mesh" | "heat" | "tone" | "detail";
}) {
  const skin = `oklch(${0.16 + tone * 0.55} ${0.04 + tone * 0.04} ${30 + tone * 18})`;
  const skinHi = `oklch(${0.22 + tone * 0.55} ${0.05 + tone * 0.04} ${28 + tone * 16})`;
  const lift = ev * 0.14;
  return (
    <div className="relative aspect-[3/4] overflow-hidden" style={{ background: "oklch(0.05 0.008 30)" }}>
      {/* face oval */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 42% at 50% 44%, ${skinHi}, ${skin} 55%, oklch(0.05 0.006 30) 78%)`,
          filter: `brightness(${1 + lift}) contrast(${1 - lift * 0.18})`,
        }}
      />
      {/* mesh overlay */}
      {variant === "mesh" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 60 80" preserveAspectRatio="none">
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse
              key={`h${i}`}
              cx="30"
              cy="36"
              rx={18 - i * 0.6}
              ry={26 - i * 1.1}
              fill="none"
              stroke="oklch(0.72 0.04 60 / 0.35)"
              strokeWidth="0.18"
            />
          ))}
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={`v${i}`} x1={12 + i * 2} y1="10" x2={12 + i * 2} y2="70" stroke="oklch(0.72 0.04 60 / 0.22)" strokeWidth="0.15" />
          ))}
        </svg>
      )}
      {/* heat overlay (radiance) */}
      {variant === "heat" && (
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 38% 30% at 50% 38%, oklch(0.85 0.22 95 / 0.85), oklch(0.7 0.22 55 / 0.55) 35%, oklch(0.55 0.22 28 / 0.45) 55%, oklch(0.35 0.18 260 / 0.55) 78%, transparent 95%)",
          }}
        />
      )}
      {variant === "tone" && (
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{ background: "radial-gradient(ellipse at 50% 40%, oklch(0.7 0.10 40 / 0.4), transparent 70%)" }}
        />
      )}
      {variant === "detail" && (
        <>
          <div className="absolute inset-0 opacity-50" style={{
            background:
              "repeating-linear-gradient(45deg, oklch(0.4 0.05 30 / 0.18) 0 1px, transparent 1px 3px)",
          }} />
          <div className="absolute top-1 right-1 w-5 h-5 border" style={{ borderColor: "oklch(0.7 0.2 28 / 0.7)" }} />
        </>
      )}
      {/* EV label */}
      {ev !== 999 && (
        <div className="absolute top-1.5 left-1.5 text-[8px] font-mono text-foreground/75 tracking-wider">
          {ev > 0 ? `+${ev}` : ev} EV
        </div>
      )}
      {/* corner crop marks */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l" style={{ borderColor: "oklch(0.7 0.18 28 / 0.6)" }} />
      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r" style={{ borderColor: "oklch(0.7 0.18 28 / 0.6)" }} />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l" style={{ borderColor: "oklch(0.7 0.18 28 / 0.6)" }} />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r" style={{ borderColor: "oklch(0.7 0.18 28 / 0.6)" }} />
    </div>
  );
}

/* ---------- histogram ---------- */

function Histogram({ shape }: { shape: "left" | "right" | "center" | "spread" | "rich" }) {
  const bars = Array.from({ length: 28 }).map((_, i) => {
    const x = i / 27;
    let h = 0;
    if (shape === "left") h = Math.exp(-Math.pow((x - 0.15) * 4, 2));
    if (shape === "right") h = Math.exp(-Math.pow((x - 0.88) * 4, 2));
    if (shape === "center") h = Math.exp(-Math.pow((x - 0.5) * 3.5, 2));
    if (shape === "spread") h = 0.3 + 0.7 * Math.abs(Math.sin(x * 6));
    if (shape === "rich") h = 0.4 + 0.55 * Math.sin(x * Math.PI) + 0.05 * Math.sin(x * 18);
    return Math.max(0.05, Math.min(1, h));
  });
  return (
    <div className="flex items-end gap-[1.5px] h-10 mt-2">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1"
          style={{
            height: `${h * 100}%`,
            background:
              shape === "rich"
                ? "linear-gradient(180deg, oklch(0.75 0.18 35), oklch(0.45 0.16 30))"
                : "oklch(0.55 0.04 30 / 0.7)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- exposure pipeline (top right) ---------- */

const EVs = [-3, -2, -1, 0, 1, 2, 3];
const TONES = [0.08, 0.18, 0.32, 0.5, 0.68, 0.82];

function ExposurePipeline() {
  return (
    <Panel pad="p-5">
      <Label right="FIG. 03 — TONE × EV">PIPELINE DE AQUISIÇÃO HDR</Label>

      <div className="grid grid-cols-7 gap-2 mt-5">
        {EVs.map((ev, i) => (
          <div key={ev} className="text-center text-[8.5px] font-mono uppercase tracking-[0.2em] text-foreground/55">
            {ev > 0 ? `+${ev}` : ev} EV
          </div>
        ))}
        {EVs.map((ev, i) => (
          <FaceTile key={`tile-${ev}`} tone={0.12 + i * 0.08} ev={999} />
        ))}
      </div>

      {/* converging arrows */}
      <svg viewBox="0 0 700 36" className="w-full h-9 mt-2">
        {EVs.map((_, i) => {
          const x = 50 + i * 100;
          return <line key={i} x1={x} y1="0" x2="350" y2="32" stroke="oklch(0.6 0.16 30 / 0.45)" strokeWidth="0.7" />;
        })}
        <circle cx="350" cy="32" r="2.5" fill="oklch(0.7 0.2 28)" />
      </svg>

      <div className="grid grid-cols-5 gap-2 mt-3">
        {[
          { label: "ALINHAMENTO", variant: "mesh" as const, tone: 0.5 },
          { label: "FUSÃO HDR", variant: "heat" as const, tone: 0.55 },
          { label: "MAPA DE RADIÂNCIA", variant: "heat" as const, tone: 0.6 },
          { label: "M. TONAL", variant: "tone" as const, tone: 0.42 },
          { label: "DETALHES RECUPERADOS", variant: "detail" as const, tone: 0.35 },
        ].map((s) => (
          <div key={s.label}>
            <div className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-foreground/55 mb-1.5 flex items-center gap-1">
              <span className="text-urucum">▹</span>
              <span className="truncate">{s.label}</span>
            </div>
            <FaceTile tone={s.tone} ev={999} variant={s.variant} />
          </div>
        ))}
      </div>

      {/* heat scale */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-foreground/50">BAIXA</span>
        <div className="flex-1 h-1.5" style={{
          background: "linear-gradient(90deg, oklch(0.25 0.12 260), oklch(0.55 0.18 200), oklch(0.75 0.20 130), oklch(0.78 0.22 80), oklch(0.65 0.24 30))",
        }} />
        <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-foreground/50">ALTA</span>
      </div>
    </Panel>
  );
}

/* ---------- problem strip ---------- */

function ProblemStrip() {
  const items = [
    { tag: "SUBEXPOSIÇÃO", tone: 0.08, ev: -2, hist: "left" as const },
    { tag: "EXPOSIÇÃO INCORRETA", tone: 0.55, ev: 0, hist: "center" as const },
    { tag: "ESTOURO (CLIPPING)", tone: 0.85, ev: 2, hist: "right" as const, danger: true },
    { tag: "BAIXA RETENÇÃO DE DETALHES", tone: 0.25, ev: -1, hist: "spread" as const, detail: true },
    { tag: "RECONSTRUÇÃO HDR URUCUM", tone: 0.35, ev: 0, hist: "rich" as const, detail: true, hero: true },
  ];
  return (
    <div className="grid lg:grid-cols-[1.05fr_3fr] gap-px" style={{ background: "oklch(0.42 0.08 30 / 0.32)" }}>
      <Panel pad="p-6">
        <Label>O PROBLEMA NÃO ESTÁ NO MODELO.</Label>
        <h3 className="font-serif text-[22px] leading-[1.1] mt-3 text-foreground/95">
          Está <span className="italic" style={{ color: "oklch(0.7 0.22 28)" }}>na imagem.</span>
        </h3>
        <p className="text-[11.5px] leading-[1.6] text-foreground/55 mt-4 max-w-[26ch]">
          Sistemas de IA herdam as limitações da captura. Ambientes reais geram subexposição, estouro de brilho, perda de textura e redução de informação crítica.
        </p>
      </Panel>
      <div className="grid grid-cols-5 gap-px" style={{ background: "oklch(0.42 0.08 30 / 0.32)" }}>
        {items.map((it) => (
          <Panel key={it.tag} pad="p-3">
            <div className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-foreground/55 mb-2 flex items-center gap-1">
              <span className={it.hero ? "text-urucum" : "text-foreground/40"}>{it.hero ? "▸" : "▹"}</span>
              <span className="truncate">{it.tag}</span>
            </div>
            <FaceTile tone={it.tone} ev={it.ev} variant={it.detail ? "detail" : "raw"} />
            <Histogram shape={it.hist} />
            {it.danger && (
              <div className="absolute top-2 right-2 w-3 h-3 flex items-center justify-center text-[8px]" style={{ color: "oklch(0.7 0.22 28)" }}>⚠</div>
            )}
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ---------- mid row: radiance map / sensor curve / segmentation / metrics ---------- */

function RadianceMap() {
  return (
    <Panel pad="p-4">
      <Label right="EV 0.0">MAPA DE RADIÂNCIA</Label>
      <div className="flex gap-3 mt-3">
        <div className="flex-1 relative aspect-[4/5]" style={{ background: "oklch(0.05 0.006 30)" }}>
          <div className="absolute inset-0" style={{
            background:
              "radial-gradient(ellipse 38% 30% at 50% 40%, oklch(0.85 0.22 95 / 0.95), oklch(0.7 0.22 55 / 0.7) 30%, oklch(0.6 0.22 28 / 0.55) 48%, oklch(0.45 0.2 260 / 0.7) 72%, oklch(0.18 0.12 260 / 0.6) 92%)",
          }} />
          {/* contour lines */}
          <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full">
            {[20, 30, 40].map((r, i) => (
              <ellipse key={i} cx="50" cy="48" rx={r * 0.45} ry={r * 0.55} fill="none" stroke="oklch(0.9 0.05 80 / 0.25)" strokeWidth="0.3" />
            ))}
          </svg>
        </div>
        <div className="flex flex-col justify-between text-[9px] font-mono text-foreground/55 py-1">
          {[32.788, 8.245, 2.058, 0.512, 0.128, 0.032, 0.008].map((v) => (
            <span key={v}>{v.toFixed(3)}</span>
          ))}
        </div>
        <div className="w-2.5" style={{
          background: "linear-gradient(180deg, oklch(0.65 0.24 30), oklch(0.78 0.22 80), oklch(0.75 0.20 130), oklch(0.55 0.18 200), oklch(0.25 0.12 260))",
        }} />
      </div>
    </Panel>
  );
}

function SensorChart() {
  return (
    <Panel pad="p-4" className="col-span-2">
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

/* ---------- applications grid ---------- */

const APPS = [
  { tag: "RECONHECIMENTO FACIAL", caption: "BAIXA ILUMINAÇÃO COMPENSADA", variant: "mesh" as const, tone: 0.18, badge: "CONFIANÇA 98.7%" },
  { tag: "DERMATOLOGIA", caption: "DETECÇÃO PRECISA EM TODOS OS TONS", variant: "detail" as const, tone: 0.4 },
  { tag: "BIOMETRIA", caption: "EXTRAÇÃO DE PADRÕES COM ALTA FIDELIDADE", variant: "mesh" as const, tone: 0.5, fingerprint: true },
  { tag: "SEGURANÇA PÚBLICA", caption: "IDENTIFICAÇÃO CONFIÁVEL EM AMBIENTES REAIS", variant: "raw" as const, tone: 0.08, night: true },
  { tag: "TELEMEDICINA", caption: "AVALIAÇÃO REMOTA COM QUALIDADE CLÍNICA", variant: "detail" as const, tone: 0.55 },
];

function AppsGrid() {
  return (
    <div>
      <div className="text-[9.5px] font-mono uppercase tracking-[0.32em] text-urucum/85 mb-3 flex items-center gap-2">
        <span>▸</span><span>APLICAÇÕES</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-px" style={{ background: "oklch(0.42 0.08 30 / 0.32)" }}>
        {APPS.map((a) => (
          <Panel key={a.tag} pad="p-3">
            <div className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-foreground/55 mb-2 flex items-center gap-1">
              <span className="text-urucum">▹</span>
              <span className="truncate">{a.tag}</span>
            </div>
            <div className="relative">
              {a.fingerprint ? (
                <div className="aspect-square relative" style={{ background: "oklch(0.05 0.006 30)" }}>
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <ellipse key={i} cx="50" cy="55" rx={6 + i * 1.6} ry={9 + i * 1.9}
                        fill="none" stroke="oklch(0.85 0.02 60 / 0.7)" strokeWidth="0.6" />
                    ))}
                  </svg>
                </div>
              ) : a.night ? (
                <div className="aspect-square relative overflow-hidden" style={{ background: "oklch(0.05 0.006 30)" }}>
                  <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse 70% 45% at 50% 80%, oklch(0.18 0.04 30), transparent 60%)",
                  }} />
                  {[30, 55, 72].map((x, i) => (
                    <div key={i} className="absolute bottom-[20%]" style={{
                      left: `${x}%`, width: 8 - i * 1.5, height: 18 - i * 3, background: "oklch(0.25 0.05 30)",
                      outline: "1px solid oklch(0.7 0.22 28 / 0.7)",
                    }} />
                  ))}
                </div>
              ) : (
                <FaceTile tone={a.tone} ev={999} variant={a.variant} />
              )}
              {a.badge && (
                <div className="absolute bottom-2 right-2 text-[8px] font-mono px-1.5 py-1" style={{
                  background: "oklch(0.08 0.01 30 / 0.92)",
                  border: "1px solid oklch(0.7 0.22 28 / 0.6)",
                  color: "oklch(0.85 0.06 60)",
                }}>
                  <div className="text-[7.5px] tracking-[0.18em] text-foreground/55">CONFIANÇA</div>
                  <div className="text-[11px] tracking-tight">98.7%</div>
                </div>
              )}
            </div>
            <div className="mt-2 text-[8.5px] font-mono uppercase tracking-[0.18em] text-foreground/55 leading-[1.5] flex items-start gap-1">
              <span className="text-urucum/70 mt-px">▸</span>
              <span>{a.caption}</span>
            </div>
          </Panel>
        ))}
      </div>
    </div>
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
        {/* ============= HEADER ROW ============= */}
        <div className="grid lg:grid-cols-[1fr_1.55fr] gap-px mb-px" style={{ background: "oklch(0.42 0.08 30 / 0.32)" }}>
          <Panel pad="p-6 lg:p-8">
            <div className="text-[9.5px] font-mono uppercase tracking-[0.32em] text-urucum/85 mb-5">
              ▸ VISÃO COMPUTACIONAL PARA O MUNDO REAL
            </div>
            <h2 className="font-serif font-light text-[34px] md:text-[44px] leading-[1.04] tracking-[-0.012em] text-foreground/95">
              Captura determina percepção.
              <br />
              <span className="italic" style={{ color: "oklch(0.7 0.22 28)" }}>Dados definem justiça.</span>
            </h2>
            <p className="mt-6 text-foreground/65 text-[14px] leading-[1.65] max-w-[42ch]">
              Desenvolvemos tecnologia de captura e processamento de imagem que preserva detalhes, contraste e informação visual em todos os tons de pele — mesmo em condições desafiadoras de iluminação e exposição.
            </p>

            <div className="grid grid-cols-4 gap-4 mt-10">
              {[
                ["HDR adaptativo", "multi-exposição"],
                ["Mapeamento de", "tons inteligente"],
                ["Redução de viés", "na aquisição"],
                ["Dados confiáveis", "para IA"],
              ].map(([a, b]) => (
                <div key={a}>
                  <div className="w-9 h-9 flex items-center justify-center mb-2.5" style={{
                    border: "1px solid oklch(0.7 0.22 28 / 0.55)",
                    background: "oklch(0.10 0.014 32 / 0.7)",
                  }}>
                    <span className="text-urucum text-[12px]">◆</span>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/75 leading-[1.4]">{a}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/45 leading-[1.4]">{b}</div>
                </div>
              ))}
            </div>
          </Panel>

          <ExposurePipeline />
        </div>

        {/* compat row */}
        <div className="flex items-center gap-5 flex-wrap py-3 px-1 text-[9px] font-mono uppercase tracking-[0.28em] text-foreground/45 border-b" style={{ borderColor: "oklch(0.42 0.08 30 / 0.25)" }}>
          <span className="text-urucum/85">▸ COMPATÍVEL COM:</span>
          {["RECONHECIMENTO FACIAL", "DERMATOLOGIA", "SEGURANÇA", "TELEMEDICINA", "BIOMETRIA"].map((c) => (
            <span key={c} className="flex items-center gap-2 text-foreground/55">
              <span className="text-foreground/30">▹</span>
              {c}
            </span>
          ))}
        </div>

        {/* ============= PROBLEM STRIP ============= */}
        <div className="mt-10">
          <ProblemStrip />
        </div>

        {/* ============= MID DASHBOARD ============= */}
        <div className="mt-10 grid lg:grid-cols-[1fr_2fr_1fr_0.6fr] gap-px" style={{ background: "oklch(0.42 0.08 30 / 0.32)" }}>
          <RadianceMap />
          <SensorChart />
          <Segmentation />
          <MetricsPanel />
        </div>

        {/* ============= APPLICATIONS ============= */}
        <div className="mt-12">
          <AppsGrid />
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

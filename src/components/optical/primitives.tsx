import { ReactNode } from "react";

/** Four L-shaped corner ticks for industrial framing */
export function CornerTicks({
  size = 12,
  color = "currentColor",
  className = "",
}: { size?: number; color?: string; className?: string }) {
  const s = size;
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ color }}
    >
      {(["tl", "tr", "bl", "br"] as const).map((p) => {
        const base = "absolute block";
        const pos =
          p === "tl"
            ? { top: 0, left: 0 }
            : p === "tr"
              ? { top: 0, right: 0 }
              : p === "bl"
                ? { bottom: 0, left: 0 }
                : { bottom: 0, right: 0 };
        return (
          <span key={p} className={base} style={{ ...pos }}>
            <span
              className="absolute"
              style={{
                background: "currentColor",
                width: s,
                height: 1,
                ...(p.includes("r") ? { right: 0 } : { left: 0 }),
                ...(p.startsWith("t") ? { top: 0 } : { bottom: 0 }),
              }}
            />
            <span
              className="absolute"
              style={{
                background: "currentColor",
                width: 1,
                height: s,
                ...(p.includes("r") ? { right: 0 } : { left: 0 }),
                ...(p.startsWith("t") ? { top: 0 } : { bottom: 0 }),
              }}
            />
          </span>
        );
      })}
    </span>
  );
}

/** Single-line monospace metadata row: LABEL · VALUE */
export function MonoMeta({
  label,
  value,
  accent = false,
}: { label: string; value: ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-baseline gap-2 font-mono text-[10px] tracking-[0.28em] uppercase leading-none">
      <span className="text-foreground/35">{label}</span>
      <span
        className={`tabular-nums ${accent ? "" : "text-foreground/75"}`}
        style={accent ? { color: "var(--signal-hot)" } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

/** ASCII-style confidence bar */
export function ConfidenceBar({
  value = 31,
  animated = false,
}: { value?: number; animated?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative h-[3px] flex-1"
        style={{ background: "var(--grid-line)" }}
      >
        <div
          className={animated ? "absolute inset-y-0 left-0 animate-conf" : "absolute inset-y-0 left-0"}
          style={{
            width: `${value}%`,
            background: "var(--signal-hot)",
            boxShadow: "0 0 12px oklch(0.68 0.24 28 / 0.5)",
          }}
        />
      </div>
      <span
        className="font-mono text-[10px] tracking-[0.2em] tabular-nums"
        style={{ color: "var(--signal-hot)" }}
      >
        {String(value).padStart(2, "0")}%
      </span>
    </div>
  );
}

/** Animated detection bounding box (SVG) */
export function BoundingBox({
  label = "DETECTING",
  state = "tracking",
  className = "",
}: {
  label?: string;
  state?: "tracking" | "lost" | "locked";
  className?: string;
}) {
  const color =
    state === "lost"
      ? "var(--signal-hot)"
      : state === "locked"
        ? "var(--signal-cold)"
        : "var(--signal-cold)";
  return (
    <div className={`pointer-events-none ${className}`} style={{ color }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* corners */}
        <g stroke="currentColor" fill="none" strokeWidth="0.6">
          <path d="M0,8 L0,0 L8,0" />
          <path d="M100,8 L100,0 L92,0" />
          <path d="M0,92 L0,100 L8,100" />
          <path d="M100,92 L100,100 L92,100" />
        </g>
        {/* re-drawing outline */}
        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          className="animate-bbox"
          pathLength="240"
        />
        {/* crosshair */}
        <g stroke="currentColor" strokeWidth="0.2" opacity="0.6">
          <line x1="50" y1="46" x2="50" y2="54" />
          <line x1="46" y1="50" x2="54" y2="50" />
        </g>
      </svg>
      <div className="absolute top-2 left-2 font-mono text-[9px] tracking-[0.32em] uppercase flex items-center gap-1.5">
        <span
          className="inline-block w-1 h-1 rounded-full animate-live"
          style={{ background: "currentColor" }}
        />
        {label}
      </div>
    </div>
  );
}

/** Generic industrial card with clipped corners + corner ticks + optional ID */
export function IncidentCard({
  id,
  status,
  children,
  className = "",
  hover = true,
}: {
  id?: string;
  status?: { label: string; tone?: "critical" | "warn" | "info" | "ok" };
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  const toneColor =
    status?.tone === "critical"
      ? "var(--signal-hot)"
      : status?.tone === "warn"
        ? "oklch(0.78 0.16 70)"
        : status?.tone === "ok"
          ? "oklch(0.72 0.14 160)"
          : "var(--signal-cold)";
  return (
    <div
      className={`relative clip-notch ${hover ? "transition-colors duration-300 hover:border-[oklch(0.78_0.10_220/0.5)]" : ""} ${className}`}
      style={{
        background: "oklch(0.10 0.012 35 / 0.6)",
        border: "1px solid var(--grid-line-strong)",
      }}
    >
      {(id || status) && (
        <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-3 border-b border-foreground/5">
          {id && (
            <span className="font-mono text-[9.5px] tracking-[0.32em] uppercase text-foreground/45">
              ID · {id}
            </span>
          )}
          {status && (
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.34em] uppercase"
              style={{ color: toneColor }}
            >
              <span
                className="inline-block w-1.5 h-1.5"
                style={{ background: "currentColor" }}
              />
              {status.label}
            </span>
          )}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

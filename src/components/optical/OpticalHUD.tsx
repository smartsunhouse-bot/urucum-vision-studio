import { useEffect, useState } from "react";

/**
 * Global optical HUD — corner crosshairs, live frame counter, UTC timestamp,
 * slow horizontal scanline. Pointer-events none; sits above all content.
 * Respects prefers-reduced-motion via CSS.
 */
export function OpticalHUD() {
  const [frame, setFrame] = useState(4821);
  const [ts, setTs] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => {
      setFrame((f) => f + 1);
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTs(
        `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`,
      );
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const tickColor = "oklch(0.96 0.005 80 / 0.18)";
  const labelColor = "oklch(0.96 0.005 80 / 0.32)";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
    >
      {/* corner crosshairs */}
      {(["tl", "tr", "bl", "br"] as const).map((c) => {
        const pos =
          c === "tl"
            ? { top: 12, left: 12 }
            : c === "tr"
              ? { top: 12, right: 12 }
              : c === "bl"
                ? { bottom: 12, left: 12 }
                : { bottom: 12, right: 12 };
        return (
          <div key={c} className="absolute" style={pos}>
            <div className="relative w-3.5 h-3.5">
              <span
                className="absolute top-0 left-0 h-px w-3.5"
                style={{ background: tickColor }}
              />
              <span
                className="absolute top-0 left-0 w-px h-3.5"
                style={{ background: tickColor }}
              />
            </div>
          </div>
        );
      })}

      {/* top mono strip — left: frame / right: UTC */}
      <div
        className="absolute top-3 left-8 font-mono text-[9px] tracking-[0.32em] uppercase tabular-nums"
        style={{ color: labelColor }}
      >
        FRAME · #{String(frame).padStart(5, "0")}
      </div>
      <div
        className="absolute top-3 right-8 font-mono text-[9px] tracking-[0.32em] uppercase tabular-nums"
        style={{ color: labelColor }}
      >
        {ts || "----.--.--T--:--:--Z"}
      </div>

      {/* bottom mono strip — system / coordinates */}
      <div
        className="absolute bottom-3 left-8 font-mono text-[9px] tracking-[0.32em] uppercase"
        style={{ color: labelColor }}
      >
        SYS · URUCUM-OPTICS-v4 · CH 01
      </div>
      <div
        className="absolute bottom-3 right-8 font-mono text-[9px] tracking-[0.32em] uppercase tabular-nums"
        style={{ color: labelColor }}
      >
        LAT −23.5505° · LON −46.6333°
      </div>

      {/* slow horizontal scanline traversing the viewport */}
      <div
        className="absolute left-0 right-0 h-px animate-hud-scan"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.96 0.005 80 / 0.22), transparent)",
        }}
      />
    </div>
  );
}

import { useEffect, useRef } from "react";

/**
 * RadiometricField — abstract scientific visualization.
 * Raw photons → clustering → sparse feature matching → calibration target →
 * refined lattice → radiometric response curve resolving the urucum seed
 * silhouette from data points alone. Seamless loop, extremely subtle motion.
 */

const N = 520; // sparse point cloud
const CYCLE = 30000; // ms — full narrative loop

type Pt = {
  rx: number; ry: number;       // raw (stage 1) position
  cx: number; cy: number;       // cluster (stage 2) position
  fx: number; fy: number;       // feature lattice (stage 3/5) position
  sx: number; sy: number;       // seed silhouette (final) position
  feature: boolean;             // is a detected keypoint
  ph: number;                   // drift phase
  amp: number;
  tw: number;                   // twinkle phase
};

// smooth 0..1 ramp
const ease = (t: number) => t * t * (3 - 2 * t);
const seg = (p: number, a: number, b: number) =>
  ease(Math.min(1, Math.max(0, (p - a) / (b - a))));

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** Urucum seed pod outline (normalized -1..1), drawn as data, never illustrated. */
function seedPoint(u: number, r: () => number): [number, number] {
  // heart-ish pod: two lobes tapering to a point, plus interior seed scatter
  const inner = r() < 0.42;
  const t = u * Math.PI * 2;
  const shape = (a: number) => {
    const k = Math.sin(a);
    const rr =
      0.72 +
      0.2 * Math.cos(2 * a) -
      0.16 * Math.cos(a) +
      0.06 * Math.sin(3 * a);
    return [rr * Math.cos(a) * 0.82, rr * k * 0.95 - 0.06];
  };
  const [bx, by] = shape(t);
  if (inner) {
    const f = 0.25 + r() * 0.62;
    return [bx * f, by * f];
  }
  const j = (r() - 0.5) * 0.035;
  return [bx + j, by + j];
}

export function RadiometricField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const r = rand(20260803);
    const pts: Pt[] = [];
    const clusters = Array.from({ length: 7 }, () => ({
      x: (r() - 0.5) * 1.5,
      y: (r() - 0.5) * 1.5,
    }));

    for (let i = 0; i < N; i++) {
      const c = clusters[Math.floor(r() * clusters.length)];
      const a = r() * Math.PI * 2;
      const rad = Math.pow(r(), 0.6) * 0.34;
      // feature lattice: soft hexagonal-ish grid with jitter
      const gx = Math.round((r() - 0.5) * 8) / 4.4;
      const gy = Math.round((r() - 0.5) * 8) / 4.4;
      const [sx, sy] = seedPoint(r(), r);
      pts.push({
        rx: (r() - 0.5) * 1.95,
        ry: (r() - 0.5) * 1.95,
        cx: c.x + Math.cos(a) * rad,
        cy: c.y + Math.sin(a) * rad,
        fx: gx + (r() - 0.5) * 0.07,
        fy: gy + (r() - 0.5) * 0.07,
        sx,
        sy,
        feature: r() < 0.12,
        ph: r() * Math.PI * 2,
        amp: 0.004 + r() * 0.008,
        tw: r() * Math.PI * 2,
      });
    }

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();

    const draw = (now: number) => {
      const tRaw = reduce ? 0.9 : ((now - start) % CYCLE) / CYCLE;
      // loop closure: last 8% morphs back to raw
      const p = tRaw;
      const S = Math.min(w, h);
      const cxp = w / 2;
      const cyp = h / 2;
      const R = S * 0.42;

      // stage weights
      const wRaw = 1 - seg(p, 0.06, 0.2);
      const wClu = seg(p, 0.08, 0.24) * (1 - seg(p, 0.3, 0.44));
      const wFeat = seg(p, 0.32, 0.46) * (1 - seg(p, 0.62, 0.76));
      const wSeed = seg(p, 0.64, 0.8) * (1 - seg(p, 0.93, 1));
      const wBack = seg(p, 0.93, 1); // return to raw

      ctx.clearRect(0, 0, w, h);

      const posOf = (q: Pt, time: number) => {
        const total = wRaw + wClu + wFeat + wSeed + wBack || 1;
        const x =
          (q.rx * (wRaw + wBack) + q.cx * wClu + q.fx * wFeat + q.sx * wSeed) /
          total;
        const y =
          (q.ry * (wRaw + wBack) + q.cy * wClu + q.fy * wFeat + q.sy * wSeed) /
          total;
        const dx = Math.sin(time * 0.0004 + q.ph) * q.amp;
        const dy = Math.cos(time * 0.00033 + q.ph * 1.3) * q.amp;
        return [cxp + (x + dx) * R, cyp + (y + dy) * R] as const;
      };

      const time = reduce ? 0 : now;
      const coords = pts.map((q) => posOf(q, time));

      // ——— vector field lines (very faint, stage 1–2)
      const vf = (1 - seg(p, 0.22, 0.36)) * 0.5;
      if (vf > 0.01) {
        ctx.strokeStyle = `oklch(0.62 0.10 45 / ${0.05 * vf})`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 26; i++) {
          const yy = cyp - R + (i / 25) * 2 * R;
          ctx.beginPath();
          for (let x = -R; x <= R; x += R / 14) {
            const yo =
              Math.sin(x / (R * 0.42) + i * 0.5 + time * 0.00018) * R * 0.035;
            ctx.lineTo(cxp + x, yy + yo);
          }
          ctx.stroke();
        }
      }

      // ——— mathematical grid (stage 3–5)
      const gridA = seg(p, 0.3, 0.44) * (1 - seg(p, 0.86, 0.98)) * 0.06;
      if (gridA > 0.004) {
        ctx.strokeStyle = `oklch(0.72 0.09 50 / ${gridA})`;
        ctx.lineWidth = 0.5;
        for (let i = -4; i <= 4; i++) {
          const o = (i / 4) * R * 0.9;
          ctx.beginPath();
          ctx.moveTo(cxp + o, cyp - R * 0.9);
          ctx.lineTo(cxp + o, cyp + R * 0.9);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cxp - R * 0.9, cyp + o);
          ctx.lineTo(cxp + R * 0.9, cyp + o);
          ctx.stroke();
        }
      }

      // ——— calibration target: concentric radar circles (stage 4)
      const cal = seg(p, 0.48, 0.6) * (1 - seg(p, 0.74, 0.86));
      if (cal > 0.01) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0009);
        for (let i = 1; i <= 4; i++) {
          const rr = R * (0.22 * i);
          ctx.beginPath();
          ctx.arc(cxp, cyp, rr, 0, Math.PI * 2);
          ctx.strokeStyle = `oklch(0.74 0.12 52 / ${
            cal * (0.14 - i * 0.02) * (0.7 + 0.3 * pulse)
          })`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
        // expanding radiometric wave
        const wv = ((time % 6000) / 6000);
        ctx.beginPath();
        ctx.arc(cxp, cyp, R * (0.1 + wv * 0.95), 0, Math.PI * 2);
        ctx.strokeStyle = `oklch(0.80 0.14 55 / ${cal * 0.14 * (1 - wv)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        // crosshair ticks
        ctx.strokeStyle = `oklch(0.74 0.12 52 / ${cal * 0.12})`;
        ctx.beginPath();
        ctx.moveTo(cxp - R * 0.95, cyp);
        ctx.lineTo(cxp + R * 0.95, cyp);
        ctx.moveTo(cxp, cyp - R * 0.95);
        ctx.lineTo(cxp, cyp + R * 0.95);
        ctx.stroke();
      }

      // ——— sparse feature matching / triangulation edges
      const linkA =
        seg(p, 0.34, 0.48) * (1 - seg(p, 0.9, 1)) * (0.5 + 0.5 * wSeed);
      if (linkA > 0.01) {
        const maxD = R * (0.2 + 0.06 * Math.sin(time * 0.0003));
        ctx.lineWidth = 0.45;
        for (let i = 0; i < pts.length; i += 1) {
          if (!pts[i].feature) continue;
          const [ax, ay] = coords[i];
          for (let j = i + 1; j < pts.length; j += 2) {
            const [bx, by] = coords[j];
            const d = Math.hypot(ax - bx, ay - by);
            if (d > maxD) continue;
            const a = (1 - d / maxD) * 0.2 * linkA;
            ctx.strokeStyle = `oklch(0.70 0.13 45 / ${a})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // ——— particles
      for (let i = 0; i < pts.length; i++) {
        const q = pts[i];
        const [x, y] = coords[i];
        const tw = 0.6 + 0.4 * Math.sin(time * 0.0012 + q.tw);
        const size = q.feature ? 1.5 : 0.85;
        const alpha = (q.feature ? 0.7 : 0.34) * tw;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = q.feature
          ? `oklch(0.82 0.15 55 / ${alpha})`
          : `oklch(0.72 0.10 45 / ${alpha})`;
        ctx.fill();
        // keypoint marker squares once features are detected
        if (q.feature && wFeat + wSeed > 0.3) {
          ctx.strokeStyle = `oklch(0.84 0.15 55 / ${0.22 * (wFeat + wSeed)})`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x - 3.5, y - 3.5, 7, 7);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`w-full h-full ${className}`}
    />
  );
}

// Thin horizontal strip with a palette of black/brown skin tones.
// Used at the very top and bottom of the page as a visual signature.
export function SkinToneStrip() {
  // Curated palette from deep ebony to warm caramel — references real
  // tonal range of black skin (Fitzpatrick V–VI variations).
  const tones = [
    "oklch(0.18 0.020 35)",
    "oklch(0.24 0.030 38)",
    "oklch(0.30 0.040 40)",
    "oklch(0.36 0.050 42)",
    "oklch(0.42 0.060 44)",
    "oklch(0.48 0.070 46)",
    "oklch(0.54 0.075 48)",
    "oklch(0.60 0.080 50)",
    "oklch(0.66 0.080 52)",
    "oklch(0.72 0.075 55)",
  ];
  return (
    <div
      aria-hidden
      className="w-full h-[6px] flex"
      role="presentation"
    >
      {tones.map((c, i) => (
        <div key={i} className="flex-1 h-full" style={{ background: c }} />
      ))}
    </div>
  );
}

const endpoints = [
  ["POST", "/v1/datasets", "Criar dataset com distribuição programável"],
  ["POST", "/v1/generate", "Gerar amostras com controle de exposição"],
  ["GET", "/v1/manifests/:id", "Obter metadados estruturados"],
  ["POST", "/v1/audit", "Auditoria de viés sobre pipeline"],
];

const params = [
  ["skin_tone", "string | distribution", "Tom de pele dominante ou distribuição (ex. fitzpatrick_v_vi)"],
  ["lighting", "enum", "low_light · balanced · clinical · soft_shadow"],
  ["exposure_ev", "float", "Compensação de exposição em stops (−2.0 a +2.0)"],
  ["context", "string", "Cenário semântico (ex. clinical, identity, retail)"],
  ["seed", "int", "Determinismo para reprodução"],
];

export function Docs() {
  return (
    <section id="documentacao" className="relative py-32 lg:py-44 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal max-w-2xl mb-16">
          <div className="flex items-center gap-3 text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55 mb-5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.62 0.24 26)",
                boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)",
              }}
            />
            <span>Documentação</span>
          </div>
          <h2 className="font-serif font-light text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] text-foreground/95">
            API mínima. Saída{" "}
            <span className="italic" style={{ color: "oklch(0.66 0.24 28)" }}>
              determinística.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-5">
              Endpoints
            </div>
            <div className="border-t border-border/60">
              {endpoints.map(([m, p, d]) => (
                <div key={p} className="grid grid-cols-[64px_1fr] gap-4 py-5 border-b border-border/60 items-baseline">
                  <span className="font-mono text-[11px] tracking-wider text-urucum/80">{m}</span>
                  <div>
                    <div className="font-mono text-[14px] text-foreground/90">{p}</div>
                    <div className="text-[13px] text-muted-foreground mt-1">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-5">
              Parâmetros
            </div>
            <div className="border-t border-border/60">
              {params.map(([k, t, d]) => (
                <div key={k} className="py-5 border-b border-border/60">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[14px] text-foreground/90">{k}</span>
                    <span className="font-mono text-[11px] text-urucum/70">{t}</span>
                  </div>
                  <div className="text-[13px] text-muted-foreground mt-1.5">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-16 rounded-sm border border-border bg-[oklch(0.11_0.014_36)] p-6 font-mono text-[13px] leading-[1.7] overflow-x-auto">
          <div className="text-[10.5px] tracking-[0.3em] uppercase text-urucum/80 mb-3">▸ manifest.json</div>
{`{
  "id": "ds_8af20e",
  "subjects": 4096,
  "distribution": { "fitzpatrick_v_vi": 0.62, "i_iv": 0.38 },
  "exposure": { "ev_mean": -0.8, "ev_sigma": 0.21 },
  "lighting": ["low_light", "clinical"],
  "checksum": "sha256:9c1f…e30b"
}`}
        </div>
      </div>
    </section>
  );
}

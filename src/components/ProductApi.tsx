import { useState } from "react";

const APPS = [
  "Experimentar o fluxo visual no MVP",
  "Integrar o processamento a um sistema que já recebe imagens",
  "Enviar métricas estruturadas para um fluxo de revisão",
  "Conectar clientes compatíveis com MCP às ferramentas disponíveis",
];

const REST_CODE = `curl -X POST "http://localhost:8080/api/processar" \\
  -H "Authorization: Bearer SUA_CHAVE" \\
  -F "file=@pele.jpg" \\
  -F "strict=true"`;

const MCP_CODE = `{
  "mcpServers": {
    "urucum": {
      "url": "http://localhost:8080/mcp/",
      "headers": {
        "Authorization": "Bearer SUA_CHAVE"
      }
    }
  }
}`;

const RESPONSE_CODE = `{
  "status_captura": "adequada",
  "ita_original": -3.3,
  "ita_recuperado": -3.3,
  "metricas_captura": { ... },
  "imagem_processada_base64": "..."
}`;

export function ProductApi() {
  const [tab, setTab] = useState<"rest" | "mcp">("rest");
  const code = tab === "rest" ? REST_CODE : MCP_CODE;

  return (
    <section id="api" className="relative border-t py-28 lg:py-44" style={{ background: "radial-gradient(1200px 600px at 15% 0%, oklch(0.13 0.03 30 / 0.6), transparent 62%), oklch(0.055 0.008 32)", borderColor: "oklch(0.42 0.08 30 / 0.32)" }} aria-labelledby="api-title">
      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <div className="lg:col-span-5 min-w-0 reveal">
            <div className="flex items-center gap-3 text-[10.5px] font-mono tracking-[0.42em] uppercase text-foreground/55"><span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.62 0.24 26)", boxShadow: "0 0 12px oklch(0.62 0.24 26 / 0.9)" }} /><span>Integração</span></div>
            <h2 id="api-title" className="mt-7 font-serif font-light text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.04] tracking-[-0.02em] text-foreground/95 max-w-[16ch]">A Urucum entra no fluxo que você já usa.</h2>
            <p className="mt-6 max-w-[46ch] text-[15px] sm:text-[16px] leading-[1.7] font-light" style={{ color: "var(--muted-foreground)" }}>A API processa imagens estáticas de pele, estima o ITA em CIELAB, avalia a qualidade da captura e pode aplicar correção fotométrica adaptativa na região detectada.</p>
            <p className="mt-4 max-w-[46ch] text-[13px] leading-[1.7] font-light text-foreground/55">O algoritmo atual é determinístico. Não usa modelo treinado, não diagnostica, não identifica lesões e não recomenda tratamento.</p>
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.24em]" style={{ border: "1px solid oklch(0.42 0.08 30 / 0.45)", color: "oklch(0.78 0.06 60)", background: "oklch(0.09 0.012 32 / 0.7)" }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.7 0.22 28)" }} />POST /api/processar</div>
          </div>

          <div className="lg:col-span-7 min-w-0 reveal flex flex-col md:flex-row gap-10 md:gap-0">
            <div className="w-full md:w-[240px] md:shrink-0 md:pr-8">
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/45 pb-3 mb-3 border-b" style={{ borderColor: "oklch(0.42 0.08 30 / 0.3)" }}>Onde se aplica</div>
              <ul className="space-y-5">{APPS.map((item, i) => <li key={item} className="flex items-start gap-3"><span className="mt-1 w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: "oklch(0.7 0.22 28)" }} /><span className="text-[12px] leading-[1.45] text-foreground/70">{item}</span></li>)}</ul>
            </div>

            <div className="min-w-0 flex-1 md:pl-8 md:border-l md:border-border/25">
              <div className="flex gap-6 border-b" style={{ borderColor: "oklch(0.42 0.08 30 / 0.28)" }} role="tablist" aria-label="Método de integração">
                {(["rest", "mcp"] as const).map((item) => <button key={item} role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className="pb-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors" style={{ color: tab === item ? "oklch(0.72 0.16 34)" : "oklch(0.5 0.02 40)", borderBottom: tab === item ? "1px solid oklch(0.72 0.16 34)" : "1px solid transparent" }}>{item === "rest" ? "API REST" : "MCP"}</button>)}
              </div>
              <div className="flex items-center justify-between pt-4"><span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/50">{tab === "rest" ? "processar.sh" : "mcp-config.json"}</span><span className="font-mono text-[9px] tracking-[0.22em] uppercase" style={{ color: "oklch(0.72 0.16 34)" }}>{tab === "rest" ? "cURL" : "Streamable HTTP"}</span></div>
              <pre className="mt-4 overflow-x-auto rounded-sm border p-4 font-mono text-[11px] sm:text-[12px] leading-[1.85] text-foreground/80" style={{ borderColor: "oklch(0.42 0.08 30 / 0.28)", background: "oklch(0.035 0.006 32 / 0.7)" }}><code>{code}</code></pre>
              <p className="mt-4 text-[11px] leading-[1.6] text-foreground/50">{tab === "rest" ? "POST /api/processar recebe multipart/form-data no campo file. strict é opcional e tem padrão true. A captura pode retornar adequada, atencao ou inadequada; com strict=true, uma captura inadequada pode resultar em HTTP 422." : "O MCP disponibiliza ferramentas para clientes compatíveis com Model Context Protocol no caminho /mcp/. Ele não é um modelo de IA e não altera o algoritmo de processamento."}</p>
              {tab === "rest" && <><div className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45">Resposta estruturada</div><pre className="mt-3 overflow-x-auto font-mono text-[10px] leading-[1.7] text-foreground/65"><code>{RESPONSE_CODE}</code></pre></>}
              {tab === "mcp" && <div className="mt-6 grid sm:grid-cols-2 gap-3 font-mono text-[10px] text-foreground/60"><span className="border p-3" style={{ borderColor: "oklch(0.42 0.08 30 / 0.28)" }}>process_skin_image</span><span className="border p-3" style={{ borderColor: "oklch(0.42 0.08 30 / 0.28)" }}>compare_image_algorithms</span></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

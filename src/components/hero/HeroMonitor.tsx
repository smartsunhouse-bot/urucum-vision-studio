import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { demoJson, demoScenes } from "./demo-data";
import styles from "./HeroMonitor.module.css";

const DURATION = 2800;

export function HeroMonitor() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [split, setSplit] = useState(52);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const root = useRef<HTMLElement>(null);
  const reduced = useRef(false);
  const current = demoScenes[scene];

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || reduced.current) return;
    const id = window.setInterval(() => setScene((value) => (value + 1) % demoScenes.length), DURATION);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const box = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - box.top) / box.height - .5) * -6, y: ((event.clientX - box.left) / box.width - .5) * 6 });
  }

  return <figure ref={root} className={styles.monitor} style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }} onPointerMove={move} onPointerLeave={() => setTilt({ x: 0, y: 0 })} aria-label="Demonstração interativa do processamento Urucum">
    <div className={styles.frame} onPointerEnter={() => setPlaying(false)} onPointerLeave={() => setPlaying(true)}>
      <div className={styles.screen}>
        <div className={styles.topbar}><span className={styles.brand}>urucum<b>·</b>ia</span><span>demonstração ilustrativa</span></div>
        <div className={styles.content}>
          <div><p className={styles.sceneTitle}>{current.label}</p><p className={styles.caption} aria-live="polite">{current.caption}</p>
            {current.metrics && <div className={styles.metrics}>{current.metrics.map((item) => <div className={styles.metric} key={item.label}><span className={styles.metricLabel}>{item.label}</span><span className={styles.metricValue}>{item.value}</span></div>)}</div>}
            {scene === 4 && <span className={styles.ready}>IMAGE READY</span>}
          </div>
          <div className={styles.visual} aria-label="Imagem sendo preparada">
            <img className={styles.photo} src={current.image} alt="Imagem de pele em processamento" style={{ clipPath: scene === 3 ? `inset(0 ${100 - split}% 0 0)` : undefined }} />
            {scene === 3 && <><img className={styles.photo} src="/images/story/back-urucum.png" alt="Imagem corrigida pela Urucum" style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${split}%)` }} /><input className={styles.slider} type="range" min="0" max="100" value={split} onChange={(event) => setSplit(Number(event.target.value))} aria-label="Comparar imagem original e corrigida" /></>}
            {scene === 2 && <img className={styles.mask} src="/images/story/back-mask.png" alt="Máscara translúcida da região de pele" />}
            {scene === 1 && <span className={styles.scan} aria-hidden="true" />}
            {scene === 4 && <pre className={styles.json}>{demoJson.join("\n")}</pre>}
          </div>
        </div>
      </div>
    </div>
    <div className={styles.chin} aria-hidden="true" /><div className={styles.stand} aria-hidden="true" />
    <div className={styles.steps} role="tablist" aria-label="Etapas da demonstração">{demoScenes.map((item, index) => <button key={item.label} className={styles.step} aria-label={`Ir para ${item.label}`} aria-current={index === scene ? "step" : undefined} onClick={() => { setScene(index); setPlaying(false); }} />)}</div>
    <div className={styles.stepLabel}><span>{current.shortLabel}</span><button className={styles.play} onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pausar demonstração" : "Reproduzir demonstração"}>{playing ? "PAUSAR" : "REPRODUZIR"}</button><span>{scene + 1}/5</span></div>
    <figcaption className={styles.badge}>Passe o cursor para pausar · arraste a divisão na correção</figcaption>
  </figure>;
}

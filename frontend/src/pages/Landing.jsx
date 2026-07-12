import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { LETTERS } from "@/lib/letterPaths";
import { useTransitionNav } from "@/components/PageTransition";

const ORBIT_SIZE = "min(86vw, 620px)";
const ELLIPSE_TILTS = [0, 60, 120];
const ELLIPSE_DIRS = [1, -1, 1];
const ELLIPSE_SPEEDS = [0.00042, 0.00036, 0.00048];

// The landing experience: preloader collision → only the FUNDAZ atom, full frame.
export default function Landing() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("fz_preloaded"));
  const { go } = useTransitionNav();
  const systemRef = useRef(null);
  const nodeRefs = useRef([]);
  const thetaRef = useRef(0);
  const lastRef = useRef(0);
  const hoverRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useAnimationFrame((t) => {
    const delta = lastRef.current ? t - lastRef.current : 16;
    lastRef.current = t;
    if (!hoverRef.current) thetaRef.current += delta;
    const el = systemRef.current;
    if (!el) return;
    const size = el.offsetWidth;
    const a = size * 0.4;
    const b = size * 0.165;
    LETTERS.forEach((_, i) => {
      const node = nodeRefs.current[i];
      if (!node) return;
      const ring = Math.floor(i / 2);
      const tilt = (ELLIPSE_TILTS[ring] * Math.PI) / 180;
      const phase = (i % 2) * Math.PI + ring * 0.9;
      const th = thetaRef.current * ELLIPSE_SPEEDS[ring] * ELLIPSE_DIRS[ring] + phase;
      const lx = a * Math.cos(th);
      const ly = b * Math.sin(th);
      const x = lx * Math.cos(tilt) - ly * Math.sin(tilt);
      const y = lx * Math.sin(tilt) + ly * Math.cos(tilt);
      const depth = Math.sin(th);
      const scale = 0.82 + 0.18 * ((depth + 1) / 2);
      node.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      node.style.zIndex = depth >= 0 ? 12 : 3;
      node.style.opacity = String(0.75 + 0.25 * ((depth + 1) / 2));
    });
  });

  return (
    <div className="relative h-screen overflow-hidden" data-testid="landing-page">
      {loading && (
        <Preloader
          onComplete={() => {
            sessionStorage.setItem("fz_preloaded", "1");
            setLoading(false);
          }}
        />
      )}

      <Navbar minimal />

      <section className="relative flex h-full flex-col items-center justify-center px-5" data-testid="hero-section">
        <div className="pointer-events-none absolute inset-0 bg-gradient-section" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[76vmin] w-[76vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, hsl(212 16% 20% / 0.55), transparent 65%)" }} />

        <motion.div
          ref={systemRef}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: loading ? 0 : 1, scale: loading ? 0.82 : 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="orbit-system relative"
          style={{ "--orbit-size": ORBIT_SIZE, width: ORBIT_SIZE, height: "calc(min(86vw, 620px) * 0.82)" }}
          onMouseEnter={() => { hoverRef.current = true; }}
          onMouseLeave={() => { hoverRef.current = false; }}
          data-testid="hero-orbit-system"
        >
          <div className="atom-ellipse" style={{ transform: "rotate(0deg)" }} />
          <div className="atom-ellipse" style={{ transform: "rotate(60deg)" }} />
          <div className="atom-ellipse" style={{ transform: "rotate(120deg)" }} />

          <div className="absolute left-1/2 top-1/2 z-[6] -translate-x-1/2 -translate-y-1/2">
            <div className="nucleus-pi flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/60 bg-secondary/80 backdrop-blur-md sm:h-24 sm:w-24">
              <span className="font-serif text-4xl italic text-gradient-silver sm:text-5xl" style={{ WebkitTextFillColor: "transparent" }}>π</span>
            </div>
          </div>

          {LETTERS.map((l, i) => (
            <div
              key={l.char}
              ref={(r) => { nodeRefs.current[i] = r; }}
              className="absolute left-1/2 top-1/2"
              style={{ marginLeft: "-26px", marginTop: "-26px", willChange: "transform" }}
            >
              <button
                className="orbit-node group relative"
                onClick={() => go(l.id)}
                aria-label={`${l.char} — ${l.word}`}
                data-testid={`hero-orbit-letter-${l.char.toLowerCase()}`}
              >
                {l.char}
                <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap font-mono-tech text-[9px] uppercase tracking-[0.25em] text-primary opacity-0 group-hover:opacity-100" style={{ transition: "opacity 0.25s ease" }}>
                  {l.word}
                </span>
              </button>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? 24 : 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-8 flex flex-col items-center text-center"
        >
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.45em] text-muted-foreground sm:text-xs">
            A Domain of Aaruush · SRMIST
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-[0.2em] sm:text-4xl">
            <span className="text-gradient-silver">FUNDAZ</span>
          </h1>
          <motion.p
            className="mt-4 font-mono-tech text-[10px] uppercase tracking-[0.35em] text-primary/60"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            data-testid="hero-hint"
          >
            Pick a letter to enter its world
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}

import { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LETTERS, scrollToSection } from "@/lib/letterPaths";

const ORBIT_SIZE = "min(82vw, 560px)";
// two letters per electron ellipse, opposite phases — F/D, U/A, N/Z
const ELLIPSE_TILTS = [0, 60, 120]; // deg, matches the drawn atom ellipses
const ELLIPSE_DIRS = [1, -1, 1];
const ELLIPSE_SPEEDS = [0.00042, 0.00036, 0.00048];

export const AtomHero = () => {
  const systemRef = useRef(null);
  const nodeRefs = useRef([]);
  const thetaRef = useRef(0);
  const lastRef = useRef(0);
  const hoverRef = useRef(false);

  useAnimationFrame((t) => {
    const delta = lastRef.current ? t - lastRef.current : 16;
    lastRef.current = t;
    if (!hoverRef.current) thetaRef.current += delta;

    const el = systemRef.current;
    if (!el) return;
    const size = el.offsetWidth;
    const a = size * 0.4; // semi-major axis
    const b = size * 0.165; // semi-minor axis

    LETTERS.forEach((_, i) => {
      const node = nodeRefs.current[i];
      if (!node) return;
      const ring = Math.floor(i / 2); // 0,1,2 — which ellipse
      const tilt = (ELLIPSE_TILTS[ring] * Math.PI) / 180;
      const phase = (i % 2) * Math.PI + ring * 0.9;
      const th = thetaRef.current * ELLIPSE_SPEEDS[ring] * ELLIPSE_DIRS[ring] + phase;
      // parametric point on the tilted ellipse
      const lx = a * Math.cos(th);
      const ly = b * Math.sin(th);
      const x = lx * Math.cos(tilt) - ly * Math.sin(tilt);
      const y = lx * Math.sin(tilt) + ly * Math.cos(tilt);
      // pseudo-3D: front of the orbit is bigger & above the nucleus
      const depth = Math.sin(th); // -1 back .. +1 front
      const scale = 0.82 + 0.18 * ((depth + 1) / 2);
      node.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      node.style.zIndex = depth >= 0 ? 12 : 3;
      node.style.opacity = String(0.75 + 0.25 * ((depth + 1) / 2));
    });
  });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28"
      data-testid="hero-section"
    >
      {/* nebula glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-section" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, hsl(212 16% 20% / 0.55), transparent 65%)" }} />

      {/* Interactive atom logo — the letters ride the electron orbits */}
      <motion.div
        ref={systemRef}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="orbit-system relative"
        style={{ "--orbit-size": ORBIT_SIZE, width: ORBIT_SIZE, height: "calc(min(82vw, 560px) * 0.88)" }}
        onMouseEnter={() => { hoverRef.current = true; }}
        onMouseLeave={() => { hoverRef.current = false; }}
        data-testid="hero-orbit-system"
      >
        {/* atom electron ellipses */}
        <div className="atom-ellipse" style={{ transform: "rotate(0deg)" }} />
        <div className="atom-ellipse" style={{ transform: "rotate(60deg)" }} />
        <div className="atom-ellipse" style={{ transform: "rotate(120deg)" }} />

        {/* π nucleus */}
        <div className="absolute left-1/2 top-1/2 z-[6] -translate-x-1/2 -translate-y-1/2">
          <div className="nucleus-pi flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/60 bg-secondary/80 backdrop-blur-md sm:h-24 sm:w-24">
            <span className="font-serif text-4xl italic text-gradient-silver sm:text-5xl" style={{ WebkitTextFillColor: "transparent" }}>π</span>
          </div>
        </div>

        {/* letters as electrons on the ellipses */}
        {LETTERS.map((l, i) => (
          <div
            key={l.char}
            ref={(r) => { nodeRefs.current[i] = r; }}
            className="absolute left-1/2 top-1/2"
            style={{ marginLeft: "-26px", marginTop: "-26px", willChange: "transform" }}
          >
            <button
              className="orbit-node group relative"
              onClick={() => scrollToSection(l.id)}
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

      {/* wordmark + copy */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-10 flex max-w-2xl flex-col items-center text-center"
      >
        <p className="font-mono-tech text-[10px] uppercase tracking-[0.45em] text-muted-foreground sm:text-xs">
          A Domain of Aaruush · SRMIST
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-[0.18em] sm:text-5xl lg:text-6xl">
          <span className="text-gradient-silver">FUNDAZ</span>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Mathematics, science and logic — weaponised into play. Six letters orbit one
          nucleus, and each one is a world of its own. Pick a letter, or just fall in.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="silver" size="xl" onClick={() => scrollToSection("flagship")} data-testid="hero-cta-explore">
            Enter the Orbit
          </Button>
          <Button variant="outlineSilver" size="xl" onClick={() => scrollToSection("now")} data-testid="hero-cta-register">
            Register for Events
          </Button>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollToSection("flagship")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
        data-testid="hero-scroll-cue"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
};

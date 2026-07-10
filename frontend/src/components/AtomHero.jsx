import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LETTERS, scrollToSection } from "@/lib/letterPaths";

const ORBIT_SIZE = "min(78vw, 520px)";

export const AtomHero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28"
      data-testid="hero-section"
    >
      {/* nebula glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-section" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, hsl(212 16% 20% / 0.55), transparent 65%)" }} />

      {/* Interactive atom logo — letters orbit the nucleus and are the navbar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="orbit-system relative"
        style={{ "--orbit-size": ORBIT_SIZE, width: ORBIT_SIZE, height: ORBIT_SIZE }}
        data-testid="hero-orbit-system"
      >
        {/* dashed letter orbit */}
        <div className="absolute inset-0 rounded-full border border-dashed border-primary/15" />

        {/* atom ellipses */}
        <div className="atom-ellipse" style={{ transform: "rotate(0deg)" }} />
        <div className="atom-ellipse" style={{ transform: "rotate(60deg)" }} />
        <div className="atom-ellipse" style={{ transform: "rotate(120deg)" }} />

        {/* electrons on inner ellipse ring */}
        <div className="orbit-rotator absolute inset-0" style={{ animationDuration: "14s" }}>
          <span className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-accent shadow-glow" style={{ transform: "translateY(calc(var(--orbit-size) * -0.31))", marginLeft: "-4px", marginTop: "-4px" }} />
        </div>
        <div className="orbit-rotator absolute inset-0" style={{ animationDuration: "22s", animationDirection: "reverse" }}>
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-primary/80" style={{ transform: "rotate(140deg) translateY(calc(var(--orbit-size) * -0.31))", marginLeft: "-3px", marginTop: "-3px" }} />
        </div>

        {/* π nucleus */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="nucleus-pi flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/60 bg-secondary/80 backdrop-blur-md sm:h-28 sm:w-28">
            <span className="font-serif text-5xl italic text-gradient-silver sm:text-6xl" style={{ WebkitTextFillColor: "transparent" }}>π</span>
          </div>
        </div>

        {/* orbiting clickable letters */}
        <div className="orbit-rotator absolute inset-0">
          {LETTERS.map((l, i) => (
            <div
              key={l.char}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `rotate(${i * 60}deg) translateY(calc(var(--orbit-size) / -2))`, marginLeft: "-28px", marginTop: "-28px" }}
            >
              <div style={{ transform: `rotate(${-i * 60}deg)` }}>
                <div className="orbit-counter">
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
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* wordmark + copy */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-12 flex max-w-2xl flex-col items-center text-center"
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

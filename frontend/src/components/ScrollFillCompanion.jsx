import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LETTERS, LETTER_PATHS } from "@/lib/letterPaths";
import { useTransitionNav } from "@/components/PageTransition";

/*
  The travelling page letter. As you approach the end of a page it starts
  charging; keep scrolling at the very bottom and it fills with rising
  "starlight plasma" (silver wave + glow — on-theme, not literal water).
  At 100% it launches the transition to the next letter's page.
  Scrolling back up drains the charge. Clicking it also jumps ahead.

  v2 — smooth RAF-based interpolation (no jittery setInterval)
*/

export const ScrollFillCompanion = ({ letterIdx }) => {
  const { go, transitioning } = useTransitionNav();
  const letter = LETTERS[letterIdx];
  const next = letterIdx >= LETTERS.length - 1 ? null : LETTERS[letterIdx + 1];
  const [fill, setFill] = useState(0);

  // Refs for animation state (never trigger re-renders directly)
  const targetFillRef = useRef(0);
  const displayFillRef = useRef(0);
  const firedRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    firedRef.current = false;
    targetFillRef.current = 0;
    displayFillRef.current = 0;
    setFill(0);

    const doc = document.documentElement;
    const atBottom = () => window.innerHeight + window.scrollY >= doc.scrollHeight - 24;
    const approach = () => {
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      const remaining = max - window.scrollY;
      const zone = window.innerHeight * 0.7;
      return Math.max(0, Math.min(1, 1 - remaining / zone)) * 30;
    };

    const onWheel = (e) => {
      if (firedRef.current) return;
      if (atBottom() && e.deltaY > 0) {
        targetFillRef.current += Math.min(13, Math.abs(e.deltaY) * 0.06);
      } else if (e.deltaY < 0) {
        targetFillRef.current -= 9;
      }
      targetFillRef.current = Math.max(0, Math.min(100, targetFillRef.current));
    };

    const onScroll = () => {
      if (firedRef.current) return;
      const base = approach();
      if (targetFillRef.current < base) targetFillRef.current = base;
    };

    let lastY = null;
    const onTouchStart = (e) => { lastY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (firedRef.current || lastY == null) return;
      const dy = lastY - e.touches[0].clientY;
      lastY = e.touches[0].clientY;
      if (atBottom() && dy > 0) {
        targetFillRef.current = Math.min(100, targetFillRef.current + dy * 0.4);
      }
    };

    // RAF loop — smooth lerp between displayFill and targetFill
    let lastTime = 0;
    const LERP_SPEED = 0.12; // interpolation factor per frame
    const DECAY_RATE = 0.4; // decay per second when idle

    const loop = (now) => {
      const dt = lastTime ? (now - lastTime) / 1000 : 0.016;
      lastTime = now;

      if (!firedRef.current) {
        // Natural decay toward approach baseline
        const base = approach();
        if (targetFillRef.current > base && !atBottom()) {
          targetFillRef.current = Math.max(base, targetFillRef.current - DECAY_RATE * dt * 60);
        }
        targetFillRef.current = Math.max(0, Math.min(100, targetFillRef.current));
      }

      // Smooth lerp
      const diff = targetFillRef.current - displayFillRef.current;
      if (Math.abs(diff) > 0.1) {
        displayFillRef.current += diff * LERP_SPEED;
      } else {
        displayFillRef.current = targetFillRef.current;
      }

      // Only update React state once per frame
      const rounded = Math.round(displayFillRef.current * 10) / 10;
      setFill(rounded);

      // Fire transition at 100%
      if (rounded >= 100 && !firedRef.current) {
        firedRef.current = true;
        setTimeout(() => go(next ? next.id : "home"), 320);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [letterIdx, go, next]);

  if (!letter) return null;
  const waveY = 126 - (fill / 100) * 138;
  const charged = fill > 2;

  return (
    <motion.div
      className="fixed right-4 top-[30%] z-30 sm:right-8"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: transitioning ? 0 : 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-testid="scroll-fill-companion"
    >
      <motion.button
        onClick={() => !firedRef.current && go(next ? next.id : "home")}
        className="flex flex-col items-center outline-none"
        animate={{ y: [0, -14, 0], rotate: charged ? 0 : [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-label={next ? `Continue to ${next.word}` : "Return to the orbit"}
        data-testid="companion-next-button"
      >
        <svg
          viewBox="-6 -6 92 132"
          className="companion-letter w-[54px] sm:w-[88px] lg:w-[110px]"
          style={{ filter: `drop-shadow(0 0 ${14 + fill * 0.5}px hsl(210 25% 80% / ${0.2 + fill * 0.006}))` }}
          data-testid="companion-fill-svg"
        >
          <defs>
            <clipPath id={`glyph-clip-${letter.char}`}>
              <path d={LETTER_PATHS[letter.char]} />
            </clipPath>
            <linearGradient id={`starlight-${letter.char}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="hsl(210 30% 94%)" />
              <stop offset="1" stopColor="hsl(212 14% 52%)" />
            </linearGradient>
          </defs>
          <g clipPath={`url(#glyph-clip-${letter.char})`}>
            <g style={{
              transform: `translateY(${waveY}px)`,
              transition: "transform 0.15s ease-out",
              willChange: "transform",
            }}>
              <path
                className="fill-wave"
                d="M-46 5 Q -38 -3 -30 5 T -14 5 T 2 5 T 18 5 T 34 5 T 50 5 T 66 5 T 82 5 T 98 5 T 114 5 T 130 5 V 160 H -46 Z"
                fill={`url(#starlight-${letter.char})`}
                opacity="0.92"
              />
            </g>
          </g>
          <path d={LETTER_PATHS[letter.char]} style={{ fill: "hsl(var(--primary) / 0.05)" }} />
        </svg>

        <span className="mt-3 hidden whitespace-nowrap font-mono-tech text-[9px] uppercase tracking-[0.3em] text-primary/60 sm:block" data-testid="companion-fill-label">
          {fill >= 100
            ? "Launching…"
            : charged
              ? `${Math.round(fill)}% · ${next ? next.word : "Orbit"}`
              : letter.word}
        </span>
      </motion.button>
    </motion.div>
  );
};

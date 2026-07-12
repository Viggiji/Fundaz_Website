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
*/

export const ScrollFillCompanion = ({ letterIdx }) => {
  const { go, transitioning } = useTransitionNav();
  const letter = LETTERS[letterIdx];
  const next = letterIdx >= LETTERS.length - 1 ? null : LETTERS[letterIdx + 1];
  const [fill, setFill] = useState(0);
  const fillRef = useRef(0);
  const firedRef = useRef(false);

  useEffect(() => {
    firedRef.current = false;
    fillRef.current = 0;
    setFill(0);

    const doc = document.documentElement;
    const atBottom = () => window.innerHeight + window.scrollY >= doc.scrollHeight - 24;
    const approach = () => {
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      const remaining = max - window.scrollY;
      const zone = window.innerHeight * 0.7;
      return Math.max(0, Math.min(1, 1 - remaining / zone)) * 30; // approach charge up to 30%
    };
    const commit = () => {
      const f = Math.max(0, Math.min(100, fillRef.current));
      fillRef.current = f;
      setFill(f);
      if (f >= 100 && !firedRef.current) {
        firedRef.current = true;
        setTimeout(() => go(next ? next.id : "home"), 320);
      }
    };
    const onWheel = (e) => {
      if (firedRef.current) return;
      if (atBottom() && e.deltaY > 0) fillRef.current += Math.min(13, Math.abs(e.deltaY) * 0.06);
      else if (e.deltaY < 0) fillRef.current -= 9;
      commit();
    };
    const onScroll = () => {
      if (firedRef.current) return;
      const base = approach();
      if (fillRef.current < base) fillRef.current = base;
      commit();
    };
    let lastY = null;
    const onTouchStart = (e) => { lastY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (firedRef.current || lastY == null) return;
      const dy = lastY - e.touches[0].clientY;
      lastY = e.touches[0].clientY;
      if (atBottom() && dy > 0) { fillRef.current += dy * 0.4; commit(); }
    };
    const decay = setInterval(() => {
      if (firedRef.current) return;
      const base = approach();
      if (fillRef.current > base) { fillRef.current = Math.max(base, fillRef.current - 1.6); commit(); }
    }, 90);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      clearInterval(decay);
    };
  }, [letterIdx, go, next]);

  if (!letter) return null;
  const waveY = 126 - (fill / 100) * 138; // slides the plasma level up through the glyph
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
            <g style={{ transform: `translateY(${waveY}px)`, transition: "transform 0.3s ease-out" }}>
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

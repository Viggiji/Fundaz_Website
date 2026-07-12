import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LETTERS, LETTER_PATHS } from "@/lib/letterPaths";

/*
  Cinematic page transitions:
  1. "cover"  — the target letter zooms in from huge, filling the screen, then
                settles centered on a pitch black overlay.
  2. "hold"   — the letter wiggles / charges (orbiting electron ring) while the
                route silently swaps underneath.
  3. "reveal" — the letter zooms out past the viewport as the overlay dissolves
                into the new page's content.
  Target "home" shows the π nucleus instead of a letter.
*/

const TransitionContext = createContext({ go: () => {} });
export const useTransitionNav = () => useContext(TransitionContext);

const COVER_MS = 620;
const HOLD_MS = 1050;
const REVEAL_MS = 800;

export const TransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState(null); // { idx: -1 for home | 0..5, phase }
  const busyRef = useRef(false);

  const go = useCallback(
    (id) => {
      if (busyRef.current) return;
      const idx = id === "home" ? -1 : LETTERS.findIndex((l) => l.id === id);
      busyRef.current = true;
      setState({ idx, phase: "cover" });
    },
    []
  );

  useEffect(() => {
    if (!state) return undefined;
    let t;
    if (state.phase === "cover") {
      t = setTimeout(() => {
        navigate(state.idx < 0 ? "/" : `/${LETTERS[state.idx].id}`);
        window.scrollTo({ top: 0, behavior: "instant" });
        setState((s) => ({ ...s, phase: "hold" }));
      }, COVER_MS);
    } else if (state.phase === "hold") {
      t = setTimeout(() => setState((s) => ({ ...s, phase: "reveal" })), HOLD_MS);
    } else if (state.phase === "reveal") {
      t = setTimeout(() => {
        setState(null);
        busyRef.current = false;
      }, REVEAL_MS);
    }
    return () => clearTimeout(t);
  }, [state, navigate]);

  const letter = state && state.idx >= 0 ? LETTERS[state.idx] : null;
  const phase = state?.phase;

  return (
    <TransitionContext.Provider value={{ go, transitioning: !!state }}>
      {children}

      {state && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "reveal" ? 0 : 1 }}
          transition={{ duration: phase === "reveal" ? 0.75 : 0.3, ease: "easeOut" }}
          data-testid="page-transition-overlay"
        >
          {/* charging ring around the letter during hold */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute rounded-full border border-dashed border-primary/30"
              style={{ width: 220, height: 220 }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: phase === "hold" ? 1 : 0,
                scale: phase === "hold" ? 1 : 0.6,
                rotate: 360,
              }}
              transition={{ rotate: { duration: 5, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 }, scale: { duration: 0.4 } }}
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-primary shadow-glow" />
            </motion.div>

            <motion.div
              key={`${state.idx}-letter`}
              initial={{ scale: 9, opacity: 0 }}
              animate={
                phase === "cover"
                  ? { scale: 1, opacity: 1, rotate: 0, y: 0 }
                  : phase === "hold"
                    ? { scale: [1, 1.07, 1], opacity: 1, rotate: [-6, 6, -6], y: [0, -8, 0] }
                    : { scale: 18, opacity: 0 }
              }
              transition={
                phase === "cover"
                  ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                  : phase === "hold"
                    ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.78, ease: [0.55, 0, 0.68, 0.2] }
              }
              data-testid="transition-letter"
            >
              {letter ? (
                <svg viewBox="-6 -6 92 132" className="companion-letter w-[110px]">
                  <path d={LETTER_PATHS[letter.char]} style={{ fill: "hsl(var(--primary) / 0.16)" }} />
                </svg>
              ) : (
                <span className="font-serif text-8xl italic text-gradient-silver" style={{ WebkitTextFillColor: "transparent" }}>π</span>
              )}
            </motion.div>
          </div>

          <motion.p
            className="mt-12 font-mono-tech text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
            animate={{ opacity: phase === "reveal" ? 0 : [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: phase === "reveal" ? 0 : Infinity }}
            data-testid="transition-label"
          >
            {letter ? `Entering · ${letter.word}` : "Returning to the orbit"}
          </motion.p>
        </motion.div>
      )}
    </TransitionContext.Provider>
  );
};

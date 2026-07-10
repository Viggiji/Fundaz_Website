import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { interpolate } from "flubber";
import { LETTERS, LETTER_PATHS } from "@/lib/letterPaths";

// The MetaMask-fox-style travelling companion: a giant ghost letter that floats
// beside each section and MORPHS (true shape interpolation via flubber) into the
// next letter when you cross a section boundary.

const SIDES = ["right", "left", "right", "left", "right", "left"]; // per section index

export const LetterCompanion = ({ activeIndex }) => {
  const visible = activeIndex >= 0;
  const [displayIdx, setDisplayIdx] = useState(0);
  const [d, setD] = useState(LETTER_PATHS[LETTERS[0].char]);
  const prevPathRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (activeIndex < 0) return;
    setDisplayIdx(activeIndex);
    const target = LETTER_PATHS[LETTERS[activeIndex].char];
    const from = prevPathRef.current;
    prevPathRef.current = target;

    if (!from || from === target) {
      setD(target);
      return;
    }
    if (controlsRef.current) controlsRef.current.stop();
    const interpolator = interpolate(from, target, { maxSegmentLength: 3 });
    controlsRef.current = animate(0, 1, {
      duration: 0.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (t) => setD(interpolator(t)),
    });
    return () => controlsRef.current && controlsRef.current.stop();
  }, [activeIndex]);

  const side = SIDES[displayIdx] || "right";
  const letter = LETTERS[displayIdx];

  return (
    <motion.div
      className="pointer-events-none fixed top-[24%] z-20"
      initial={false}
      animate={{
        left: side === "left" ? "4%" : "auto",
        right: side === "right" ? "5%" : "auto",
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.4,
      }}
      transition={{ type: "spring", stiffness: 55, damping: 15 }}
      data-testid="letter-companion"
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <svg
          viewBox="-6 -6 92 132"
          className="companion-letter w-[64px] sm:w-[100px] lg:w-[150px]"
          data-testid="companion-svg"
        >
          <path d={d} />
        </svg>
        <motion.span
          key={letter?.word}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-3 hidden font-mono-tech text-[10px] uppercase tracking-[0.35em] text-primary/60 sm:block"
          data-testid="companion-label"
        >
          {letter?.word}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const SectionShell = ({ id, index, letter, word, title, intro, children, className }) => {
  return (
    <section
      id={id}
      data-letter-index={index}
      className={cn("relative overflow-hidden px-5 py-24 sm:px-8 md:py-36", className)}
      data-testid={`section-${id}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-section" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-3xl md:mb-20"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-secondary/60 font-display text-2xl font-bold text-primary shadow-glow">
              {letter}
            </span>
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-muted-foreground sm:text-xs">
              {letter} · {word}
            </span>
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">{intro}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
};

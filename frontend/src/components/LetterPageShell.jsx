import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NextBand } from "@/components/NextBand";
import { ScrollFillCompanion } from "@/components/ScrollFillCompanion";
import { LETTERS } from "@/lib/letterPaths";

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
};

export const LetterPageShell = ({ idx, title, intro, heroImage, children }) => {
  const l = LETTERS[idx];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen"
      data-testid={`page-${l.id}`}
    >
      <Navbar />
      <ScrollFillCompanion letterIdx={idx} />

      <header className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44">
        {heroImage && (
          <>
            <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.16] grayscale" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
          </>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-section" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-secondary/60 font-display text-2xl font-bold text-primary shadow-glow">
                {l.char}
              </span>
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-muted-foreground sm:text-xs">
                {l.char} · {l.word}
              </span>
              <span className="ml-auto font-mono-tech text-[10px] tracking-[0.3em] text-muted-foreground/60">
                0{idx + 1} / 06
              </span>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">{intro}</p>
            )}
          </motion.div>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <NextBand idx={idx} />
      <Footer />
    </motion.div>
  );
};

export const PageSection = ({ children, className = "", ...rest }) => (
  <section className={`relative mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20 ${className}`} {...rest}>
    {children}
  </section>
);

export const SectionKicker = ({ children }) => (
  <p className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-accent">{children}</p>
);

export const MarqueeStats = ({ stats }) => (
  <div className="overflow-hidden border-y border-border bg-card/30 py-6" data-testid="marquee-stats">
    <div className="marquee-track flex w-max items-baseline gap-14">
      {[...stats, ...stats].map((s, i) => (
        <span key={i} className="flex items-baseline gap-3 whitespace-nowrap">
          <span className="font-display text-3xl font-bold text-gradient-silver md:text-4xl">{s.value}</span>
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</span>
          <span className="ml-8 text-primary/25">◆</span>
        </span>
      ))}
    </div>
  </div>
);

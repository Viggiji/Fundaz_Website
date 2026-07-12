import { motion } from "framer-motion";
import InfiniteMenu from "@/components/InfiniteMenu";
import { LetterPageShell, PageSection, SectionKicker, MarqueeStats, fadeUp } from "@/components/LetterPageShell";
import { UNEARTHED, UNEARTHED_ERAS, IMAGES } from "@/data/content";

const organiserItems = UNEARTHED.organisers.map((o) => ({
  image: o.photo,
  link: "#", // placeholder — profiles coming later
  title: o.name,
  description: `${o.role} · ${o.years}`,
}));

export default function UnearthedPage() {
  return (
    <LetterPageShell
      idx={1}
      heroImage={IMAGES.crowd}
      title={<span>Where it all <span className="text-gradient-silver">began.</span></span>}
      intro={UNEARTHED.intro}
    >
      {/* Story + eras timeline */}
      <PageSection data-testid="unearthed-story">
        <div className="grid gap-12 border-t border-border pt-12 lg:grid-cols-2">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <SectionKicker>The Story</SectionKicker>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-gradient-silver md:text-lg">
              {UNEARTHED.body}
            </p>
            <div className="relative mt-10 overflow-hidden rounded-xl shadow-elegant">
              <img src={IMAGES.crowd} alt="FUNDAZ crowd" className="h-[240px] w-full object-cover opacity-85 grayscale" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-primary/80">Aaruush main stage · archive</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
            <SectionKicker>Eras of the Domain</SectionKicker>
            <div className="relative mt-8 border-l border-border pl-8">
              {UNEARTHED_ERAS.map((e, i) => (
                <motion.div key={e.year} {...fadeUp} transition={{ duration: 0.55, delay: i * 0.08 }} className="relative pb-9 last:pb-0" data-testid={`unearthed-era-${e.year}`}>
                  <span className="absolute -left-[37px] top-1 h-3 w-3 rounded-full border border-primary/60 bg-background shadow-glow" />
                  <p className="font-display text-xl font-bold text-gradient-silver">{e.year}</p>
                  <h3 className="mt-1 font-semibold text-foreground">{e.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageSection>

      <MarqueeStats stats={UNEARTHED.stats} />

      {/* Torchbearers — InfiniteMenu WebGL sphere */}
      <PageSection className="max-w-none px-0 sm:px-0" data-testid="unearthed-organisers">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionKicker>The Torchbearers</SectionKicker>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">The organisers who carried the orbit</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Drag the sphere — every face is a chapter of FUNDAZ. Release and it locks onto whoever is facing you.
          </p>
        </div>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="relative mt-10 h-[62vh] min-h-[420px] w-full overflow-hidden border-y border-border bg-background"
        >
          <InfiniteMenu items={organiserItems} />
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono-tech text-[9px] uppercase tracking-[0.35em] text-muted-foreground/70">
            drag to spin · release to focus
          </p>
        </motion.div>

        {/* accessible index of the same people */}
        <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
          <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {UNEARTHED.organisers.map((o, i) => (
              <div key={o.name} className="flex items-baseline justify-between gap-3 border-t border-border py-3" data-testid={`organiser-row-${i}`}>
                <span className="font-display font-semibold text-foreground">{o.name}</span>
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{o.role} · {o.years}</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </LetterPageShell>
  );
}

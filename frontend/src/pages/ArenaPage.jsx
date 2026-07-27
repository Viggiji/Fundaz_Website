import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LetterPageShell, PageSection, SectionKicker, MarqueeStats, fadeUp } from "@/components/LetterPageShell";
import { ARENA, ARENA_STATS, IMAGES } from "@/data/content";

export default function ArenaPage() {
  return (
    <LetterPageShell
      idx={4}
      heroImage={IMAGES.mysteryRoom}
      title={<span>The activities that <span className="text-gradient-silver">define us.</span></span>}
      intro={ARENA.intro}
    >
      <MarqueeStats stats={ARENA_STATS} />

      {ARENA.activities.map((act, idx) => (
        <PageSection key={act.id} className="max-w-none px-0 sm:px-0" data-testid={`arena-activity-${act.id}`}>
          {/* full-bleed banner */}
          <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="group relative h-[46vh] min-h-[320px] w-full overflow-hidden">
            <img
              src={IMAGES[act.image]}
              alt={act.name}
              className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale group-hover:scale-105 group-hover:grayscale-0"
              style={{ transition: "transform 1s cubic-bezier(0.22,1,0.36,1), filter 1s ease" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
            <div className="absolute bottom-8 left-1/2 w-full max-w-6xl -translate-x-1/2 px-5 sm:px-8">
              <Badge variant="outline" className="border-primary/50 bg-background/60 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                {act.tag}
              </Badge>
              <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-6xl">{act.name}</h2>
            </div>
          </motion.div>

          {/* editorial split */}
          <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-14 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="lg:sticky lg:top-28 lg:self-start">
              <SectionKicker>Core Activity 0{idx + 1}</SectionKicker>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">{act.description}</p>
              <Button variant="ghostSilver" size="sm" className="mt-6 h-8 px-2 font-mono-tech text-[10px] uppercase tracking-[0.2em]" asChild data-testid={`arena-site-link-${act.id}`}>
                <a href={act.site} title="Event microsite — link coming soon">
                  {act.name} site <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </motion.div>

            <div>
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.05 }}>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-accent">How it works</p>
                <ul className="mt-5">
                  {act.how.map((h, i) => (
                    <li key={h} className="flex items-start gap-4 border-t border-border py-4 text-sm text-muted-foreground last:border-b">
                      <span className="font-display font-bold text-primary/40">0{i + 1}</span>
                      <span className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="mt-10">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-accent">Through the years</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Across previous editions, this activity evolved with new twists and themes, continuously adapting to deliver the ultimate participant experience.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {act.years.map((y) => (
                    <div key={y.year} className="flex items-baseline gap-4 text-sm">
                      <span className="font-display text-lg font-bold text-gradient-silver">{y.year}</span>
                      <span className="text-muted-foreground">{y.theme}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </PageSection>
      ))}
    </LetterPageShell>
  );
}

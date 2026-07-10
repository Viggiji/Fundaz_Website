import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionShell } from "@/components/SectionShell";
import { ARENA, IMAGES } from "@/data/content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export const Arena = () => (
  <SectionShell
    id="arena"
    index={4}
    letter="A"
    word="Arena"
    title={<span>The activities that <span className="text-gradient-silver">define us.</span></span>}
    intro={ARENA.intro}
  >
    <div className="flex flex-col gap-16">
      {ARENA.activities.map((act, idx) => (
        <motion.div key={act.id} {...fadeUp} transition={{ duration: 0.75 }}>
          <div className={`grid items-stretch gap-8 lg:grid-cols-2 ${idx % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
            <div className="relative [direction:ltr]">
              <div className="group relative h-full min-h-[280px] overflow-hidden rounded-xl border border-border shadow-elegant">
                <img
                  src={IMAGES[act.image]}
                  alt={act.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale group-hover:scale-105 group-hover:grayscale-0"
                  style={{ transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.7s ease" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <Badge variant="outline" className="border-primary/50 bg-background/60 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                    {act.tag}
                  </Badge>
                  <h3 className="mt-3 font-display text-3xl font-bold text-foreground">{act.name}</h3>
                </div>
              </div>
            </div>

            <Card className="border-border bg-card [direction:ltr]" data-testid={`arena-card-${act.id}`}>
              <CardContent className="flex h-full flex-col p-7 md:p-9">
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{act.description}</p>
                <Separator className="my-6 bg-border" />
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-accent">How it works</p>
                <ul className="mt-4 space-y-2.5">
                  {act.how.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-accent">Through the years</p>
                  <div className="mt-3 flex flex-col gap-2">
                    {act.years.map((y) => (
                      <div key={y.year} className="flex items-baseline gap-3 text-sm">
                        <span className="font-display font-bold text-gradient-silver">{y.year}</span>
                        <span className="text-muted-foreground">{y.theme}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionShell>
);

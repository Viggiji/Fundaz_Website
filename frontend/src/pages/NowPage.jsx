import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LetterPageShell, PageSection, SectionKicker, fadeUp } from "@/components/LetterPageShell";
import { RegisterDialog } from "@/components/RegisterDialog";
import { NOW_EVENTS, NOW_GLANCE } from "@/data/content";

const typeStyles = {
  Flagship: "border-primary/60 text-primary",
  Activity: "border-accent/60 text-accent",
  "Domain Event": "border-muted-foreground/50 text-muted-foreground",
};

export default function NowPage() {
  const [selected, setSelected] = useState(null);

  return (
    <LetterPageShell
      idx={2}
      title={<span>Everything happening <span className="text-gradient-silver">this year.</span></span>}
      intro="This is mission control. Every register path across FUNDAZ lands here — flagship and activities route to the official Aaruush portal, while the three domain events take registrations right on this page."
    >
      {/* Days at a glance */}
      <PageSection data-testid="now-glance">
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {NOW_GLANCE.map((d, i) => (
            <motion.div key={d.day} {...fadeUp} transition={{ duration: 0.55, delay: i * 0.08 }} className="bg-card/70 p-6 backdrop-blur" data-testid={`now-day-${i}`}>
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-accent">{d.day} · {d.date}</p>
              <p className="mt-3 font-display text-lg font-semibold text-foreground">{d.headline}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{d.note}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Editorial event index */}
      <PageSection data-testid="now-events">
        <SectionKicker>The 2025 Lineup</SectionKicker>
        <div className="mt-8">
          {NOW_EVENTS.map((ev, i) => (
            <motion.div
              key={ev.id}
              {...fadeUp}
              transition={{ duration: 0.55, delay: (i % 3) * 0.07 }}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4 border-t border-border py-8 last:border-b hover:bg-secondary/30 sm:gap-x-10 lg:grid-cols-[80px_1fr_auto]"
              style={{ transition: "background-color 0.3s ease" }}
              data-testid={`now-event-row-${ev.id}`}
            >
              <span className="font-display text-3xl font-bold text-primary/25 group-hover:text-primary/60 sm:text-4xl" style={{ transition: "color 0.3s ease" }}>
                0{i + 1}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:translate-x-1 sm:text-2xl" style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                    {ev.name}
                  </h3>
                  <Badge variant="outline" className={`font-mono-tech text-[9px] uppercase tracking-[0.2em] ${typeStyles[ev.type]}`}>
                    {ev.type}
                  </Badge>
                </div>
                <p className="mt-1.5 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{ev.date}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{ev.blurb}</p>
                {ev.description && (
                  <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground/80">{ev.description}</p>
                )}
              </div>
              <div className="col-span-2 lg:col-span-1">
                {ev.action === "register" ? (
                  <Button variant="silver" onClick={() => setSelected(ev)} data-testid={`register-open-${ev.id}`}>
                    Register Here <ArrowUpRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="outlineSilver" asChild data-testid={`external-link-${ev.id}`}>
                    <a href={ev.url} target="_blank" rel="noopener noreferrer">
                      Official Registration <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <RegisterDialog event={selected} open={!!selected} onOpenChange={(o) => !o && setSelected(null)} />
    </LetterPageShell>
  );
}

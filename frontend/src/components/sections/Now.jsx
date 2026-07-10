import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "@/components/SectionShell";
import { RegisterDialog } from "@/components/RegisterDialog";
import { NOW_EVENTS } from "@/data/content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const typeStyles = {
  Flagship: "border-primary/60 text-primary",
  Activity: "border-accent/60 text-accent",
  "Domain Event": "border-muted-foreground/50 text-muted-foreground",
};

export const Now = () => {
  const [selected, setSelected] = useState(null);

  return (
    <SectionShell
      id="now"
      index={2}
      letter="N"
      word="Now"
      title={<span>Everything happening <span className="text-gradient-silver">this year.</span></span>}
      intro="This is mission control. Every register button across FUNDAZ lands here — flagship and activities route to the official Aaruush portal, while the three domain events take registrations right on this page."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {NOW_EVENTS.map((ev, i) => (
          <motion.div key={ev.id} {...fadeUp} transition={{ duration: 0.55, delay: (i % 3) * 0.1 }} className="flex">
            <Card
              className="group flex flex-1 flex-col border-border bg-card hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow"
              style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
              data-testid={`now-event-card-${ev.id}`}
            >
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline" className={`font-mono-tech text-[9px] uppercase tracking-[0.2em] ${typeStyles[ev.type]}`}>
                    {ev.type}
                  </Badge>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />{ev.date}
                  </span>
                </div>
                <h4 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">{ev.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ev.blurb}</p>
                <div className="mt-auto pt-6">
                  {ev.action === "register" ? (
                    <Button
                      variant="silver"
                      className="w-full"
                      onClick={() => setSelected(ev)}
                      data-testid={`register-open-${ev.id}`}
                    >
                      Register Here
                    </Button>
                  ) : (
                    <Button variant="outlineSilver" className="w-full" asChild data-testid={`external-link-${ev.id}`}>
                      <a href={ev.url} target="_blank" rel="noopener noreferrer">
                        Official Registration <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <RegisterDialog event={selected} open={!!selected} onOpenChange={(o) => !o && setSelected(null)} />
    </SectionShell>
  );
};

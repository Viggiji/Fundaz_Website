import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionShell } from "@/components/SectionShell";
import { DOMAIN_EVENTS, IMAGES } from "@/data/content";
import { scrollToSection } from "@/lib/letterPaths";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export const DomainEvents = () => (
  <SectionShell
    id="domain"
    index={3}
    letter="D"
    word="Domain"
    title={<span>Three events. Three days. <span className="text-gradient-silver">Three rounds each.</span></span>}
    intro={DOMAIN_EVENTS.intro}
  >
    <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
      <Tabs defaultValue={DOMAIN_EVENTS.current[0].id} className="w-full">
        <TabsList className="grid h-auto w-full max-w-2xl grid-cols-3 border border-border bg-secondary/60">
          {DOMAIN_EVENTS.current.map((ev) => (
            <TabsTrigger
              key={ev.id}
              value={ev.id}
              className="whitespace-normal px-2 py-2 font-mono-tech text-[10px] uppercase tracking-[0.12em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-xs"
              data-testid={`domain-tab-${ev.id}`}
            >
              {ev.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {DOMAIN_EVENTS.current.map((ev) => (
          <TabsContent key={ev.id} value={ev.id} className="mt-6">
            <Card className="overflow-hidden border-border bg-card shadow-elegant" data-testid={`domain-event-panel-${ev.id}`}>
              {/* header strip */}
              <div className="relative min-h-[190px]">
                <img src={IMAGES[ev.image]} alt={ev.name} className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="relative flex flex-col gap-3 p-7 md:p-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="bg-gradient-silver font-mono-tech text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
                      2025 Edition
                    </Badge>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />{ev.dates} · one round per day
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">{ev.name}</h3>
                  <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{ev.description}</p>
                </div>
              </div>

              {/* the three day-rounds */}
              <CardContent className="p-7 pt-2 md:p-9 md:pt-3">
                <div className="grid gap-4 md:grid-cols-3">
                  {ev.rounds.map((r, i) => (
                    <div
                      key={r.day}
                      className="group flex flex-col rounded-lg border border-border bg-secondary/40 p-5 hover:border-primary/45 hover:shadow-glow"
                      style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
                      data-testid={`domain-round-${ev.id}-${i}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-accent">{r.day}</span>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <h4 className="mt-3 font-display text-base font-semibold leading-snug text-foreground">{r.name}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7">
                  <Button variant="silver" onClick={() => scrollToSection("now")} data-testid={`domain-goto-register-${ev.id}`}>
                    Register in the N section <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>

    {/* Past events */}
    <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="mt-20 max-w-3xl">
      <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">Retired into Legend</h3>
      <p className="mt-2 text-sm text-muted-foreground">Past domain events — each lived exactly one edition.</p>
      <Accordion type="single" collapsible className="mt-6">
        {DOMAIN_EVENTS.past.map((y) => (
          <AccordionItem key={y.year} value={y.year} className="border-border">
            <AccordionTrigger className="font-display text-base text-foreground hover:text-primary hover:no-underline" data-testid={`domain-past-${y.year}`}>
              <span><span className="text-gradient-silver font-bold">{y.year}</span><span className="ml-3 font-normal text-muted-foreground">· 3 events</span></span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-1">
                {y.events.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {e}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  </SectionShell>
);

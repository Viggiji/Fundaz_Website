import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
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
    title={<span>Three events. <span className="text-gradient-silver">One edition only.</span></span>}
    intro={DOMAIN_EVENTS.intro}
  >
    <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
      <Tabs defaultValue="Day 1" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 border border-border bg-secondary/60">
          {DOMAIN_EVENTS.current.map((ev) => (
            <TabsTrigger
              key={ev.day}
              value={ev.day}
              className="font-mono-tech text-xs uppercase tracking-[0.15em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid={`domain-tab-${ev.day.replace(" ", "-").toLowerCase()}`}
            >
              {ev.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {DOMAIN_EVENTS.current.map((ev) => (
          <TabsContent key={ev.id} value={ev.day} className="mt-6">
            <Card className="overflow-hidden border-border bg-card shadow-elegant" data-testid={`domain-event-panel-${ev.id}`}>
              <div className="grid lg:grid-cols-5">
                <div className="relative min-h-[220px] lg:col-span-2">
                  <img src={IMAGES[ev.image]} alt={ev.name} className="absolute inset-0 h-full w-full object-cover opacity-75 grayscale" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent lg:bg-gradient-to-r" />
                  <Badge className="absolute left-4 top-4 bg-gradient-silver font-mono-tech text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
                    {ev.day} · {ev.date}
                  </Badge>
                </div>
                <CardContent className="flex flex-col gap-5 p-7 lg:col-span-3 lg:p-9">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">{ev.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{ev.description}</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {ev.schedule.map((s) => (
                      <div key={s.time} className="flex items-center gap-3 rounded-md border border-border bg-secondary/40 px-4 py-3">
                        <Clock className="h-4 w-4 shrink-0 text-accent" />
                        <div>
                          <p className="font-mono-tech text-xs text-accent">{s.time}</p>
                          <p className="text-sm text-foreground">{s.item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Button variant="silver" onClick={() => scrollToSection("now")} data-testid={`domain-goto-register-${ev.id}`}>
                      Register in the N section <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
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

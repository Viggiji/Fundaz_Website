import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LetterPageShell, PageSection, SectionKicker, fadeUp } from "@/components/LetterPageShell";
import { DOMAIN_EVENTS, IMAGES } from "@/data/content";
import { useTransitionNav } from "@/components/PageTransition";

export default function DomainPage() {
  const { go } = useTransitionNav();

  return (
    <LetterPageShell
      idx={3}
      heroImage={IMAGES.skeletonKey}
      title={<span>Three events. Three days. <span className="text-gradient-silver">Three rounds each.</span></span>}
      intro={DOMAIN_EVENTS.intro}
    >
      <PageSection data-testid="domain-current">
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
              <TabsContent key={ev.id} value={ev.id} className="mt-10" data-testid={`domain-event-panel-${ev.id}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-gradient-silver font-mono-tech text-[10px] uppercase tracking-[0.2em] text-primary-foreground">2025 Edition</Badge>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />{ev.dates} · one round per day
                  </span>
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold text-foreground">{ev.name}</h2>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{ev.description}</p>

                {/* horizontal round timeline */}
                <div className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
                  <span className="absolute left-4 top-0 h-full w-px bg-border md:left-0 md:top-4 md:h-px md:w-full" />
                  {ev.rounds.map((r, i) => (
                    <motion.div key={r.day} {...fadeUp} transition={{ duration: 0.55, delay: i * 0.1 }} className="relative pl-14 md:pl-0 md:pt-12" data-testid={`domain-round-${ev.id}-${i}`}>
                      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-background font-mono-tech text-xs text-primary shadow-glow md:top-0">
                        0{i + 1}
                      </span>
                      <p className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-accent">{r.day} · {r.date}</p>
                      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-foreground">{r.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
                    </motion.div>
                  ))}
                </div>

                <Button variant="silver" className="mt-12" onClick={() => go("now")} data-testid={`domain-goto-register-${ev.id}`}>
                  Register in the N section <ArrowRight className="h-4 w-4" />
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </PageSection>

      <PageSection data-testid="domain-past">
        <SectionKicker>Retired into Legend</SectionKicker>
        <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">Past domain events</h2>
        <p className="mt-2 text-sm text-muted-foreground">Each lived exactly one edition, then vanished forever.</p>
        <Accordion type="single" collapsible className="mt-8 max-w-3xl">
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
      </PageSection>
    </LetterPageShell>
  );
}

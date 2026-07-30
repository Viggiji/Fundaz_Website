import { useState, useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LetterPageShell, PageSection, SectionKicker, fadeUp } from "@/components/LetterPageShell";
import { DOMAIN_EVENTS, IMAGES } from "@/data/content";
import { useTransitionNav } from "@/components/PageTransition";

/*
  PixelCycleViewer — 3-state pixel transition image viewer.
  State 0 (default): shows photo 1 (current round)
  State 1 (hovered): pixel-transitions to photo 2 (next round)
  State 2 (clicked while hovered): pixel-transitions to photo 3 (round after next)
  Mouse leave from state 1 or 2: pixel-transitions back to photo 1
*/

const GRID_SIZE = 12;
const STEP_DURATION = 0.4;
const PIXEL_COLOR = 'hsl(220, 12%, 5%)';

const PixelCycleViewer = ({ rounds, activeRound }) => {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const delayedCallRef = useRef(null);
  const stateRef = useRef(0);          // tracks current state without re-renders
  const [displayState, setDisplayState] = useState(0); // drives badge/dots UI

  const img0 = rounds[activeRound % rounds.length];
  const img1 = rounds[(activeRound + 1) % rounds.length];
  const img2 = rounds[(activeRound + 2) % rounds.length];
  const images = [img0, img1, img2];

  // Build the pixel grid on mount
  useEffect(() => {
    const grid = pixelGridRef.current;
    if (!grid) return;
    grid.innerHTML = '';
    const s = 100 / GRID_SIZE;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const px = document.createElement('div');
        px.className = 'pvcycle-pixel';
        px.style.cssText = `position:absolute;background:${PIXEL_COLOR};width:${s}%;height:${s}%;left:${col * s}%;top:${row * s}%;display:none;`;
        grid.appendChild(px);
      }
    }
  }, []);

  // Core transition: animate pixels, then swap the visible layer
  const runTransition = useCallback((toState) => {
    if (stateRef.current === toState) return;

    const grid = pixelGridRef.current;
    const container = containerRef.current;
    if (!grid || !container) return;

    const pixels = grid.querySelectorAll('.pvcycle-pixel');
    if (!pixels.length) return;

    // Kill any in-progress animation
    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) delayedCallRef.current.kill();

    gsap.set(pixels, { display: 'none' });
    const stagger = STEP_DURATION / pixels.length;

    // Phase 1: pixels appear in random order
    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: { each: stagger, from: 'random' }
    });

    // Halfway through: swap the visible image layer
    delayedCallRef.current = gsap.delayedCall(STEP_DURATION, () => {
      stateRef.current = toState;
      setDisplayState(toState);
      const layers = container.querySelectorAll('.pvcycle-layer');
      layers.forEach((layer, i) => {
        layer.style.display = i === toState ? 'block' : 'none';
      });
    });

    // Phase 2: pixels disappear in random order
    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: STEP_DURATION,
      stagger: { each: stagger, from: 'random' }
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Only transition if currently at default state
    if (stateRef.current === 0) runTransition(1);
  }, [runTransition]);

  const handleMouseLeave = useCallback(() => {
    // Always reset to default on leave, regardless of state
    if (stateRef.current !== 0) runTransition(0);
  }, [runTransition]);

  const handleClick = useCallback(() => {
    // Only advance to state 2 when currently in state 1 (hovering)
    if (stateRef.current === 1) runTransition(2);
  }, [runTransition]);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    if (stateRef.current === 0) runTransition(1);
    else if (stateRef.current === 1) runTransition(2);
    else runTransition(0);
  }, [runTransition]);

  if (!img0?.image) return null;

  return (
    <div className="relative mb-10 h-[240px] overflow-hidden rounded-xl md:h-[320px]">
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      >
        {/* 3 image layers — only the active one is visible */}
        {images.map((r, i) => (
          <img
            key={i}
            className="pvcycle-layer"
            src={r.image}
            alt={r.name}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              display: i === 0 ? 'block' : 'none',
            }}
            draggable={false}
          />
        ))}

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* Pixel grid (sits on top of images, under badge overlay) */}
        <div
          ref={pixelGridRef}
          style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}
        />

        {/* Badge + progress dots */}
        <div style={{
          position: 'absolute', bottom: 16, left: 20, right: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          pointerEvents: 'none', zIndex: 4,
        }}>
          <Badge className="bg-background/60 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
            {images[displayState].day} · {images[displayState].date}
          </Badge>
          <div style={{ display: 'flex', gap: 6 }}>
            {images.map((_, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  height: 6,
                  borderRadius: 9999,
                  width: displayState === i ? 24 : 6,
                  background: displayState === i
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--primary) / 0.3)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DomainPage() {
  const { go } = useTransitionNav();
  const [activeRounds, setActiveRounds] = useState(
    Object.fromEntries(DOMAIN_EVENTS.current.map((ev) => [ev.id, 0]))
  );

  const setActiveRound = (eventId, roundIdx) => {
    setActiveRounds((prev) => ({ ...prev, [eventId]: roundIdx }));
  };

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

                {/* 3-state pixel-transition image viewer */}
                <div className="mt-10">
                  <PixelCycleViewer
                    key={`${ev.id}-${activeRounds[ev.id] || 0}`}
                    rounds={ev.rounds}
                    activeRound={activeRounds[ev.id] || 0}
                  />
                </div>

                {/* horizontal round timeline */}
                <div className="relative mt-2 grid gap-10 md:grid-cols-3 md:gap-6">
                  <span className="absolute left-4 top-0 h-full w-px bg-border md:left-0 md:top-4 md:h-px md:w-full" />
                  {ev.rounds.map((r, i) => (
                    <motion.div
                      key={r.day}
                      {...fadeUp}
                      transition={{ duration: 0.55, delay: i * 0.1 }}
                      className={`relative cursor-pointer pl-14 md:pl-0 md:pt-12 ${activeRounds[ev.id] === i ? "" : "opacity-60 hover:opacity-80"}`}
                      style={{ transition: "opacity 0.3s ease" }}
                      onClick={() => setActiveRound(ev.id, i)}
                      data-testid={`domain-round-${ev.id}-${i}`}
                    >
                      <span
                        className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border bg-background font-mono-tech text-xs shadow-glow md:top-0"
                        style={{
                          borderColor: activeRounds[ev.id] === i
                            ? "hsl(var(--primary))"
                            : "hsl(var(--primary) / 0.4)",
                          color: activeRounds[ev.id] === i
                            ? "hsl(var(--primary))"
                            : "inherit",
                          transition: "border-color 0.3s ease, color 0.3s ease",
                        }}
                      >
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
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Our previous editions featured ambitious domain-specific challenges that pushed boundaries. Each lived exactly one edition, serving its purpose to test the sharpest minds before vanishing into the FUNDAZ archives forever.
        </p>
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

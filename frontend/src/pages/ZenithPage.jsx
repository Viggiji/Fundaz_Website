import { motion } from "framer-motion";
import { Quote, Instagram, Linkedin, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LetterPageShell, PageSection, SectionKicker, fadeUp } from "@/components/LetterPageShell";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { ZENITH, IMAGES } from "@/data/content";

export default function ZenithPage() {
  return (
    <LetterPageShell
      idx={5}
      heroImage={IMAGES.speakerStage}
      title={<span>The voices that <span className="text-gradient-silver">raised the bar.</span></span>}
      intro={ZENITH.intro}
    >
      {/* big pull quote */}
      <PageSection data-testid="zenith-quote">
        <motion.blockquote {...fadeUp} transition={{ duration: 0.8 }} className="border-t border-border pt-12">
          <Quote className="h-8 w-8 text-primary/40" />
          <p className="mt-6 max-w-3xl font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl lg:text-4xl">
            "The sharpest audience I have faced outside a national final."
          </p>
          <footer className="mt-5 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            — heard backstage, Main Quiz finale
          </footer>
        </motion.blockquote>
      </PageSection>

      {/* ScrollStack guest cards */}
      <PageSection className="max-w-none px-0 sm:px-0" data-testid="zenith-guests">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionKicker>The Zenith Wall</SectionKicker>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
            Scroll through the legends
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Scroll down to stack through each guest. Each card reveals a voice that shaped FUNDAZ. Over the previous editions, we've hosted a diverse set of visionaries, industry leaders, and creators who have left an indelible mark on our audience.
          </p>
        </div>

        <div className="mt-10 w-full">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={120}
            itemScale={0.04}
            itemStackDistance={25}
            stackPosition="25%"
            scaleEndPosition="12%"
            baseScale={0.82}
            blurAmount={2}
          >
            {ZENITH.guests.map((g, i) => (
              <ScrollStackItem key={g.name}>
                <div
                  className="grid items-center gap-8 md:grid-cols-[1fr_1.4fr]"
                  data-testid={`zenith-guest-${i}`}
                >
                  {/* Guest photo */}
                  <div className="group relative overflow-hidden rounded-xl shadow-elegant">
                    <img
                      src={g.photo}
                      alt={g.name}
                      className="h-[260px] w-full object-cover opacity-90 grayscale group-hover:scale-105 group-hover:grayscale-0 md:h-[320px]"
                      style={{ transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.8s ease" }}
                      loading="lazy"
                    />
                    <Badge className="absolute right-4 top-4 bg-background/70 font-mono-tech text-[10px] text-primary backdrop-blur">
                      {g.year}
                    </Badge>
                  </div>

                  {/* Guest info */}
                  <div>
                    <p className="font-display text-5xl font-bold text-primary/15">0{i + 1}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">{g.name}</h3>
                    <p className="mt-2 font-mono-tech text-[10px] uppercase tracking-[0.25em] text-accent">{g.tag}</p>
                    <p className="mt-6 max-w-md text-base italic leading-relaxed text-muted-foreground">"{g.quote}"</p>

                    {/* Social links — placeholders */}
                    <div className="mt-6 flex items-center gap-2">
                      <Button variant="ghostSilver" size="icon" className="h-8 w-8" asChild aria-label={`${g.name} Instagram`}>
                        <a href="#" title="Instagram — coming soon"><Instagram className="h-3.5 w-3.5" /></a>
                      </Button>
                      <Button variant="ghostSilver" size="icon" className="h-8 w-8" asChild aria-label={`${g.name} LinkedIn`}>
                        <a href="#" title="LinkedIn — coming soon"><Linkedin className="h-3.5 w-3.5" /></a>
                      </Button>
                      <Button variant="ghostSilver" size="icon" className="h-8 w-8" asChild aria-label={`${g.name} Twitter`}>
                        <a href="#" title="Twitter — coming soon"><Twitter className="h-3.5 w-3.5" /></a>
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </PageSection>
    </LetterPageShell>
  );
}

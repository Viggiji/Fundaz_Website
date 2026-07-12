import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LetterPageShell, PageSection, SectionKicker, fadeUp } from "@/components/LetterPageShell";
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
            “The sharpest audience I have faced outside a national final.”
          </p>
          <footer className="mt-5 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            — heard backstage, Main Quiz finale
          </footer>
        </motion.blockquote>
      </PageSection>

      {/* alternating editorial guest rows */}
      <PageSection data-testid="zenith-guests">
        <SectionKicker>The Zenith Wall</SectionKicker>
        <div className="mt-10 flex flex-col gap-16">
          {ZENITH.guests.map((g, i) => (
            <motion.article
              key={g.name}
              {...fadeUp}
              transition={{ duration: 0.7 }}
              className={`grid items-center gap-8 border-t border-border pt-12 md:grid-cols-2 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
              data-testid={`zenith-guest-${i}`}
            >
              <div className="group relative overflow-hidden rounded-xl shadow-elegant [direction:ltr]">
                <img
                  src={g.photo}
                  alt={g.name}
                  className="h-[300px] w-full object-cover opacity-90 grayscale group-hover:scale-105 group-hover:grayscale-0 md:h-[380px]"
                  style={{ transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.8s ease" }}
                  loading="lazy"
                />
                <Badge className="absolute right-4 top-4 bg-background/70 font-mono-tech text-[10px] text-primary backdrop-blur">{g.year}</Badge>
              </div>
              <div className="[direction:ltr]">
                <p className="font-display text-5xl font-bold text-primary/15">0{i + 1}</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">{g.name}</h2>
                <p className="mt-2 font-mono-tech text-[10px] uppercase tracking-[0.25em] text-accent">{g.tag}</p>
                <p className="mt-6 max-w-md text-base italic leading-relaxed text-muted-foreground">“{g.quote}”</p>
              </div>
            </motion.article>
          ))}
        </div>
      </PageSection>
    </LetterPageShell>
  );
}

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "@/components/SectionShell";
import { ZENITH, IMAGES } from "@/data/content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export const Zenith = () => (
  <SectionShell
    id="zenith"
    index={5}
    letter="Z"
    word="Zenith"
    title={<span>The voices that <span className="text-gradient-silver">raised the bar.</span></span>}
    intro={ZENITH.intro}
  >
    {/* backdrop strip */}
    <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="relative mb-12 overflow-hidden rounded-xl border border-border shadow-elegant">
      <img src={IMAGES.speakerStage} alt="Speaker on the FUNDAZ stage" className="h-56 w-full object-cover opacity-70 md:h-72" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      <p className="absolute bottom-5 left-6 max-w-md font-display text-lg font-semibold text-foreground md:text-xl">
        “The sharpest audience I have faced outside a national final.”
      </p>
    </motion.div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {ZENITH.guests.map((g, i) => (
        <motion.div key={g.name} {...fadeUp} transition={{ duration: 0.55, delay: (i % 4) * 0.1 }} className="flex">
          <Card
            className="group flex flex-1 flex-col overflow-hidden border-border bg-card hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow"
            style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
            data-testid={`zenith-card-${i}`}
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={g.photo}
                alt={g.name}
                className="h-full w-full object-cover opacity-90 grayscale group-hover:grayscale-0 group-hover:scale-105"
                style={{ transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease" }}
                loading="lazy"
              />
              <Badge className="absolute right-3 top-3 bg-background/70 font-mono-tech text-[10px] text-primary backdrop-blur">
                {g.year}
              </Badge>
            </div>
            <CardContent className="flex flex-1 flex-col p-5">
              <h4 className="font-display font-semibold text-foreground">{g.name}</h4>
              <p className="mt-1 font-mono-tech text-[10px] uppercase tracking-[0.15em] text-accent">{g.tag}</p>
              <div className="mt-auto pt-4">
                <Quote className="h-4 w-4 text-primary/50" />
                <p className="mt-1.5 text-sm italic leading-relaxed text-muted-foreground">{g.quote}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </SectionShell>
);

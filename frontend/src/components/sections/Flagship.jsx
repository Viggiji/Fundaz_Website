import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, Trophy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "@/components/SectionShell";
import { FLAGSHIP, IMAGES } from "@/data/content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export const Flagship = () => (
  <SectionShell
    id="flagship"
    index={0}
    letter="F"
    word="Flagship"
    title={<span>The Main Quiz. <span className="text-gradient-silver">Our crown event.</span></span>}
    intro={FLAGSHIP.description}
  >
    {/* Current edition hero card */}
    <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
      <Card className="overflow-hidden border-border bg-card shadow-elegant">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[260px] overflow-hidden">
            <img
              src={IMAGES.quizStage}
              alt="Main Quiz stage"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              style={{ transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent md:bg-gradient-to-r" />
            <Badge className="absolute left-4 top-4 bg-gradient-silver font-mono-tech text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
              Flagship 2025
            </Badge>
          </div>
          <CardContent className="flex flex-col justify-center gap-5 p-7 md:p-10">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{FLAGSHIP.edition}</h3>
              <p className="mt-1 font-mono-tech text-xs uppercase tracking-[0.3em] text-accent">{FLAGSHIP.theme}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" />{FLAGSHIP.date}</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{FLAGSHIP.teamSize}</span>
              <span className="inline-flex items-center gap-2 col-span-2"><MapPin className="h-4 w-4 text-primary" />{FLAGSHIP.venue}</span>
              <span className="inline-flex items-center gap-2 col-span-2"><Trophy className="h-4 w-4 text-primary" />Prize pool {FLAGSHIP.prizePool}</span>
            </div>
            <div className="mt-2">
              <Button variant="silver" size="lg" asChild data-testid="flagship-register-link">
                <a href={FLAGSHIP.registerUrl} target="_blank" rel="noopener noreferrer">
                  Register on Official Site <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>

    {/* Rounds */}
    <div className="mt-14 grid gap-5 md:grid-cols-3">
      {FLAGSHIP.rounds.map((r, i) => (
        <motion.div key={r.name} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.12 }} className="flex">
          <Card className="flex flex-1 flex-col border-border bg-secondary/40 hover:border-primary/40" style={{ transition: "border-color 0.3s ease" }} data-testid={`flagship-round-${i}`}>
            <CardContent className="flex flex-1 flex-col p-6">
              <span className="font-mono-tech text-xs text-accent">0{i + 1}</span>
              <h4 className="mt-3 font-display text-lg font-semibold text-foreground">{r.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Previous editions timeline */}
    <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="mt-20">
      <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">Previous Editions</h3>
      <p className="mt-2 text-sm text-muted-foreground">Every year rewrites the stage — the archive so far.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FLAGSHIP.pastEditions.map((e, i) => (
          <motion.div key={e.year} {...fadeUp} transition={{ duration: 0.55, delay: i * 0.08 }} className="flex">
            <Card className="group relative flex flex-1 flex-col overflow-hidden border-border bg-card hover:border-primary/40 hover:shadow-glow" style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }} data-testid={`flagship-past-${e.year}`}>
              <CardContent className="flex flex-1 flex-col p-6">
                <span className="font-display text-3xl font-bold text-gradient-silver">{e.year}</span>
                <h4 className="mt-3 font-semibold text-foreground">{e.theme}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.note}</p>
                <p className="mt-auto pt-4 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-accent">
                  Winner · {e.winner}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </SectionShell>
);

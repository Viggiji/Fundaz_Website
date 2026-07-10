import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SectionShell } from "@/components/SectionShell";
import { UNEARTHED, IMAGES } from "@/data/content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export const Unearthed = () => (
  <SectionShell
    id="unearthed"
    index={1}
    letter="U"
    word="Unearthed"
    title={<span>Where it all <span className="text-gradient-silver">began.</span></span>}
    intro={UNEARTHED.intro}
  >
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{UNEARTHED.body}</p>
        <div className="mt-10 grid grid-cols-2 gap-4">
          {UNEARTHED.stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <Card className="border-border bg-secondary/40" data-testid={`unearthed-stat-${i}`}>
                <CardContent className="p-5">
                  <p className="font-display text-3xl font-bold text-gradient-silver">{s.value}</p>
                  <p className="mt-1 font-mono-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="relative">
        <div className="overflow-hidden rounded-xl border border-border shadow-elegant">
          <img src={IMAGES.crowd} alt="FUNDAZ crowd" className="h-[320px] w-full object-cover opacity-85 grayscale md:h-[420px]" loading="lazy" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-5 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-primary/80">
            Aaruush main stage · archive
          </p>
        </div>
      </motion.div>
    </div>

    {/* Organisers */}
    <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="mt-24">
      <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">The Torchbearers</h3>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        The organisers who carried the domain before handing over the orbit.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {UNEARTHED.organisers.map((o, i) => (
          <motion.div key={o.name} {...fadeUp} transition={{ duration: 0.55, delay: (i % 3) * 0.1 }} className="flex">
            <Card className="group flex flex-1 flex-col border-border bg-card hover:border-primary/40 hover:shadow-glow" style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }} data-testid={`organiser-card-${i}`}>
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border border-primary/30">
                    <AvatarImage src={o.photo} alt={o.name} className="object-cover" />
                    <AvatarFallback className="bg-secondary font-display">{o.name.split(" ").map((w) => w[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground">{o.name}</h4>
                    <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-accent">{o.role} · {o.years}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{o.note}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </SectionShell>
);

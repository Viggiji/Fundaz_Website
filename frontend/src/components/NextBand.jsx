import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { LETTERS } from "@/lib/letterPaths";
import { useTransitionNav } from "@/components/PageTransition";

// Editorial "next chapter" band at the end of every letter page.
export const NextBand = ({ idx }) => {
  const { go } = useTransitionNav();
  const next = idx >= LETTERS.length - 1 ? null : LETTERS[idx + 1];
  return (
    <button
      onClick={() => go(next ? next.id : "home")}
      className="group relative block w-full overflow-hidden border-t border-border bg-card/40 px-5 py-16 text-left hover:bg-secondary/50 sm:px-8 md:py-20"
      style={{ transition: "background-color 0.35s ease" }}
      data-testid="next-band"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <div>
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {next ? `Next · ${next.char} — ${next.tagline}` : "End of the orbit"}
          </p>
          <p className="mt-3 font-display text-3xl font-bold text-foreground group-hover:text-gradient-silver sm:text-5xl">
            {next ? next.word : "Return to the Atom"}
          </p>
          <p className="mt-3 text-xs text-muted-foreground sm:text-sm">
            or keep scrolling — charge the letter to full and it carries you there.
          </p>
        </div>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/35 text-primary group-hover:translate-x-1.5 group-hover:border-primary group-hover:shadow-glow sm:h-16 sm:w-16" style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease" }}>
          {next ? <ArrowRight className="h-6 w-6" /> : <ArrowUpLeft className="h-6 w-6" />}
        </span>
      </div>
    </button>
  );
};

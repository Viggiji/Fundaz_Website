import { Instagram, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { AtomLogo } from "@/components/AtomLogo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LETTERS } from "@/lib/letterPaths";
import { useTransitionNav } from "@/components/PageTransition";

export const Footer = () => {
  const { go } = useTransitionNav();
  return (
    <footer className="relative border-t border-border bg-card/40 px-5 py-14 sm:px-8" data-testid="main-footer">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <AtomLogo size={40} />
              <div className="leading-none">
                <p className="font-display text-lg font-bold tracking-[0.28em] text-foreground">FUNDAZ</p>
                <p className="mt-1 font-mono-tech text-[9px] tracking-[0.22em] text-muted-foreground">AARUUSH · SRMIST</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              The fun-and-logic domain of Aaruush. Mathematics, science, reasoning — turned
              into hunts, mysteries, quizzes and one very loud auditorium.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <Button variant="ghostSilver" size="icon" aria-label="Instagram" data-testid="footer-social-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghostSilver" size="icon" aria-label="LinkedIn" data-testid="footer-social-linkedin">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghostSilver" size="icon" aria-label="Twitter" data-testid="footer-social-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">The Letters</p>
              <ul className="mt-4 space-y-2">
                {LETTERS.map((l) => (
                  <li key={l.char}>
                    <button
                      onClick={() => go(l.id)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                      style={{ transition: "color 0.2s ease" }}
                      data-testid={`footer-link-${l.char.toLowerCase()}`}
                    >
                      <span className="font-display font-semibold text-primary">{l.char}</span>
                      <span className="ml-2">{l.word}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Fest</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://aaruush.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground" style={{ transition: "color 0.2s ease" }} data-testid="footer-link-aaruush">
                    Aaruush Official <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>SRM Institute of Science and Technology</li>
                <li>Kattankulathur, Chennai</li>
              </ul>
            </div>
            <div>
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>fundaz@aaruush.net</li>
                <li>+91 98765 43210</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">© 2025 FUNDAZ — Team Aaruush, SRMIST. All rights reserved.</p>
          <p className="font-mono-tech text-[10px] tracking-[0.25em] text-muted-foreground">π · KEEP IT IRRATIONAL</p>
        </div>
      </div>
    </footer>
  );
};

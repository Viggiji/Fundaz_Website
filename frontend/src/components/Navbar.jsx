import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { AtomLogo } from "@/components/AtomLogo";
import { LETTERS, scrollToSection } from "@/lib/letterPaths";
import { cn } from "@/lib/utils";

export const Navbar = ({ activeIndex }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40",
        scrolled ? "glass-panel border-x-0 border-t-0 shadow-elegant" : "border-b border-transparent"
      )}
      style={{ transition: "background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease" }}
      data-testid="main-navbar"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-3"
          data-testid="nav-logo"
        >
          <span className="transition-transform duration-500 group-hover:rotate-180">
            <AtomLogo size={32} />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-display text-lg font-bold tracking-[0.28em] text-foreground">FUNDAZ</span>
            <span className="font-mono-tech text-[9px] tracking-[0.22em] text-muted-foreground">AARUUSH · SRMIST</span>
          </span>
        </button>

        {/* Desktop letter nav */}
        <div className="hidden items-center gap-1 md:flex">
          {LETTERS.map((l, i) => (
            <button
              key={l.char}
              onClick={() => go(l.id)}
              data-testid={`nav-letter-${l.char.toLowerCase()}`}
              className={cn(
                "group relative flex h-10 min-w-10 items-center justify-center rounded-md px-2 font-display text-base font-semibold",
                activeIndex === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              style={{ transition: "color 0.25s ease" }}
            >
              <span>{l.char}</span>
              <span className="pointer-events-none absolute -bottom-1 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-mono-tech text-[8px] uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 lg:block" style={{ transition: "opacity 0.25s ease" }}>
                {l.word}
              </span>
              <span
                className={cn(
                  "absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-primary",
                  activeIndex === i ? "w-5" : "w-0 group-hover:w-5"
                )}
                style={{ transition: "width 0.25s ease" }}
              />
            </button>
          ))}
          <Button
            variant="silver"
            size="sm"
            className="ml-3"
            onClick={() => go("now")}
            data-testid="nav-register-cta"
          >
            Register
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghostSilver" size="icon" className="md:hidden" data-testid="nav-mobile-trigger">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-border bg-background/95 backdrop-blur-xl">
            <SheetTitle className="font-display tracking-[0.25em] text-foreground">FUNDAZ</SheetTitle>
            <div className="mt-8 flex flex-col gap-1">
              {LETTERS.map((l) => (
                <button
                  key={l.char}
                  onClick={() => go(l.id)}
                  data-testid={`mobile-nav-letter-${l.char.toLowerCase()}`}
                  className="flex items-center gap-4 rounded-md px-3 py-3 text-left hover:bg-secondary"
                  style={{ transition: "background-color 0.2s ease" }}
                >
                  <span className="font-display text-2xl font-bold text-primary">{l.char}</span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{l.word}</span>
                    <span className="text-xs text-muted-foreground">{l.tagline}</span>
                  </span>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

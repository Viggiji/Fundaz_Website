import { useEffect, useState } from "react";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { Preloader } from "@/components/Preloader";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { AtomHero } from "@/components/AtomHero";
import { LetterCompanion } from "@/components/LetterCompanion";
import { Flagship } from "@/components/sections/Flagship";
import { Unearthed } from "@/components/sections/Unearthed";
import { Now } from "@/components/sections/Now";
import { DomainEvents } from "@/components/sections/DomainEvents";
import { Arena } from "@/components/sections/Arena";
import { Zenith } from "@/components/sections/Zenith";
import { Footer } from "@/components/Footer";

function App() {
  // -1 = hero (companion hidden), 0..5 = F U N D A Z sections
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-letter-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(parseInt(entry.target.dataset.letterIndex, 10));
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    const hero = document.getElementById("hero");
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveIndex(-1);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    if (hero) heroObserver.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Starfield />
      <div className="noise-overlay" />
      <Navbar activeIndex={activeIndex} />
      <LetterCompanion activeIndex={activeIndex} />

      <main className="relative z-10">
        <AtomHero />
        <Flagship />
        <Unearthed />
        <Now />
        <DomainEvents />
        <Arena />
        <Zenith />
      </main>

      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;

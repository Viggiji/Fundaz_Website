// Single-contour stencil letter paths (viewBox 0 0 80 120) built for flubber morphing.
// Letters with counters (D, A) use stencil slits so every glyph is one closed ring.

export const LETTERS = [
  { char: "F", word: "Flagship", id: "flagship", tagline: "The Main Quiz" },
  { char: "U", word: "Unearthed", id: "unearthed", tagline: "Our History" },
  { char: "N", word: "Now", id: "now", tagline: "This Year's Events" },
  { char: "D", word: "Domain", id: "domain", tagline: "Domain Events" },
  { char: "A", word: "Arena", id: "arena", tagline: "Core Activities" },
  { char: "Z", word: "Zenith", id: "zenith", tagline: "Notable Guests" },
];

export const LETTER_PATHS = {
  F: "M0 0 L72 0 L72 22 L24 22 L24 50 L62 50 L62 72 L24 72 L24 120 L0 120 Z",
  U: "M0 0 L24 0 L24 98 L56 98 L56 0 L80 0 L80 120 L0 120 Z",
  N: "M0 120 L0 0 L24 0 L56 74 L56 0 L80 0 L80 120 L56 120 L24 46 L24 120 Z",
  D: "M0 0 L52 0 L80 28 L80 92 L52 120 L0 120 L0 72 L24 72 L24 98 L42 98 L56 84 L56 36 L42 22 L24 22 L24 48 L0 48 Z",
  A: "M0 120 L30 0 L50 0 L80 120 L58 120 L52 96 L44 96 L44 78 L51 78 L40 28 L29 78 L36 78 L36 96 L28 96 L22 120 Z",
  Z: "M2 0 L78 0 L78 20 L32 98 L78 98 L78 120 L2 120 L2 100 L48 22 L2 22 Z",
};

export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

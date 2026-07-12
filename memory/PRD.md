# FUNDAZ Landing Page — PRD

## Overview
Single-page landing site for FUNDAZ, the math/science/logic domain of Aaruush (SRMIST's annual fest). Dark silver "atomic space" theme inspired by the club's π-atom logo and MetaMask's travelling-mascot scroll interaction.

## Tech
- React 19 (CRA + craco), Tailwind + shadcn/ui, framer-motion, flubber (SVG path morphing), sonner toasts.
- Frontend-only prototype; registrations are MOCKED (saved to localStorage `fundaz_registrations`).

## Key Features
1. **Atom Hero (interactive logo)** — π nucleus, CSS atom ellipses, starfield canvas; letters F U N D A Z slowly orbit the nucleus, pause on hover, and act as the navbar (click → smooth scroll).
2. **Letter Companion** — MetaMask-style fixed giant ghost letter that floats beside each section, alternates sides (F right, U left, N right, D left, A right, Z left) and **morphs** (flubber shape interpolation, single-contour stencil paths) when crossing section boundaries. Driven by IntersectionObserver in App.js.
3. **Sections**:
   - **F Flagship** — Main Quiz '25 card (external register link → aaruush.org), 3 rounds, 4 past editions.
   - **U Unearthed** — history, stats, 6 past organisers with photos.
   - **N Now** — all current-year events; flagship + activities link externally; 3 domain events open a mock registration dialog (validated form → localStorage + toast).
   - **D Domain** — Day 1/2/3 tabs for 2025 domain events with schedules; past events accordion by year.
   - **A Arena** — Treasure Hunt & Mystery Room split cards, how-it-works, past themes.
   - **Z Zenith** — notable speakers/guests grid.
4. Navbar (letter links + active underline + mobile sheet), footer, noise overlay, grayscale imagery.
5. **Preloader — "The Collision"** — canvas animation on every load: wireframe geometric clusters spiral inward (~2s), collide into a flash + big-bang particle explosion with universe-wide shockwave rings (~1.5s), then dissolves to reveal the site. Click-to-skip; respects prefers-reduced-motion; scroll locked during play.
6. **Hero orbit v2** — letters revolve ON the atom's 3 electron ellipses (2 per orbit, parametric motion via useAnimationFrame) with pseudo-3D depth (scale/z-index/opacity), hover pauses motion.
7. **Domain restructure** — each of the 3 domain events spans all 3 fest days; tabs are per-event, each showing three day-round cards (Day 1/2/3 = Round 1/2/Finale).
8. **Arena site links** — subtle placeholder microsite links (href="#") for Treasure Hunt & Mystery Room, marked in content.js for later replacement.

## Design System
- HSL tokens in index.css: bg 220 12% 5%, primary silver 210 16% 80%, accent 207 22% 68%.
- Fonts: Space Grotesk (display), Manrope (body), JetBrains Mono (labels).
- Button variants: silver / outlineSilver / ghostSilver + xl size.

## Status
V3 — Multi-page rebuild complete; fully tested (all pass). All content is realistic placeholder data in src/data/content.js — replace freely.

## V3 Architecture (multi-page)
- Routes: "/" (landing = atom only, no scroll) + /flagship /unearthed /now /domain /arena /zenith.
- PageTransition.jsx: cinematic letter transitions (cover → hold/wiggle with charging ring → reveal zoom); π shown when returning home. All navigation (navbar, footer, next-band, orbit letters, cross-page register buttons) goes through useTransitionNav().go(id).
- ScrollFillCompanion.jsx: fixed page letter fills with "starlight plasma" wave when wheel-scrolling at page bottom (approach zone pre-charges to 30%, drains on scroll-up); at 100% auto-transitions to the next page (Z → home). Click = skip ahead. NextBand.jsx is the editorial fallback CTA.
- Preloader (immersive v2): 7 wireframe clusters, backdrop stars, 560-particle explosion, 4 shockwave rings, screen shake; plays once per session (sessionStorage fz_preloaded), click-to-skip.
- Editorial redesign (cards removed): numbered timelines, year rows, marquee stat bands, day-glance strips, full-bleed banners with sticky splits, alternating guest rows.
- InfiniteMenu (React Bits, gl-matrix) on /unearthed: drag-to-spin WebGL sphere of organiser photos with name/role overlay + placeholder "#" action button; accessible name index below.

## Possible Next Steps
- Real backend for domain-event registrations.
- Real photos/logos, actual event dates & links, per-event registration links (user said they'll add later).

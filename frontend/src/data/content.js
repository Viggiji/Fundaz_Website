// ------- All content below is realistic PLACEHOLDER / MOCK data — replace freely -------

const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  quizStage: u("photo-1761618291331-535983ae4296", 1400),
  stageLights: u("photo-1583787035686-91b82ad5d811", 1400),
  mysteryRoom: u("photo-1695893155282-4f71c946da5a", 1200),
  escapeNeon: u("photo-1569002925653-ed18f55d7292", 1200),
  treasureMaps: u("photo-1473163928189-364b2c4e1135", 1200),
  skeletonKey: u("photo-1553991562-9f24b119ff51", 1200),
  crowd: u("photo-1585346230722-6b9df46d0d54", 1400),
  speakerStage: u("photo-1626125345510-4603468eedfb", 1400),
};

const P = {
  p1: u("photo-1764545973653-94c40d993495", 500),
  p2: u("photo-1638290047807-4c9d389b9aa6", 500),
  p3: u("photo-1770894807442-108cc33c0a7a", 500),
  p4: u("photo-1766022411633-e88e3650538b", 500),
  p5: u("photo-1758922584983-82ffd5720c6a", 500),
  p6: u("photo-1542190891-2093d38760f2", 500),
  p7: u("photo-1745060594679-61578eb592f7", 500),
  p8: u("photo-1649433658557-54cf58577c68", 500),
  p9: u("photo-1778692258270-bc0e80e975c0", 500),
  p10: u("photo-1609371497456-3a55a205d5eb", 500),
};

// ---------------- F — FLAGSHIP ----------------
export const FLAGSHIP = {
  edition: "Main Quiz '25",
  theme: "The Paradox Protocol",
  date: "Sept 12 – 13, 2025",
  venue: "Dr. T.P. Ganesan Auditorium, SRMIST",
  teamSize: "Teams of 2",
  prizePool: "₹75,000+",
  description:
    "The Main Quiz is where FUNDAZ began and where it peaks every year — a two-day battle of wit spanning science, mathematics, pop culture, and pure lateral madness. Hundreds of teams enter the prelims; six survive to the stage finale under the lights.",
  rounds: [
    {
      name: "Prelims — The Filter",
      detail: "40 questions of written mayhem. Speed matters, instinct matters more. Top 24 teams advance.",
    },
    {
      name: "Semis — The Gauntlet",
      detail: "Buzzer rounds, connect walls and audio-visual traps across four parallel stages.",
    },
    {
      name: "Finale — The Protocol",
      detail: "Six teams. One stage. Infinite pounce-and-bounce. The auditorium decides who owns the year.",
    },
  ],
  pastEditions: [
    { year: "2024", theme: "Uncharted Multiverse", note: "1,100+ participants — largest prelims in FUNDAZ history.", winner: "Team Heisenbug" },
    { year: "2023", theme: "Chronicles of Chance", note: "The finale famously ended on a tie-breaker pounce.", winner: "Occam's Lazers" },
    { year: "2022", theme: "The Infinity Gambit", note: "First hybrid edition — campus stage plus live stream.", winner: "Null Pointers" },
    { year: "2021", theme: "Genesis", note: "The all-online edition that kept the flame alive.", winner: "Quarks & Recreation" },
  ],
  registerUrl: "https://aaruush.org",
};

// ---------------- U — UNEARTHED ----------------
export const UNEARTHED = {
  intro:
    "FUNDAZ is the fun-and-logic domain of Aaruush, the national-level techno-management fest of SRM Institute of Science and Technology. Born as a single quiz table in a corridor, it grew into the domain that gamifies mathematics, science, logical reasoning and critical thinking for thousands of students every year.",
  body:
    "The philosophy has never changed: learning sticks when it feels like play. From campus-wide treasure hunts to scripted mystery rooms and the legendary Main Quiz, every FUNDAZ event is engineered to make you think sideways. What began with a handful of volunteers is now one of the most-awaited domains at Aaruush.",
  stats: [
    { value: "13+", label: "Editions" },
    { value: "5,000+", label: "Annual Footfall" },
    { value: "15+", label: "Events Every Year" },
    { value: "60+", label: "Volunteers & Crew" },
  ],
  organisers: [
    { name: "Aditya Raman", role: "Domain Lead", years: "2018 – 2019", photo: P.p6, note: "Scripted the first Mystery Room case and never told anyone the ending." },
    { name: "Sneha Iyer", role: "Domain Lead", years: "2019 – 2020", photo: P.p8, note: "Scaled the Main Quiz prelims past 500 teams for the first time." },
    { name: "Rohan Deshpande", role: "Events Head", years: "2020 – 2021", photo: P.p2, note: "Took the whole domain online overnight during the Genesis edition." },
    { name: "Ananya Krishnan", role: "Domain Lead", years: "2021 – 2022", photo: P.p9, note: "Designed the campus-wide clue grid still used by Treasure Hunt today." },
    { name: "Arjun Mehta", role: "Quizmaster", years: "2022 – 2023", photo: P.p3, note: "Wrote 400+ original questions — not one leaked, ever." },
    { name: "Kavya Nair", role: "Domain Lead", years: "2023 – 2024", photo: P.p10, note: "Brought national-circuit quizzers and speakers to the FUNDAZ stage." },
  ],
};

// ---------------- N — NOW (current year events) ----------------
export const NOW_EVENTS = [
  {
    id: "main-quiz",
    name: "Main Quiz '25 — The Paradox Protocol",
    type: "Flagship",
    date: "Sept 12 – 13",
    blurb: "The flagship. Two days, three rounds, one champion team. Registrations on the official Aaruush portal.",
    action: "link",
    url: "https://aaruush.org",
  },
  {
    id: "treasure-hunt",
    name: "Treasure Hunt",
    type: "Activity",
    date: "Sept 12",
    blurb: "A campus-wide chase across SRMIST — decode clues, sprint between landmarks, beat every other squad to the vault.",
    action: "link",
    url: "https://aaruush.org",
  },
  {
    id: "mystery-room",
    name: "Mystery Room",
    type: "Activity",
    date: "Sept 12 – 13",
    blurb: "Step into this year's original case. A room, a story, a countdown — solve it from the inside.",
    action: "link",
    url: "https://aaruush.org",
  },
  {
    id: "cryptic-conundrum",
    name: "Cryptic Conundrum",
    type: "Domain Event",
    date: "Sept 12 – 14 · 3 rounds",
    blurb: "Cipher-breaking campaign — Caesar to steganography. A new round every day, one champion team.",
    action: "register",
  },
  {
    id: "fermi-files",
    name: "The Fermi Files",
    type: "Domain Event",
    date: "Sept 12 – 14 · 3 rounds",
    blurb: "Estimation warfare across three days. How many piano tuners in Chennai? Defend your logic before the panel.",
    action: "register",
  },
  {
    id: "paradox-arena",
    name: "Paradox Arena",
    type: "Domain Event",
    date: "Sept 12 – 14 · 3 rounds",
    blurb: "Rapid-fire critical thinking showdown — daily eliminations until one mind is left standing on stage.",
    action: "register",
  },
];

// ---------------- D — DOMAIN EVENTS ----------------
export const DOMAIN_EVENTS = {
  intro:
    "Every year FUNDAZ crafts three brand-new domain events — they exist for one edition only, then retire into legend. Each event runs across all three days of the fest, with every day being a different round.",
  current: [
    {
      id: "cryptic-conundrum",
      name: "Cryptic Conundrum",
      dates: "Sept 12 – 14",
      image: "skeletonKey",
      description:
        "A cipher-breaking campaign through the history of secret writing. Teams of two survive three escalating rounds — Caesar shifts and Vigenère grids on day one, hidden-in-plain-sight steganography on day two, and an unbroken final cipher on day three.",
      rounds: [
        { day: "Day 1", date: "Sept 12", name: "Round 1 — Cipher Sprint", detail: "Eight sealed envelopes of classical ciphers against the clock. Top 16 teams advance." },
        { day: "Day 2", date: "Sept 13", name: "Round 2 — The Stego Vault", detail: "Messages hidden inside images, audio and campus posters. Find them before your rivals do." },
        { day: "Day 3", date: "Sept 14", name: "Finale — The Unbreakable", detail: "One custom cipher, one hour, no hints. First correct plaintext takes the title." },
      ],
    },
    {
      id: "fermi-files",
      name: "The Fermi Files",
      dates: "Sept 12 – 14",
      image: "treasureMaps",
      description:
        "Estimation warfare inspired by Enrico Fermi. No internet, no calculators — just structured guessing. Three days of building order-of-magnitude answers to absurd questions and defending the logic behind them.",
      rounds: [
        { day: "Day 1", date: "Sept 12", name: "Round 1 — Cold Estimates", detail: "Solo written round: 12 impossible questions, scored on the power of ten you land in." },
        { day: "Day 2", date: "Sept 13", name: "Round 2 — Panel Defence", detail: "Qualified teams defend their reasoning live before a panel that loves poking holes." },
        { day: "Day 3", date: "Sept 14", name: "Finale — The Final File", detail: "One monster estimation built in stages on stage. Cleanest chain of logic wins." },
      ],
    },
    {
      id: "paradox-arena",
      name: "Paradox Arena",
      dates: "Sept 12 – 14",
      image: "stageLights",
      description:
        "The rapid-fire critical thinking showdown. Riddles, self-referencing puzzles and lateral-thinking traps — answer in seconds or take the walk. Three days of eliminations until one mind is left standing.",
      rounds: [
        { day: "Day 1", date: "Sept 12", name: "Round 1 — Lightning Riddles", detail: "Open qualifiers: 90 seconds per riddle, sudden elimination on two misses." },
        { day: "Day 2", date: "Sept 13", name: "Round 2 — The Knockouts", detail: "Head-to-head brackets on stage. Steal your opponent's question, steal their spot." },
        { day: "Day 3", date: "Sept 14", name: "Finale — Sudden Death", detail: "The last four face the paradox gauntlet. One wrong step ends the run." },
      ],
    },
  ],
  past: [
    { year: "2024", events: ["Sherlocked — deduction relay", "MindSweeper — logic-grid marathon", "Decode X — binary scavenger sprint"] },
    { year: "2023", events: ["Logic Loop — recursive puzzle chain", "Enigma Nights — after-dark cipher hunt", "QuizWit — 60-second face-offs"] },
    { year: "2022", events: ["Puzzle Vault — combination-lock rooms", "Brain Blitz — mental-math knockout", "Cipher Storm — team cryptanalysis"] },
  ],
};

// ---------------- A — ARENA (core activities) ----------------
export const ARENA = {
  intro:
    "Two activities are the beating heart of FUNDAZ. They return every single year — same soul, brand-new story. Everything else orbits around them.",
  activities: [
    {
      id: "treasure-hunt",
      name: "Treasure Hunt",
      image: "treasureMaps",
      accentImage: "skeletonKey",
      tag: "Campus-wide · Teams of 4",
      site: "#", // placeholder — swap with the Treasure Hunt microsite link
      description:
        "The whole of SRMIST becomes the board. Squads decode a chain of interlocking clues that send them sprinting between libraries, labs, canteens and landmarks — every solved clue reveals the next location, and only one squad reaches the final vault first.",
      how: [
        "Each squad receives a sealed origin clue at the starting grid",
        "Clues chain across 10+ campus checkpoints with physical tokens",
        "Decoys and false trails punish sloppy solving",
        "First squad to open the vault claims the hunt",
      ],
      years: [
        { year: "2024", theme: "The Cartographer's Debt — clues hidden inside campus maps" },
        { year: "2023", theme: "Signal Lost — radio-frequency checkpoint hunt" },
        { year: "2022", theme: "Inheritance — a fictional founder's scattered will" },
      ],
    },
    {
      id: "mystery-room",
      name: "Mystery Room",
      image: "mysteryRoom",
      accentImage: "escapeNeon",
      tag: "Immersive · Teams of 3–5",
      site: "#", // placeholder — swap with the Mystery Room microsite link
      description:
        "You are handed a case, then the door closes behind you. Inside is a fully staged scene — evidence, props, red herrings and a story written from scratch for this year only. Piece the narrative together and crack the case before the timer runs out. No two editions have ever shared a plot.",
      how: [
        "A brand-new original case is scripted every year",
        "The room is a staged scene — everything can be evidence",
        "Teams get 30 minutes and exactly one hint",
        "Fastest correct solve of the day tops the board",
      ],
      years: [
        { year: "2024", theme: "The Last Lecture — a professor vanishes mid-semester" },
        { year: "2023", theme: "Checkmate at Midnight — a chess club with a secret" },
        { year: "2022", theme: "The Curator's Alibi — a heist inside a mock museum" },
      ],
    },
  ],
};

// ---------------- Z — ZENITH ----------------
export const ZENITH = {
  intro:
    "Over the years the FUNDAZ stage has hosted quizmasters, scientists, storytellers and champions. The Zenith wall remembers them.",
  guests: [
    { name: "Dr. Vikram Sarin", tag: "Astrophysicist & Science Communicator", year: "2024", photo: P.p1, quote: "A crowd that heckles you with better answers — I've never had more fun on stage." },
    { name: "Meera Chandran", tag: "National Quiz Circuit Champion", year: "2023", photo: P.p4, quote: "The Main Quiz finale here is as sharp as anything on the national circuit." },
    { name: "Raghav Pillai", tag: "Puzzle Designer, Escape Labs", year: "2023", photo: P.p5, quote: "Their Mystery Room writing team could work in the industry tomorrow." },
    { name: "Ishita Verma", tag: "Mathematician & Author", year: "2022", photo: P.p7, quote: "FUNDAZ proves the fastest way to teach math is to hide it inside a game." },
  ],
};

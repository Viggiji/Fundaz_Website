// Miniature FUNDAZ atom mark (π nucleus + orbits) used in navbar & footer
export const AtomLogo = ({ size = 34 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <circle cx="32" cy="32" r="30" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" />
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="hsl(var(--primary) / 0.65)" strokeWidth="1.6" transform="rotate(-30 32 32)" />
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="hsl(var(--primary) / 0.65)" strokeWidth="1.6" transform="rotate(30 32 32)" />
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="hsl(var(--primary) / 0.65)" strokeWidth="1.6" transform="rotate(90 32 32)" />
    <circle cx="32" cy="32" r="9" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.6" />
    <text x="32" y="37" textAnchor="middle" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fill="hsl(var(--foreground))">π</text>
    <circle cx="11" cy="22" r="3" fill="hsl(var(--primary))" />
    <circle cx="53" cy="22" r="3" fill="hsl(var(--primary))" />
    <circle cx="32" cy="56" r="3" fill="hsl(var(--primary))" />
  </svg>
);

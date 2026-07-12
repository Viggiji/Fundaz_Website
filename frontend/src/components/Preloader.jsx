import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  FUNDAZ Preloader — "The Collision"
  Phase 1 (converge): wireframe geometric clusters (like the reference art)
  spiral inward along curved trails toward a growing nucleus.
  Phase 2 (collision): flash + big-bang particle explosion with shockwave
  rings that sweep the whole viewport.
  Phase 3 (reveal): the overlay dissolves, unveiling the site.
  Click anywhere to skip.
*/

const CONVERGE_MS = 2300;
const EXPLODE_MS = 1600;

const easeInCubic = (t) => t * t * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export const Preloader = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [flash, setFlash] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [exploded, setExploded] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    // Respect reduced motion — skip straight to the site
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H / 2;
    const maxDim = Math.hypot(W, H);

    // --- ambient backdrop stars (drawn every frame, twinkling) ---
    const bgStars = Array.from({ length: 110 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.3,
      base: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    // --- wireframe clusters spiralling inward ---
    const CLUSTERS = 7;
    const clusters = Array.from({ length: CLUSTERS }, (_, i) => ({
      angle0: (i / CLUSTERS) * Math.PI * 2 + Math.random() * 0.6,
      spin: 2.4 + Math.random() * 1.2,
      r0: Math.min(W, H) * (0.42 + Math.random() * 0.2),
      size: 20 + Math.random() * 14,
      k: 6 + Math.floor(Math.random() * 3),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: 0.9 + Math.random() * 1.4,
      wobble: 2 + Math.random() * 3,
    }));

    // --- explosion state ---
    let particles = [];
    let rings = [];
    const spawnExplosion = () => {
      particles = Array.from({ length: 560 }, () => {
        const a = Math.random() * Math.PI * 2;
        const sp = 2 + Math.pow(Math.random(), 1.6) * 18;
        return {
          x: cx,
          y: cy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 1,
          decay: 0.005 + Math.random() * 0.012,
          size: 0.8 + Math.random() * 2.4,
          light: 60 + Math.random() * 35,
          streak: Math.random() < 0.22,
        };
      });
      rings = [0, 120, 280, 460].map((delay) => ({ born: performance.now() + delay }));
    };

    let raf;
    const start = performance.now();
    let explodeStart = 0;
    let phase = "converge";

    const drawCluster = (c, t, prog) => {
      const r = c.r0 * (1 - easeInCubic(prog));
      const ang = c.angle0 + easeInCubic(prog) * c.spin;
      const px = cx + Math.cos(ang) * r;
      const py = cy + Math.sin(ang) * r;
      const rot = c.rot + t * 0.001 * c.rotSpeed;
      const scale = 1 - prog * 0.55;
      const pts = [];
      for (let j = 0; j < c.k; j++) {
        const a = rot + (j / c.k) * Math.PI * 2;
        const wob = 0.72 + 0.28 * Math.sin(t * 0.004 * c.wobble + j * 1.7);
        pts.push([px + Math.cos(a) * c.size * wob * scale, py + Math.sin(a) * c.size * wob * scale]);
      }
      ctx.strokeStyle = "hsla(210, 20%, 82%, 0.32)";
      ctx.lineWidth = 0.7;
      for (let a = 0; a < pts.length; a++) {
        for (let b = a + 1; b < pts.length; b++) {
          ctx.beginPath();
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "hsla(210, 22%, 90%, 0.95)";
      for (const [x, y] of pts) {
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (now) => {
      const t = now - start;
      // translucent clear = motion trails
      ctx.fillStyle = "hsla(220, 12%, 5%, 0.26)";
      ctx.fillRect(0, 0, W, H);

      // twinkling backdrop stars
      for (const s of bgStars) {
        const tw = s.base + Math.sin(t * 0.003 + s.phase) * 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(210, 20%, 85%, ${Math.max(0.04, tw)})`;
        ctx.fill();
      }

      // screen shake right after the collision
      let shook = false;
      if (phase === "explode") {
        const et = now - explodeStart;
        if (et < 380) {
          const mag = (1 - et / 380) * 9;
          ctx.save();
          ctx.translate((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
          shook = true;
        }
      }

      if (phase === "converge") {
        const prog = Math.min(1, t / CONVERGE_MS);
        clusters.forEach((c) => drawCluster(c, t, prog));

        // growing nucleus
        const coreR = 2 + easeInCubic(prog) * 12;
        ctx.save();
        ctx.shadowBlur = 24 + prog * 60;
        ctx.shadowColor = "hsla(210, 30%, 88%, 0.9)";
        ctx.fillStyle = `hsla(210, 25%, ${70 + prog * 25}%, 1)`;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (prog >= 1) {
          phase = "explode";
          explodeStart = now;
          spawnExplosion();
          setFlash(true);
          setExploded(true);
        }
      } else if (phase === "explode") {
        const et = now - explodeStart;

        // shockwave rings sweeping the universe
        for (const ring of rings) {
          const rt = now - ring.born;
          if (rt < 0) continue;
          const p = Math.min(1, rt / 1100);
          const radius = easeOutCubic(p) * maxDim * 0.72;
          const alpha = (1 - p) * 0.5;
          if (alpha <= 0) continue;
          ctx.strokeStyle = `hsla(210, 25%, 85%, ${alpha})`;
          ctx.lineWidth = 2 - p * 1.4;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // debris particles
        for (const p of particles) {
          if (p.life <= 0) continue;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.life -= p.decay;
          const a = Math.max(0, p.life);
          if (p.streak) {
            ctx.strokeStyle = `hsla(210, 20%, ${p.light}%, ${a * 0.9})`;
            ctx.lineWidth = p.size * 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 3.2, p.y - p.vy * 3.2);
            ctx.stroke();
          } else {
            ctx.fillStyle = `hsla(210, 22%, ${p.light}%, ${a})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // collapsing afterglow core
        const glow = Math.max(0, 1 - et / 700);
        if (glow > 0) {
          ctx.save();
          ctx.shadowBlur = 90 * glow;
          ctx.shadowColor = "hsla(210, 30%, 90%, 0.9)";
          ctx.fillStyle = `hsla(210, 30%, 92%, ${glow})`;
          ctx.beginPath();
          ctx.arc(cx, cy, 16 * glow, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        if (et > EXPLODE_MS && !doneRef.current) {
          doneRef.current = true;
          setLeaving(true);
        }
      }
      if (shook) ctx.restore();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, [onComplete]);

  const skip = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (leaving) onComplete();
      }}
      onClick={skip}
      data-testid="preloader-overlay"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" data-testid="preloader-canvas" />

      {/* collision flash */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, hsl(210 30% 92%), hsl(210 20% 70% / 0.4) 40%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: flash ? [0, 0.95, 0] : 0 }}
        transition={{ duration: 0.7, times: [0, 0.18, 1], ease: "easeOut" }}
      />

      {/* status line */}
      <motion.p
        className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-tech text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
        animate={{ opacity: exploded ? 0 : [0.35, 0.9, 0.35] }}
        transition={exploded ? { duration: 0.3 } : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        data-testid="preloader-status"
      >
        F U N D A Z &mdash; Igniting the nucleus
      </motion.p>
    </motion.div>
  );
};

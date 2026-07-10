import { useEffect, useRef } from "react";

// Lightweight canvas starfield — slow drift + twinkle, sits behind everything.
export const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let stars = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const count = Math.min(220, Math.floor((window.innerWidth * window.innerHeight) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 1.1 + 0.3) * dpr,
        base: Math.random() * 0.5 + 0.15,
        speed: Math.random() * 0.05 + 0.01,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() * 0.06 + 0.01) * dpr,
      }));
    };

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.y += s.drift;
        if (s.y > canvas.height) s.y = 0;
        const tw = s.base + Math.sin(t * (s.speed * 40) + s.phase) * 0.18;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(210, 20%, 88%, ${Math.max(0.05, tw)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      data-testid="starfield-canvas"
    />
  );
};

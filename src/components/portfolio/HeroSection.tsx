import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const titles = [
  "Software Development Engineer",
  "AI/ML Engineer",
  "Deep Learning Enthusiast",
  "Python Developer",
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentTitle.length) {
      timeout = setTimeout(() => setDisplayedText(currentTitle.slice(0, displayedText.length + 1)), 80);
    } else if (!isDeleting && displayedText.length === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => setDisplayedText(displayedText.slice(0, -1)), 40);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  // Neural network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 40 : 80;

    interface Node { x: number; y: number; vx: number; vy: number; z: number; }
    const nodes: Node[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        z: Math.random() * 0.5 + 0.5,
      });
    }

    const isDark = () => document.documentElement.classList.contains("dark");

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const dark = isDark();
      const dotColor = dark ? "200, 169, 110" : "181, 69, 27";
      const lineColor = dark ? "200, 169, 110" : "181, 69, 27";
      const dotOpacity = dark ? 0.5 : 0.3;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const n of nodes) {
        // Mouse repulsion
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.8;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }

        n.vx *= 0.98;
        n.vy *= 0.98;
        n.x += n.vx * n.z;
        n.y += n.vy * n.z;

        if (n.x < 0) n.x = w;
        if (n.x > w) n.x = 0;
        if (n.y < 0) n.y = h;
        if (n.y > h) n.y = 0;
      }

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${lineColor}, ${(1 - d / 150) * 0.12})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5 * n.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${dotOpacity * n.z})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const nameLetters = "Nishita Saxena".split("");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "auto" }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-border px-4 py-2 mb-8"
        >
          <span className="glow-dot" />
          <span className="mono-label text-muted-foreground">Available for Internships & Roles</span>
        </motion.div>

        {/* Name */}
        <div className="mb-4 overflow-hidden">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-800 text-foreground leading-tight">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4 + i * 0.04,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl md:text-2xl font-mono text-primary mb-6 h-8"
        >
          {displayedText}
          <span className="typewriter-cursor" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto font-body"
        >
          Building intelligent systems. One model at a time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="gradient-btn px-8 py-3 font-body font-semibold flex items-center gap-2 group"
          >
            View My Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#"
            className="glass-btn px-8 py-3 font-body font-semibold flex items-center gap-2"
          >
            <Download size={18} />
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 flex items-start justify-center p-1"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
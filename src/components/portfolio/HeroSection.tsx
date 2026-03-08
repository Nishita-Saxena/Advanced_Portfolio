import { useState, useEffect } from "react";
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

  const nameLetters = "Nishita Saxena".split("");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="violet-bloom w-[600px] h-[600px] -top-40 -right-40 absolute opacity-50" />
      <div className="violet-bloom w-[400px] h-[400px] bottom-20 -left-20 absolute opacity-30" />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full border border-primary/20 animate-float"
        style={{ animationDelay: "0s" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/5 w-10 h-10 rotate-45 border border-secondary/20 animate-float-slow"
        style={{ animationDelay: "2s" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full bg-primary/10 animate-float"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
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
            className="gradient-btn px-8 py-3 rounded-full font-body font-semibold flex items-center gap-2 group"
          >
            View My Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#"
            className="glass-btn px-8 py-3 rounded-full font-body font-semibold flex items-center gap-2"
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
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

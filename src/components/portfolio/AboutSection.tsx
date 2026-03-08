import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const badges = [
    { icon: "📍", label: "India" },
    { icon: "🎓", label: "2nd Year CS" },
    { icon: "💡", label: "AI & ML" },
    { icon: "🐍", label: "Python" },
  ];

  const languages = [
    { name: "Hindi", flag: "🇮🇳", level: 100, label: "Native" },
    { name: "English", flag: "🇬🇧", level: 90, label: "Fluent" },
    // TODO: Add more languages
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="violet-bloom w-[500px] h-[500px] -right-60 top-0 absolute opacity-20" />
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-muted flex items-center justify-center overflow-hidden relative z-10">
                {/* // TODO: Replace with your photo */}
                <span className="text-6xl">👩‍💻</span>
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 w-64 h-64 md:w-80 md:h-80 rounded-full m-auto">
                <svg className="w-full h-full animate-spin" style={{ animationDuration: "8s" }} viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(255, 90%, 66%)" />
                      <stop offset="100%" stopColor="hsl(174, 100%, 42%)" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="96" fill="none" stroke="url(#ring-grad)" strokeWidth="2" strokeDasharray="150 450" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="section-heading text-3xl md:text-4xl text-foreground mb-6">About Me</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6 mt-8">
              {/* // TODO: Replace with your real bio */}
              I'm a 2nd-year Computer Science student with a deep passion for Artificial Intelligence, 
              Machine Learning, and Deep Learning. I love building intelligent systems that solve real-world 
              problems — from computer vision applications to NLP models. When I'm not training models, 
              you'll find me exploring new research papers, contributing to open source, or competing in hackathons.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map((b) => (
                <span key={b.label} className="glass-card px-4 py-2 rounded-full text-sm font-body text-foreground flex items-center gap-2">
                  <span>{b.icon}</span> {b.label}
                </span>
              ))}
            </div>

            {/* Languages */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3 text-lg">Languages I Speak</h3>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm font-body mb-1">
                      <span className="text-foreground">{lang.flag} {lang.name}</span>
                      <span className="text-muted-foreground">{lang.label}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${lang.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, hsl(255, 90%, 66%), hsl(174, 100%, 42%))" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

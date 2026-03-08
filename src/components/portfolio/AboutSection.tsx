import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, GraduationCap, Brain, Code2 } from "lucide-react";

const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const badges = [
    { icon: <MapPin size={14} />, label: "India" },
    { icon: <GraduationCap size={14} />, label: "2nd Year CS" },
    { icon: <Brain size={14} />, label: "AI & ML" },
    { icon: <Code2 size={14} />, label: "Python" },
  ];

  const languages = [
    { name: "Hindi", label: "Native" },
    { name: "English", label: "Fluent" },
    // TODO: Add more languages
  ];

  return (
    <section id="about" className="py-24 relative section-bg-about">
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
                <img
                  src="/profile.png"
                  alt="Nishita Saxena"
                  className="w-full h-full object-cover object-[10%_1%]"
                />
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 w-64 h-64 md:w-80 md:h-80 rounded-full m-auto">
                <svg className="w-full h-full animate-spin" style={{ animationDuration: "8s" }} viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
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
            <p className="text-muted-foreground font-body mt-8 mb-6">
              {/* // TODO: Replace with your real bio */}
              I'm a 2nd-year Computer Science student with a deep passion for Artificial Intelligence, 
              Machine Learning, and Deep Learning. I love building intelligent systems that solve real-world 
              problems — from computer vision applications to NLP models. When I'm not training models, 
              you'll find me exploring new research papers, contributing to open source, or competing in hackathons.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map((b) => (
                <span key={b.label} className="border border-border px-4 py-2 text-sm font-body text-foreground flex items-center gap-2">
                  <span className="text-primary">{b.icon}</span> {b.label}
                </span>
              ))}
            </div>

            {/* Languages */}
            <div>
              <h3 className="mono-label text-primary mb-3">Languages I Speak</h3>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-3 text-sm font-body">
                    <span className="text-foreground">{lang.name}</span>
                    <span className="text-muted-foreground">— {lang.label}</span>
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
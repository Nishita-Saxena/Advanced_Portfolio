import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";
import { research } from "@/data/research";

const ResearchSection = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="research" className="py-24 relative section-bg-bloom">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-16"
        >
          Research & Experiments
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {research.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border p-6 cursor-pointer card-hover relative"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 27px, hsl(var(--border) / 0.3) 27px, hsl(var(--border) / 0.3) 28px)",
              }}
              onClick={() => setExpanded(expanded === r.id ? null : r.id)}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="mono-label text-primary text-[10px]" style={{ borderBottom: "2px wavy hsl(var(--primary) / 0.4)" }}>
                  {r.type}
                </span>
                <ChevronDown size={18} className={`text-muted-foreground transition-transform ${expanded === r.id ? "rotate-180" : ""}`} />
              </div>
              <h3 className="font-display font-bold italic text-foreground mb-2 text-lg">{r.title}</h3>
              <p className="text-sm text-muted-foreground font-body mb-3">{r.abstract}</p>
              <div className="flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span key={t} className="mono-label px-2 py-0.5 border border-border text-muted-foreground text-[10px]">{t}</span>
                ))}
              </div>

              <AnimatePresence>
                {expanded === r.id && (r.methodology || r.findings || r.conclusions) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4 pt-4 border-t border-border"
                  >
                    {r.methodology && (
                      <div className="mb-3">
                        <h4 className="mono-label text-primary text-xs mb-1">Methodology</h4>
                        <p className="text-sm text-muted-foreground">{r.methodology}</p>
                      </div>
                    )}
                    {r.findings && (
                      <div className="mb-3">
                        <h4 className="mono-label text-primary text-xs mb-1">Findings</h4>
                        <p className="text-sm text-muted-foreground">{r.findings}</p>
                      </div>
                    )}
                    {r.conclusions && (
                      <div>
                        <h4 className="mono-label text-primary text-xs mb-1">Conclusions</h4>
                        <p className="text-sm text-muted-foreground">{r.conclusions}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
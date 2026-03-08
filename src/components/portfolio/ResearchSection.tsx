import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";
import { research } from "@/data/research";

const typeColors: Record<string, string> = {
  "Literature Review": "bg-primary/20 text-primary",
  "Experiment": "bg-secondary/20 text-secondary",
  "Mini Research": "bg-accent text-accent-foreground",
  "Dataset Analysis": "bg-muted text-muted-foreground",
};

const ResearchSection = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="research" className="py-24 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-12 text-center mx-auto block"
        >
          Research & Experiments
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {research.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card card-hover rounded-xl p-6 cursor-pointer"
              onClick={() => setExpanded(expanded === r.id ? null : r.id)}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className={`mono-label px-3 py-1 rounded-full text-xs ${typeColors[r.type]}`}>{r.type}</span>
                <ChevronDown size={18} className={`text-muted-foreground transition-transform ${expanded === r.id ? "rotate-180" : ""}`} />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground font-body mb-3">{r.abstract}</p>
              <div className="flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span key={t} className="mono-label px-2 py-0.5 rounded bg-muted text-muted-foreground text-[10px]">{t}</span>
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
                        <h4 className="font-mono text-xs text-primary mb-1">METHODOLOGY</h4>
                        <p className="text-sm text-muted-foreground">{r.methodology}</p>
                      </div>
                    )}
                    {r.findings && (
                      <div className="mb-3">
                        <h4 className="font-mono text-xs text-primary mb-1">FINDINGS</h4>
                        <p className="text-sm text-muted-foreground">{r.findings}</p>
                      </div>
                    )}
                    {r.conclusions && (
                      <div>
                        <h4 className="font-mono text-xs text-primary mb-1">CONCLUSIONS</h4>
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

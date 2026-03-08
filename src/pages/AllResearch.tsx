import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { research } from "@/data/research";
import { Link } from "react-router-dom";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";

const filters = ["All", "Mini Research", "Experiment", "Literature Review", "Dataset Analysis"] as const;

const AllResearch = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const filtered = activeFilter === "All" ? research : research.filter((r) => r.type === activeFilter);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <Link to="/#research" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body mb-8">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <h1 className="section-heading text-3xl md:text-4xl text-foreground mb-12">All Research & Experiments</h1>

          <div className="flex flex-wrap gap-3 mb-10 mt-8">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 text-sm font-body transition-all duration-300 border ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
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
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllResearch;

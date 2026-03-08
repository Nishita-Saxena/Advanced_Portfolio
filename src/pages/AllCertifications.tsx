import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ArrowLeft } from "lucide-react";
import { certifications } from "@/data/certifications";
import { Link } from "react-router-dom";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";

const filters = ["All", "Coursera", "Udemy", "Google", "DeepLearning.AI", "Other"] as const;

const AllCertifications = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filtered = activeFilter === "All"
    ? certifications
    : activeFilter === "Other"
      ? certifications.filter((c) => !["Coursera", "Udemy", "Google", "DeepLearning.AI"].some((p) => c.platform.toLowerCase().includes(p.toLowerCase()) || c.issuer.toLowerCase().includes(p.toLowerCase())))
      : certifications.filter((c) => c.platform.toLowerCase().includes(activeFilter.toLowerCase()) || c.issuer.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <Link to="/#certifications" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body mb-8">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <h1 className="section-heading text-3xl md:text-4xl text-foreground mb-12">All Certifications</h1>

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border card-hover flex items-start gap-4 p-5 relative"
                  style={{ boxShadow: "inset 0 1px 3px hsl(var(--border) / 0.5)" }}
                >
                  <div className="flex-shrink-0 w-12 h-12 border-2 border-primary flex items-center justify-center">
                    <span className="font-display font-bold text-primary text-lg">
                      {cert.platform.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-foreground text-sm leading-tight">{cert.name}</h3>
                      {cert.prestigious && <Award size={14} className="text-primary flex-shrink-0 mt-0.5" />}
                    </div>
                    <p className="text-xs text-muted-foreground font-body mt-1">{cert.issuer} — {cert.platform}</p>
                    <p className="mono-label text-muted-foreground text-[10px] mt-1">{cert.date}</p>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline font-body mt-2 inline-block hover:text-accent transition-colors">
                        View Certificate
                      </a>
                    )}
                  </div>
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

export default AllCertifications;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowLeft } from "lucide-react";
import { achievements } from "@/data/achievements";
import { Link } from "react-router-dom";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";

const filters = ["All", "Hackathons", "Competitions", "Awards"] as const;

const filterMap: Record<string, string[]> = {
  Hackathons: ["hackathon"],
  Competitions: ["kaggle", "coding", "competition"],
  Awards: ["paper", "award", "research"],
};

const AllAchievements = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filtered = activeFilter === "All"
    ? achievements
    : achievements.filter((a) => {
        const keywords = filterMap[activeFilter] || [];
        return keywords.some((k) => a.id.toLowerCase().includes(k) || a.title.toLowerCase().includes(k) || a.context.toLowerCase().includes(k));
      });

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <Link to="/#achievements" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body mb-8">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <h1 className="section-heading text-3xl md:text-4xl text-foreground mb-12">All Achievements</h1>

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
              {filtered.map((a, i) => (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border-l-[5px] border-l-primary border border-border p-6 card-hover"
                  style={{
                    backgroundImage: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted) / 0.3) 100%)",
                  }}
                >
                  <Trophy size={24} className="text-primary" />
                  <h3 className="font-display font-bold text-foreground mt-3 mb-1 text-lg">{a.title}</h3>
                  <p className="mono-label text-muted-foreground text-[10px] mb-2">{a.date}</p>
                  <p className="text-sm text-muted-foreground font-body">{a.description}</p>
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

export default AllAchievements;

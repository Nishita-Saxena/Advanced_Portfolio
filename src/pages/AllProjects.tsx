import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";

const filters = ["All", "Full Stack", "AI/ML", "Experiment"] as const;

const AllProjects = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="section-heading text-3xl md:text-4xl text-foreground mb-12">All Projects</h1>

          {/* Filters */}
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

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border-l-[3px] border-l-primary border border-border card-hover shimmer-hover overflow-hidden flex flex-col relative"
                >

                  <div className="h-40 relative bg-muted/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-bold text-muted-foreground/20 text-xl">{project.title}</span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2 flex-1">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.slice(0, 4).map((t) => (
                        <span key={t} className="mono-label px-2 py-0.5 border border-border text-muted-foreground text-[10px]">{t}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Live Demo">
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                          <Github size={16} />
                        </a>
                      )}
                      <Link
                        to={`/project/${project.id}`}
                        className="ml-auto text-sm font-body text-primary flex items-center gap-1 group relative"
                      >
                        Go Deeper
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12">
            <Link to="/#projects" className="glass-btn px-6 py-3 font-body inline-flex items-center gap-2">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllProjects;
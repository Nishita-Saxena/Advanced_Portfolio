import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const filters = ["All", "Full Stack", "AI/ML", "Experiment"] as const;

const categoryColors: Record<string, string> = {
  "AI/ML": "bg-primary/20 text-primary",
  "Full Stack": "bg-secondary/20 text-secondary",
  "Experiment": "bg-accent text-accent-foreground",
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative">
      <div className="violet-bloom w-[500px] h-[500px] right-0 bottom-0 absolute opacity-15" />
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-12 text-center mx-auto block"
        >
          Projects
        </motion.h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 mt-16">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setActiveFilter(f); setShowAll(false); }}
              className={`px-5 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeFilter === f
                  ? "gradient-btn"
                  : "glass-btn"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card card-hover shimmer-hover rounded-xl overflow-hidden flex flex-col"
              >
                {/* Thumbnail */}
                <div className="h-44 relative" style={{ background: `linear-gradient(135deg, hsl(255 90% 66% / 0.3), hsl(174 100% 42% / 0.2))` }}>
                  <span className={`absolute top-3 left-3 mono-label px-3 py-1 rounded-full text-xs ${categoryColors[project.category] || ""}`}>
                    {project.category}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-bold text-foreground/30 text-2xl">{project.title}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2 flex-1">{project.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((t) => (
                      <span key={t} className="mono-label px-2 py-0.5 rounded bg-muted text-muted-foreground text-[10px]">{t}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-auto">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="glass-btn p-2 rounded-lg" aria-label="Live Demo">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="glass-btn p-2 rounded-lg" aria-label="GitHub">
                        <Github size={16} />
                      </a>
                    )}
                    <Link
                      to={`/project/${project.id}`}
                      className="ml-auto gradient-btn px-4 py-2 rounded-lg text-sm font-body flex items-center gap-1 group"
                    >
                      Go Deeper
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > 6 && !showAll && (
          <div className="text-center mt-10">
            <button onClick={() => setShowAll(true)} className="glass-btn px-8 py-3 rounded-full font-body flex items-center gap-2 mx-auto">
              View All Projects <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const displayed = projects.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative section-bg-mesh">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-16"
        >
          Projects
        </motion.h2>

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
                className="bg-card border-l-[3px] border-l-primary border border-border card-hover shimmer-hover overflow-hidden flex flex-col relative"
              >
                {/* Diagonal category ribbon */}
                <div className="absolute top-0 right-0 z-10">
                  <div className="bg-primary text-primary-foreground mono-label text-[9px] px-4 py-1 transform translate-x-[20%] translate-y-[40%] rotate-45 origin-top-left">
                    {project.category}
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="h-40 relative bg-muted/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-bold text-muted-foreground/20 text-xl">{project.title}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2 flex-1">{project.description}</p>

                  {/* Tech tags — outlined, no fill */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((t) => (
                      <span key={t} className="mono-label px-2 py-0.5 border border-border text-muted-foreground text-[10px]">{t}</span>
                    ))}
                  </div>

                  {/* Actions */}
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

        {/* View All Projects button */}
        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 font-body font-semibold hover:bg-primary hover:text-primary-foreground transition-all group text-lg w-full sm:w-auto justify-center"
          >
            View All Projects
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
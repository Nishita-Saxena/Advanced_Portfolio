import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Clock, Users, Activity } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";

const ProjectDetail = () => {
  const { id } = useParams();
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/" className="glass-btn px-6 py-3 font-body inline-block">Back to Home</Link>
        </div>
      </div>
    );
  }

  const prev = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12">
        {/* Hero Banner */}
        <div className="h-64 md:h-80 relative flex items-end bg-muted/30">
          <div className="container mx-auto px-4 pb-8 relative z-10">
            <span className="mono-label text-primary text-[10px] mb-2 block">{project.category} — {project.date}</span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">{project.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-10">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="gradient-btn px-5 py-2 text-sm font-body flex items-center gap-2">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="glass-btn px-5 py-2 text-sm font-body flex items-center gap-2">
                <Github size={14} /> Source Code
              </a>
            )}
            <Link to="/#projects" className="glass-btn px-5 py-2 text-sm font-body flex items-center gap-2">
              <ArrowLeft size={14} /> All Projects
            </Link>
          </div>

          {/* Stats */}
          {(project.duration || project.team || project.status) && (
            <div className="flex flex-wrap gap-4 mb-10">
              {project.duration && (
                <div className="border border-border px-4 py-2 flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-primary" /> {project.duration}
                </div>
              )}
              {project.team && (
                <div className="border border-border px-4 py-2 flex items-center gap-2 text-sm">
                  <Users size={14} className="text-primary" /> {project.team}
                </div>
              )}
              {project.status && (
                <div className="border border-border px-4 py-2 flex items-center gap-2 text-sm">
                  <Activity size={14} className="text-primary" /> {project.status}
                </div>
              )}
            </div>
          )}

          {/* Overview */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="section-heading text-2xl text-foreground mb-4">What is this project?</h2>
                <p className="text-muted-foreground font-body mt-6 whitespace-pre-line">{project.longDescription}</p>
              </section>

              <section>
                <h2 className="section-heading text-2xl text-foreground mb-4">Why I Built This</h2>
                <p className="text-muted-foreground font-body mt-6">{project.whyBuilt}</p>
              </section>

              {project.learnings && project.learnings.length > 0 && (
                <section>
                  <h2 className="section-heading text-2xl text-foreground mb-4">What I Learned</h2>
                  <ul className="space-y-2 mt-6">
                    {project.learnings.map((l, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-muted-foreground font-body"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {l}
                      </motion.li>
                    ))}
                  </ul>
                </section>
              )}

              {project.challenges && project.challenges.length > 0 && (
                <section>
                  <h2 className="section-heading text-2xl text-foreground mb-4">Challenges & Solutions</h2>
                  <div className="space-y-4 mt-6">
                    {project.challenges.map((c, i) => (
                      <div key={i} className="bg-card border border-border p-5">
                        <p className="text-foreground font-body font-semibold mb-2">Problem: {c.problem}</p>
                        <p className="text-muted-foreground font-body">Solution: {c.solution}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {project.thinkingProcess && (
                <section>
                  <h2 className="section-heading text-2xl text-foreground mb-4">My Thinking Process</h2>
                  <p className="text-muted-foreground font-body mt-6">{project.thinkingProcess}</p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-card border border-border p-6 sticky top-28">
                <h3 className="font-display font-bold text-foreground mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span key={t} className="mono-label px-3 py-1 border border-border text-muted-foreground text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-6 mt-16 pt-8 border-t border-border">
            {prev ? (
              <Link to={`/project/${prev.id}`} className="border border-border p-5 card-hover group">
                <span className="mono-label text-muted-foreground text-[10px] flex items-center gap-1 mb-1">
                  <ArrowLeft size={12} /> Previous
                </span>
                <span className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{prev.title}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/project/${next.id}`} className="border border-border p-5 card-hover group text-right">
                <span className="mono-label text-muted-foreground text-[10px] flex items-center gap-1 justify-end mb-1">
                  Next <ArrowRight size={12} />
                </span>
                <span className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{next.title}</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetail;
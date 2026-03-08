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
          <Link to="/" className="glass-btn px-6 py-3 rounded-full font-body inline-block">Back to Home</Link>
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
        <div
          className="h-64 md:h-80 relative flex items-end"
          style={{ background: "linear-gradient(135deg, hsl(255 90% 66% / 0.3), hsl(174 100% 42% / 0.2))" }}
        >
          <div className="container mx-auto px-4 pb-8 relative z-10">
            <span className="mono-label text-primary text-xs mb-2 block">{project.category} • {project.date}</span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">{project.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-10">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="gradient-btn px-5 py-2 rounded-full text-sm font-body flex items-center gap-2">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="glass-btn px-5 py-2 rounded-full text-sm font-body flex items-center gap-2">
                <Github size={14} /> Source Code
              </a>
            )}
            <Link to="/#projects" className="glass-btn px-5 py-2 rounded-full text-sm font-body flex items-center gap-2">
              <ArrowLeft size={14} /> All Projects
            </Link>
          </div>

          {/* Stats */}
          {(project.duration || project.team || project.status) && (
            <div className="flex flex-wrap gap-4 mb-10">
              {project.duration && (
                <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-primary" /> {project.duration}
                </div>
              )}
              {project.team && (
                <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                  <Users size={14} className="text-primary" /> {project.team}
                </div>
              )}
              {project.status && (
                <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 text-sm">
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
                <p className="text-muted-foreground font-body leading-relaxed mt-6 whitespace-pre-line">{project.longDescription}</p>
              </section>

              <section>
                <h2 className="section-heading text-2xl text-foreground mb-4">Why I Built This</h2>
                <p className="text-muted-foreground font-body leading-relaxed mt-6">{project.whyBuilt}</p>
              </section>

              {/* Learnings */}
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

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <section>
                  <h2 className="section-heading text-2xl text-foreground mb-4">Challenges & Solutions</h2>
                  <div className="space-y-4 mt-6">
                    {project.challenges.map((c, i) => (
                      <div key={i} className="glass-card p-5 rounded-xl">
                        <p className="text-foreground font-body font-semibold mb-2">🔴 {c.problem}</p>
                        <p className="text-muted-foreground font-body">✅ {c.solution}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {project.thinkingProcess && (
                <section>
                  <h2 className="section-heading text-2xl text-foreground mb-4">My Thinking Process</h2>
                  <p className="text-muted-foreground font-body leading-relaxed mt-6">{project.thinkingProcess}</p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card p-6 rounded-xl sticky top-28">
                <h3 className="font-display font-bold text-foreground mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span key={t} className="skill-chip text-sm">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-6 mt-16 pt-8 border-t border-border">
            {prev ? (
              <Link to={`/project/${prev.id}`} className="glass-card p-5 rounded-xl card-hover group">
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1 mb-1">
                  <ArrowLeft size={12} /> Previous
                </span>
                <span className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{prev.title}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/project/${next.id}`} className="glass-card p-5 rounded-xl card-hover group text-right">
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1 justify-end mb-1">
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

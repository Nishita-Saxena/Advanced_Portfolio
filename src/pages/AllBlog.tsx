import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Link } from "react-router-dom";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";

const filters = ["All", "AI", "ML", "Dev", "Personal"] as const;

const AllBlog = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filtered = activeFilter === "All" ? blogPosts : blogPosts.filter((p) => p.category === activeFilter);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <Link to="/#blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body mb-8">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <h1 className="section-heading text-3xl md:text-4xl text-foreground mb-12">All Blog Posts</h1>

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
              {filtered.map((post, i) => (
                <motion.a
                  key={post.id}
                  layout
                  href={post.externalUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border card-hover overflow-hidden group block"
                >
                  <div className="h-32 bg-muted/30" />
                  <div className="p-6">
                    <span className="mono-label text-primary text-xs font-bold">{post.category}</span>
                    <h3 className="font-display font-bold text-xl text-foreground mt-2 mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-primary font-body group">
                        Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                      <span className="mono-label text-muted-foreground text-[10px] flex items-center gap-1">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllBlog;

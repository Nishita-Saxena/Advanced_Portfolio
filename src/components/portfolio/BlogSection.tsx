import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="blog" className="py-24 relative section-bg-blog">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-16"
        >
          Blog
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {blogPosts.slice(0, 3).map((post, i) => (
            <motion.a
              key={post.id}
              href={post.externalUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border card-hover overflow-hidden group block"
            >
              {/* Cover — subtle gradient */}
              <div className="h-32 bg-muted/30" />
              <div className="p-6">
                {/* Category — large bold */}
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
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 font-body font-semibold hover:bg-primary hover:text-primary-foreground transition-all group text-lg w-full sm:w-auto justify-center"
          >
            View All Posts
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
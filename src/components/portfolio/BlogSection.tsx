import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

const catColors: Record<string, string> = {
  AI: "bg-primary/20 text-primary",
  ML: "bg-secondary/20 text-secondary",
  Dev: "bg-accent text-accent-foreground",
  Personal: "bg-muted text-muted-foreground",
};

const BlogSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-12 text-center mx-auto block"
        >
          Blog
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.externalUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card card-hover shimmer-hover rounded-xl overflow-hidden group block"
            >
              {/* Cover */}
              <div className="h-40" style={{ background: `linear-gradient(135deg, hsl(255 90% 66% / 0.2), hsl(174 100% 42% / 0.15))` }} />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`mono-label px-2 py-0.5 rounded-full text-[10px] ${catColors[post.category]}`}>{post.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground font-body mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-sm text-primary font-body">
                  Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

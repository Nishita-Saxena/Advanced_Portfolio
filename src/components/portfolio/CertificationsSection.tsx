import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award } from "lucide-react";
import { certifications } from "@/data/certifications";

const CertificationsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certifications" className="py-24 relative section-bg-certifications">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-16"
        >
          Certifications
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border card-hover flex items-start gap-4 p-5 relative"
              style={{ boxShadow: "inset 0 1px 3px hsl(var(--border) / 0.5)" }}
            >
              {/* Left: platform initial */}
              <div className="flex-shrink-0 w-12 h-12 border-2 border-primary flex items-center justify-center">
                <span className="font-display font-bold text-primary text-lg">
                  {cert.platform.charAt(0)}
                </span>
              </div>

              {/* Right: details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-foreground text-sm leading-tight">{cert.name}</h3>
                  {cert.prestigious && <Award size={14} className="text-primary flex-shrink-0 mt-0.5" />}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1">{cert.issuer} — {cert.platform}</p>
                <p className="mono-label text-muted-foreground text-[10px] mt-1">{cert.date}</p>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline font-body mt-2 inline-block hover:text-accent transition-colors"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Award } from "lucide-react";
import { certifications } from "@/data/certifications";

const CertificationsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certifications" className="py-24 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-12 text-center mx-auto block"
        >
          Certifications
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="glass-card card-hover rounded-xl p-6 relative overflow-hidden"
            >
              {cert.prestigious && (
                <div className="absolute top-3 right-3">
                  <Award size={18} className="text-primary" />
                </div>
              )}
              <div className="mono-label text-muted-foreground text-xs mb-2">{cert.platform}</div>
              <h3 className="font-display font-bold text-foreground mb-1">{cert.name}</h3>
              <p className="text-sm text-muted-foreground font-body mb-1">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground font-mono mb-4">{cert.date}</p>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn px-4 py-2 rounded-lg text-sm font-body inline-flex items-center gap-2"
                >
                  View Certificate <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;

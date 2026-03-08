import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { education } from "@/data/education";

const EducationSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="py-24 relative section-bg-education">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-16"
        >
          Education
        </motion.h2>

        <div className="relative mt-8 max-w-2xl mx-auto">
          {/* Timeline line — dashed */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0 border-l-2 border-dashed border-primary/40"
          />

          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2 }}
              className={`relative flex items-start gap-6 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot — larger, filled with gradient */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary z-10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
              </div>

              {/* Card — minimal, no border */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <div className="py-4">
                  <span className="mono-label text-primary text-[10px]">{edu.duration}</span>
                  <h3 className="font-display font-bold text-foreground mt-1 text-lg">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground font-body mt-1">{edu.degree}</p>
                  {edu.grade && <p className="text-sm text-muted-foreground font-body mt-1">Grade: {edu.grade}</p>}
                  <div className={`flex flex-wrap gap-1.5 mt-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    {edu.highlights.map((h) => (
                      <span key={h} className="mono-label px-2 py-0.5 border border-border text-muted-foreground text-[10px]">{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
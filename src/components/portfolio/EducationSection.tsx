import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { education } from "@/data/education";

const EducationSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-12 text-center mx-auto block"
        >
          Education
        </motion.h2>

        <div className="relative mt-16 max-w-2xl mx-auto">
          {/* Timeline line */}
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.5 }}
            className="absolute left-6 md:left-1/2 top-0 w-0.5 origin-top"
            style={{ background: "linear-gradient(180deg, hsl(255, 90%, 66%), hsl(174, 100%, 42%))" }}
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
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_16px_rgba(123,94,248,0.5)] z-10" />

              {/* Card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <div className="glass-card p-5 rounded-xl">
                  <span className="mono-label text-primary text-xs">{edu.duration}</span>
                  <h3 className="font-display font-bold text-foreground mt-1">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground font-body mt-1">{edu.degree}</p>
                  {edu.grade && <p className="text-sm text-muted-foreground font-body mt-1">Grade: {edu.grade}</p>}
                  <div className={`flex flex-wrap gap-1.5 mt-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    {edu.highlights.map((h) => (
                      <span key={h} className="mono-label px-2 py-0.5 rounded bg-muted text-muted-foreground text-[10px]">{h}</span>
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

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillCategories } from "@/data/skills";

const SkillsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative section-bg-skills">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-16"
        >
          Technical Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 mt-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.1 }}
            >
              <h3 className="mono-label text-primary mb-4 pb-2 border-b border-border">
                {cat.category}
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-center gap-2 py-1.5 cursor-default"
                  >
                    <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-primary transition-colors flex-shrink-0" />
                    <span className="text-sm font-body text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
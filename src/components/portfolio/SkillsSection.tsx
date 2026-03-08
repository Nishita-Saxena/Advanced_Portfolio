import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillCategories } from "@/data/skills";

const levelDots = (level: number) => (
  <div className="flex gap-1">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className={`w-1.5 h-1.5 rounded-full ${
          i <= level ? "bg-primary" : "bg-muted"
        }`}
      />
    ))}
  </div>
);

const SkillsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative">
      <div className="violet-bloom w-[600px] h-[600px] -left-60 top-20 absolute opacity-15" />
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-12 text-center mx-auto block"
        >
          Technical Skills
        </motion.h2>

        <div className="space-y-10 mt-16">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.1 }}
            >
              <h3 className="mono-label text-primary mb-4">{cat.category}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: catIdx * 0.1 + i * 0.05 }}
                    className="skill-chip group relative"
                    title={skill.projectCount ? `Used in ${skill.projectCount} projects` : undefined}
                  >
                    <span className="font-mono text-sm text-foreground">{skill.name}</span>
                    {levelDots(skill.level)}
                  </motion.div>
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

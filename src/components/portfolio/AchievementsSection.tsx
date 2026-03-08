import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Trophy } from "lucide-react";
import { achievements, achievementStats } from "@/data/achievements";

const tierColors: Record<string, string> = {
  gold: "text-yellow-400",
  silver: "text-gray-400",
  bronze: "text-amber-600",
};

function Counter({ target, inView }: { target: number; inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration: 2 });
    }
  }, [inView, target, count]);

  return <motion.span>{rounded}</motion.span>;
}

const AchievementsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="achievements" className="py-24 relative">
      <div className="violet-bloom w-[500px] h-[500px] -left-40 bottom-0 absolute opacity-15" />
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-heading text-3xl md:text-4xl text-foreground mb-12 text-center mx-auto block"
        >
          Achievements
        </motion.h2>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-16 mb-12 mt-16">
          {[
            { label: "Hackathons", value: achievementStats.hackathons },
            { label: "Competitions", value: achievementStats.competitions },
            { label: "Awards", value: achievementStats.awards },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text">
                <Counter target={stat.value} inView={inView} />
              </div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Cards — horizontal scroll on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card card-hover rounded-xl p-6 min-w-[280px] snap-center flex-shrink-0 md:min-w-0"
            >
              <Trophy size={24} className={tierColors[a.tier || "gold"]} />
              <h3 className="font-display font-bold text-foreground mt-3 mb-1">{a.title}</h3>
              <p className="text-xs text-muted-foreground font-mono mb-2">{a.date}</p>
              <p className="text-sm text-muted-foreground font-body">{a.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;

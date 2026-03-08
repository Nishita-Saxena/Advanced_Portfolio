import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  progress: number; // 0–100
}

const ScrollProgress = ({ progress }: Props) => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-1 z-50 hidden lg:block">
      <motion.div
        className="w-full origin-top"
        style={{
          height: `${progress}%`,
          background: "linear-gradient(180deg, hsl(255, 90%, 66%), hsl(174, 100%, 42%))",
        }}
      />
    </div>
  );
};

export default ScrollProgress;

import { motion } from "framer-motion";

interface Props {
  progress: number;
}

const ScrollProgress = ({ progress }: Props) => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-1 z-50 hidden lg:block">
      <motion.div
        className="w-full origin-top bg-primary"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
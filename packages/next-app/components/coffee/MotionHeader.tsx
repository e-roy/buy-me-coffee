import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  offscreen: {
    y: 0,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8,
    },
  },
};

interface MotionHeaderProps {
  children: React.ReactNode;
}

export const MotionHeader = ({ children }: MotionHeaderProps) => {
  return (
    <motion.div
      className=""
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div className="" variants={cardVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
};

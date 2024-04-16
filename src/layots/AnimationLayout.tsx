import React from "react";
import { motion } from "framer-motion";

import { AnimationLayoutProps } from "../data/declarations";

const animations = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.94 },
};

const AnimationLayout: React.FC<AnimationLayoutProps> = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.34 }}
      style={{ display: "grid" }}
    >
      {children}
    </motion.div>
  );
};
export default AnimationLayout;

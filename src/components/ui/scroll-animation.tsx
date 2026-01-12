import { ReactNode, useRef } from "react";
import { motion, useInView, Variant } from "framer-motion";

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

const animations: Record<AnimationType, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

export const ScrollAnimation = ({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for animating multiple children
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  duration?: number;
}

export const StaggerItem = ({
  children,
  className = "",
  animation = "fadeUp",
  duration = 0.5,
}: StaggerItemProps) => {
  return (
    <motion.div
      className={className}
      variants={animations[animation]}
      transition={{
        duration,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

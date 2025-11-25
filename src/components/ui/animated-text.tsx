import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export const AnimatedText = ({ words, className = "" }: AnimatedTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const animatedWords = useMemo(() => words, [words]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentIndex === animatedWords.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [currentIndex, animatedWords]);

  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      {animatedWords.map((word, index) => (
        <motion.span
          key={index}
          className="absolute font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          animate={
            currentIndex === index
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {
                  y: currentIndex > index ? -100 : 100,
                  opacity: 0,
                }
          }
        >
          {word}
        </motion.span>
      ))}
      {/* Invisible placeholder to maintain space */}
      <span className="invisible font-bold">
        {animatedWords[0]}
      </span>
    </span>
  );
};
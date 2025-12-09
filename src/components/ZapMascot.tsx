import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import zapMascot from '@/assets/zap-mascot.png';

const ZapMascot = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();
  
  // Bounce animation based on scroll
  const bounce = useTransform(scrollY, [0, 100], [0, 10]);
  
  // Different positions for different scroll ranges
  const [position, setPosition] = useState({ side: 'right', top: 200 });
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Change sides based on scroll position to "accompany" user through sections
      if (scrollPosition < viewportHeight) {
        setPosition({ side: 'right', top: 200 });
      } else if (scrollPosition < viewportHeight * 2) {
        setPosition({ side: 'left', top: 300 });
      } else if (scrollPosition < viewportHeight * 3) {
        setPosition({ side: 'right', top: 250 });
      } else if (scrollPosition < viewportHeight * 4) {
        setPosition({ side: 'left', top: 350 });
      } else {
        setPosition({ side: 'right', top: 280 });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed z-50 hidden lg:block pointer-events-none ${
        position.side === 'right' ? 'right-4' : 'left-4'
      }`}
      style={{ top: position.top }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.side === 'right' ? 0 : 0,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        duration: 0.5 
      }}
    >
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, -3, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-75" />
        
        {/* Mascot image */}
        <img 
          src={zapMascot} 
          alt="Zap - Mascote da Zapfy" 
          className="w-24 h-auto drop-shadow-2xl"
        />
        
        {/* Speech bubble that appears randomly */}
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-xl px-3 py-2 shadow-lg whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 8,
          }}
        >
          <span className="text-xs font-semibold text-primary">⚡ Aprenda comigo!</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ZapMascot;

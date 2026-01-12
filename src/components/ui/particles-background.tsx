import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  shape: "circle" | "square" | "triangle";
}

interface ParticlesBackgroundProps {
  particleCount?: number;
  className?: string;
}

const colors = [
  "hsl(var(--primary) / 0.4)",
  "hsl(var(--secondary) / 0.4)",
  "hsl(var(--accent) / 0.3)",
  "hsl(var(--primary) / 0.25)",
  "hsl(var(--secondary) / 0.3)",
];

const shapes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];

export const ParticlesBackground = ({ 
  particleCount = 30,
  className = "" 
}: ParticlesBackgroundProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      generatedParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }
    
    setParticles(generatedParticles);
  }, [particleCount]);

  const renderShape = (particle: Particle) => {
    const baseStyle = {
      backgroundColor: particle.shape !== "triangle" ? particle.color : "transparent",
      borderColor: particle.shape === "triangle" ? particle.color : undefined,
    };

    if (particle.shape === "circle") {
      return (
        <div
          className="rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            ...baseStyle,
          }}
        />
      );
    }

    if (particle.shape === "square") {
      return (
        <div
          className="rotate-45"
          style={{
            width: particle.size,
            height: particle.size,
            ...baseStyle,
          }}
        />
      );
    }

    // Triangle
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${particle.size / 2}px solid transparent`,
          borderRight: `${particle.size / 2}px solid transparent`,
          borderBottom: `${particle.size}px solid ${particle.color}`,
        }}
      />
    );
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ 
            opacity: 0,
            y: 0,
            x: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{ 
            opacity: [0, 0.8, 0.6, 0.8, 0],
            y: [0, -30, -60, -30, 0],
            x: [0, 15, -10, 20, 0],
            scale: [0, 1, 1.1, 0.9, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderShape(particle)}
        </motion.div>
      ))}
    </div>
  );
};

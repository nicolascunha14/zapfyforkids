import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import AccessFormModal from '@/components/AccessFormModal';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { ParticlesBackground } from '@/components/ui/particles-background';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const descY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleAccessClick = () => {
    navigate('/waitlist');
  };

  return (
    <div ref={containerRef} className="relative">
      <AuroraBackground className="min-h-screen relative overflow-hidden">
        {/* Subtle particles effect */}
        <ParticlesBackground particleCount={25} className="z-10" />
        
        <div className="container-zapfy section-padding relative z-20">
          <motion.div 
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            style={{ opacity }}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-center gap-2 text-primary mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={{ y: subtitleY }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="font-montserrat font-semibold text-sm uppercase tracking-wide">
                    Educação Financeira que Transforma
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-8xl font-montserrat font-bold leading-tight text-center tracking-tight mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                  style={{ y: titleY }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                    Seu Filho Vai Pedir
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground/90 to-secondary">
                    Pra Aprender Sobre Dinheiro
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                  style={{ y: descY }}
                >
                  Ensine educação financeira do jeito certo: brincando, em família e sem complicação. 
                  Transforme o futuro do seu filho enquanto ele se diverte como nunca.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ y: buttonY }}
              >
                <button onClick={handleAccessClick} className="btn-hero group flex items-center justify-center">
                  Quero Ajudar Meu Filho a Aprender Brincando
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <span>+10.000 famílias já transformando vidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span>Gratuito para escolas públicas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>De 7 a 14 anos</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{ opacity }}
        >
          <span className="text-xs text-muted-foreground font-medium">Role para explorar</span>
          <motion.div 
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
        
        <AccessFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </AuroraBackground>
    </div>
  );
};

export default HeroSection;
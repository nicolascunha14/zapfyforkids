import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import AccessFormModal from '@/components/AccessFormModal';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { ParticlesBackground } from '@/components/ui/particles-background';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
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
    setIsNavigating(true);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate('/waitlist');
    }, 600);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Transition overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <motion.p
                className="text-lg font-montserrat font-medium text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Preparando seu acesso...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuroraBackground className="min-h-screen relative overflow-hidden">
        {/* Subtle particles effect */}
        <ParticlesBackground particleCount={50} className="z-10" />
        
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
                  Missões práticas de 5 minutos que você faz COM seu filho. Aprende finanças brincando. Sem você virar professor.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ y: buttonY }}
              >
                <motion.button 
                  onClick={handleAccessClick} 
                  className="btn-hero group flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isNavigating}
                >
                  Começar Grátis Agora
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-secondary">✓</span> Sem cartão de crédito
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-secondary">✓</span> Primeira missão em 2 minutos
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-secondary">✓</span> Funciona em qualquer celular
                </span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <span>✨</span>
                  <span>10.347 famílias já começaram</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📚</span>
                  <span>Usado em 234 escolas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>Crianças de 7 a 15 anos</span>
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
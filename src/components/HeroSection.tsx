import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessFormModal from '@/components/AccessFormModal';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { AnimatedText } from '@/components/ui/animated-text';
const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleAccessClick = () => {
    navigate('/waitlist');
  };
  return <AuroraBackground className="min-h-screen relative overflow-hidden">
      {/* Floating elements */}
      
      
      
      
      <div className="container-zapfy section-padding relative z-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-montserrat font-semibold text-sm uppercase tracking-wide">
                  Educação Financeira que Transforma
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-montserrat font-bold leading-tight text-center tracking-tight mb-6 md:mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                  Seu Filho Vai Pedir
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground/90 to-secondary">
                  Pra Aprender Sobre Dinheiro
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4 mb-8">
                Ensine educação financeira do jeito certo: brincando, em família e sem complicação. 
                Transforme o futuro do seu filho enquanto ele se diverte como nunca.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleAccessClick} className="btn-hero group flex items-center justify-center">
                Quero Ajudar Meu Filho a Aprender Brincando
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground mt-4">
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
            </div>
          </div>
        </div>
      </div>
      
      <AccessFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AuroraBackground>;
};
export default HeroSection;
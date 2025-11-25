import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessFormModal from '@/components/AccessFormModal';
import AskQuestionModal from '@/components/AskQuestionModal';
import { BackgroundBeams } from '@/components/ui/background-beams';
const CtaSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleAccessClick = () => {
    navigate('/waitlist');
  };
  const handleQuestionClick = () => {
    setIsQuestionModalOpen(true);
  };
  const benefits = ['100% digital e gamificado', 'Funciona em qualquer dispositivo', 'Primeiras lições grátis', 'Cancele quando quiser'];
  return <section className="section-padding hero-gradient text-white relative overflow-hidden">
      {/* Enhanced Aurora background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/20 rounded-full float-animation" />
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/15 rounded-full pulse-slow" />
      <div className="absolute top-40 right-1/4 w-12 h-12 bg-accent/20 rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-40 left-1/3 w-6 h-6 bg-secondary/30 rounded-full blur-xs float-animation" />
      
      <div className="container-zapfy relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="font-montserrat font-semibold text-sm uppercase tracking-wide opacity-90">
                Transforme o Futuro Financeiro do Seu Filho
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold leading-tight text-primary lg:text-5xl">
              Está na Hora de{' '}
              <span className="bg-white/90 text-primary px-2 py-1 rounded-lg inline-block">
                Transformar
              </span>{' '}
              o Futuro!
            </h2>
            
            <p className="text-lg md:text-xl opacity-95 leading-relaxed max-w-2xl mx-auto text-foreground/90">
              Junte-se a mais de 10.000 famílias que já deram o primeiro passo para criar 
              filhos financeiramente conscientes, preparados e confiantes. A jornada começa agora!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => <div key={index} className="flex items-center gap-3 text-left">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="opacity-90 text-black">{benefit}</span>
              </div>)}
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleAccessClick} className="relative overflow-hidden bg-white text-primary font-montserrat font-bold px-8 py-4 rounded-full shadow-[var(--shadow-floating)] hover:shadow-[var(--shadow-card)] transform hover:scale-105 transition-[var(--transition-bounce)] group">
                <BackgroundBeams className="absolute inset-0 opacity-20" />
                <span className="relative z-10 flex items-center justify-center">
                  Começar Agora Gratuitamente
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button onClick={handleQuestionClick} className="border-2 border-white/30 bg-white/10 backdrop-blur-sm font-montserrat px-6 py-3 rounded-full hover:bg-white/20 transition-all font-semibold text-primary-foreground">
                Tire Suas Dúvidas
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-base text-primary-foreground">Acesso imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-primary-foreground">Sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-primary-foreground">Comece grátis</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{
                animationDelay: `${i * 0.3}s`
              }} />)}
              </div>
              <span className="font-montserrat font-semibold text-primary-foreground">
                🎁 Bônus Exclusivo de Lançamento
              </span>
            </div>
            <p className="text-sm opacity-95 text-primary-foreground">
              As primeiras <strong>100 famílias</strong> ganham acesso vitalício ao conteúdo premium + 
              sessão de orientação com especialista em educação financeira infantil (valor R$ 297)
            </p>
          </div>
        </div>
      </div>
      
      <AccessFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AskQuestionModal isOpen={isQuestionModalOpen} onClose={() => setIsQuestionModalOpen(false)} />
    </section>;
};
export default CtaSection;
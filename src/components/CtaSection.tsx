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
  const benefits = ['Plataforma 100% gamificada', 'Conteúdo alinhado à BNCC', 'Relatórios para os pais', 'Sem riscos financeiros'];
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
            
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold leading-tight text-[#0f0f0f] lg:text-5xl">
              Pronto para começar a{' '}
              <span className="bg-white/90 text-primary px-2 py-1 rounded-lg text-2xl md:text-5xl">
                jornada
              </span>{' '}
              financeira?
            </h2>
            
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto text-black">
              Junte-se às centenas de famílias que já estão preparando seus filhos 
              para um futuro financeiramente consciente e bem-sucedido.
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
                <span className="relative z-10">Entre para a Lista de Espera</span>
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
              
              <button onClick={handleQuestionClick} className="border-2 border-white/30 bg-white/10 backdrop-blur-sm font-montserrat px-6 py-3 rounded-full hover:bg-white/20 transition-all font-semibold text-zinc-950">
                Alguma Dúvida?
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-base text-zinc-950">Sem taxas ocultas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-zinc-950">Suporte dedicado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-[#010101]">Resultados garantidos</span>
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
              <span className="font-montserrat font-semibold text-zinc-950">
                Oferta Especial de Lançamento
              </span>
            </div>
            <p className="text-sm opacity-90 text-zinc-950">
              Primeiras 100 famílias ganham <strong>1 mês grátis</strong> + 
              consultoria personalizada com especialista em educação financeira
            </p>
          </div>
        </div>
      </div>
      
      <AccessFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AskQuestionModal isOpen={isQuestionModalOpen} onClose={() => setIsQuestionModalOpen(false)} />
    </section>;
};
export default CtaSection;
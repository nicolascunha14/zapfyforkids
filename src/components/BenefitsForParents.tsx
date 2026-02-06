import { BarChart3, Heart, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SectionCarousel } from '@/components/ui/SectionCarousel';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

const BenefitsForParents = () => {
  const navigate = useNavigate();
  const benefits = [{
    icon: <Heart className="w-7 h-7 text-white" />,
    title: 'Momentos em Família',
    description: '"Papai, vamos fazer a missão?" Missões de 5 minutos que vocês fazem juntos. Não é obrigação. É diversão com propósito.'
  }, {
    icon: <BarChart3 className="w-7 h-7 text-white" />,
    title: 'Você Também Aprende',
    description: 'Dicas exclusivas para pais em cada missão. "Como falar de dinheiro sem criar trauma" e "Respostas para perguntas que você não esperava".'
  }, {
    icon: <Smartphone className="w-7 h-7 text-white" />,
    title: 'Progresso Visível',
    description: 'Dashboard para pais. Veja em tempo real: conceitos aprendidos, missões completadas, áreas de melhoria.'
  }];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle Aurora orbs */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-xl float-animation" />
      <div className="absolute bottom-1/3 right-20 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-lg animate-pulse" />
      <div className="absolute top-2/3 left-1/4 w-12 h-12 bg-gradient-to-br from-secondary/15 to-transparent rounded-full blur-md pulse-slow" />
      
      <div className="container-zapfy relative z-10">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="text-center space-y-6 mb-16">
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  5 Minutos Por Dia.
                </span>{' '}
                Pais e Filhos Juntos.
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <strong>9 de 10 pais</strong> dizem que fazer missões com os filhos fortaleceu a relação familiar.
                <br /><br />
                Na Zapfy, você não dá aula. Você participa da aventura.
              </p>
            </StaggerItem>
          </StaggerContainer>
          
          <ScrollAnimation animation="scale" delay={0.1}>
            <SectionCarousel items={benefits} />
          </ScrollAnimation>
          
          <div className="mt-16">
            
          </div>
          
          <div className="mt-16 space-y-8">
            <ScrollAnimation animation="fadeUp" delay={0.2}>
              <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20 max-w-2xl mx-auto">
                <p className="text-base text-muted-foreground italic mb-3">
                  "Meu filho de 10 anos me perguntou se vale a pena comprar um brinquedo parcelado. 
                  Fiquei em choque!"
                </p>
                <p className="text-sm font-montserrat font-semibold text-primary">
                  — Paula, após 3 semanas
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fadeUp" delay={0.3}>
              <div className="text-center">
                <button onClick={() => navigate('/waitlist')} className="btn-hero group flex items-center justify-center mx-auto">
                  Experimentar Ensinar Junto
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="scale" delay={0.4}>
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-6 py-3 rounded-full">
                  <span className="text-lg">💚</span>
                  <span className="font-montserrat font-semibold">
                    95% dos pais notam mudanças em menos de 1 mês
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  (Pesquisa com 847 famílias, Dez/2025)
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsForParents;
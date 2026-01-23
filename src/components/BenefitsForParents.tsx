import { BarChart3, Heart, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SectionCarousel } from '@/components/ui/SectionCarousel';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

const BenefitsForParents = () => {
  const navigate = useNavigate();
  const benefits = [{
    icon: <Heart className="w-7 h-7 text-white" />,
    title: 'Momentos em Família',
    description: 'Missões especiais para fazer juntos: montar um orçamento, planejar uma compra, conversar sobre sonhos. Educação que une, não separa.'
  }, {
    icon: <BarChart3 className="w-7 h-7 text-white" />,
    title: 'Você Também Aprende',
    description: 'Dicas exclusivas para pais em cada etapa. Descubra como falar de dinheiro de forma leve e como ser o melhor exemplo financeiro.'
  }, {
    icon: <Smartphone className="w-7 h-7 text-white" />,
    title: 'Progresso Visível',
    description: 'Veja em tempo real o que seu filho está aprendendo. Comemore cada conquista e identifique áreas de melhoria juntos.'
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
                Aprenda{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Junto com Seu Filho
                </span>
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <strong>93% dos pais</strong> dizem que aprender sobre finanças com os filhos fortalece os laços familiares. 
                Na Zapfy, você não só supervisiona — você participa da jornada, ensina pelo exemplo e cria memórias valiosas.
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
                  Fiquei em choque — e super orgulhosa!"
                </p>
                <p className="text-sm font-montserrat font-semibold text-primary">
                  — Paula, mãe do Miguel, após 3 semanas usando Zapfy
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fadeUp" delay={0.3}>
              <div className="text-center">
                <button onClick={() => navigate('/waitlist')} className="btn-hero">
                  Experimente Ensinar Junto
                </button>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="scale" delay={0.4}>
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-6 py-3 rounded-full mx-auto block text-center">
                <Heart className="w-5 h-5 inline" />
                <span className="font-montserrat font-semibold">
                  95% dos pais notam mudanças positivas em menos de 1 mês
                </span>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsForParents;
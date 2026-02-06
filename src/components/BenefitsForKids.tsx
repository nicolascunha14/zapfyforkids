import { Gamepad2, Clock, Gift } from 'lucide-react';
import kidsLearningImage from '@/assets/kids-learning-finance.jpg';
import { SectionCarousel } from '@/components/ui/SectionCarousel';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

const BenefitsForKids = () => {
  const benefits = [
    {
      icon: <Gamepad2 className="w-6 h-6 text-white" />,
      title: 'É Como um Videogame!',
      description: '🎮 Missões progressivas (do fácil ao desafiante) ⚔️ Desafios com tempo limite 🏆 Conquistas desbloqueáveis. Exemplo: "Economize R$50 em 30 dias"'
    },
    {
      icon: <Gift className="w-6 h-6 text-white" />,
      title: 'Conquistas e Badges',
      description: '🥇 Cada missão completada = pontos + badge 🔥 Sequência de dias (streak): "7 dias seguidos!" ⭐ Badges especiais: "Investidor Junior". Motivação natural. Sem forçar.'
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: 'Aprende no Seu Ritmo',
      description: '⏱️ Cada missão = 5 minutos 📅 Faz quando quiser (sem pressão) 🎯 3 níveis de dificuldade (7-9, 10-12, 13-15 anos). Aprende brincando. Sem perceber.'
    }
  ];

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 blur-2xl" />
      <div className="absolute top-1/3 right-0 w-40 h-40 bg-gradient-to-l from-secondary/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-28 h-28 bg-gradient-to-r from-primary/8 to-transparent rounded-full blur-2xl float-animation" />
      
      <div className="container-zapfy relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            <StaggerContainer className="space-y-6 text-center">
              <StaggerItem>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold px-4">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Parece Jogo.
                  </span>{' '}
                  É Educação Financeira de Verdade.
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-base text-muted-foreground leading-relaxed px-4">
                  Missões como: "Calcule o troco na padaria"<br />
                  Badges como: "Mestre do Orçamento"<br />
                  Ranking: Compete com amigos (quem economiza mais?)<br /><br />
                  É tão divertido que seu filho pede para fazer mais.<br />
                  E aprende finanças de verdade enquanto joga.
                </p>
              </StaggerItem>
            </StaggerContainer>
            
            <ScrollAnimation animation="scale" className="px-4">
              <SectionCarousel items={benefits} />
            </ScrollAnimation>
            
            <ScrollAnimation animation="fadeUp" delay={0.2} className="mx-4">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">📊</span>
                  <span className="text-sm font-montserrat font-semibold text-primary">
                    Crianças ficam 15 minutos por dia no Zapfy
                  </span>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-medium">Compare:</p>
                  <p>TikTok = 52 minutos/dia de entretenimento</p>
                  <p><strong>Zapfy = 15 minutos/dia de aprendizado real</strong></p>
                  <p className="mt-3 font-semibold text-primary">E ELE pede para fazer mais.</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-8 col-span-2">
              <StaggerContainer className="space-y-6">
                <StaggerItem>
                  <h2 className="text-3xl md:text-4xl font-montserrat font-bold">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Parece Jogo.
                    </span>{' '}
                    É Educação Financeira de Verdade.
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Missões como: "Calcule o troco na padaria"<br />
                    Badges como: "Mestre do Orçamento"<br />
                    Ranking: Compete com amigos (quem economiza mais?)<br /><br />
                    É tão divertido que seu filho pede para fazer mais.<br />
                    E aprende finanças de verdade enquanto joga.
                  </p>
                </StaggerItem>
              </StaggerContainer>
              
              <ScrollAnimation animation="scale" delay={0.1}>
                <SectionCarousel items={benefits} />
              </ScrollAnimation>
              
              <ScrollAnimation animation="fadeUp" delay={0.2}>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 mx-auto max-w-md">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-lg">📊</span>
                    <span className="text-sm font-montserrat font-semibold text-primary">
                      Crianças ficam 15 minutos por dia no Zapfy
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p className="font-medium">Compare:</p>
                    <p>TikTok = 52 minutos/dia de entretenimento</p>
                    <p><strong>Zapfy = 15 minutos/dia de aprendizado real</strong></p>
                    <p className="mt-3 font-semibold text-primary">E ELE pede para fazer mais.</p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            
            <ScrollAnimation animation="fadeRight" delay={0.3}>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-floating)]">
                  <img 
                    src={kidsLearningImage}
                    alt="Crianças aprendendo educação financeira de forma divertida"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
                </div>
                
                {/* Floating game elements */}
                <div className="absolute -top-4 -right-4 bg-accent card-zapfy p-3 float-animation">
                  <Gamepad2 className="w-6 h-6 text-accent-foreground" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-primary card-zapfy p-3 animate-bounce">
                  <Gift className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <div className="absolute top-1/2 -right-6 bg-secondary card-zapfy p-3 pulse-slow">
                  <Clock className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Mobile Image */}
          <ScrollAnimation animation="fadeUp" delay={0.3} className="lg:hidden mt-8 px-4">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-floating)]">
              <img 
                src={kidsLearningImage}
                alt="Crianças aprendendo educação financeira de forma divertida"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
              
              {/* Floating game elements for mobile */}
              <div className="absolute -top-2 -right-2 bg-accent card-zapfy p-2 float-animation">
                <Gamepad2 className="w-4 h-4 text-accent-foreground" />
              </div>
              
              <div className="absolute -bottom-2 -left-2 bg-primary card-zapfy p-2 animate-bounce">
                <Gift className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default BenefitsForKids;
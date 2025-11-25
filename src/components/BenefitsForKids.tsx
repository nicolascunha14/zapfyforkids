import { Gamepad2, Clock, Gift } from 'lucide-react';
import kidsLearningImage from '@/assets/kids-learning-finance.jpg';
import { SectionCarousel } from '@/components/ui/SectionCarousel';

const BenefitsForKids = () => {
  const benefits = [
    {
      icon: <Gamepad2 className="w-6 h-6 text-white" />,
      title: 'Experiência de Jogo',
      description: 'Interface divertida que parece um jogo, mantendo as crianças engajadas e motivadas a aprender.'
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: 'Lições Curtas',
      description: 'Conteúdo em formato de micro-aprendizado, perfeito para o tempo de atenção das crianças.'
    },
    {
      icon: <Gift className="w-6 h-6 text-white" />,
      title: 'Sistema de Recompensas',
      description: 'Conquistas e recompensas virtuais que celebram cada progresso e mantêm a motivação.'
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
            <div className="space-y-6 text-center">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold px-4">
                Diversão garantida{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  para as Crianças
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed px-4">
                Transformamos o aprendizado sobre dinheiro em uma aventura emocionante, 
                onde cada lição é uma nova descoberta e cada conquista é celebrada.
              </p>
            </div>
            
            <div className="px-4">
              <SectionCarousel items={benefits} />
            </div>
            
            <div className="mx-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
                <span className="text-sm font-montserrat font-semibold text-primary">
                  Engajamento Alto
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Crianças passam em média <strong>15 minutos diários</strong> aprendendo 
                de forma natural e divertida
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-8 col-span-2">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold">
                  Diversão garantida{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    para as Crianças
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transformamos o aprendizado sobre dinheiro em uma aventura emocionante, 
                  onde cada lição é uma nova descoberta e cada conquista é celebrada.
                </p>
              </div>
              
              <SectionCarousel items={benefits} />
              
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 mx-auto max-w-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                  <span className="text-sm font-montserrat font-semibold text-primary">
                    Engajamento Alto
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Crianças passam em média <strong>15 minutos diários</strong> aprendendo 
                  de forma natural e divertida
                </p>
              </div>
            </div>
            
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
          </div>

          {/* Mobile Image */}
          <div className="lg:hidden mt-8 px-4">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsForKids;
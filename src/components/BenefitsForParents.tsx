import { BarChart3, Heart, Smartphone } from 'lucide-react';
import { SectionCarousel } from '@/components/ui/SectionCarousel';
const BenefitsForParents = () => {
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
  const benefitFeatures = [['Dashboard personalizado', 'Relatórios semanais', 'Métricas de progresso'], ['Conteúdo aprovado por especialistas', 'Ambiente seguro', 'Sem riscos financeiros'], ['Acesso via app', 'Sem custos extras', 'Disponível 24/7']];
  return <section className="section-padding relative overflow-hidden">
      {/* Subtle Aurora orbs */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-xl float-animation" />
      <div className="absolute bottom-1/3 right-20 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-lg animate-pulse" />
      <div className="absolute top-2/3 left-1/4 w-12 h-12 bg-gradient-to-br from-secondary/15 to-transparent rounded-full blur-md pulse-slow" />
      
      <div className="container-zapfy relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold">
              Aprenda{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Junto com Seu Filho
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <strong>93% dos pais</strong> dizem que aprender sobre finanças com os filhos fortalece os laços familiares. 
              Na Zapfy, você não só supervisiona — você participa da jornada, ensina pelo exemplo e cria memórias valiosas.
            </p>
          </div>
          
          <SectionCarousel items={benefits} />
          
          <div className="mt-16">
            
          </div>
          
          <div className="mt-16 space-y-8">
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20 max-w-2xl mx-auto">
              <p className="text-base text-muted-foreground italic mb-3">
                "Meu filho de 10 anos me perguntou se vale a pena comprar um brinquedo parcelado. 
                Fiquei em choque — e super orgulhosa!"
              </p>
              <p className="text-sm font-montserrat font-semibold text-primary">
                — Paula, mãe do Miguel, após 3 semanas usando Zapfy
              </p>
            </div>
            
            <div className="text-center">
              <button className="btn-hero">
                Experimente Ensinar Junto
              </button>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-6 py-3 rounded-full mx-auto">
              <Heart className="w-5 h-5" />
              <span className="font-montserrat font-semibold">
                95% dos pais notam mudanças positivas em menos de 1 mês
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default BenefitsForParents;
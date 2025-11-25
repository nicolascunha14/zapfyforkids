import { BarChart3, Heart, Smartphone } from 'lucide-react';
import { SectionCarousel } from '@/components/ui/SectionCarousel';
const BenefitsForParents = () => {
  const benefits = [{
    icon: <BarChart3 className="w-7 h-7 text-white" />,
    title: 'Acompanhamento Completo',
    description: 'Relatórios simples e intuitivos mostram o progresso do seu filho, destacando conquistas e áreas de melhoria.'
  }, {
    icon: <Heart className="w-7 h-7 text-white" />,
    title: 'Tranquilidade Total',
    description: 'Content educativo confiável, desenvolvido por especialistas em educação financeira e psicologia infantil.'
  }, {
    icon: <Smartphone className="w-7 h-7 text-white" />,
    title: '100% Digital',
    description: 'Experiência completamente digital, sem necessidade de cartões físicos, kits ou materiais adicionais.'
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
              Benefícios para{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                os Pais
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tenha controle total sobre a educação financeira do seu filho com ferramentas 
              pensadas especialmente para facilitar o acompanhamento dos pais.
            </p>
          </div>
          
          <SectionCarousel items={benefits} />
          
          <div className="mt-16">
            
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-6 py-3 rounded-full">
              <Heart className="w-5 h-5" />
              <span className="font-montserrat font-semibold">
                Mais de 95% dos pais relatam resultados rápidos e aparentes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default BenefitsForParents;
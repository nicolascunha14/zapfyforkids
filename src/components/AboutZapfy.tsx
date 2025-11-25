import { BookOpen, Shield, Trophy } from 'lucide-react';
import { SectionCarousel } from '@/components/ui/SectionCarousel';

const AboutZapfy = () => {
  const sections = [
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: 'Formação Estruturada',
      description: 'Metodologia baseada em valores sólidos e disciplina, desenvolvendo liderança e responsabilidade financeira desde cedo.'
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: 'Valores & Princípios',
      description: 'Ensinamos ética, responsabilidade e disciplina financeira através de experiências práticas e seguras.'
    },
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      title: 'Liderança do Futuro',
      description: 'Formamos jovens protagonistas com mentalidade empreendedora e visão estratégica para o sucesso financeiro.'
    }
  ];

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Subtle Aurora elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 blur-3xl" />
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-secondary/10 to-transparent rounded-full blur-xl pulse-slow" />
      
      <div className="container-zapfy relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold">
              Formando os{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Líderes Financeiros do Amanhã
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              A Zapfy é o ecossistema completo de formação de líderes financeiros jovens. 
              Desenvolvemos disciplina, responsabilidade e visão empreendedora através de 
              uma metodologia que combina valores sólidos com inovação tecnológica, 
              preparando seus filhos para se tornarem protagonistas do próprio sucesso financeiro.
            </p>
          </div>
          
          <SectionCarousel items={sections} />
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse delay-100" />
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse delay-200" />
            </div>
            <p className="text-lg font-montserrat font-semibold text-center">
              "Formando jovens líderes com disciplina, visão e responsabilidade para liderar o futuro financeiro"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutZapfy;
import { GraduationCap, Building2, Heart } from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

const SchoolSection = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSchoolClick = () => {
    setIsAlertOpen(true);
  };

  return (
    <section className="section-padding bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
      {/* Aurora floating elements */}
      <div className="absolute top-10 left-1/4 w-6 h-6 bg-primary/20 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-secondary/20 rounded-full float-animation opacity-50" />
      <div className="absolute top-1/2 right-10 w-4 h-4 bg-accent/30 rounded-full pulse-slow opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-primary/3 to-secondary/3 blur-3xl" />
      
      <div className="container-zapfy relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold">
                Preparando Uma Geração{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Financeiramente Sustentável
                </span>
              </h2>
            </StaggerItem>
            
            <StaggerItem>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Imagine o impacto de ensinar educação financeira para milhares de alunos: 
                futuros adultos conscientes, preparados e capazes de construir um Brasil mais próspero. 
                Estamos trazendo a Zapfy para as escolas — de forma fácil, alinhada à BNCC e 
                <strong> gratuita para instituições públicas</strong>.
              </p>
            </StaggerItem>
          </StaggerContainer>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            <StaggerItem animation="fadeUp">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-montserrat font-semibold">Plug & Play para Professores</h3>
                <p className="text-sm text-muted-foreground">
                  Plataforma pronta para uso: gestão de turmas, relatórios automáticos e zero trabalho extra
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem animation="fadeUp">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-montserrat font-semibold">Alinhado à BNCC</h3>
                <p className="text-sm text-muted-foreground">
                  Conteúdo totalmente adaptado às competências da Base Nacional Comum Curricular
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem animation="fadeUp">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-montserrat font-semibold">Gratuito para Escolas Públicas</h3>
                <p className="text-sm text-muted-foreground">
                  Nosso compromisso com educação inclusiva: acesso gratuito para instituições públicas de ensino
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
          
          <ScrollAnimation animation="scale" delay={0.2}>
            <div className="bg-background rounded-2xl p-8 shadow-[var(--shadow-card)] border border-border/50">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                  <span className="font-montserrat font-semibold text-accent-foreground">
                    Transforme sua escola hoje
                  </span>
                </div>
                
                <p className="text-muted-foreground text-center max-w-xl mx-auto">
                  Você é gestor, coordenador ou professor? Leve a Zapfy para sua instituição 
                  e faça parte da revolução da educação financeira no Brasil. É simples, é rápido, é transformador.
                </p>
                
                <button onClick={handleSchoolClick} className="btn-hero mx-auto block">
                  Quero Zapfy na Minha Escola
                </button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Solicite uma demonstração gratuita ou tire suas dúvidas com nossa equipe
                </p>
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fadeUp" delay={0.3}>
            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Hoje:</strong> Disponível para famílias • 
                <strong> Em breve:</strong> Expandindo para escolas públicas e privadas
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Zapfy para Escolas - Em Breve
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base space-y-3 pt-2">
              <p>
                Obrigado pelo seu interesse! 🎉
              </p>
              <p>
                Atualmente, a <strong>Zapfy está disponível exclusivamente para famílias</strong>. 
                Estamos desenvolvendo uma versão completa para escolas com gestão de turmas, 
                relatórios pedagógicos e alinhamento total com a BNCC.
              </p>
              <p>
                <strong>Quer ser avisado quando lançarmos?</strong><br />
                Entre em contato conosco pelo email: <span className="text-primary font-semibold">escolas@zapfy.com.br</span>
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-primary hover:bg-primary/90">
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default SchoolSection;
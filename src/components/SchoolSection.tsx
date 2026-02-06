import { GraduationCap } from 'lucide-react';
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

const SchoolSection = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSchoolClick = () => {
    setIsAlertOpen(true);
  };

  return (
    <section className="py-12 bg-muted/20 relative">
      <div className="container-zapfy relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h3 className="text-xl md:text-2xl font-montserrat font-semibold text-muted-foreground">
            Sua Escola Também Pode Ter{' '}
            <span className="text-primary">Zapfy</span>
          </h3>
          
          <p className="text-muted-foreground">
            Professores e coordenadores: a Zapfy está disponível <strong>GRATUITAMENTE</strong> para escolas públicas. Alinhada à BNCC, pronta para usar.
          </p>
          
          <button 
            onClick={handleSchoolClick} 
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors group"
          >
            Quero Zapfy na Minha Escola
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
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
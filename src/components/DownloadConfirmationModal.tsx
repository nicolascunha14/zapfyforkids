import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Mail, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

interface DownloadConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emailSchema = z.string().trim().email({ message: "Email inválido" }).max(255);

const DownloadConfirmationModal = ({ isOpen, onClose }: DownloadConfirmationModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: result.data }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Você já está na lista!",
            description: "Este email já está cadastrado para acesso antecipado.",
          });
          setIsSubmitted(true);
        } else {
          throw error;
        }
      } else {
        trackEvent('download_modal_waitlist_signup', {
          timestamp: new Date().toISOString()
        });
        
        toast({
          title: "Você está na lista! 🎉",
          description: "Avisaremos quando o app lançar. Você terá acesso antecipado + 1 mês grátis!",
        });
        setIsSubmitted(true);
      }
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-montserrat">
            Download Iniciado! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <Mail className="w-4 h-4" />
              <span>Você vai receber o guia por email em 1 minuto.</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        {!isSubmitted ? (
          <div className="mt-6 space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-medium mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>PS: Quer ser avisado quando o app lançar?</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Você terá <strong>acesso antecipado + 1 mês grátis</strong>.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="text-center"
              />
              <Button 
                type="submit" 
                size="lg" 
                className="w-full btn-hero"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Cadastrando...' : 'Quero Acesso Antecipado'}
              </Button>
            </form>
            
            <button 
              onClick={handleClose}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Agora não, obrigado
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4 text-center">
            <div className="bg-secondary/20 rounded-lg p-4">
              <p className="text-sm font-medium text-secondary-foreground">
                ✅ Você está na lista de acesso antecipado!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Avisaremos assim que o app estiver pronto.
              </p>
            </div>
            <Button onClick={handleClose} variant="outline" className="w-full">
              Continuar Navegando
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DownloadConfirmationModal;

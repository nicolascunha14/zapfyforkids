import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: 'Email inválido' })
    .max(255, { message: 'Email deve ter no máximo 255 caracteres' })
});

type FormData = z.infer<typeof formSchema>;

interface ContactExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactExpertModal = ({ isOpen, onClose }: ContactExpertModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({
          name: null,
          email: data.email,
          phone: null
        });

      if (error) {
        toast({
          title: "Erro ao processar",
          description: "Ocorreu um erro ao processar seu contato. Tente novamente.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      toast({
        title: "Contato Registrado! 📧",
        description: "Em breve nosso especialista entrará em contato pelo seu email.",
        duration: 5000,
      });
      
      reset();
      onClose();
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Algo deu errado. Por favor, tente novamente.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          
          <DialogTitle className="text-2xl font-montserrat font-bold">
            Fale com nosso{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Especialista
            </span>
          </DialogTitle>
          
          <p className="text-muted-foreground">
            Deixe seu email e nossa equipe de especialistas entrará em contato 
            para esclarecer suas dúvidas, ajudar na jornada financeira do seu filho
            ou discutir parcerias educacionais para sua escola.
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Seu melhor email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-hero"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Falar com Especialista
                  <MessageCircle className="w-4 h-4" />
                </div>
              )}
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Nossos especialistas entrarão em contato em até 24 horas.
              </p>
            </div>
          </div>
        </form>
        
        {/* Benefícios do contato */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="w-2 h-2 bg-secondary rounded-full" />
            <span>Consultoria gratuita personalizada</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span>Plano educacional customizado</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>Suporte especializado contínuo</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactExpertModal;
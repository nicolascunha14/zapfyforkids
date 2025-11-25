import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, User, Mail, Phone, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),
  email: z.string()
    .trim()
    .email({ message: 'Email inválido' })
    .max(255, { message: 'Email deve ter no máximo 255 caracteres' }),
  phone: z.string()
    .trim()
    .min(10, { message: 'Telefone deve ter pelo menos 10 dígitos' })
    .max(20, { message: 'Telefone deve ter no máximo 20 caracteres' })
});

type FormData = z.infer<typeof formSchema>;

interface AccessFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessFormModal = ({ isOpen, onClose }: AccessFormModalProps) => {
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
          name: data.fullName,
          email: data.email,
          phone: data.phone
        });

      if (error) {
        toast({
          title: "Erro ao processar",
          description: "Ocorreu um erro ao processar seus dados. Tente novamente.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      toast({
        title: "Acesso Garantido! 🎉",
        description: "Em breve nossa equipe entrará em contato para finalizar seu acesso à Zapfy.",
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
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <DialogTitle className="text-2xl font-montserrat font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Entre Para a Lista de Espera
            </span>
          </DialogTitle>
          
          <p className="text-muted-foreground">
            Preencha os dados abaixo e nossa equipe entrará em contato para 
            personalizar a experiência Zapfy para seu filho.
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome Completo
              </Label>
              <Input
                id="fullName"
                placeholder="Digite seu nome completo"
                {...register('fullName')}
                className={errors.fullName ? 'border-destructive' : ''}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
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
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone
              </Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                {...register('phone')}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
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
                  Processando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Confirmar Acesso
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Ao continuar, você concorda com nossos termos de uso e política de privacidade.
              </p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccessFormModal;
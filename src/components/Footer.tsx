import zapfyLogo from "@/assets/zapfy-logo.png";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email muito longo" }),
  question: z.string()
    .trim()
    .min(10, { message: "Escreva pelo menos 10 caracteres" })
    .max(1000, { message: "Máximo de 1000 caracteres" })
});

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validar dados
      const validated = contactSchema.parse({ email, question });
      
      setIsSubmitting(true);
      
      // Inserir no banco de dados
      const { error } = await supabase
        .from('contacts')
        .insert([{
          email: validated.email,
          question: validated.question
        }]);
      
      if (error) throw error;
      
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      
      // Limpar formulário
      setEmail('');
      setQuestion('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro no formulário",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao enviar",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer id="sobre" className="bg-background border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={zapfyLogo}
                alt="Zapfy Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A Zapfy é uma plataforma inovadora de educação financeira para crianças, 
              combinando gamificação e segurança para ensinar o valor do dinheiro de forma divertida.
            </p>
          </div>

          {/* Sobre a Zapfy */}
          <div className="space-y-4">
            <h3 className="text-lg font-montserrat font-semibold text-foreground">
              Sobre a Zapfy
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Nossa missão é transformar a relação das crianças com o dinheiro através da educação financeira gamificada.
              </p>
              <p>
                Desenvolvemos uma plataforma segura e divertida que ensina conceitos financeiros essenciais de forma natural e envolvente.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Por que escolher a Zapfy?</h4>
                <ul className="space-y-1">
                  <li>• Educação financeira personalizada para cada idade</li>
                  <li>• Gamificação que mantém as crianças engajadas</li>
                  <li>• Segurança e supervisão parental integrada</li>
                  <li>• Conteúdo desenvolvido por especialistas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contato e Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-montserrat font-semibold text-foreground">
              Contato
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Tem dúvidas? Deixe seu e-mail que entraremos em contato:
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="bg-background"
                />
                <Textarea
                  placeholder="Escreva sua dúvida aqui..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  disabled={isSubmitting}
                  rows={4}
                  className="bg-background resize-none"
                />
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="mt-12 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground">
              © 2024 Zapfy. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
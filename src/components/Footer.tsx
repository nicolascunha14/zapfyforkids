import zapfyLogo from "@/assets/zapfy-logo.png";

const Footer = () => {
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
                Tem dúvidas? Entre em contato conosco!
              </p>
              <div className="space-y-2">
                <p>Email: contato@zapfy.com.br</p>
                <p>Suporte: suporte@zapfy.com.br</p>
              </div>
              <div className="pt-4">
                <a 
                  href="/waitlist" 
                  className="inline-flex items-center justify-center px-4 py-2 text-sm text-white bg-gradient-to-r from-primary to-secondary rounded-full hover:shadow-lg transition-all duration-300 hover:shadow-primary/25"
                >
                  Entrar na Lista de Espera
                </a>
              </div>
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
import { Play, Star, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import appMockupImage from '@/assets/zapfy-app-mockup.jpg';

const DemoSection = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: '10.347', label: 'Famílias Ativas' },
    { icon: Star, value: '4.9/5', label: 'Avaliação' },
    { icon: Award, value: '95%', label: 'Completam 1ª Missão' }
  ];

  return (
    <section id="demo" className="section-padding">
      <div className="container-zapfy">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold">
              É Assim Que{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Seu Filho Vai Aprender
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interface igual a jogos que seu filho já conhece.<br />
              Mas em vez de apenas jogar, ele aprende finanças de verdade.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Main mockup */}
              <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-floating)] transform hover:scale-105 transition-transform">
                <img 
                  src={appMockupImage}
                  alt="Interface da plataforma Zapfy mostrando jogos de educação financeira"
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Floating features */}
              <div className="absolute -top-6 -left-6 bg-background card-zapfy p-4 animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">🏆</span>
                  </div>
                  <div>
                    <div className="text-sm font-montserrat font-semibold">Conquista!</div>
                    <div className="text-xs text-muted-foreground">Nível Poupador</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-background card-zapfy p-4 float-animation">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">💰</span>
                  </div>
                  <div>
                    <div className="text-sm font-montserrat font-semibold">+ 50 moedas</div>
                    <div className="text-xs text-muted-foreground">Lição completa</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-montserrat font-bold">
                  Interface Igual a Um Jogo
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span>✨</span> Colorido, intuitivo, divertido
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🎯</span> Navegação simples (criança usa sozinha)
                  </p>
                  <p className="flex items-center gap-2">
                    <span>💰</span> Moedas, badges, ranking
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📊</span> Dashboard de progresso (para pais)
                  </p>
                </div>
                <p className="text-lg font-montserrat font-semibold text-primary">
                  Parece Duolingo, mas para dinheiro.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mx-auto">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-montserrat font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h4 className="font-montserrat font-semibold">Principais Recursos:</h4>
                <div className="space-y-3">
                  {[
                    'Missões práticas que usa na vida real (ex: calcular troco)',
                    'Ganha pontos e badges (igual videogame)',
                    'Conteúdo certo para idade do SEU filho (7-15 anos)',
                    'Você vê o que ele aprendeu (dashboard atualizado)'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/waitlist')} 
                className="btn-hero group w-full sm:w-auto flex items-center justify-center"
              >
                Quero Ver Meu Filho Usando
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
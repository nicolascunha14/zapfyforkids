import { Play, Star, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import appMockupImage from '@/assets/zapfy-app-mockup.jpg';

const DemoSection = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: '500+', label: 'Famílias Ativas' },
    { icon: Star, value: '4.9', label: 'Avaliação Média' },
    { icon: Award, value: '95%', label: 'Taxa de Conclusão' }
  ];

  return (
    <section id="demo" className="section-padding">
      <div className="container-zapfy">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold">
              Veja a{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Zapfy
              </span>{' '}
              em Ação
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra como nossa plataforma transforma o aprendizado financeiro 
              em uma experiência envolvente e educativa para seu filho.
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
                  Interface Intuitiva e Gamificada
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nossa plataforma combina elementos de jogos com conteúdo educativo, 
                  criando uma experiência única onde aprender sobre dinheiro é naturalmente divertido.
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
                    'Jogos interativos de educação financeira',
                    'Sistema de recompensas e conquistas',
                    'Lições personalizadas por idade',
                    'Relatórios de progresso para pais'
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
                className="btn-secondary w-full sm:w-auto"
              >
                <Play className="w-5 h-5 mr-2" />
                Quero Experimentar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
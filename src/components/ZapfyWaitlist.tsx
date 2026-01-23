import React from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  QuadraticBezierCurve3,
  Vector3,
  TubeGeometry,
  ShaderMaterial,
  Mesh,
  AdditiveBlending,
  DoubleSide,
} from "three";
import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Clock, Gift, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function ZapfyWaitlist(): ReactElement {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene>();
  const rendererRef = useRef<WebGLRenderer>();
  const animationIdRef = useRef<number>();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 15,
  });

  // Three.js background effect
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new Scene();
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create curved light geometry - Zapfy colors
    const curve = new QuadraticBezierCurve3(
      new Vector3(-15, -4, 0), 
      new Vector3(2, 3, 0), 
      new Vector3(18, 0.8, 0)
    );

    // Create tube geometry for the light streak
    const tubeGeometry = new TubeGeometry(curve, 200, 0.8, 32, false);

    // Create gradient material with Zapfy colors
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        // Zapfy brand colors - primary to secondary gradient
        vec3 color1 = vec3(0.6, 0.2, 1.0); // Primary purple
        vec3 color2 = vec3(0.2, 0.8, 0.8); // Secondary cyan
        vec3 color3 = vec3(0.9, 0.6, 0.2); // Accent orange
        
        // Mix colors based on UV coordinates
        vec3 finalColor = mix(color1, color2, vUv.x);
        finalColor = mix(finalColor, color3, sin(vUv.x * 3.14159) * 0.3);
        
        // Add glow effect
        float glow = 1.0 - abs(vUv.y - 0.5) * 2.0;
        glow = pow(glow, 2.0);
        
        float fade = 1.0;
        if (vUv.x > 0.85) {
          fade = 1.0 - smoothstep(0.85, 1.0, vUv.x);
        }
        
        // Add subtle animation
        float pulse = sin(time * 2.0) * 0.1 + 0.9;
        
        gl_FragColor = vec4(finalColor * glow * pulse * fade, glow * fade * 0.8);
      }
    `;

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
      },
      transparent: true,
      blending: AdditiveBlending,
      side: DoubleSide,
    });

    const lightStreak = new Mesh(tubeGeometry, material);
    scene.add(lightStreak);

    // Add additional glow layers
    const glowGeometry = new TubeGeometry(curve, 200, 1.5, 32, false);
    const glowMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec3 color1 = vec3(0.6, 0.2, 1.0);
          vec3 color2 = vec3(0.2, 0.8, 0.8);
          
          vec3 finalColor = mix(color1, color2, vUv.x);
          
          float glow = 1.0 - abs(vUv.y - 0.5) * 2.0;
          glow = pow(glow, 4.0);
          
          float fade = 1.0;
          if (vUv.x > 0.85) {
            fade = 1.0 - smoothstep(0.85, 1.0, vUv.x);
          }
          
          float pulse = sin(time * 1.5) * 0.05 + 0.95;
          
          gl_FragColor = vec4(finalColor * glow * pulse * fade, glow * fade * 0.3);
        }
      `,
      uniforms: {
        time: { value: 0 },
      },
      transparent: true,
      blending: AdditiveBlending,
      side: DoubleSide,
    });

    const glowLayer = new Mesh(glowGeometry, glowMaterial);
    scene.add(glowLayer);

    // Position camera
    camera.position.z = 7;
    camera.position.y = -0.8;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      material.uniforms.time.value = time;
      glowMaterial.uniforms.time.value = time;

      // Subtle rotation for dynamic effect
      lightStreak.rotation.z = Math.sin(time * 0.2) * 0.05;
      glowLayer.rotation.z = Math.sin(time * 0.2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      tubeGeometry.dispose();
      glowGeometry.dispose();
      material.dispose();
      glowMaterial.dispose();
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: email,
            name: name,
            phone: null
          }
        ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "🎉 Bem-vindo à Zapfy!",
        description: "Você foi adicionado à nossa lista de espera. Te avisaremos em breve!",
      });
    } catch (error) {
      toast({
        title: "Ops! Algo deu errado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = ["Educação", "Gamificação", "Beta", "Lançamento", "Updates"];

  return (
    <motion.main 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/80 to-muted/20 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Three.js Background */}
      <motion.div 
        ref={mountRef} 
        className="fixed inset-0 w-full h-full" 
        style={{ zIndex: 0 }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen">
        {/* Header with Back Button and Navigation */}
        <div className="absolute top-8 left-0 right-0 z-20 px-8">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="bg-background/40 backdrop-blur-md border border-border/20 hover:bg-background/60 text-muted-foreground hover:text-foreground transition-all duration-300 rounded-full px-4 py-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </motion.div>

            {/* Top Navigation - centered */}
            <motion.div 
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="bg-background/40 backdrop-blur-md border border-border/20 rounded-full px-6 py-3">
                <div className="flex items-center justify-center gap-4">
                  {features.map((feature, index) => (
                    <motion.button
                      key={feature}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                      className={`text-sm px-3 py-1 rounded-full transition-colors font-montserrat ${
                        index === 2
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {feature}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Spacer for balance */}
            <div className="w-[100px] hidden md:block" />
          </div>
        </div>

        {/* Waitlist Card */}
        <div className="flex items-center justify-center min-h-screen px-4">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <motion.div 
              className="relative backdrop-blur-xl bg-background/60 border border-border/30 rounded-3xl p-8 w-[420px] shadow-2xl"
              initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
              animate={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              <div className="relative z-10">
                {!isSubmitted ? (
                  <>
                    <motion.div 
                      className="mb-8 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <motion.div 
                        className="flex items-center justify-center gap-2 mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
                        <Sparkles className="w-6 h-6 text-primary" />
                        <span className="text-sm font-montserrat font-semibold text-primary uppercase tracking-wide">
                          Lista de Espera
                        </span>
                      </motion.div>
                      <motion.h1 
                        className="text-4xl font-montserrat font-bold text-foreground mb-4 tracking-wide"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.5 }}
                      >
                        Entre na{' '}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          Zapfy
                        </span>
                      </motion.h1>
                      <motion.p 
                        className="text-muted-foreground text-base leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        Seja um dos primeiros a transformar a relação do seu filho com o dinheiro.
                        <br />
                        Educação financeira que funciona: <span className="text-primary font-semibold">gamificada, segura e eficaz</span>.
                      </motion.p>
                    </motion.div>

                     <motion.form 
                       onSubmit={handleSubmit} 
                       className="mb-6"
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.65, duration: 0.5 }}
                     >
                       <div className="space-y-3">
                         <Input
                           type="text"
                           placeholder="Seu nome"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           required
                           className="w-full bg-background/40 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:ring-primary/20 h-12 rounded-xl backdrop-blur-sm"
                         />
                         <div className="flex gap-3">
                           <Input
                             type="email"
                             placeholder="seu.email@exemplo.com"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             required
                             className="flex-1 bg-background/40 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:ring-primary/20 h-12 rounded-xl backdrop-blur-sm"
                           />
                           <Button
                             type="submit"
                             disabled={isLoading}
                             className="h-12 px-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-montserrat font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
                           >
                             {isLoading ? (
                               <>
                                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                 Salvando...
                               </>
                             ) : (
                               'Entrar na Lista'
                             )}
                           </Button>
                         </div>
                       </div>
                     </motion.form>

                    <motion.div 
                      className="flex items-center justify-center gap-3 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background/20 flex items-center justify-center text-white text-xs font-medium">
                          M
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent border-2 border-background/20 flex items-center justify-center text-white text-xs font-medium">
                          A
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background/20 flex items-center justify-center text-white text-xs font-medium">
                          J
                        </div>
                      </div>
                      <span className="text-muted-foreground text-sm font-montserrat">
                        <span className="text-primary font-semibold">+500</span> famílias já garantiram acesso antecipado
                      </span>
                    </motion.div>

                    <motion.div 
                      className="flex items-center justify-center gap-6 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.75, duration: 0.5 }}
                    >
                      <div>
                        <div className="text-2xl font-montserrat font-bold text-foreground">{timeLeft.days}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-montserrat">dias</div>
                      </div>
                      <div className="text-muted-foreground">|</div>
                      <div>
                        <div className="text-2xl font-montserrat font-bold text-foreground">{timeLeft.hours}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-montserrat">horas</div>
                      </div>
                      <div className="text-muted-foreground">|</div>
                      <div>
                        <div className="text-2xl font-montserrat font-bold text-foreground">{timeLeft.minutes}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-montserrat">min</div>
                      </div>
                      <div className="text-muted-foreground">|</div>
                      <div>
                        <div className="text-2xl font-montserrat font-bold text-foreground">{timeLeft.seconds}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-montserrat">seg</div>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 flex items-center justify-center border border-primary/40">
                      <svg
                        className="w-8 h-8 text-primary drop-shadow-lg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-montserrat font-bold text-foreground mb-2 drop-shadow-lg">
                      Você está na lista! 🎉
                    </h3>
                    <p className="text-muted-foreground text-sm drop-shadow-md">
                      Te avisaremos assim que a Zapfy estiver disponível. Obrigado por se juntar a nós!
                    </p>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-primary/[0.02] to-secondary/[0.05] pointer-events-none" />
            </motion.div>

            <motion.div 
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl scale-110 -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
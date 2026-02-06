import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import DownloadConfirmationModal from './DownloadConfirmationModal';
import { trackEvent } from '@/lib/analytics';

const DownloadGuideSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Desafio_Free.pdf';
    link.download = 'Guia_Rapido_5_Desafios_Zapfy.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download event
    trackEvent('download_guide', {
      fileName: 'Guia_Rapido_5_Desafios_Zapfy.pdf',
      timestamp: new Date().toISOString()
    });
    
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto max-w-3xl text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground">
          Quer Começar{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HOJE?
          </span>
        </h2>
        <p className="text-xl md:text-2xl font-montserrat font-semibold text-foreground">
          Baixe Nosso Guia com 5 Missões Práticas
        </p>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Missões de 5 minutos que você faz com seu filho HOJE.<br />
          Enquanto o app fica pronto, você já começa a ensinar.
        </p>
        <Button
          onClick={handleDownload}
          size="lg"
          className="text-lg px-8 py-6 gap-3 btn-hero"
        >
          <Download className="w-5 h-5" />
          Baixar Guia Grátis (PDF)
          <span className="ml-1">→</span>
        </Button>
      </div>
      <DownloadConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default DownloadGuideSection;

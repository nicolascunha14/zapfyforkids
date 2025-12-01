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
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
          Pronto para criar aprendizados e memórias que vão além da mesada?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-muted-foreground">
          Baixe agora nosso Guia Rápido com 5 Desafios e comece hoje mesmo a ensinar — brincando! ⬇️
        </p>
        <Button
          onClick={handleDownload}
          size="lg"
          className="text-lg px-8 py-6 gap-3"
        >
          <Download className="w-5 h-5" />
          Baixar grátis
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

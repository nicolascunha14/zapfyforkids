import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';

interface DownloadConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadConfirmationModal = ({ isOpen, onClose }: DownloadConfirmationModalProps) => {
  const navigate = useNavigate();

  const handleGoToWaitlist = () => {
    // Track conversion to waitlist from download modal
    trackEvent('download_modal_to_waitlist', {
      timestamp: new Date().toISOString()
    });
    
    onClose();
    navigate('/waitlist');
  };

  const handleContinue = () => {
    // Track when user continues browsing instead of joining waitlist
    trackEvent('download_modal_continue', {
      timestamp: new Date().toISOString()
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Download Iniciado! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-4">
            Obrigado por baixar nosso Guia Rápido! Prepare-se para criar momentos incríveis de aprendizado com seus filhos.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Button onClick={handleGoToWaitlist} size="lg" className="w-full">
            Junte-se à Lista de Espera
          </Button>
          <Button onClick={handleContinue} variant="outline" size="lg" className="w-full">
            Continuar Navegando
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadConfirmationModal;

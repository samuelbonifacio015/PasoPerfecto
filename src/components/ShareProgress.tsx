
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserData } from '@/hooks/useUserData';

const ShareProgress = () => {
  const { toast } = useToast();
  const { userData } = useUserData();

  const handleShare = () => {
    const shareText = `🚶‍♂️ ¡Hoy caminé ${userData.steps.toLocaleString()} pasos! 
💪 Nivel ${userData.level} - ${userData.xp} XP
🔥 Racha de ${userData.streak} días
#PasoPerfecto #Caminata #Fitness`;

    if (navigator.share) {
      navigator.share({
        title: 'Mi progreso en PasoPerfecto',
        text: shareText,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "¡Copiado!",
        description: "Texto copiado al portapapeles para compartir",
      });
    }
  };

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Comparte tu Progreso</h3>
          <p className="text-sm text-primary-200 mb-4">
            Comparte tus logros con amigos y familiares
          </p>
          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartir mi Avance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareProgress;

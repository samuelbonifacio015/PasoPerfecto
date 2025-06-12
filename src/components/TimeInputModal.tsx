
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';

interface TimeInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hours: number, minutes: number) => void;
  currentTime: string;
}

const TimeInputModal: React.FC<TimeInputModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentTime
}) => {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');

  const handleSave = () => {
    const h = Math.max(0, parseInt(hours) || 0);
    const m = Math.max(0, Math.min(59, parseInt(minutes) || 0));
    
    onSave(h, m);
    onClose();
  };

  const handleReset = () => {
    setHours('0');
    setMinutes('0');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-primary-800 border-primary-600 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-primary-300" />
            Establecer Tiempo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-primary-200 text-center">
            Tiempo actual: {currentTime}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <label className="block text-xs text-primary-300 mb-1">Horas</label>
              <Input
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="bg-primary-700/50 border-primary-500/30 text-white text-center"
              />
            </div>
            <div className="text-center">
              <label className="block text-xs text-primary-300 mb-1">Minutos</label>
              <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="bg-primary-700/50 border-primary-500/30 text-white text-center"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleReset}
              variant="outline"
              className="flex-1 border-primary-500/50 text-primary-300 hover:bg-primary-500/20"
            >
              Reiniciar
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 bg-primary-600 hover:bg-primary-700"
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeInputModal;

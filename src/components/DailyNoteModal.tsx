
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface DailyNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  currentNote: string;
  selectedDate: string;
}

const DailyNoteModal: React.FC<DailyNoteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentNote,
  selectedDate
}) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    setNote(currentNote || '');
  }, [currentNote, isOpen]);

  const handleSave = () => {
    onSave(note);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-primary-800 border-primary-600 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-primary-300" />
            Nota del Día - {formatDate(selectedDate)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-primary-200 mb-2">
              Escribe tu nota para este día:
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="¿Cómo te sentiste hoy? ¿Qué lograste?"
              className="bg-primary-700/50 border-primary-500/30 text-white placeholder-primary-300 min-h-[100px]"
              maxLength={500}
            />
            <div className="text-xs text-primary-300 mt-1">
              {note.length}/500 caracteres
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 border-primary-500/50 text-primary-300 hover:bg-primary-500/20"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 bg-primary-600 hover:bg-primary-700"
            >
              Guardar Nota
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyNoteModal;

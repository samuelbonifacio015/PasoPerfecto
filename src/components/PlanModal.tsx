
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Target } from 'lucide-react';
import { Plan } from '@/hooks/usePlans';

interface PlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planType: 'weekly' | 'monthly';
  editingPlan?: Plan | null;
  onSave: (name: string, type: 'weekly' | 'monthly', startDate: string, targetSteps: number, goalType: string) => void;
  onUpdate?: (planId: string, updates: Partial<Plan>) => void;
}

const PlanModal: React.FC<PlanModalProps> = ({
  open,
  onOpenChange,
  planType,
  editingPlan,
  onSave,
  onUpdate
}) => {
  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetSteps, setTargetSteps] = useState(10000);
  const [goalType, setGoalType] = useState('daily');

  useEffect(() => {
    if (editingPlan) {
      setPlanName(editingPlan.name);
      setStartDate(editingPlan.startDate);
      setTargetSteps(editingPlan.targetSteps);
      setGoalType((editingPlan as any).goalType || 'daily');
    } else {
      setPlanName('');
      setStartDate(new Date().toISOString().split('T')[0]);
      setTargetSteps(10000);
      setGoalType('daily');
    }
  }, [editingPlan, open]);

  const handleSave = () => {
    if (editingPlan && onUpdate) {
      onUpdate(editingPlan.id, {
        name: planName,
        startDate,
        targetSteps,
        goalType
      } as any);
    } else {
      onSave(planName, planType, startDate, targetSteps, goalType);
    }
    onOpenChange(false);
  };

  const endDate = planType === 'weekly' 
    ? new Date(new Date(startDate).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth() + 1, 0).toISOString().split('T')[0];

  const getGoalTypeOptions = () => {
    if (planType === 'weekly') {
      return [
        { value: 'daily', label: 'Meta Diaria', description: 'Pasos por día' },
        { value: 'weekly', label: 'Meta Semanal', description: 'Pasos por semana' }
      ];
    } else {
      return [
        { value: 'weekly', label: 'Meta Semanal', description: 'Pasos por semana' },
        { value: 'monthly', label: 'Meta Mensual', description: 'Pasos por mes' }
      ];
    }
  };

  const getGoalDescription = () => {
    const options = getGoalTypeOptions();
    const selected = options.find(opt => opt.value === goalType);
    return selected?.description || '';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-primary-800 border-primary-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {editingPlan ? 'Editar Plan' : `Crear Plan ${planType === 'weekly' ? 'Semanal' : 'Mensual'}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="planName" className="text-primary-200">Nombre del Plan</Label>
            <Input
              id="planName"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder={`Plan ${planType === 'weekly' ? 'Semanal' : 'Mensual'}`}
              className="bg-primary-700/50 border-primary-500/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-primary-200">Fecha de Inicio</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-primary-700/50 border-primary-500/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-primary-200">Fecha de Fin</Label>
            <div className="p-3 bg-primary-700/30 rounded-lg border border-primary-500/30">
              <span className="text-white">{endDate}</span>
              <span className="text-primary-300 text-sm ml-2">
                (Automático: {planType === 'weekly' ? '7 días' : '1 mes'})
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-primary-200">Tipo de Meta</Label>
            <RadioGroup value={goalType} onValueChange={setGoalType}>
              {getGoalTypeOptions().map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    className="border-primary-500 text-primary-400"
                  />
                  <Label htmlFor={option.value} className="text-white flex-1">
                    <div>{option.label}</div>
                    <div className="text-xs text-primary-300">{option.description}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetSteps" className="text-primary-200 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Meta de Pasos ({getGoalDescription()})
            </Label>
            <Input
              id="targetSteps"
              type="number"
              value={targetSteps}
              onChange={(e) => setTargetSteps(Number(e.target.value))}
              min="1000"
              step="500"
              className="bg-primary-700/50 border-primary-500/30 text-white"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 border-primary-500/50 text-primary-300 hover:bg-primary-600/20"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!planName.trim()}
              className="flex-1 bg-primary-600 hover:bg-primary-700"
            >
              {editingPlan ? 'Actualizar' : 'Crear Plan'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanModal;

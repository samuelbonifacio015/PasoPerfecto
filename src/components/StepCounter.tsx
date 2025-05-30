
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface StepCounterProps {
  dailySteps: number;
  onAddSteps: (steps: number) => void;
  onSetSteps: (steps: number) => void;
}

const StepCounter: React.FC<StepCounterProps> = ({ dailySteps, onAddSteps, onSetSteps }) => {
  const [customSteps, setCustomSteps] = React.useState('');

  const quickStepOptions = [1000, 2500, 5000];

  const handleCustomSteps = () => {
    const steps = parseInt(customSteps);
    if (steps && steps > 0) {
      onSetSteps(steps);
      setCustomSteps('');
    }
  };

  return (
    <Card className="glass-effect border-purple-500/20 bg-gray-900/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center gradient-purple bg-clip-text text-transparent">
          Registro Rápido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {quickStepOptions.map((steps) => (
            <Button
              key={steps}
              onClick={() => onAddSteps(steps)}
              variant="outline"
              size="sm"
              className="border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
            >
              <Plus className="w-3 h-3 mr-1" />
              {steps.toLocaleString()}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Pasos personalizados"
            value={customSteps}
            onChange={(e) => setCustomSteps(e.target.value)}
            className="bg-gray-800/50 border-purple-500/30 focus:border-purple-400 text-sm"
          />
          <Button 
            onClick={handleCustomSteps}
            size="sm"
            className="gradient-purple hover:opacity-90 transition-opacity"
          >
            Set
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepCounter;

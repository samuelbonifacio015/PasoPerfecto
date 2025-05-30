
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface StepCounterProps {
  dailySteps: number;
  onAddSteps: (steps: number) => void;
  onSetSteps: (steps: number) => void;
}

const StepCounter: React.FC<StepCounterProps> = ({ dailySteps, onAddSteps, onSetSteps }) => {
  const [customSteps, setCustomSteps] = React.useState('');

  const quickStepOptions = [3000, 6000, 10000];

  const handleCustomSteps = () => {
    const steps = parseInt(customSteps);
    if (steps && steps > 0) {
      onSetSteps(steps);
      setCustomSteps('');
    }
  };

  return (
    <Card className="glass-effect border-purple-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl gradient-purple bg-clip-text text-transparent">
          Pasos de Hoy
        </CardTitle>
        <div className="text-5xl font-bold text-purple-400 glow-purple rounded-lg p-4">
          {dailySteps.toLocaleString()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {quickStepOptions.map((steps) => (
            <Button
              key={steps}
              onClick={() => onSetSteps(steps)}
              variant="outline"
              className="border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
            >
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
            className="bg-gray-800/50 border-purple-500/30 focus:border-purple-400"
          />
          <Button 
            onClick={handleCustomSteps}
            className="gradient-purple hover:opacity-90 transition-opacity"
          >
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepCounter;

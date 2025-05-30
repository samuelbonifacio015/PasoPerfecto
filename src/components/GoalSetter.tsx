
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface GoalSetterProps {
  weeklyGoal: number;
  monthlyGoal: number;
  onSetWeeklyGoal: (goal: number) => void;
  onSetMonthlyGoal: (goal: number) => void;
}

const GoalSetter: React.FC<GoalSetterProps> = ({ 
  weeklyGoal, 
  monthlyGoal, 
  onSetWeeklyGoal, 
  onSetMonthlyGoal 
}) => {
  const [newWeeklyGoal, setNewWeeklyGoal] = React.useState('');
  const [newMonthlyGoal, setNewMonthlyGoal] = React.useState('');

  const handleSetWeeklyGoal = () => {
    const goal = parseInt(newWeeklyGoal);
    if (goal && goal > 0) {
      onSetWeeklyGoal(goal);
      setNewWeeklyGoal('');
      toast({
        title: "¡Meta semanal actualizada!",
        description: `Nueva meta: ${goal.toLocaleString()} pasos por semana`,
      });
    }
  };

  const handleSetMonthlyGoal = () => {
    const goal = parseInt(newMonthlyGoal);
    if (goal && goal > 0) {
      onSetMonthlyGoal(goal);
      setNewMonthlyGoal('');
      toast({
        title: "¡Meta mensual actualizada!",
        description: `Nueva meta: ${goal.toLocaleString()} pasos por mes`,
      });
    }
  };

  const suggestedWeeklyGoals = [35000, 50000, 70000];
  const suggestedMonthlyGoals = [150000, 200000, 300000];

  return (
    <Card className="glass-effect border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-xl text-purple-400">Establecer Metas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Goals */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-purple-300">Meta Semanal</h3>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">
              {weeklyGoal.toLocaleString()} pasos
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {suggestedWeeklyGoals.map((goal) => (
              <Button
                key={goal}
                onClick={() => onSetWeeklyGoal(goal)}
                variant="outline"
                size="sm"
                className="border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 text-xs"
              >
                {(goal / 1000).toFixed(0)}k
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Meta personalizada"
              value={newWeeklyGoal}
              onChange={(e) => setNewWeeklyGoal(e.target.value)}
              className="bg-gray-800/50 border-purple-500/30 focus:border-purple-400"
            />
            <Button 
              onClick={handleSetWeeklyGoal}
              size="sm"
              className="gradient-purple hover:opacity-90"
            >
              Set
            </Button>
          </div>
        </div>

        {/* Monthly Goals */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-purple-300">Meta Mensual</h3>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">
              {monthlyGoal.toLocaleString()} pasos
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {suggestedMonthlyGoals.map((goal) => (
              <Button
                key={goal}
                onClick={() => onSetMonthlyGoal(goal)}
                variant="outline"
                size="sm"
                className="border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 text-xs"
              >
                {(goal / 1000).toFixed(0)}k
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Meta personalizada"
              value={newMonthlyGoal}
              onChange={(e) => setNewMonthlyGoal(e.target.value)}
              className="bg-gray-800/50 border-purple-500/30 focus:border-purple-400"
            />
            <Button 
              onClick={handleSetMonthlyGoal}
              size="sm"
              className="gradient-purple hover:opacity-90"
            >
              Set
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalSetter;

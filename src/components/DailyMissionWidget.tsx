
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Target } from 'lucide-react';
import { useDailyMissions } from '@/hooks/useDailyMissions';

interface DailyMissionWidgetProps {
  currentSteps: number;
}

const DailyMissionWidget: React.FC<DailyMissionWidgetProps> = ({ currentSteps }) => {
  const { dailyMission, completeMission } = useDailyMissions();
  
  const progress = Math.min((currentSteps / dailyMission.steps) * 100, 100);
  const isCompleted = currentSteps >= dailyMission.steps;
  
  React.useEffect(() => {
    if (isCompleted && !dailyMission.completed) {
      completeMission();
    }
  }, [isCompleted, dailyMission.completed, completeMission]);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400';
      case 'Medio': return 'text-yellow-400';
      case 'Difícil': return 'text-red-400';
      default: return 'text-primary-300';
    }
  };
  
  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">{dailyMission.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-white">{dailyMission.name}</h3>
              <p className="text-sm text-primary-200">Misión Del Día</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-sm font-medium ${getDifficultyColor(dailyMission.difficulty)}`}>
              {dailyMission.difficulty}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-primary-200">
            Quedan {Math.max(0, dailyMission.steps - currentSteps).toLocaleString()} Pasos
          </span>
          <span className="text-sm text-white font-semibold">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full bg-primary-700/40 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-primary-300" />
            <span className="text-sm text-primary-200">{dailyMission.steps.toLocaleString()} pasos</span>
          </div>
          {isCompleted && (
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">¡Completada!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMissionWidget;

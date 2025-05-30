
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface WeeklyProgressProps {
  weeklySteps: number[];
  weeklyGoal: number;
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ weeklySteps, weeklyGoal }) => {
  const totalWeeklySteps = weeklySteps.reduce((sum, steps) => sum + steps, 0);
  const progressPercentage = (totalWeeklySteps / weeklyGoal) * 100;
  
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const today = new Date().getDay();
  const mondayIndex = today === 0 ? 6 : today - 1; // Adjust for Monday start

  return (
    <Card className="glass-effect border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-xl text-purple-400">Progreso Semanal</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{totalWeeklySteps.toLocaleString()} pasos</span>
            <span>{weeklyGoal.toLocaleString()} meta</span>
          </div>
          <Progress 
            value={Math.min(progressPercentage, 100)} 
            className="h-3 bg-gray-800"
          />
          <div className="text-center text-sm text-purple-300">
            {progressPercentage >= 100 ? '¡Meta alcanzada! 🎉' : `${Math.round(progressPercentage)}% completado`}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {dayNames.map((day, index) => {
            const isToday = index === mondayIndex;
            const steps = weeklySteps[index] || 0;
            const dayProgress = weeklyGoal > 0 ? (steps / (weeklyGoal / 7)) * 100 : 0;
            
            return (
              <div 
                key={day} 
                className={`text-center p-2 rounded-lg transition-all duration-300 ${
                  isToday 
                    ? 'bg-purple-500/20 border border-purple-400 glow-purple' 
                    : 'bg-gray-800/30'
                }`}
              >
                <div className="text-xs text-gray-400 mb-1">{day}</div>
                <div className="text-sm font-semibold text-purple-300">
                  {steps > 0 ? `${(steps / 1000).toFixed(1)}k` : '-'}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(dayProgress, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgress;

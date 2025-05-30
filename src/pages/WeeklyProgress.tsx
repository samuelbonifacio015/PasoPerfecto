
import React from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import WeeklyProgress from '@/components/WeeklyProgress';
import GoalSetter from '@/components/GoalSetter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const WeeklyProgressPage = () => {
  const [weeklySteps] = useLocalStorage('weeklySteps', [0, 0, 0, 0, 0, 0, 0]);
  const [weeklyGoal, setWeeklyGoal] = useLocalStorage('weeklyGoal', 50000);
  const [monthlyGoal, setMonthlyGoal] = useLocalStorage('monthlyGoal', 200000);

  const handleSetWeeklyGoal = (goal: number) => {
    setWeeklyGoal(goal);
    toast({
      title: "¡Meta semanal actualizada!",
      description: `Nueva meta: ${goal.toLocaleString()} pasos por semana`,
    });
  };

  const handleSetMonthlyGoal = (goal: number) => {
    setMonthlyGoal(goal);
    toast({
      title: "¡Meta mensual actualizada!",
      description: `Nueva meta: ${goal.toLocaleString()} pasos por mes`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between py-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-purple-300 hover:text-purple-100 hover:bg-purple-500/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Inicio
            </Button>
          </Link>
          <h1 className="text-2xl font-bold gradient-purple bg-clip-text text-transparent">
            Progreso Semanal
          </h1>
        </div>

        {/* Weekly Progress Component */}
        <WeeklyProgress
          weeklySteps={weeklySteps}
          weeklyGoal={weeklyGoal}
        />

        {/* Goal Setter Component */}
        <GoalSetter
          weeklyGoal={weeklyGoal}
          monthlyGoal={monthlyGoal}
          onSetWeeklyGoal={handleSetWeeklyGoal}
          onSetMonthlyGoal={handleSetMonthlyGoal}
        />
      </div>
    </div>
  );
};

export default WeeklyProgressPage;

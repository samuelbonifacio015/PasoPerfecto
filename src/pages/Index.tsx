
import React, { useEffect } from 'react';
import StepCounter from '@/components/StepCounter';
import WeeklyProgress from '@/components/WeeklyProgress';
import GoalSetter from '@/components/GoalSetter';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [dailySteps, setDailySteps] = useLocalStorage('dailySteps', 0);
  const [weeklySteps, setWeeklySteps] = useLocalStorage('weeklySteps', [0, 0, 0, 0, 0, 0, 0]);
  const [weeklyGoal, setWeeklyGoal] = useLocalStorage('weeklyGoal', 50000);
  const [monthlyGoal, setMonthlyGoal] = useLocalStorage('monthlyGoal', 200000);
  const [lastUpdateDate, setLastUpdateDate] = useLocalStorage('lastUpdateDate', new Date().toDateString());

  const currentDate = new Date().toDateString();
  const currentDayIndex = new Date().getDay();
  const mondayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  // Reset daily steps if it's a new day
  useEffect(() => {
    if (lastUpdateDate !== currentDate) {
      setDailySteps(0);
      setLastUpdateDate(currentDate);
      
      // Update weekly array with yesterday's steps
      const newWeeklySteps = [...weeklySteps];
      const yesterdayIndex = mondayIndex === 0 ? 6 : mondayIndex - 1;
      newWeeklySteps[yesterdayIndex] = dailySteps;
      setWeeklySteps(newWeeklySteps);
    }
  }, [currentDate, lastUpdateDate]);

  // Update today's steps in weekly array whenever dailySteps changes
  useEffect(() => {
    const newWeeklySteps = [...weeklySteps];
    newWeeklySteps[mondayIndex] = dailySteps;
    setWeeklySteps(newWeeklySteps);
  }, [dailySteps, mondayIndex]);

  const handleAddSteps = (steps: number) => {
    const newSteps = dailySteps + steps;
    setDailySteps(newSteps);
    
    if (newSteps >= 10000) {
      toast({
        title: "¡Increíble! 🎉",
        description: "¡Has alcanzado los 10,000 pasos hoy!",
      });
    }
  };

  const handleSetSteps = (steps: number) => {
    setDailySteps(steps);
    toast({
      title: "Pasos actualizados",
      description: `Pasos registrados: ${steps.toLocaleString()}`,
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días!";
    if (hour < 18) return "¡Buenas tardes!";
    return "¡Buenas noches!";
  };

  const getMotivationalMessage = () => {
    const totalWeeklySteps = weeklySteps.reduce((sum, steps) => sum + steps, 0);
    const weeklyProgress = (totalWeeklySteps / weeklyGoal) * 100;
    
    if (weeklyProgress >= 100) return "¡Has superado tu meta semanal! 🏆";
    if (weeklyProgress >= 75) return "¡Casi alcanzas tu meta! Sigue así 💪";
    if (weeklyProgress >= 50) return "¡Vas por buen camino! 👟";
    return "¡Cada paso cuenta! Comienza tu jornada 🚀";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold gradient-purple bg-clip-text text-transparent mb-2">
            PasoPerfecto
          </h1>
          <p className="text-purple-300 text-lg">{getGreeting()}</p>
          <p className="text-gray-400 text-sm mt-2">{getMotivationalMessage()}</p>
        </div>

        {/* Step Counter */}
        <StepCounter
          dailySteps={dailySteps}
          onAddSteps={handleAddSteps}
          onSetSteps={handleSetSteps}
        />

        {/* Weekly Progress */}
        <WeeklyProgress
          weeklySteps={weeklySteps}
          weeklyGoal={weeklyGoal}
        />

        {/* Goal Setter */}
        <GoalSetter
          weeklyGoal={weeklyGoal}
          monthlyGoal={monthlyGoal}
          onSetWeeklyGoal={setWeeklyGoal}
          onSetMonthlyGoal={setMonthlyGoal}
        />

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">
            ¡Mantente activo y alcanza tus metas! 🎯
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

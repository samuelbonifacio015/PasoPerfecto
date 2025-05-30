
import React, { useEffect } from 'react';
import StepCounter from '@/components/StepCounter';
import CircularStepTracker from '@/components/CircularStepTracker';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [dailySteps, setDailySteps] = useLocalStorage('dailySteps', 0);
  const [weeklySteps, setWeeklySteps] = useLocalStorage('weeklySteps', [0, 0, 0, 0, 0, 0, 0]);
  const [dailyGoal] = useLocalStorage('dailyGoal', 10000);
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
    
    if (newSteps >= dailyGoal && dailySteps < dailyGoal) {
      toast({
        title: "¡Increíble! 🎉",
        description: "¡Has alcanzado tu meta diaria!",
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
    const progress = (dailySteps / dailyGoal) * 100;
    
    if (progress >= 100) return "¡Has superado tu meta diaria! 🏆";
    if (progress >= 75) return "¡Casi alcanzas tu meta! Sigue así 💪";
    if (progress >= 50) return "¡Vas por buen camino! 👟";
    return "¡Cada paso cuenta! Comienza tu jornada 🚀";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-5xl font-bold gradient-purple bg-clip-text text-transparent mb-3">
            PasoPerfecto
          </h1>
          <p className="text-purple-300 text-xl">{getGreeting()}</p>
          <p className="text-gray-400 text-sm mt-2">{getMotivationalMessage()}</p>
        </div>

        {/* Circular Step Tracker - Main Focus */}
        <CircularStepTracker 
          steps={dailySteps} 
          goal={dailyGoal}
        />

        {/* Step Counter */}
        <StepCounter
          dailySteps={dailySteps}
          onAddSteps={handleAddSteps}
          onSetSteps={handleSetSteps}
        />

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Link to="/weekly-progress">
            <Button 
              className="w-full gradient-purple hover:opacity-90 transition-all duration-300 h-14"
              size="lg"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Progreso Semanal
            </Button>
          </Link>
          <Button 
            variant="outline"
            className="w-full border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300 h-14"
            size="lg"
          >
            <Target className="w-5 h-5 mr-2" />
            Estadísticas
          </Button>
        </div>

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


import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [dailySteps, setDailySteps] = useLocalStorage('dailySteps', 6000);
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

  const percentage = Math.min((dailySteps / dailyGoal) * 100, 100);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white pb-20">
      {/* Header */}
      <div className="text-center pt-12 pb-6">
        <h1 className="text-lg font-medium text-gray-300">Lejos Del Sofá</h1>
        <div className="mt-2">
          <span className="text-sm text-gray-400">Misión Del Día: </span>
          <span className="text-white">Quedan 3000 Pasos</span>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-2 mx-4">
            <div 
              className="bg-purple-500 h-1 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm text-gray-400">{Math.round(percentage)}%</span>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center mb-8">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background Circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(107, 114, 128, 0.3)"
              strokeWidth="12"
            />
            {/* Progress Circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-white mb-1">
              {dailySteps.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400 mb-1">Pasos</div>
            <div className="text-lg font-semibold text-purple-300">
              {Math.round(percentage)}%
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Meta Establecida: {dailyGoal.toLocaleString()} Pasos
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => handleAddSteps(1000)}
            variant="outline"
            className="border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 h-12 text-sm"
          >
            +1000👟
          </Button>
          <Button
            onClick={() => handleAddSteps(3000)}
            variant="outline"
            className="border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 h-12 text-sm"
          >
            +3000👟
          </Button>
          <Button
            onClick={() => handleAddSteps(6000)}
            variant="outline"
            className="border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 h-12 text-sm"
          >
            +6000👟
          </Button>
        </div>
      </div>

      {/* Custom Amount Button */}
      <div className="px-4 mb-8">
        <Button className="w-full gradient-purple hover:opacity-90 h-12 text-lg">
          ➕ Añadir Cant. Personalizada
        </Button>
      </div>

      {/* Exercise Section */}
      <Card className="mx-4 glass-effect border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <div className="text-white text-sm">🏃</div>
            </div>
            <span className="text-lg">Ejercicios</span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">0h 0m</div>
              <div className="text-sm text-gray-400">Min</div>
            </div>
            <div>
              <div className="text-2xl font-bold">0,0</div>
              <div className="text-sm text-gray-400">Kcal</div>
            </div>
            <div>
              <div className="text-2xl font-bold">0,00</div>
              <div className="text-sm text-gray-400">Km</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-purple-500/20">
        <div className="grid grid-cols-4 py-2">
          <Link to="/" className="flex flex-col items-center py-3">
            <Home className="w-6 h-6 text-purple-400" />
            <span className="text-xs text-purple-400 mt-1">Menu</span>
          </Link>
          <Link to="/weekly-progress" className="flex flex-col items-center py-3">
            <div className="w-6 h-6 text-gray-400">📊</div>
            <span className="text-xs text-gray-400 mt-1">Actividades</span>
          </Link>
          <Link to="/calendar" className="flex flex-col items-center py-3">
            <Calendar className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Calendario</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center py-3">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

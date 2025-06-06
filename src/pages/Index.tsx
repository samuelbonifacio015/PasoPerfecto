import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar as CalendarIcon, User, Target, Plus, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';

const Index = () => {
  const { userData, updateSteps } = useUserData();
  const [customSteps, setCustomSteps] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const progressPercentage = Math.min((userData.steps / userData.dailyGoal) * 100, 100);
  const isGoalCompleted = userData.steps >= userData.dailyGoal;
  const currentDate = new Date().toISOString().split('T')[0];

  const handleAddSteps = (steps: number) => {
    const newSteps = userData.steps + steps;
    updateSteps(newSteps, currentDate);
  };

  const handleCustomSteps = () => {
    if (customSteps && !isNaN(Number(customSteps))) {
      handleAddSteps(Number(customSteps));
      setCustomSteps('');
      setShowCustomInput(false);
    }
  };

  // SVG definitions for the progress circle
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white">
      {/* Header */}
      <div className="text-center pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white mb-2">PasoPerfecto</h1>
        <p className="text-primary-200">¡Sigue caminando hacia tu meta!</p>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg className="transform -rotate-90" width="280" height="280">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7A12FF" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7A12FF" />
              </linearGradient>
            </defs>
            
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="rgba(122, 18, 255, 0.2)"
              strokeWidth="20"
              fill="none"
              className="drop-shadow-lg"
            />
            
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="url(#progressGradient)"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-1000 ease-out drop-shadow-lg glow-purple"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(122, 18, 255, 0.4))'
              }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white mb-2">
              {userData.steps.toLocaleString()}
            </div>
            <div className="text-primary-200 mb-1">pasos</div>
            <div className="text-2xl font-semibold text-white">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-primary-300">
              Meta: {userData.dailyGoal.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Button 
            onClick={() => handleAddSteps(1000)}
            className="bg-primary-600/80 hover:bg-primary-500 border border-primary-400/30 h-12 font-semibold text-lg backdrop-blur-sm"
          >
            +1000
          </Button>
          <Button 
            onClick={() => handleAddSteps(3000)}
            className="bg-primary-600/80 hover:bg-primary-500 border border-primary-400/30 h-12 font-semibold text-lg backdrop-blur-sm"
          >
            +3000
          </Button>
          <Button 
            onClick={() => handleAddSteps(6000)}
            className="bg-primary-600/80 hover:bg-primary-500 border border-primary-400/30 h-12 font-semibold text-lg backdrop-blur-sm"
          >
            +6000
          </Button>
        </div>

        {!showCustomInput ? (
          <Button 
            onClick={() => setShowCustomInput(true)}
            className="w-full bg-gradient-purple hover:bg-primary-500 h-12 flex items-center gap-2 text-lg font-semibold border border-primary-400/30 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Personalizar Pasos</span>
          </Button>
        ) : (
          <div className="flex gap-2">
            <input
              type="number"
              value={customSteps}
              onChange={(e) => setCustomSteps(e.target.value)}
              placeholder="Ingresa pasos"
              className="flex-1 px-4 py-3 bg-primary-700/50 border border-primary-500/30 rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <Button 
              onClick={handleCustomSteps}
              className="bg-primary-500 hover:bg-primary-600 px-6"
            >
              Agregar
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white mb-1">1h 35m</div>
              <div className="text-sm text-primary-200">Tiempo</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white mb-1">300</div>
              <div className="text-sm text-primary-200">Calorías</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white mb-1">7.58</div>
              <div className="text-sm text-primary-200">Km</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Goal Status */}
      {isGoalCompleted && (
        <div className="mx-4 mb-6">
          <Card className="bg-green-500/20 border-green-500/40">
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-2">
                <Target className="w-6 h-6 text-green-400" />
                <span className="text-lg font-semibold text-green-400">¡Meta Completada!</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-800/95 backdrop-blur-md border-t border-primary-500/20">
        <div className="grid grid-cols-4 py-2">
          <Link to="/" className="flex flex-col items-center py-3">
            <Home className="w-6 h-6 text-primary-400" />
            <span className="text-xs text-primary-400 mt-1">Menu</span>
          </Link>
          <Link to="/weekly-progress" className="flex flex-col items-center py-3">
            <Activity className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Actividades</span>
          </Link>
          <Link to="/calendar" className="flex flex-col items-center py-3">
            <CalendarIcon className="w-6 h-6 text-gray-400" />
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

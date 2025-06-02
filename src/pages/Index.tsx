
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar, User, Activity, Plus, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';

const Index = () => {
  const { userData, updateSteps } = useUserData();
  const today = new Date().toISOString().split('T')[0];
  
  const percentage = Math.min((userData.steps / userData.dailyGoal) * 100, 100);
  const circumference = 2 * Math.PI * 120;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const addSteps = (steps: number) => {
    const newSteps = userData.steps + steps;
    updateSteps(newSteps, today);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      {/* Header */}
      <div className="text-center pt-12 pb-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold">Hola Samuel!</h1>
            <p className="text-purple-300">Continua Caminando!</p>
          </div>
        </div>
      </div>

      {/* Main Progress Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="rgba(107, 114, 128, 0.2)"
              strokeWidth="12"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2 glow-purple">
              {userData.steps.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400 mb-1">pasos</div>
            <div className="text-xs text-purple-300">
              Meta: {userData.dailyGoal.toLocaleString()}
            </div>
            <div className="text-lg font-semibold text-purple-300 mt-2">
              {Math.round(percentage)}%
            </div>
          </div>
        </div>
      </div>

      {/* Quick Step Buttons */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => addSteps(500)}
            className="h-16 gradient-purple hover:opacity-90 text-lg font-semibold"
          >
            +500 Pasos
          </Button>
          <Button 
            onClick={() => addSteps(1000)}
            className="h-16 gradient-purple hover:opacity-90 text-lg font-semibold"
          >
            +1000 Pasos
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button 
            onClick={() => addSteps(1500)}
            className="h-16 gradient-purple hover:opacity-90 text-lg font-semibold"
          >
            +1500 Pasos
          </Button>
          <Button 
            onClick={() => addSteps(2000)}
            className="h-16 gradient-purple hover:opacity-90 text-lg font-semibold"
          >
            +2000 Pasos
          </Button>
        </div>
      </div>

      {/* Achievement Messages */}
      {percentage >= 100 && (
        <Card className="mx-4 mb-6 glass-effect border-green-500/20 bg-green-500/10">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-green-300 font-semibold">¡Meta alcanzada!</div>
            <div className="text-sm text-green-400">¡Excelente trabajo hoy!</div>
          </CardContent>
        </Card>
      )}
      
      {percentage >= 75 && percentage < 100 && (
        <Card className="mx-4 mb-6 glass-effect border-yellow-500/20 bg-yellow-500/10">
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-yellow-300 font-semibold">¡Casi lo logras!</div>
            <div className="text-sm text-yellow-400">Te faltan {userData.dailyGoal - userData.steps} pasos</div>
          </CardContent>
        </Card>
      )}

      {/* Stats Card */}
      <Card className="mx-4 mb-6 glass-effect border-purple-500/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">{userData.level}</div>
              <div className="text-sm text-gray-400">Nivel</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{userData.pasocoins}</div>
              <div className="text-sm text-gray-400">Pasocoins</div>
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
            <Activity className="w-6 h-6 text-gray-400" />
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


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar, User, Activity, Plus, Target, Clock, Zap, MapPin } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white">
      {/* Header */}
      <div className="text-center pt-12 pb-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold text-white">Hola Samuel!</h1>
            <p className="text-primary-200">Continua Caminando!</p>
          </div>
        </div>
      </div>

      {/* Mission Progress Bar */}
      <div className="px-4 mb-6">
        <Card className="glass-card border-primary-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Misión Del Día: Quedan {userData.dailyGoal - userData.steps} Pasos</span>
              <span className="text-sm text-primary-300">{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-primary-800/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-400 to-primary-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Progress Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-72 h-72">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="rgba(122, 18, 255, 0.2)"
              strokeWidth="16"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="50%" stopColor="#7A12FF" />
                <stop offset="100%" stopColor="#472A6C" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-bold text-white mb-2 glow-purple">
              {userData.steps.toLocaleString()}
            </div>
            <div className="text-lg text-gray-300 mb-1">Pasos</div>
            <div className="text-2xl font-bold text-primary-300">
              {Math.round(percentage)}%
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Meta Establecida: {userData.dailyGoal.toLocaleString()} Pasos
            </div>
          </div>
        </div>
      </div>

      {/* Quick Step Buttons */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <Button 
            onClick={() => addSteps(1000)}
            className="h-16 gradient-purple-light hover:opacity-90 text-lg font-semibold border border-primary-400/30 shadow-lg transition-all duration-300 hover:scale-105"
          >
            +1000
            <div className="w-5 h-5 text-yellow-400 ml-2">🔥</div>
          </Button>
          <Button 
            onClick={() => addSteps(3000)}
            className="h-16 gradient-purple-light hover:opacity-90 text-lg font-semibold border border-primary-400/30 shadow-lg transition-all duration-300 hover:scale-105"
          >
            +3000
            <div className="w-5 h-5 text-yellow-400 ml-2">🔥</div>
          </Button>
          <Button 
            onClick={() => addSteps(6000)}
            className="h-16 gradient-purple-light hover:opacity-90 text-lg font-semibold border border-primary-400/30 shadow-lg transition-all duration-300 hover:scale-105"
          >
            +6000
            <div className="w-5 h-5 text-yellow-400 ml-2">🔥</div>
          </Button>
        </div>
        
        <Button 
          className="w-full mt-4 h-14 bg-primary-500 hover:bg-primary-600 text-lg font-semibold border border-primary-400/30 shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
        >
          <Plus className="w-6 h-6" />
          Añadir Cant. Personalizada
        </Button>
      </div>

      {/* Exercise Stats */}
      <Card className="mx-4 mb-8 glass-card border-primary-500/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-primary-400" />
            <span className="text-lg font-semibold text-white">Ejercicios</span>
          </div>
          
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-primary-400 mb-2" />
              <div className="text-2xl font-bold text-white">0h 0m</div>
              <div className="text-sm text-gray-400">Min</div>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-6 h-6 text-primary-400 mb-2" />
              <div className="text-2xl font-bold text-white">0,0</div>
              <div className="text-sm text-gray-400">Kcal</div>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-6 h-6 text-primary-400 mb-2" />
              <div className="text-2xl font-bold text-white">0,00</div>
              <div className="text-sm text-gray-400">Km</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Messages */}
      {percentage >= 100 && (
        <Card className="mx-4 mb-6 glass-card border-green-500/30 bg-green-500/10">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-green-300 font-semibold">¡Meta alcanzada!</div>
            <div className="text-sm text-green-400">¡Excelente trabajo hoy!</div>
          </CardContent>
        </Card>
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

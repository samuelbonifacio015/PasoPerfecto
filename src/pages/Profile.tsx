
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar, User, Activity, Clock, CheckCircle, TrendingUp, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';

const Profile = () => {
  const { userData } = useUserData();
  const userName = "Samuel";
  
  // Datos simulados para el gráfico semanal
  const weeklyData = [
    { day: 'Dom', steps: 2000 },
    { day: 'Lun', steps: 3000 },
    { day: 'Mar', steps: 4500 },
    { day: 'Mie', steps: 6000 },
    { day: 'Jue', steps: 7500 },
    { day: 'Vie', steps: 8000 },
    { day: 'Sab', steps: 6000 }
  ];

  const maxSteps = Math.max(...weeklyData.map(d => d.steps));
  const completedTasks = userData.tasks.filter(task => task.completed).length;
  const pendingTasks = userData.tasks.length - completedTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white pb-20">
      {/* Header */}
      <div className="text-center pt-12 pb-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold text-white">Hola {userName}!</h1>
            <p className="text-primary-200">Continua Caminando!</p>
          </div>
        </div>
      </div>

      {/* Main Progress Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r="100"
              fill="none"
              stroke="rgba(122, 18, 255, 0.2)"
              strokeWidth="12"
            />
            <circle
              cx="128"
              cy="128"
              r="100"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={628}
              strokeDashoffset={628 - (userData.steps / userData.dailyGoal * 628)}
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
            <div className="text-3xl font-bold text-white mb-1">
              {userData.steps.toLocaleString()}
            </div>
            <div className="text-sm text-primary-200 mb-1">Total Pasos</div>
            <div className="text-lg font-bold text-primary-300">
              {Math.round((userData.steps / userData.dailyGoal) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-primary-300 mr-2" />
                <span className="text-sm text-primary-200">Pendiente</span>
              </div>
              <div className="text-2xl font-bold text-white">{pendingTasks}.000</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm text-primary-200">Completado</span>
              </div>
              <div className="text-2xl font-bold text-white">{userData.steps.toLocaleString()}</div>
              <div className="w-5 h-5 text-yellow-400 mx-auto">🔥</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="mx-4 mb-6 glass-card border-primary-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Vista De Progreso</h3>
            <div className="text-sm text-primary-200">
              19.05.23 - 25.05.23
            </div>
          </div>
          
          {/* Chart */}
          <div className="relative h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 400 120">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7A12FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#472A6C" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              {/* Chart line and area */}
              <path
                d="M 20 100 L 70 80 L 120 60 L 170 30 L 220 20 L 270 25 L 320 50 L 370 40"
                stroke="#7A12FF"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 20 100 L 70 80 L 120 60 L 170 30 L 220 20 L 270 25 L 320 50 L 370 40 L 370 100 Z"
                fill="url(#chartGradient)"
                opacity="0.6"
              />
              
              {/* Data points */}
              {weeklyData.map((data, index) => (
                <circle
                  key={index}
                  cx={20 + index * 50}
                  cy={100 - (data.steps / maxSteps) * 80}
                  r="4"
                  fill="#7A12FF"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}
              
              {/* Highlight current day */}
              <circle
                cx={220}
                cy={20}
                r="8"
                fill="#7A12FF"
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text x={220} y={15} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                6.000
              </text>
              <text x={220} y={30} textAnchor="middle" fill="#C084FC" fontSize="8">
                Pasos
              </text>
            </svg>
          </div>
          
          {/* Days labels */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm text-primary-200">
            {weeklyData.map((data, index) => (
              <div key={index} className={index === 3 ? 'text-white font-semibold' : ''}>
                {data.day}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-800/95 backdrop-blur-md border-t border-primary-500/20">
        <div className="grid grid-cols-4 py-2">
          <Link to="/" className="flex flex-col items-center py-3">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Menu</span>
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
            <User className="w-6 h-6 text-primary-400" />
            <span className="text-xs text-primary-400 mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;

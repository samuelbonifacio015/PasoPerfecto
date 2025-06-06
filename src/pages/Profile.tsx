import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar as CalendarIcon, User, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useUserData } from '@/hooks/useUserData';

const Profile = () => {
  const { userData } = useUserData();

  const weeklyData = [
    { day: 'Lun', steps: 8500 },
    { day: 'Mar', steps: 7200 },
    { day: 'Mie', steps: 9800 },
    { day: 'Jue', steps: 6400 },
    { day: 'Vie', steps: 11200 },
    { day: 'Sab', steps: 8900 },
    { day: 'Dom', steps: 7600 }
  ];

  const totalWeeklySteps = weeklyData.reduce((sum, day) => sum + day.steps, 0);
  const progressPercentage = Math.min((userData.steps / userData.dailyGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white">
      {/* Header */}
      <div className="text-center pt-12 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">¡Continúa Caminando, Samuel!</h1>
        <p className="text-primary-200">Tu progreso semanal</p>
      </div>

      {/* Main Progress Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg className="transform -rotate-90" width="200" height="200">
            <defs>
              <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7A12FF" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7A12FF" />
              </linearGradient>
            </defs>
            
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="rgba(122, 18, 255, 0.2)"
              strokeWidth="16"
              fill="none"
            />
            
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="url(#profileGradient)"
              strokeWidth="16"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 80}`}
              strokeDashoffset={`${2 * Math.PI * 80 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-1000 ease-out glow-purple"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-white mb-1">
              {userData.steps.toLocaleString()}
            </div>
            <div className="text-sm text-primary-200">pasos hoy</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-white mb-2">{totalWeeklySteps.toLocaleString()}</div>
              <div className="text-sm text-primary-200">Pasos Totales</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-4">
              <div className="text-lg text-primary-200 mb-1">Objetivos</div>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">✓ Completados: {userData.tasks.filter(t => t.completed).length}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-yellow-400">⏳ Pendientes: {userData.tasks.filter(t => !t.completed).length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly Chart */}
      <Card className="mx-4 mb-20 glass-card border-primary-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary-300" />
            <h3 className="text-lg font-semibold text-white">Progreso Semanal</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#C084FC', fontSize: 12 }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="steps" 
                  stroke="#7A12FF" 
                  strokeWidth={3}
                  dot={{ fill: '#7A12FF', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#C084FC' }}
                />
              </LineChart>
            </ResponsiveContainer>
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
            <CalendarIcon className="w-6 h-6 text-gray-400" />
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

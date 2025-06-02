
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Progress = () => {
  const userName = "Samuel";
  const totalSteps = 6000;
  const pendingSteps = 4000;
  const completedSteps = 6000;
  
  // Datos del gráfico semanal
  const weeklyData = [
    { day: 'Dom', steps: 0 },
    { day: 'Lun', steps: 2000 },
    { day: 'Mar', steps: 0 },
    { day: 'Mié', steps: 0 },
    { day: 'Jue', steps: 6000 },
    { day: 'Vie', steps: 0 },
    { day: 'Sáb', steps: 0 }
  ];

  const maxSteps = Math.max(...weeklyData.map(d => d.steps));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <div>
            <div className="text-lg font-semibold">Hola {userName}!</div>
            <div className="text-sm text-gray-300">Continua Caminando!</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Daily Progress Card */}
      <Card className="mx-4 mt-6 glass-effect border-purple-500/20">
        <CardContent className="p-6">
          {/* Circular Progress */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(107, 114, 128, 0.3)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="339.29"
                  strokeDashoffset="135.72"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-xl font-bold text-white">
                  {totalSteps.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">Total Pasos</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Pendiente</div>
                <div className="text-lg font-semibold">{pendingSteps.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="text-white text-sm">✓</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Completado</div>
                <div className="text-lg font-semibold text-purple-300">{completedSteps.toLocaleString()}👟</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress Chart */}
      <Card className="mx-4 mt-6 glass-effect border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Vista De Progreso</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white">
                <div className="w-4 h-4">‹</div>
              </Button>
              <div className="text-sm text-gray-400">14:05:25<br/>25:05:25</div>
              <Button variant="ghost" size="sm" className="text-white">
                <div className="w-4 h-4">›</div>
              </Button>
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-40 mb-4">
            <svg className="w-full h-full" viewBox="0 0 350 160">
              {/* Grid lines */}
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" opacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" opacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Chart line */}
              <path
                d="M 30 140 L 80 120 L 130 140 L 180 140 L 230 40 L 280 140 L 330 140"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Fill area */}
              <path
                d="M 30 140 L 80 120 L 130 140 L 180 140 L 230 40 L 280 140 L 330 140 L 330 160 L 30 160 Z"
                fill="url(#chartGradient)"
              />
              
              {/* Data points */}
              {weeklyData.map((data, index) => {
                const x = 30 + index * 50;
                const y = data.steps === 0 ? 140 : 160 - (data.steps / maxSteps) * 100;
                
                return (
                  <g key={data.day}>
                    {data.steps > 0 && (
                      <>
                        <circle cx={x} cy={y} r="4" fill="#8b5cf6" />
                        <text x={x} y={y - 15} textAnchor="middle" className="fill-white text-xs">
                          {(data.steps / 1000).toFixed(0)}.000
                        </text>
                        <text x={x} y={y - 5} textAnchor="middle" className="fill-gray-400 text-xs">
                          Pasos
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Week days */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400">
            {weeklyData.map((data) => (
              <div key={data.day}>{data.day}</div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-purple-500/20">
        <div className="grid grid-cols-4 py-2">
          <Link to="/" className="flex flex-col items-center py-3">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Menu</span>
          </Link>
          <Link to="/progress" className="flex flex-col items-center py-3">
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

export default Progress;

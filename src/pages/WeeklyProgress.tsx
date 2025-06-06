
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar as CalendarIcon, User, Activity, CheckCircle, MoreHorizontal, Coins, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';
import AchievementCard from '@/components/AchievementCard';
import RecentActivity from '@/components/RecentActivity';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const WeeklyProgressPage = () => {
  const { userData, completeTask, getRecentActivity } = useUserData();
  const recentActivity = getRecentActivity();

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId);
  };

  // Weekly data for chart
  const weeklyData = [
    { day: 'Lun', steps: 8500 },
    { day: 'Mar', steps: 7200 },
    { day: 'Mie', steps: 9800 },
    { day: 'Jue', steps: 6400 },
    { day: 'Vie', steps: 11200 },
    { day: 'Sab', steps: 8900 },
    { day: 'Dom', steps: userData.steps }
  ];

  const unlockedAchievements = userData.achievements.filter(a => a.unlocked);
  const lockedAchievements = userData.achievements.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white font-satoshi">
      {/* Header */}
      <div className="flex items-center space-x-4 p-4 pt-12 animate-fade-in-up">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-xl font-semibold text-white">¡Hola Samuel!</div>
          <div className="text-lg text-primary-200">Bienvenido a las Actividades</div>
        </div>
      </div>

      {/* Level Section */}
      <Card className="mx-4 mt-6 glass-card border-primary-500/20 animate-fade-in-up">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Nivel {userData.level}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-yellow-400">{userData.streak}</span>
              <span className="text-sm text-primary-200">días seguidos</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-primary-200">XP Restante: Quedan {userData.maxXp - userData.xp} XP</span>
              <span className="text-white font-semibold">{Math.round((userData.xp / userData.maxXp) * 100)}%</span>
            </div>
            <div className="w-full bg-primary-700/40 rounded-full h-3 relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 relative"
                style={{ width: `${(userData.xp / userData.maxXp) * 100}%` }}
              >
                <div className="absolute right-1 top-0 bottom-0 flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress Chart */}
      <Card className="mx-4 mt-6 glass-card border-primary-500/20 animate-fade-in-up">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-300" />
            <h3 className="text-lg font-semibold text-white">Progreso Semanal</h3>
          </div>
          <div className="h-48">
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
                  dot={{ fill: '#7A12FF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#C084FC' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card className="mx-4 mt-6 glass-card border-primary-500/20 animate-fade-in-up">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Logros</h3>
            <span className="text-sm text-primary-200">
              ({unlockedAchievements.length}/{userData.achievements.length})
            </span>
          </div>
          
          <div className="space-y-3">
            {unlockedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
            
            {lockedAchievements.slice(0, 2).map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>

          {lockedAchievements.length > 2 && (
            <Button className="w-full mt-4 text-primary-300 hover:text-white transition-colors button-hover" variant="ghost">
              <span className="flex items-center gap-2">
                Ver Más Logros
                <div className="w-6 h-6 border border-primary-300 rounded-full flex items-center justify-center">
                  <span className="text-xs">+</span>
                </div>
              </span>
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="mx-4 mt-6 animate-fade-in-up">
        <RecentActivity activities={recentActivity} />
      </div>

      {/* Tasks Section */}
      <Card className="mx-4 mt-6 glass-card border-primary-500/20 animate-fade-in-up">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Tareas</h3>
          
          <div className="space-y-3">
            {userData.tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-primary-700/30 rounded-lg border border-primary-500/20 transition-all duration-200 hover:bg-primary-700/40">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    task.completed ? 'bg-green-500 animate-bounce-subtle' : 'bg-primary-600'
                  }`}>
                    {task.completed ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Activity className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <span className="text-white font-medium">{task.title}</span>
                    {!task.completed && (
                      <div className="text-xs text-primary-200">
                        {task.current}/{task.target} - {task.xp} XP
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {task.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <Button 
                      onClick={() => handleCompleteTask(task.id)}
                      variant="ghost" 
                      size="sm" 
                      className="p-2 h-auto button-hover"
                    >
                      <div className="w-6 h-6 border-2 border-gray-400 rounded-full hover:border-primary-400 transition-colors"></div>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Balance Section */}
      <Card className="mx-4 mt-6 glass-card border-primary-500/20 animate-fade-in-up">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg text-white font-medium">Saldo Actual:</span>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">{userData.pasocoins.toLocaleString()} Pasocoins</span>
              <Coins className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Section */}
      <Card className="mx-4 mt-6 mb-20 glass-card border-primary-500/20 animate-fade-in-up">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Tienda</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Insignia Fundador', price: 500 },
              { name: 'Boost XP x2', price: 900 },
              { name: 'Meta Personalizada', price: 750 }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center transition-transform duration-200 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2 relative achievement-badge">
                  <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                    <Coins className="w-4 h-4 text-yellow-800" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-4 bg-blue-500 rounded-t-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-primary-200 mb-1 font-medium">{item.name}</div>
                  <div className="text-xs font-semibold bg-purple-600 px-2 py-1 rounded text-white button-hover cursor-pointer">
                    {item.price} PC
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-800/95 backdrop-blur-md border-t border-primary-500/20">
        <div className="grid grid-cols-4 py-2">
          <Link to="/" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <Home className="w-6 h-6 text-gray-400 hover:text-primary-300 transition-colors" />
            <span className="text-xs text-gray-400 hover:text-primary-300 transition-colors mt-1">Menu</span>
          </Link>
          <Link to="/weekly-progress" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <Activity className="w-6 h-6 text-primary-400" />
            <span className="text-xs text-primary-400 mt-1">Actividades</span>
          </Link>
          <Link to="/calendar" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <CalendarIcon className="w-6 h-6 text-gray-400 hover:text-primary-300 transition-colors" />
            <span className="text-xs text-gray-400 hover:text-primary-300 transition-colors mt-1">Calendario</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <User className="w-6 h-6 text-gray-400 hover:text-primary-300 transition-colors" />
            <span className="text-xs text-gray-400 hover:text-primary-300 transition-colors mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgressPage;

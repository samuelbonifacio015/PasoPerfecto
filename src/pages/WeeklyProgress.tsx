import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar as CalendarIcon, User, Activity, CheckCircle, MoreHorizontal, Coins, Award, TrendingUp, ShoppingBag, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';
import AchievementCard from '@/components/AchievementCard';
import RecentActivity from '@/components/RecentActivity';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const WeeklyProgressPage = () => {
  const { userData, completeTask, getRecentActivity, setUserData } = useUserData();
  const recentActivity = getRecentActivity();

  const handleToggleTask = (taskId: string) => {
    setUserData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed, current: task.completed ? 0 : task.target }
          : task
      )
    }));
  };

  // Weekly data for chart with step counts
  const weeklyData = [
    { day: 'Lun', steps: 8500 },
    { day: 'Mar', steps: 7200 },
    { day: 'Mie', steps: 9800 },
    { day: 'Jue', steps: 6400 },
    { day: 'Vie', steps: 11200 },
    { day: 'Sab', steps: 8900 },
    { day: 'Dom', steps: userData.steps }
  ];

  // Safety check for achievements
  const achievements = userData.achievements || [];
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  // Extended store items
  const storeItems = [
    { name: 'Insignia Fundador', price: 500, icon: '🏅' },
    { name: 'Boost XP x2', price: 900, icon: '⚡' },
    { name: 'Meta Personalizada', price: 750, icon: '🎯' },
    { name: 'Tema Dorado', price: 1200, icon: '✨' },
    { name: 'Racha Protector', price: 1500, icon: '🛡️' },
    { name: 'Multiplicador Pasos', price: 2000, icon: '🚀' },
    { name: 'Avatar Premium', price: 800, icon: '👑' },
    { name: 'Estadísticas Pro', price: 1100, icon: '📊' }
  ];

  // Tips for earning pasocoins
  const pasocoinTips = [
    "Completa tareas diarias para ganar 50 Pasocoins",
    "Alcanza tu meta diaria para bonos extra",
    "Mantén una racha de 7 días para 200 Pasocoins",
    "Desbloquea logros para obtener recompensas",
    "Participa en desafíos semanales"
  ];

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
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#C084FC', fontSize: 10 }}
                  tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
                />
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
          {/* Show daily step counts */}
          <div className="grid grid-cols-7 gap-2 mt-4 text-xs text-center">
            {weeklyData.map((day, index) => (
              <div key={index} className="bg-primary-700/30 rounded-lg p-2">
                <div className="text-primary-200">{day.day}</div>
                <div className="text-white font-semibold">{day.steps.toLocaleString()}</div>
              </div>
            ))}
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
              ({unlockedAchievements.length}/{achievements.length})
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
                  <div 
                    onClick={() => handleToggleTask(task.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      task.completed ? 'bg-green-500 animate-bounce-subtle' : 'bg-primary-600 hover:bg-primary-500'
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Activity className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <span className={`font-medium ${task.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                      {task.title}
                    </span>
                    {!task.completed && (
                      <div className="text-xs text-primary-200">
                        {task.current}/{task.target} - {task.xp} XP
                      </div>
                    )}
                  </div>
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

      {/* Pasocoins Tips */}
      <Card className="mx-4 mt-6 glass-card border-primary-500/20 animate-fade-in-up">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Consejos para Ganar Pasocoins</h3>
          </div>
          <div className="space-y-2">
            {pasocoinTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-primary-200">
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-xs text-black font-bold mt-0.5">
                  {index + 1}
                </div>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Store Section */}
      <Card className="mx-4 mt-6 mb-20 glass-card border-primary-500/20 animate-fade-in-up">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Tienda</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {storeItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-3 bg-primary-700/30 rounded-lg border border-primary-500/20 transition-transform duration-200 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2 text-xl">
                  {item.icon}
                </div>
                <div className="text-center">
                  <div className="text-xs text-primary-200 mb-1 font-medium">{item.name}</div>
                  <Button 
                    size="sm"
                    className="text-xs font-semibold bg-purple-600 hover:bg-purple-700 px-3 py-1 h-auto"
                  >
                    {item.price} PC
                  </Button>
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

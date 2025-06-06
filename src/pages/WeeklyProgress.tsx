
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar as CalendarIcon, User, Activity, CheckCircle, MoreHorizontal, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';

const WeeklyProgressPage = () => {
  const { userData, completeTask } = useUserData();

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white">
      {/* Header */}
      <div className="flex items-center space-x-4 p-4 pt-12">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-xl font-semibold text-white">Hola Samuel!</div>
          <div className="text-lg text-primary-200">¡Bienvenido A Las Actividades!</div>
        </div>
      </div>

      {/* Level Section */}
      <Card className="mx-4 mt-6 glass-card border-primary-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Nivel {userData.level}</span>
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
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card className="mx-4 mt-6 glass-card border-primary-500/20">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Tareas</h3>
          
          <div className="space-y-3">
            {userData.tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-primary-700/30 rounded-lg border border-primary-500/20">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    task.completed ? 'bg-green-500' : 'bg-primary-600'
                  }`}>
                    {task.completed ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Activity className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-white">{task.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {task.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                  )}
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4 text-primary-300 hover:text-white transition-colors" variant="ghost">
            <span className="flex items-center gap-2">
              See More
              <div className="w-6 h-6 border border-primary-300 rounded-full flex items-center justify-center">
                <span className="text-xs">+</span>
              </div>
            </span>
          </Button>
        </CardContent>
      </Card>

      {/* Balance Section */}
      <Card className="mx-4 mt-6 glass-card border-primary-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg text-white">Saldo Actual:</span>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">{userData.pasocoins.toLocaleString()} Pasocoins</span>
              <Coins className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Section */}
      <Card className="mx-4 mt-6 mb-20 glass-card border-primary-500/20">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Tienda</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Insignia Fundador', price: 500 },
              { name: 'Insignia Fundador', price: 900 },
              { name: 'Insignia Fundador', price: 950 }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2 relative">
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
                  <div className="text-xs text-primary-200 mb-1">{item.name}</div>
                  <div className="text-xs font-semibold bg-purple-600 px-2 py-1 rounded text-white">
                    Precio: {item.price}
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
          <Link to="/" className="flex flex-col items-center py-3">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Menu</span>
          </Link>
          <Link to="/weekly-progress" className="flex flex-col items-center py-3">
            <Activity className="w-6 h-6 text-primary-400" />
            <span className="text-xs text-primary-400 mt-1">Actividades</span>
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

export default WeeklyProgressPage;

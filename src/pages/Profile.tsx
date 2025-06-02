
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar, User, Settings, ChevronRight, Target, BarChart3, Activity, Clock, CheckCircle, Gift, Medal, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';

const Profile = () => {
  const { userData, completeTask } = useUserData();
  const userName = "Samuel";
  
  const xpPercentage = (userData.xp / userData.maxXp) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white pb-20">
      {/* Header */}
      <div className="text-center pt-12 pb-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold">Hola {userName}!</h1>
            <p className="text-purple-300">¡Bienvenido A Las Actividades!</p>
          </div>
        </div>
      </div>

      {/* Level Section */}
      <Card className="mx-4 mb-6 glass-effect border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">Nivel {userData.level}</div>
              </div>
            </div>
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>XP Restante: Quedan {userData.maxXp - userData.xp} XP</span>
              <span>{Math.round(xpPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card className="mx-4 mb-6 glass-effect border-purple-500/20">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Tareas</h3>
          
          <div className="space-y-3">
            {userData.tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    task.completed ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    {task.completed ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <span className="text-sm">{task.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {task.completed && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs">📋</span>
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="ghost" 
              className="w-full text-purple-400 hover:text-purple-300 flex items-center justify-center gap-2"
            >
              See More
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pasocoins Section */}
      <Card className="mx-4 mb-6 glass-effect border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Saldo Actual:</span>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">{userData.pasocoins.toLocaleString()}</span>
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-xs">💰</span>
              </div>
              <span className="text-sm text-gray-400">Pasocoins</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Section */}
      <Card className="mx-4 mb-6 glass-effect border-purple-500/20">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Tienda</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Insignia Fundador', price: 500, icon: Medal },
              { name: 'Insignia Fundador', price: 900, icon: Medal },
              { name: 'Insignia Fundador', price: 950, icon: Medal }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 relative">
                  <item.icon className="w-8 h-8 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">🏆</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-1">{item.name}</div>
                <div className="text-xs font-semibold">Precio: {item.price} 💰</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Options */}
      <div className="px-4 space-y-3">
        <Card className="glass-effect border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Configuración</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Mis Objetivos</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Estadísticas</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-purple-500/20">
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
            <User className="w-6 h-6 text-purple-400" />
            <span className="text-xs text-purple-400 mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;

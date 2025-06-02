
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar, User, Settings, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white pb-20">
      {/* Header */}
      <div className="text-center pt-12 pb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <h1 className="text-2xl font-bold">Samuel</h1>
        <p className="text-gray-400">Caminante Activo</p>
      </div>

      {/* Profile Options */}
      <div className="px-4 space-y-4">
        <Card className="glass-effect border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="w-6 h-6 text-purple-400" />
                <span>Configuración</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 text-purple-400">🎯</div>
                <span>Mis Objetivos</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 text-purple-400">📊</div>
                <span>Estadísticas</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
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
          <Link to="/progress" className="flex flex-col items-center py-3">
            <div className="w-6 h-6 text-gray-400">📊</div>
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

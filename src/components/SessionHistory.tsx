
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, ChevronDown } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

const SessionHistory = () => {
  const { getRecentActivity } = useUserData();
  const recentSessions = getRecentActivity();

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-400" />
          Historial de Sesiones
        </h3>
        
        <div className="space-y-3">
          {recentSessions.length > 0 ? (
            recentSessions.map((session, index) => (
              <div key={index} className="p-3 bg-primary-700/30 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {new Date(session.date).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </div>
                    <div className="text-xs text-primary-200">{session.time}</div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary-300 h-6 w-6 p-0">
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{session.steps?.toLocaleString() || 0}</div>
                    <div className="text-xs text-primary-200">Pasos</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{session.calories || 0}</div>
                    <div className="text-xs text-primary-200">Calorías</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{session.distance?.toFixed(2) || 0} km</div>
                    <div className="text-xs text-primary-200">Distancia</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <div className="text-primary-300 mb-2">No hay sesiones registradas</div>
              <div className="text-sm text-primary-400">¡Comienza a caminar para ver tu historial!</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionHistory;

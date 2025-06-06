
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Clock, Zap, MapPin } from 'lucide-react';

interface ActivityData {
  date: string;
  steps: number;
  calories: number;
  distance: number;
  time: string;
}

interface RecentActivityProps {
  activities: ActivityData[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card className="glass-card border-primary-500/20">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary-300" />
          Actividad Reciente
        </h3>
        
        <div className="space-y-3">
          {activities.length === 0 ? (
            <p className="text-primary-200 text-center py-4">No hay actividad reciente</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.date} className="p-3 bg-primary-700/30 rounded-lg border border-primary-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">
                    {new Date(activity.date).toLocaleDateString('es-ES', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="text-primary-300 font-semibold">
                    {activity.steps.toLocaleString()} pasos
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-primary-400" />
                    <span className="text-primary-200">{activity.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-primary-400" />
                    <span className="text-primary-200">{activity.calories} kcal</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-primary-400" />
                    <span className="text-primary-200">{activity.distance} km</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

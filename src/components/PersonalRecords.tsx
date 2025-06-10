
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Award } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

const PersonalRecords = () => {
  const { userData } = useUserData();
  
  // Calculate personal records from daily data
  const dailyData = Object.values(userData.dailyData || {});
  const maxSteps = Math.max(...dailyData.map(d => d.steps || 0), userData.steps || 0);
  const maxDistance = Math.max(...dailyData.map(d => d.distance || 0), 0);
  
  // Calculate max streak (simplified calculation)
  const maxStreak = userData.streak || 0;

  const records = [
    {
      title: 'Máximos Pasos',
      value: maxSteps.toLocaleString(),
      subtitle: 'en un día',
      icon: Trophy,
      color: 'text-yellow-400'
    },
    {
      title: 'Mayor Racha',
      value: `${maxStreak} días`,
      subtitle: 'consecutivos',
      icon: Target,
      color: 'text-green-400'
    },
    {
      title: 'Mayor Distancia',
      value: `${maxDistance.toFixed(2)} km`,
      subtitle: 'en una sesión',
      icon: Award,
      color: 'text-blue-400'
    }
  ];

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Mis Marcas Personales
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {records.map((record, index) => (
            <div key={index} className="text-center p-3 bg-primary-700/30 rounded-lg">
              <record.icon className={`w-6 h-6 mx-auto mb-2 ${record.color}`} />
              <div className="text-lg font-bold text-white">{record.value}</div>
              <div className="text-xs text-primary-200">{record.title}</div>
              <div className="text-xs text-primary-300">{record.subtitle}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalRecords;

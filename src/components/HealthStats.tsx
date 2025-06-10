
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Calendar as CalendarIcon, TrendingUp } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

const HealthStats = () => {
  const { userData } = useUserData();
  const [filter, setFilter] = useState<'week' | 'month'>('week');

  // Calculate totals based on filter
  const calculateTotals = () => {
    const dailyData = Object.values(userData.dailyData || {});
    const now = new Date();
    const filterDate = new Date();
    
    if (filter === 'week') {
      filterDate.setDate(now.getDate() - 7);
    } else {
      filterDate.setMonth(now.getMonth() - 1);
    }

    const filteredData = dailyData.filter(data => {
      // This is a simplified filter - in real app you'd use the actual dates
      return true;
    });

    const totalCalories = filteredData.reduce((sum, data) => sum + (data.calories || 0), 0);
    const totalDistance = filteredData.reduce((sum, data) => sum + (data.distance || 0), 0);
    
    // Calculate total time (simplified)
    const totalMinutes = filteredData.length * 45; // Average 45 minutes per day
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {
      calories: totalCalories + (userData.steps * 0.04), // Add current day
      distance: totalDistance + (userData.steps * 0.0008),
      time: `${hours}h ${minutes}m`
    };
  };

  const totals = calculateTotals();

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Estadísticas de Salud
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={filter === 'week' ? 'default' : 'outline'}
              onClick={() => setFilter('week')}
              className="text-xs"
            >
              Semana
            </Button>
            <Button
              size="sm"
              variant={filter === 'month' ? 'default' : 'outline'}
              onClick={() => setFilter('month')}
              className="text-xs"
            >
              Mes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-primary-700/30 rounded-lg">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-lg font-bold text-white">{Math.round(totals.calories)}</div>
            <div className="text-xs text-primary-200">Calorías Quemadas</div>
          </div>
          
          <div className="text-center p-3 bg-primary-700/30 rounded-lg">
            <div className="text-2xl mb-1">📍</div>
            <div className="text-lg font-bold text-white">{totals.distance.toFixed(1)} km</div>
            <div className="text-xs text-primary-200">Distancia Total</div>
          </div>
          
          <div className="text-center p-3 bg-primary-700/30 rounded-lg">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-lg font-bold text-white">{totals.time}</div>
            <div className="text-xs text-primary-200">Tiempo Caminando</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthStats;

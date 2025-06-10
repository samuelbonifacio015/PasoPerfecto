
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, Calendar, Activity } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';
import { useDailyProgress } from '@/hooks/useDailyProgress';

interface MonthSummaryProps {
  month: number;
  year: number;
}

const MonthSummary: React.FC<MonthSummaryProps> = ({ month, year }) => {
  const { userData } = useUserData();
  const { getProgressForDate } = useDailyProgress();

  const getMonthSummary = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let totalSteps = 0;
    let activeDays = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayData = userData.dailyData[date] || getProgressForDate(date);
      
      if (dayData && dayData.steps > 0) {
        totalSteps += dayData.steps;
        activeDays++;
        
        if (dayData.steps >= userData.dailyGoal) {
          tempStreak++;
          maxStreak = Math.max(maxStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      } else {
        tempStreak = 0;
      }
    }

    const inactiveDays = daysInMonth - activeDays;
    const averageSteps = activeDays > 0 ? Math.round(totalSteps / activeDays) : 0;

    return {
      totalSteps,
      activeDays,
      inactiveDays,
      maxStreak,
      averageSteps,
      daysInMonth
    };
  };

  const summary = getMonthSummary();
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <Card className="glass-card border-primary-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Resumen de {monthNames[month]} {year}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-primary-700/30 rounded-lg">
            <div className="text-2xl font-bold text-white">{summary.totalSteps.toLocaleString()}</div>
            <div className="text-sm text-primary-200">Pasos Totales</div>
          </div>
          <div className="text-center p-3 bg-primary-700/30 rounded-lg">
            <div className="text-2xl font-bold text-white">{summary.averageSteps.toLocaleString()}</div>
            <div className="text-sm text-primary-200">Promedio Diario</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-primary-700/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-green-400" />
              <span className="text-white">Días Activos</span>
            </div>
            <Badge className="bg-green-600">
              {summary.activeDays}/{summary.daysInMonth}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-primary-700/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-red-400" />
              <span className="text-white">Días Inactivos</span>
            </div>
            <Badge variant="outline" className="border-red-500/50 text-red-400">
              {summary.inactiveDays}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-primary-700/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-yellow-400" />
              <span className="text-white">Racha Máxima</span>
            </div>
            <Badge className="bg-yellow-600">
              {summary.maxStreak} días
            </Badge>
          </div>
        </div>

        {/* Porcentaje de éxito */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
          <div className="text-center">
            <div className="text-xl font-bold text-white">
              {Math.round((summary.activeDays / summary.daysInMonth) * 100)}%
            </div>
            <div className="text-sm text-blue-300">Tasa de Actividad</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthSummary;

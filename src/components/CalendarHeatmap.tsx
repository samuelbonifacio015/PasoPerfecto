
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserData } from '@/hooks/useUserData';
import { useDailyProgress } from '@/hooks/useDailyProgress';

interface CalendarHeatmapProps {
  currentMonth: number;
  currentYear: number;
  onDayClick: (date: string) => void;
  selectedDate: string;
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({
  currentMonth,
  currentYear,
  onDayClick,
  selectedDate
}) => {
  const { userData } = useUserData();
  const { getProgressForDate } = useDailyProgress();

  const getDaysInMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Días del mes anterior
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: `${year}-${String(month).padStart(2, '0')}-${String(daysInPrevMonth - i).padStart(2, '0')}`
      });
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      });
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: `${year}-${String(month + 2).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      });
    }
    
    return days;
  };

  const getHeatmapColor = (date: string, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return 'bg-gray-800/20';
    
    const dayData = userData.dailyData[date] || getProgressForDate(date);
    if (!dayData || dayData.steps === 0) return 'bg-primary-700/20';
    
    const completionPercent = (dayData.steps / userData.dailyGoal) * 100;
    
    if (completionPercent >= 100) return 'bg-green-500';
    if (completionPercent >= 75) return 'bg-yellow-500';
    if (completionPercent >= 50) return 'bg-orange-500';
    if (completionPercent >= 25) return 'bg-red-400';
    return 'bg-red-600/60';
  };

  const getCompletionPercent = (date: string) => {
    const dayData = userData.dailyData[date] || getProgressForDate(date);
    if (!dayData) return 0;
    return Math.round((dayData.steps / userData.dailyGoal) * 100);
  };

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const calendarDays = getDaysInMonth(currentMonth, currentYear);
  const today = new Date().toISOString().split('T')[0];

  // Organizar días en semanas
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <Card className="glass-card border-primary-500/20">
      <CardContent className="p-4">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-primary-200 font-medium py-2 text-sm">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar heatmap */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2 mb-2">
            {week.map((dayInfo, dayIndex) => {
              const isToday = dayInfo.date === today;
              const heatmapColor = getHeatmapColor(dayInfo.date, dayInfo.isCurrentMonth);
              const completionPercent = getCompletionPercent(dayInfo.date);
              
              return (
                <div
                  key={dayIndex}
                  onClick={() => dayInfo.isCurrentMonth && onDayClick(dayInfo.date)}
                  className={`relative text-center py-3 rounded-lg transition-all duration-200 cursor-pointer ${heatmapColor} ${
                    isToday 
                      ? 'ring-2 ring-primary-300 font-bold' 
                      : !dayInfo.isCurrentMonth 
                      ? 'text-gray-600' 
                      : selectedDate === dayInfo.date
                      ? 'ring-2 ring-primary-400'
                      : 'hover:scale-105'
                  }`}
                  title={dayInfo.isCurrentMonth ? `${completionPercent}% de meta cumplida` : ''}
                >
                  <div className="text-white font-medium">{dayInfo.day}</div>
                  {dayInfo.isCurrentMonth && completionPercent > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                      <Badge variant="secondary" className="text-xs px-1 py-0 bg-black/30 text-white">
                        {completionPercent}%
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Leyenda */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-primary-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-red-600/60"></div>
            <span>0-25%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-orange-500"></div>
            <span>50%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-yellow-500"></div>
            <span>75%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span>100%+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarHeatmap;

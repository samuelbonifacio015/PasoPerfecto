
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Home, Calendar as CalendarIcon, User, CheckCircle, Plus, Clock, Zap, Target, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';

const Calendar = () => {
  const { userData, updateSteps } = useUserData();
  const [selectedDate, setSelectedDate] = useState('2025-12-14');
  const currentDate = new Date();
  const currentMonth = 'December';
  const currentYear = 2025;
  
  // Días del calendario
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDays = [
    [27, 28, 29, 30, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
    [1, 2, 3, 4, 5, 6, 7]
  ];

  const selectedDayData = userData.dailyData[selectedDate] || { steps: 0, tasks: [], xpEarned: 0 };
  const isGoalCompleted = selectedDayData.steps >= userData.dailyGoal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-2xl font-bold">{currentYear}</div>
            <div className="text-lg text-gray-300">{currentMonth}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Calendar */}
      <Card className="mx-4 mt-4 glass-effect border-purple-500/20">
        <CardContent className="p-4">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-gray-400 font-medium py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          {calendarDays.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2 mb-2">
              {week.map((day, dayIndex) => {
                const isToday = day === 14 && weekIndex === 2;
                const isPreviousMonth = (weekIndex === 0 && day > 20) || (weekIndex === 5 && day < 7);
                const dateKey = `2025-12-${day.toString().padStart(2, '0')}`;
                const hasData = userData.dailyData[dateKey]?.steps > 0;
                
                return (
                  <div
                    key={dayIndex}
                    onClick={() => !isPreviousMonth && setSelectedDate(dateKey)}
                    className={`text-center py-3 rounded-lg transition-all cursor-pointer relative ${
                      isToday 
                        ? 'bg-purple-500 text-white font-bold' 
                        : isPreviousMonth 
                        ? 'text-gray-600' 
                        : selectedDate === dateKey
                        ? 'bg-purple-500/50 text-white'
                        : 'text-white hover:bg-purple-500/20'
                    }`}
                  >
                    {day}
                    {hasData && !isPreviousMonth && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Daily Summary */}
      <Card className="mx-4 mt-6 glass-effect border-purple-500/20">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Resumen Del Día - {selectedDate}</h3>
          
          <div className={`flex items-center justify-between p-3 rounded-lg border mb-4 ${
            isGoalCompleted 
              ? 'bg-green-500/10 border-green-500/20' 
              : 'bg-purple-500/10 border-purple-500/20'
          }`}>
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-purple-400" />
              <span className="text-lg">{userData.dailyGoal.toLocaleString()} Pasos</span>
            </div>
            {isGoalCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Clock className="w-6 h-6 text-gray-400" />
            )}
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg mb-4">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg">Pasos: {selectedDayData.steps.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-purple-400 mb-1" />
              <div className="text-2xl font-bold">1h 35m</div>
              <div className="text-sm text-gray-400">Tiempo</div>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-6 h-6 text-purple-400 mb-1" />
              <div className="text-2xl font-bold">300</div>
              <div className="text-sm text-gray-400">Kcal</div>
            </div>
            <div className="flex flex-col items-center">
              <Target className="w-6 h-6 text-purple-400 mb-1" />
              <div className="text-2xl font-bold">7,58</div>
              <div className="text-sm text-gray-400">Km</div>
            </div>
          </div>

          <Button className="w-full mt-6 gradient-purple hover:opacity-90 h-12 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="text-lg">Crear Un Objetivo</span>
          </Button>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-purple-500/20">
        <div className="grid grid-cols-4 py-2">
          <Link to="/" className="flex flex-col items-center py-3">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Menu</span>
          </Link>
          <Link to="/weekly-progress" className="flex flex-col items-center py-3">
            <Activity className="w-6 h-6 text-purple-400" />
            <span className="text-xs text-purple-400 mt-1">Actividades</span>
          </Link>
          <Link to="/calendar" className="flex flex-col items-center py-3">
            <CalendarIcon className="w-6 h-6 text-purple-400" />
            <span className="text-xs text-purple-400 mt-1">Calendario</span>
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

export default Calendar;

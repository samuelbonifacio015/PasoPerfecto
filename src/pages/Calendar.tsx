
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Home, Calendar as CalendarIcon, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Calendar = () => {
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
                const isToday = day === 14 && weekIndex === 2; // Destacar día 14
                const isPreviousMonth = (weekIndex === 0 && day > 20) || (weekIndex === 5 && day < 7);
                
                return (
                  <div
                    key={dayIndex}
                    className={`text-center py-3 rounded-lg transition-all ${
                      isToday 
                        ? 'bg-purple-500 text-white font-bold' 
                        : isPreviousMonth 
                        ? 'text-gray-600' 
                        : 'text-white hover:bg-purple-500/20'
                    }`}
                  >
                    {day}
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
          <h3 className="text-lg font-semibold mb-4">Resumen Del Día</h3>
          
          <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">👟</div>
              <span className="text-lg">10.000 Pasos</span>
            </div>
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <div className="text-white text-sm">🏃</div>
            </div>
            <span className="text-lg">Ejercicios</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <div className="text-2xl font-bold">1h 35m</div>
              <div className="text-sm text-gray-400">Min</div>
            </div>
            <div>
              <div className="text-2xl font-bold">300</div>
              <div className="text-sm text-gray-400">Kcal</div>
            </div>
            <div>
              <div className="text-2xl font-bold">7,58</div>
              <div className="text-sm text-gray-400">Km</div>
            </div>
          </div>

          <Button className="w-full mt-6 gradient-purple hover:opacity-90 h-12">
            <div className="text-lg">➕ Crear Un Objetivo</div>
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
            <div className="w-6 h-6 text-gray-400">📊</div>
            <span className="text-xs text-gray-400 mt-1">Actividades</span>
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


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Activity } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';
import { useDailyProgress } from '@/hooks/useDailyProgress';

interface CalendarEventsProps {
  selectedDate: string;
}

const CalendarEvents: React.FC<CalendarEventsProps> = ({ selectedDate }) => {
  const { userData } = useUserData();
  const { getProgressForDate } = useDailyProgress();

  // Generar eventos basados en actividad del día
  const generateEvents = (date: string) => {
    const dayData = userData.dailyData[date] || getProgressForDate(date);
    if (!dayData || dayData.steps === 0) return [];

    const events = [];
    
    // Evento principal de caminata
    events.push({
      id: `walk-${date}`,
      title: `Caminata - ${dayData.steps.toLocaleString()} pasos`,
      time: dayData.time || '0h 0m',
      type: 'walk',
      calories: dayData.calories || 0,
      distance: dayData.distance || 0
    });

    // Evento de meta si se completó
    if (dayData.steps >= userData.dailyGoal) {
      events.push({
        id: `goal-${date}`,
        title: 'Meta Diaria Completada',
        time: '',
        type: 'achievement',
        steps: dayData.steps
      });
    }

    return events;
  };

  const events = generateEvents(selectedDate);

  return (
    <Card className="glass-card border-primary-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Eventos del Día
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {events.length === 0 ? (
          <div className="text-center py-6 text-primary-300">
            No hay actividad registrada para este día
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 bg-primary-700/30 rounded-lg hover:bg-primary-600/40 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  {event.type === 'walk' ? (
                    <Activity className="w-4 h-4 text-green-400" />
                  ) : (
                    <span className="text-lg">🎯</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium">{event.title}</h4>
                  {event.time && (
                    <div className="flex items-center text-sm text-primary-200 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      Duración: {event.time}
                    </div>
                  )}
                  {event.type === 'walk' && (
                    <div className="flex gap-4 mt-2">
                      {event.calories > 0 && (
                        <Badge variant="outline" className="text-xs border-orange-500/50 text-orange-400">
                          {event.calories} kcal
                        </Badge>
                      )}
                      {event.distance > 0 && (
                        <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400">
                          {event.distance} km
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarEvents;

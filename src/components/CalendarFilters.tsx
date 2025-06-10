
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CalendarArrowDown, CalendarArrowUp } from 'lucide-react';

interface CalendarFiltersProps {
  viewMode: 'day' | 'week' | 'month';
  onViewModeChange: (mode: 'day' | 'week' | 'month') => void;
  hideInactiveDays: boolean;
  onToggleInactiveDays: () => void;
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  viewMode,
  onViewModeChange,
  hideInactiveDays,
  onToggleInactiveDays
}) => {
  return (
    <Card className="glass-card border-primary-500/20">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Vista */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Vista</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={viewMode === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('day')}
                className={viewMode === 'day' ? 'bg-primary-600' : 'border-primary-500/50 text-primary-300'}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Día
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('week')}
                className={viewMode === 'week' ? 'bg-primary-600' : 'border-primary-500/50 text-primary-300'}
              >
                <CalendarArrowDown className="w-4 h-4 mr-1" />
                Semana
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('month')}
                className={viewMode === 'month' ? 'bg-primary-600' : 'border-primary-500/50 text-primary-300'}
              >
                <CalendarArrowUp className="w-4 h-4 mr-1" />
                Mes
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Filtros</h4>
            <Button
              variant={hideInactiveDays ? 'default' : 'outline'}
              size="sm"
              onClick={onToggleInactiveDays}
              className={`w-full ${
                hideInactiveDays 
                  ? 'bg-primary-600' 
                  : 'border-primary-500/50 text-primary-300 hover:bg-primary-600/20'
              }`}
            >
              {hideInactiveDays ? 'Mostrar' : 'Ocultar'} días sin actividad
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarFilters;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserData } from '@/hooks/useUserData';
import { useDailyProgress } from '@/hooks/useDailyProgress';

interface CalendarExportProps {
  month: number;
  year: number;
}

const CalendarExport: React.FC<CalendarExportProps> = ({ month, year }) => {
  const { toast } = useToast();
  const { userData } = useUserData();
  const { getProgressForDate } = useDailyProgress();

  const generateICSContent = () => {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//PasoPerfecto//Calendar//ES\n';
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayData = userData.dailyData[date] || getProgressForDate(date);
      
      if (dayData && dayData.steps > 0) {
        const dateStr = date.replace(/-/g, '');
        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `UID:walk-${date}@pasoperfecto.com\n`;
        icsContent += `DTSTART:${dateStr}T080000Z\n`;
        icsContent += `DTEND:${dateStr}T090000Z\n`;
        icsContent += `SUMMARY:Caminata - ${dayData.steps.toLocaleString()} pasos\n`;
        icsContent += `DESCRIPTION:Pasos: ${dayData.steps.toLocaleString()}\\nTiempo: ${dayData.time || '0h 0m'}\\nCalorías: ${dayData.calories || 0}\\nDistancia: ${dayData.distance || 0} km\n`;
        icsContent += 'END:VEVENT\n';
      }
    }
    
    icsContent += 'END:VCALENDAR';
    return icsContent;
  };

  const exportToICS = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `pasoperfecto-${year}-${String(month + 1).padStart(2, '0')}.ics`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Calendario Exportado",
      description: "El archivo .ics se ha descargado correctamente",
    });
  };

  const shareMonthlyActivity = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let totalSteps = 0;
    let activeDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayData = userData.dailyData[date] || getProgressForDate(date);
      
      if (dayData && dayData.steps > 0) {
        totalSteps += dayData.steps;
        activeDays++;
      }
    }

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const shareText = `📅 Mi actividad de ${monthNames[month]} ${year}:
🚶‍♂️ ${totalSteps.toLocaleString()} pasos totales
📊 ${activeDays} días activos de ${daysInMonth}
💪 Promedio: ${activeDays > 0 ? Math.round(totalSteps / activeDays).toLocaleString() : 0} pasos/día
#PasoPerfecto #Caminata #Fitness`;

    if (navigator.share) {
      navigator.share({
        title: `Mi actividad de ${monthNames[month]} - PasoPerfecto`,
        text: shareText,
        url: window.location.origin
      }).catch(() => {
        // Fallback to clipboard if share fails
        navigator.clipboard.writeText(shareText);
        toast({
          title: "¡Copiado!",
          description: "Texto copiado al portapapeles para compartir",
        });
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "¡Copiado!",
        description: "Texto copiado al portapapeles para compartir",
      });
    }
  };

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <Card className="glass-card border-primary-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Exportar Calendario
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <Button
            onClick={exportToICS}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar archivo .ics
          </Button>
          
          <Button
            onClick={shareMonthlyActivity}
            variant="outline"
            className="w-full border-green-500/50 text-green-400 hover:bg-green-500/20"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartir actividad de {monthNames[month]}
          </Button>
        </div>
        
        <div className="mt-4 text-xs text-primary-300 text-center">
          El archivo .ics es compatible con Google Calendar, Outlook y otras aplicaciones de calendario
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarExport;

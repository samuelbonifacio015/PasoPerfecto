
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const DailyMotivation = () => {
  const motivationalQuotes = [
    "Cada paso te acerca más a tu meta. ¡Sigue adelante!",
    "El viaje de mil millas comienza con un solo paso.",
    "Tu cuerpo puede hacerlo. Solo tienes que convencer a tu mente.",
    "No se trata de ser perfecto, se trata de ser mejor que ayer.",
    "Cada día es una nueva oportunidad para ser más saludable."
  ];

  const tips = [
    "Bebe agua antes, durante y después de caminar",
    "Caminar 30 minutos al día reduce el riesgo de enfermedades cardíacas",
    "Escuchar música puede hacer que camines 15% más rápido",
    "Caminar fortalece los huesos y mejora el equilibrio",
    "Una caminata matutina te dará energía para todo el día"
  ];

  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const todayQuote = motivationalQuotes[dayOfYear % motivationalQuotes.length];
  const todayTip = tips[dayOfYear % tips.length];

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Motivación Diaria
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-lg border border-purple-400/30">
            <div className="text-sm text-purple-200 mb-2">💪 Frase del día</div>
            <p className="text-white font-medium italic">"{todayQuote}"</p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-600/30 to-teal-600/30 rounded-lg border border-green-400/30">
            <div className="text-sm text-green-200 mb-2">💡 Tip saludable</div>
            <p className="text-white font-medium">{todayTip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMotivation;

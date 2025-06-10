
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Clock, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ActiveChallenges = () => {
  const activeChallenges = [
    {
      id: 1,
      title: 'Camina 50,000 pasos en 7 días',
      current: 28500,
      target: 50000,
      deadline: '2025-06-17',
      status: 'active'
    },
    {
      id: 2,
      title: 'Mantén una racha de 14 días',
      current: 3,
      target: 14,
      deadline: '2025-06-24',
      status: 'active'
    }
  ];

  const upcomingChallenges = [
    {
      id: 3,
      title: 'Maratón de Pasos',
      description: 'Camina 100,000 pasos en 2 semanas',
      startDate: '2025-06-18'
    }
  ];

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-400" />
          Desafíos Activos
        </h3>
        
        <div className="space-y-4 mb-6">
          {activeChallenges.map((challenge) => {
            const progress = (challenge.current / challenge.target) * 100;
            const daysLeft = Math.ceil((new Date(challenge.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={challenge.id} className="p-3 bg-primary-700/30 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-white">{challenge.title}</h4>
                  <div className="flex items-center text-xs text-primary-200">
                    <Clock className="w-3 h-3 mr-1" />
                    {daysLeft}d
                  </div>
                </div>
                <Progress value={progress} className="mb-2" />
                <div className="text-xs text-primary-200">
                  {challenge.current.toLocaleString()} / {challenge.target.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            Próximos Desafíos
          </h4>
          {upcomingChallenges.map((challenge) => (
            <div key={challenge.id} className="p-3 bg-primary-600/20 rounded-lg border border-primary-500/30">
              <h5 className="text-sm font-medium text-white">{challenge.title}</h5>
              <p className="text-xs text-primary-200 mt-1">{challenge.description}</p>
              <p className="text-xs text-green-400 mt-2">Inicia: {new Date(challenge.startDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveChallenges;

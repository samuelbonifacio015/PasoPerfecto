
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Achievement } from '@/hooks/useUserData';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const progressPercentage = Math.min((achievement.currentProgress / achievement.requirement) * 100, 100);

  return (
    <Card className={`glass-card border-primary-500/20 transition-all duration-300 hover:border-primary-400/40 ${
      achievement.unlocked ? 'bg-gradient-to-br from-yellow-400/10 to-orange-500/10' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`text-2xl p-2 rounded-lg ${
            achievement.unlocked 
              ? 'achievement-badge animate-bounce-subtle' 
              : 'bg-primary-700/40'
          }`}>
            {achievement.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">{achievement.title}</h4>
              {achievement.unlocked && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                  Desbloqueado
                </Badge>
              )}
            </div>
            <p className="text-sm text-primary-200 mb-3">{achievement.description}</p>
            
            {!achievement.unlocked && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-primary-300">
                    {achievement.currentProgress.toLocaleString()} / {achievement.requirement.toLocaleString()}
                  </span>
                  <span className="text-white font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-primary-700/40 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {achievement.unlocked && achievement.unlockedDate && (
              <p className="text-xs text-green-400 mt-2">
                Desbloqueado el {new Date(achievement.unlockedDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

const FeaturedBadges = () => {
  const { userData } = useUserData();
  
  // Add safety check for achievements array
  const featuredAchievements = userData?.achievements
    ? userData.achievements
        .filter(achievement => achievement.unlocked)
        .slice(0, 3)
    : [];

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Insignias Destacadas
        </h3>
        
        {featuredAchievements.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {featuredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="text-center p-3 bg-primary-700/30 rounded-lg hover:bg-primary-600/40 transition-colors cursor-pointer group"
                title={achievement.description}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {achievement.icon}
                </div>
                <div className="text-xs font-medium text-white">{achievement.title}</div>
                {achievement.unlockedDate && (
                  <div className="text-xs text-green-400 mt-1">
                    {new Date(achievement.unlockedDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-primary-300 mb-2">No tienes insignias aún</div>
            <div className="text-sm text-primary-400">¡Completa desafíos para desbloquear insignias!</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeaturedBadges;

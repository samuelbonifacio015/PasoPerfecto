
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, Trophy } from 'lucide-react';

const Leaderboard = () => {
  const friends = [
    { id: 1, name: 'Ana García', steps: 89500, avatar: 'AG', position: 1 },
    { id: 2, name: 'Carlos Ruiz', steps: 78200, avatar: 'CR', position: 2 },
    { id: 3, name: 'Samuel (Tú)', steps: 65000, avatar: 'SM', position: 3, isMe: true },
    { id: 4, name: 'María López', steps: 54300, avatar: 'ML', position: 4 },
    { id: 5, name: 'Pedro Silva', steps: 42100, avatar: 'PS', position: 5 }
  ];

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          Tabla de Clasificación
        </h3>
        
        <div className="space-y-3">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                friend.isMe 
                  ? 'bg-primary-600/40 border border-primary-400/50' 
                  : 'bg-primary-700/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6">
                  {friend.position <= 3 ? (
                    <Trophy className={`w-4 h-4 ${
                      friend.position === 1 ? 'text-yellow-400' :
                      friend.position === 2 ? 'text-gray-300' :
                      'text-yellow-600'
                    }`} />
                  ) : (
                    <span className="text-sm text-primary-200">#{friend.position}</span>
                  )}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary-500 text-white text-xs">
                    {friend.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className={`text-sm font-medium ${friend.isMe ? 'text-primary-200' : 'text-white'}`}>
                    {friend.name}
                  </div>
                  <div className="text-xs text-primary-300">
                    {friend.steps.toLocaleString()} pasos
                  </div>
                </div>
              </div>
              
              {!friend.isMe && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-primary-400 text-primary-200 hover:bg-primary-600"
                >
                  ¡Retar!
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;

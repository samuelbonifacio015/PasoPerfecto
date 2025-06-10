
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Settings, Camera, Edit, Check } from 'lucide-react';

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Samuel');
  const [nickname, setNickname] = useState('Sam_Walker');
  const [personalGoal, setPersonalGoal] = useState('Caminar 10 km/semana');

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to your user data store
  };

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            Configuración de Perfil
          </h3>
          <Button
            size="sm"
            variant="outline"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="border-primary-400 text-primary-200"
          >
            {isEditing ? <Check className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary-500 text-white text-xl">
                  {name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0 bg-primary-600"
                >
                  <Camera className="w-3 h-3" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    className="bg-primary-600/50 border-primary-400 text-white"
                  />
                  <Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Apodo"
                    className="bg-primary-600/50 border-primary-400 text-white"
                  />
                </div>
              ) : (
                <div>
                  <div className="text-lg font-semibold text-white">{name}</div>
                  <div className="text-sm text-primary-200">@{nickname}</div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm text-primary-200 block mb-2">Objetivo Personal</label>
            {isEditing ? (
              <Input
                value={personalGoal}
                onChange={(e) => setPersonalGoal(e.target.value)}
                className="bg-primary-600/50 border-primary-400 text-white"
              />
            ) : (
              <div className="p-3 bg-primary-700/30 rounded-lg">
                <div className="text-white">{personalGoal}</div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;

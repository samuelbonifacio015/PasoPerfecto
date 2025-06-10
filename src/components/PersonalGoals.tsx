
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Target, Edit, Check } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

const PersonalGoals = () => {
  const { userData, setUserData } = useUserData();
  const [isEditing, setIsEditing] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(userData.dailyGoal);
  const [weeklyGoal, setWeeklyGoal] = useState(userData.dailyGoal * 7);

  const handleSave = () => {
    setUserData(prev => ({
      ...prev,
      dailyGoal: dailyGoal
    }));
    setIsEditing(false);
  };

  return (
    <Card className="glass-card border-primary-500/20 animate-fade-in-up">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" />
            Mis Metas
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
          <div className="p-3 bg-primary-700/30 rounded-lg">
            <label className="text-sm text-primary-200 block mb-2">Meta Diaria de Pasos</label>
            {isEditing ? (
              <Input
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="bg-primary-600/50 border-primary-400 text-white"
              />
            ) : (
              <div className="text-xl font-bold text-white">{dailyGoal.toLocaleString()} pasos</div>
            )}
          </div>

          <div className="p-3 bg-primary-700/30 rounded-lg">
            <label className="text-sm text-primary-200 block mb-2">Meta Semanal de Pasos</label>
            {isEditing ? (
              <Input
                type="number"
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                className="bg-primary-600/50 border-primary-400 text-white"
              />
            ) : (
              <div className="text-xl font-bold text-white">{weeklyGoal.toLocaleString()} pasos</div>
            )}
          </div>

          <div className="p-3 bg-primary-700/30 rounded-lg">
            <label className="text-sm text-primary-200 block mb-2">Recordatorios</label>
            <div className="text-sm text-white">
              <div className="flex justify-between items-center">
                <span>Recordatorio matutino</span>
                <span className="text-green-400">9:00 AM ✓</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span>Recordatorio vespertino</span>
                <span className="text-green-400">6:00 PM ✓</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalGoals;


import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit3, Check, X } from 'lucide-react';

interface EditableStatCardProps {
  title: string;
  value: string | number;
  onSave: (value: string) => void;
  icon?: React.ReactNode;
}

const EditableStatCard: React.FC<EditableStatCardProps> = ({ title, value, onSave, icon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value.toString());
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <Card className="glass-card border-primary-500/20 transition-all duration-200 hover:border-primary-400/40">
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-primary-700/50 border-primary-500/30 text-white text-center"
              placeholder={`Nuevo ${title.toLowerCase()}`}
              autoFocus
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                <Check className="w-3 h-3" />
              </Button>
              <Button onClick={handleCancel} size="sm" variant="outline" className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/20">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            {icon && (
              <div className="flex justify-center mb-2">
                {icon}
              </div>
            )}
            <div className="text-2xl font-bold text-white mb-1 text-center">
              {value}
            </div>
            <div className="text-sm text-primary-200 text-center">{title}</div>
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditableStatCard;

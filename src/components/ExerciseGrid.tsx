
import React from 'react';
import { Activity } from 'lucide-react';

interface ExerciseGridProps {
  time: string;
  calories: number;
  distance: number;
}

const ExerciseGrid: React.FC<ExerciseGridProps> = ({ time, calories, distance }) => {
  const exercises = [
    { icon: '🏃‍♂️', name: 'Trotar', value: time },
    { icon: '🔥', name: 'Kcal', value: calories.toString() },
    { icon: '📍', name: 'Km', value: distance.toString() },
    { icon: '💪', name: 'Fuerza', value: '2/10' }
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-primary-300" />
        <span className="text-sm text-primary-200 font-medium">Ejercicios</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {exercises.map((exercise, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 bg-primary-700/20 rounded-lg">
            <span className="text-lg">{exercise.icon}</span>
            <div>
              <div className="text-xs text-primary-200">{exercise.name}</div>
              <div className="text-sm font-semibold text-white">{exercise.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseGrid;

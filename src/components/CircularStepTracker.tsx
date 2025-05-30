
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CircularStepTrackerProps {
  steps: number;
  goal?: number;
}

const CircularStepTracker: React.FC<CircularStepTrackerProps> = ({ 
  steps, 
  goal = 10000 
}) => {
  const percentage = Math.min((steps / goal) * 100, 100);
  const circumference = 2 * Math.PI * 120;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="glass-effect border-purple-500/30 bg-gray-900/40">
      <CardContent className="p-8">
        <div className="relative w-64 h-64 mx-auto">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="rgba(107, 114, 128, 0.2)"
              strokeWidth="8"
            />
            {/* Progress Circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2 glow-purple">
              {steps.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400 mb-1">pasos</div>
            <div className="text-xs text-purple-300">
              Meta: {goal.toLocaleString()}
            </div>
            <div className="text-lg font-semibold text-purple-300 mt-2">
              {Math.round(percentage)}%
            </div>
          </div>
        </div>
        
        {/* Achievement Messages */}
        {percentage >= 100 && (
          <div className="text-center mt-4 p-3 bg-purple-500/20 rounded-lg border border-purple-400/50">
            <div className="text-purple-300 font-semibold">🎉 ¡Meta alcanzada!</div>
          </div>
        )}
        {percentage >= 75 && percentage < 100 && (
          <div className="text-center mt-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/50">
            <div className="text-yellow-300 font-semibold">💪 ¡Casi lo logras!</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CircularStepTracker;

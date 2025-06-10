
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar as CalendarIcon, User, Activity, TrendingUp, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useUserData } from '@/hooks/useUserData';
import PersonalRecords from '@/components/PersonalRecords';
import ActiveChallenges from '@/components/ActiveChallenges';
import ShareProgress from '@/components/ShareProgress';
import Leaderboard from '@/components/Leaderboard';
import HealthStats from '@/components/HealthStats';
import PersonalGoals from '@/components/PersonalGoals';
import DailyMotivation from '@/components/DailyMotivation';
import SessionHistory from '@/components/SessionHistory';
import ProfileSettings from '@/components/ProfileSettings';
import FeaturedBadges from '@/components/FeaturedBadges';

const Profile = () => {
  const { userData } = useUserData();

  const weeklyData = [
    { day: 'Lun', steps: 8500 },
    { day: 'Mar', steps: 7200 },
    { day: 'Mie', steps: 9800 },
    { day: 'Jue', steps: 6400 },
    { day: 'Vie', steps: 11200 },
    { day: 'Sab', steps: 8900 },
    { day: 'Dom', steps: userData?.steps || 0 }
  ];

  const totalWeeklySteps = weeklyData.reduce((sum, day) => sum + day.steps, 0);
  const progressPercentage = Math.min(((userData?.steps || 0) / (userData?.dailyGoal || 10000)) * 100, 100);
  
  // Safety checks for numeric values
  const safeSteps = userData?.steps || 0;
  const safeTotalSteps = userData?.totalSteps || 0;
  const safeLevel = userData?.level || 1;
  const safeXp = userData?.xp || 0;
  const safeMaxXp = userData?.maxXp || 1000;
  const safeStreak = userData?.streak || 0;
  const safeTasks = userData?.tasks || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white font-satoshi">
      {/* Header */}
      <div className="text-center pt-12 pb-6 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-white mb-2">¡Continúa Caminando, Samuel!</h1>
        <p className="text-primary-200">Tu progreso semanal</p>
      </div>

      {/* Main Progress Circle */}
      <div className="flex justify-center mb-8 animate-fade-in-up">
        <div className="relative">
          <svg className="transform -rotate-90" width="200" height="200">
            <defs>
              <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7A12FF" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7A12FF" />
              </linearGradient>
            </defs>
            
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="rgba(122, 18, 255, 0.2)"
              strokeWidth="16"
              fill="none"
            />
            
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="url(#profileGradient)"
              strokeWidth="16"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 80}`}
              strokeDashoffset={`${2 * Math.PI * 80 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-1000 ease-out glow-purple"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-white mb-1">
              {safeSteps.toLocaleString()}
            </div>
            <div className="text-sm text-primary-200">pasos hoy</div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 mb-20">
        {/* Personal Records */}
        <PersonalRecords />
        
        {/* Active Challenges */}
        <ActiveChallenges />
        
        {/* Share Progress */}
        <ShareProgress />
        
        {/* Leaderboard */}
        <Leaderboard />
        
        {/* Health Stats */}
        <HealthStats />
        
        {/* Personal Goals */}
        <PersonalGoals />
        
        {/* Daily Motivation */}
        <DailyMotivation />
        
        {/* Session History */}
        <SessionHistory />
        
        {/* Profile Settings */}
        <ProfileSettings />
        
        {/* Featured Badges */}
        <FeaturedBadges />

        {/* Level and Current Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">Nivel {safeLevel}</div>
              <div className="text-sm text-primary-200">XP: {safeXp}/{safeMaxXp}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">🔥</div>
                  <div>
                    <div className="text-xl font-bold text-white">{safeStreak} días</div>
                    <div className="text-sm text-primary-200">Racha actual</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Chart */}
        <Card className="glass-card border-primary-500/20 animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary-300" />
              <h3 className="text-lg font-semibold text-white">Progreso Semanal</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#C084FC', fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="steps" 
                    stroke="#7A12FF" 
                    strokeWidth={3}
                    dot={{ fill: '#7A12FF', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#C084FC' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-800/95 backdrop-blur-md border-t border-primary-500/20">
        <div className="grid grid-cols-4 py-2">
          <Link to="/" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <Home className="w-6 h-6 text-gray-400 hover:text-primary-300 transition-colors" />
            <span className="text-xs text-gray-400 hover:text-primary-300 transition-colors mt-1">Menu</span>
          </Link>
          <Link to="/weekly-progress" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <Activity className="w-6 h-6 text-gray-400 hover:text-primary-300 transition-colors" />
            <span className="text-xs text-gray-400 hover:text-primary-300 transition-colors mt-1">Actividades</span>
          </Link>
          <Link to="/calendar" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <CalendarIcon className="w-6 h-6 text-gray-400 hover:text-primary-300 transition-colors" />
            <span className="text-xs text-gray-400 hover:text-primary-300 transition-colors mt-1">Calendario</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <User className="w-6 h-6 text-primary-400" />
            <span className="text-xs text-primary-400 mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useLocalStorage } from './useLocalStorage';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  type: 'steps' | 'streak' | 'challenge' | 'milestone';
  requirement: number;
  currentProgress: number;
}

export interface UserData {
  level: number;
  xp: number;
  maxXp: number;
  steps: number;
  dailyGoal: number;
  pasocoins: number;
  streak: number;
  totalSteps: number;
  achievements: Achievement[];
  tasks: {
    id: string;
    title: string;
    target: number;
    current: number;
    completed: boolean;
    xp: number;
  }[];
  dailyData: {
    [date: string]: {
      steps: number;
      tasks: string[];
      xpEarned: number;
      calories: number;
      distance: number;
      time: string;
    };
  };
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first-steps',
    title: 'Primeros Pasos',
    description: 'Completa tus primeros 1,000 pasos',
    icon: '👣',
    unlocked: true,
    unlockedDate: '2025-12-10',
    type: 'steps',
    requirement: 1000,
    currentProgress: 1000
  },
  {
    id: 'daily-goal',
    title: 'Meta Diaria',
    description: 'Alcanza tu meta diaria de 10,000 pasos',
    icon: '🎯',
    unlocked: false,
    type: 'steps',
    requirement: 10000,
    currentProgress: 6000
  },
  {
    id: 'week-warrior',
    title: 'Guerrero Semanal',
    description: 'Completa 7 días seguidos alcanzando tu meta',
    icon: '🔥',
    unlocked: false,
    type: 'streak',
    requirement: 7,
    currentProgress: 3
  },
  {
    id: 'step-master',
    title: 'Maestro de Pasos',
    description: 'Alcanza 50,000 pasos totales',
    icon: '👑',
    unlocked: false,
    type: 'milestone',
    requirement: 50000,
    currentProgress: 25000
  },
  {
    id: 'marathon-walker',
    title: 'Caminante Maratón',
    description: 'Camina 25,000 pasos en un día',
    icon: '🏃‍♂️',
    unlocked: false,
    type: 'challenge',
    requirement: 25000,
    currentProgress: 0
  },
  {
    id: 'consistency-king',
    title: 'Rey de Consistencia',
    description: 'Mantén una racha de 30 días',
    icon: '⚡',
    unlocked: false,
    type: 'streak',
    requirement: 30,
    currentProgress: 3
  }
];

export const useUserData = () => {
  const [userData, setUserData] = useLocalStorage<UserData>('pasoperfecto-user-data', {
    level: 6,
    xp: 2550,
    maxXp: 3000,
    steps: 6000,
    dailyGoal: 10000,
    pasocoins: 1250,
    streak: 3,
    totalSteps: 25000,
    achievements: defaultAchievements,
    tasks: [
      {
        id: '1',
        title: '5.000 Pasos Diarios',
        target: 5000,
        current: 5000,
        completed: true,
        xp: 100
      },
      {
        id: '2',
        title: '1.000 Pasos Diarios',
        target: 1000,
        current: 1000,
        completed: true,
        xp: 50
      },
      {
        id: '3',
        title: 'Caminar 30 minutos',
        target: 30,
        current: 25,
        completed: false,
        xp: 75
      }
    ],
    dailyData: {}
  });

  const updateSteps = (steps: number, date: string) => {
    setUserData(prev => {
      const newTotalSteps = prev.totalSteps + (steps - prev.steps);
      const updatedAchievements = prev.achievements.map(achievement => {
        let newProgress = achievement.currentProgress;
        
        if (achievement.type === 'steps' && achievement.id === 'daily-goal') {
          newProgress = steps;
        } else if (achievement.type === 'milestone' && achievement.id === 'step-master') {
          newProgress = newTotalSteps;
        } else if (achievement.type === 'challenge' && achievement.id === 'marathon-walker') {
          newProgress = Math.max(newProgress, steps);
        }

        const shouldUnlock = !achievement.unlocked && newProgress >= achievement.requirement;
        
        return {
          ...achievement,
          currentProgress: newProgress,
          unlocked: shouldUnlock || achievement.unlocked,
          unlockedDate: shouldUnlock ? date : achievement.unlockedDate
        };
      });

      // Calculate derived values from steps
      const calculatedTime = `${Math.floor(steps / 120)}h ${Math.floor((steps % 120) / 2)}m`;
      const calculatedCalories = Math.round(steps * 0.04);
      const calculatedDistance = +(steps * 0.0008).toFixed(2);

      return {
        ...prev,
        steps,
        totalSteps: newTotalSteps,
        achievements: updatedAchievements,
        dailyData: {
          ...prev.dailyData,
          [date]: {
            ...prev.dailyData[date],
            steps,
            calories: prev.dailyData[date]?.calories || calculatedCalories,
            distance: prev.dailyData[date]?.distance || calculatedDistance,
            time: prev.dailyData[date]?.time || calculatedTime,
            tasks: prev.dailyData[date]?.tasks || [],
            xpEarned: prev.dailyData[date]?.xpEarned || 0
          }
        }
      };
    });
  };

  const updateDayData = (date: string, field: 'time' | 'calories' | 'distance', value: string | number) => {
    setUserData(prev => ({
      ...prev,
      dailyData: {
        ...prev.dailyData,
        [date]: {
          ...prev.dailyData[date],
          steps: prev.dailyData[date]?.steps || prev.steps,
          tasks: prev.dailyData[date]?.tasks || [],
          xpEarned: prev.dailyData[date]?.xpEarned || 0,
          [field]: value
        }
      }
    }));
  };

  const completeTask = (taskId: string) => {
    setUserData(prev => {
      const task = prev.tasks.find(t => t.id === taskId);
      if (!task || task.completed) return prev;

      const newXp = prev.xp + task.xp;
      let newLevel = prev.level;
      let newMaxXp = prev.maxXp;

      if (newXp >= prev.maxXp) {
        newLevel += 1;
        newMaxXp = prev.maxXp + 500;
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        maxXp: newMaxXp,
        pasocoins: prev.pasocoins + 50,
        tasks: prev.tasks.map(t => 
          t.id === taskId ? { ...t, completed: true, current: t.target } : t
        )
      };
    });
  };

  const getRecentActivity = () => {
    const dates = Object.keys(userData.dailyData).sort().reverse().slice(0, 5);
    return dates.map(date => ({
      date,
      ...userData.dailyData[date]
    }));
  };

  return {
    userData,
    updateSteps,
    updateDayData,
    completeTask,
    getRecentActivity,
    setUserData
  };
};

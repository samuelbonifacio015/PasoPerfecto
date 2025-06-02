
import { useLocalStorage } from './useLocalStorage';

export interface UserData {
  level: number;
  xp: number;
  maxXp: number;
  steps: number;
  dailyGoal: number;
  pasocoins: number;
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
    };
  };
}

export const useUserData = () => {
  const [userData, setUserData] = useLocalStorage<UserData>('pasoperfecto-user-data', {
    level: 6,
    xp: 2550,
    maxXp: 3000,
    steps: 6000,
    dailyGoal: 10000,
    pasocoins: 1250,
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
      }
    ],
    dailyData: {}
  });

  const updateSteps = (steps: number, date: string) => {
    setUserData(prev => ({
      ...prev,
      steps,
      dailyData: {
        ...prev.dailyData,
        [date]: {
          ...prev.dailyData[date],
          steps
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
          t.id === taskId ? { ...t, completed: true } : t
        )
      };
    });
  };

  return {
    userData,
    updateSteps,
    completeTask,
    setUserData
  };
};

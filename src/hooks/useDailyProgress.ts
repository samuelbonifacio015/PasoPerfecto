
import { useLocalStorage } from './useLocalStorage';

export interface DailyProgress {
  steps: number;
  time: string;
  calories: number;
  distance: number;
  saved: boolean;
}

export const useDailyProgress = () => {
  const [dailyProgress, setDailyProgress] = useLocalStorage<{[date: string]: DailyProgress}>('pasoperfecto-daily-progress', {});
  
  const saveProgress = (date: string, steps: number, time: string, calories: number, distance: number) => {
    setDailyProgress(prev => ({
      ...prev,
      [date]: {
        steps,
        time,
        calories,
        distance,
        saved: true
      }
    }));
  };
  
  const updateTimeCaloriesDistance = (date: string, field: 'time' | 'calories' | 'distance', value: string | number) => {
    setDailyProgress(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [field]: value
      }
    }));
  };
  
  const getProgressForDate = (date: string) => {
    return dailyProgress[date] || null;
  };
  
  return {
    dailyProgress,
    saveProgress,
    updateTimeCaloriesDistance,
    getProgressForDate
  };
};

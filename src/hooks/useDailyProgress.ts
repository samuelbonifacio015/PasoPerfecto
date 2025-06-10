
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
        steps: prev[date]?.steps || 0,
        time: prev[date]?.time || '0h 0m',
        calories: prev[date]?.calories || 0,
        distance: prev[date]?.distance || 0,
        saved: prev[date]?.saved || false,
        [field]: value
      }
    }));
  };
  
  const getProgressForDate = (date: string) => {
    return dailyProgress[date] || null;
  };
  
  const markAsSaved = (date: string) => {
    setDailyProgress(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        saved: true
      }
    }));
  };
  
  return {
    dailyProgress,
    saveProgress,
    updateTimeCaloriesDistance,
    getProgressForDate,
    markAsSaved
  };
};

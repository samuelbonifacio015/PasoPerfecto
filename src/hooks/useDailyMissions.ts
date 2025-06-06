
import { useLocalStorage } from './useLocalStorage';

export interface DailyMission {
  id: string;
  name: string;
  steps: number;
  icon: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  completed: boolean;
  date: string;
}

const missions = [
  { id: 'primeros-pasos', name: 'Primeros pasos', steps: 1500, icon: '👶', difficulty: 'Fácil' as const },
  { id: 'vence-pereza', name: 'Vence la pereza', steps: 2000, icon: '⚡', difficulty: 'Fácil' as const },
  { id: 'lejos-sofa', name: 'Lejos del sofá', steps: 3000, icon: '🛋️', difficulty: 'Fácil' as const },
  { id: 'paseo-revitalizante', name: 'Paseo revitalizante', steps: 4000, icon: '🚶‍♂️', difficulty: 'Medio' as const },
  { id: 'explora-ciudad', name: 'Explora tu ciudad', steps: 4444, icon: '🌆', difficulty: 'Medio' as const },
  { id: 'despeja-mente', name: 'Despeja tu mente', steps: 4444, icon: '🧠', difficulty: 'Medio' as const },
  { id: 'reta-limites', name: 'Reta tus límites', steps: 6000, icon: '🏆', difficulty: 'Medio' as const },
  { id: 'alcanza-cima', name: 'Alcanza la cima', steps: 8000, icon: '🏔️', difficulty: 'Difícil' as const }
];

export const useDailyMissions = () => {
  const [dailyMission, setDailyMission] = useLocalStorage<DailyMission | null>('pasoperfecto-daily-mission', null);
  
  const generateDailyMission = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (dailyMission && dailyMission.date === today) {
      return dailyMission;
    }
    
    const randomMission = missions[Math.floor(Math.random() * missions.length)];
    const newMission: DailyMission = {
      ...randomMission,
      completed: false,
      date: today
    };
    
    setDailyMission(newMission);
    return newMission;
  };
  
  const completeMission = () => {
    if (dailyMission) {
      setDailyMission({ ...dailyMission, completed: true });
    }
  };
  
  return {
    dailyMission: generateDailyMission(),
    completeMission
  };
};


import { useLocalStorage } from './useLocalStorage';

interface StepHistory {
  previousSteps: number;
  resetCount: number;
}

export const useStepReset = () => {
  const [stepHistory, setStepHistory] = useLocalStorage<StepHistory>('pasoperfecto-step-history', {
    previousSteps: 0,
    resetCount: 0
  });
  
  const saveCurrentSteps = (currentSteps: number) => {
    setStepHistory(prev => ({
      ...prev,
      previousSteps: currentSteps
    }));
  };
  
  const resetSteps = () => {
    setStepHistory(prev => ({
      ...prev,
      resetCount: prev.resetCount + 1
    }));
    return 0;
  };
  
  const undoReset = () => {
    return stepHistory.previousSteps;
  };
  
  return {
    saveCurrentSteps,
    resetSteps,
    undoReset,
    canUndo: stepHistory.resetCount > 0
  };
};

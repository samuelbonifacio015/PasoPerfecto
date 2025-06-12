
import { useLocalStorage } from './useLocalStorage';

export interface Plan {
  id: string;
  name: string;
  type: 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  targetSteps: number;
  goalType: 'daily' | 'weekly' | 'monthly';
  created: string;
}

export const usePlans = () => {
  const [plans, setPlans] = useLocalStorage<Plan[]>('pasoperfecto-plans', []);

  const createPlan = (name: string, type: 'weekly' | 'monthly', startDate: string, targetSteps: number, goalType: string) => {
    const endDate = type === 'weekly' 
      ? new Date(new Date(startDate).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      : new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth() + 1, 0).toISOString().split('T')[0];

    const newPlan: Plan = {
      id: `plan_${Date.now()}`,
      name,
      type,
      startDate,
      endDate,
      targetSteps,
      goalType: goalType as 'daily' | 'weekly' | 'monthly',
      created: new Date().toISOString().split('T')[0]
    };

    setPlans(prev => [...prev, newPlan]);
    return newPlan;
  };

  const updatePlan = (planId: string, updates: Partial<Plan>) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId ? { ...plan, ...updates } : plan
    ));
  };

  const deletePlan = (planId: string) => {
    setPlans(prev => prev.filter(plan => plan.id !== planId));
  };

  const exportPlan = (plan: Plan) => {
    const dataStr = JSON.stringify(plan, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `plan_${plan.name}_${plan.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getPlansForDate = (date: string) => {
    return plans.filter(plan => {
      const planStart = new Date(plan.startDate);
      const planEnd = new Date(plan.endDate);
      const currentDate = new Date(date);
      return currentDate >= planStart && currentDate <= planEnd;
    });
  };

  const isDateInPlan = (date: string) => {
    return getPlansForDate(date).length > 0;
  };

  return {
    plans,
    createPlan,
    updatePlan,
    deletePlan,
    exportPlan,
    getPlansForDate,
    isDateInPlan
  };
};

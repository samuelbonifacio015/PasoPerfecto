
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, MapPin, Target, Activity, Download, Edit, Trash2, Calendar as CalendarIcon } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  type: 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  targetSteps: number;
  created: string;
}

interface DailySummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string;
  dayData: {
    steps: number;
    time: string;
    calories: number;
    distance: number;
    saved?: boolean;
  };
  dailyGoal: number;
  plans: Plan[];
  onEditPlan: (plan: Plan) => void;
  onDeletePlan: (planId: string) => void;
  onExportPlan: (plan: Plan) => void;
}

const DailySummaryModal: React.FC<DailySummaryModalProps> = ({
  open,
  onOpenChange,
  selectedDate,
  dayData,
  dailyGoal,
  plans,
  onEditPlan,
  onDeletePlan,
  onExportPlan
}) => {
  const isGoalCompleted = dayData.steps >= dailyGoal;
  const isPastDate = new Date(selectedDate) < new Date(new Date().toISOString().split('T')[0]);
  
  // Find plans that include this date
  const activePlans = plans.filter(plan => {
    const planStart = new Date(plan.startDate);
    const planEnd = new Date(plan.endDate);
    const currentDate = new Date(selectedDate);
    return currentDate >= planStart && currentDate <= planEnd;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-primary-800 border-primary-500/20 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Resumen Del Día ({selectedDate})
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Goal Status */}
          <div className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
            isGoalCompleted 
              ? 'bg-green-500/20 border-green-500/40' 
              : 'bg-primary-500/20 border-primary-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-primary-300" />
              <span className="text-lg text-white font-medium">{dailyGoal.toLocaleString()} Pasos</span>
            </div>
            {isGoalCompleted ? (
              <Badge className="bg-green-600 text-white">✓ Completado</Badge>
            ) : (
              <Badge variant="outline" className="border-yellow-500 text-yellow-400">Pendiente</Badge>
            )}
          </div>

          {/* Current Steps */}
          <div className="flex items-center space-x-3 p-4 bg-primary-700/40 rounded-lg border border-primary-500/30">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg text-white font-medium">Pasos: {dayData.steps.toLocaleString()}</span>
          </div>

          {/* Exercise Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center p-3 bg-primary-700/30 rounded-lg">
              <Clock className="w-5 h-5 text-primary-300 mb-2" />
              <div className="text-lg font-bold text-white">{dayData.time}</div>
              <div className="text-xs text-primary-200">Tiempo</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-primary-700/30 rounded-lg">
              <Zap className="w-5 h-5 text-primary-300 mb-2" />
              <div className="text-lg font-bold text-white">{dayData.calories}</div>
              <div className="text-xs text-primary-200">Kcal</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-primary-700/30 rounded-lg">
              <MapPin className="w-5 h-5 text-primary-300 mb-2" />
              <div className="text-lg font-bold text-white">{dayData.distance}</div>
              <div className="text-xs text-primary-200">Km</div>
            </div>
          </div>

          {/* Active Plans for this date */}
          {activePlans.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Planes Activos</h3>
              {activePlans.map((plan) => (
                <Card key={plan.id} className="glass-card border-primary-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-primary-300" />
                        <span className="font-medium text-white">{plan.name}</span>
                      </div>
                      <Badge className={`${plan.type === 'weekly' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                        {plan.type === 'weekly' ? 'Semanal' : 'Mensual'}
                      </Badge>
                    </div>
                    <div className="text-sm text-primary-200 mb-2">
                      {plan.startDate} → {plan.endDate}
                    </div>
                    <div className="text-sm text-primary-200 mb-3">
                      Meta: {plan.targetSteps.toLocaleString()} pasos
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onEditPlan(plan)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-primary-500/50 text-primary-300 hover:bg-primary-600/20"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => onExportPlan(plan)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-primary-500/50 text-primary-300 hover:bg-primary-600/20"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Exportar
                      </Button>
                      <Button
                        onClick={() => onDeletePlan(plan.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* All Plans List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Todos los Planes</h3>
            {plans.length === 0 ? (
              <div className="text-center text-primary-200 py-4">
                No hay planes creados
              </div>
            ) : (
              plans.map((plan) => (
                <Card key={plan.id} className="glass-card border-primary-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-primary-300" />
                        <span className="font-medium text-white">{plan.name}</span>
                      </div>
                      <Badge className={`${plan.type === 'weekly' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                        {plan.type === 'weekly' ? 'Semanal' : 'Mensual'}
                      </Badge>
                    </div>
                    <div className="text-xs text-primary-300 mb-1">ID: {plan.id}</div>
                    <div className="text-sm text-primary-200 mb-2">
                      {plan.startDate} → {plan.endDate}
                    </div>
                    <div className="text-sm text-primary-200 mb-2">
                      Meta: {plan.targetSteps.toLocaleString()} pasos
                    </div>
                    <div className="text-xs text-primary-300 mb-3">
                      Creado: {plan.created}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onEditPlan(plan)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-primary-500/50 text-primary-300 hover:bg-primary-600/20"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => onExportPlan(plan)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-primary-500/50 text-primary-300 hover:bg-primary-600/20"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Exportar
                      </Button>
                      <Button
                        onClick={() => onDeletePlan(plan.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailySummaryModal;

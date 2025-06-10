import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Home, Calendar as CalendarIcon, User, CheckCircle, Plus, Clock, Zap, MapPin, Target, Activity, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import { usePlans } from '@/hooks/usePlans';
import DailySummaryModal from '@/components/DailySummaryModal';
import PlanModal from '@/components/PlanModal';
import CalendarHeatmap from '@/components/CalendarHeatmap';
import CalendarEvents from '@/components/CalendarEvents';
import CalendarFilters from '@/components/CalendarFilters';
import MonthSummary from '@/components/MonthSummary';
import CalendarExport from '@/components/CalendarExport';

const Calendar = () => {
  const { userData, updateSteps } = useUserData();
  const { getProgressForDate } = useDailyProgress();
  const { plans, createPlan, updatePlan, deletePlan, exportPlan, isDateInPlan } = usePlans();
  
  const [selectedDate, setSelectedDate] = useState('2025-06-06');
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [planType, setPlanType] = useState<'weekly' | 'monthly'>('weekly');
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [hideInactiveDays, setHideInactiveDays] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setShowSummaryModal(true);
  };

  const handleCreatePlan = (name: string, type: 'weekly' | 'monthly', startDate: string, targetSteps: number) => {
    createPlan(name, type, startDate, targetSteps);
  };

  const handleEditPlan = (plan: any) => {
    setEditingPlan(plan);
    setPlanType(plan.type);
    setShowPlanModal(true);
  };

  const handleUpdatePlan = (planId: string, updates: any) => {
    updatePlan(planId, updates);
    setEditingPlan(null);
  };

  const handleDeletePlan = (planId: string) => {
    deletePlan(planId);
  };

  const handleExportPlan = (plan: any) => {
    exportPlan(plan);
  };

  const userDayData = userData.dailyData[selectedDate];
  const progressData = getProgressForDate(selectedDate);
  
  const selectedDayData = userDayData || progressData || { 
    steps: 0, 
    tasks: [], 
    xpEarned: 0, 
    calories: 0, 
    distance: 0, 
    time: '0h 0m',
    saved: false
  };
  
  // Add safety checks for numeric values and handle saved property
  const safeSteps = selectedDayData.steps || 0;
  const safeCalories = selectedDayData.calories || 0;
  const safeDistance = selectedDayData.distance || 0;
  const safeTime = selectedDayData.time || '0h 0m';
  const isSaved = progressData?.saved || false;
  
  const isGoalCompleted = safeSteps >= userData.dailyGoal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white font-satoshi">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 animate-fade-in-up">
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-3xl font-bold text-white">{currentYear}</div>
            <div className="text-xl text-primary-200">{monthNames[currentMonth]}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={() => setShowFilters(!showFilters)} 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-primary-600/50"
          >
            <Settings className="w-5 h-5" />
          </Button>
          <Button onClick={() => navigateMonth('prev')} variant="ghost" size="sm" className="text-white hover:bg-primary-600/50">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button onClick={() => navigateMonth('next')} variant="ghost" size="sm" className="text-white hover:bg-primary-600/50">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mx-4 mb-4 animate-fade-in-up">
          <CalendarFilters
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            hideInactiveDays={hideInactiveDays}
            onToggleInactiveDays={() => setHideInactiveDays(!hideInactiveDays)}
          />
        </div>
      )}

      {/* Calendar Heatmap */}
      <div className="mx-4 mt-4 animate-fade-in-up">
        <CalendarHeatmap
          currentMonth={currentMonth}
          currentYear={currentYear}
          onDayClick={handleDayClick}
          selectedDate={selectedDate}
        />
      </div>

      {/* Events for Selected Day */}
      <div className="mx-4 mt-4 animate-fade-in-up">
        <CalendarEvents selectedDate={selectedDate} />
      </div>

      {/* Plan Creation Buttons */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-4 animate-fade-in-up">
        <Button 
          onClick={() => {setPlanType('weekly'); setEditingPlan(null); setShowPlanModal(true);}}
          className="bg-blue-600 hover:bg-blue-700 h-12 flex items-center gap-2 font-semibold"
        >
          <Target className="w-4 h-4" />
          Plan Semanal
        </Button>
        <Button 
          onClick={() => {setPlanType('monthly'); setEditingPlan(null); setShowPlanModal(true);}}
          className="bg-purple-600 hover:bg-purple-700 h-12 flex items-center gap-2 font-semibold"
        >
          <CalendarIcon className="w-4 h-4" />
          Plan Mensual
        </Button>
      </div>

      {/* Month Summary */}
      <div className="mx-4 mt-4 animate-fade-in-up">
        <MonthSummary month={currentMonth} year={currentYear} />
      </div>

      {/* Calendar Export */}
      <div className="mx-4 mt-4 animate-fade-in-up">
        <CalendarExport month={currentMonth} year={currentYear} />
      </div>

      {/* Daily Summary */}
      <Card className="mx-4 mt-6 mb-20 glass-card border-primary-500/20 animate-fade-in-up">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Resumen Del Día ({selectedDate})</h3>
          
          {/* Step Goal Status */}
          <div className={`flex items-center justify-between p-4 rounded-lg border mb-4 transition-all duration-200 ${
            isGoalCompleted 
              ? 'bg-green-500/20 border-green-500/40' 
              : 'bg-primary-500/20 border-primary-500/40'
          }`}>
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-primary-300" />
              <span className="text-lg text-white font-medium">{userData.dailyGoal.toLocaleString()} Pasos</span>
            </div>
            {isGoalCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-400 animate-bounce-subtle" />
            ) : (
              <Clock className="w-6 h-6 text-gray-400" />
            )}
          </div>

          {/* Current Steps */}
          <div className="flex items-center space-x-3 p-4 bg-primary-700/40 rounded-lg mb-4 border border-primary-500/30">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg text-white font-medium">Pasos: {safeSteps.toLocaleString()}</span>
          </div>

          {/* Exercise Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div className="flex flex-col items-center p-3 bg-primary-700/30 rounded-lg transition-all duration-200 hover:bg-primary-700/40">
              <Clock className="w-6 h-6 text-primary-300 mb-2" />
              <div className="text-xl font-bold text-white">{safeTime}</div>
              <div className="text-sm text-primary-200">Tiempo</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-primary-700/30 rounded-lg transition-all duration-200 hover:bg-primary-700/40">
              <Zap className="w-6 h-6 text-primary-300 mb-2" />
              <div className="text-xl font-bold text-white">{safeCalories}</div>
              <div className="text-sm text-primary-200">Kcal</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-primary-700/30 rounded-lg transition-all duration-200 hover:bg-primary-700/40">
              <MapPin className="w-6 h-6 text-primary-300 mb-2" />
              <div className="text-xl font-bold text-white">{safeDistance}</div>
              <div className="text-sm text-primary-200">Km</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <DailySummaryModal
        open={showSummaryModal}
        onOpenChange={setShowSummaryModal}
        selectedDate={selectedDate}
        dayData={{
          steps: safeSteps,
          time: safeTime,
          calories: safeCalories,
          distance: safeDistance,
          saved: isSaved
        }}
        dailyGoal={userData.dailyGoal}
        plans={plans}
        onEditPlan={handleEditPlan}
        onDeletePlan={handleDeletePlan}
        onExportPlan={handleExportPlan}
      />

      <PlanModal
        open={showPlanModal}
        onOpenChange={setShowPlanModal}
        planType={planType}
        editingPlan={editingPlan}
        onSave={handleCreatePlan}
        onUpdate={handleUpdatePlan}
      />

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
            <CalendarIcon className="w-6 h-6 text-primary-400" />
            <span className="text-xs text-primary-400 mt-1">Calendario</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <User className="w-6 h-6 text-gray-400 hover:text-primary-300 transition-colors" />
            <span className="text-xs text-gray-400 hover:text-primary-300 transition-colors mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

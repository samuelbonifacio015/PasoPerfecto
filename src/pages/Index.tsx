import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar as CalendarIcon, User, Target, Plus, Activity, RotateCcw, Undo, Save, Clock, Zap, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';
import { useStepReset } from '@/hooks/useStepReset';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import DailyMissionWidget from '@/components/DailyMissionWidget';
import ExerciseGrid from '@/components/ExerciseGrid';
import EditableStatCard from '@/components/EditableStatCard';
import TimeInputModal from '@/components/TimeInputModal';
import DailyNoteModal from '@/components/DailyNoteModal';

const Index = () => {
  const { userData, updateSteps, updateDayData, updateDailyGoal, updateStreak } = useUserData();
  const { saveCurrentSteps, resetSteps, undoReset, canUndo } = useStepReset();
  const { saveProgress, updateTimeCaloriesDistance, getProgressForDate, markAsSaved } = useDailyProgress();
  const [customSteps, setCustomSteps] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const progressPercentage = Math.min((userData.steps / userData.dailyGoal) * 100, 100);
  const isGoalCompleted = userData.steps >= userData.dailyGoal;
  const currentDate = new Date().toISOString().split('T')[0];
  const displayDate = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });

  const motivationalMessages = [
    "¡Excelente trabajo, Samuel!",
    "¡Sigue así, estás haciendo genial!",
    "¡Cada paso cuenta hacia tu meta!",
    "¡Increíble progreso hoy!",
    "¡Eres imparable!"
  ];

  // Get current day's data with fallbacks
  const currentDayData = userData.dailyData[currentDate];
  const savedProgress = getProgressForDate(currentDate);
  
  const currentTime = currentDayData?.time || savedProgress?.time || `${Math.floor(userData.steps / 120)}h ${Math.floor((userData.steps % 120) / 2)}m`;
  const currentCalories = currentDayData?.calories || savedProgress?.calories || Math.round(userData.steps * 0.04);
  const currentDistance = currentDayData?.distance || savedProgress?.distance || +(userData.steps * 0.0008).toFixed(2);
  
  const currentNote = currentDayData?.note || '';

  const quickStepOptions = [500, 1000, 2000, 3000, 5000];

  const handleAddSteps = (steps: number) => {
    const newSteps = userData.steps + steps;
    updateSteps(newSteps, currentDate);
    
    // Show motivational message
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMotivationalMessage(randomMessage);
    setTimeout(() => setMotivationalMessage(''), 3000);
  };

  const handleSetCustomSteps = () => {
    if (customSteps && !isNaN(Number(customSteps))) {
      const steps = Number(customSteps);
      updateSteps(steps, currentDate);
      setCustomSteps('');
      setShowCustomInput(false);
      
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setMotivationalMessage(randomMessage);
      setTimeout(() => setMotivationalMessage(''), 3000);
    }
  };

  const handleSetGoal = () => {
    const steps = prompt('Ingresa la nueva meta diaria de pasos:');
    if (steps && !isNaN(Number(steps))) {
      updateDailyGoal(Number(steps));
      setMotivationalMessage('¡Nueva meta establecida!');
      setTimeout(() => setMotivationalMessage(''), 3000);
    }
  };

  const handleResetSteps = () => {
    saveCurrentSteps(userData.steps);
    const newSteps = resetSteps();
    updateSteps(newSteps, currentDate);
  };

  const handleUndoReset = () => {
    const previousSteps = undoReset();
    updateSteps(previousSteps, currentDate);
  };

  const handleSaveProgress = () => {
    // Save to both systems for better synchronization
    saveProgress(currentDate, userData.steps, currentTime.toString(), Number(currentCalories), Number(currentDistance));
    markAsSaved(currentDate);
    
    // Update streak counter
    updateStreak();
    
    setMotivationalMessage('¡Progreso guardado correctamente!');
    setTimeout(() => setMotivationalMessage(''), 3000);
  };

  const handleUpdateStat = (field: 'time' | 'calories' | 'distance', value: string) => {
    // Update both systems automatically
    updateTimeCaloriesDistance(currentDate, field, field === 'calories' || field === 'distance' ? Number(value) : value);
    updateDayData(currentDate, field, field === 'calories' || field === 'distance' ? Number(value) : value);
  };

  const handleUpdateNote = (note: string) => {
    // Handle note separately since it's not part of the regular stats
    updateTimeCaloriesDistance(currentDate, 'note', note);
    updateDayData(currentDate, 'note', note);
  };

  const handleTimeModalSave = (hours: number, minutes: number) => {
    const timeString = `${hours}h ${minutes}m`;
    handleUpdateStat('time', timeString);
  };

  const handleNoteSave = (note: string) => {
    handleUpdateNote(note);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white font-satoshi">
      {/* Header */}
      <div className="text-center pt-12 pb-6 animate-fade-in-up">
        <h1 className="text-2xl font-bold text-white mb-2">PasoPerfecto</h1>
        <div className="flex items-center justify-center gap-2">
          <p className="text-primary-200">¡Sigue caminando hacia tu meta!</p>
          <span className="text-sm bg-primary-600/50 px-2 py-1 rounded-lg text-primary-200">{displayDate}</span>
        </div>
        {motivationalMessage && (
          <div className="mt-2 text-green-400 font-medium animate-bounce-subtle">
            {motivationalMessage}
          </div>
        )}
      </div>

      {/* Daily Mission Widget */}
      <div className="px-4 mb-6">
        <DailyMissionWidget currentSteps={userData.steps} />
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center mb-8 animate-fade-in-up">
        <div className="relative">
          <svg className="transform -rotate-90" width="280" height="280">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7A12FF" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7A12FF" />
              </linearGradient>
            </defs>
            
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="rgba(122, 18, 255, 0.2)"
              strokeWidth="20"
              fill="none"
              className="drop-shadow-lg"
            />
            
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="url(#progressGradient)"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-1000 ease-out drop-shadow-lg glow-purple"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(122, 18, 255, 0.4))'
              }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white mb-2">
              {userData.steps.toLocaleString()}
            </div>
            <div className="text-primary-200 mb-1">pasos</div>
            <div className="text-2xl font-semibold text-white">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-primary-300">
              Meta: {userData.dailyGoal.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons - Improved */}
      <div className="px-4 mb-6 animate-fade-in-up">
        <div className="grid grid-cols-5 gap-2 mb-4">
          {quickStepOptions.map((steps) => (
            <Button 
              key={steps}
              onClick={() => handleAddSteps(steps)}
              className="bg-primary-600/80 hover:bg-primary-500 border border-primary-400/30 h-12 font-semibold text-sm backdrop-blur-sm button-hover"
            >
              +{steps >= 1000 ? `${steps/1000}k` : steps}
            </Button>
          ))}
        </div>

        {!showCustomInput ? (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => setShowCustomInput(true)}
              className="bg-gradient-purple hover:bg-primary-500 h-12 flex items-center gap-2 text-lg font-semibold border border-primary-400/30 shadow-lg button-hover"
            >
              <Plus className="w-5 h-5" />
              <span>Personalizar</span>
            </Button>
            <Button 
              onClick={handleSetGoal}
              className="bg-blue-600 hover:bg-blue-700 h-12 flex items-center gap-2 text-lg font-semibold border border-blue-500/30 shadow-lg button-hover"
            >
              <Target className="w-5 h-5" />
              <span>Establecer</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                value={customSteps}
                onChange={(e) => setCustomSteps(e.target.value)}
                placeholder="Ingresa pasos"
                className="flex-1 px-4 py-3 bg-primary-700/50 border border-primary-500/30 rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-200"
              />
              <Button 
                onClick={handleSetCustomSteps}
                className="bg-primary-500 hover:bg-primary-600 px-6 button-hover"
              >
                Establecer
              </Button>
            </div>
            <Button 
              onClick={() => setShowCustomInput(false)}
              variant="outline"
              className="w-full border-primary-500/50 text-primary-300 hover:bg-primary-500/20"
            >
              Cancelar
            </Button>
          </div>
        )}

        {/* Save Progress Button */}
        <Button 
          onClick={handleSaveProgress}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 h-12 flex items-center gap-2 text-lg font-semibold border border-green-500/30 shadow-lg button-hover"
        >
          <Save className="w-5 h-5" />
          <span>Guardar Progreso del Día</span>
        </Button>

        {/* Reset and Undo Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button 
            onClick={handleResetSteps}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/20 h-10 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Resetear
          </Button>
          <Button 
            onClick={handleUndoReset}
            disabled={!canUndo}
            variant="outline"
            className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 h-10 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Undo className="w-4 h-4" />
            Deshacer
          </Button>
        </div>
      </div>

      {/* Stats Cards with Exercise Grid - Auto-sync enabled */}
      <div className="px-4 mb-6 animate-fade-in-up">
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div onClick={() => setIsTimeModalOpen(true)} className="cursor-pointer">
            <EditableStatCard
              title="Tiempo"
              value={currentTime}
              onSave={(value) => handleUpdateStat('time', value)}
              icon={<Clock className="w-6 h-6 text-primary-300" />}
            />
          </div>
          <EditableStatCard
            title="Calorías"
            value={currentCalories}
            onSave={(value) => handleUpdateStat('calories', value)}
            icon={<Zap className="w-6 h-6 text-primary-300" />}
          />
          <EditableStatCard
            title="Km"
            value={currentDistance}
            onSave={(value) => handleUpdateStat('distance', value)}
            icon={<MapPin className="w-6 h-6 text-primary-300" />}
          />
        </div>

        {/* Exercise Grid */}
        <Card className="glass-card border-primary-500/20 mb-4">
          <CardContent className="p-4">
            <ExerciseGrid 
              time={currentTime.toString()}
              calories={Number(currentCalories)}
              distance={Number(currentDistance)}
            />
          </CardContent>
        </Card>

        {/* Daily Note Section */}
        <Card className="glass-card border-primary-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-300" />
                <span className="text-sm text-primary-200 font-medium">Nota del Día</span>
              </div>
              <Button
                onClick={() => setIsNoteModalOpen(true)}
                size="sm"
                className="bg-primary-600 hover:bg-primary-700 text-xs"
              >
                {currentNote ? 'Editar' : 'Agregar'}
              </Button>
            </div>
            {currentNote ? (
              <div className="text-sm text-white bg-primary-700/20 p-3 rounded-lg">
                {currentNote}
              </div>
            ) : (
              <div className="text-sm text-primary-300 italic">
                No hay nota para este día
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Goal Status */}
      {isGoalCompleted && (
        <div className="mx-4 mb-6 animate-fade-in-up">
          <Card className="bg-green-500/20 border-green-500/40">
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-2">
                <Target className="w-6 h-6 text-green-400 animate-bounce-subtle" />
                <span className="text-lg font-semibold text-green-400">¡Meta Completada!</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Streak Display */}
      <div className="mx-4 mb-20 animate-fade-in-up">
        <Card className="glass-card border-primary-500/20">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">🔥 {userData.streak}</div>
              <div className="text-sm text-primary-200">días seguidos</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Input Modal */}
      <TimeInputModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        onSave={handleTimeModalSave}
        currentTime={currentTime.toString()}
      />

      {/* Daily Note Modal */}
      <DailyNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleNoteSave}
        currentNote={currentNote}
        selectedDate={currentDate}
      />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-800/95 backdrop-blur-md border-t border-primary-500/20">
        <div className="grid grid-cols-4 py-2">
          <Link to="/" className="flex flex-col items-center py-3 transition-all duration-200 hover:bg-primary-700/30">
            <Home className="w-6 h-6 text-primary-400" />
            <span className="text-xs text-primary-400 mt-1">Menu</span>
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
            <User className="w-6 h-6 text-gray-400 hover:text-primary-300 transition-colors" />
            <span className="text-xs text-gray-400 hover:text-primary-300 transition-colors mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

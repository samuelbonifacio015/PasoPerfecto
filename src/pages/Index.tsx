import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar as CalendarIcon, User, Target, Plus, Activity, RotateCcw, Undo, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';
import { useStepReset } from '@/hooks/useStepReset';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import DailyMissionWidget from '@/components/DailyMissionWidget';
import ExerciseGrid from '@/components/ExerciseGrid';
import EditableStatCard from '@/components/EditableStatCard';

const Index = () => {
  const { userData, updateSteps } = useUserData();
  const { saveCurrentSteps, resetSteps, undoReset, canUndo } = useStepReset();
  const { saveProgress, updateTimeCaloriesDistance, getProgressForDate } = useDailyProgress();
  const [customSteps, setCustomSteps] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');

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

  // Obtiene la data del día actual o calcula valores predeterminados
  const currentTime = userData.dailyData[currentDate]?.time || `${Math.floor(userData.steps / 120)}h ${Math.floor((userData.steps % 120) / 2)}m`;
  const currentCalories = userData.dailyData[currentDate]?.calories || Math.round(userData.steps * 0.04);
  const currentDistance = userData.dailyData[currentDate]?.distance || +(userData.steps * 0.0008).toFixed(2);

  const handleAddSteps = (steps: number) => {
    const newSteps = userData.steps + steps;
    updateSteps(newSteps, currentDate);
    
    // Muestra mensaje aleatorio motivacional
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMotivationalMessage(randomMessage);
    setTimeout(() => setMotivationalMessage(''), 3000);
  };

  const handleCustomSteps = () => {
    if (customSteps && !isNaN(Number(customSteps))) {
      handleAddSteps(Number(customSteps));
      setCustomSteps('');
      setShowCustomInput(false);
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
    saveProgress(currentDate, userData.steps, currentTime, currentCalories, currentDistance);
    setMotivationalMessage('¡Progreso guardado correctamente!');
    setTimeout(() => setMotivationalMessage(''), 3000);
  };

  const handleUpdateStat = (field: 'time' | 'calories' | 'distance', value: string) => {
    updateTimeCaloriesDistance(currentDate, field, field === 'calories' || field === 'distance' ? Number(value) : value);
    updateSteps(userData.steps, currentDate); // Trigger update to sync with userData
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

      {/* Widget Mision Diaria */}
      <div className="px-4 mb-6">
        <DailyMissionWidget currentSteps={userData.steps} />
      </div>

      {/* Progreso */}
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

      {/* Buttons Acciones */}
      <div className="px-4 mb-6 animate-fade-in-up">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Button 
            onClick={() => handleAddSteps(1000)}
            className="bg-primary-600/80 hover:bg-primary-500 border border-primary-400/30 h-12 font-semibold text-lg backdrop-blur-sm button-hover"
          >
            +1000
          </Button>
          <Button 
            onClick={() => handleAddSteps(3000)}
            className="bg-primary-600/80 hover:bg-primary-500 border border-primary-400/30 h-12 font-semibold text-lg backdrop-blur-sm button-hover"
          >
            +3000
          </Button>
          <Button 
            onClick={() => handleAddSteps(6000)}
            className="bg-primary-600/80 hover:bg-primary-500 border border-primary-400/30 h-12 font-semibold text-lg backdrop-blur-sm button-hover"
          >
            +6000
          </Button>
        </div>

        {!showCustomInput ? (
          <Button 
            onClick={() => setShowCustomInput(true)}
            className="w-full bg-gradient-purple hover:bg-primary-500 h-12 flex items-center gap-2 text-lg font-semibold border border-primary-400/30 shadow-lg button-hover"
          >
            <Plus className="w-5 h-5" />
            <span>Personalizar Pasos</span>
          </Button>
        ) : (
          <div className="flex gap-2">
            <input
              type="number"
              value={customSteps}
              onChange={(e) => setCustomSteps(e.target.value)}
              placeholder="Ingresa pasos"
              className="flex-1 px-4 py-3 bg-primary-700/50 border border-primary-500/30 rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-200"
            />
            <Button 
              onClick={handleCustomSteps}
              className="bg-primary-500 hover:bg-primary-600 px-6 button-hover"
            >
              Agregar
            </Button>
          </div>
        )}

        {/* Guardar Progreso */}
        <Button 
          onClick={handleSaveProgress}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 h-12 flex items-center gap-2 text-lg font-semibold border border-green-500/30 shadow-lg button-hover"
        >
          <Save className="w-5 h-5" />
          <span>Guardar Progreso del Día</span>
        </Button>

        {/* Reset */}
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

      {/* Stats Grid */}
      <div className="px-4 mb-6 animate-fade-in-up">
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <EditableStatCard
            title="Tiempo"
            value={currentTime}
            onSave={(value) => handleUpdateStat('time', value)}
          />
          <EditableStatCard
            title="Calorías"
            value={currentCalories}
            onSave={(value) => handleUpdateStat('calories', value)}
          />
          <EditableStatCard
            title="Km"
            value={currentDistance}
            onSave={(value) => handleUpdateStat('distance', value)}
          />
        </div>

        {/* Grid Ejercicio*/}
        <Card className="glass-card border-primary-500/20">
          <CardContent className="p-4">
            <ExerciseGrid 
              time={currentTime}
              calories={currentCalories}
              distance={currentDistance}
            />
          </CardContent>
        </Card>
      </div>

      {/* Estado de Meta */}
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

      {/* Display de Racha */}
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

      {/* Navegacion Inferior */}
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

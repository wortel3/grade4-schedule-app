import { useApp } from '../hooks/use-app';
import { 
  CheckCircle2, Circle, HelpCircle, Layers, BookOpen, Map, Microscope, 
  Smile, Star, Rocket, Music, Trash2, Utensils, Shirt, Backpack, Clock, 
  Gamepad2, Coffee, Moon 
} from 'lucide-react';
import { cn } from '../lib/utils';

const ICON_MAP = {
  Layers, BookOpen, Map, Microscope, Smile, Star, Rocket, Music, 
  Trash2, Utensils, Shirt, Backpack, Clock, Gamepad2, Coffee, Moon
};

export default function OrganizationPhase() {
  const { t, completedTasks, toggleTask, activities, phaseNames, language } = useApp();

  return (
    <div>
      <h2 className="text-2xl font-black mb-6 text-main tracking-tight">{phaseNames.organization[language]}</h2>
      
      <div className="space-y-6">
        {activities.organization.map(task => {
          const isCompleted = completedTasks.includes(task.id);
          const Icon = ICON_MAP[task.iconName as keyof typeof ICON_MAP] || HelpCircle;
          
          return (
            <div key={task.id} className="space-y-4">
              <p className="text-lg font-bold text-main">{task.label[language]}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => !isCompleted && toggleTask(task.id)}
                  className={cn(
                    "p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all duration-300",
                    isCompleted
                      ? "bg-[var(--status-success-bg)] border-[var(--status-success)] text-[var(--status-success)]"
                      : "bg-surface-2 border-[var(--bg-panel-border)] hover:border-[var(--accent-primary)] text-muted"
                  )}
                >
                  {isCompleted ? <CheckCircle2 size={32} className="fill-current" /> : <Icon size={32} />}
                  <span className="font-black text-xl">{t('yes')}</span>
                </button>

                <button
                  onClick={() => isCompleted && toggleTask(task.id)}
                  className={cn(
                    "p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all duration-300",
                    !isCompleted
                      ? "bg-[var(--status-inactive-bg)] border-[var(--bg-panel-border)] text-muted"
                      : "bg-surface-2 border-[var(--bg-panel-border)] hover:border-red-400 text-muted"
                  )}
                >
                  <Circle size={32} />
                  <span className="font-black text-xl">{t('no')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

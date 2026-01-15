import { useEffect, useState } from 'react';
import { useApp } from '../hooks/use-app';
import { 
  CheckCircle2, Circle, Clock, Trash2, Utensils, Shirt, Backpack, 
  HelpCircle, Smile, Star, Rocket, Music, Layers, BookOpen, Map, Microscope, 
  Gamepad2, Coffee, Moon,
  type LucideIcon 
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { Activity } from '../types';

const ICON_MAP: Record<string, LucideIcon> = {
  Trash2, Utensils, Shirt, Backpack, Clock, Smile, Star, Rocket, Music,
  Layers, BookOpen, Map, Microscope, Gamepad2, Coffee, Moon
};

function TaskTimer({ task }: { task: Activity }) {
    const { t } = useApp();
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState((task.timerDuration || 30) * 60);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setTimerActive(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const toggleTimer = () => {
        if (!timerActive && timeLeft === 0) {
            setTimeLeft((task.timerDuration || 30) * 60);
        }
        setTimerActive(!timerActive);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="mt-3 ml-20">
            <button 
                onClick={(e) => { e.stopPropagation(); toggleTimer(); }} 
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors",
                    timerActive 
                        ? "bg-red-100 text-red-600 animate-pulse" 
                        : "bg-[var(--status-inactive-bg)] text-[var(--text-muted)] hover:bg-[var(--bg-panel-border)]"
                )}
            >
                <Clock size={16} />
                <span>{timerActive ? t('pause') : t('startTimer')} ({formatTime(timeLeft)})</span>
            </button>
        </div>
    );
}

export default function ArrivalPhase() {
  const { completedTasks, toggleTask, activities, phaseNames, language } = useApp();

  return (
    <div>
      <h2 className="text-2xl font-black mb-6 text-main tracking-tight">{phaseNames.arrival[language]}</h2>
      <div className="grid gap-4">
        {activities.arrival.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
          const Icon = ICON_MAP[task.iconName as keyof typeof ICON_MAP] || HelpCircle;

          return (
            <div key={task.id} className="relative group">
              <button 
                onClick={() => toggleTask(task.id)} 
                className={cn(
                    "w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 border shadow-sm",
                    isCompleted 
                        ? "bg-[var(--status-success-bg)] border-[var(--status-success)]" 
                        : "bg-surface-2 border-[var(--bg-panel-border)] hover:border-[var(--accent-primary)] hover:scale-[1.01] hover:shadow-md"
                )}
              >
                {/* Task Icon */}
                <div className={cn(
                    "p-3 rounded-full transition-colors border-2",
                    isCompleted ? "bg-[var(--status-success)] border-transparent text-white" : "bg-[var(--bg-panel)] border-[var(--bg-panel-border)] text-[var(--accent-secondary)]"
                )}>
                  <Icon size={28} strokeWidth={2.5} />
                </div>

                <div className="flex-1 text-left">
                  <span className={cn(
                      "text-lg font-bold block leading-tight",
                      isCompleted ? "text-[var(--text-main)] line-through opacity-70" : "text-[var(--text-main)]"
                  )}>
                    {task.label[language]}
                  </span>
                </div>

                {/* Completion checkmark */}
                <div>
                  {isCompleted
                    ? <CheckCircle2 className="w-8 h-8 text-[var(--status-success)] fill-current" />
                    : <Circle className="w-8 h-8 text-[var(--bg-panel-border)]" />
                  }
                </div>
              </button>

              {/* Timer UI if applicable */}
              {task.hasTimer && (
                <TaskTimer key={`${task.id}-${task.timerDuration}`} task={task} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

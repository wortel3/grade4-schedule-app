import { useEffect, useState } from 'react';
import { useApp } from '../hooks/use-app';
import { CheckCircle2, Circle, Clock, Trash2, Utensils, Shirt, Backpack } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ArrivalPhase() {
  const { t, completedTasks, toggleTask } = useApp();

  // Timer logic for Rest feature
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins in seconds

  useEffect(() => {
    let interval: number;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive]);

  const toggleTimer = () => {
    if (!timerActive && timeLeft === 0) {
        setTimeLeft(30 * 60); // Reset if finished
    }
    setTimerActive(!timerActive);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const tasks = [
    { id: 'unpack', icon: Backpack, labelProp: 'unpack' },
    { id: 'clothes', icon: Shirt, labelProp: 'clothes' },
    { id: 'lunch', icon: Utensils, labelProp: 'lunch' },
    { id: 'rest', icon: Clock, labelProp: 'rest', hasTimer: true },
    { id: 'trash', icon: Trash2, labelProp: 'trash' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-black mb-6 text-main tracking-tight">{t('phase1')}</h2>
      <div className="grid gap-4">
        {tasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
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
                  <task.icon size={28} strokeWidth={2.5} />
                </div>

                <div className="flex-1 text-left">
                  <span className={cn(
                      "text-lg font-bold block",
                      isCompleted ? "text-[var(--text-main)] line-through opacity-70" : "text-[var(--text-main)]"
                  )}>
                    {t(task.labelProp)}
                  </span>
                </div>

                {/* Completion checkmark */}
                <div className="text-[var(--status-success)]">
                  {isCompleted 
                    ? <CheckCircle2 className="w-8 h-8 fill-current text-white" /> 
                    : <Circle className="w-8 h-8 text-[var(--bg-panel-border)]" />
                  }
                </div>
              </button>

              {/* Timer UI if applicable */}
              {task.hasTimer && (
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
                    <span>{timerActive ? 'Pause' : 'Start Timer'} ({formatTime(timeLeft)})</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

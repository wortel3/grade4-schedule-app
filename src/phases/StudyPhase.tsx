import { useState } from 'react';
import { useApp } from '../hooks/use-app';
import { 
    CheckCircle2, Circle, HelpCircle, BookOpen, Layers, Map, Microscope, 
    Smile, Star, Rocket, Music, Trash2, Utensils, Shirt, Backpack, Clock, 
    Gamepad2, Coffee, Moon 
} from 'lucide-react';
import { cn } from '../lib/utils';

const ICON_MAP = {
  BookOpen, Layers, Map, Microscope, Smile, Star, Rocket, Music, 
  Trash2, Utensils, Shirt, Backpack, Clock, Gamepad2, Coffee, Moon
};

export default function StudyPhase() {
  const { t, completedTasks, toggleTask, activities, phaseNames, language } = useApp();
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  // Auto-complete subject when all subtasks are done
  const checkAndCompleteSubject = (subjectId: string) => {
    const allSubtasksComplete = ['read', 'notes', 'practice'].every(
      taskType => completedTasks.includes(`${subjectId}_${taskType}`)
    );

    if (allSubtasksComplete && !completedTasks.includes(subjectId)) {
      toggleTask(subjectId);
    } else if (!allSubtasksComplete && completedTasks.includes(subjectId)) {
      toggleTask(subjectId);
    }
  };

  const handleSubtaskToggle = (subjectId: string, taskType: string) => {
    toggleTask(`${subjectId}_${taskType}`);
    // Check after a brief delay to allow state to update
    setTimeout(() => checkAndCompleteSubject(subjectId), 100);
  };

  return (
    <div>
      <h2 className="text-2xl font-black mb-6 text-main tracking-tight">{phaseNames.study[language]}</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {activities.study.map(subject => {
            const isCompleted = completedTasks.includes(subject.id);
            const isActive = activeSubject === subject.id;
            const Icon = ICON_MAP[subject.iconName as keyof typeof ICON_MAP] || HelpCircle;

            return (
                <div key={subject.id} className="flex flex-col items-center gap-2">
                    <button
                        onClick={() => setActiveSubject(isActive ? null : subject.id)}
                        className={cn(
                        "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all duration-300 w-full",
                        isActive ? "bg-[var(--accent-primary)] text-white shadow-lg scale-105 border-transparent" :
                        isCompleted ? "bg-[var(--status-success-bg)] border-[var(--status-success)] text-[var(--status-success)]" :
                        "bg-surface-2 border-[var(--bg-panel-border)] text-muted hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                        )}
                    >
                        <Icon size={24} />
                        <span className="font-bold text-xs">{subject.label[language]}</span>
                    </button>
                </div>
            );
          })}
        </div>

        {activeSubject && (
            <div className="bg-[var(--bg-app)] rounded-3xl p-6 border-2 border-dashed border-[var(--bg-panel-border)] animate-in slide-in-from-top-4 duration-300">
                <p className="text-sm font-bold text-muted mb-4 uppercase tracking-widest">{t('tasks')}</p>
                <div className="space-y-3">
                    {['read', 'notes', 'practice'].map(taskType => {
                        const isSubtaskComplete = completedTasks.includes(`${activeSubject}_${taskType}`);
                        return (
                            <button
                                key={taskType}
                                onClick={() => handleSubtaskToggle(activeSubject, taskType)}
                                className={cn(
                                    "w-full p-4 rounded-xl flex items-center justify-between transition-all border",
                                    isSubtaskComplete
                                        ? "bg-[var(--status-success-bg)] border-[var(--status-success)]"
                                        : "bg-white border-[var(--bg-panel-border)] shadow-sm hover:border-[var(--accent-primary)]"
                                )}
                            >
                                <span className={cn(
                                    "font-bold",
                                    isSubtaskComplete ? "text-[var(--text-main)] line-through opacity-70" : "text-[var(--text-main)]"
                                )}>{t(taskType)}</span>
                                {isSubtaskComplete
                                    ? <CheckCircle2 size={24} className="text-[var(--status-success)] fill-current" />
                                    : <Circle size={24} className="text-[var(--bg-panel-border)]" />
                                }
                            </button>
                        );
                    })}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

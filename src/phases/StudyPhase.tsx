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
                <div className="flex flex-col items-center gap-2">
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
                    {!isCompleted && isActive && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); toggleTask(subject.id); }}
                            className="text-[10px] font-black uppercase text-[var(--accent-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                        >
                            {t('markDone')}
                        </button>
                    )}
                </div>
            );
          })}
        </div>

        {activeSubject && (
            <div className="bg-[var(--bg-app)] rounded-3xl p-6 border-2 border-dashed border-[var(--bg-panel-border)] animate-in slide-in-from-top-4 duration-300">
                <p className="text-sm font-bold text-muted mb-4 uppercase tracking-widest">{t('tasks')}</p>
                <div className="space-y-3">
                    {['read', 'notes', 'practice'].map(taskType => (
                        <button
                            key={taskType}
                            onClick={() => toggleTask(`${activeSubject}_${taskType}`)}
                            className={cn(
                                "w-full p-4 rounded-xl flex items-center justify-between transition-all border",
                                completedTasks.includes(`${activeSubject}_${taskType}`)
                                    ? "bg-[var(--status-success-bg)] border-[var(--status-success)]"
                                    : "bg-white border-[var(--bg-panel-border)] shadow-sm"
                            )}
                        >
                            <span className="font-bold text-[var(--text-main)]">{t(taskType)}</span>
                            {completedTasks.includes(`${activeSubject}_${taskType}`) 
                                ? <CheckCircle2 size={24} className="text-[var(--status-success)]" /> 
                                : <Circle size={24} className="text-[var(--bg-panel-border)]" />
                            }
                        </button>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

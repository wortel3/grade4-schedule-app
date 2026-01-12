import { useState } from 'react';
import { useApp } from '../hooks/use-app';
import { Map, Microscope, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';
import Confetti from 'react-confetti';

export default function StudyPhase() {
  const { t, completedTasks, toggleTask } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<'science' | 'social' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const subTasks = ['read', 'mindmap', 'summary', 'file'];

  const getTaskId = (subject: string, task: string) => `study_${subject}_${task}`;

  const handleTaskToggle = (subject: string, task: string) => {
      const id = getTaskId(subject, task);
      toggleTask(id);
      
      // Check if session complete to show confetti
      // simplified logic
      if (!completedTasks.includes(id)) {
          // means we just completed it
          // check if all others for this subject are done
           const allOthersDone = subTasks.filter(t => t !== task).every(t => completedTasks.includes(getTaskId(subject, t)));
           if (allOthersDone) {
               setShowConfetti(true);
               setTimeout(() => setShowConfetti(false), 5000);
           }
      }
  }

  return (
    <div className="relative">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <h2 className="text-2xl font-black mb-6 text-main tracking-tight">{t('phase3')}</h2>

    {!selectedSubject ? (
        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={() => setSelectedSubject('science')} 
                className="group relative overflow-hidden p-6 rounded-[2rem] bg-[var(--status-inactive-bg)] border-2 border-transparent hover:border-[var(--accent-primary)] transition-all hover:scale-105"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Microscope size={64} />
                </div>
                <Microscope size={48} className="text-[var(--accent-secondary)] mb-4" />
                <span className="block font-bold text-xl text-main text-left leading-tight">{t('subjects.science')}</span>
            </button>
            <button 
                onClick={() => setSelectedSubject('social')} 
                className="group relative overflow-hidden p-6 rounded-[2rem] bg-[var(--status-inactive-bg)] border-2 border-transparent hover:border-[var(--accent-primary)] transition-all hover:scale-105"
            >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Map size={64} />
                </div>
                <Map size={48} className="text-[var(--accent-secondary)] mb-4" />
                <span className="block font-bold text-xl text-main text-left leading-tight">{t('subjects.social')}</span>
            </button>
        </div>
    ) : (
        <div className="space-y-6">
            <button onClick={() => setSelectedSubject(null)} className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1">
                ← Back to Subjects
            </button>
            <h3 className="text-3xl font-black text-main">{selectedSubject === 'science' ? t('subjects.science') : t('subjects.social')}</h3>
            <div className="space-y-3">
                {subTasks.map(task => {
                    const id = getTaskId(selectedSubject, task);
                    const isDone = completedTasks.includes(id);
                    return (
                      <button 
                        key={id} 
                        onClick={() => handleTaskToggle(selectedSubject, task)} 
                        className={cn(
                            "w-full p-4 rounded-xl flex items-center justify-between transition-all border-2",
                            isDone 
                                ? "bg-[var(--status-success-bg)] border-[var(--status-success)]" 
                                : "bg-[var(--bg-app)] border-transparent hover:border-[var(--accent-primary)]"
                        )}
                      >
                        <span className={cn(
                            "font-bold text-lg", 
                            isDone ? "line-through text-[var(--accent-primary)] opacity-60" : "text-main"
                        )}>
                            {t(task)}
                        </span>
                        {isDone 
                            ? <CheckCircle2 className="text-[var(--status-success)] w-8 h-8 fill-current text-white"/> 
                            : <Circle className="text-[var(--bg-panel-border)] w-8 h-8"/>
                        }
                      </button>
                    )
                })}
            </div>
        </div>
    )}
  </div>
  );
}

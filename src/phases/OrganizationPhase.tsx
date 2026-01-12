import { useState } from 'react';
import { useApp } from '../hooks/use-app';
import { Layers, CheckCircle2 } from 'lucide-react';

export default function OrganizationPhase() {
  const { t, completedTasks, toggleTask } = useApp();
  const [triageStep, setTriageStep] = useState(0); // 0: Start, 1: Tomorrow, 2: Day After, 3: Done

  const isCompleted = completedTasks.includes('homework_sorted');

  const handleTriage = (step: number) => {
    if (step === 3) {
        if (!isCompleted) toggleTask('homework_sorted');
        setTriageStep(3);
    } else {
        setTriageStep(step);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-black mb-6 text-main tracking-tight">{t('phase2')}</h2>
      {!isCompleted ? (
        <div className="space-y-4">
          <div className="bg-[var(--status-inactive-bg)] p-8 rounded-[2rem] text-center border-2 border-[var(--bg-panel-border)] shadow-inner">
            {triageStep === 0 && (
              <div className="animate-in zoom-in duration-300">
                <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                    <Layers size={48} className="text-[var(--accent-primary)]" />
                </div>
                <h3 className="text-2xl font-bold text-main mb-6">{t('homework')}</h3>
                <button onClick={() => setTriageStep(1)} className="w-full py-4 bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white rounded-xl font-bold text-xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]">
                  Start Sorting 🚀
                </button>
              </div>
            )}
            
            {triageStep === 1 && (
               <div className="animate-in slide-in-from-right duration-300">
                   <h3 className="text-2xl font-bold text-main mb-8">{t('tomorrow')}</h3>
                   <div className="grid grid-cols-2 gap-4">
                       <button onClick={() => handleTriage(2)} className="py-6 bg-surface-2 rounded-xl font-bold text-lg text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-panel)] transition-all shadow-sm">
                           No / Nee
                       </button>
                       <button onClick={() => handleTriage(2)} className="py-6 bg-[var(--accent-primary)] text-white rounded-xl font-bold text-lg shadow-md hover:scale-[1.02] transition-all">
                           Yes / Ja
                       </button>
                   </div>
               </div>
            )}

            {triageStep === 2 && (
               <div className="animate-in slide-in-from-right duration-300">
                   <h3 className="text-2xl font-bold text-main mb-8">{t('dayafter')}</h3>
                   <div className="grid grid-cols-2 gap-4">
                       <button onClick={() => handleTriage(3)} className="py-6 bg-surface-2 rounded-xl font-bold text-lg text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-panel)] transition-all shadow-sm">
                           No / Nee
                       </button>
                       <button onClick={() => handleTriage(3)} className="py-6 bg-[var(--accent-primary)] text-white rounded-xl font-bold text-lg shadow-md hover:scale-[1.02] transition-all">
                           Yes / Ja
                       </button>
                   </div>
               </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-[var(--status-success-bg)] border-2 border-[var(--status-success)] rounded-2xl text-center flex flex-col items-center">
          <div className="bg-[var(--status-success)] text-white p-3 rounded-full mb-2">
            <CheckCircle2 size={32} />
          </div>
          <span className="text-[var(--text-main)] font-bold block text-xl">Homework Organized!</span>
        </div>
      )}
    </div>
  );
}

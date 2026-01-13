import { useState } from 'react';
import { useApp } from '../hooks/use-app';
import ArrivalPhase from '../phases/ArrivalPhase';
import OrganizationPhase from '../phases/OrganizationPhase';
import StudyPhase from '../phases/StudyPhase';
import FunBoard from './FunBoard'; 
import AdminDashboard from './AdminDashboard';
import { cn } from '../lib/utils';
import { Lock, Settings, Printer } from 'lucide-react';
import Fireworks from './Fireworks';
import PrintView from './PrintView';

export default function Dashboard() {
  const { user, t, completedTasks, resetProgress, activities } = useApp();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dynamic Logic to check phase completion
  const phase1Complete = activities.arrival.length > 0 && activities.arrival.every(task => completedTasks.includes(task.id));
  const phase2Complete = phase1Complete && (activities.organization.length === 0 || activities.organization.every(task => completedTasks.includes(task.id)));
  const allComplete = phase2Complete && activities.study.every(task => completedTasks.includes(task.id));

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen pb-20 p-4 lg:p-8 space-y-8 transition-colors duration-500">
       {/* Header */}
       <header className="flex justify-between items-center bg-panel sticky top-4 z-10 p-4 rounded-3xl border shadow-sm/50">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setIsAdminOpen(true)}
                className="p-3 bg-[var(--bg-app)] rounded-2xl text-[var(--accent-secondary)] hover:scale-110 active:scale-95 transition-all shadow-sm print:hidden"
                title={t('settings')}
            >
                <Settings size={28} />
            </button>
            <button 
                onClick={() => window.print()}
                className="p-3 bg-[var(--bg-app)] rounded-2xl text-[var(--accent-primary)] hover:scale-110 active:scale-95 transition-all shadow-sm print:hidden"
                title={t('print')}
            >
                <Printer size={28} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-muted">{t('goodAfternoon')},</h1>
              <p className="text-[var(--accent-primary)] font-black text-3xl tracking-tight leading-none">{user.name}</p>
            </div>
          </div>
          <div className="text-5xl drop-shadow-sm filter">
            {user.theme === 'meisie' ? '🐼' : '🚀'}
          </div>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left Column: Tasks */}
           <div className="lg:col-span-2 space-y-8">
                {/* Phase 1: Arrival */}
                <section className="bg-panel rounded-[2rem] p-6 lg:p-8 shadow-sm border">
                    <ArrivalPhase />
                </section>

                {/* Phase 2: Organization */}
                <section className={cn(
                    "bg-panel rounded-[2rem] p-6 lg:p-8 shadow-sm border transition-all duration-500",
                    !phase1Complete && "opacity-60 grayscale-[0.5] pointer-events-none relative overflow-hidden"
                )}>
                    {!phase1Complete && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--bg-app)]/60 backdrop-blur-[2px]">
                            <div className="flex flex-col items-center text-muted bg-panel p-6 rounded-2xl shadow-lg border">
                                <Lock size={32} className="mb-2 text-[var(--accent-secondary)]"/>
                                <span className="font-bold text-lg">{t('phaseLocked')}</span>
                            </div>
                        </div>
                    )}
                    <OrganizationPhase />
                </section>

                {/* Phase 3: Study */}
                <section className={cn(
                    "bg-panel rounded-[2rem] p-6 lg:p-8 shadow-sm border transition-all duration-500",
                    !phase2Complete && "opacity-60 grayscale-[0.5] pointer-events-none relative overflow-hidden"
                )}>
                    {!phase2Complete && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--bg-app)]/60 backdrop-blur-[2px]">
                            <div className="flex flex-col items-center text-muted bg-panel p-6 rounded-2xl shadow-lg border">
                                <Lock size={32} className="mb-2 text-[var(--accent-secondary)]"/>
                                <span className="font-bold text-lg">{t('phaseLocked')}</span>
                            </div>
                        </div>
                    )}
                    <StudyPhase />
                </section>
           </div>
           
           {/* Right Column: Interaction Sidebar */}
           <div className="hidden lg:block lg:col-span-1 sticky top-32 h-[calc(100vh-10rem)]">
                <FunBoard />
           </div>
       </div>

       {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}

        {/* Day Complete / Next Day */}
        {allComplete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-500">
                <Fireworks />
                <div className="bg-panel max-w-lg w-full p-10 rounded-[3rem] shadow-2xl text-center space-y-8 animate-in zoom-in-95 slide-in-from-bottom-10 duration-700 border-4 border-[var(--accent-primary)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-50" />
                    
                    <div className="relative">
                        <div className="text-8xl animate-bounce mb-4">🏆</div>
                        <div className="absolute -top-4 -right-4 bg-[var(--accent-secondary)] text-white w-12 h-12 rounded-full flex items-center justify-center font-black animate-pulse shadow-lg">
                            ★
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-5xl font-black bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent italic">
                            {t('allDone')}
                        </h2>
                        <p className="text-2xl font-bold text-muted balance-text">
                            {t('dayCompleteMsg')}
                        </p>
                    </div>

                    <button 
                        onClick={resetProgress}
                        className="w-full py-6 bg-[var(--accent-primary)] text-white rounded-[2rem] font-black text-2xl shadow-[0_10px_0_rgb(0,0,0,0.1)] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_0_rgb(0,0,0,0.1)] active:translate-y-[4px] active:shadow-none bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                    >
                        ✨ {t('startNewDay')}
                    </button>

                    <p className="text-xs uppercase tracking-[0.2em] font-black text-muted/40">
                        {new Date().toLocaleDateString(user.language === 'af' ? 'af-ZA' : 'en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                </div>
            </div>
        )}

        {/* Debug / Reset */}
        <div className="text-center pt-8 opacity-20 hover:opacity-100 transition-opacity">
            <button onClick={resetProgress} className="text-[10px] uppercase tracking-widest font-black text-muted hover:text-red-500">
                {t('resetDebug')}
            </button>
        </div>

        <PrintView />
    </div>
  );
}

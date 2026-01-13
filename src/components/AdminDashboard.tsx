import { useState } from 'react';
import { useApp } from '../hooks/use-app';
import { 
  X, Plus, Trash2, Edit2, Check, GripVertical,
  Backpack, Shirt, Utensils, Clock, BookOpen, Layers, Map, Microscope, 
  Smile, Star, Rocket, Music, HelpCircle, Gamepad2, Coffee, Moon,
  type LucideIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { Activity, ActivityPhase } from '../types';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';

const ICON_OPTIONS: Record<string, LucideIcon> = {
  Backpack, Shirt, Utensils, Clock, Trash2, BookOpen, Layers, Map, Microscope, 
  Smile, Star, Rocket, Music, Gamepad2, Coffee, Moon
};

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const { activities, addActivity, removeActivity, updateActivity, reorderActivities, phaseNames, updatePhaseName, language } = useApp();
  const [editingActivity, setEditingActivity] = useState<{phase: ActivityPhase, activity: Activity} | null>(null);
  const [newActivityPhase, setNewActivityPhase] = useState<ActivityPhase | null>(null);
  const [editingPhaseName, setEditingPhaseName] = useState<ActivityPhase | null>(null);
  
  // Form State
  const [labelEn, setLabelEn] = useState('');
  const [labelAf, setLabelAf] = useState('');
  const [iconName, setIconName] = useState('HelpCircle');
  const [hasTimer, setHasTimer] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30);

  // Phase Name Form State
  const [phaseNameEn, setPhaseNameEn] = useState('');
  const [phaseNameAf, setPhaseNameAf] = useState('');

  const openForm = (phase: ActivityPhase, activity?: Activity) => {
    if (activity) {
      setEditingActivity({ phase, activity });
      setLabelEn(activity.label.en);
      setLabelAf(activity.label.af || '');
      setIconName(activity.iconName);
      setHasTimer(!!activity.hasTimer);
      setTimerDuration(activity.timerDuration || 30);
    } else {
      setNewActivityPhase(phase);
      setLabelEn('');
      setLabelAf('');
      setIconName('Smile');
      setHasTimer(false);
      setTimerDuration(30);
    }
  };

  const openPhaseNameForm = (phase: ActivityPhase) => {
    setEditingPhaseName(phase);
    setPhaseNameEn(phaseNames[phase].en);
    setPhaseNameAf(phaseNames[phase].af);
  };

  const handlePhaseNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhaseName) {
      updatePhaseName(editingPhaseName, { en: phaseNameEn, af: phaseNameAf });
      setEditingPhaseName(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      label: { en: labelEn, af: labelAf },
      iconName,
      hasTimer,
      timerDuration: hasTimer ? timerDuration : undefined
    };

    if (editingActivity) {
      updateActivity(editingActivity.phase, editingActivity.activity.id, payload);
    } else if (newActivityPhase) {
      addActivity(newActivityPhase, payload);
    }
    
    setEditingActivity(null);
    setNewActivityPhase(null);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const phase = result.source.droppableId as ActivityPhase;
    reorderActivities(phase, result.source.index, result.destination.index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-panel w-full max-w-4xl h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col border border-white/20">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-[var(--bg-app)]">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-3xl font-black text-main tracking-tight">Admin Dashboard</h1>
              <p className="text-muted font-bold">Customize your kid's schedule</p>
            </div>
            <button 
                onClick={() => { if(confirm('Reset all progress for a new day?')) { useApp().resetProgress(); onClose(); } }}
                className="px-6 py-3 bg-[var(--status-inactive-bg)] text-[var(--accent-secondary)] rounded-2xl font-black text-sm hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-200"
            >
                🔄 Reset for New Day
            </button>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full transition-colors text-muted">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-12">
          <DragDropContext onDragEnd={onDragEnd}>
            {(['arrival', 'organization', 'study'] as ActivityPhase[]).map((phase) => (
              <div key={phase} className="space-y-4">
                <div className="flex justify-between items-end border-b-2 border-[var(--accent-primary)] pb-2">
                  <div>
                    <h2 className="text-2xl font-black text-main flex items-center gap-2">
                        {phaseNames[phase][language]}
                        <button onClick={() => openPhaseNameForm(phase)} className="p-1 hover:bg-white/50 rounded-md transition-colors">
                            <Edit2 size={16} className="text-muted" />
                        </button>
                    </h2>
                    <span className="text-xs uppercase font-black text-[var(--accent-primary)] tracking-widest">{phase}</span>
                  </div>
                  <button 
                    onClick={() => openForm(phase)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all text-sm shadow-md"
                  >
                    <Plus size={18} /> Add Task
                  </button>
                </div>

                <Droppable droppableId={phase}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activities[phase].map((activity, index) => {
                        const Icon = ICON_OPTIONS[activity.iconName] || HelpCircle;
                        return (
                          <Draggable key={activity.id} draggableId={activity.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="group bg-white p-4 rounded-2xl border border-[var(--bg-panel-border)] flex items-center justify-between hover:border-[var(--accent-primary)] transition-all shadow-sm"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="text-muted group-hover:text-main">
                                    <GripVertical size={20} />
                                  </div>
                                  <div className="bg-[var(--bg-app)] p-3 rounded-xl text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                                    <Icon size={24} />
                                  </div>
                                  <div>
                                    <p className="font-bold text-main leading-none mb-1">{activity.label[language]}</p>
                                    <div className="flex gap-2">
                                        <span className="text-[10px] bg-slate-100 px-1 rounded text-muted uppercase font-bold">{activity.id.slice(0, 4)}</span>
                                        {activity.hasTimer && <span className="text-[10px] bg-amber-50 text-amber-600 px-1 rounded font-bold">⏱️ {activity.timerDuration}m</span>}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button onClick={() => openForm(phase, activity)} className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors">
                                    <Edit2 size={18} />
                                  </button>
                                  <button onClick={() => removeActivity(phase, activity.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        </div>

        {/* Form Modal for Add/Edit Activity */}
        {(newActivityPhase || editingActivity) && (
          <div className="absolute inset-0 z-10 bg-[var(--bg-app)] p-8 overflow-y-auto animate-in slide-in-from-bottom duration-500">
            <div className="max-w-xl mx-auto space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-main">
                  {editingActivity ? 'Edit Task' : 'New Task'}
                </h2>
                <button onClick={() => { setEditingActivity(null); setNewActivityPhase(null); }} className="p-2 bg-white rounded-full shadow-sm text-muted">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-muted uppercase">Label (English)</label>
                    <input 
                      required
                      value={labelEn}
                      onChange={e => setLabelEn(e.target.value)}
                      className="w-full p-4 rounded-2xl bg-white border border-[var(--bg-panel-border)] focus:ring-2 ring-[var(--accent-primary)] outline-none font-bold"
                      placeholder="e.g. Brush Teeth"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-muted uppercase">Etiket (Afrikaans)</label>
                    <input 
                      value={labelAf}
                      onChange={e => setLabelAf(e.target.value)}
                      className="w-full p-4 rounded-2xl bg-white border border-[var(--bg-panel-border)] focus:ring-2 ring-[var(--accent-primary)] outline-none font-bold"
                      placeholder="bv. Borsel tande"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-black text-muted uppercase">Select Icon</label>
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                    {Object.entries(ICON_OPTIONS).map(([name, Icon]) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setIconName(name)}
                        className={cn(
                          "p-3 rounded-xl border-2 transition-all flex items-center justify-center",
                          iconName === name 
                            ? "bg-[var(--accent-primary)] text-white border-transparent scale-110 shadow-lg" 
                            : "bg-white border-[var(--bg-panel-border)] text-muted hover:border-[var(--accent-primary)]"
                        )}
                      >
                        <Icon size={24} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-[var(--bg-panel-border)] space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-main">Enable Timer</p>
                      <p className="text-xs text-muted font-bold">Add a countdown for this task</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setHasTimer(!hasTimer)}
                      className={cn(
                        "w-14 h-8 rounded-full p-1 transition-colors relative",
                        hasTimer ? "bg-[var(--accent-primary)]" : "bg-slate-200"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 bg-white rounded-full shadow-md transition-transform",
                        hasTimer ? "translate-x-6" : "translate-x-0"
                      )} />
                    </button>
                  </div>

                  {hasTimer && (
                    <div className="space-y-2 animate-in zoom-in-95 duration-200">
                      <label className="text-xs font-black text-muted uppercase">Duration (Minutes)</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" min="1" max="120" 
                          value={timerDuration}
                          onChange={e => setTimerDuration(parseInt(e.target.value))}
                          className="flex-1 accent-[var(--accent-primary)]"
                        />
                        <span className="text-2xl font-black text-[var(--accent-primary)] w-16">{timerDuration}m</span>
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full py-6 bg-[var(--accent-primary)] text-white rounded-[2rem] font-black text-2xl shadow-xl shadow-pink-200 transition-transform active:scale-95 flex items-center justify-center gap-3">
                  <Check size={32}/> {editingActivity ? 'Save Changes' : 'Create Task'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Phase Name Edit Modal */}
        {editingPhaseName && (
            <div className="absolute inset-0 z-10 bg-[var(--bg-app)]/95 backdrop-blur-md p-8 flex items-center justify-center animate-in fade-in duration-300">
                <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-md border-4 border-[var(--accent-primary)]">
                    <h2 className="text-2xl font-black text-main mb-6">Rename Group</h2>
                    <form onSubmit={handlePhaseNameSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-muted uppercase">English Name</label>
                            <input 
                                required
                                value={phaseNameEn}
                                onChange={e => setPhaseNameEn(e.target.value)}
                                className="w-full p-4 rounded-xl bg-slate-50 border border-[var(--bg-panel-border)] font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-muted uppercase">Afrikaanse Naam</label>
                            <input 
                                value={phaseNameAf}
                                onChange={e => setPhaseNameAf(e.target.value)}
                                className="w-full p-4 rounded-xl bg-slate-50 border border-[var(--bg-panel-border)] font-bold"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setEditingPhaseName(null)} className="flex-1 py-4 bg-slate-100 text-muted rounded-xl font-bold">Cancel</button>
                            <button type="submit" className="flex-[2] py-4 bg-[var(--accent-primary)] text-white rounded-xl font-bold shadow-lg">Save Name</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

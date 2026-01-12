import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { AppContextType, AppState, User, Activity, ActivityPhase, Theme } from '../types';
import { DEFAULT_ACTIVITIES, DEFAULT_PHASE_NAMES } from '../types';
import { translations } from '../i18n';

const STORAGE_KEY = 'grade4_schedule_state';

const initialState: AppState = {
  user: {
    name: '',
    language: 'af',
    theme: 'meisie',
    onboardingComplete: false,
  },
  activities: DEFAULT_ACTIVITIES,
  phaseNames: DEFAULT_PHASE_NAMES,
  completedTasks: [],
  theme: 'meisie',
  lastCompletedDate: new Date().toISOString().split('T')[0],
  lastInteraction: null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window === 'undefined') return initialState;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState;
    try {
      const parsed = JSON.parse(stored);
      // Migrations: ensure activities and phaseNames exist
      if (!parsed.activities) parsed.activities = DEFAULT_ACTIVITIES;
      if (!parsed.phaseNames) parsed.phaseNames = DEFAULT_PHASE_NAMES;

      // Daily reset check during initialization
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastCompletedDate !== today && parsed.user?.onboardingComplete) {
          parsed.completedTasks = [];
          parsed.lastCompletedDate = today;
          parsed.lastInteraction = null;
      }

      return { ...initialState, ...parsed }; 
    } catch (e) {
      console.error("Failed to parse local storage", e);
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state]);

  const setLanguage = (lang: 'af' | 'en') => {
    setState(prev => ({ ...prev, user: { ...prev.user, language: lang } }));
  };

  const setTheme = (theme: string) => {
    const t = theme as Theme;
    setState(prev => ({ 
        ...prev, 
        theme: t, 
        user: { ...prev.user, theme: t } 
    }));
  };

  const updateUser = (updates: Partial<User>) => {
    setState(prev => ({ ...prev, user: { ...prev.user, ...updates } }));
  };

  const toggleTask = (taskId: string) => {
    setState(prev => {
      const isCompleted = prev.completedTasks.includes(taskId);
      const newCompleted = isCompleted
        ? prev.completedTasks.filter(id => id !== taskId)
        : [...prev.completedTasks, taskId];
      return {
        ...prev,
        completedTasks: newCompleted,
        lastInteraction: taskId 
      };
    });
  };

  const resetProgress = () => {
    setState(prev => ({ ...prev, completedTasks: [], lastInteraction: null }));
  };

  const addActivity = (phase: ActivityPhase, activity: Omit<Activity, 'id'>) => {
    const newActivity = { ...activity, id: Math.random().toString(36).substr(2, 9) };
    setState(prev => ({
      ...prev,
      activities: {
        ...prev.activities,
        [phase]: [...prev.activities[phase], newActivity]
      }
    }));
  };

  const removeActivity = (phase: ActivityPhase, activityId: string) => {
    setState(prev => ({
      ...prev,
      activities: {
        ...prev.activities,
        [phase]: prev.activities[phase].filter(a => a.id !== activityId)
      },
      completedTasks: prev.completedTasks.filter(id => id !== activityId)
    }));
  };

  const updateActivity = (phase: ActivityPhase, activityId: string, updates: Partial<Activity>) => {
    setState(prev => ({
      ...prev,
      activities: {
        ...prev.activities,
        [phase]: prev.activities[phase].map(a => a.id === activityId ? { ...a, ...updates } : a)
      }
    }));
  };

  const reorderActivities = (phase: ActivityPhase, startIndex: number, endIndex: number) => {
    setState(prev => {
      const result = Array.from(prev.activities[phase]);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return {
        ...prev,
        activities: {
          ...prev.activities,
          [phase]: result
        }
      };
    });
  };

  const updatePhaseName = (phase: ActivityPhase, name: { af: string; en: string }) => {
    setState(prev => ({
      ...prev,
      phaseNames: {
        ...prev.phaseNames,
        [phase]: name
      }
    }));
  };

  const t = (key: string) => {
    const currentLanguage = state.user.language as 'af' | 'en';
    const dict = translations as Record<'en' | 'af', Record<string, string | Record<string, string>>>;
    
    // Check if key is a phase name or subject name first
    // We can also check nested translations logic here
    if (key.includes('.')) {
        const [parent, child] = key.split('.');
        const parentDict = dict[currentLanguage]?.[parent] as Record<string, string> | undefined;
        const result = parentDict?.[child];
        if (result) return result;
    }
    
    return (dict[currentLanguage]?.[key] as string) || key;
  };

  return (
    <AppContext.Provider value={{
      user: state.user,
      language: (state.user.language as 'af' | 'en') || 'en',
      theme: state.theme,
      activities: state.activities,
      phaseNames: state.phaseNames,
      completedTasks: state.completedTasks,
      lastInteraction: state.lastInteraction || null,
      setLanguage,
      setTheme,
      updateUser,
      toggleTask,
      resetProgress,
      addActivity,
      removeActivity,
      updateActivity,
      reorderActivities,
      updatePhaseName,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

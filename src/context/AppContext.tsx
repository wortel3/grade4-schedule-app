import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Language, Theme, User } from '../types';
import { INITIAL_USER } from '../types';
import { translations } from '../i18n';

interface AppContextType {
  user: User;
  completedTasks: string[];
  updateUser: (user: Partial<User>) => void;
  toggleTask: (taskId: string) => void;
  resetProgress: () => void;
  t: (key: string) => string;
  theme: Theme;
  language: Language;
  lastInteraction: string | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'slimkop-app-data';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    let initialState: AppState = {
        user: INITIAL_USER,
        completedTasks: [],
        lastCompletedDate: new Date().toISOString().split('T')[0],
        lastInteraction: null
      };

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        initialState = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }

    // Daily reset check during initialization
    const today = new Date().toISOString().split('T')[0];
    if (initialState.lastCompletedDate !== today && initialState.user.onboardingComplete) {
        initialState = {
            ...initialState,
            completedTasks: [],
            lastCompletedDate: today,
            lastInteraction: null
        };
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateUser = (updates: Partial<User>) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, ...updates }
    }));
  };

  const toggleTask = (taskId: string) => {
    setState(prev => {
      const isCompleted = prev.completedTasks.includes(taskId);
      const newTasks = isCompleted
        ? prev.completedTasks.filter(id => id !== taskId)
        : [...prev.completedTasks, taskId];
      
      // Update last interaction ONLY if we are completing it (optional choice, acts as "focus")
      // Or just always update it so the board knows what we touched.
      return { 
          ...prev, 
          completedTasks: newTasks,
          lastInteraction: taskId 
      };
    });
  };

  const resetProgress = () => {
    setState(prev => ({ ...prev, completedTasks: [], lastInteraction: null }));
  };

  // Helper for translation
  const t = (path: string): string => {
    const langIdx = state.user.language; 
    const dict = translations[langIdx];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const safeDict = dict as any;

    if (path.includes('.')) {
        const [parent, child] = path.split('.');
        return safeDict[parent]?.[child] || path;
    }
    return safeDict[path] || path;
  };

  return (
    <AppContext.Provider value={{
      user: state.user,
      completedTasks: state.completedTasks,
      updateUser,
      toggleTask,
      resetProgress,
      t,
      theme: state.user.theme,
      language: state.user.language,
      lastInteraction: state.lastInteraction || null
    }}>
      {children}
    </AppContext.Provider>
  );
}

export interface User {
  name: string;
  theme: 'meisie' | 'seun';
  language: 'af' | 'en';
  onboardingComplete: boolean;
  isAdmin?: boolean;
}

export type Theme = 'meisie' | 'seun';

export interface Activity {
  id: string;
  iconName: string; // Store lucide icon name as string
  label: {
    af: string;
    en: string;
  };
  hasTimer?: boolean;
  timerDuration?: number; // in minutes
}

export type ActivityPhase = 'arrival' | 'organization' | 'study';

export interface AppState {
  user: User;
  activities: Record<ActivityPhase, Activity[]>;
  phaseNames: Record<ActivityPhase, { af: string; en: string }>;
  completedTasks: string[];
  theme: string;
  lastCompletedDate: string;
  lastInteraction: string | null;
}

export interface AppContextType {
  user: User;
  language: 'af' | 'en';
  theme: string;
  activities: Record<ActivityPhase, Activity[]>;
  phaseNames: Record<ActivityPhase, { af: string; en: string }>;
  completedTasks: string[];
  lastInteraction: string | null;
  setLanguage: (lang: 'af' | 'en') => void;
  setTheme: (theme: string) => void;
  updateUser: (updates: Partial<User>) => void;
  toggleTask: (taskId: string) => void;
  resetProgress: () => void;
  addActivity: (phase: ActivityPhase, activity: Omit<Activity, 'id'>) => void;
  removeActivity: (phase: ActivityPhase, activityId: string) => void;
  updateActivity: (phase: ActivityPhase, activityId: string, updates: Partial<Activity>) => void;
  reorderActivities: (phase: ActivityPhase, startIndex: number, endIndex: number) => void;
  updatePhaseName: (phase: ActivityPhase, name: { af: string; en: string }) => void;
  t: (key: string) => string;
}

export const DEFAULT_PHASE_NAMES: Record<ActivityPhase, { af: string; en: string }> = {
  arrival: { en: 'Arrival Routine', af: 'Aankoms Roetine' },
  organization: { en: 'Organization', af: 'Organisasie' },
  study: { en: 'Study Session', af: 'Studie Sessie' }
};

export const INITIAL_USER: User = {
  name: '',
  language: 'af',
  theme: 'meisie',
  onboardingComplete: false
};

export const DEFAULT_ACTIVITIES: Record<ActivityPhase, Activity[]> = {
  arrival: [
    { id: 'unpack', iconName: 'Backpack', label: { en: 'Unpack Bag', af: 'Pak Tas Uit' } },
    { id: 'clothes', iconName: 'Shirt', label: { en: 'School Clothes', af: 'Skoolklere' } },
    { id: 'lunch', iconName: 'Utensils', label: { en: 'Lunch Box', af: 'Kosblik' } },
    { id: 'rest', iconName: 'Clock', label: { en: 'Rest for 30 mins', af: 'Rus vir 30 min' }, hasTimer: true, timerDuration: 30 },
    { id: 'trash', iconName: 'Trash2', label: { en: 'Empty Trash', af: 'Maak asblik leeg' } },
  ],
  organization: [
    { id: 'homework_sorted', iconName: 'Layers', label: { en: 'Sort Homework', af: 'Sorteer Huiswerk' } }
  ],
  study: [
    { id: 'math', iconName: 'BookOpen', label: { en: 'Math', af: 'Wiskunde' } },
    { id: 'science', iconName: 'Microscope', label: { en: 'Science', af: 'Wetenskap' } },
    { id: 'social', iconName: 'Map', label: { en: 'Social Sciences', af: 'Sosiale Wetenskappe' } },
    { id: 'language', iconName: 'Layers', label: { en: 'Languages', af: 'Tale' } }
  ]
};

export type Language = 'af' | 'en';
export type Theme = 'meisie' | 'seun';

export interface User {
  name: string;
  theme: Theme;
  language: Language;
  onboardingComplete: boolean;
}

export interface AppState {
  user: User;
  completedTasks: string[];
  lastCompletedDate: string; // YYYY-MM-DD
  lastInteraction?: string | null; // ID of the last task interacted with
}

export const INITIAL_USER: User = {
  name: '',
  theme: 'meisie', // Default
  language: 'af', // Default
  onboardingComplete: false,
};

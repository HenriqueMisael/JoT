import { create } from 'zustand';

interface AppState {
  example: string;
  setExample: (value: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  example: '',
  setExample: (value) => set({ example: value }),
}));

// Language state with persistence
export type Language = 'en' | 'pt-BR' | 'fr-CA';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem('language');
  return (stored as Language) || 'en';
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    localStorage.setItem('language', language);
    set({ language });
  },
})); 
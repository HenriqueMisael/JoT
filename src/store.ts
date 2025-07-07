import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Card } from './data/cards';
import { PREDEFINED_CARDS } from './data/cards';

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

export type Jelly = {
  id: string;
  body: number;
  reflexes: number;
  skill: number;
  cards: string[];
};

interface JellyState {
  jellies: Jelly[];
  addJelly: (jelly: Jelly) => void;
  updateJelly: (jelly: Jelly) => void;
  removeJelly: (id: string) => void;
  addRandomJelly: () => void;
}

export const useJellyStore = create<JellyState>()(
  persist(
    (set, get) => ({
      jellies: [],
      addJelly: (jelly) => set(state => ({ jellies: [...state.jellies, jelly] })),
      updateJelly: (jelly) => set(state => ({
        jellies: state.jellies.map(j => (j.id === jelly.id ? jelly : j)),
      })),
      removeJelly: (id) => set(state => ({
        jellies: state.jellies.filter(j => j.id !== id),
      })),
      addRandomJelly: () => set(state => {
        // Randomly distribute 18 points among 3 attributes (min 1 each, max 10)
        let points = 18;
        let body = 1 + Math.floor(Math.random() * (Math.min(10, points - 2)));
        points -= body;
        let reflexes = 1 + Math.floor(Math.random() * (Math.min(10, points - 1)));
        points -= reflexes;
        let skill = points;
        if (skill > 10) {
          skill = 10;
          reflexes = Math.min(reflexes, 10);
          body = Math.min(body, 10);
        }
        // Shuffle and pick 4 random cards
        const cardIds = PREDEFINED_CARDS.map(c => c.id);
        for (let i = cardIds.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cardIds[i], cardIds[j]] = [cardIds[j], cardIds[i]];
        }
        const jelly = {
          id: Math.random().toString(36).slice(2, 10),
          body,
          reflexes,
          skill,
          cards: cardIds.slice(0, 4),
        };
        return { jellies: [...state.jellies, jelly] };
      }),
    }),
    {
      name: 'jellies',
      partialize: (state) => ({ jellies: state.jellies }),
    }
  )
); 
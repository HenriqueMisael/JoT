import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateRandomJellyAttributesAndCards } from './jellyUtils';

export type Jelly = {
  id: string;
  name: string;
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

const useJellyStore = create<JellyState>()(
  persist(
    (set) => ({
      jellies: [],
      addJelly: (jelly) => set(state => ({ jellies: [...state.jellies, jelly] })),
      updateJelly: (jelly) => set(state => ({
        jellies: state.jellies.map(j => (j.id === jelly.id ? jelly : j)),
      })),
      removeJelly: (id) => set(state => ({
        jellies: state.jellies.filter(j => j.id !== id),
      })),
      addRandomJelly: () => set(state => {
        const attrs = generateRandomJellyAttributesAndCards();
        const jelly = {
          id: Math.random().toString(36).slice(2, 10),
          name: `Jelly #${state.jellies.length + 1}`,
          ...attrs,
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

export { useJellyStore }; 
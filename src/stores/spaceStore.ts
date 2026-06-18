import { create } from 'zustand';

interface SpaceState {
  currentSpace: 'life' | 'office';
  switchSpace: (space: 'life' | 'office') => void;
}

export const useSpaceStore = create<SpaceState>((set) => ({
  currentSpace: 'life',
  switchSpace: (space) => set({ currentSpace: space }),
}));
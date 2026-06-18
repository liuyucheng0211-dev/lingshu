import { create } from 'zustand';
import type { SearchResponse, SearchResult } from '@/data/mockSearchResults';
import { getSearchResults } from '@/data/mockSearchResults';

interface SearchState {
  isOpen: boolean;
  query: string;
  scope: 'current' | 'life' | 'office' | 'all' | 'important';
  results: SearchResponse | null;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (q: string) => void;
  setScope: (s: 'current' | 'life' | 'office' | 'all' | 'important') => void;
  search: (q?: string) => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  isOpen: false,
  query: '',
  scope: 'current',
  results: null,
  openSearch: () => set({ isOpen: true, results: null, query: '' }),
  closeSearch: () => set({ isOpen: false, results: null, query: '' }),
  setQuery: (q) => set({ query: q }),
  setScope: (s) => set({ scope: s }),
  search: (q) => {
    const query = q ?? get().query;
    const results = getSearchResults(query);
    set({ query, results });
  },
}));
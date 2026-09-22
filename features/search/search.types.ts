import { SareeProduct } from '@/features/collections/components/hanging-card.types';

export interface SearchState {
  isOpen: boolean;
  query: string;
  results: SareeProduct[];
  isLoading: boolean;
  hasSearched: boolean;
}

export interface SearchContextType {
  isOpen: boolean;
  query: string;
  results: SareeProduct[];
  isLoading: boolean;
  hasSearched: boolean;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

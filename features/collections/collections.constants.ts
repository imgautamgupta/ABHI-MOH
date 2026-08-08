import { SortOption } from './collections.types';

export const COLLECTIONS_COPY = {
  title: 'Collections',
  subtitle: 'Curated Sarees For Every Celebration',
  resultCount: 'Showing 24 Pieces',
  sortByDefault: 'Sort By',
};

export const SORT_OPTIONS: SortOption[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price Low to High' },
  { id: 'price-desc', label: 'Price High to Low' },
  { id: 'wedding', label: 'Wedding Collection' },
  { id: 'festive', label: 'Festive Collection' },
  { id: 'handpicked', label: 'Handpicked' },
  { id: 'best-selling', label: 'Best Selling' },
  { id: 'alphabetical', label: 'Alphabetical' },
];

export const PLACEHOLDER_ITEMS_COUNT = 12;

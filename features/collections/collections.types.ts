export interface SortOption {
  id: string;
  label: string;
}
// Existing types...

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency: string;
  image?: string;
  inStock: boolean;
  productOptions?: {
    name: string;
    choices: {
      value: string;
      inStock: boolean;
    }[];
  }[];
}
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  source: string;
  url: string;
  imageUrl: string;
  category: Category;
  publishedAt: string;
  trending: boolean;
}

export type Category = 
  | 'technology' 
  | 'business' 
  | 'entertainment' 
  | 'health' 
  | 'science' 
  | 'sports' 
  | 'politics';

export interface UserPreferences {
  darkMode: boolean;
  preferredCategories: Category[];
}
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article, Category } from '../types';
import { mockArticles, categories } from '../utils/mockData';

interface NewsContextType {
  articles: Article[];
  filteredArticles: Article[];
  categories: Category[];
  selectedCategory: Category | null;
  searchQuery: string;
  loading: boolean;
  setSelectedCategory: (category: Category | null) => void;
  setSearchQuery: (query: string) => void;
  getArticleById: (id: string) => Article | undefined;
  getTrendingArticles: () => Article[];
  getLatestArticles: () => Article[];
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Initialize with mock data
  useEffect(() => {
    // Simulate API loading
    const fetchArticles = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  // Filter articles when category or search query changes
  useEffect(() => {
    let result = articles;

    if (selectedCategory) {
      result = result.filter(article => article.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(result);
  }, [selectedCategory, searchQuery, articles]);

  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
  };

  const getTrendingArticles = () => {
    return articles.filter(article => article.trending);
  };

  const getLatestArticles = () => {
    return [...articles].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ).slice(0, 5);
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        filteredArticles,
        categories,
        selectedCategory,
        searchQuery,
        loading,
        setSelectedCategory,
        setSearchQuery,
        getArticleById,
        getTrendingArticles,
        getLatestArticles,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
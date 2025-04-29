import React from 'react';
import { Article } from '../types';
import NewsCard from './NewsCard';

interface NewsGridProps {
  articles: Article[];
  loading?: boolean;
  emptyMessage?: string;
}

const NewsGrid: React.FC<NewsGridProps> = ({ 
  articles, 
  loading = false,
  emptyMessage = 'No articles found.'
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md h-96 animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="flex justify-between pt-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 text-gray-500 dark:text-gray-400 animate-fadeIn">
        <p className="text-center text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <div
          key={article.id}
          className="animate-scaleIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <NewsCard article={article} />
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
import React from 'react';
import { useNews } from '../context/NewsContext';
import { Category } from '../types';

const CategoryFilter: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useNews();

  const getCategoryColor = (category: Category): string => {
    const colors: Record<Category, string> = {
      technology: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200',
      business: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200',
      entertainment: 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200',
      health: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200',
      science: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200',
      sports: 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200',
      politics: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200'
    };
    
    return colors[category];
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
        }`}
      >
        All
      </button>

      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
            selectedCategory === category
              ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400'
              : ''
          } ${getCategoryColor(category)}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
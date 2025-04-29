import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import CategoryFilter from '../components/CategoryFilter';
import NewsGrid from '../components/NewsGrid';

const CategoryPage: React.FC = () => {
  const location = useLocation();
  const { filteredArticles, loading, setSelectedCategory } = useNews();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      setSelectedCategory(category as any);
    }
  }, [location.search, setSelectedCategory]);

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
      
      <section className="mb-8">
        <CategoryFilter />
      </section>
      
      <NewsGrid 
        articles={filteredArticles}
        loading={loading}
        emptyMessage="No articles found in this category."
      />
    </div>
  );
};

export default CategoryPage;
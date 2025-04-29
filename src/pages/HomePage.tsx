import React, { useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import FeaturedArticle from '../components/FeaturedArticle';
import NewsCard from '../components/NewsCard';
import NewsGrid from '../components/NewsGrid';
import CategoryFilter from '../components/CategoryFilter';

const HomePage: React.FC = () => {
  const { 
    articles, 
    filteredArticles, 
    loading, 
    selectedCategory, 
    setSelectedCategory,
    getTrendingArticles, 
    getLatestArticles 
  } = useNews();

  // Reset category filter when navigating to home
  useEffect(() => {
    setSelectedCategory(null);
  }, [setSelectedCategory]);

  const trendingArticles = getTrendingArticles();
  const latestArticles = getLatestArticles();
  const featuredArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div className="flex flex-col space-y-12">
      {/* Featured Article */}
      {!loading && featuredArticle && (
        <section className="w-full">
          <FeaturedArticle article={featuredArticle} />
        </section>
      )}

      {/* Category Filter */}
      <section>
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse by Category</h2>
          <CategoryFilter />
        </div>
      </section>

      {/* Trending Articles */}
      {!selectedCategory && trendingArticles.length > 0 && (
        <section>
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">View All</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingArticles.slice(0, 3).map(article => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {!selectedCategory && (
        <section>
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest News</h2>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">View All</a>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {latestArticles.slice(0, 3).map(article => (
                <NewsCard key={article.id} article={article} variant="small" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles or Filtered by Category */}
      <section>
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedCategory 
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News` 
              : 'All News'
            }
          </h2>
          
          <NewsGrid 
            articles={filteredArticles}
            loading={loading}
            emptyMessage={selectedCategory 
              ? `No articles found in the ${selectedCategory} category.` 
              : 'No articles found.'
            }
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
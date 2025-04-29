import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import NewsGrid from '../components/NewsGrid';
import SearchBar from '../components/SearchBar';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const { filteredArticles, loading, setSearchQuery } = useNews();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search, setSearchQuery]);

  const query = new URLSearchParams(location.search).get('q') || '';

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Search Results</h1>
      
      <div className="mb-8">
        <SearchBar />
      </div>
      
      {query && (
        <p className="text-gray-600 dark:text-gray-400">
          Showing results for "<span className="font-medium">{query}</span>"
          {filteredArticles.length > 0 && (
            <span className="ml-1">
              - {filteredArticles.length} {filteredArticles.length === 1 ? 'result' : 'results'} found
            </span>
          )}
        </p>
      )}
      
      <NewsGrid 
        articles={filteredArticles}
        loading={loading}
        emptyMessage={`No results found for "${query}". Try different keywords.`}
      />
    </div>
  );
};

export default SearchResultsPage;
import React from 'react';
import { useNews } from '../context/NewsContext';
import { useUser } from '../context/UserContext';
import NewsGrid from '../components/NewsGrid';
import { Bookmark } from 'lucide-react';

const BookmarksPage: React.FC = () => {
  const { articles } = useNews();
  const { bookmarks } = useUser();
  
  const bookmarkedArticles = articles.filter(article => 
    bookmarks.includes(article.id)
  );

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center space-x-3">
        <Bookmark className="text-blue-600 dark:text-blue-400" size={28} />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Bookmarks</h1>
      </div>
      
      {bookmarkedArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
            <Bookmark className="text-gray-400 dark:text-gray-500" size={40} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No bookmarks yet</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Save your favorite articles by clicking the bookmark icon to access them later.
          </p>
        </div>
      ) : (
        <NewsGrid 
          articles={bookmarkedArticles}
          emptyMessage="You don't have any bookmarked articles yet."
        />
      )}
    </div>
  );
};

export default BookmarksPage;
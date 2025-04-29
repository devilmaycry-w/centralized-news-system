import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Share2, BookmarkCheck, TrendingUp } from 'lucide-react';
import { Article } from '../types';
import { useUser } from '../context/UserContext';

interface NewsCardProps {
  article: Article;
  variant?: 'small' | 'medium' | 'large';
}

const NewsCard: React.FC<NewsCardProps> = ({ article, variant = 'medium' }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useUser();
  const bookmarked = isBookmarked(article.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article.id);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: `/article/${article.id}`,
        });
      } catch (error) {
        console.log('Sharing failed', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
      alert('Link copied to clipboard!');
    }
  };

  // Define card styles based on variant
  const getCardStyles = () => {
    switch (variant) {
      case 'small':
        return 'flex flex-row h-32';
      case 'large':
        return 'flex flex-col h-auto';
      case 'medium':
      default:
        return 'flex flex-col h-96';
    }
  };

  return (
    <Link 
      to={`/article/${article.id}`}
      className={`group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all ${getCardStyles()}`}
    >
      <div 
        className={`relative ${
          variant === 'small' ? 'w-1/3' : 
          variant === 'large' ? 'w-full h-80' : 'w-full h-48'
        } overflow-hidden`}
      >
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {article.trending && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <TrendingUp size={12} className="mr-1" />
            <span>Trending</span>
          </div>
        )}
      </div>
      
      <div className={`flex flex-col ${variant === 'small' ? 'w-2/3 p-3' : 'p-4'} flex-grow`}>
        <div className="flex items-center mb-2">
          <span className="text-xs uppercase font-semibold text-blue-600 dark:text-blue-400 mr-2">{article.category}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(article.publishedAt)}</span>
        </div>
        
        <h3 className={`font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
          variant === 'small' ? 'text-sm line-clamp-2' : 
          variant === 'large' ? 'text-2xl mb-2' : 'text-lg mb-2'
        }`}>
          {article.title}
        </h3>
        
        {variant !== 'small' && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow line-clamp-3">
            {article.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm text-gray-500 dark:text-gray-400">{article.source}</span>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleBookmarkToggle}
              className={`p-1.5 rounded-full ${
                bookmarked 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400'
              } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
              aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
            
            <button 
              onClick={handleShare}
              className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Share article"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
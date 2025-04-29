import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Share2, TrendingUp } from 'lucide-react';
import { Article } from '../types';
import { useUser } from '../context/UserContext';

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
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
      navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Link
      to={`/article/${article.id}`}
      className="group relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg animate-scaleIn"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-10"></div>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-3 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium uppercase">
            {article.category}
          </span>
          {article.trending && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <TrendingUp size={14} className="mr-1" />
              Trending
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors animate-slideUp" style={{ animationDelay: '0.3s' }}>
          {article.title}
        </h2>

        <p className="text-gray-200 mb-4 max-w-3xl line-clamp-3 animate-slideUp" style={{ animationDelay: '0.4s' }}>
          {article.description}
        </p>

        <div className="flex items-center justify-between animate-slideUp" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center text-white">
            <span className="text-sm mr-3">{formatDate(article.publishedAt)}</span>
            <span className="text-sm font-medium">{article.source}</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleBookmarkToggle}
              className={`p-2 rounded-full ${
                bookmarked 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              } backdrop-blur-sm transition-all transform hover:scale-105`}
              aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all transform hover:scale-105"
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

export default FeaturedArticle;
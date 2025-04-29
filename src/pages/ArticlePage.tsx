import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useUser } from '../context/UserContext';
import { Bookmark, BookmarkCheck, Share2, ArrowLeft, Calendar, User } from 'lucide-react';
import NewsCard from '../components/NewsCard';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getArticleById, articles } = useNews();
  const { isBookmarked, addBookmark, removeBookmark } = useUser();
  const [relatedArticles, setRelatedArticles] = useState([]);
  
  const article = id ? getArticleById(id) : undefined;
  const bookmarked = article ? isBookmarked(article.id) : false;

  useEffect(() => {
    // Scroll to top when article changes
    window.scrollTo(0, 0);
    
    // Find related articles (same category, excluding current)
    if (article) {
      const related = articles
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [article, articles]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleBookmarkToggle = () => {
    if (!article) return;
    
    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article.id);
    }
  };

  const handleShare = async () => {
    if (!article) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing failed', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Article not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  // Split content into paragraphs
  const paragraphs = article.content.split('\n\n');

  return (
    <article className="flex flex-col space-y-10">
      {/* Back button */}
      <div>
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
          <ArrowLeft size={18} className="mr-1" />
          Back to Articles
        </Link>
      </div>

      {/* Article header */}
      <header className="flex flex-col space-y-6">
        <div className="flex items-center space-x-3">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium capitalize">
            {article.category}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {article.source}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          {article.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {article.description}
        </p>

        <div className="flex flex-wrap justify-between items-center py-4 border-y border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-6 mb-3 sm:mb-0">
            <div className="flex items-center space-x-2">
              <User size={18} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={18} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleBookmarkToggle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                bookmarked
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              } transition-colors`}
              aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck size={18} />
                  <span>Bookmarked</span>
                </>
              ) : (
                <>
                  <Bookmark size={18} />
                  <span>Bookmark</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Share article"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto w-full">
        <div className="prose prose-lg dark:prose-invert prose-blue prose-img:rounded-lg prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Article Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <span className="text-gray-600 dark:text-gray-400">Source:</span>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {article.source}
          </a>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleBookmarkToggle}
            className={`p-2 rounded-full ${
              bookmarked 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            } transition-colors`}
            aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Share article"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ArticlePage;
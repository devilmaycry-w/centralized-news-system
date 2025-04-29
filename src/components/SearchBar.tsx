import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const { setSearchQuery } = useNews();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
      if (onClose) {
        onClose();
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="w-full flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden transition-all focus-within:ring-2 focus-within:ring-blue-500"
    >
      <div className="flex items-center flex-1 px-4">
        <Search size={20} className="text-gray-500 dark:text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news..."
          className="w-full p-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500"
          aria-label="Search for news"
        />
        {query && (
          <button 
            type="button" 
            onClick={handleClear}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        disabled={!query.trim()}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
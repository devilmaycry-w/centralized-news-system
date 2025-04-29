import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bookmark, Moon, Sun, Menu, X } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { useUser } from '../context/UserContext';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const { setSearchQuery } = useNews();
  const { preferences, toggleDarkMode } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
    // Reset search on route change
    setShowSearch(false);
    setSearchQuery('');
  }, [location.pathname, setSearchQuery]);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      // Clear search when closing
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center"
            >
              <span className="mr-2">NewsFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link to="/categories" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              Categories
            </Link>
            <Link to="/bookmarks" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              Bookmarks
            </Link>
          </nav>

          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link 
              to="/bookmarks"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              aria-label="Bookmarks"
            >
              <Bookmark size={20} />
            </Link>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              aria-label={preferences.darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {preferences.darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="pb-4 animate-fadeIn">
            <SearchBar onClose={toggleSearch} />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-slideDown">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/bookmarks" 
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bookmarks
            </Link>

            <div className="flex items-center space-x-4 pt-2 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => { toggleSearch(); setMobileMenuOpen(false); }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                aria-label={preferences.darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {preferences.darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
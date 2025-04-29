import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage';
import BookmarksPage from './pages/BookmarksPage';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <NewsProvider>
      <UserProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <main className="flex-grow pt-24 pb-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/categories" element={<CategoryPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/article/:id" element={<ArticlePage />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </NewsProvider>
  );
}

export default App;
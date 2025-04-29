import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Category, UserPreferences } from '../types';

interface UserContextType {
  bookmarks: string[];
  preferences: UserPreferences;
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  toggleDarkMode: () => void;
  togglePreferredCategory: (category: Category) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const DEFAULT_PREFERENCES: UserPreferences = {
  darkMode: false,
  preferredCategories: ['technology', 'business'],
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  // Load bookmarks and preferences from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('newsBookmarks');
    const savedPreferences = localStorage.getItem('newsPreferences');

    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('newsBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('newsPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const addBookmark = (id: string) => {
    setBookmarks(prev => [...prev, id]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmarkId => bookmarkId !== id));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.includes(id);
  };

  const toggleDarkMode = () => {
    setPreferences(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };

  const togglePreferredCategory = (category: Category) => {
    setPreferences(prev => {
      const isAlreadyPreferred = prev.preferredCategories.includes(category);
      
      if (isAlreadyPreferred) {
        return {
          ...prev,
          preferredCategories: prev.preferredCategories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          preferredCategories: [...prev.preferredCategories, category]
        };
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        bookmarks,
        preferences,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleDarkMode,
        togglePreferredCategory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
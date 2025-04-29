import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Mail, Github, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              <Newspaper className="mr-2" size={24} />
              <span>NewsFlow</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your source for the latest news and information from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories?category=technology" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/categories?category=business" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/categories?category=entertainment" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Entertainment
                </Link>
              </li>
              <li>
                <Link to="/categories?category=science" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Science
                </Link>
              </li>
              <li>
                <Link to="/categories?category=sports" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Bookmarks
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for weekly updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} NewsFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
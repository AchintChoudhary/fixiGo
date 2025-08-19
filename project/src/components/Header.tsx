import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FD</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">FoodDash</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-orange-500 transition-colors">Home</a>
            <a href="#restaurants" className="text-gray-700 hover:text-orange-500 transition-colors">Restaurants</a>
            <a href="#categories" className="text-gray-700 hover:text-orange-500 transition-colors">Categories</a>
            <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors">About</a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search restaurants..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="hidden md:flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors">Home</a>
              <a href="#restaurants" className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors">Restaurants</a>
              <a href="#categories" className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors">Categories</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors">About</a>
              <div className="px-3 py-2">
                <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
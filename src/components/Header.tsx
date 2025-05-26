import React from 'react';
import { Compass } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 md:p-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">TravelAI</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-blue-200 transition-colors duration-200">How It Works</a>
          <a href="#" className="hover:text-blue-200 transition-colors duration-200">Examples</a>
          <a href="#" className="hover:text-blue-200 transition-colors duration-200">About</a>
        </div>
        <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200">
          Feedback
        </button>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface DirectQueryInputProps {
  onSubmit: (query: string) => void;
}

const DirectQueryInput: React.FC<DirectQueryInputProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setQuery('');
    }
  };

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Or ask a direct question</h3>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="E.g., What are the best beaches in Bali?"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          disabled={!query.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default DirectQueryInput;
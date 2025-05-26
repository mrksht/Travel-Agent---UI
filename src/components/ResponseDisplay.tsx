import React from 'react';
import { Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResponseItem {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ResponseDisplayProps {
  responses: ResponseItem[];
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ responses }) => {
  if (responses.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Travel Recommendations</h2>
      
      <div className="space-y-8">
        {responses.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl"
          >
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{item.query}</h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {item.isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-600">Generating recommendations...</span>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <ReactMarkdown
                    components={{
                      h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3" {...props} />,
                      h4: ({node, ...props}) => <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="mb-4 list-disc pl-5" {...props} />,
                      li: ({node, ...props}) => <li className="mb-2 text-gray-700" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-gray-800" {...props} />,
                    }}
                  >
                    {item.response}
                  </ReactMarkdown>
                </div>
              )}
            </div>
            
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
                Save
              </button>
              <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Refine
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseDisplay;
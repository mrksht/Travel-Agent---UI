import React, { useState } from 'react';
import Header from './components/Header';
import TripForm from './components/TripForm';
import DirectQueryInput from './components/DirectQueryInput';
import ResponseDisplay from './components/ResponseDisplay';
import Footer from './components/Footer';
import { generateId } from './utils/helpers';
import { ResponseItem, TripFormData } from './types';
import { queryAgent } from './services/travelAgentService';
import { Loader } from 'lucide-react';

function App() {
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (_formData: TripFormData, query: string) => {
    // Create a new response item with loading state
    const responseId = generateId();
    const newResponse: ResponseItem = {
      id: responseId,
      query,
      response: '',
      timestamp: new Date(),
      isLoading: true
    };

    setResponses(prev => [newResponse, ...prev]);
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await queryAgent({ message: query, threadId: 1 });

      // Update the response with the AI's text
      if (aiResponse) {
        setResponses(prev =>
          prev.map(item =>
            item.id === responseId
              ? { ...item, response: aiResponse.text, isLoading: false }
              : item
          )
        );
      } else {
        setResponses(prev =>
          prev.map(item =>
            item.id === responseId
              ? { ...item, response: 'Sorry, there was an error processing your request. Please try again.', isLoading: false }
              : item
          )
        );
      }
    } catch (error) {
      // Handle error
      setResponses(prev =>
        prev.map(item =>
          item.id === responseId
            ? { ...item, response: 'Sorry, there was an error processing your request. Please try again.', isLoading: false }
            : item
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectQuery = async (query: string) => {
    // Use the same handler as form submit but with direct query
    const responseId = generateId();
    const newResponse: ResponseItem = {
      id: responseId,
      query,
      response: '',
      timestamp: new Date(),
      isLoading: true
    };

    setResponses(prev => [newResponse, ...prev]);
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await queryAgent({ message: query, threadId: 1 });

      // Update the response with the AI's text
      if (aiResponse) {
        setResponses(prev =>
          prev.map(item =>
            item.id === responseId
              ? { ...item, response: aiResponse.text, isLoading: false }
              : item
          )
        );
      } else {
        setResponses(prev =>
          prev.map(item =>
            item.id === responseId
              ? { ...item, response: 'Sorry, there was an error processing your request. Please try again.', isLoading: false }
              : item
          )
        );
      }
    } catch (error) {
      // Handle error
      setResponses(prev =>
        prev.map(item =>
          item.id === responseId
            ? { ...item, response: 'Sorry, there was an error processing your request. Please try again.', isLoading: false }
            : item
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    <Loader className="animate-spin h-8 w-8 text-blue-500" />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your AI Travel Assistant</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plan your perfect trip with personalized recommendations from our AI travel agent.
          </p>
        </section>

        <section className="mb-12">
          <TripForm onSubmit={handleFormSubmit} />
          <DirectQueryInput onSubmit={handleDirectQuery} />
        </section>

        <section>
          <ResponseDisplay responses={responses} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;


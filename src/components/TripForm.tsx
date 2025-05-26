import React, { useState } from 'react';
import { Calendar, Users, Compass, DollarSign, Heart, Clock } from 'lucide-react';

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  interests: string[];
  additionalInfo: string;
}

interface TripFormProps {
  onSubmit: (formData: FormData, query: string) => void;
}

const interestOptions = [
  'Beach', 'Mountains', 'City', 'Culture', 'Food', 'Adventure', 
  'Relaxation', 'Nature', 'History', 'Shopping', 'Nightlife'
];

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 'Medium',
    interests: [],
    additionalInfo: '',
  });

  const [formStep, setFormStep] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const generateQuery = (data: FormData): string => {
    let query = `I'm planning a trip to ${data.destination}`;
    
    if (data.startDate && data.endDate) {
      query += ` from ${data.startDate} to ${data.endDate}`;
    }
    
    query += ` for ${data.travelers} ${data.travelers === 1 ? 'person' : 'people'}`;
    
    if (data.budget) {
      query += ` with a ${data.budget.toLowerCase()} budget`;
    }
    
    if (data.interests.length > 0) {
      query += `. I'm interested in ${data.interests.join(', ')}`;
    }
    
    if (data.additionalInfo) {
      query += `. ${data.additionalInfo}`;
    }
    
    query += '. Can you suggest an itinerary, places to visit, and things to do?';
    
    return query;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = generateQuery(formData);
    onSubmit(formData, query);
  };

  const nextStep = () => {
    if (formStep < 2) setFormStep(formStep + 1);
  };

  const prevStep = () => {
    if (formStep > 0) setFormStep(formStep - 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Plan Your Perfect Trip</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {formStep === 0 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="form-group">
              <label htmlFor="destination\" className="flex items-center text-gray-700 mb-2 font-medium">
                <Compass className="h-5 w-5 mr-2 text-blue-500" />
                Where do you want to go?
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="City, country, or region"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="startDate" className="flex items-center text-gray-700 mb-2 font-medium">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate" className="flex items-center text-gray-700 mb-2 font-medium">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {formStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="form-group">
              <label htmlFor="travelers" className="flex items-center text-gray-700 mb-2 font-medium">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Number of Travelers
              </label>
              <input
                type="number"
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleInputChange}
                min="1"
                max="20"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget" className="flex items-center text-gray-700 mb-2 font-medium">
                <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Budget">Budget</option>
                <option value="Medium">Medium</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="form-group">
              <label className="flex items-center text-gray-700 mb-2 font-medium">
                <Heart className="h-5 w-5 mr-2 text-blue-500" />
                What are you interested in?
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {interestOptions.map((interest) => (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      formData.interests.includes(interest)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="additionalInfo" className="flex items-center text-gray-700 mb-2 font-medium">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                Any additional details?
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={3}
                placeholder="Special requirements, preferences, or specific questions..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {formStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
            >
              Back
            </button>
          )}
          
          {formStep < 2 ? (
            <button
              type="button"
              onClick={nextStep}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 ${formStep === 0 && !formData.destination ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={formStep === 0 && !formData.destination}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Get Recommendations
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TripForm;
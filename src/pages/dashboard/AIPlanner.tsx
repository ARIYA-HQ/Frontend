import { useState } from 'react';
import { 
  ArrowPathIcon, 
  LightBulbIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { mockAIRecommendations } from '../../data/mockData';

const AIPlanner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    occasion: '',
    guestCount: '',
    location: '',
    budget: '',
    eventDate: '',
    atmosphere: '',
    specialRequirements: ''
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const totalSteps = 4;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Map old field names to new ones for consistency
    const fieldName = name === 'eventType' ? 'occasion' :
                    name === 'date' ? 'eventDate' :
                    name === 'theme' ? 'atmosphere' : name;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate recommendations when form is complete
      generateRecommendations();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setRecommendations(mockAIRecommendations);
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      occasion: '',
      guestCount: '',
      location: '',
      budget: '',
      eventDate: '',
      atmosphere: '',
      specialRequirements: ''
    });
    setRecommendations([]);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Event Details</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  What is the Occasion
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3 pr-10 appearance-none"
                >
                  <option value="">Select an occasion</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="conference">Conference</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="graduation">Graduation</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="engagement">Engagement</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guestCount"
                  id="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3"
                  placeholder="Approximate number"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Budget & Timeline</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Budget Range ($)
                </label>
                <input
                  type="number"
                  name="budget"
                  id="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3"
                  placeholder="Total budget"
                />
              </div>
              
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  id="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="atmosphere" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Atmosphere
                </label>
                <input
                  type="text"
                  name="atmosphere"
                  id="atmosphere"
                  value={formData.atmosphere}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3"
                  placeholder="e.g., Elegant, Modern, Traditional, Casual"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Special Requirements</h3>
            <div>
              <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Any special requirements or preferences?
              </label>
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                rows={4}
                value={formData.specialRequirements}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm dark:shadow-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Dietary restrictions, entertainment preferences, etc."
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Review Your Information</h3>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Occasion</p>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.occasion || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Guest Count</p>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.guestCount || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.location || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget</p>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.budget ? `$${formData.budget}` : 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.eventDate || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Atmosphere</p>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.atmosphere || 'Not specified'}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Special Requirements</p>
                <p className="text-sm text-gray-900 dark:text-white">{formData.specialRequirements || 'None'}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Click "Generate Recommendations" to get AI-powered suggestions for your event.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dark:bg-gray-900">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Event Planner</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Let our AI help you plan the perfect event</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-none rounded-lg p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Guided Planning Session</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="mt-4">
              <div className="overflow-hidden h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 ease-in-out" 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            {renderStep()}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                  currentStep === 1 
                    ? 'text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed' 
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                Back
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm dark:shadow-none text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500"
              >
                {currentStep === totalSteps ? 'Generate Recommendations' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">AI Recommendations</h2>
            <button
              onClick={resetForm}
              className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ArrowPathIcon className="w-4 h-4 mr-1" />
              Start Over
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-500"></div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Generating recommendations...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-white dark:bg-gray-800 shadow dark:shadow-none rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {rec.type === 'event_idea' && (
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <LightBulbIcon className="w-6 h-6 text-blue-600" />
                        </div>
                      )}
                      {rec.type === 'budget_allocation' && (
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                        </div>
                      )}
                      {rec.type === 'vendor_recommendation' && (
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <CheckCircleIcon className="w-6 h-6 text-purple-600" />
                        </div>
                      )}
                      {rec.type === 'cost_saving_tip' && (
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <ArrowTrendingUpIcon className="w-6 h-6 text-yellow-600" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{rec.title}</h3>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          AI Suggested
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">{rec.description}</p>
                      <div className="mt-4 flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          {rec.type.replace('_', ' ')}
                        </span>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          Confidence: {(rec.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIPlanner;
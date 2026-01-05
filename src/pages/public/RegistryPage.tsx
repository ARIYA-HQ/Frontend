import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockEvents, mockRegistry } from '../../data/mockData';
import { HeartIcon } from '@heroicons/react/24/outline';

const RegistryPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event] = useState(mockEvents.find(e => e.id === eventId) || mockEvents[0]);
  const [registry] = useState(mockRegistry);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Gift Registry
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {event.title} • {registry.message}
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {registry.items.map((item) => (
              <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex justify-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">${item.price}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.quantity - item.purchasedQuantity} left
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href={item.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Purchase Gift
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <HeartIcon className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your presence is our gift</h3>
            <p className="mt-2 text-sm text-gray-500">
              We are grateful that you are considering celebrating with us. Your presence at our event is the only gift we need.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryPage;
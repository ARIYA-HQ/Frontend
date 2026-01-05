import React, { useState } from 'react';

interface AIRecommendationWithActionsProps {
  title: string;
  description: string;
  reason?: string;
  confidence: number;
  onAccept: () => void;
  onReject: () => void;
  onModify: (modifiedValue: string) => void;
}

const AIRecommendationWithActions: React.FC<AIRecommendationWithActionsProps> = ({
  title,
  description,
  reason,
  confidence,
  onAccept,
  onReject,
  onModify
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedValue, setModifiedValue] = useState(description);

  const handleModify = () => {
    onModify(modifiedValue);
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
              Confidence: {(confidence * 100).toFixed(0)}%
            </span>
          </div>
          
          {reason && (
            <div className="mt-1 text-xs text-gray-500 italic">
              <span className="font-medium">Why this matters:</span> {reason}
            </div>
          )}
          
          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={modifiedValue}
                onChange={(e) => setModifiedValue(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows={3}
              />
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={handleModify}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          
          <div className="mt-3 flex space-x-2">
            <button
              onClick={onAccept}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Accept
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Modify
            </button>
            <button
              onClick={onReject}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationWithActions;
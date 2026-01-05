import { useState } from 'react';
import { mockReviews } from '../../../data/mockData';
import {
  StarIcon,
  PencilIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const Reviews = () => {
  const [reviews] = useState(mockReviews);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 uppercase">REVIEWS</h1>
        <p className="mt-1 text-sm text-gray-500 font-medium">Manage your customer reviews and responses</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        {/* Rating Summary Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{averageRating}</span>
              <StarIcon className="h-6 w-6 text-yellow-400 ml-1 fill-yellow-400" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-2">Average Rating</p>
            <p className="text-xs font-bold text-gray-900 mt-1">{reviews.length} reviews</p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(r => r.rating === rating).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-600 w-4">{rating}</span>
                  <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <div className="flex-1">
                    <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#D0771E] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Response Rate Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">Response Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">92%</div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-2">Responded to reviews</p>
            <p className="text-xs font-bold text-gray-900 mt-1">46 of 50 reviews</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 uppercase mb-8">All Reviews</h3>

        <div className="space-y-10">
          {reviews.map((review) => (
            <div key={review.id} className="group border-b border-gray-50 pb-10 last:border-0 last:pb-0">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <UserIcon className="h-6 w-6 text-gray-400" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-gray-900">{review.clientName}</h4>
                    <span className="text-xs font-bold text-gray-400">{review.date}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
                          }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-bold text-gray-400">{review.rating}.0</span>
                  </div>

                  <p className="text-sm font-medium text-gray-600 leading-relaxed mb-6">{review.comment}</p>

                  {review.response && (
                    <div className="mb-6 pl-6 border-l-2 border-orange-100 bg-orange-50/20 py-4 rounded-r-xl">
                      <div className="text-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D0771E]">Your response</span>
                        <p className="mt-2 text-sm font-medium text-gray-700 leading-relaxed">{review.response}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center">
                    <button className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D0771E] transition-all">
                      <PencilIcon className="h-4 w-4 mr-2" />
                      {review.response ? 'Edit Response' : 'Respond to Review'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
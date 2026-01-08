import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

const reviews: Review[] = [
  {
    id: '1',
    author: 'Debra & Mark',
    location: 'Google Review',
    text: "Steve and Kim are amazing hosts. Nothing was too much trouble. We stayed in a Garden unit which was spacious, very clean and comfortable. The location is excellent, just a short walk to the shops and cafes of Burnt Pine, yet very quiet and peaceful.",
    rating: 5
  },
  {
    id: '2',
    author: 'Geoff H.',
    location: 'Google Review',
    text: "This is our second stay at Channers. We love the location, the gardens are magnificent, and the apartments are well appointed. Having the car included in the package makes everything so easy from the moment you land. Highly recommended.",
    rating: 5
  },
  {
    id: '3',
    author: 'Susan T.',
    location: 'Google Review',
    text: "A home away from home. The Ocean View apartment had breathtaking views of the valley and sea. It was wonderful to have a full kitchen and laundry facilities. The internet speed was surprisingly good for an island!",
    rating: 5
  }
];

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-norfolk-green text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Kind Words from Recent Guests</h2>
          <div className="flex justify-center gap-1 text-yellow-400">
             {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
          <p className="mt-2 text-norfolk-sand opacity-80 font-sans text-sm">4.9 Star Average on Google</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm flex flex-col">
              <div className="mb-6">
                 <span className="text-4xl text-norfolk-clay font-serif opacity-50">“</span>
                 <p className="font-serif text-lg leading-relaxed italic opacity-90 -mt-4 relative z-10">
                   {review.text}
                 </p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                <div>
                   <p className="font-bold font-sans text-sm">{review.author}</p>
                   <p className="text-xs text-norfolk-sand opacity-60 uppercase tracking-wider">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
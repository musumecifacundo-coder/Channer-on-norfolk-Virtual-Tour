import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

const reviews: Review[] = [
  {
    id: '1',
    author: 'Margaret & David',
    location: 'Sydney, NSW',
    text: "Exactly what we needed. Quiet, spotless, and the host went above and beyond to ensure our car hire was sorted before we even landed. It felt less like a hotel and more like staying with an old friend.",
    rating: 5
  },
  {
    id: '2',
    author: 'Helen P.',
    location: 'Brisbane, QLD',
    text: "The location is perfect. Just far enough from town to hear nothing but the birds, but close enough to walk to dinner. The apartment was equipped with everything, down to the real ground coffee.",
    rating: 5
  },
  {
    id: '3',
    author: 'John S.',
    location: 'Melbourne, VIC',
    text: "Channers is a gem. The gardens are beautiful. We appreciated the personal touch and the genuine care shown. Will definitely return next winter.",
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
            <div key={review.id} className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <p className="font-serif text-lg leading-relaxed mb-6 italic opacity-90">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between mt-auto">
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
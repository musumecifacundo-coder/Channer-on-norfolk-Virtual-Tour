import React from 'react';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { Review } from '../types';

const reviews: Review[] = [
  {
    id: '1',
    author: 'Gregory Watts',
    location: 'Google Review',
    text: "We endorse all the other 5 star reviews. Kerrie-Ann and Steve have perfected hospitality. Total relaxation as soon as we walked into our room. Loved the car included, particularly the part about 'leave it at the airport unlocked - we'll get it later'! Loved the mobile phone provided to use anywhere on the island. Snorkel, masks and flippers and beach towels complimentary, too. Excellent advice on tours, restaurants, etc too. Will definitely be going back soon.",
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
    author: 'Stirling Turpin',
    location: 'Google Review',
    text: "What a pleasant and wonderful stay we had here. A credit to Kerri-Ann and Steve. The units are spacious and very comfortable, with everything that is needed for a enjoyable hassle free stay. A walk around the well kept gardens and some interesting features is well worth it. If we ever return to Norfolk Island, will certainly put this accommodation on the top of our list. Thank you Keri-Ann and Steve.",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

        <div className="flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="https://www.google.com/maps/place/Channers+On+Norfolk+-+Norfolk+Island+Holiday+Packages,+Tours,+Accommodation+%7C+Travel+to+Norfolk+Island/@-29.0401923,167.9527381,17z/data=!4m8!3m7!1s0x6c4bd7943df366e5:0x251b68dc570a659a!8m2!3d-29.040197!4d167.955313!9m1!1b1!16s%2Fg%2F12hkw6h4f?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full transition-all font-sans text-sm uppercase tracking-wider"
            >
                <MapPin size={16} />
                Reviews on Google Maps
                <ExternalLink size={14} className="opacity-70" />
            </a>

            <a 
              href="https://www.tripadvisor.com/Hotel_Review-g446955-d656949-Reviews-Channers_on_Norfolk-Kingston_Norfolk_Island.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-white/30 hover:bg-[#00AA6C] hover:border-[#00AA6C] text-white px-6 py-3 rounded-full transition-all font-sans text-sm uppercase tracking-wider"
            >
                {/* Official White TripAdvisor Logo for Dark Backgrounds */}
                <img 
                  src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_logoset_solid_white.svg" 
                  alt="TripAdvisor" 
                  className="w-5 h-5 object-contain"
                />
                Reviews on TripAdvisor
                <ExternalLink size={14} className="opacity-70" />
            </a>
        </div>
      </div>
    </section>
  );
};
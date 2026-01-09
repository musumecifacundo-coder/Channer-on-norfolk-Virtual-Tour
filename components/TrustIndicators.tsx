import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

// Custom Icon: Norfolk Island Pine (Araucaria heterophylla)
const NorfolkPineTree: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <rect x="11" y="21" width="2" height="2" />
    <path d="M12 1.5L9 6.5H10.5L7 11.5H9L5 17.5H19L15 11.5H17L13.5 6.5H15L12 1.5Z" />
  </svg>
);

export const TrustIndicators: React.FC = () => {
  return (
    <section className="bg-white border-y border-norfolk-clay/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-gray-100 max-w-5xl mx-auto">
          
          {/* 1. TripAdvisor - Linked & Interactive (Official Image) */}
          <a 
            href="https://www.tripadvisor.com/Hotel_Review-g446955-d656949-Reviews-Channers_on_Norfolk-Kingston_Norfolk_Island.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center px-4 py-4 md:py-0 group transition-transform hover:-translate-y-1 duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              {/* Official Green TripAdvisor Logo */}
              <div className="p-1">
                <img 
                  src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_logoset_solid_green.svg" 
                  alt="TripAdvisor Owl" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-xl text-gray-900 leading-none flex items-center gap-2">
                    Travelers' Choice
                    <ExternalLink size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <span className="font-sans text-xs font-bold text-norfolk-green tracking-wider uppercase group-hover:text-[#00AA6C]">2024 Winner</span>
              </div>
            </div>
            {/* Added longevity indicator for trust */}
            <p className="font-sans text-[10px] text-gray-400 font-medium tracking-wide">
              Certificate of Excellence since 2015
            </p>
          </a>

          {/* 2. Booking.com - Minimalist & Modern */}
          <div className="flex flex-col items-center text-center px-4 py-4 md:py-0">
            <div className="flex items-baseline gap-1 mb-1">
                <span className="font-serif text-5xl text-norfolk-green">9.7</span>
                <span className="font-sans text-sm text-gray-400">/10</span>
            </div>
            <h3 className="font-bold font-sans text-sm text-gray-800 uppercase tracking-wide mb-1">
              Guest Review Award
            </h3>
            <div className="flex gap-1 text-norfolk-clay opacity-80">
               {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
            <p className="font-sans text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
              Booking.com
            </p>
          </div>

          {/* 3. Norfolk Pines - Custom Iconography */}
          <div className="flex flex-col items-center text-center px-4 py-4 md:py-0">
            <div className="flex items-center gap-0.5 mb-3 text-norfolk-green">
               {/* 3 Full Norfolk Pines */}
               <NorfolkPineTree size={32} />
               <NorfolkPineTree size={32} />
               <NorfolkPineTree size={32} />
               
               {/* Half Norfolk Pine Representation */}
               <div className="relative">
                 {/* Background faded tree */}
                 <div className="opacity-30">
                    <NorfolkPineTree size={32} />
                 </div>
                 {/* Foreground clipped tree */}
                 <div className="absolute inset-0 overflow-hidden w-1/2">
                    <NorfolkPineTree size={32} />
                 </div>
               </div>
            </div>
            <h3 className="font-serif text-xl text-gray-900 mb-1">3.5 Norfolk Pines</h3>
            <span className="inline-block px-3 py-1 bg-norfolk-sand rounded-full text-[10px] font-bold text-norfolk-green tracking-widest uppercase">
              Boutique Self-Rating
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
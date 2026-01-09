import React from 'react';
import { Award } from 'lucide-react';

export const Heritage: React.FC = () => {
  return (
    <section id="heritage" className="py-24 bg-white border-t border-norfolk-clay/10 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Editorial Header */}
        <div className="text-center mb-20">
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-norfolk-clay uppercase mb-3 block">
            Since 1924
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-norfolk-green mb-6">
            A Legacy of Care
          </h2>
          <div className="w-px h-16 bg-norfolk-clay/30 mx-auto"></div>
        </div>

        {/* Story Block 1: Emillie (1924) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-24 md:mb-32">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute top-4 left-4 w-full h-full border border-norfolk-clay/20 z-0 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative z-10 aspect-[4/3] overflow-hidden bg-norfolk-sand">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/tourstudio-1c4a8.firebasestorage.app/o/Imagenes%20de%20unidades%20flat%2FCorner.png?alt=media" 
                alt="Channers Corner 1924 - Emillie Channer" 
                className="w-full h-full object-cover sepia-[0.15] contrast-[0.95] hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 shadow-xl max-w-[200px] hidden md:block border-t-2 border-norfolk-clay">
               <p className="font-serif text-2xl leading-none text-norfolk-green">1924</p>
               <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mt-1">The Beginning</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="md:pl-8 text-center md:text-left">
            <h3 className="font-serif text-5xl text-norfolk-clay mb-6 opacity-30 select-none">1924</h3>
            <h4 className="font-serif text-3xl text-gray-900 mb-4">The Nurse with the Royal Red Cross</h4>
            <p className="font-sans text-gray-600 leading-relaxed mb-6 font-light text-lg">
              Long before it was a holiday retreat, this corner of Norfolk Island was defined by the spirit of <strong>Emillie Channer</strong>. A decorated war nurse, Emillie was awarded the prestigious <em className="text-norfolk-green font-medium">Royal Red Cross (First Class)</em> for her exceptional bravery and service.
            </p>
            <p className="font-sans text-gray-600 leading-relaxed mb-8 font-light">
              She brought that same ethos of impeccable care and attention to detail to her home. It wasn't just about accommodation; it was about sanctuary. That foundation of genuine hospitality remains the heartbeat of Channers today.
            </p>
            <div className="inline-flex items-center gap-2 text-norfolk-clay text-sm font-bold uppercase tracking-widest border-b border-norfolk-clay/30 pb-1">
              <Award size={16} /> A Tradition of Honour
            </div>
          </div>
        </div>

        {/* Story Block 2: Transition (1929) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Text Side (Left on Desktop) */}
          <div className="order-2 md:order-1 md:pr-8 text-center md:text-right">
            <h3 className="font-serif text-5xl text-norfolk-clay mb-6 opacity-30 select-none">1929</h3>
            <h4 className="font-serif text-3xl text-gray-900 mb-4">From Pacific Cottage to Boutique Estate</h4>
            <p className="font-sans text-gray-600 leading-relaxed mb-6 font-light text-lg">
              By the late 1920s, the property began its evolution. Originally known as the <em>"Pacific Cottage"</em>, the grounds were cultivated into the botanical masterpiece guests enjoy today.
            </p>
            <p className="font-sans text-gray-600 leading-relaxed font-light">
              While the architecture has been modernized to offer 21st-century comfort (and Starlink connection), we have meticulously preserved the tranquility of the original estate. Staying at Channers is not just booking a room; it is stepping into a continuous story of Norfolk history.
            </p>
          </div>

          {/* Image Side (Right on Desktop) */}
          <div className="order-1 md:order-2 relative group">
            <div className="absolute bottom-4 right-4 w-full h-full border border-norfolk-green/20 z-0 transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
            <div className="relative z-10 aspect-[4/3] overflow-hidden bg-norfolk-sand">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/tourstudio-1c4a8.firebasestorage.app/o/Imagenes%20de%20unidades%20flat%2FChanners%20old.png?alt=media" 
                alt="Channers Old Times - Pacific Cottage" 
                className="w-full h-full object-cover sepia-[0.2] contrast-[0.9] hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="absolute -top-6 -left-6 bg-norfolk-sand p-4 shadow-lg max-w-[200px] hidden md:block">
               <p className="font-serif text-2xl leading-none text-norfolk-green">1929</p>
               <p className="font-sans text-[10px] uppercase tracking-widest text-gray-500 mt-1">The Evolution</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
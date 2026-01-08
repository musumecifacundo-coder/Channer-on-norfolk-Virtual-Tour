import React, { useState } from 'react';
import { Button } from './Button';
import { Users, BedDouble, Bath, Wifi, Car, Plane, Coffee, ArrowRight, Trees, Waves, Move3d } from 'lucide-react';

type ViewType = 'garden' | 'ocean';

const inclusions = [
  { icon: <Car size={20} />, label: "Car Hire Included", sub: "For your entire stay" },
  { icon: <Plane size={20} />, label: "Airport Transfers", sub: "Meet & Greet included" },
  { icon: <Wifi size={20} />, label: "Stay Connected", sub: "Free Wi-Fi & Local Calls" },
  { icon: <Coffee size={20} />, label: "Island Tour", sub: "Half-day orientation" },
];

const roomData = {
  garden: [
    {
      id: '1-bed-garden',
      type: '1-Bedroom Apartment',
      title: 'Garden Suite',
      capacity: '1-2 Guests',
      beds: '1 King or 2 Singles',
      baths: '1 En-suite Bathroom',
      view: 'Lush Subtropical Gardens',
      desc: 'Ground floor sanctuary with direct access to the gardens. Total privacy and effortless relaxation.',
      price: 'Best Value',
      image: 'https://picsum.photos/800/600?random=1'
    },
    {
      id: '2-bed-garden',
      type: '2-Bedroom Apartment',
      title: 'Garden Family Villa',
      capacity: '2-4 Guests',
      beds: '2 Kings or 4 Singles',
      baths: '2 Full Bathrooms',
      view: 'Private Garden Courtyard',
      desc: 'Spacious ground-floor living. Ideal for families or friends wanting shared space with privacy.',
      price: 'Group Favorite',
      image: 'https://picsum.photos/800/600?random=10'
    }
  ],
  ocean: [
    {
      id: '1-bed-ocean',
      type: '1-Bedroom Apartment',
      title: 'Ocean View Suite',
      capacity: '1-2 Guests',
      beds: '1 King',
      baths: '1 En-suite Bathroom',
      view: 'Ocean & Valley Vistas',
      desc: 'Elevated position capturing the ocean breeze. Watch the sunset from your private balcony.',
      price: 'Most Popular',
      image: 'https://picsum.photos/800/600?random=2'
    },
    {
      id: '2-bed-ocean',
      type: '2-Bedroom Apartment',
      title: 'Ocean View Penthouse',
      capacity: '2-4 Guests',
      beds: '2 Kings or 4 Singles',
      baths: '2 Full Bathrooms',
      view: 'Panoramic Pacific Views',
      desc: 'Our premier accommodation. Expansive living areas and a large balcony commanding the best views.',
      price: 'Premium Experience',
      image: 'https://picsum.photos/800/600?random=20'
    }
  ]
};

export const Accommodation: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('garden');

  const handle360Click = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accommodation" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* SECTION A: THE CHANNERS PLUS (VALUE DRIVERS) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-serif text-4xl text-norfolk-green mb-2">The Channers Plus</h2>
            <p className="font-sans text-gray-500">Every booking includes these essentials at no extra cost</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-norfolk-sand rounded-xl p-6 border border-norfolk-clay/20">
            {inclusions.map((inc, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="text-norfolk-green mb-2">{inc.icon}</div>
                <span className="font-bold text-gray-800 text-sm">{inc.label}</span>
                <span className="text-xs text-gray-500">{inc.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION B: COLORED TOGGLE SWITCH */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-full inline-flex relative shadow-inner">
            {/* Sliding Background */}
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[140px] rounded-full shadow-md transition-all duration-300 ease-in-out 
              ${activeView === 'garden' 
                ? 'left-1.5 bg-norfolk-green' 
                : 'left-[148px] bg-norfolk-ocean'}`}
            />
            
            {/* Buttons */}
            <button
              onClick={() => setActiveView('garden')}
              className={`relative z-10 w-[140px] py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors duration-300
              ${activeView === 'garden' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Trees size={16} /> Garden View
            </button>
            <button
              onClick={() => setActiveView('ocean')}
              className={`relative z-10 w-[140px] py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors duration-300
              ${activeView === 'ocean' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Waves size={16} /> Ocean View
            </button>
          </div>
        </div>

        {/* SECTION C: ROOM CARDS (COMPARATIVE GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roomData[activeView].map((room) => (
            <div key={room.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* 360 Tour Button (Overlay) */}
                <div className="absolute bottom-4 right-4 z-10">
                   <button 
                     onClick={handle360Click}
                     className="bg-white/90 hover:bg-white backdrop-blur-md text-gray-800 text-xs font-bold px-3 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
                   >
                     <Move3d size={14} className="text-norfolk-green" /> 360° Tour
                   </button>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-norfolk-green uppercase tracking-wider">
                  {room.type}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-gray-900 leading-tight">{room.title}</h3>
                    <span className="text-norfolk-clay text-sm font-medium">{room.price}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded text-xs font-bold text-gray-600">
                    <Users size={14} /> {room.capacity}
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <BedDouble size={16} className="text-norfolk-green" />
                    <span className="truncate">{room.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Bath size={16} className="text-norfolk-green" />
                     <span className="truncate">{room.baths}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    {activeView === 'garden' ? <Trees size={16} className="text-norfolk-green" /> : <Waves size={16} className="text-norfolk-ocean" />}
                    <span>{room.view}</span>
                  </div>
                </div>

                <p className="font-sans text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                  {room.desc}
                </p>

                <Button 
                  onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full group-hover:bg-norfolk-green group-hover:text-white transition-colors"
                  variant="outline"
                >
                  Check Availability <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Micro-Footer / Trust Signal */}
        <div className="mt-12 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                Flexible Cancellation • No Booking Fees • Pay on Arrival
            </p>
        </div>

      </div>
    </section>
  );
};
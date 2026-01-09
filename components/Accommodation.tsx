import React, { useState, useMemo, useEffect } from 'react';
import { Button } from './Button';
import { Users, BedDouble, Bath, Wifi, Car, Plane, Coffee, ArrowRight, Trees, Waves, X, Rotate3d } from 'lucide-react';
import { Standalone360Viewer } from './Standalone360Viewer';
import { OCEAN_PENTHOUSE_DATA } from '../data/tourData';

type ViewType = 'garden' | 'ocean';

const inclusions = [
  { icon: <Car size={20} />, label: "Car Hire Included", sub: "For your entire stay" },
  { icon: <Plane size={20} />, label: "Airport Transfers", sub: "Meet & Greet included" },
  { icon: <Wifi size={20} />, label: "Stay Connected", sub: "Free Wi-Fi & Local Calls" },
  { icon: <Coffee size={20} />, label: "Island Tour", sub: "Half-day orientation" },
];

// --- INTERNAL COMPONENT: RoomCard (Trigger Only) ---
interface RoomCardProps {
  room: any;
  activeView: ViewType;
  onOpenTour: (data: any) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, activeView, onOpenTour }) => {
  // PRELOADING LOGIC:
  // When user hovers the card, we assume they might click. 
  // We fetch the high-res image of the DEFAULT scene immediately into the browser cache.
  const handleMouseEnter = () => {
    if (room.tourData) {
      const startSceneId = room.tourData.defaultScene;
      const startScene = room.tourData.scenes.find((s: any) => s.id === startSceneId);
      
      if (startScene && startScene.image) {
        const img = new Image();
        img.src = startScene.image; // Triggers browser cache download
        // We can also preload the thumbnail if strictly necessary, but usually high-res is the bottleneck
      }
    }
  };

  return (
    <div 
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
      onMouseEnter={handleMouseEnter} // Trigger predictive loading
    >
      
      {/* Card Image / Tour Trigger */}
      <div className="relative h-64 bg-gray-100 overflow-hidden cursor-pointer" onClick={() => room.tourData && onOpenTour(room.tourData)}>
        <img 
            src={room.image} 
            alt={room.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-norfolk-green uppercase tracking-wider shadow-sm z-10">
            {room.type}
        </div>

        {/* 360 Trigger Button Overlay */}
        {room.tourData && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors z-0">
                <button 
                onClick={(e) => { e.stopPropagation(); onOpenTour(room.tourData); }}
                className="flex items-center gap-2 bg-norfolk-sand/90 hover:bg-white text-norfolk-green px-5 py-2.5 rounded-full font-serif text-sm font-bold shadow-lg transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                <Rotate3d size={18} />
                View Virtual Tour
                </button>
            </div>
        )}
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

        <div className="mt-auto space-y-3">
          <Button 
            onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full group-hover:bg-norfolk-green group-hover:text-white transition-colors"
            variant="outline"
          >
            Check Availability <ArrowRight size={16} className="ml-2" />
          </Button>
          
           {/* Mobile Fallback Text */}
           {room.tourData && (
             <button 
               onClick={() => onOpenTour(room.tourData)}
               className="w-full text-center text-xs text-norfolk-green font-bold uppercase tracking-widest md:hidden"
             >
               View 360° Tour
             </button>
          )}
        </div>
      </div>
    </div>
  );
};


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
      image: 'https://firebasestorage.googleapis.com/v0/b/tourstudio-1c4a8.firebasestorage.app/o/Imagenes%20de%20unidades%20flat%2FGarden%202%20guest%202.jpg?alt=media'
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
      image: 'https://firebasestorage.googleapis.com/v0/b/tourstudio-1c4a8.firebasestorage.app/o/Imagenes%20de%20unidades%20flat%2FGarden%204%20guest%202.jpg?alt=media'
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
      image: 'https://firebasestorage.googleapis.com/v0/b/tourstudio-1c4a8.firebasestorage.app/o/Imagenes%20de%20unidades%20flat%2FOcean%20VIew.jpg?alt=media'
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
      image: 'https://firebasestorage.googleapis.com/v0/b/tourstudio-1c4a8.firebasestorage.app/o/Imagenes%20de%20unidades%20flat%2FGarden%204%20guest.jpg?alt=media',
      tourData: OCEAN_PENTHOUSE_DATA // Injecting the tour data here
    }
  ]
};

export const Accommodation: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('ocean');
  
  // Modal State
  const [activeTour, setActiveTour] = useState<any | null>(null);
  const [currentSceneId, setCurrentSceneId] = useState<string>('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeTour) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeTour]);

  const handleOpenTour = (data: any) => {
    setActiveTour(data);
    setCurrentSceneId(data.defaultScene);
  };

  const handleCloseTour = () => {
    setActiveTour(null);
    setCurrentSceneId('');
  };

  // Compute current scene object
  const currentScene = useMemo(() => {
    if (!activeTour || !currentSceneId) return null;
    return activeTour.scenes.find((s: any) => s.id === currentSceneId) || activeTour.scenes[0];
  }, [activeTour, currentSceneId]);

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
              ${activeView === 'ocean' 
                ? 'left-1.5 bg-norfolk-ocean' 
                : 'left-[148px] bg-norfolk-green'}`}
            />
            
            {/* Buttons (Ocean First) */}
            <button
              onClick={() => setActiveView('ocean')}
              className={`relative z-10 w-[140px] py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors duration-300
              ${activeView === 'ocean' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Waves size={16} /> Ocean View
            </button>
            
            <button
              onClick={() => setActiveView('garden')}
              className={`relative z-10 w-[140px] py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors duration-300
              ${activeView === 'garden' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Trees size={16} /> Garden View
            </button>
          </div>
        </div>

        {/* SECTION C: ROOM CARDS (COMPARATIVE GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roomData[activeView].map((room) => (
            <RoomCard key={room.id} room={room} activeView={activeView} onOpenTour={handleOpenTour} />
          ))}
        </div>

        {/* Micro-Footer / Trust Signal */}
        <div className="mt-12 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                Flexible Cancellation • No Booking Fees • Pay on Arrival
            </p>
        </div>

        {/* FULL SCREEN MODAL */}
        {activeTour && currentScene && (
            <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col animate-fade-in">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent">
                    <div className="text-white">
                        <h3 className="font-serif text-xl leading-none">{activeTour.name}</h3>
                        <p className="text-xs font-sans opacity-80 mt-1 flex items-center gap-2">
                             <Rotate3d size={12} /> Virtual Tour Mode
                        </p>
                    </div>
                    <button 
                        onClick={handleCloseTour}
                        className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors backdrop-blur-md"
                    >
                        <X size={28} />
                    </button>
                </div>

                {/* Viewer Container */}
                <div className="flex-grow w-full h-full relative">
                    <Standalone360Viewer 
                        scene={currentScene}
                        allScenes={activeTour.scenes} // Pass all scenes for smart preloading
                        onSceneChange={setCurrentSceneId}
                        autoRotate={false}
                    />
                    
                    {/* Scene Indicator Overlay at Bottom */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
                         <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white">
                            <span className="text-sm font-sans font-medium">{currentScene.title}</span>
                         </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </section>
  );
};
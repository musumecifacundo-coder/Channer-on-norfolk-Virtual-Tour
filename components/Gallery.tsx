import React, { useState } from 'react';
import { Maximize2, Move3d } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | '360'>('photos');

  const photos = [
    'https://picsum.photos/400/300?random=10',
    'https://picsum.photos/400/300?random=11',
    'https://picsum.photos/400/300?random=12',
    'https://picsum.photos/400/300?random=13',
    'https://picsum.photos/400/300?random=14',
    'https://picsum.photos/400/300?random=15',
  ];

  return (
    <section id="gallery" className="py-20 bg-norfolk-sand">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="font-serif text-4xl text-norfolk-green mb-6">A Glimpse of Island Life</h2>
          
          <div className="flex space-x-4 bg-white p-1 rounded-full shadow-sm">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-2 rounded-full font-sans text-sm transition-all ${
                activeTab === 'photos' ? 'bg-norfolk-green text-white shadow' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Photo Gallery
            </button>
            <button
              onClick={() => setActiveTab('360')}
              className={`px-6 py-2 rounded-full font-sans text-sm transition-all flex items-center gap-2 ${
                activeTab === '360' ? 'bg-norfolk-green text-white shadow' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Move3d size={16} /> 360° Tours
            </button>
          </div>
        </div>

        {activeTab === 'photos' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((src, idx) => (
              <div key={idx} className="relative group overflow-hidden bg-gray-200 aspect-[4/3]">
                <img 
                  src={src} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Maximize2 className="text-white drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[500px] bg-gray-800 rounded-lg flex flex-col items-center justify-center relative overflow-hidden text-center text-white p-8">
             <img 
               src="https://picsum.photos/1200/800?blur=4" 
               className="absolute inset-0 w-full h-full object-cover opacity-50"
               alt="360 background"
             />
             <div className="relative z-10 bg-black/60 p-8 rounded-xl backdrop-blur-sm max-w-lg">
               <Move3d size={48} className="mx-auto mb-4 text-white" />
               <h3 className="text-2xl font-serif mb-2">Virtual Tour Experience</h3>
               <p className="font-sans text-gray-300 mb-6">
                 Walk through our Garden Suite and grounds before you arrive.
                 (This is a placeholder for the actual Matterport or similar 360 viewer integration).
               </p>
               <button className="px-6 py-3 bg-white text-gray-900 rounded-sm font-medium hover:bg-gray-100 transition">
                 Launch Interactive Tour
               </button>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};
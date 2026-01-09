import React from 'react';
import { MapPin, Plane, Coffee } from 'lucide-react';

export const Location: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Text Content */}
          <div className="w-full md:w-1/3 flex flex-col justify-center">
            <h2 className="font-serif text-4xl text-norfolk-green mb-6">Our Location</h2>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="mt-1 text-norfolk-clay"><MapPin size={24} /></div>
                  <div>
                    <h3 className="font-bold font-sans text-gray-800">Channers on Norfolk</h3>
                    <p className="text-gray-600 leading-relaxed text-sm mt-1">
                      144 Taylors Rd,<br/>
                      Burnt Pine, Norfolk Island 2899
                    </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="mt-1 text-norfolk-clay"><Coffee size={24} /></div>
                  <div>
                    <h3 className="font-bold font-sans text-gray-800">Close to Village</h3>
                    <p className="text-gray-600 leading-relaxed text-sm mt-1">
                      Just a short 2-minute drive or a pleasant 10-minute walk to Burnt Pine's shops and cafes.
                    </p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="mt-1 text-norfolk-clay"><Plane size={24} /></div>
                  <div>
                    <h3 className="font-bold font-sans text-gray-800">Airport Transfer</h3>
                    <p className="text-gray-600 leading-relaxed text-sm mt-1">
                      We meet you at the airport. It's only a 5-minute drive to your accommodation.
                    </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="w-full md:w-2/3 h-[400px] md:h-auto rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative group">
             {/* Grayscale filter for style, removes on hover */}
             <div className="w-full h-full filter grayscale-[80%] hover:grayscale-0 transition-all duration-700">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.5401509927943!2d167.95273807532292!3d-29.040192291586737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6c4bd7943df366e5%3A0x251b68dc570a659a!2sChanners%20On%20Norfolk%20-%20Norfolk%20Island%20Holiday%20Packages%2C%20Tours%2C%20Accommodation%20%7C%20Travel%20to%20Norfolk%20Island!5e0!3m2!1sen!2sar!4v1709664582312!5m2!1sen!2sar" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Channers on Norfolk Location Map"
                ></iframe>
             </div>
             
             {/* Overlay hint */}
             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Click to interact
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
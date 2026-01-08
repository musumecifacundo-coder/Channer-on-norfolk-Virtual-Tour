import React from 'react';
import { Heart, MapPin, Coffee } from 'lucide-react';

export const WhyStay: React.FC = () => {
  const reasons = [
    {
      icon: <Heart size={40} strokeWidth={1} />,
      title: "Genuine, Personal Hosting",
      text: "We live on site and host personally. We listen, adapt, and take the time to understand what you want from your stay. You have access to us when you need it, ensuring you feel genuinely welcomed."
    },
    {
      icon: <MapPin size={40} strokeWidth={1} />,
      title: "Quiet, Yet Connected",
      text: "Surrounded by Norfolk Pines and flowering hibiscus, yet just a short walk from Burnt Pine’s cafés and shops. Everything is close, yet wonderfully quiet."
    },
    {
      icon: <Coffee size={40} strokeWidth={1} />,
      title: "For Mature Travellers",
      text: "We specialise in hosting senior travellers seeking comfort, ease, and a slower pace. To maintain this peaceful environment, we are child-free for guests under 15."
    }
  ];

  return (
    <section id="whystay" className="py-20 md:py-32 bg-norfolk-sand">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-norfolk-green mb-4">What makes Channers different</h2>
          <div className="w-24 h-1 bg-norfolk-clay mx-auto mb-6"></div>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Many of our guests return home and recommend us to friends and family, not because of luxury or scale, but because of how they were looked after.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-norfolk-clay mb-6 shadow-sm">
                {reason.icon}
              </div>
              <h3 className="font-serif text-2xl text-gray-800 mb-3">{reason.title}</h3>
              <p className="font-sans text-gray-600 leading-relaxed">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
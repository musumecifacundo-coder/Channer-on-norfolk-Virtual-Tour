import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ESSENTIAL_FAQS = [
    {
        q: "How far are you from the shops?",
        a: "We are located just 400 metres from the Burnt Pine shopping centre. It is a pleasant, flat walk to cafes, the supermarket, and restaurants, yet our property remains quiet and secluded."
    },
    {
        q: "Do I need a passport to travel to Norfolk Island?",
        a: "Yes. Even though Norfolk Island is an external territory of Australia, all travellers (including Australians) must depart from the International Terminal and present a valid passport."
    },
    {
        q: "Is there mobile phone reception and internet?",
        a: "Yes. We provide complimentary Wi-Fi in all apartments (Starlink/NBN). For mobile phones, global roaming usually works, but buying a local SIM card is recommended for longer stays as Australian plans may incur roaming charges."
    },
    {
        q: "What medical facilities are available?",
        a: "Norfolk Island has a hospital and a GP clinic. Australian Medicare applies on the island for GP visits and emergency care. However, we strongly recommend travel insurance that includes medical evacuation."
    },
    {
        q: "Do you provide beach towels?",
        a: "Yes, we provide beach towels for your use during your stay, along with a starter pack of tea, coffee, milk, and toiletries."
    }
];

export const Gallery: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First one open by default for better engagement

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="gallery" className="py-20 bg-norfolk-sand border-t border-norfolk-clay/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="bg-white p-3 rounded-full shadow-sm mb-4 text-norfolk-green">
             <HelpCircle size={32} />
          </div>
          <h2 className="font-serif text-4xl text-norfolk-green mb-4">Guest Essentials</h2>
          <p className="font-sans text-gray-600 max-w-2xl text-lg">
            Planning a trip to Norfolk Island comes with unique questions. Here is everything you need to know before you arrive.
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in">
             <div className="space-y-4">
                {ESSENTIAL_FAQS.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                    <button 
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-serif text-xl text-gray-800 font-medium pr-4">{faq.q}</span>
                      {openFaq === idx ? <ChevronUp size={20} className="text-norfolk-clay flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-6 pt-0 text-gray-600 text-base leading-relaxed border-t border-gray-50 mt-2 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
             </div>
             
             <div className="mt-10 text-center">
                <p className="font-sans text-sm text-gray-500">
                    Still have questions? 
                    <a href="#enquiry" className="text-norfolk-green font-bold ml-1 hover:underline cursor-pointer">
                      Send us a message below
                    </a>
                </p>
             </div>
          </div>
      </div>
    </section>
  );
};
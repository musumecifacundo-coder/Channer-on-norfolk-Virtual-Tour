import React from 'react';
import { Waves, Fish, Palmtree, Castle, BookOpen, Footprints, Mountain, Camera, Binoculars, ArrowRight } from 'lucide-react';

const experiences = [
  {
    id: 'emily-bay',
    category: 'Nature & Relax',
    title: 'Emily Bay',
    description: "One of the world's most beautiful bays. Crystal clear, calm waters protected by a coral reef—perfect for swimming or snorkeling straight from the golden sand.",
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tourstudio-1c4a8.firebasestorage.app/o/Imagenes%20de%20unidades%20flat%2FGemini_Generated_Image_tmju3ztmju3ztmju.png?alt=media',
    icons: [
      { icon: <Waves size={16} />, label: 'Swim' },
      { icon: <Fish size={16} />, label: 'Snorkel' },
      { icon: <Palmtree size={16} />, label: 'Relax' },
    ]
  },
  {
    id: 'kingston',
    category: 'History & Culture',
    title: 'Kingston Historic Area',
    description: "A UNESCO World Heritage site. Wander through living history among 18th-century ruins, seaside museums, and tales of the Bounty mutineers.",
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tourstudio-1c4a8.firebasestorage.app/o/Imagenes%20de%20unidades%20flat%2FUnesco.png?alt=media',
    icons: [
      { icon: <Castle size={16} />, label: 'Heritage' },
      { icon: <BookOpen size={16} />, label: 'Museums' },
      { icon: <Footprints size={16} />, label: 'Walks' },
    ]
  },
  {
    id: 'mount-pitt',
    category: 'Views & Adventure',
    title: 'Mount Pitt National Park',
    description: "The island's green heart. Drive or walk to the summit for breathtaking 360° views of the ocean, and spot the rare Green Parrot in the ferns.",
    imageUrl: 'https://picsum.photos/600/800?random=52',
    icons: [
      { icon: <Mountain size={16} />, label: '360° Views' },
      { icon: <Footprints size={16} />, label: 'Trails' },
      { icon: <Camera size={16} />, label: 'Photo' },
    ]
  }
];

export const Experiences: React.FC = () => {
  return (
    <section id="experiences" className="py-20 bg-norfolk-sand">
      <div className="container mx-auto px-4">
        <div className="mb-12 md:text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-norfolk-green mb-4">Experience Norfolk, your way</h2>
          <p className="font-sans text-gray-600 mb-6 text-lg leading-relaxed">
            Whether you prefer everything arranged for you or enjoy planning at your own pace, we’re here to help. 
            Here are our top 3 recommendations for a perfect start to your island getaway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {experiences.map((exp) => (
            <div key={exp.id} className="group relative h-[500px] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
              
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={exp.imageUrl} 
                  alt={exp.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                
                {/* Category Tag */}
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-norfolk-sand mb-3 opacity-90">
                  {exp.category}
                </span>

                {/* Title */}
                <h3 className="font-serif text-3xl mb-4 group-hover:text-norfolk-sand transition-colors">
                  {exp.title}
                </h3>

                {/* Icons Row */}
                <div className="flex gap-6 mb-6 border-t border-white/20 pt-4">
                  {exp.icons.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 group/icon">
                      <div className="text-norfolk-sand/90 group-hover/icon:text-white transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider opacity-70">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="font-sans text-sm text-gray-200 leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all">
                  {exp.description}
                </p>

                {/* CTA Button */}
                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white group-hover:text-norfolk-sand transition-all transform translate-y-0">
                  Discover More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
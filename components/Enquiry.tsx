import React, { useState } from 'react';
import { Button } from './Button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

// Simple Calendar Component Logic
const SimpleCalendar = ({ onSelect }: { onSelect: (start: Date | null, end: Date | null) => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysArray = Array.from({ length: days }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      onSelect(clickedDate, null);
    } else if (startDate && !endDate) {
      if (clickedDate > startDate) {
        setEndDate(clickedDate);
        onSelect(startDate, clickedDate);
      } else {
        setStartDate(clickedDate);
        onSelect(clickedDate, null);
      }
    }
  };

  const isSelected = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (startDate && date.getTime() === startDate.getTime()) return true;
    if (endDate && date.getTime() === endDate.getTime()) return true;
    if (startDate && endDate && date > startDate && date < endDate) return true;
    return false;
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft size={20} /></button>
        <span className="font-serif text-lg font-medium">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight size={20} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-xs text-gray-400 font-sans">{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {blanks.map(i => <div key={`blank-${i}`} />)}
        {daysArray.map(day => {
          const active = isSelected(day);
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`h-10 w-full rounded-sm text-sm font-sans transition-colors
                ${active ? 'bg-norfolk-green text-white' : 'hover:bg-norfolk-sand text-gray-700'}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center font-sans">
        Select your arrival and departure dates
      </div>
    </div>
  );
};

export const Enquiry: React.FC = () => {
  const [dates, setDates] = useState<{start: Date|null, end: Date|null}>({start: null, end: null});

  return (
    <section id="enquiry" className="py-20 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-norfolk-green mb-4">A stay built on genuine hospitality</h2>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Comfortable accommodation, beautiful surroundings and attentive, on-site hosting — this is what keeps guests coming back to Channers. 
            Select your dates below and we’ll personally confirm availability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar Side */}
          <div>
            <h3 className="font-serif text-2xl text-gray-800 mb-6 flex items-center gap-2">
              <CalendarIcon className="text-norfolk-clay" /> Preferred Dates
            </h3>
            <SimpleCalendar onSelect={(start, end) => setDates({start, end})} />
          </div>

          {/* Form Side */}
          <form className="space-y-6 bg-norfolk-sand/30 p-8 rounded-lg" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-norfolk-green focus:border-norfolk-green bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-norfolk-green focus:border-norfolk-green bg-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-norfolk-green focus:border-norfolk-green bg-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selected Dates</label>
              <input 
                type="text" 
                readOnly 
                value={dates.start ? `${dates.start.toLocaleDateString()} ${dates.end ? `- ${dates.end.toLocaleDateString()}` : ''}` : 'Please select dates from calendar'}
                className="w-full p-3 border border-gray-300 bg-gray-50 text-gray-500 rounded-sm"
              />
            </div>
            
            {/* Added Package Interest Checkbox */}
            <div className="flex items-start gap-3 bg-white p-4 rounded-sm border border-gray-200">
               <input type="checkbox" id="package-interest" className="mt-1 h-4 w-4 text-norfolk-green focus:ring-norfolk-green border-gray-300 rounded" />
               <label htmlFor="package-interest" className="text-sm text-gray-700">
                 <strong>I am interested in a 2026 Holiday Package</strong><br/>
                 <span className="text-gray-500 text-xs">Includes Flights, Car Hire, Accommodation & Tours.</span>
               </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Anything else we should know?</label>
              <textarea rows={4} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-norfolk-green focus:border-norfolk-green bg-white" placeholder="Specific room preference, dietary requirements, or flight details..."></textarea>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Send Enquiry
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              No payment required now. We will contact you to finalize details.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
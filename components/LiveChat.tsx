import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm the digital concierge for Channers. How can I help you plan your tranquil getaway to Norfolk Island?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Gemini State
  const [chatSession, setChatSession] = useState<Chat | null>(null);

  useEffect(() => {
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const initChat = () => {
    try {
      if (!process.env.API_KEY) {
        console.warn("API Key not found. Chat will be simulated.");
        return;
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const newChat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the digital concierge for Channers on Norfolk, a boutique accommodation specialising in relaxed, mature travellers (50+) on Norfolk Island.
          
          TONE:
          Warm, welcoming, calm, polite, and helpful. Not salesy. Use clear, simple English.

          KEY FACTS:
          - Location: Set within two acres of lush gardens, a short walk from Burnt Pine shops/cafés. Quiet but convenient.
          - Hosting: The owners live on site and host personally.
          - Rooms: Garden Suites (1-2 guests, ground floor) and Ocean View Apartments (2-4 guests, elevated views). All are fully self-contained.
          - Policy: Child-free for guests under 15 to maintain a peaceful environment.
          - Booking: We do not take instant bookings. Users must inquire.

          INSTRUCTIONS:
          - If asked about availability, ask for their dates and gently suggest they use the "Enquire" form on the page.
          - If asked about children, explain politely that the property is child-free for under 15s to ensure rest and quiet.
          - If asked about tours/food, mention we can organise curated experiences or provide local maps.
          - Keep answers short (under 60 words).`,
        }
      });
      setChatSession(newChat);
    } catch (e) {
      console.error("Failed to init chat", e);
    }
  };

  useEffect(() => {
    if (isOpen && !chatSession) {
      initChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      if (chatSession) {
        // Real Gemini Call
        const result = await chatSession.sendMessageStream({ message: userMsg });
        
        let fullResponse = "";
        // Add placeholder for stream
        setMessages(prev => [...prev, { role: 'model', text: "" }]);

        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            const text = c.text || "";
            fullResponse += text;
            
            // Update last message
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].text = fullResponse;
                return newArr;
            });
        }
      } else {
        // Fallback Simulation if no API key
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'model', text: "Thank you for your message. As I am currently in demo mode (no API key configured), I recommend using the enquiry form below to contact the owner directly." }]);
        }, 1000);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try the enquiry form." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-norfolk-green text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
        >
          <MessageSquare size={24} />
          <span className="hidden md:inline font-sans font-medium">Chat with us</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 overflow-hidden animate-fade-in" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-norfolk-green p-4 flex justify-between items-center text-white">
            <div>
              <h3 className="font-serif text-lg font-medium">Channers Concierge</h3>
              <p className="text-xs text-green-100 opacity-80">Usually replies instantly</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg text-sm font-sans leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-norfolk-clay text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && !chatSession && (
               <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                   <Loader2 className="animate-spin text-norfolk-green" size={16} />
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about rooms, location..."
                className="flex-1 p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-norfolk-green font-sans text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-norfolk-green text-white rounded-sm hover:bg-opacity-90 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
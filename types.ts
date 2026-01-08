export type View = 'home' | 'packages' | 'tour';

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: string;
  priceGuide: string;
  imageUrl: string;
  features: string[];
  tourData?: any; // Added to support 360 tour data injection
}

export interface Review {
  id: string;
  author: string;
  location: string;
  text: string;
  rating: number;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
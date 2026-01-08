export type View = 'home' | 'packages';

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: string;
  priceGuide: string;
  imageUrl: string;
  features: string[];
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

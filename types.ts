export interface Property {
  id: string;
  title: string;
  price: number;
  priceLabel?: string; // For "From X M"
  address: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'Apartment' | 'Villa' | 'Penthouse' | 'Studio';
  category: 'Sale' | 'Rent';
  imageUrl: string;
  description: string; // Formatting with newlines supported
  features: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SearchFilters {
  query: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
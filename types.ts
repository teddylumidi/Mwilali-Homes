
export interface UnitVariant {
  name: string;
  size: string;
  price: string;
  image: string;
  type: string;
}

export interface InteriorGallery {
  title: string;
  images: string[];
  badge?: string;
}

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
  gallery?: string[]; // Optional array of generic image URLs
  interiorGalleries?: InteriorGallery[]; // Specific interior renders grouped by type
  amenitiesGallery?: string[]; // Specific amenities images
  units?: UnitVariant[]; // Specific unit floor plans/images
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

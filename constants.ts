import { Property } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'brookside-oak',
    title: 'Brookside Oak',
    price: 8800000,
    priceLabel: 'From KES 8.8M',
    address: 'Near Safaricom HQ & Sarit Centre',
    city: 'Westlands',
    state: 'Nairobi',
    beds: 1,
    baths: 1,
    sqft: 65,
    type: 'Apartment',
    category: 'Sale',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: `A PREMIER PROJECT BY OAK DEVELOPERS.
    
    Experience luxury living in the heart of Westlands. Brookside Oak offers premium residences with UN-standard security and world-class amenities.
    
    PAYMENT PLAN:
    Flexible payment plans available with construction period estimates provided upon inquiry. Secure your space today with an early booking discount.
    
    LOCATION HIGHLIGHTS:
    Located near Safaricom HQ, Sarit Centre, MP Shah Hospital, Nairobi International School, Village Market, and the United Nations Office.`,
    units: [
      {
        name: "Classic 1 Bedroom",
        size: "65 sqm",
        price: "KES 8.8M",
        type: "1 Bedroom",
        image: "1BR 65SQM.jpg"
      },
      {
        name: "Standard 1 Bedroom",
        size: "70 sqm",
        price: "Inquire for Price",
        type: "1 Bedroom",
        image: "1BR 70SQM.jpg"
      },
      {
        name: "Premier 1 Bedroom",
        size: "75 sqm",
        price: "KES 10.0M",
        type: "1 Bedroom",
        image: "1BR 75SQM.jpg"
      },
      {
        name: "Luxury 1 Bedroom",
        size: "89 sqm",
        price: "Inquire for Price",
        type: "1 Bedroom",
        image: "1BR 89SQM.jpg"
      },
      {
        name: "Executive 2 Bedroom",
        size: "100 sqm",
        price: "Inquire for Price",
        type: "2 Bedroom",
        image: "2BR 100SQM.jpg"
      },
      {
        name: "Premier 2 Bedroom",
        size: "118 sqm",
        price: "Inquire for Price",
        type: "2 Bedroom",
        image: "2BR 118SQM.jpg"
      },
      {
        name: "Family 3 Bedroom",
        size: "142 sqm",
        price: "Inquire for Price",
        type: "3 Bedroom",
        image: "3BR 142SQM.jpg"
      },
      {
        name: "Grand 3 Bedroom",
        size: "172 sqm",
        price: "Inquire for Price",
        type: "3 Bedroom",
        image: "3BR 172SQM.jpg"
      },
      {
        name: "Luxury 3 Bedroom",
        size: "186 sqm",
        price: "Inquire for Price",
        type: "3 Bedroom",
        image: "3BR 186SQM.jpg"
      },
      {
        name: "Penthouse Type A",
        size: "200 sqm",
        price: "Inquire for Price",
        type: "Penthouse",
        image: "3BR 200SQM (3)-1.jpg"
      },
      {
        name: "Penthouse Type B",
        size: "200 sqm",
        price: "Inquire for Price",
        type: "Penthouse",
        image: "3BR 200SQM (7)-1.jpg"
      }
    ],
    interiorGalleries: [
      {
        title: "1 Bedroom Interior Renders",
        images: [
          "2510251BR INTERIOR RENDERS-1.jpg",
          "2510251BR INTERIOR RENDERS-2.jpg",
          "2510251BR INTERIOR RENDERS-3.jpg",
          "2510251BR INTERIOR RENDERS-4.jpg",
          "2510251BR INTERIOR RENDERS-5.jpg",
          "2510251BR INTERIOR RENDERS-6.jpg"
        ]
      }
    ],
    features: ['Outdoor Pool', 'Paddle Court', 'Fitness Center', 'Café', 'Children’s Play Area', 'Cinema', 'Sauna', 'UN-Standard Security', 'Landscaped Gardens'],
    coordinates: { lat: -1.2635, lng: 36.8024 }
  },
  {
    id: 'oak-breeze',
    title: 'Oak Breeze',
    price: 5650000,
    priceLabel: 'From KES 5.65M',
    address: 'Kilimani, Near Yaya Center',
    city: 'Kilimani',
    state: 'Nairobi',
    beds: 1,
    baths: 1,
    sqft: 45,
    type: 'Apartment',
    category: 'Sale',
    imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: `ELEVATING URBAN LIVING TO NEW HEIGHTS.
    
    Oak Breeze redefines skyline living in Kilimani with modern architecture and functional design. Perfect for investors and homeowners alike.
    
    UNIT OPTIONS & PRICING:
    • Mini 1 Bed (45 sqm) – From KES 5.65M
    • 1 Bed (50 sqm) – From KES 6.25M
    • 2 Bed (91 sqm) – From KES 11.4M
    
    AMENITIES & LIFESTYLE:
    Enjoy a rooftop pool with panoramic views, fully equipped gym, and convenience at your doorstep.
    
    LOCATION HIGHLIGHTS:
    Close to TDB Tower, CJ’s Kilimani Branch, Yaya Center, Kilimani Primary School, Naivas & Karibu Square, Nairobi Hospital, and the CBD.`,
    features: ['Rooftop Pool & Garden', 'Gym', 'Minimart', 'Coffee Lounge', 'Conference Room', 'Indoor Kids Play Area', 'Spa', 'Backup Generator', 'Borehole Water', '3 Lifts per Block'],
    coordinates: { lat: -1.2921, lng: 36.7866 }
  },
  {
    id: 'rental-1',
    title: 'Modern Kilimani Apartment',
    price: 85000,
    priceLabel: 'KES 85,000/mo',
    address: 'Argwings Kodhek Rd',
    city: 'Kilimani',
    state: 'Nairobi',
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: 'Apartment',
    category: 'Rent',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    description: 'Spacious 2-bedroom apartment with master ensuite. Open plan kitchen, large balcony, and high-speed lifts. Gym and pool access included.',
    features: ['Gym', 'Pool', 'High Speed Lifts', 'Backup Generator', '24hr Security'],
    coordinates: { lat: -1.2900, lng: 36.7900 }
  },
  {
    id: 'rental-2',
    title: 'Executive Furnished Studio',
    price: 60000,
    priceLabel: 'KES 60,000/mo',
    address: 'Riverside Drive',
    city: 'Westlands',
    state: 'Nairobi',
    beds: 1,
    baths: 1,
    sqft: 400,
    type: 'Studio',
    category: 'Rent',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    description: 'Beautifully furnished studio apartment suitable for expatriates. Quiet neighborhood, lush gardens, and easy access to Westlands CBD.',
    features: ['Fully Furnished', 'Garden', 'Quiet Area', 'Parking', 'WiFi Ready'],
    coordinates: { lat: -1.2700, lng: 36.8000 }
  }
];
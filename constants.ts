import { Property } from './types';

// NOTE: All image paths are relative to the 'public' directory.
// For example, '/images/properties/1BR 65SQM.jpg' will resolve to 'public/images/properties/1BR 65SQM.jpg'.

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
    imageUrl: '/images/properties/1BR 65SQM.webp',
    description: `BROOKSIDE OAK — A PREMIER PROJECT BY OAK DEVELOPERS\n\nLocated in the leafy suburbs of Westlands along Muguga Green, Brookside Oak Residency redefines what it means to live and invest in Nairobi's most coveted address within the UN blue Zone. This signature development blends architectural excellence with exceptional investment potential — designed for the discerning few who value both luxury and long-term returns.\n\nESTIMATED CONSTRUCTION PERIOD: February, 2026 – June, 2029\n40 MONTHS PAYMENT PLAN\n\nEXCLUSIVE AMENITIES:\n• 2 Grand reception and concierge desk\n• Expansive outdoor heated swimming pool\n• Paddle court\n• Fully equipped fitness center\n• Café and Market\n• Modern home working hub\n• Indoor children's play area\n• Lush landscaped gardens\n• Residents' clubhouse\n• Residents' cinema\n• Exclusive sauna\n• Security Measures with UN Standards\n\nLOCATION ADVANTAGE:\nBrookside Oak places you minutes away from key lifestyle and business destinations:\n• Next door to Safaricom Headquarters\n• 7 mins → Sarit Centre\n• 7 mins → MP Shah Hospital\n• 9 mins → Nairobi International School (Senior Campus)\n• 16 mins → Village Market\n• 16 mins → United Nations Office\n\nSecure your space in this premier address today with Kshs.500k and enjoy exclusive benefits for early bookings.`,
    units: [
      { name: "Classic 1 Bedroom", size: "65 sqm", price: "KES 8.8M", type: "1 Bedroom", image: "/images/properties/1BR 65SQM.webp" },
      { name: "Standard 1 Bedroom", size: "70 sqm", price: "Inquire for Price", type: "1 Bedroom", image: "/images/properties/1BR 70SQM.webp" },
      { name: "Premier 1 Bedroom", size: "75 sqm", price: "KES 10.0M", type: "1 Bedroom", image: "/images/properties/1BR 75SQM.webp" },
      { name: "Luxury 1 Bedroom", size: "89 sqm", price: "Inquire for Price", type: "1 Bedroom", image: "/images/properties/1BR 89SQM.webp" },
      { name: "Executive 2 Bedroom", size: "100 sqm", price: "Inquire for Price", type: "2 Bedroom", image: "/images/properties/2BR 100SQM.webp" },
      { name: "Premier 2 Bedroom", size: "118 sqm", price: "Inquire for Price", type: "2 Bedroom", image: "/images/properties/2BR 118SQM.webp" },
      { name: "Family 3 Bedroom", size: "142 sqm", price: "Inquire for Price", type: "3 Bedroom", image: "/images/properties/3BR 142SQM.webp" },
      { name: "Grand 3 Bedroom", size: "172 sqm", price: "Inquire for Price", type: "3 Bedroom", image: "/images/properties/3BR 172SQM.webp" },
      { name: "Luxury 3 Bedroom", size: "186 sqm", price: "Inquire for Price", type: "3 Bedroom", image: "/images/properties/3BR 186SQM.webp" },
      { name: "Penthouse Type A", size: "200 sqm", price: "Inquire for Price", type: "Penthouse", image: "/images/properties/3BR 200SQM (3)-1.webp" },
      { name: "Penthouse Type B", size: "200 sqm", price: "Inquire for Price", type: "Penthouse", image: "/images/properties/3BR 200SQM (7)-1.webp" }
    ],
    interiorGalleries: [
      { title: "Typical Floor Plan", badge: "Floor Plan", images: ["/images/properties/New Typical Floor Plan -1.webp"] },
      { title: "1 Bedroom Interior Renders", badge: "Interior Render", images: Array.from({length: 6}, (_, i) => `/images/properties/2510251BR INTERIOR RENDERS-${i + 1}.webp`) },
      { title: "3 Bedroom Interior Renders", badge: "Interior Render", images: Array.from({length: 25}, (_, i) => `/images/properties/251025 3BR INTERIOR RENDERS-${String(i + 1).padStart(2, '0')}.webp`) }
    ],
    amenitiesGallery: Array.from({length: 18}, (_, i) => `/images/properties/251025 AMENITIES-${String(i + 1).padStart(2, '0')}.webp`),
    features: ["UN Standard Security", "Backup Generator", "Borehole", "High Speed Lifts", "CCTV Surveillance", "Solar Water Heating", "Fully Equipped Gym", "Kids Play Area"],
    coordinates: { lat: -1.263567, lng: 36.802673 }
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
    imageUrl: '/images/properties/1BR 45SQM-1.webp',
    description: `OAK BREEZE – ELEVATING URBAN LIVING TO NEW HEIGHTS!\n\nOak Breeze Residencies, an exceptional collection of 1 & 2-bedroom apartments located along WOOD AVENUE in KILIMANI, Nairobi. Designed for modern living, with close proximity to social amenities and designed for savvy investors looking to maximize returns.\n\nOak Breeze comprises of 2 blocks\n\n3 YEARS PAYMENT PLAN\n\nPROPERTY AMENITIES:\n• Ground Floor Reception\n• Rooftop Swimming Pool & Rooftop Garden\n• Gym & Fitness\n• Minimart\n• Coffee Lounge\n• Conference Room\n• Indoor Kids Play Area\n• Spa\n• Backup Generator\n• Borehole Water\n• 3 Lifts per Block\n\nPROXIMITY TO SOCIAL AMENITIES:\n• 1 minute walk to TDB Tower\n• 2 minutes walk to CJ's Kilimani Branch\n• 3 minutes drive to Yaya Center\n• 4 minutes drive to Kilimani Primary School\n• 5 minutes walk to NAIVAS & KARIBU SQUARE\n• 10 minutes to Nairobi Hospital\n• 15 minutes to CBD\n\nDon't miss out on this opportunity to secure a profitable future. Contact us today to learn more and get a discount for EARLY BOOKINGS!`,
    units: [
      { name: "Mini 1 Bedroom", size: "45 sqm", price: "From KES 5.65M", type: "1 Bedroom", image: "/images/properties/1BR 45SQM-1.webp" },
      { name: "1 Bedroom", size: "50 sqm", price: "From KES 6.25M", type: "1 Bedroom", image: "/images/properties/1BR 50SQM-1.webp" },
      { name: "1 Bedroom", size: "59 sqm", price: "From KES 7.4M", type: "1 Bedroom", image: "/images/properties/1BR 59SQM-1.webp" },
      { name: "2 Bedroom", size: "91 sqm", price: "From KES 11.4M", type: "2 Bedroom", image: "/images/properties/2BR 91SQM-1.webp" },
      { name: "2 Bedroom", size: "95 sqm", price: "From KES 11.9M", type: "2 Bedroom", image: "/images/properties/2BR 95SQM-1.webp" },
      { name: "2 Bedroom All Ensuite", size: "96 sqm", price: "From KES 12M", type: "2 Bedroom", image: "/images/properties/2BR 96SQM-1.webp" }
    ],
    interiorGalleries: [
      { title: "Oak Breeze Residency Brochure", badge: "Brochure", images: Array.from({length: 23}, (_, i) => `/images/properties/Oak_Breeze_Residency_Brochure-${String(i + 1).padStart(2, '0')}.webp`) },
      { title: "2 Bedroom (96 SQM)", badge: "Interior & Floor Plan", images: Array.from({length: 9}, (_, i) => `/images/properties/2BR 96SQM-${i + 1}.webp`) },
      { title: "2 Bedroom (95 SQM)", badge: "Interior & Floor Plan", images: Array.from({length: 8}, (_, i) => `/images/properties/2BR 95SQM-${i + 1}.webp`) },
      { title: "2 Bedroom (91 SQM)", badge: "Interior & Floor Plan", images: Array.from({length: 8}, (_, i) => `/images/properties/2BR 91SQM-${i + 1}.webp`) },
      { title: "1 Bedroom (59 SQM)", badge: "Interior & Floor Plan", images: Array.from({length: 6}, (_, i) => `/images/properties/1BR 59SQM-${i + 1}.webp`) },
      { title: "1 Bedroom (50 SQM)", badge: "Interior & Floor Plan", images: Array.from({length: 5}, (_, i) => `/images/properties/1BR 50SQM-${i + 1}.webp`) },
      { title: "1 Bedroom (45 SQM)", badge: "Interior & Floor Plan", images: Array.from({length: 6}, (_, i) => `/images/properties/1BR 45SQM-${i + 1}.webp`) }
    ],
    features: ["Rooftop Pool", "Coffee Lounge", "Minimart", "Conference Room", "Indoor Kids Play Area", "Spa", "Backup Generator", "High Speed Lifts"],
    coordinates: { lat: -1.2921, lng: 36.7871 }
  },
  {
    id: 'rental-1',
    title: 'Modern 2BR Apartment',
    price: 85000,
    priceLabel: 'KES 85,000/mo',
    address: 'Kileleshwa, Othaya Road',
    city: 'Kileleshwa',
    state: 'Nairobi',
    beds: 2,
    baths: 2,
    sqft: 110,
    type: 'Apartment',
    category: 'Rent',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Spacious 2 bedroom apartment in a quiet compound in Kileleshwa. Features a large balcony, closed kitchen, and swimming pool. Rent includes service charge.',
    features: ['Swimming Pool', 'Borehole', 'Garden'],
    coordinates: { lat: -1.2841, lng: 36.8155 }
  }
];


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
    imageUrl: '1BR 65SQM.jpg', // Using unit image as hero for now as per availability
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
        title: "Typical Floor Plan",
        badge: "Floor Plan",
        images: [
          "New Typical Floor Plan - 1.jpg"
        ]
      },
      {
        title: "1 Bedroom Interior Renders",
        badge: "Interior Render",
        images: [
          "2510251BR INTERIOR RENDERS-1.jpg",
          "2510251BR INTERIOR RENDERS-2.jpg",
          "2510251BR INTERIOR RENDERS-3.jpg",
          "2510251BR INTERIOR RENDERS-4.jpg",
          "2510251BR INTERIOR RENDERS-5.jpg",
          "2510251BR INTERIOR RENDERS-6.jpg"
        ]
      },
      {
        title: "3 Bedroom Interior Renders",
        badge: "Interior Render",
        images: [
          "251025 3BR INTERIOR RENDERS-01.jpg",
          "251025 3BR INTERIOR RENDERS-02.jpg",
          "251025 3BR INTERIOR RENDERS-03.jpg",
          "251025 3BR INTERIOR RENDERS-04.jpg",
          "251025 3BR INTERIOR RENDERS-05.jpg",
          "251025 3BR INTERIOR RENDERS-06.jpg",
          "251025 3BR INTERIOR RENDERS-07.jpg",
          "251025 3BR INTERIOR RENDERS-08.jpg",
          "251025 3BR INTERIOR RENDERS-09.jpg",
          "251025 3BR INTERIOR RENDERS-10.jpg",
          "251025 3BR INTERIOR RENDERS-11.jpg",
          "251025 3BR INTERIOR RENDERS-12.jpg",
          "251025 3BR INTERIOR RENDERS-13.jpg",
          "251025 3BR INTERIOR RENDERS-14.jpg",
          "251025 3BR INTERIOR RENDERS-15.jpg",
          "251025 3BR INTERIOR RENDERS-16.jpg",
          "251025 3BR INTERIOR RENDERS-17.jpg",
          "251025 3BR INTERIOR RENDERS-18.jpg",
          "251025 3BR INTERIOR RENDERS-19.jpg",
          "251025 3BR INTERIOR RENDERS-20.jpg",
          "251025 3BR INTERIOR RENDERS-21.jpg",
          "251025 3BR INTERIOR RENDERS-22.jpg",
          "251025 3BR INTERIOR RENDERS-23.jpg",
          "251025 3BR INTERIOR RENDERS-24.jpg",
          "251025 3BR INTERIOR RENDERS-25.jpg"
        ]
      }
    ],
    amenitiesGallery: [
      "251025 AMENITIES-01.jpg",
      "251025 AMENITIES-02.jpg",
      "251025 AMENITIES-03.jpg",
      "251025 AMENITIES-04.jpg",
      "251025 AMENITIES-05.jpg",
      "251025 AMENITIES-06.jpg",
      "251025 AMENITIES-07.jpg",
      "251025 AMENITIES-08.jpg",
      "251025 AMENITIES-09.jpg",
      "251025 AMENITIES-10.jpg",
      "251025 AMENITIES-11.jpg",
      "251025 AMENITIES-12.jpg",
      "251025 AMENITIES-13.jpg",
      "251025 AMENITIES-14.jpg",
      "251025 AMENITIES-15.jpg",
      "251025 AMENITIES-16.jpg",
      "251025 AMENITIES-17.jpg",
      "251025 AMENITIES-18.jpg"
    ],
    features: [
      "UN Standard Security",
      "Backup Generator",
      "Borehole",
      "High Speed Lifts",
      "CCTV Surveillance",
      "Solar Water Heating",
      "Fully Equipped Gym",
      "Kids Play Area"
    ],
    coordinates: {
      lat: -1.263567,
      lng: 36.802673
    }
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
    imageUrl: '1BR 45SQM-1.jpg',
    description: `ELEVATING URBAN LIVING TO NEW HEIGHTS.
    
    Oak Breeze redefines skyline living in Kilimani. A perfect blend of luxury and convenience, located just minutes from Yaya Center and CBD.
    
    AMENITIES:
    Rooftop pool & garden, fully equipped gym, minimart, coffee lounge, conference room, indoor kids play area, spa, and borehole water.
    
    LOCATION:
    Close to TDB Tower, CJ’s Kilimani Branch, Yaya Center, Kilimani Primary School, Naivas & Karibu Square, Nairobi Hospital, and the CBD.`,
    units: [
      {
        name: "Mini 1 Bedroom",
        size: "45 sqm",
        price: "KES 5.65M",
        type: "1 Bedroom",
        image: "1BR 45SQM-1.jpg" 
      },
      {
        name: "Standard 1 Bedroom",
        size: "50 sqm",
        price: "KES 6.25M",
        type: "1 Bedroom",
        image: "1BR 50SQM-1.jpg"
      },
      {
        name: "Luxury 1 Bedroom",
        size: "59 sqm",
        price: "Inquire for Price",
        type: "1 Bedroom",
        image: "1BR 59SQM-1.jpg"
      },
      {
        name: "Classic 2 Bedroom",
        size: "91 sqm",
        price: "KES 11.4M",
        type: "2 Bedroom",
        image: "2BR 91SQM-1.jpg"
      },
      {
        name: "Premier 2 Bedroom",
        size: "95 sqm",
        price: "Inquire for Price",
        type: "2 Bedroom",
        image: "2BR 95SQM-1.jpg"
      },
      {
        name: "Executive 2 Bedroom",
        size: "96 sqm",
        price: "Inquire for Price",
        type: "2 Bedroom",
        image: "2BR 96SQM-1.jpg"
      }
    ],
    interiorGalleries: [
      {
        title: "Oak Breeze Residency Brochure",
        badge: "Brochure",
        images: [
          "Oak_Breeze_Residency_Brochure-01.jpg",
          "Oak_Breeze_Residency_Brochure-02.jpg",
          "Oak_Breeze_Residency_Brochure-03.jpg",
          "Oak_Breeze_Residency_Brochure-04.jpg",
          "Oak_Breeze_Residency_Brochure-05.jpg",
          "Oak_Breeze_Residency_Brochure-06.jpg",
          "Oak_Breeze_Residency_Brochure-07.jpg",
          "Oak_Breeze_Residency_Brochure-08.jpg",
          "Oak_Breeze_Residency_Brochure-09.jpg",
          "Oak_Breeze_Residency_Brochure-10.jpg",
          "Oak_Breeze_Residency_Brochure-11.jpg",
          "Oak_Breeze_Residency_Brochure-12.jpg",
          "Oak_Breeze_Residency_Brochure-13.jpg",
          "Oak_Breeze_Residency_Brochure-14.jpg",
          "Oak_Breeze_Residency_Brochure-15.jpg",
          "Oak_Breeze_Residency_Brochure-16.jpg",
          "Oak_Breeze_Residency_Brochure-17.jpg",
          "Oak_Breeze_Residency_Brochure-18.jpg",
          "Oak_Breeze_Residency_Brochure-19.jpg",
          "Oak_Breeze_Residency_Brochure-20.jpg",
          "Oak_Breeze_Residency_Brochure-21.jpg",
          "Oak_Breeze_Residency_Brochure-22.jpg",
          "Oak_Breeze_Residency_Brochure-23.jpg"
        ]
      },
      {
        title: "2 Bedroom (96 SQM)",
        badge: "Interior & Floor Plan",
        images: [
          "2BR 96SQM-1.jpg",
          "2BR 96SQM-2.jpg",
          "2BR 96SQM-3.jpg",
          "2BR 96SQM-4.jpg",
          "2BR 96SQM-5.jpg",
          "2BR 96SQM-6.jpg",
          "2BR 96SQM-7.jpg",
          "2BR 96SQM-8.jpg",
          "2BR 96SQM-9.jpg"
        ]
      },
      {
        title: "2 Bedroom (91 SQM)",
        badge: "Interior & Floor Plan",
        images: [
          "2BR 91SQM-1.jpg",
          "2BR 91SQM-2.jpg",
          "2BR 91SQM-3.jpg",
          "2BR 91SQM-4.jpg",
          "2BR 91SQM-5.jpg",
          "2BR 91SQM-6.jpg",
          "2BR 91SQM-7.jpg",
          "2BR 91SQM-8.jpg"
        ]
      },
      {
        title: "2 Bedroom (95 SQM)",
        badge: "Interior & Floor Plan",
        images: [
          "2BR 95SQM-1.jpg",
          "2BR 95SQM-2.jpg",
          "2BR 95SQM-3.jpg",
          "2BR 95SQM-4.jpg",
          "2BR 95SQM-5.jpg",
          "2BR 95SQM-6.jpg",
          "2BR 95SQM-7.jpg",
          "2BR 95SQM-8.jpg"
        ]
      },
      {
        title: "1 Bedroom (59 SQM)",
        badge: "Interior & Floor Plan",
        images: [
          "1BR 59SQM-1.jpg",
          "1BR 59SQM-2.jpg",
          "1BR 59SQM-3.jpg",
          "1BR 59SQM-4.jpg",
          "1BR 59SQM-5.jpg",
          "1BR 59SQM-6.jpg"
        ]
      },
      {
        title: "1 Bedroom (50 SQM)",
        badge: "Interior & Floor Plan",
        images: [
          "1BR 50SQM-1.jpg",
          "1BR 50SQM-2.jpg",
          "1BR 50SQM-3.jpg",
          "1BR 50SQM-4.jpg",
          "1BR 50SQM-5.jpg"
        ]
      },
      {
        title: "1 Bedroom (45 SQM)",
        badge: "Interior & Floor Plan",
        images: [
          "1BR 45SQM-1.jpg",
          "1BR 45SQM-2.jpg",
          "1BR 45SQM-3.jpg",
          "1BR 45SQM-4.jpg",
          "1BR 45SQM-5.jpg",
          "1BR 45SQM-6.jpg"
        ]
      }
    ],
    features: [
      "Rooftop Pool",
      "Coffee Lounge",
      "Minimart",
      "Conference Room",
      "Indoor Kids Play Area",
      "Spa",
      "Backup Generator",
      "High Speed Lifts"
    ],
    coordinates: {
      lat: -1.2921,
      lng: 36.7871
    }
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

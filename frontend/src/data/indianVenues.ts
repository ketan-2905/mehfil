export interface IndianVenue {
  id: number;
  name: string;
  city: string;
  state: string;
  capacity: number;
  description: string;
  amenities: string[];
  rating: number;
  priceRange: string;
  imageUrl: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  upcomingEvents?: number;
}

export const indianVenues: IndianVenue[] = [
  {
    id: 1,
    name: "The Comedy Store Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    capacity: 250,
    description: "India's premier comedy venue featuring top local and international talent in the heart of Mumbai.",
    amenities: ["Full Bar", "Food Service", "VIP Seating", "Air Conditioning"],
    rating: 4.8,
    priceRange: "₹800-₹2000",
    imageUrl: "https://images.unsplash.com/photo-1603739903239-8b6e64c3b185",
    contactEmail: "bookings@comedystoremumbai.com",
    contactPhone: "+91-22-12345678",
    website: "www.comedystoremumbai.com",
    upcomingEvents: 8
  },
  {
    id: 2,
    name: "Canvas Laugh Club",
    city: "Delhi",
    state: "Delhi",
    capacity: 180,
    description: "A dedicated comedy venue hosting stand-up shows, improv nights and comedy festivals in the capital.",
    amenities: ["Full Bar", "Food Menu", "Private Events"],
    rating: 4.7,
    priceRange: "₹700-₹1500",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    contactEmail: "info@canvaslaughclub.com",
    contactPhone: "+91-11-87654321",
    website: "www.canvaslaughclub.com",
    upcomingEvents: 6
  },
  {
    id: 3,
    name: "Chuckle House",
    city: "Bangalore",
    state: "Karnataka",
    capacity: 120,
    description: "Bangalore's favorite comedy spot featuring tech-themed comedy nights and open mics for new talent.",
    amenities: ["Craft Beer", "Snacks", "Outdoor Seating"],
    rating: 4.6,
    priceRange: "₹600-₹1200",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    contactEmail: "hello@chucklehouse.in",
    contactPhone: "+91-80-56781234",
    website: "www.chucklehouse.in",
    upcomingEvents: 5
  },
  {
    id: 4,
    name: "Hasya Mandir",
    city: "Pune",
    state: "Maharashtra",
    capacity: 150,
    description: "A cultural comedy venue blending traditional Indian humor with modern stand-up comedy formats.",
    amenities: ["Traditional Seating", "Vegetarian Food", "Cultural Programs"],
    rating: 4.5,
    priceRange: "₹500-₹1000",
    imageUrl: "https://images.unsplash.com/photo-1578944032637-f09897c5233d",
    contactEmail: "contact@hasyamandir.com",
    contactPhone: "+91-20-43215678",
    website: "www.hasyamandir.com",
    upcomingEvents: 4
  },
  {
    id: 5,
    name: "Laughter Lounge",
    city: "Hyderabad",
    state: "Telangana",
    capacity: 200,
    description: "Hyderabad's premium comedy destination with multilingual shows and themed comedy nights.",
    amenities: ["Premium Bar", "Dinner Service", "Valet Parking"],
    rating: 4.7,
    priceRange: "₹750-₹1800",
    imageUrl: "https://images.unsplash.com/photo-1508997449629-303059a039c0",
    contactEmail: "info@laughterlounge.in",
    contactPhone: "+91-40-98765432",
    website: "www.laughterlounge.in",
    upcomingEvents: 7
  },
  {
    id: 6,
    name: "Giggles Comedy Club",
    city: "Chennai",
    state: "Tamil Nadu",
    capacity: 130,
    description: "A cozy venue showcasing Tamil and English comedy with a focus on local talent and regional humor.",
    amenities: ["South Indian Cuisine", "Coffee Bar", "Weekend Workshops"],
    rating: 4.4,
    priceRange: "₹550-₹1100",
    imageUrl: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
    contactEmail: "bookings@gigglescomedy.in",
    contactPhone: "+91-44-34567890",
    website: "www.gigglescomedy.in",
    upcomingEvents: 3
  },
  {
    id: 7,
    name: "Kolkata Comedy Theatre",
    city: "Kolkata",
    state: "West Bengal",
    capacity: 175,
    description: "Historic venue blending Bengali theatrical traditions with modern comedy performances.",
    amenities: ["Heritage Building", "Bengali Snacks", "Literary Events"],
    rating: 4.6,
    priceRange: "₹600-₹1300",
    imageUrl: "https://images.unsplash.com/photo-1603192399946-10e213110960",
    contactEmail: "contact@kolkatacomedy.com",
    contactPhone: "+91-33-23456789",
    website: "www.kolkatacomedy.com",
    upcomingEvents: 5
  },
  {
    id: 8,
    name: "Jaipur Hasya Kendra",
    city: "Jaipur",
    state: "Rajasthan",
    capacity: 140,
    description: "A royal comedy experience in the Pink City featuring traditional Rajasthani humor and modern stand-up.",
    amenities: ["Royal Decor", "Cultural Shows", "Rajasthani Cuisine"],
    rating: 4.5,
    priceRange: "₹650-₹1400",
    imageUrl: "https://images.unsplash.com/photo-1599930113854-95e5e4575b8d",
    contactEmail: "info@jaipurhasyakendra.in",
    contactPhone: "+91-14-12345678",
    website: "www.jaipurhasyakendra.in",
    upcomingEvents: 4
  }
];
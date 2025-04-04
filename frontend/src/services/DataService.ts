
import { create } from 'zustand';

// Define the types for our data
export type ComedianRating = {
  id: number;
  comedianId: number;
  userId: number;
  rating: number;
  review?: string;
  date: string;
}

export type Comedian = {
  id: number;
  name: string;
  genre: string;
  bio: string;
  image?: string;
  ratings: ComedianRating[];
  averageRating: number;
}

export type ShowRequest = {
  id: number;
  performerId: number;
  performerName: string;
  venueId: number;
  venueName: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export type Venue = {
  id: number;
  name: string;
  location: string;
  capacity: number;
  description: string;
  amenities: string[];
  contactEmail?: string;
  contactPhone?: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
  isAvailable: boolean;
}

// Define the store state
interface DataState {
  comedians: Comedian[];
  showRequests: ShowRequest[];
  venues: Venue[];
  addShowRequest: (request: Omit<ShowRequest, 'id' | 'createdAt'>) => void;
  updateRequestStatus: (id: number, status: 'approved' | 'rejected') => void;
  rateComedian: (comedianId: number, rating: number, review?: string) => void;
  addVenue: (venue: Omit<Venue, 'id'>) => void;
}

// Sample data for comedians
const sampleComedians: Comedian[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    genre: "Observational",
    bio: "Known for witty takes on everyday life",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    ratings: [
      { id: 1, comedianId: 1, userId: 101, rating: 5, date: "2023-09-15" },
      { id: 2, comedianId: 1, userId: 102, rating: 4, date: "2023-10-05" }
    ],
    averageRating: 4.5
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    genre: "Political",
    bio: "Sharp political commentary with a humorous twist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    ratings: [
      { id: 3, comedianId: 2, userId: 103, rating: 5, date: "2023-09-20" },
      { id: 4, comedianId: 2, userId: 104, rating: 5, date: "2023-10-10" }
    ],
    averageRating: 5.0
  },
  {
    id: 3,
    name: "Lisa Wong",
    genre: "Dark Humor",
    bio: "Pushing boundaries with clever dark comedy",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    ratings: [
      { id: 5, comedianId: 3, userId: 105, rating: 4, date: "2023-09-25" },
      { id: 6, comedianId: 3, userId: 106, rating: 5, date: "2023-10-15" }
    ],
    averageRating: 4.5
  },
  {
    id: 4,
    name: "James Wilson",
    genre: "Slapstick",
    bio: "Physical comedy that keeps audiences laughing",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    ratings: [
      { id: 7, comedianId: 4, userId: 107, rating: 3, date: "2023-09-30" },
      { id: 8, comedianId: 4, userId: 108, rating: 4, date: "2023-10-20" }
    ],
    averageRating: 3.5
  },
  {
    id: 5,
    name: "Alex Chen",
    genre: "Absurdist",
    bio: "Surreal humor that challenges conventions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    ratings: [
      { id: 9, comedianId: 5, userId: 109, rating: 5, date: "2023-10-01" },
      { id: 10, comedianId: 5, userId: 110, rating: 4, date: "2023-10-25" }
    ],
    averageRating: 4.5
  }
];

// Sample data for show requests
const sampleShowRequests: ShowRequest[] = [
  {
    id: 1,
    performerId: 1,
    performerName: "Sarah Johnson",
    venueId: 1,
    venueName: "The Laughing Pint",
    title: "Laugh Out Loud",
    description: "A night of observational comedy",
    date: "2023-11-05",
    time: "8:00 PM",
    status: "pending",
    createdAt: "2023-10-15T14:30:00Z"
  },
  {
    id: 2,
    performerId: 2,
    performerName: "Mike Rodriguez",
    venueId: 2,
    venueName: "Comedy Cellar",
    title: "Politics & Punchlines",
    description: "Political comedy for everyone",
    date: "2023-11-12",
    time: "7:30 PM",
    status: "pending",
    createdAt: "2023-10-17T10:15:00Z"
  }
];

// Sample data for venues
const sampleVenues: Venue[] = [
  {
    id: 1,
    name: "The Laughing Pint",
    location: "123 Comedy Lane, Mumbai",
    capacity: 150,
    description: "A cozy venue known for hosting the best stand-up talent in the city",
    amenities: ["Full Bar", "Food Service", "Parking"],
    contactEmail: "info@laughingpint.com",
    contactPhone: "+91 98765 43210",
    rating: 4.8,
    reviewCount: 120,
    image: "/images/venues/laughing-pint.jpg",
    isAvailable: true
  },
  {
    id: 2,
    name: "Comedy Cellar",
    location: "456 Joke Street, Delhi",
    capacity: 200,
    description: "Underground comedy club with an intimate atmosphere",
    amenities: ["Full Bar", "VIP Seating", "Wheelchair Access"],
    contactEmail: "bookings@comedycellar.com",
    contactPhone: "+91 98765 12345",
    rating: 4.6,
    reviewCount: 85,
    image: "/images/venues/comedy-cellar.jpg",
    isAvailable: true
  },
  {
    id: 3,
    name: "The Stand",
    location: "Los Angeles, CA",
    capacity: 180,
    description: "Premier comedy venue featuring top talent",
    amenities: ["Full Bar", "Food Service", "VIP Seating"],
    contactEmail: "bookings@thestand.com",
    contactPhone: "+1 323-555-1234",
    rating: 4.7,
    reviewCount: 95,
    image: "/images/venues/the-stand.jpg",
    isAvailable: true
  },
  {
    id: 4,
    name: "Laugh Factory",
    location: "Miami, FL",
    capacity: 220,
    description: "Historic comedy club with a vibrant atmosphere",
    amenities: ["Full Bar", "Food Service", "Merchandise"],
    contactEmail: "info@laughfactory.com",
    contactPhone: "+1 305-555-6789",
    rating: 4.9,
    reviewCount: 150,
    image: "/images/venues/laugh-factory.jpg",
    isAvailable: true
  }
];

// Create the store
export const useDataStore = create<DataState>((set) => ({
  comedians: sampleComedians,
  showRequests: sampleShowRequests,
  venues: sampleVenues,
  
  addShowRequest: (request) => set((state) => {
    const newRequest: ShowRequest = {
      ...request,
      id: state.showRequests.length + 1,
      createdAt: new Date().toISOString()
    };
    return { showRequests: [...state.showRequests, newRequest] };
  }),
  
  updateRequestStatus: (id, status) => set((state) => ({
    showRequests: state.showRequests.map(request => 
      request.id === id ? { ...request, status } : request
    )
  })),
  
  rateComedian: (comedianId, rating, review) => set((state) => {
    // Create a new rating
    const newRating: ComedianRating = {
      id: Math.max(...state.comedians.flatMap(c => c.ratings.map(r => r.id)), 0) + 1,
      comedianId,
      userId: Math.floor(Math.random() * 1000), // Mock user ID
      rating,
      review,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Update comedians with new rating
    const updatedComedians = state.comedians.map(comedian => {
      if (comedian.id === comedianId) {
        const updatedRatings = [...comedian.ratings, newRating];
        const averageRating = updatedRatings.reduce((sum, r) => sum + r.rating, 0) / updatedRatings.length;
        
        return {
          ...comedian,
          ratings: updatedRatings,
          averageRating: Math.round(averageRating * 10) / 10
        };
      }
      return comedian;
    });
    
    return { comedians: updatedComedians };
  }),
  
  addVenue: (venue) => set((state) => {
    const newVenue: Venue = {
      ...venue,
      id: state.venues.length + 1,
      isAvailable: true,
      rating: 0,
      reviewCount: 0,
      image: venue.image || "/images/venues/default-venue.jpg"
    };
    return { venues: [...state.venues, newVenue] };
  })
}));

export default useDataStore;


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
  applyToVenue: (venueId: number, performerId: number, title: string, description: string, date: string, time: string) => void;
}

// Sample data for comedians (now diverse performers)
const sampleComedians: Comedian[] = [
  {
    id: 1,
    name: "Priya Sharma",
    genre: "Observational Comedy",
    bio: "Known for witty takes on everyday Indian life",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    ratings: [
      { id: 1, comedianId: 1, userId: 101, rating: 5, date: "2023-09-15" },
      { id: 2, comedianId: 1, userId: 102, rating: 4, date: "2023-10-05" }
    ],
    averageRating: 4.5
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    genre: "Political Satire",
    bio: "Sharp political commentary with a humorous Desi twist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    ratings: [
      { id: 3, comedianId: 2, userId: 103, rating: 5, date: "2023-09-20" },
      { id: 4, comedianId: 2, userId: 104, rating: 5, date: "2023-10-10" }
    ],
    averageRating: 5.0
  },
  {
    id: 3,
    name: "Anjali Desai",
    genre: "Classical Singer",
    bio: "Mesmerizing audiences with soulful classical Indian music",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    ratings: [
      { id: 5, comedianId: 3, userId: 105, rating: 4, date: "2023-09-25" },
      { id: 6, comedianId: 3, userId: 106, rating: 5, date: "2023-10-15" }
    ],
    averageRating: 4.5
  },
  {
    id: 4,
    name: "Vikram Singh",
    genre: "Kathak Dance",
    bio: "Bringing traditional Kathak dance to modern audiences",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    ratings: [
      { id: 7, comedianId: 4, userId: 107, rating: 3, date: "2023-09-30" },
      { id: 8, comedianId: 4, userId: 108, rating: 4, date: "2023-10-20" }
    ],
    averageRating: 3.5
  },
  {
    id: 5,
    name: "Meera Patel",
    genre: "Urdu Poetry",
    bio: "Captivating hearts with beautiful Urdu poetry and ghazals",
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
    performerName: "Priya Sharma",
    venueId: 1,
    venueName: "Hasee Adda",
    title: "Hasna Zaroori Hai",
    description: "A night of observational comedy with a Desi twist",
    date: "2023-11-05",
    time: "8:00 PM",
    status: "approved", // Changed from pending to approved to show as "Confirmed"
    createdAt: "2023-10-15T14:30:00Z"
  },
  {
    id: 2,
    performerId: 2,
    performerName: "Rajesh Kumar",
    venueId: 2,
    venueName: "Comedy Mela",
    title: "Desh Ki Baatein",
    description: "Political comedy for everyone with Indian context",
    date: "2023-11-12",
    time: "7:30 PM",
    status: "approved", // Changed from pending to approved to show as "Confirmed"
    createdAt: "2023-10-17T10:15:00Z"
  },
  {
    id: 3,
    performerId: 3,
    performerName: "Anjali Desai",
    venueId: 3,
    venueName: "Hasya Manch",
    title: "Zindagi Ke Rang",
    description: "A musical comedy evening with classical influences",
    date: "2023-11-05",
    time: "9:00 PM",
    status: "pending",
    createdAt: "2023-10-20T09:45:00Z"
  }
];

// Sample data for venues
const sampleVenues: Venue[] = [
  {
    id: 1,
    name: "Hasee Adda",
    location: "123 Mehfil Lane, Mumbai",
    capacity: 150,
    description: "A cozy venue known for hosting the best stand-up talent in the city",
    amenities: ["Full Bar", "Food Service", "Parking"],
    contactEmail: "info@haseeadda.com",
    contactPhone: "+91 98765 43210",
    rating: 4.8,
    reviewCount: 120,
    image: "/images/venues/hasee-adda.jpg",
    isAvailable: true
  },
  {
    id: 2,
    name: "Comedy Mela",
    location: "456 Mazaak Street, Delhi",
    capacity: 200,
    description: "Underground comedy club with an intimate atmosphere",
    amenities: ["Full Bar", "VIP Seating", "Wheelchair Access"],
    contactEmail: "bookings@comedymela.com",
    contactPhone: "+91 98765 12345",
    rating: 4.6,
    reviewCount: 85,
    image: "/images/venues/comedy-mela.jpg",
    isAvailable: true
  },
  {
    id: 3,
    name: "Sangeet Sandhya",
    location: "78 Raag Road, Bangalore",
    capacity: 180,
    description: "Premier music venue featuring top classical and contemporary artists",
    amenities: ["Full Bar", "Food Service", "VIP Seating"],
    contactEmail: "bookings@sangeetsandhya.com",
    contactPhone: "+91 80-4567-8901",
    rating: 4.7,
    reviewCount: 95,
    image: "/images/venues/sangeet-sandhya.jpg",
    isAvailable: true
  },
  {
    id: 4,
    name: "Nritya Mandir",
    location: "23 Kala Nagar, Kolkata",
    capacity: 220,
    description: "Historic dance venue with a vibrant atmosphere for all dance forms",
    amenities: ["Full Bar", "Food Service", "Merchandise"],
    contactEmail: "info@nrityamandir.com",
    contactPhone: "+91 33-2345-6789",
    rating: 4.9,
    reviewCount: 150,
    image: "/images/venues/nritya-mandir.jpg",
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
  
  updateRequestStatus: (id, status) => set((state) => {
    console.log(`Updating request ${id} to status: ${status}`);
    const updatedRequests = state.showRequests.map(request => 
      request.id === id ? { ...request, status } : request
    );
    console.log("Updated requests:", updatedRequests);
    return { showRequests: updatedRequests };
  }),
  
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
  }),
  
  applyToVenue: (venueId, performerId, title, description, date, time) => set((state) => {
    // Find the venue to get its name
    const venue = state.venues.find(v => v.id === venueId);
    if (!venue) {
      console.error("Venue not found with ID:", venueId);
      return state;
    }
    
    // Find performer (in a real app, this would come from auth)
    const performer = state.comedians.find(c => c.id === performerId) || {
      id: performerId,
      name: "Sarah Johnson"
    };
    
    // Create the new request with auto-approved status (removing admin approval)
    const newRequest = {
      id: state.showRequests.length + 1,
      venueId: venueId,
      venueName: venue.name,
      performerId: performerId,
      performerName: performer.name,
      title: title,
      description: description,
      date: date,
      time: time,
      status: 'pending', // Keep as pending so venue manager can approve
      createdAt: new Date().toISOString()
    };
    
    console.log("New show request created:", newRequest);
    
    return {
      ...state,
      showRequests: [...state.showRequests, newRequest]
    };
  })
}));

export default useDataStore;

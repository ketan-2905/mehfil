export interface IndianEvent {
  id: number;
  title: string;
  description: string;
  eventType: "music" | "dance" | "comedy" | "theater" | "festival" | "workshop" | "other";
  date: string;
  time: string;
  venue: {
    id: number;
    name: string;
    city: string;
    state: string;
  };
  performers: {
    id: number;
    name: string;
    artForm: string;
  }[];
  ticketPrice: string;
  imageUrl: string;
  duration: string;
  language?: string;
  ageRestriction?: string;
  tags?: string[];
  isFeatured?: boolean;
  ticketsAvailable?: number;
  ticketsSold?: number;
}

export const indianEvents: IndianEvent[] = [
  {
    id: 1,
    title: "Classical Fusion Night",
    description: "Experience the magic of Indian classical music fused with contemporary elements in this enchanting evening performance.",
    eventType: "music",
    date: "November 15, 2023",
    time: "7:00 PM",
    venue: {
      id: 1,
      name: "The Music Pavilion",
      city: "Mumbai",
      state: "Maharashtra"
    },
    performers: [
      {
        id: 3,
        name: "Zakir Rahman",
        artForm: "Tabla Maestro"
      },
      {
        id: 6,
        name: "Amrita Sitar",
        artForm: "Sitar Player"
      }
    ],
    ticketPrice: "₹1,200 - ₹3,500",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    duration: "2.5 hours",
    language: "Hindi, English",
    tags: ["Classical", "Fusion", "Instrumental"],
    isFeatured: true,
    ticketsAvailable: 250,
    ticketsSold: 180
  },
  {
    id: 2,
    title: "Bharatanatyam Showcase",
    description: "A mesmerizing showcase of the ancient dance form of Bharatanatyam, depicting stories from Indian mythology.",
    eventType: "dance",
    date: "November 20, 2023",
    time: "6:30 PM",
    venue: {
      id: 4,
      name: "Hasya Mandir",
      city: "Pune",
      state: "Maharashtra"
    },
    performers: [
      {
        id: 2,
        name: "Meera Bharatanatyam",
        artForm: "Classical Dancer"
      }
    ],
    ticketPrice: "₹800 - ₹2,000",
    imageUrl: "https://images.unsplash.com/photo-1503516459261-40c66117780a",
    duration: "2 hours",
    language: "Tamil, English",
    tags: ["Classical", "Dance", "Mythology"],
    ticketsAvailable: 150,
    ticketsSold: 95
  },
  {
    id: 3,
    title: "Punjabi Folk Festival",
    description: "Celebrate the vibrant culture of Punjab with energetic bhangra performances, folk music, and authentic cuisine.",
    eventType: "festival",
    date: "December 5, 2023",
    time: "4:00 PM",
    venue: {
      id: 5,
      name: "Laughter Lounge",
      city: "Hyderabad",
      state: "Telangana"
    },
    performers: [
      {
        id: 7,
        name: "Harpreet Singh",
        artForm: "Punjabi Folk Singer"
      }
    ],
    ticketPrice: "₹1,000 - ₹2,500",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
    duration: "5 hours",
    language: "Punjabi, Hindi",
    tags: ["Folk", "Festival", "Cultural"],
    isFeatured: true,
    ticketsAvailable: 400,
    ticketsSold: 320
  },
  {
    id: 4,
    title: "Sufi Night Under the Stars",
    description: "An ethereal evening of soulful Sufi music under the open sky, featuring renowned qawwali performers.",
    eventType: "music",
    date: "December 12, 2023",
    time: "8:00 PM",
    venue: {
      id: 7,
      name: "Kolkata Comedy Theatre",
      city: "Kolkata",
      state: "West Bengal"
    },
    performers: [
      {
        id: 11,
        name: "Kabir Sufi",
        artForm: "Sufi Singer"
      }
    ],
    ticketPrice: "₹1,500 - ₹4,000",
    imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
    duration: "3 hours",
    language: "Urdu, Hindi",
    tags: ["Sufi", "Qawwali", "Spiritual"],
    ticketsAvailable: 200,
    ticketsSold: 150
  },
  {
    id: 5,
    title: "Kathak-Flamenco Fusion",
    description: "A unique cross-cultural performance blending the intricate footwork of Kathak with the passionate movements of Flamenco.",
    eventType: "dance",
    date: "January 8, 2024",
    time: "7:30 PM",
    venue: {
      id: 2,
      name: "Canvas Laugh Club",
      city: "Delhi",
      state: "Delhi"
    },
    performers: [
      {
        id: 5,
        name: "Rajesh Kathak",
        artForm: "Kathak Dancer"
      }
    ],
    ticketPrice: "₹1,800 - ₹4,500",
    imageUrl: "https://images.unsplash.com/photo-1545959570-a94084071b5d",
    duration: "2 hours",
    language: "Hindi, English, Spanish",
    tags: ["Fusion", "Dance", "International"],
    isFeatured: true,
    ticketsAvailable: 180,
    ticketsSold: 110
  },
  {
    id: 6,
    title: "Carnatic Vocal Concert",
    description: "An immersive evening of South Indian classical music featuring intricate ragas and rhythmic patterns.",
    eventType: "music",
    date: "January 15, 2024",
    time: "6:00 PM",
    venue: {
      id: 3,
      name: "Chuckle House",
      city: "Bangalore",
      state: "Karnataka"
    },
    performers: [
      {
        id: 4,
        name: "Vani Ganapathy",
        artForm: "Carnatic Vocalist"
      }
    ],
    ticketPrice: "₹900 - ₹2,200",
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
    duration: "2.5 hours",
    language: "Kannada, Tamil, Telugu, Sanskrit",
    tags: ["Classical", "Vocal", "South Indian"],
    ticketsAvailable: 120,
    ticketsSold: 65
  },
  {
    id: 7,
    title: "Odissi Dance Drama",
    description: "A storytelling performance through the graceful movements of Odissi dance, depicting tales from ancient Indian epics.",
    eventType: "theater",
    date: "January 28, 2024",
    time: "7:00 PM",
    venue: {
      id: 8,
      name: "Jaipur Hasya Kendra",
      city: "Jaipur",
      state: "Rajasthan"
    },
    performers: [
      {
        id: 10,
        name: "Aditi Odissi",
        artForm: "Odissi Dancer"
      }
    ],
    ticketPrice: "₹700 - ₹1,800",
    imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498",
    duration: "2 hours",
    language: "Odia, Hindi, English",
    tags: ["Classical", "Dance Drama", "Mythology"],
    ticketsAvailable: 150,
    ticketsSold: 85
  },
  {
    id: 8,
    title: "Percussion Symphony",
    description: "A rhythmic extravaganza featuring various Indian percussion instruments in a collaborative performance.",
    eventType: "music",
    date: "February 10, 2024",
    time: "7:30 PM",
    venue: {
      id: 6,
      name: "Giggles Comedy Club",
      city: "Chennai",
      state: "Tamil Nadu"
    },
    performers: [
      {
        id: 3,
        name: "Zakir Rahman",
        artForm: "Tabla Maestro"
      },
      {
        id: 12,
        name: "Dhruv Pakhawaj",
        artForm: "Pakhawaj Player"
      }
    ],
    ticketPrice: "₹1,100 - ₹3,000",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    duration: "2 hours",
    language: "Universal",
    tags: ["Percussion", "Instrumental", "Collaborative"],
    ticketsAvailable: 200,
    ticketsSold: 120
  },
  {
    id: 9,
    title: "Bollywood Unplugged",
    description: "An intimate acoustic session featuring popular Bollywood songs reimagined with classical instruments.",
    eventType: "music",
    date: "February 18, 2024",
    time: "8:00 PM",
    venue: {
      id: 1,
      name: "The Music Pavilion",
      city: "Mumbai",
      state: "Maharashtra"
    },
    performers: [
      {
        id: 1,
        name: "Arijit Kapoor",
        artForm: "Bollywood Singer"
      }
    ],
    ticketPrice: "₹2,000 - ₹5,000",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    duration: "3 hours",
    language: "Hindi",
    tags: ["Bollywood", "Acoustic", "Popular"],
    isFeatured: true,
    ticketsAvailable: 300,
    ticketsSold: 280
  },
  {
    id: 10,
    title: "Kuchipudi Dance Workshop",
    description: "Learn the basics of Kuchipudi dance from master performers in this interactive workshop for beginners.",
    eventType: "workshop",
    date: "March 5, 2024",
    time: "10:00 AM",
    venue: {
      id: 5,
      name: "Laughter Lounge",
      city: "Hyderabad",
      state: "Telangana"
    },
    performers: [
      {
        id: 8,
        name: "Kuchipudi Sisters",
        artForm: "Kuchipudi Dancers"
      }
    ],
    ticketPrice: "₹1,500",
    imageUrl: "https://images.unsplash.com/photo-1504699532015-2ce0ce3fb025",
    duration: "4 hours",
    language: "Telugu, English",
    tags: ["Workshop", "Dance", "Learning"],
    ageRestriction: "8+",
    ticketsAvailable: 30,
    ticketsSold: 18
  },
  {
    id: 11,
    title: "Bansuri Meditation Retreat",
    description: "A day-long retreat featuring meditation sessions accompanied by the soothing sounds of the bansuri flute.",
    eventType: "workshop",
    date: "March 12, 2024",
    time: "9:00 AM",
    venue: {
      id: 4,
      name: "Hasya Mandir",
      city: "Pune",
      state: "Maharashtra"
    },
    performers: [
      {
        id: 9,
        name: "Vishnu Flute",
        artForm: "Bansuri Player"
      }
    ],
    ticketPrice: "₹2,500",
    imageUrl: "https://images.unsplash.com/photo-1621368286550-f54551f39b91",
    duration: "8 hours",
    language: "Hindi, English",
    tags: ["Meditation", "Spiritual", "Wellness"],
    ticketsAvailable: 40,
    ticketsSold: 25
  },
  {
    id: 12,
    title: "Indian Cultural Festival",
    description: "A grand celebration of Indian arts featuring multiple performances across music, dance, and theater.",
    eventType: "festival",
    date: "March 25-27, 2024",
    time: "11:00 AM - 10:00 PM",
    venue: {
      id: 2,
      name: "Canvas Laugh Club",
      city: "Delhi",
      state: "Delhi"
    },
    performers: [
      {
        id: 1,
        name: "Arijit Kapoor",
        artForm: "Bollywood Singer"
      },
      {
        id: 5,
        name: "Rajesh Kathak",
        artForm: "Kathak Dancer"
      },
      {
        id: 11,
        name: "Kabir Sufi",
        artForm: "Sufi Singer"
      }
    ],
    ticketPrice: "₹3,000 - ₹8,000",
    imageUrl: "https://images.unsplash.com/photo-1533669955142-6a73332af4db",
    duration: "3 days",
    language: "Multiple",
    tags: ["Festival", "Cultural", "Multi-genre"],
    isFeatured: true,
    ticketsAvailable: 1000,
    ticketsSold: 650
  }
];
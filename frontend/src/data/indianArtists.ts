export interface IndianArtist {
  id: number;
  name: string;
  artForm: "singer" | "dancer" | "instrumentalist" | "comedian" | "actor" | "other";
  specialty: string;
  city: string;
  state: string;
  description: string;
  experience: number;
  rating: number;
  imageUrl: string;
  socialMedia?: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
  awards?: string[];
  performances?: number;
  bookingRate?: string;
  languages?: string[];
}

export const indianArtists: IndianArtist[] = [
  {
    id: 1,
    name: "Arijit Kapoor",
    artForm: "singer",
    specialty: "Bollywood Playback",
    city: "Mumbai",
    state: "Maharashtra",
    description: "Renowned playback singer with a soulful voice that has become the soundtrack of modern Bollywood romance.",
    experience: 12,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    socialMedia: {
      instagram: "@arijitkapoor",
      youtube: "ArijitKapoorOfficial",
      spotify: "arijitkapoor"
    },
    awards: ["Filmfare Award for Best Male Playback Singer", "IIFA Award for Best Male Vocalist"],
    performances: 250,
    bookingRate: "₹5,00,000-₹15,00,000",
    languages: ["Hindi", "Bengali", "Tamil", "Telugu"]
  },
  {
    id: 2,
    name: "Meera Bharatanatyam",
    artForm: "dancer",
    specialty: "Classical Bharatanatyam",
    city: "Chennai",
    state: "Tamil Nadu",
    description: "Graceful classical dancer who has mastered the ancient art of Bharatanatyam and performs globally.",
    experience: 20,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    socialMedia: {
      instagram: "@meerabharatanatyam",
      youtube: "MeeraDanceAcademy"
    },
    awards: ["Sangeet Natak Akademi Award", "Padma Shri"],
    performances: 180,
    bookingRate: "₹2,00,000-₹5,00,000",
    languages: ["Tamil", "English", "Hindi"]
  },
  {
    id: 3,
    name: "Zakir Rahman",
    artForm: "instrumentalist",
    specialty: "Tabla Maestro",
    city: "Delhi",
    state: "Delhi",
    description: "Virtuoso tabla player who has revolutionized the percussion scene with his innovative techniques and collaborations.",
    experience: 30,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    socialMedia: {
      instagram: "@zakirrahmanofficial",
      youtube: "ZakirRahmanTabla",
      spotify: "zakirrahman"
    },
    awards: ["Grammy Award", "Padma Bhushan", "Sangeet Natak Akademi Award"],
    performances: 500,
    bookingRate: "₹8,00,000-₹20,00,000",
    languages: ["Hindi", "Urdu", "English"]
  },
  {
    id: 4,
    name: "Vani Ganapathy",
    artForm: "singer",
    specialty: "Carnatic Vocalist",
    city: "Bangalore",
    state: "Karnataka",
    description: "Mesmerizing Carnatic vocalist known for her perfect pitch and ability to blend traditional ragas with contemporary elements.",
    experience: 15,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1549213783-8284d0336c4f",
    socialMedia: {
      instagram: "@vaniganapathy",
      youtube: "VaniGanapathyMusic"
    },
    awards: ["Karnataka Rajyotsava Award", "Sangeet Natak Akademi Award"],
    performances: 200,
    bookingRate: "₹1,50,000-₹4,00,000",
    languages: ["Kannada", "Tamil", "Telugu", "Sanskrit"]
  },
  {
    id: 5,
    name: "Rajesh Kathak",
    artForm: "dancer",
    specialty: "Kathak",
    city: "Lucknow",
    state: "Uttar Pradesh",
    description: "Master of the Lucknow Gharana of Kathak, known for his intricate footwork and expressive abhinaya.",
    experience: 25,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1535525153412-5a42439a210d",
    socialMedia: {
      instagram: "@rajeshkathak",
      youtube: "RajeshKathakOfficial"
    },
    awards: ["Sangeet Natak Akademi Award", "Uttar Pradesh Sangeet Natak Akademi Award"],
    performances: 300,
    bookingRate: "₹2,50,000-₹6,00,000",
    languages: ["Hindi", "Urdu", "English"]
  },
  {
    id: 6,
    name: "Amrita Sitar",
    artForm: "instrumentalist",
    specialty: "Sitar Player",
    city: "Kolkata",
    state: "West Bengal",
    description: "Acclaimed sitar player who has taken the classical instrument to global audiences with her innovative compositions.",
    experience: 18,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
    socialMedia: {
      instagram: "@amritasitar",
      youtube: "AmritaSitarMusic",
      spotify: "amritasitar"
    },
    awards: ["Bengal Music Award", "Global Indian Music Academy Award"],
    performances: 220,
    bookingRate: "₹3,00,000-₹7,00,000",
    languages: ["Bengali", "Hindi", "English"]
  },
  {
    id: 7,
    name: "Harpreet Singh",
    artForm: "singer",
    specialty: "Punjabi Folk",
    city: "Amritsar",
    state: "Punjab",
    description: "Energetic Punjabi folk singer who has brought traditional Punjabi music to mainstream audiences.",
    experience: 10,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    socialMedia: {
      instagram: "@harpreetsinghmusic",
      youtube: "HarpreetSinghOfficial",
      spotify: "harpreetsingh"
    },
    awards: ["PTC Punjabi Music Award", "Brit Asia TV Music Award"],
    performances: 180,
    bookingRate: "₹2,00,000-₹5,00,000",
    languages: ["Punjabi", "Hindi", "English"]
  },
  {
    id: 8,
    name: "Kuchipudi Sisters",
    artForm: "dancer",
    specialty: "Kuchipudi Duo",
    city: "Hyderabad",
    state: "Telangana",
    description: "Sibling duo who have revitalized the ancient dance form of Kuchipudi with their synchronized performances.",
    experience: 15,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1504699532015-2ce0ce3fb025",
    socialMedia: {
      instagram: "@kuchipudisisters",
      youtube: "KuchipudiSistersOfficial"
    },
    awards: ["Nritya Shiromani", "Telangana State Cultural Award"],
    performances: 150,
    bookingRate: "₹2,50,000-₹6,00,000",
    languages: ["Telugu", "Hindi", "English"]
  },
  {
    id: 9,
    name: "Vishnu Flute",
    artForm: "instrumentalist",
    specialty: "Bansuri (Flute) Player",
    city: "Varanasi",
    state: "Uttar Pradesh",
    description: "Spiritual flautist whose melodies on the bansuri transport listeners to a meditative state.",
    experience: 22,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1621368286550-f54551f39b91",
    socialMedia: {
      instagram: "@vishnuflute",
      youtube: "VishnuFluteOfficial",
      spotify: "vishnuflute"
    },
    awards: ["Uttar Pradesh Sangeet Natak Akademi Award", "Tansen Samman"],
    performances: 250,
    bookingRate: "₹1,50,000-₹4,00,000",
    languages: ["Hindi", "Sanskrit"]
  },
  {
    id: 10,
    name: "Aditi Odissi",
    artForm: "dancer",
    specialty: "Odissi",
    city: "Bhubaneswar",
    state: "Odisha",
    description: "Graceful Odissi dancer who embodies the sculptural poses and fluid movements of this ancient dance form.",
    experience: 16,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498",
    socialMedia: {
      instagram: "@aditiodissi",
      youtube: "AditiOdissiDance"
    },
    awards: ["Odisha State Award for Dance", "Yuva Pratibha"],
    performances: 120,
    bookingRate: "₹1,00,000-₹3,00,000",
    languages: ["Odia", "Hindi", "English"]
  },
  {
    id: 11,
    name: "Kabir Sufi",
    artForm: "singer",
    specialty: "Sufi & Qawwali",
    city: "Ajmer",
    state: "Rajasthan",
    description: "Soulful Sufi singer whose powerful vocals carry forward the rich tradition of qawwali music.",
    experience: 20,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f",
    socialMedia: {
      instagram: "@kabirsufi",
      youtube: "KabirSufiMusic",
      spotify: "kabirsufi"
    },
    awards: ["Rajasthan Sangeet Natak Akademi Award", "GIMA Award for Best Sufi Album"],
    performances: 300,
    bookingRate: "₹3,00,000-₹8,00,000",
    languages: ["Urdu", "Hindi", "Persian", "Punjabi"]
  },
  {
    id: 12,
    name: "Dhruv Pakhawaj",
    artForm: "instrumentalist",
    specialty: "Pakhawaj & Mridangam",
    city: "Pune",
    state: "Maharashtra",
    description: "Versatile percussionist who has mastered both the North Indian pakhawaj and South Indian mridangam.",
    experience: 14,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1461784180009-27c1303a64b6",
    socialMedia: {
      instagram: "@dhruvpakhawaj",
      youtube: "DhruvRhythms"
    },
    awards: ["Taal Ratna Award", "Maharashtra State Award for Music"],
    performances: 180,
    bookingRate: "₹1,00,000-₹3,00,000",
    languages: ["Marathi", "Hindi", "Tamil"]
  }
];
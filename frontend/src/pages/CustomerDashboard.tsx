
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, MapPin, Calendar, Tag, User, Filter, ChevronRight, 
  Star, Ticket, Clock, Heart, Music, ArrowUpDown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [activeFilters, setActiveFilters] = useState({
    date: null,
    location: null,
    genre: null,
    artist: null
  });

  const filterOptions = {
    dates: ["Today", "This Weekend", "Next Week", "This Month"],
    locations: ["San Francisco", "New York", "Chicago", "Los Angeles", "Miami"],
    genres: ["Stand-up", "Improv", "Sketch", "Musical Comedy", "Alternative"],
    artists: ["Sarah Johnson", "Mike Rodriguez", "Lisa Wong", "David Chen"]
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Late Night Laughs",
      venue: "The Laughing Pint",
      location: "San Francisco, CA",
      date: "Nov 15, 2023",
      time: "9:30 PM",
      price: "$25",
      genre: "Stand-up",
      artist: "Sarah Johnson",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      id: 2,
      title: "Improv Madness",
      venue: "Comedy Cellar",
      location: "New York, NY",
      date: "Nov 18, 2023",
      time: "8:00 PM",
      price: "$30",
      genre: "Improv",
      artist: "Mike Rodriguez",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      id: 3,
      title: "Comedy Battle Royale",
      venue: "Chuckles Comedy Club",
      location: "Chicago, IL",
      date: "Nov 22, 2023",
      time: "7:30 PM",
      price: "$35",
      genre: "Stand-up",
      artist: "Lisa Wong",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    },
    {
      id: 4,
      title: "Musical Comedy Night",
      venue: "Laugh Factory",
      location: "Los Angeles, CA",
      date: "Nov 25, 2023",
      time: "8:00 PM",
      price: "$40",
      genre: "Musical Comedy",
      artist: "David Chen",
      rating: "4.6",
      image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852",
    },
    {
      id: 5,
      title: "Weekend Laughs",
      venue: "The Comedy Store",
      location: "Miami, FL",
      date: "Nov 28, 2023",
      time: "9:00 PM",
      price: "$35",
      genre: "Alternative",
      artist: "Sarah Johnson",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1508997449629-303059a039c0",
    },
    {
      id: 6,
      title: "Comedy Club Special",
      venue: "The Stand",
      location: "New York, NY",
      date: "Dec 2, 2023",
      time: "7:00 PM",
      price: "$30",
      genre: "Stand-up",
      artist: "Mike Rodriguez",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    }
  ];

  const topArtists = [
    {
      id: 1,
      name: "Sarah Johnson",
      genre: "Stand-up",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      genre: "Improv",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Lisa Wong",
      genre: "Alternative",
      rating: 4.9,
    },
  ];

  // Toggle filter selection
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? null : value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      date: null,
      location: null,
      genre: null,
      artist: null
    });
  };

  // Filter events based on active filters
  const filteredEvents = upcomingEvents.filter(event => {
    if (activeFilters.location && !event.location.includes(activeFilters.location)) return false;
    if (activeFilters.genre && event.genre !== activeFilters.genre) return false;
    if (activeFilters.artist && event.artist !== activeFilters.artist) return false;
    // Date filtering would need more complex logic in a real app
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Discover Comedy Events</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-orange focus:border-transparent"
                />
              </div>
            </AnimatedElement>
          </div>
          
          {/* Dashboard navigation */}
          <div className="mb-8 border-b border-white/10">
            <nav className="flex overflow-x-auto scrollbar-none">
              {["discover", "tickets", "favorites", "history", "profile"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab 
                      ? "border-comedy-orange text-white" 
                      : "border-transparent text-muted-foreground hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Filters Section */}
          <AnimatedElement animation="slide-up" delay={300}>
            <GlassCard className="p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                {Object.values(activeFilters).some(v => v !== null) && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-comedy-orange hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Date Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-comedy-red" />
                    <h3 className="font-medium">Date</h3>
                  </div>
                  <div className="space-y-1">
                    {filterOptions.dates.map(date => (
                      <button
                        key={date}
                        onClick={() => toggleFilter('date', date)}
                        className={`block w-full text-left px-3 py-1.5 rounded-md text-sm ${
                          activeFilters.date === date
                            ? 'bg-comedy-red/20 text-comedy-red'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Location Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-comedy-purple" />
                    <h3 className="font-medium">Location</h3>
                  </div>
                  <div className="space-y-1">
                    {filterOptions.locations.map(location => (
                      <button
                        key={location}
                        onClick={() => toggleFilter('location', location)}
                        className={`block w-full text-left px-3 py-1.5 rounded-md text-sm ${
                          activeFilters.location === location
                            ? 'bg-comedy-purple/20 text-comedy-purple'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Genre Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={16} className="text-comedy-orange" />
                    <h3 className="font-medium">Genre</h3>
                  </div>
                  <div className="space-y-1">
                    {filterOptions.genres.map(genre => (
                      <button
                        key={genre}
                        onClick={() => toggleFilter('genre', genre)}
                        className={`block w-full text-left px-3 py-1.5 rounded-md text-sm ${
                          activeFilters.genre === genre
                            ? 'bg-comedy-orange/20 text-comedy-orange'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Artist Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-comedy-magenta" />
                    <h3 className="font-medium">Artist</h3>
                  </div>
                  <div className="space-y-1">
                    {filterOptions.artists.map(artist => (
                      <button
                        key={artist}
                        onClick={() => toggleFilter('artist', artist)}
                        className={`block w-full text-left px-3 py-1.5 rounded-md text-sm ${
                          activeFilters.artist === artist
                            ? 'bg-comedy-magenta/20 text-comedy-magenta'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        {artist}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredEvents.length} events
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Filter size={16} className="mr-2" />
                    More Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown size={16} className="mr-2" />
                    Sort
                  </Button>
                </div>
              </div>
            </GlassCard>
          </AnimatedElement>
          
          {/* Events Grid */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <AnimatedElement key={event.id} animation="slide-up" delay={400 + (index * 100)}>
                  <GlassCard className="overflow-hidden h-full flex flex-col">
                    <div 
                      className="h-48 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${event.image})` }}
                    >
                      <div className="p-3 flex justify-between">
                        <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {event.genre}
                        </span>
                        <button className="bg-black/50 text-white p-1.5 rounded-full">
                          <Heart size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold">{event.title}</h3>
                        <div className="flex items-center bg-comedy-dark px-2 py-1 rounded text-sm">
                          <Star size={14} className="text-comedy-orange mr-1" />
                          <span>{event.rating}</span>
                        </div>
                      </div>
                      <p className="text-comedy-purple mb-1">{event.venue}</p>
                      <div className="text-sm text-muted-foreground mb-4 flex flex-col gap-1">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {event.date} • {event.time}
                        </div>
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          {event.artist}
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-medium">{event.price}</span>
                        <Button size="sm">Book Tickets</Button>
                      </div>
                    </div>
                  </GlassCard>
                </AnimatedElement>
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12 bg-white/5 rounded-lg">
                <Search size={40} className="mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
            
            {filteredEvents.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline">Load More Events</Button>
              </div>
            )}
          </div>
          
          {/* Top Artists */}
          <AnimatedElement animation="slide-up" delay={800}>
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Featured Artists</h2>
                <Link to="/artists" className="text-sm text-comedy-orange hover:underline flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topArtists.map((artist) => (
                  <div key={artist.id} className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-comedy-darker flex items-center justify-center">
                      <User size={24} className="text-comedy-orange" />
                    </div>
                    <h3 className="font-bold">{artist.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{artist.genre}</p>
                    <div className="flex items-center justify-center">
                      <Star size={14} className="text-comedy-orange mr-1" />
                      <span>{artist.rating}</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      View Shows
                    </Button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </AnimatedElement>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;

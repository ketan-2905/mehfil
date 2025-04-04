import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, MapPin, Users, Clock, Tag, Filter, ChevronRight, Ticket, Music, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import { indianEvents, IndianEvent } from "@/data/indianEvents";

const IndianEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter events based on search term and active filter
  const filteredEvents = indianEvents.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.performers.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
    if (!activeFilter) return matchesSearch;
    
    // Additional filters
    switch(activeFilter) {
      case "music": return matchesSearch && event.eventType === "music";
      case "dance": return matchesSearch && event.eventType === "dance";
      case "festival": return matchesSearch && event.eventType === "festival";
      case "workshop": return matchesSearch && event.eventType === "workshop";
      case "featured": return matchesSearch && event.isFeatured === true;
      default: return matchesSearch;
    }
  });

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  // Get event type icon
  const getEventTypeIcon = (eventType: string) => {
    switch(eventType) {
      case "music": return "🎵";
      case "dance": return "💃";
      case "comedy": return "😂";
      case "theater": return "🎭";
      case "festival": return "🎪";
      case "workshop": return "🧠";
      default: return "🎨";
    }
  };

  // Featured events
  const featuredEvents = indianEvents.filter(event => event.isFeatured);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Indian Cultural Events</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </AnimatedElement>
          </div>
          
          {/* Featured Events Carousel */}
          {featuredEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.slice(0, 3).map((event, index) => (
                  <AnimatedElement 
                    key={event.id} 
                    animation="slide-up" 
                    delay={300 + (index * 100)}
                  >
                    <FeaturedEventCard event={event} />
                  </AnimatedElement>
                ))}
              </div>
            </div>
          )}
          
          {/* Filters */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Discover Events</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            </div>
            
            {showFilters && (
              <AnimatedElement animation="fade-in" className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={activeFilter === "music" ? "primary" : "outline"}
                    onClick={() => toggleFilter("music")}
                  >
                    Music
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "dance" ? "primary" : "outline"}
                    onClick={() => toggleFilter("dance")}
                  >
                    Dance
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "festival" ? "primary" : "outline"}
                    onClick={() => toggleFilter("festival")}
                  >
                    Festivals
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "workshop" ? "primary" : "outline"}
                    onClick={() => toggleFilter("workshop")}
                  >
                    Workshops
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "featured" ? "primary" : "outline"}
                    onClick={() => toggleFilter("featured")}
                  >
                    Featured
                  </Button>
                </div>
              </AnimatedElement>
            )}
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <AnimatedElement 
                key={event.id} 
                animation="slide-up" 
                delay={300 + (index * 100)}
              >
                <EventCard event={event} />
              </AnimatedElement>
            ))}
            
            {filteredEvents.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Cultural Significance Section */}
          <div className="mt-16">
            <AnimatedElement animation="slide-up">
              <h2 className="text-2xl font-bold mb-6">Celebrating Indian Cultural Heritage</h2>
              
              <GlassCard className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-comedy-red/20 rounded-full p-4 mb-4">
                      <Music className="text-comedy-red" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Diverse Art Forms</h3>
                    <p className="text-muted-foreground">Experience the rich tapestry of Indian performing arts from classical to contemporary</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-comedy-purple/20 rounded-full p-4 mb-4">
                      <Calendar className="text-comedy-purple" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Year-round Celebrations</h3>
                    <p className="text-muted-foreground">Discover events that showcase India's cultural heritage throughout the calendar</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-comedy-orange/20 rounded-full p-4 mb-4">
                      <Star className="text-comedy-orange" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">World-class Performers</h3>
                    <p className="text-muted-foreground">Witness performances by India's most talented and acclaimed artists</p>
                  </div>
                </div>
              </GlassCard>
            </AnimatedElement>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Featured Event Card Component
const FeaturedEventCard = ({ event }: { event: IndianEvent }) => {
  return (
    <GlassCard className="h-full flex flex-col overflow-hidden relative">
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-comedy-red text-white text-xs font-bold px-3 py-1 rounded-full">
          Featured
        </span>
      </div>
      <div 
        className="h-56 bg-cover bg-center" 
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <div>
            <div className="flex items-center mb-1">
              <span className="mr-2">{getEventTypeIcon(event.eventType)}</span>
              <span className="text-sm text-white/90 capitalize">{event.eventType}</span>
              <span className="mx-2">•</span>
              <Calendar size={14} className="text-comedy-red mr-1" />
              <span className="text-sm text-white/90">{event.date}</span>
            </div>
            <h3 className="text-xl font-bold">{event.title}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex items-center mb-4">
          <MapPin size={16} className="text-comedy-red mr-2" />
          <span className="text-sm">{event.venue.name}, {event.venue.city}</span>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center mb-4">
          <Users size={16} className="text-comedy-purple mr-2" />
          <span className="text-sm">
            {event.performers.map(p => p.name).join(", ")}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock size={16} className="text-comedy-orange mr-2" />
            <span className="text-sm">{event.duration}</span>
          </div>
          <div className="text-sm font-medium text-comedy-red">
            {event.ticketPrice}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags && event.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-xs bg-white/5 border border-white/10 rounded-full px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="bg-white/5 rounded-md p-2 text-center mb-4">
          <div className="text-comedy-purple font-semibold">
            {event.ticketsAvailable && event.ticketsSold ? 
              `${event.ticketsAvailable - event.ticketsSold} tickets left` : 
              "Tickets available"}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <Link to={`/event/${event.id}`}>
          <Button className="w-full">
            Book Tickets
            <Ticket size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
};

// Standard Event Card Component
const EventCard = ({ event }: { event: IndianEvent }) => {
  return (
    <GlassCard className="h-full flex flex-col overflow-hidden">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <div>
            <div className="flex items-center mb-1">
              <span className="mr-2">{getEventTypeIcon(event.eventType)}</span>
              <span className="text-sm text-white/90 capitalize">{event.eventType}</span>
              <span className="mx-2">•</span>
              <Calendar size={14} className="text-comedy-red mr-1" />
              <span className="text-sm text-white/90">{event.date}</span>
            </div>
            <h3 className="text-xl font-bold">{event.title}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex items-center mb-4">
          <MapPin size={16} className="text-comedy-red mr-2" />
          <span className="text-sm">{event.venue.name}, {event.venue.city}</span>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center mb-4">
          <Users size={16} className="text-comedy-purple mr-2" />
          <span className="text-sm">
            {event.performers.map(p => p.name).join(", ")}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock size={16} className="text-comedy-orange mr-2" />
            <span className="text-sm">{event.duration}</span>
          </div>
          <div className="text-sm font-medium text-comedy-red">
            {event.ticketPrice}
          </div>
        </div>
        
        {event.tags && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.map((tag, i) => (
              <span 
                key={i} 
                className="text-xs bg-comedy-dark rounded-full px-2 py-0.5 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {event.language && (
          <div className="text-sm text-muted-foreground mb-2">
            Language: <span className="text-white">{event.language}</span>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-white/10">
        <Link to={`/event/${event.id}`}>
          <Button className="w-full">
            View Details
            <ChevronRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
};

// Helper function to get event type icon
const getEventTypeIcon = (eventType: string) => {
  switch(eventType) {
    case "music": return "🎵";
    case "dance": return "💃";
    case "comedy": return "😂";
    case "theater": return "🎭";
    case "festival": return "🎪";
    case "workshop": return "🧠";
    default: return "🎨";
  }
};

export default IndianEvents;
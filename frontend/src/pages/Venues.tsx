import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Users, Star, Calendar, Filter, ChevronRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import { indianVenues, IndianVenue } from "@/data/indianVenues";

const Venues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter venues based on search term and active filter
  const filteredVenues = indianVenues.filter(venue => {
    const matchesSearch = 
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.state.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (!activeFilter) return matchesSearch;
    
    // Additional filters
    switch(activeFilter) {
      case "mumbai": return matchesSearch && venue.city.toLowerCase() === "mumbai";
      case "delhi": return matchesSearch && venue.city.toLowerCase() === "delhi";
      case "bangalore": return matchesSearch && venue.city.toLowerCase() === "bangalore";
      case "high-capacity": return matchesSearch && venue.capacity >= 180;
      case "top-rated": return matchesSearch && venue.rating >= 4.7;
      default: return matchesSearch;
    }
  });

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Indian Comedy Venues</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search venues..." 
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </AnimatedElement>
          </div>
          
          {/* Filters */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Discover Venues</h2>
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
                    variant={activeFilter === "mumbai" ? "primary" : "outline"}
                    onClick={() => toggleFilter("mumbai")}
                  >
                    Mumbai
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "delhi" ? "primary" : "outline"}
                    onClick={() => toggleFilter("delhi")}
                  >
                    Delhi
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "bangalore" ? "primary" : "outline"}
                    onClick={() => toggleFilter("bangalore")}
                  >
                    Bangalore
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "high-capacity" ? "primary" : "outline"}
                    onClick={() => toggleFilter("high-capacity")}
                  >
                    Large Venues (180+)
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "top-rated" ? "primary" : "outline"}
                    onClick={() => toggleFilter("top-rated")}
                  >
                    Top Rated (4.7+)
                  </Button>
                </div>
              </AnimatedElement>
            )}
          </div>
          
          {/* Venues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, index) => (
              <AnimatedElement 
                key={venue.id} 
                animation="slide-up" 
                delay={300 + (index * 100)}
              >
                <VenueCard venue={venue} />
              </AnimatedElement>
            ))}
            
            {filteredVenues.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No venues found matching your criteria.</p>
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
          
          {/* Featured Section */}
          <div className="mt-16">
            <AnimatedElement animation="slide-up">
              <h2 className="text-2xl font-bold mb-6">Why Choose Indian Comedy Venues?</h2>
              
              <GlassCard className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-comedy-red/20 rounded-full p-4 mb-4">
                      <Star className="text-comedy-red" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Rich Cultural Experience</h3>
                    <p className="text-muted-foreground">Blend of traditional Indian humor with modern comedy formats</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-comedy-purple/20 rounded-full p-4 mb-4">
                      <Users className="text-comedy-purple" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Diverse Audiences</h3>
                    <p className="text-muted-foreground">Multilingual shows catering to various regional preferences</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-comedy-orange/20 rounded-full p-4 mb-4">
                      <Calendar className="text-comedy-orange" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Year-round Events</h3>
                    <p className="text-muted-foreground">Regular shows featuring both established and emerging talent</p>
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

// Venue Card Component
const VenueCard = ({ venue }: { venue: IndianVenue }) => {
  return (
    <GlassCard className="h-full flex flex-col overflow-hidden">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${venue.imageUrl})` }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <div>
            <div className="flex items-center mb-1">
              <MapPin size={14} className="text-comedy-red mr-1" />
              <span className="text-sm text-white/90">{venue.city}, {venue.state}</span>
            </div>
            <h3 className="text-xl font-bold">{venue.name}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-muted-foreground mb-4 line-clamp-2">{venue.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {venue.amenities.slice(0, 3).map((amenity, i) => (
            <span 
              key={i} 
              className="text-xs bg-white/5 border border-white/10 rounded-full px-2 py-1"
            >
              {amenity}
            </span>
          ))}
          {venue.amenities.length > 3 && (
            <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2 py-1">
              +{venue.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-white/5 rounded-md p-2 text-center">
            <div className="text-comedy-red font-semibold">{venue.capacity}</div>
            <div className="text-xs text-muted-foreground">Capacity</div>
          </div>
          <div className="bg-white/5 rounded-md p-2 text-center">
            <div className="text-comedy-purple font-semibold">{venue.rating}/5</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>Price Range: <span className="text-white">{venue.priceRange}</span></div>
          {venue.upcomingEvents && (
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{venue.upcomingEvents} upcoming</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <Link to={`/venue/${venue.id}`}>
          <Button className="w-full">
            View Details
            <ChevronRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
};

export default Venues;
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Music, Star, Award, Filter, ChevronRight, Instagram, Youtube, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import { indianArtists, IndianArtist } from "@/data/indianArtists";

const IndianArtists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter artists based on search term and active filter
  const filteredArtists = indianArtists.filter(artist => {
    const matchesSearch = 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (!activeFilter) return matchesSearch;
    
    // Additional filters
    switch(activeFilter) {
      case "singer": return matchesSearch && artist.artForm === "singer";
      case "dancer": return matchesSearch && artist.artForm === "dancer";
      case "instrumentalist": return matchesSearch && artist.artForm === "instrumentalist";
      case "top-rated": return matchesSearch && artist.rating >= 4.8;
      case "experienced": return matchesSearch && artist.experience >= 20;
      default: return matchesSearch;
    }
  });

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  // Get art form icon
  const getArtFormIcon = (artForm: string) => {
    switch(artForm) {
      case "singer": return "🎤";
      case "dancer": return "💃";
      case "instrumentalist": return "🎵";
      case "comedian": return "😂";
      case "actor": return "🎭";
      default: return "🎪";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Indian Performing Artists</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search artists..." 
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
              <h2 className="text-xl font-semibold">Discover Artists</h2>
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
                    variant={activeFilter === "singer" ? "primary" : "outline"}
                    onClick={() => toggleFilter("singer")}
                    className={`hover:bg-comedy-red/20 ${activeFilter === "singer" ? "bg-comedy-red/20" : ""}`}
                  >
                    <Music size={16} className="mr-2" />
                    Singers
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "dancer" ? "primary" : "outline"}
                    onClick={() => toggleFilter("dancer")}
                    className={`hover:bg-comedy-purple/20 ${activeFilter === "dancer" ? "bg-comedy-purple/20" : ""}`}
                  >
                    <Music size={16} className="mr-2" />
                    Dancers
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "instrumentalist" ? "primary" : "outline"}
                    onClick={() => toggleFilter("instrumentalist")}
                    className={`hover:bg-comedy-orange/20 ${activeFilter === "instrumentalist" ? "bg-comedy-orange/20" : ""}`}
                  >
                    <Music size={16} className="mr-2" />
                    Instrumentalists
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "top-rated" ? "primary" : "outline"}
                    onClick={() => toggleFilter("top-rated")}
                    className={`hover:bg-comedy-red/20 ${activeFilter === "top-rated" ? "bg-comedy-red/20" : ""}`}
                  >
                    <Star size={16} className="mr-2" />
                    Top Rated (4.8+)
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === "experienced" ? "primary" : "outline"}
                    onClick={() => toggleFilter("experienced")}
                    className={`hover:bg-comedy-purple/20 ${activeFilter === "experienced" ? "bg-comedy-purple/20" : ""}`}
                  >
                    <Award size={16} className="mr-2" />
                    Experienced (20+ years)
                  </Button>
                </div>
              </AnimatedElement>
            )}
          </div>
          
          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist, index) => (
              <AnimatedElement 
                key={artist.id} 
                animation="slide-up" 
                delay={300 + (index * 100)}
              >
                <ArtistCard artist={artist} />
              </AnimatedElement>
            ))}
            
            {filteredArtists.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No artists found matching your criteria.</p>
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
              <h2 className="text-2xl font-bold mb-6">The Rich Heritage of Indian Performing Arts</h2>
              
              <GlassCard className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-comedy-red/20 rounded-full p-4 mb-4">
                      <Music className="text-comedy-red" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Classical Traditions</h3>
                    <p className="text-muted-foreground">Centuries-old art forms passed down through generations of dedicated practitioners</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-comedy-purple/20 rounded-full p-4 mb-4">
                      <Star className="text-comedy-purple" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Contemporary Fusion</h3>
                    <p className="text-muted-foreground">Modern artists blending traditional techniques with global influences</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-comedy-orange/20 rounded-full p-4 mb-4">
                      <Award className="text-comedy-orange" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Award-Winning Talent</h3>
                    <p className="text-muted-foreground">Internationally recognized performers representing India's cultural excellence</p>
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

// Artist Card Component
const ArtistCard = ({ artist }: { artist: IndianArtist }) => {
  return (
    <GlassCard className="h-full flex flex-col overflow-hidden">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${artist.imageUrl})` }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <div>
            <div className="flex items-center mb-1">
              <span className="mr-2">{getArtFormIcon(artist.artForm)}</span>
              <span className="text-sm text-white/90 capitalize">{artist.artForm}</span>
              <span className="mx-2">•</span>
              <MapPin size={14} className="text-comedy-red mr-1" />
              <span className="text-sm text-white/90">{artist.city}</span>
            </div>
            <h3 className="text-xl font-bold">{artist.name}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex items-center mb-2">
          <span className="text-comedy-red font-medium">{artist.specialty}</span>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{artist.description}</p>
        
        {artist.awards && artist.awards.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Award size={16} className="text-comedy-orange mr-2" />
              <span className="text-sm font-medium">Notable Awards</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {artist.awards.slice(0, 2).map((award, i) => (
                <span 
                  key={i} 
                  className="text-xs bg-white/5 border border-white/10 rounded-full px-2 py-1"
                >
                  {award}
                </span>
              ))}
              {artist.awards.length > 2 && (
                <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2 py-1">
                  +{artist.awards.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-white/5 rounded-md p-2 text-center">
            <div className="text-comedy-purple font-semibold">{artist.experience} years</div>
            <div className="text-xs text-muted-foreground">Experience</div>
          </div>
          <div className="bg-white/5 rounded-md p-2 text-center">
            <div className="text-comedy-red font-semibold">{artist.rating}/5</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
        </div>
        
        {artist.languages && (
          <div className="flex flex-wrap gap-1 mb-4">
            {artist.languages.map((lang, i) => (
              <span 
                key={i} 
                className="text-xs bg-comedy-dark rounded-full px-2 py-0.5 text-muted-foreground"
              >
                {lang}
              </span>
            ))}
          </div>
        )}
        
        {artist.socialMedia && (
          <div className="flex gap-2 mb-2">
            {artist.socialMedia.instagram && (
              <a 
                href={`https://instagram.com/${artist.socialMedia.instagram}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Instagram size={16} />
              </a>
            )}
            {artist.socialMedia.youtube && (
              <a 
                href={`https://youtube.com/${artist.socialMedia.youtube}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Youtube size={16} />
              </a>
            )}
          </div>
        )}
        
        {artist.bookingRate && (
          <div className="text-sm text-muted-foreground">
            Booking Rate: <span className="text-white">{artist.bookingRate}</span>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-white/10">
        <Link to={`/artist/${artist.id}`}>
          <Button className="w-full">
            View Profile
            <ChevronRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
};

// Helper function to get art form icon
const getArtFormIcon = (artForm: string) => {
  switch(artForm) {
    case "singer": return "🎤";
    case "dancer": return "💃";
    case "instrumentalist": return "🎵";
    case "comedian": return "😂";
    case "actor": return "🎭";
    default: return "🎪";
  }
};

export default IndianArtists;
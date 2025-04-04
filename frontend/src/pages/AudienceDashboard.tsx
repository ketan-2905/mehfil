
import { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Star, Clock, Calendar, MapPin, Search, Filter, ChevronRight, CheckCircle, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import ComedianLeaderboard from "@/components/ComedianLeaderboard";
import { useDataStore, Comedian } from "@/services/DataService";
import RateComedian from "@/components/RateComedian";
import CheckInModal from "@/components/modals/CheckIn";

const AudienceDashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const comedians = useDataStore(state => state.comedians);
  const [checkInPopup, setCheckInPopup] = useState<{show: boolean, ticketId?: number, event?: string}>({show: false});
  const [checkedInTickets, setCheckedInTickets] = useState<number[]>([]);
  
  const upcomingTickets = [
    {
      id: 1,
      event: "Comedy Night Extravaganza",
      venue: "Hasee Adda", // Changed from "The Laughing Pint"
      date: "Oct 15, 2023",
      time: "8:00 PM",
      ticketCount: 2,
    },
    {
      id: 2,
      event: "Improv Showcase",
      venue: "Comedy Cellar",
      date: "Oct 22, 2023",
      time: "7:30 PM",
      ticketCount: 1,
    },
  ];

  const recommendedEvents = [
    {
      id: 1,
      title: "Stand-up Spotlight",
      venue: "Chuckles Comedy Club",
      location: "Chicago, IL",
      date: "Nov 5, 2023",
      time: "9:00 PM",
      price: "$25",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      comedianId: 1
    },
    {
      id: 2,
      title: "Comedy Battle Royale",
      venue: "The Stand",
      location: "Los Angeles, CA",
      date: "Nov 12, 2023",
      time: "8:00 PM",
      price: "$30",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      comedianId: 2
    },
    {
      id: 3,
      title: "Laugh Factory Presents",
      venue: "Laugh Factory",
      location: "Miami, FL",
      date: "Nov 18, 2023",
      time: "7:30 PM",
      price: "$35",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      comedianId: 3
    },
  ];

  // Find comedian by ID helper
  const findComedian = (id: number): Comedian | undefined => {
    return comedians.find(c => c.id === id);
  };

  // Handle check-in
  const handleCheckIn = (ticketId: number, event: string) => {
    setCheckInPopup({show: true, ticketId, event});
  };

  const confirmCheckIn = () => {
    if (checkInPopup.ticketId) {
      setCheckedInTickets([...checkedInTickets, checkInPopup.ticketId]);
      setCheckInPopup({show: false});
    }
  };

  const closeCheckInPopup = () => {
    setCheckInPopup({show: false});
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Audience Dashboard</h1>
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
              {["discover", "tickets", "following", "history", "settings"].map((tab) => (
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
          
          {/* My Tickets Section */}
          <AnimatedElement animation="slide-up" delay={300}>
            <GlassCard className="p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">My Tickets</h2>
                <Link to="/tickets" className="text-sm text-comedy-orange hover:underline flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              
              {upcomingTickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingTickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold">{ticket.event}</h3>
                          <p className="text-muted-foreground text-sm">{ticket.venue}</p>
                        </div>
                        <div className="bg-comedy-dark p-2 rounded-md text-comedy-orange text-sm font-medium">
                          {ticket.ticketCount} {ticket.ticketCount === 1 ? 'Ticket' : 'Tickets'}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {ticket.date}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {ticket.time}
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">View</Button>
                        {checkedInTickets.includes(ticket.id) ? (
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            disabled
                          >
                            <CheckCircle size={16} className="mr-2" />
                            Checked In
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleCheckIn(ticket.id, ticket.event)}
                          >
                            Check In
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white/5 rounded-lg">
                  <Ticket size={40} className="mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium mb-2">No Tickets Yet</h3>
                  <p className="text-muted-foreground mb-4">Find and book your first comedy show!</p>
                  <Link to="/events">
                    <Button>Browse Events</Button>
                  </Link>
                </div>
              )}
            </GlassCard>
          </AnimatedElement>
          
          {/* Comedian Leaderboard Section */}
          <div className="mb-8">
            <ComedianLeaderboard />
          </div>
          
          {/* Recommended Events */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <AnimatedElement animation="slide-up" delay={400}>
                <h2 className="text-xl font-bold">Recommended Events</h2>
              </AnimatedElement>
              <AnimatedElement animation="slide-up" delay={400} className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
                <Link to="/events" className="text-sm text-comedy-orange hover:underline flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </AnimatedElement>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedEvents.map((event, index) => (
                <AnimatedElement key={event.id} animation="slide-up" delay={500 + (index * 100)}>
                  <GlassCard className="overflow-hidden h-full flex flex-col">
                    <div 
                      className="h-48 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${event.image})` }}
                    ></div>
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
                      </div>
                      {event.comedianId && findComedian(event.comedianId) && (
                        <div className="mb-4">
                          <p className="text-sm mb-1">Featuring:</p>
                          <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                            <span className="font-medium">{findComedian(event.comedianId)?.name}</span>
                            <RateComedian 
                              comedian={findComedian(event.comedianId)!} 
                              triggerComponent={
                                <Button size="sm" variant="outline">Rate</Button>
                              }
                            />
                          </div>
                        </div>
                      )}
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-medium">{event.price}</span>
                        <Button size="sm">Book Tickets</Button>
                      </div>
                    </div>
                  </GlassCard>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Check-in Popup */}
      {checkInPopup.show && <CheckInModal ticket={{id: "AAAAAAAAAAAAAA"}} onClose={() => setCheckInPopup({show: false})}/>}
      
      <Footer />
    </div>
  );
};

export default AudienceDashboard;

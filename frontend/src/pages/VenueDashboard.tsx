import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Users, DollarSign, Building2, Plus, ChevronRight, Search, X, Edit, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import { useDataStore } from "@/services/DataService";
import { toast } from "sonner";

const VenueDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  const [venueForm, setVenueForm] = useState({
    name: "",
    location: "",
    capacity: "",
    description: "",
    amenities: "",
    contactEmail: "",
    contactPhone: ""
  });
  const navigate = useNavigate();
  const showRequests = useDataStore(state => state.showRequests);
  const updateRequestStatus = useDataStore(state => state.updateRequestStatus);
  
  // Filter requests for this venue (mocked as venue ID 1)
  const venueRequests = showRequests.filter(req => 
    req.venueId === 1 && req.status === 'pending'
  );

  const handleApprove = (requestId: number) => {
    updateRequestStatus(requestId, 'approved');
    toast.success("Request approved!");
  };

  const handleDecline = (requestId: number) => {
    updateRequestStatus(requestId, 'rejected');
    toast.error("Request declined");
  };

  const handleManageEvent = (event: any) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };
  
  const handleAddVenue = () => {
    setShowAddVenueModal(true);
  };

  const closeAddVenueModal = () => {
    setShowAddVenueModal(false);
    setVenueForm({
      name: "",
      location: "",
      capacity: "",
      description: "",
      amenities: "",
      contactEmail: "",
      contactPhone: ""
    });
  };

  const handleVenueFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVenueForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVenueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Venue form submitted:", venueForm);
    
    // Add the new venue to the data store so it appears in performer dashboard
    const newVenue = {
      id: Date.now(), // Generate a temporary ID (in a real app, this would come from the backend)
      name: venueForm.name,
      location: venueForm.location,
      capacity: parseInt(venueForm.capacity) || 0,
      description: venueForm.description,
      amenities: venueForm.amenities.split(',').map(item => item.trim()),
      contactEmail: venueForm.contactEmail,
      contactPhone: venueForm.contactPhone,
      rating: 0,
      reviewCount: 0,
      image: "/images/venues/default-venue.jpg", // Default image
      isAvailable: true
    };
    
    // Add to the data store - assuming you have an addVenue method in your data store
    useDataStore.getState().addVenue(newVenue);
    
    toast.success("Venue added successfully!");
    closeAddVenueModal();
    
    // In a real app, you might refresh the venues list or navigate to the new venue
  };

  const stats = [
    {
      title: "Upcoming Shows",
      value: "12",
      icon: Calendar,
      color: "text-comedy-red",
    },
    {
      title: "Monthly Visitors",
      value: "1,240",
      icon: Users,
      color: "text-comedy-purple",
    },
    {
      title: "Revenue",
      value: "$8,420",
      icon: DollarSign,
      color: "text-comedy-orange",
    },
    {
      title: "Venue Rating",
      value: "4.8/5",
      icon: Building2,
      color: "text-comedy-magenta",
    },
  ];

  const upcomingShows = [
    {
      id: 1,
      title: "Friday Night Comedy",
      performer: "Priya Sharma", // Changed from any Western name if it existed
      date: "Oct 15, 2023",
      time: "8:00 PM",
      ticketsSold: 42,
      capacity: 60,
    },
    {
      id: 2,
      title: "Improv Showcase",
      performer: "Rajesh Kumar", // Changed from any Western name if it existed
      date: "Oct 22, 2023",
      time: "7:30 PM",
      ticketsSold: 28,
      capacity: 60,
    },
    {
      id: 3,
      title: "Stand-up Spotlight",
      performer: "Anjali Desai", // Changed from any Western name if it existed
      date: "Oct 29, 2023",
      time: "9:00 PM",
      ticketsSold: 52,
      capacity: 60,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Venue Manager Dashboard</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/artists')}
              >
                <Search size={16} className="mr-2" />
                Find Comedians
              </Button>
              <Button 
                size="sm"
                onClick={handleAddVenue}
              >
                <Plus size={16} className="mr-2" />
                Add Venue
              </Button>
            </AnimatedElement>
          </div>
          
          {/* Dashboard navigation */}
          <div className="mb-8 border-b border-white/10">
            <nav className="flex overflow-x-auto scrollbar-none">
              {["overview", "events", "venues", "performers", "analytics", "settings"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab 
                      ? "border-comedy-red text-white" 
                      : "border-transparent text-muted-foreground hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <AnimatedElement key={index} animation="slide-up" delay={300 + (index * 100)}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className={`${stat.color} bg-white/5 rounded-full p-3`}>
                      <stat.icon size={20} />
                    </div>
                    <span className="text-muted-foreground text-sm">This Month</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.title}</p>
                </GlassCard>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Shows */}
            <div className="lg:col-span-2">
              <AnimatedElement animation="slide-up" delay={500}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Upcoming Shows</h2>
                    <Link to="/events" className="text-sm text-comedy-red hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-white/10">
                    {upcomingShows.map((show) => (
                      <div key={show.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{show.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {show.date} • {show.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="bg-comedy-dark rounded-lg px-3 py-1 text-sm">
                            <span className="text-comedy-red">{show.ticketsSold}</span>
                            <span className="text-muted-foreground">/{show.capacity} tickets</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleManageEvent(show)}
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Plus size={16} className="mr-2" />
                      Schedule New Show
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
            </div>
            
            {/* Performer Requests */}
            <div>
              <AnimatedElement animation="slide-up" delay={600}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Performer Requests</h2>
                    <Link to="/requests" className="text-sm text-comedy-red hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  {venueRequests.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {venueRequests.map((request) => (
                        <div key={request.id} className="py-4">
                          <h3 className="font-medium">{request.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            By: {request.performerName} • {request.date} at {request.time}
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 bg-red-950/20 hover:bg-red-950/40 text-red-400 border-red-900/50"
                              onClick={() => handleDecline(request.id)}
                            >
                              Decline
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 bg-green-950/20 hover:bg-green-950/40 text-green-400 border-green-900/50"
                              onClick={() => handleApprove(request.id)}
                            >
                              Accept
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No pending requests</p>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Search size={16} className="mr-2" />
                      Find Comedians
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
              
              <AnimatedElement animation="slide-up" delay={700} className="mt-6">
                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar size={16} className="mr-2" />
                      Manage Calendar
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign size={16} className="mr-2" />
                      View Earnings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Building2 size={16} className="mr-2" />
                      Update Venue Info
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-comedy-darker border border-white/10 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Calendar size={16} />
                    <span>{selectedEvent.date}</span>
                    <Clock size={16} className="ml-2" />
                    <span>{selectedEvent.time}</span>
                  </div>
                </div>
                <button 
                  onClick={closeEventDetails}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-muted-foreground">Ticket Sales</h4>
                      <p className="text-xl font-semibold">
                        <span className="text-comedy-red">{selectedEvent.ticketsSold}</span>
                        <span className="text-muted-foreground">/{selectedEvent.capacity} tickets sold</span>
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground">Revenue</h4>
                      <p className="text-xl font-semibold">${selectedEvent.ticketsSold * 25}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground">Status</h4>
                      <div className="bg-green-950/20 text-green-400 px-3 py-1 rounded-full text-sm inline-block">
                        Active
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Edit size={16} className="mr-2" />
                        Edit Event Details
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users size={16} className="mr-2" />
                        Manage Attendees
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <DollarSign size={16} className="mr-2" />
                        Adjust Pricing
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Seating Chart</h3>
                  <div className="bg-comedy-dark rounded-lg p-4">
                    <div className="text-center mb-4 pb-2 border-b border-white/10">
                      <div className="text-sm text-muted-foreground">First Class ₹145.00</div>
                    </div>
                    
                    {/* Seating chart visualization - First Class */}
                    <div className="flex flex-col items-center mb-6">
                      {Array.from({ length: 5 }).map((_, rowIndex) => (
                        <div key={`row-first-${rowIndex}`} className="flex gap-2 mb-2">
                          {Array.from({ length: 10 }).map((_, seatIndex) => {
                            const isSold = Math.random() > 0.6;
                            return (
                              <div 
                                key={`seat-first-${rowIndex}-${seatIndex}`}
                                className={`w-4 h-4 rounded-full ${
                                  isSold 
                                    ? 'bg-gray-500' 
                                    : 'bg-transparent border border-white/30'
                                }`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center mb-4 pb-2 border-b border-white/10">
                      <div className="text-sm text-muted-foreground">Second Class ₹80.00</div>
                    </div>
                    
                    {/* Seating chart visualization - Second Class */}
                    <div className="flex flex-col items-center mb-6">
                      {Array.from({ length: 4 }).map((_, rowIndex) => (
                        <div key={`row-second-${rowIndex}`} className="flex gap-2 mb-2">
                          {Array.from({ length: 10 }).map((_, seatIndex) => {
                            const isSold = Math.random() > 0.4;
                            return (
                              <div 
                                key={`seat-second-${rowIndex}-${seatIndex}`}
                                className={`w-4 h-4 rounded-full ${
                                  isSold 
                                    ? 'bg-gray-500' 
                                    : 'bg-transparent border border-white/30'
                                }`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center items-center gap-6 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <span className="text-xs">Sold</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-transparent border border-white/30 rounded-full"></div>
                        <span className="text-xs">Available</span>
                      </div>
                    </div>
                    
                    <div className="text-center mt-6 pt-4 border-t border-white/10">
                      <div className="text-xs text-muted-foreground">All eyes this way please</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Venue Modal */}
      {showAddVenueModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-comedy-darker border border-white/10 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Add New Venue</h2>
                <button 
                  onClick={closeAddVenueModal}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleVenueSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Venue Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={venueForm.name}
                      onChange={handleVenueFormChange}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-red"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={venueForm.location}
                      onChange={handleVenueFormChange}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-red"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium mb-1">
                      Capacity
                    </label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={venueForm.capacity}
                      onChange={handleVenueFormChange}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-red"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={venueForm.description}
                      onChange={handleVenueFormChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-red"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="amenities" className="block text-sm font-medium mb-1">
                      Amenities
                    </label>
                    <input
                      type="text"
                      id="amenities"
                      name="amenities"
                      value={venueForm.amenities}
                      onChange={handleVenueFormChange}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-red"
                      placeholder="e.g. Parking, Food, Bar, Wheelchair Access"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={venueForm.contactEmail}
                        onChange={handleVenueFormChange}
                        className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-red"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="contactPhone"
                        name="contactPhone"
                        value={venueForm.contactPhone}
                        onChange={handleVenueFormChange}
                        className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-red"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-8">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={closeAddVenueModal}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Plus size={16} className="mr-2" />
                    Add Venue
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default VenueDashboard;

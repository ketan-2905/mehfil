
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, DollarSign, Star, Plus, ChevronRight, Search, Upload, Clock, Mic, Image, Video, FileText, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import SubmitShowRequest from "@/components/SubmitShowRequest";
import { useDataStore } from "@/services/DataService";
import { toast } from "sonner";

const PerformerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const showRequests = useDataStore(state => state.showRequests);
  const venues = useDataStore(state => state.venues);
  const applyToVenue = useDataStore(state => state.applyToVenue);
  
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [applicationForm, setApplicationForm] = useState({
    title: "",
    description: "",
    date: "",
    time: ""
  });
  
  // Add state for propose show modal
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [proposeForm, setProposeForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venueId: 0
  });
  
  const myRequests = showRequests.filter(req => req.performerId === 1); // Mock performer ID

  // Handle venue application
  const handleApply = (venue: any) => {
    setSelectedVenue(venue);
    setShowApplyModal(true);
  };
  
  const closeApplyModal = () => {
    setShowApplyModal(false);
    setSelectedVenue(null);
    setApplicationForm({
      title: "",
      description: "",
      date: "",
      time: ""
    });
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add handler for propose form changes
  const handleProposeFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProposeForm(prev => ({
      ...prev,
      [name]: name === 'venueId' ? parseInt(value) : value
    }));
  };
  
  // Add handler for propose form submission
  // Add this to the handleProposeSubmit function
  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Submitting proposal with venue ID:", proposeForm.venueId);
    
    // Use the applyToVenue function from your data store
    applyToVenue(
      proposeForm.venueId,
      1, // Replace with actual performer ID from auth context in a real app
      proposeForm.title,
      proposeForm.description,
      proposeForm.date,
      proposeForm.time
    );
    
    // Close modal and reset form
    setShowProposeModal(false);
    setProposeForm({
      title: '',
      description: '',
      date: '',
      time: '',
      venueId: 0
    });
    
    // Show success message
    toast.success("Show proposal submitted successfully!");
    
    // Log all requests after submission
    console.log("All show requests after submission:", showRequests);
  };
  
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVenue) return;
    
    applyToVenue(
      selectedVenue.id,
      1, // Mock performer ID
      applicationForm.title,
      applicationForm.description,
      applicationForm.date,
      applicationForm.time
    );
    
    toast.success(`Application submitted to ${selectedVenue.name}!`);
    closeApplyModal();
  };

  const stats = [
    {
      title: "Upcoming Shows",
      value: "5",
      icon: Calendar,
      color: "text-comedy-red",
    },
    {
      title: "Total Fans",
      value: "824",
      icon: Users,
      color: "text-comedy-purple",
    },
    {
      title: "Earnings",
      value: "$3,150",
      icon: DollarSign,
      color: "text-comedy-orange",
    },
    {
      title: "Rating",
      value: "4.9/5",
      icon: Star,
      color: "text-comedy-magenta",
    },
  ];

  const upcomingShows = [
    {
      id: 1,
      venue: "The Laughing Pint",
      location: "San Francisco, CA",
      date: "Oct 15, 2023",
      time: "8:00 PM",
      status: "confirmed",
    },
    {
      id: 2,
      venue: "Comedy Cellar",
      location: "New York, NY",
      date: "Oct 22, 2023",
      time: "7:30 PM",
      status: "confirmed",
    },
    {
      id: 3,
      venue: "Chuckles Comedy Club",
      location: "Chicago, IL",
      date: "Nov 5, 2023",
      time: "9:00 PM",
      status: "pending",
    },
  ];

  const mediaGallery = [
    { id: 1, type: "image", title: "Performance at Comedy Cellar", date: "Oct 15, 2023" },
    { id: 2, type: "video", title: "Stand-up Clip - Relationships", date: "Oct 10, 2023" },
    { id: 3, type: "image", title: "Promotional Photoshoot", date: "Sep 28, 2023" },
    { id: 4, type: "video", title: "5 Minute Set - Work Life", date: "Sep 20, 2023" },
  ];

  const venueOpportunities = [
    {
      id: 1,
      name: "The Stand",
      location: "Los Angeles, CA",
      date: "Nov 15, 2023",
      compensation: "$250",
    },
    {
      id: 2,
      name: "Laugh Factory",
      location: "Miami, FL",
      date: "Nov 22, 2023",
      compensation: "$300",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Performer Dashboard</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="flex gap-3">
              <Button variant="outline" size="sm">
                <Upload size={16} className="mr-2" />
                Upload Media
              </Button>
              <Button size="sm" onClick={() => setShowProposeModal(true)}>
                <Plus size={16} className="mr-2" />
                Propose Show
              </Button>
            </AnimatedElement>
          </div>
          
          {/* Dashboard navigation */}
          <div className="mb-8 border-b border-white/10">
            <nav className="flex overflow-x-auto scrollbar-none">
              {["overview", "shows", "proposals", "media", "profile", "analytics"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab 
                      ? "border-comedy-purple text-white" 
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
            {/* Upcoming Shows and Media Gallery - Left Column */}
            <div className="lg:col-span-2">
              <AnimatedElement animation="slide-up" delay={500}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Upcoming Shows</h2>
                    <Link to="/shows" className="text-sm text-comedy-purple hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-white/10">
                    {upcomingShows.map((show) => (
                      <div key={show.id} className="py-4">
                        <h3 className="font-medium">{show.venue}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {show.location}
                        </p>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-muted-foreground">
                            <Clock size={14} className="inline mr-1" />
                            {show.date}, {show.time}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            show.status === 'confirmed' 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {show.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">View Details</Button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedElement>
              
              <AnimatedElement animation="slide-up" delay={600} className="mt-6">
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Media Gallery</h2>
                    <Link to="/media" className="text-sm text-comedy-purple hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mediaGallery.map((item) => (
                      <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                        <div className="h-40 bg-comedy-darker flex items-center justify-center relative">
                          {item.type === "video" ? (
                            <Video size={32} className="text-comedy-purple" />
                          ) : (
                            <Image size={32} className="text-comedy-orange" />
                          )}
                          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            {item.type === "video" ? "Video" : "Image"}
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <Image size={16} className="mr-2" />
                      Upload Images
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Video size={16} className="mr-2" />
                      Upload Videos
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
            </div>
            
            {/* Right Column - My Show Requests and Venue Opportunities */}
            <div>
              {/* My Show Requests */}
              <AnimatedElement animation="slide-up" delay={600}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">My Show Requests</h2>
                  </div>
                  
                  {myRequests.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {myRequests.map((request) => (
                        <div key={request.id} className="py-4">
                          <h3 className="font-medium">{request.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {request.venueName}
                          </p>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-muted-foreground">
                              <Clock size={14} className="inline mr-1" />
                              {request.date}, {request.time}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              request.status === 'approved' 
                                ? 'bg-green-900/30 text-green-400' 
                                : request.status === 'rejected'
                                ? 'bg-red-900/30 text-red-400'
                                : 'bg-yellow-900/30 text-yellow-400'
                            }`}>
                              {request.status === 'approved' 
                                ? 'Approved' 
                                : request.status === 'rejected'
                                ? 'Rejected'
                                : 'Pending'}
                            </span>
                          </div>
                          <Button size="sm" variant="outline" className="w-full">View Details</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No requests submitted yet</p>
                      <Button className="mt-4" onClick={() => document.querySelector<HTMLButtonElement>('[data-testid="submit-show-request"]')?.click()}>
                        Submit Your First Request
                      </Button>
                    </div>
                  )}
                </GlassCard>
              </AnimatedElement>
              
              {/* Venue Opportunities */}
              <AnimatedElement animation="slide-up" delay={700} className="mt-6">
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Venue Opportunities</h2>
                    <Link to="/opportunities" className="text-sm text-comedy-purple hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  {venues.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {venues.map((venue) => (
                        <div key={venue.id} className="py-4">
                          <h3 className="font-medium">{venue.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {venue.location}
                          </p>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-muted-foreground">
                              <Clock size={14} className="inline mr-1" />
                              {new Date(Date.now() + venue.id * 86400000).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-comedy-orange">
                              ${Math.floor(200 + Math.random() * 200)}
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleApply(venue)}
                          >
                            Apply
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No opportunities found</p>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Search size={16} className="mr-2" />
                      Find More Venues
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
      
      {/* Application Modal */}
      {showApplyModal && selectedVenue && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-comedy-darker border border-white/10 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Apply to Perform</h2>
                  <p className="text-muted-foreground">{selectedVenue.name}</p>
                </div>
                <button 
                  onClick={closeApplyModal}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmitApplication}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Show Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={applicationForm.title}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-purple"
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
                      value={applicationForm.description}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-purple"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={applicationForm.date}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-purple"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium mb-1">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={applicationForm.time}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-purple"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-8">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={closeApplyModal}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Propose Show Modal */}
      {showProposeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-comedy-darker border border-white/10 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Propose a Show</h2>
                  <p className="text-muted-foreground">Fill out the details to submit your proposal</p>
                </div>
                <button 
                  onClick={() => setShowProposeModal(false)}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleProposeSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Show Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={proposeForm.title}
                      onChange={handleProposeFormChange}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-purple"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="venueId" className="block text-sm font-medium mb-1">
                      Venue
                    </label>
                    <select
                      id="venueId"
                      name="venueId"
                      value={proposeForm.venueId}
                      onChange={handleProposeFormChange}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-purple"
                      required
                    >
                      <option value="">Select a venue</option>
                      {venues.map(venue => (
                        <option key={venue.id} value={venue.id}>
                          {venue.name} - {venue.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Show Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={proposeForm.description}
                      onChange={handleProposeFormChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-purple"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={proposeForm.date}
                        onChange={handleProposeFormChange}
                        className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-purple"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium mb-1">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={proposeForm.time}
                        onChange={handleProposeFormChange}
                        className="w-full px-3 py-2 bg-comedy-dark border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-purple"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowProposeModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit Proposal</Button>
                  </div>
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

export default PerformerDashboard;

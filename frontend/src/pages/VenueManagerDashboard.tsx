import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, DollarSign, Star, Plus, ChevronRight, Search, Clock, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import { useDataStore } from "@/services/DataService";
import { toast } from "sonner";

const VenueManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const showRequests = useDataStore(state => state.showRequests);
  // Change this line to match the function name in DataService
  // Update this line to make sure we're using the correct function name
  const updateRequestStatus = useDataStore(state => state.updateRequestStatus);
  
  // Add a console log to debug the requests
  console.log("All show requests:", showRequests);
  console.log("Venue ID being used for filtering:", venueId);
  
  // Modify the filter to be more lenient for testing
  const venueRequests = showRequests.filter(req => {
    console.log(`Request ${req.id} venueId: ${req.venueId}, comparing with ${venueId}`);
    return req.venueId === venueId;
  });
  
  console.log("Filtered venue requests:", venueRequests);
  
  // Mock venue ID
  const venueId = 1;
  
  // Filter requests for this venue
  // Check how requests are being filtered
  const venueRequests = showRequests.filter(req => req.venueId === venueId);
  
  // Handle approve/reject actions
  const handleRequestAction = (requestId: number, status: 'approved' | 'rejected') => {
    // Update this line to use the correct function
    updateRequestStatus(requestId, status);
    
    toast.success(`Request ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
  };

  const stats = [
    {
      title: "Upcoming Shows",
      value: "8",
      icon: Calendar,
      color: "text-comedy-red",
    },
    {
      title: "Total Performers",
      value: "42",
      icon: Users,
      color: "text-comedy-purple",
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: DollarSign,
      color: "text-comedy-orange",
    },
    {
      title: "Rating",
      value: "4.8/5",
      icon: Star,
      color: "text-comedy-magenta",
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
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Create New Event
              </Button>
            </AnimatedElement>
          </div>
          
          {/* Dashboard navigation */}
          <div className="mb-8 border-b border-white/10">
            <nav className="flex overflow-x-auto scrollbar-none">
              {["overview", "shows", "requests", "performers", "settings", "analytics"].map((tab) => (
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
            {/* Left Column - Upcoming Shows */}
            <div className="lg:col-span-2">
              <AnimatedElement animation="slide-up" delay={500}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Upcoming Shows</h2>
                    <Link to="/venue-shows" className="text-sm text-comedy-purple hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-white/10">
                    {/* Show upcoming shows here */}
                  </div>
                </GlassCard>
              </AnimatedElement>
            </div>
            
            {/* Right Column - Performer Requests */}
            <div>
              <AnimatedElement animation="slide-up" delay={600}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Performer Requests</h2>
                    <Link to="/venue-requests" className="text-sm text-comedy-purple hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  {venueRequests.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {venueRequests.map((request) => (
                        <div key={request.id} className="py-4">
                          <h3 className="font-medium">{request.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            By: {request.performerName}
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
                          
                          {request.status === 'pending' && (
                            <div className="flex gap-2 mt-2">
                              <Button 
                                size="sm" 
                                className="w-1/2 bg-green-600 hover:bg-green-700"
                                onClick={() => handleRequestAction(request.id, 'approved')}
                              >
                                <Check size={16} className="mr-2" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                className="w-1/2 bg-red-600 hover:bg-red-700"
                                onClick={() => handleRequestAction(request.id, 'rejected')}
                              >
                                <X size={16} className="mr-2" />
                                Reject
                              </Button>
                            </div>
                          )}
                          
                          {request.status !== 'pending' && (
                            <Button size="sm" variant="outline" className="w-full mt-2">
                              View Details
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No performer requests yet</p>
                    </div>
                  )}
                </GlassCard>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VenueManagerDashboard;
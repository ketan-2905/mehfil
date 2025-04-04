import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, DollarSign, Building2, Plus, ChevronRight, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import { useDataStore } from "@/services/DataService";
import { toast } from "sonner";

const VenueDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
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
      date: "Oct 15, 2023",
      time: "8:00 PM",
      ticketsSold: 42,
      capacity: 60,
    },
    {
      id: 2,
      title: "Improv Showcase",
      date: "Oct 22, 2023",
      time: "7:30 PM",
      ticketsSold: 28,
      capacity: 60,
    },
    {
      id: 3,
      title: "Stand-up Spotlight",
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
              <Button variant="outline" size="sm">
                <Search size={16} className="mr-2" />
                Find Comedians
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Create Event
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
                          <Button variant="outline" size="sm">Manage</Button>
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
      
      <Footer />
    </div>
  );
};

export default VenueDashboard;

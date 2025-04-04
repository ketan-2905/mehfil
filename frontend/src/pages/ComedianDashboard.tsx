
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, DollarSign, Star, Plus, ChevronRight, Search, Upload, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

const ComedianDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Comedian Dashboard</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="flex gap-3">
              <Button variant="outline" size="sm">
                <Search size={16} className="mr-2" />
                Find Venues
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Propose Show
              </Button>
            </AnimatedElement>
          </div>
          
          {/* Dashboard navigation */}
          <div className="mb-8 border-b border-white/10">
            <nav className="flex overflow-x-auto scrollbar-none">
              {["overview", "gigs", "media", "analytics", "settings"].map((tab) => (
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
            {/* Upcoming Shows */}
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
                      <div key={show.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{show.venue}</h3>
                          <p className="text-sm text-muted-foreground">
                            {show.location} • {show.date} • {show.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`rounded-lg px-3 py-1 text-sm ${
                            show.status === 'confirmed' 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {show.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </span>
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Plus size={16} className="mr-2" />
                      Propose New Show
                    </Button>
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
                    <div className="relative w-full h-40 bg-comedy-darker rounded-lg overflow-hidden flex items-center justify-center">
                      <div className="text-white/50">
                        <Upload size={32} className="mx-auto mb-2" />
                        <span>Upload Video</span>
                      </div>
                    </div>
                    <div className="relative w-full h-40 bg-comedy-darker rounded-lg overflow-hidden flex items-center justify-center">
                      <div className="text-white/50">
                        <Upload size={32} className="mx-auto mb-2" />
                        <span>Upload Image</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Upload size={16} className="mr-2" />
                      Upload Media
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
            </div>
            
            {/* Venue Opportunities */}
            <div>
              <AnimatedElement animation="slide-up" delay={700}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Venue Opportunities</h2>
                    <Link to="/opportunities" className="text-sm text-comedy-purple hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  {venueOpportunities.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {venueOpportunities.map((opportunity) => (
                        <div key={opportunity.id} className="py-4">
                          <h3 className="font-medium">{opportunity.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {opportunity.location}
                          </p>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-muted-foreground">
                              <Clock size={14} className="inline mr-1" />
                              {opportunity.date}
                            </span>
                            <span className="text-comedy-orange">
                              {opportunity.compensation}
                            </span>
                          </div>
                          <Button size="sm" className="w-full">Apply</Button>
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
              
              <AnimatedElement animation="slide-up" delay={800} className="mt-6">
                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar size={16} className="mr-2" />
                      Manage Schedule
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign size={16} className="mr-2" />
                      View Payments
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Star size={16} className="mr-2" />
                      Update Profile
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

export default ComedianDashboard;

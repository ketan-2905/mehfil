
import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Users, FileCheck, MapPin, ChevronRight, Search, Plus, Clock, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

const LocationManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Venues",
      value: "4",
      icon: Building2,
      color: "text-comedy-orange",
    },
    {
      title: "Pending Events",
      value: "8",
      icon: FileCheck,
      color: "text-comedy-red",
    },
    {
      title: "Total Capacity",
      value: "1,240",
      icon: Users,
      color: "text-comedy-purple",
    },
    {
      title: "Upcoming Shows",
      value: "12",
      icon: CalendarDays,
      color: "text-comedy-magenta",
    },
  ];

  const venues = [
    {
      id: 1,
      name: "The Laughing Pint",
      location: "San Francisco, CA",
      capacity: 120,
      activeEvents: 4,
    },
    {
      id: 2,
      name: "Comedy Cellar",
      location: "New York, NY",
      capacity: 180,
      activeEvents: 6,
    },
    {
      id: 3,
      name: "Chuckles Comedy Club",
      location: "Chicago, IL",
      capacity: 110,
      activeEvents: 2,
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      title: "Late Night Laughs",
      comedian: "Sarah Johnson",
      venue: "The Laughing Pint",
      date: "Nov 15, 2023",
      time: "9:30 PM",
    },
    {
      id: 2,
      title: "Improv Madness",
      comedian: "Mike Rodriguez", 
      venue: "Comedy Cellar",
      date: "Nov 22, 2023",
      time: "8:00 PM",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Location Manager Dashboard</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="flex gap-3">
              <Button variant="outline" size="sm">
                <Search size={16} className="mr-2" />
                Search Venues
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Add Venue
              </Button>
            </AnimatedElement>
          </div>
          
          {/* Dashboard navigation */}
          <div className="mb-8 border-b border-white/10">
            <nav className="flex overflow-x-auto scrollbar-none">
              {["overview", "venues", "events", "capacity", "settings"].map((tab) => (
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
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <AnimatedElement key={index} animation="slide-up" delay={300 + (index * 100)}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className={`${stat.color} bg-white/5 rounded-full p-3`}>
                      <stat.icon size={20} />
                    </div>
                    <span className="text-muted-foreground text-sm">Total</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.title}</p>
                </GlassCard>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Venues List */}
            <div className="lg:col-span-2">
              <AnimatedElement animation="slide-up" delay={500}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">My Venues</h2>
                    <Link to="/venues" className="text-sm text-comedy-orange hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-white/10">
                    {venues.map((venue) => (
                      <div key={venue.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{venue.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin size={14} className="mr-1" />
                            {venue.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col text-right">
                            <span className="text-comedy-orange font-medium">{venue.capacity}</span>
                            <span className="text-xs text-muted-foreground">Capacity</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-comedy-purple font-medium">{venue.activeEvents}</span>
                            <span className="text-xs text-muted-foreground">Events</span>
                          </div>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Plus size={16} className="mr-2" />
                      Add New Venue
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
              
              <AnimatedElement animation="slide-up" delay={600} className="mt-6">
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Venue Capacity Overview</h2>
                  </div>
                  
                  {/* Simple capacity visualization */}
                  <div className="space-y-6">
                    {venues.map((venue) => (
                      <div key={venue.id}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{venue.name}</span>
                          <span className="text-sm text-muted-foreground">{venue.capacity} seats</span>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-comedy-orange rounded-full"
                            style={{ width: `${(venue.activeEvents * 20)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-end mt-1">
                          <span className="text-xs text-muted-foreground">
                            {venue.activeEvents * 20}% currently booked
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedElement>
            </div>
            
            {/* Event Requests */}
            <div>
              <AnimatedElement animation="slide-up" delay={700}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Event Requests</h2>
                    <Link to="/requests" className="text-sm text-comedy-orange hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  {pendingRequests.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {pendingRequests.map((request) => (
                        <div key={request.id} className="py-4">
                          <h3 className="font-medium">{request.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            By: {request.comedian}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            <span className="inline-flex items-center">
                              <Building2 size={14} className="mr-1" />
                              {request.venue}
                            </span>
                            <span className="inline-flex items-center ml-3">
                              <Clock size={14} className="mr-1" />
                              {request.date}, {request.time}
                            </span>
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 bg-red-950/20 hover:bg-red-950/40 text-red-400 border-red-900/50">Decline</Button>
                            <Button size="sm" className="flex-1 bg-green-950/20 hover:bg-green-950/40 text-green-400 border-green-900/50">Approve</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No pending requests</p>
                    </div>
                  )}
                </GlassCard>
              </AnimatedElement>
              
              <AnimatedElement animation="slide-up" delay={800} className="mt-6">
                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Building2 size={16} className="mr-2" />
                      Manage Venues
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarDays size={16} className="mr-2" />
                      View Calendar
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileCheck size={16} className="mr-2" />
                      Review Requests
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

export default LocationManagerDashboard;

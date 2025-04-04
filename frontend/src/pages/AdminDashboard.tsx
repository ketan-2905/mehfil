
import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Users, FileCheck, BarChart3, ChevronRight, Search, Filter, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Events",
      value: "124",
      icon: FileCheck,
      color: "text-comedy-red",
    },
    {
      title: "Users",
      value: "1,842",
      icon: Users,
      color: "text-comedy-purple",
    },
    {
      title: "Venues",
      value: "38",
      icon: Shield,
      color: "text-comedy-orange",
    },
    {
      title: "Comedians",
      value: "96",
      icon: BarChart3,
      color: "text-comedy-magenta",
    },
  ];

  const pendingEvents = [
    {
      id: 1,
      title: "Stand-up Spotlight",
      venue: "The Laughing Pint",
      comedian: "Sarah Johnson",
      date: "Nov 15, 2023",
      status: "pending",
    },
    {
      id: 2,
      title: "Comedy Battle Royale",
      venue: "Comedy Cellar",
      comedian: "Mike Rodriguez",
      date: "Nov 22, 2023",
      status: "pending",
    },
    {
      id: 3,
      title: "Improv Night",
      venue: "Chuckles Comedy Club",
      comedian: "Lisa Wong",
      date: "Nov 28, 2023",
      status: "pending",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "David Smith",
      role: "Audience",
      joined: "Oct 28, 2023",
    },
    {
      id: 2,
      name: "Jennifer Clark",
      role: "Comedian",
      joined: "Oct 25, 2023",
    },
    {
      id: 3,
      name: "The Comedy Club",
      role: "Venue",
      joined: "Oct 20, 2023",
    },
  ];

  const userActivityData = [
    { month: "Jun", value: 420 },
    { month: "Jul", value: 580 },
    { month: "Aug", value: 620 },
    { month: "Sep", value: 750 },
    { month: "Oct", value: 820 },
    { month: "Nov", value: 980 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Admin Dashboard</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="flex gap-3">
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Settings size={16} className="mr-2" />
                Settings
              </Button>
            </AnimatedElement>
          </div>
          
          {/* Dashboard navigation */}
          <div className="mb-8 border-b border-white/10">
            <nav className="flex overflow-x-auto scrollbar-none">
              {["overview", "events", "users", "venues", "analytics"].map((tab) => (
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
                    <span className="text-muted-foreground text-sm">Overall</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.title}</p>
                </GlassCard>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Approval */}
            <div className="lg:col-span-2">
              <AnimatedElement animation="slide-up" delay={500}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Event Approval</h2>
                    <Link to="/events" className="text-sm text-comedy-red hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-white/10">
                    {pendingEvents.map((event) => (
                      <div key={event.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {event.venue} • {event.comedian} • {event.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="bg-red-950/20 hover:bg-red-950/40 text-red-400 border-red-900/50">Reject</Button>
                          <Button size="sm" className="bg-green-950/20 hover:bg-green-950/40 text-green-400 border-green-900/50">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedElement>
              
              <AnimatedElement animation="slide-up" delay={600} className="mt-6">
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">User Activity</h2>
                  </div>
                  
                  {/* Simple analytics chart mockup */}
                  <div className="h-64 w-full">
                    <div className="h-full flex items-end justify-between gap-4">
                      {userActivityData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center w-full">
                          <div 
                            className="w-full bg-comedy-red rounded-t-sm transition-all hover:opacity-80"
                            style={{ 
                              height: `${(item.value / 1000) * 100}%`,
                              maxHeight: "100%"
                            }}
                          ></div>
                          <div className="mt-2 text-xs text-muted-foreground">{item.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right mt-4">
                    <span className="text-sm text-muted-foreground">New users per month</span>
                  </div>
                </GlassCard>
              </AnimatedElement>
            </div>
            
            {/* Recent Users */}
            <div>
              <AnimatedElement animation="slide-up" delay={700}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Recent Users</h2>
                    <Link to="/users" className="text-sm text-comedy-red hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-white/10">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Joined: {user.joined}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'Comedian' ? 'bg-comedy-purple/20 text-comedy-purple' :
                            user.role === 'Venue' ? 'bg-comedy-orange/20 text-comedy-orange' :
                            'bg-comedy-magenta/20 text-comedy-magenta'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Users size={16} className="mr-2" />
                      Manage Users
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
              
              <AnimatedElement animation="slide-up" delay={800} className="mt-6">
                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileCheck size={16} className="mr-2" />
                      Review Events
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users size={16} className="mr-2" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 size={16} className="mr-2" />
                      View Analytics
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

export default AdminDashboard;

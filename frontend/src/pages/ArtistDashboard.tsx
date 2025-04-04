
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, Image, Video, FileText, Calendar, Star, Upload, ChevronRight, Plus, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

const ArtistDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Submitted Events",
      value: "8",
      icon: FileText,
      color: "text-comedy-purple",
    },
    {
      title: "Approved Events",
      value: "5",
      icon: Calendar,
      color: "text-comedy-red",
    },
    {
      title: "Media Uploads",
      value: "12",
      icon: Image,
      color: "text-comedy-orange",
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      icon: Star,
      color: "text-comedy-magenta",
    },
  ];

  const mediaGallery = [
    { id: 1, type: "image", title: "Performance at Comedy Cellar", date: "Oct 15, 2023" },
    { id: 2, type: "video", title: "Stand-up Clip - Relationships", date: "Oct 10, 2023" },
    { id: 3, type: "image", title: "Promotional Photoshoot", date: "Sep 28, 2023" },
    { id: 4, type: "video", title: "5 Minute Set - Work Life", date: "Sep 20, 2023" },
  ];

  const submittedEvents = [
    {
      id: 1,
      title: "Weekend Laughs",
      venue: "The Laughing Pint",
      date: "Nov 18, 2023",
      time: "8:00 PM",
      status: "approved",
    },
    {
      id: 2,
      title: "Comedy Night Special",
      venue: "Comedy Cellar",
      date: "Nov 25, 2023",
      time: "7:30 PM",
      status: "pending",
    },
    {
      id: 3,
      title: "Improv Showcase",
      venue: "Chuckles Comedy Club",
      date: "Dec 2, 2023",
      time: "9:00 PM",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Artist Dashboard</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200} className="flex gap-3">
              <Button variant="outline" size="sm">
                <Upload size={16} className="mr-2" />
                Upload Media
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Submit Event
              </Button>
            </AnimatedElement>
          </div>
          
          {/* Dashboard navigation */}
          <div className="mb-8 border-b border-white/10">
            <nav className="flex overflow-x-auto scrollbar-none">
              {["overview", "events", "media", "profile", "settings"].map((tab) => (
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
                    <span className="text-muted-foreground text-sm">Current</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.title}</p>
                </GlassCard>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Media Gallery */}
            <div className="lg:col-span-2">
              <AnimatedElement animation="slide-up" delay={500}>
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
              
              <AnimatedElement animation="slide-up" delay={600} className="mt-6">
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Submit New Event Brief</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Title</label>
                      <input 
                        type="text" 
                        placeholder="Enter event title" 
                        className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-purple focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <input 
                          type="date" 
                          className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-purple focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Time</label>
                        <input 
                          type="time" 
                          className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-purple focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Venue</label>
                      <select 
                        className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-purple focus:border-transparent"
                      >
                        <option value="">Select a venue</option>
                        <option value="1">The Laughing Pint</option>
                        <option value="2">Comedy Cellar</option>
                        <option value="3">Chuckles Comedy Club</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Description</label>
                      <textarea 
                        rows={4}
                        placeholder="Describe your event" 
                        className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-purple focus:border-transparent"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Media Attachments</label>
                      <div className="border border-dashed border-white/20 rounded-lg p-4 text-center">
                        <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Drag & drop files here or click to browse</p>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <FileText size={16} className="mr-2" />
                      Submit Event Proposal
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
            </div>
            
            {/* Submitted Events */}
            <div>
              <AnimatedElement animation="slide-up" delay={700}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Submitted Events</h2>
                    <Link to="/submitted-events" className="text-sm text-comedy-purple hover:underline flex items-center">
                      View All <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-white/10">
                    {submittedEvents.map((event) => (
                      <div key={event.id} className="py-4">
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {event.venue}
                        </p>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-muted-foreground">
                            <Clock size={14} className="inline mr-1" />
                            {event.date}, {event.time}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            event.status === 'approved' 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {event.status === 'approved' ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">View Details</Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Plus size={16} className="mr-2" />
                      Submit New Event
                    </Button>
                  </div>
                </GlassCard>
              </AnimatedElement>
              
              <AnimatedElement animation="slide-up" delay={800} className="mt-6">
                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold mb-4">Artist Profile</h2>
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-comedy-darker mx-auto mb-4 flex items-center justify-center">
                      <Mic size={32} className="text-comedy-purple" />
                    </div>
                    <h3 className="font-bold text-lg">Your Name</h3>
                    <p className="text-sm text-muted-foreground">Stand-up Comedian</p>
                  </div>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Star size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar size={16} className="mr-2" />
                      View Calendar
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText size={16} className="mr-2" />
                      My Proposals
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

export default ArtistDashboard;

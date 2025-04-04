
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Laugh, Calendar, Mic, Ticket, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoleSelection from "@/components/RoleSelection";
import Button from "@/components/ui-components/Button";
import GlassCard from "@/components/ui-components/GlassCard";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: Calendar,
      title: "Seamless Booking",
      description: "Easy event scheduling and ticket management for venues and performing artists"
    },
    {
      icon: Laugh,
      title: "Talent Discovery",
      description: "Find venues or artists that match your style and performance preferences"
    },
    {
      icon: Mic,
      title: "Performance Analytics",
      description: "Track attendance, reviews, and engagement for your artistic shows"
    },
    {
      icon: Ticket,
      title: "Ticketing System",
      description: "Simple payment processing and digital ticket delivery for all performances"
    }
  ];

  const testimonials = [
    {
      quote: "Mehfil revolutionized how I find gigs and connect with venue owners for my performances.",
      author: "Sarah Johnson",
      role: "Performing Artist"
    },
    {
      quote: "We've increased our cultural show attendance by 40% since joining the platform.",
      author: "Michael Rodriguez",
      role: "Venue Manager"
    },
    {
      quote: "I never miss a performance now that I can easily find and book tickets through Mehfil.",
      author: "David Chen",
      role: "Art Enthusiast"
    }
  ];

  const upcomingEvents = [
    {
      title: "Cultural Night Extravaganza",
      venue: "The Artistic Stage",
      date: "October 15, 2023",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    },
    {
      title: "Performer Showcase",
      venue: "Rhythms Performance Club",
      date: "October 22, 2023",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    },
    {
      title: "Artistic Battle Royale",
      venue: "The Cultural Cellar",
      date: "November 5, 2023",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-comedy-dark to-comedy-darker" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedElement 
            animation="float" 
            className="absolute top-20 left-10 text-comedy-red opacity-10"
          >
            <Laugh size={120} />
          </AnimatedElement>
          <AnimatedElement 
            animation="float" 
            delay={1500}
            className="absolute bottom-40 right-20 text-comedy-purple opacity-10"
          >
            <Mic size={100} />
          </AnimatedElement>
          <AnimatedElement 
            animation="float" 
            delay={1000}
            className="absolute top-60 right-40 text-comedy-orange opacity-10"
          >
            <Ticket size={80} />
          </AnimatedElement>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <AnimatedElement animation="slide-up" className="inline-block">
              <span className="bg-white/10 text-comedy-red px-4 py-2 rounded-full text-sm font-medium">
                The Ultimate Performing Arts Marketplace
              </span>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-up" delay={200}>
              <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-6 leading-tight">
                Where <span className="text-comedy-red">Artists</span> Connect
              </h1>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-up" delay={400}>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Bringing together venues, performers, and audiences to create unforgettable live artistic experiences.
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-up" delay={600} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/events">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Events
                </Button>
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-comedy-dark">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="slide-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to connect, showcase, and experience live performances.
            </p>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedElement key={index} animation="slide-up" delay={300 + (index * 100)}>
                <GlassCard className="p-6 h-full flex flex-col items-center text-center">
                  <div className="rounded-full p-4 bg-white/5 text-comedy-purple mb-6">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
      
      {/* Role Selection Section */}
      <section className="py-20 bg-comedy-darker">
        <RoleSelection />
      </section>
      
      {/* Events Preview Section */}
      <section className="py-20 bg-comedy-dark">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="slide-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the hottest artist performances and secure your tickets today.
            </p>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <AnimatedElement key={index} animation="slide-up" delay={300 + (index * 100)}>
                <GlassCard className="overflow-hidden h-full flex flex-col">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${event.image})` }}
                  ></div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-comedy-red mb-1">{event.venue}</p>
                    <p className="text-muted-foreground mb-4">{event.date}</p>
                    <div className="mt-auto">
                      <Link to="/events" className="flex items-center text-comedy-purple hover:text-comedy-magenta transition-colors">
                        <span>Book Tickets</span>
                        <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <AnimatedElement animation="fade-in">
              <Link to="/events">
                <Button variant="outline">
                  View All Events
                </Button>
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-comedy-darker to-comedy-dark">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="slide-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join the growing community of talented artists and art enthusiasts.
            </p>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedElement key={index} animation="slide-up" delay={300 + (index * 100)}>
                <GlassCard className="p-6 h-full flex flex-col">
                  <div className="text-comedy-purple mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="italic mb-6">{testimonial.quote}</p>
                  <div className="mt-auto">
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </GlassCard>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-comedy-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-comedy-red/10 to-comedy-purple/10 opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedElement animation="slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Artistic Journey?</h2>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200}>
              <p className="text-xl text-muted-foreground mb-8">
                Whether you're a venue owner, performer, or art enthusiast, we've got the tools you need to elevate your artistic journey.
              </p>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={400} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?mode=signup">
                <Button size="lg">
                  Create Account
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

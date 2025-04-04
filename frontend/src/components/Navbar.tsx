
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./ui-components/Button";
import { Mic, Menu, X } from "lucide-react";
import AnimatedElement from "./ui-components/AnimatedElement";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-lg shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <AnimatedElement animation="fade-in" delay={300}>
          <Link to="/" className="flex items-center gap-2">
            <img src="/vena.png" alt="Vena logo" className="h-10"/>
            <span className="text-2xl font-bold">Mehfil</span>
          </Link>
        </AnimatedElement>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <AnimatedElement animation="slide-down" delay={400}>
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-comedy-red transition-colors"
            >
              Home
            </Link>
          </AnimatedElement>
          <AnimatedElement animation="slide-down" delay={500}>
            <Link 
              to="/venues" 
              className="text-sm font-medium hover:text-comedy-red transition-colors"
            >
              Venues
            </Link>
          </AnimatedElement>
          <AnimatedElement animation="slide-down" delay={600}>
            <Link 
              to="/artists" 
              className="text-sm font-medium hover:text-comedy-red transition-colors"
            >
              Artists
            </Link>
          </AnimatedElement>
          <AnimatedElement animation="slide-down" delay={700}>
            <Link 
              to="/events" 
              className="text-sm font-medium hover:text-comedy-red transition-colors"
            >
              Events
            </Link>
          </AnimatedElement>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <AnimatedElement animation="slide-down" delay={800}>
            <Link to="/auth?mode=login">
              <Button variant="ghost">Log In</Button>
            </Link>
          </AnimatedElement>
          <AnimatedElement animation="slide-down" delay={900}>
            <Link to="/auth?mode=signup">
              <Button>Sign Up</Button>
            </Link>
          </AnimatedElement>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl absolute top-full left-0 right-0 overflow-hidden animate-slide-down">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
            <Link 
              to="/" 
              className="text-lg font-medium py-2 hover:text-comedy-red transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/venues" 
              className="text-lg font-medium py-2 hover:text-comedy-red transition-colors"
            >
              Venues
            </Link>
            <Link 
              to="/comedians" 
              className="text-lg font-medium py-2 hover:text-comedy-red transition-colors"
            >
              Comedians
            </Link>
            <Link 
              to="/events" 
              className="text-lg font-medium py-2 hover:text-comedy-red transition-colors"
            >
              Events
            </Link>
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              <Link to="/auth?mode=login" className="w-full">
                <Button variant="outline" className="w-full">Log In</Button>
              </Link>
              <Link to="/auth?mode=signup" className="w-full">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

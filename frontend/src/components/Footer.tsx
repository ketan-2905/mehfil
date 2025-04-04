
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mic, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-comedy-darker mt-20 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mic size={24} className="text-comedy-red" />
              <span className="text-xl font-bold">Comedy Link</span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              Connecting comedians, venues, and audiences for unforgettable live comedy experiences.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors hover-glow">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors hover-glow">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors hover-glow">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/venues" className="text-muted-foreground hover:text-white transition-colors">
                  Venues
                </Link>
              </li>
              <li>
                <Link to="/comedians" className="text-muted-foreground hover:text-white transition-colors">
                  Comedians
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-white transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-white transition-colors">
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-comedy-red" />
                <span className="text-muted-foreground">123 Comedy Lane, Laughville</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-comedy-red" />
                <a href="mailto:info@comedylink.com" className="text-muted-foreground hover:text-white transition-colors">
                  info@comedylink.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-comedy-red" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Comedy Link. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

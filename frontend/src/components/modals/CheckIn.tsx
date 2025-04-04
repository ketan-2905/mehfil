import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";

interface CheckInModalProps {
  ticket: {
    id: string;
    event?: string;
    venue?: string;
    date?: string;
    time?: string;
  };
  onClose: () => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ ticket, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={modalRef}
        className="bg-comedy-darker p-6 rounded-xl border border-comedy-orange/20 shadow-xl max-w-md w-full mx-4 relative animate-in zoom-in-95 duration-150"
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="text-center pt-2">
          <h3 className="text-2xl font-bold mb-2 text-white">Check In</h3>
          
          {ticket.event && (
            <div className="mb-4">
              <p className="text-comedy-orange font-medium">{ticket.event}</p>
              {ticket.venue && <p className="text-white/70 text-sm">{ticket.venue}</p>}
              {ticket.date && ticket.time && (
                <p className="text-white/70 text-sm">{ticket.date} • {ticket.time}</p>
              )}
            </div>
          )}
          
          <div className="bg-white p-4 rounded-lg mb-6 shadow-inner">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=show-checkin-${ticket.id}`}
              alt="Check-in QR Code"
              className="w-48 h-48 mx-auto"
            />
          </div>
          
          <div className="bg-comedy-dark/70 p-3 rounded-lg mb-6 border border-comedy-orange/10">
            <p className="text-comedy-orange font-medium mb-1">Scan this QR code at the venue</p>
            <p className="text-white/70 text-sm">Have an amazing time at the show!</p>
          </div>
          
          <button 
            className="bg-comedy-orange text-white px-6 py-2 rounded-md hover:bg-comedy-orange/90 transition-colors w-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;

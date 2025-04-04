
import { ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import { useDataStore } from "@/services/DataService";
import { toast } from "sonner";

const PerformerRequests = () => {
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

  return (
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
  );
};

export default PerformerRequests;

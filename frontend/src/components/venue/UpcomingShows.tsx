
import { Plus, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

interface Show {
  id: number;
  title: string;
  date: string;
  time: string;
  ticketsSold: number;
  capacity: number;
}

const UpcomingShows = () => {
  const upcomingShows: Show[] = [
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
  );
};

export default UpcomingShows;

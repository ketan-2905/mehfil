
import { Building2, Calendar, DollarSign, Users } from "lucide-react";
import GlassCard from "@/components/ui-components/GlassCard";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

interface StatItem {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const VenueStats = () => {
  const stats: StatItem[] = [
    {
      title: "Upcoming Shows",
      value: "12",
      icon: Calendar,
      color: "text-comedy-red",
    },
    {
      title: "Monthly Visitors",
      value: "1,240",
      icon: Users,
      color: "text-comedy-purple",
    },
    {
      title: "Revenue",
      value: "$8,420",
      icon: DollarSign,
      color: "text-comedy-orange",
    },
    {
      title: "Venue Rating",
      value: "4.8/5",
      icon: Building2,
      color: "text-comedy-magenta",
    },
  ];

  return (
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
  );
};

export default VenueStats;


import { Building2, Calendar, DollarSign } from "lucide-react";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

const QuickActions = () => {
  return (
    <AnimatedElement animation="slide-up" delay={700} className="mt-6">
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Calendar size={16} className="mr-2" />
            Manage Calendar
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <DollarSign size={16} className="mr-2" />
            View Earnings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Building2 size={16} className="mr-2" />
            Update Venue Info
          </Button>
        </div>
      </GlassCard>
    </AnimatedElement>
  );
};

export default QuickActions;

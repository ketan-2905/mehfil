
import { Plus, Search } from "lucide-react";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <AnimatedElement animation="slide-up">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Venue Manager Dashboard</h1>
      </AnimatedElement>
      <AnimatedElement animation="slide-up" delay={200} className="flex gap-3">
        <Button variant="outline" size="sm">
          <Search size={16} className="mr-2" />
          Find Comedians
        </Button>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Create Event
        </Button>
      </AnimatedElement>
    </div>
  );
};

export default DashboardHeader;

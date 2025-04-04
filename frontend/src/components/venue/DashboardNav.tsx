
import { useState } from "react";

interface DashboardNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardNav = ({ activeTab, onTabChange }: DashboardNavProps) => {
  const tabs = ["overview", "events", "venues", "performers", "analytics", "settings"];

  return (
    <div className="mb-8 border-b border-white/10">
      <nav className="flex overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-3 font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab 
                ? "border-comedy-red text-white" 
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DashboardNav;

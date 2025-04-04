
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VenueDashboard from "./pages/VenueDashboard";
import PerformerDashboard from "./pages/PerformerDashboard";
import AudienceDashboard from "./pages/AudienceDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Venues from "./pages/Venues";
import IndianArtists from "./pages/IndianArtists";
import IndianEvents from "./pages/IndianEvents";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/artists" element={<IndianArtists />} />
          <Route path="/events" element={<IndianEvents />} />
          <Route path="/venue-dashboard" element={<VenueDashboard />} />
          <Route path="/performer-dashboard" element={<PerformerDashboard />} />
          <Route path="/audience-dashboard" element={<AudienceDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ChatbotWidget /> {/* Add this line */}
    </div>
  );
};

export default App;

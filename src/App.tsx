import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "@/context/BookingContext";
import { BottomNav } from "@/components/BottomNav";
import Index from "./pages/Index";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import ConcessionsPage from "./pages/ConcessionsPage";
import CheckoutPage from "./pages/CheckoutPage";
import TicketsPage from "./pages/TicketsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookingProvider>
        <Toaster />
        <Sonner 
          position="top-center" 
          toastOptions={{
            classNames: {
              toast: "glass-card border-border/50",
              title: "text-foreground",
              description: "text-muted-foreground",
            }
          }}
        />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/seats" element={<SeatSelectionPage />} />
              <Route path="/concessions" element={<ConcessionsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </BookingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { BookingProvider } from "@/context/BookingContext";
import { BottomNav } from "@/components/BottomNav";
import Index from "./pages/Index";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import ConcessionsPage from "./pages/ConcessionsPage";
import CheckoutPage from "./pages/CheckoutPage";
import TicketsPage from "./pages/TicketsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

// Profile Sub-Pages
import BookingHistoryPage from "./pages/profile/BookingHistoryPage";
import RewardsPage from "./pages/profile/RewardsPage";
import FavoritesPage from "./pages/profile/FavoritesPage";
import HelpPage from "./pages/profile/HelpPage";
import SettingsPage from "./pages/profile/SettingsPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import MovieManagement from "./pages/admin/MovieManagement";
import ShowtimeScheduler from "./pages/admin/ShowtimeScheduler";
import HallManagement from "./pages/admin/HallManagement";
import PricingManager from "./pages/admin/PricingManager";
import InventoryManager from "./pages/admin/InventoryManager";
import SeatLockManager from "./pages/admin/SeatLockManager";
import QRScanner from "./pages/admin/QRScanner";
import StaffManagement from "./pages/admin/StaffManagement";
import ShiftManagement from "./pages/admin/ShiftManagement";
import AuditLogViewer from "./pages/admin/AuditLogViewer";

const queryClient = new QueryClient();

// Layout wrapper to conditionally show BottomNav
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  // Hide bottom nav on pages with floating checkout footers
  const hideBottomNav = ['/seats', '/concessions', '/checkout'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/seats" element={<SeatSelectionPage />} />
        <Route path="/concessions" element={<ConcessionsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Profile Sub-Routes */}
        <Route path="/profile/booking-history" element={<BookingHistoryPage />} />
        <Route path="/profile/rewards" element={<RewardsPage />} />
        <Route path="/profile/favorites" element={<FavoritesPage />} />
        <Route path="/profile/help" element={<HelpPage />} />
        <Route path="/profile/settings" element={<SettingsPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/movies" element={<MovieManagement />} />
        <Route path="/admin/schedule" element={<ShowtimeScheduler />} />
        <Route path="/admin/halls" element={<HallManagement />} />
        <Route path="/admin/pricing" element={<PricingManager />} />
        <Route path="/admin/inventory" element={<InventoryManager />} />
        <Route path="/admin/operations/locks" element={<SeatLockManager />} />
        <Route path="/admin/operations/scanner" element={<QRScanner />} />
        <Route path="/admin/staff" element={<StaffManagement />} />
        <Route path="/admin/shifts" element={<ShiftManagement />} />
        <Route path="/admin/audit" element={<AuditLogViewer />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && !hideBottomNav && <BottomNav />}
    </div>
  );
}

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
          <AppContent />
        </BrowserRouter>
      </BookingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Settings, ChevronRight, LogOut, Gift, Star, History, HelpCircle } from "lucide-react";
import { currentUser } from "@/data/mockData";
import { MembershipCard } from "@/components/MembershipCard";

const ProfilePage = () => {
  const menuItems = [
    { icon: History, label: "Booking History", description: "View all your past bookings" },
    { icon: Gift, label: "My Rewards", description: "Redeem your points for gifts" },
    { icon: Star, label: "Favorites", description: "Movies you've saved" },
    { icon: HelpCircle, label: "Help & Support", description: "Get help with your bookings" },
    { icon: Settings, label: "Settings", description: "App preferences & notifications" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-dark border-b border-border/50">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground">Profile</h1>
          <button className="p-2 rounded-xl hover:bg-secondary/50 transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold text-lg text-foreground">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
          </div>
        </div>

        {/* Membership Card */}
        <section>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Membership</h3>
          <MembershipCard user={currentUser} />
        </section>

        {/* QR Code */}
        <section className="p-4 rounded-xl bg-card/50 border border-border/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Cinema Entry QR</h3>
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-white rounded-xl p-2 flex items-center justify-center">
              {/* Simple QR placeholder - would use a real QR library in production */}
              <div className="w-full h-full grid grid-cols-8 gap-0.5">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${Math.random() > 0.5 ? 'bg-background' : 'bg-transparent'}`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center font-mono">
              {currentUser.qrCode}
            </p>
            <p className="mt-1 text-xs text-muted-foreground text-center">
              Show this at the cinema gate
            </p>
          </div>
        </section>

        {/* Menu Items */}
        <section className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </section>

        {/* Logout */}
        <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-destructive/10 transition-colors text-destructive">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

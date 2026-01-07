import { Settings, LogOut, Gift, Star, History, HelpCircle, Crown, Ticket, Film, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/data/mockData";
import { MembershipCard } from "@/components/MembershipCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PageLayout, PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { StatCard } from "@/components/ui/stat-card";
import { MenuListItem } from "@/components/ui/menu-list-item";
import { SectionTitle } from "@/components/ui/section-title";

const ProfilePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: History, label: "Booking History", description: "View all your past bookings", iconColor: "text-primary", path: "/profile/booking-history" },
    { icon: Gift, label: "My Rewards", description: "Redeem your points for gifts", iconColor: "text-accent", path: "/profile/rewards" },
    { icon: Star, label: "Favorites", description: "Movies you've saved", iconColor: "text-primary", path: "/profile/favorites" },
    { icon: HelpCircle, label: "Help & Support", description: "Get help with your bookings", iconColor: "text-muted-foreground", path: "/profile/help" },
    { icon: Settings, label: "Settings", description: "App preferences & notifications", iconColor: "text-muted-foreground", path: "/profile/settings" },
  ];

  const stats = [
    { icon: Film, label: "Movies Watched", value: "24" },
    { icon: Ticket, label: "Tickets Booked", value: "32" },
    { icon: Star, label: "Reviews Given", value: "18" },
  ];

  // Settings button for custom header
  const settingsButton = (
    <button
      onClick={() => navigate("/profile/settings")}
      className="p-2 rounded-xl hover:bg-secondary/50 transition-colors active:scale-95"
    >
      <Settings className="w-5 h-5 text-muted-foreground" />
    </button>
  );

  return (
    <PageLayout
      title="Profile"
      showHeader={false}
      backgroundVariant="mixed"
    >
      <PageHeader title="Profile" rightContent={settingsButton} />

      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg neon-glow-purple">
              {currentUser.name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-lg">
              <Crown className="w-4 h-4 text-accent-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-foreground">
              {currentUser.name}
            </h2>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-semibold border border-accent/30">
                {currentUser.membershipTier} Member
              </span>
            </div>
          </div>
        </div>

        {/* Stats - Using StatCard Component */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>

        {/* Membership Card */}
        <section>
          <SectionTitle icon={Sparkles} variant="small">
            Membership
          </SectionTitle>
          <MembershipCard user={currentUser} />
        </section>

        {/* QR Code - Using SectionCard */}
        <SectionCard className="p-5">
          <SectionTitle variant="small" className="mb-4">
            Cinema Entry QR
          </SectionTitle>
          <div className="flex flex-col items-center">
            <div className="relative p-4 bg-white rounded-2xl shadow-lg">
              {/* QR Code Pattern */}
              <div className="w-36 h-36 grid grid-cols-9 gap-0.5">
                {Array.from({ length: 81 }).map((_, i) => {
                  const row = Math.floor(i / 9);
                  const col = i % 9;
                  const isCorner =
                    (row < 3 && col < 3) ||
                    (row < 3 && col > 5) ||
                    (row > 5 && col < 3);
                  const isFilled = isCorner || Math.random() > 0.5;

                  return (
                    <div
                      key={i}
                      className={cn("rounded-sm", isFilled ? "bg-background" : "bg-white")}
                    />
                  );
                })}
              </div>
              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <span className="font-display text-xs font-bold text-white">GX</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm font-mono text-foreground tracking-wider">
              {currentUser.qrCode}
            </p>
            <p className="mt-1 text-xs text-muted-foreground text-center">
              Show this at the cinema gate for quick entry
            </p>
          </div>
        </SectionCard>

        {/* Menu Items - Using MenuListItem Component */}
        <section className="space-y-2">
          {menuItems.map((item) => (
            <MenuListItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              description={item.description}
              iconClassName={item.iconColor}
              onClick={() => navigate(item.path)}
            />
          ))}
        </section>

        {/* Logout - Using MenuListItem Component */}
        <MenuListItem
          icon={LogOut}
          label="Log Out"
          variant="destructive"
          showChevron={false}
          onClick={() => {
            toast.success("Logged out successfully");
            navigate("/");
          }}
        />
      </div>
    </PageLayout>
  );
};

export default ProfilePage;

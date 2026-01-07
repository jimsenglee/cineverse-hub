import { Ticket, Calendar, Clock, MapPin, QrCode, Download, Sparkles } from "lucide-react";
import { bookingHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { PageLayout, PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { SectionTitle } from "@/components/ui/section-title";
import { EmptyState } from "@/components/ui/empty-state";

const TicketsPage = () => {
  const upcomingBookings = bookingHistory.filter((b) => b.status === "confirmed");
  const pastBookings = bookingHistory.filter((b) => b.status === "completed");

  // Custom header content
  const ticketCount = (
    <div className="flex items-center gap-2 text-sm text-primary">
      <Ticket className="w-4 h-4" />
      <span className="font-medium">{upcomingBookings.length} Active</span>
    </div>
  );

  return (
    <PageLayout title="My Tickets" showHeader={false} backgroundVariant="accent">
      <PageHeader title="My Tickets" rightContent={ticketCount} />

      <div className="p-4 space-y-6">
        {/* Upcoming */}
        <section>
          <SectionTitle icon={Sparkles}>Upcoming Shows</SectionTitle>
          {upcomingBookings.length === 0 ? (
            <SectionCard>
              <EmptyState
                icon={Ticket}
                title="No upcoming bookings"
                description="Book a movie from the home page to see your tickets here"
                actionLabel="Browse Movies"
                actionPath="/"
              />
            </SectionCard>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking, idx) => (
                <TicketCard key={booking.id} booking={booking} index={idx} />
              ))}
            </div>
          )}
        </section>

        {/* Past */}
        <section>
          <SectionTitle icon={Clock} className="[&_svg]:text-muted-foreground">
            Past Bookings
          </SectionTitle>
          {pastBookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No past bookings yet
            </p>
          ) : (
            <div className="space-y-3">
              {pastBookings.map((booking) => (
                <TicketCard key={booking.id} booking={booking} isPast />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
};

interface TicketCardProps {
  booking: (typeof bookingHistory)[0];
  isPast?: boolean;
  index?: number;
}

const TicketCard = ({ booking, isPast, index = 0 }: TicketCardProps) => {
  if (isPast) {
    return (
      <SectionCard className="flex gap-4 opacity-60">
        <img
          src={booking.posterUrl}
          alt={booking.movieTitle}
          className="w-14 h-20 rounded-lg object-cover grayscale"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground line-clamp-1">
            {booking.movieTitle}
          </h3>
          <div className="mt-1.5 space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {new Date(booking.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}{" "}
              • {booking.time}
            </p>
            <p className="text-xs text-muted-foreground">{booking.hall}</p>
          </div>
        </div>
      </SectionCard>
    );
  }

  return (
    <div
      className="animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 neon-border-purple">
        {/* Ticket Top */}
        <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-accent/10 p-4">
          <div className="flex gap-4">
            <div className="relative">
              <img
                src={booking.posterUrl}
                alt={booking.movieTitle}
                className="w-20 h-28 rounded-xl object-cover shadow-lg border border-border/50"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg neon-glow-purple">
                <Ticket className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-accent/20 text-accent text-xs font-medium border border-accent/30">
                  CONFIRMED
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground line-clamp-1">
                {booking.movieTitle}
              </h3>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span className="text-foreground">
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="text-foreground">{booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-foreground">{booking.hall}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cutout Decoration */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full" />

        {/* Dashed Line */}
        <div className="relative">
          <div className="absolute inset-x-6 top-0 border-t border-dashed border-border/50" />
        </div>

        {/* Ticket Bottom */}
        <div className="bg-card/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Seats
              </p>
              <p className="font-display text-lg font-bold text-primary mt-0.5">
                {booking.seats.join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors neon-border-purple">
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;

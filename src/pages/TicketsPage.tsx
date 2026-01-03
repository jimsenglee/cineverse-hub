import { Ticket, Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { bookingHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";

const TicketsPage = () => {
  const upcomingBookings = bookingHistory.filter(b => b.status === "confirmed");
  const pastBookings = bookingHistory.filter(b => b.status === "completed");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-dark border-b border-border/50">
        <div className="px-4 py-4">
          <h1 className="font-display text-xl font-bold text-foreground">My Tickets</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Upcoming */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Upcoming</h2>
          {upcomingBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl bg-card/30 border border-border/30">
              <Ticket className="w-12 h-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground text-center">No upcoming bookings</p>
              <p className="text-sm text-muted-foreground/70 text-center mt-1">
                Book a movie from the home page
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map(booking => (
                <TicketCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </section>

        {/* Past */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Past Bookings</h2>
          {pastBookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No past bookings</p>
          ) : (
            <div className="space-y-3">
              {pastBookings.map(booking => (
                <TicketCard key={booking.id} booking={booking} isPast />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

interface TicketCardProps {
  booking: typeof bookingHistory[0];
  isPast?: boolean;
}

const TicketCard = ({ booking, isPast }: TicketCardProps) => {
  return (
    <div className={cn(
      "flex gap-4 p-4 rounded-xl border transition-all duration-300",
      isPast 
        ? "bg-card/30 border-border/30 opacity-70" 
        : "bg-card/50 border-border/50 hover:border-primary/50 cursor-pointer"
    )}>
      <img
        src={booking.posterUrl}
        alt={booking.movieTitle}
        className="w-16 h-24 rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground line-clamp-1">{booking.movieTitle}</h3>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>{booking.hall}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20">
            {booking.seats.join(", ")}
          </span>
        </div>
      </div>
      {!isPast && (
        <ChevronRight className="w-5 h-5 text-muted-foreground self-center" />
      )}
    </div>
  );
};

export default TicketsPage;

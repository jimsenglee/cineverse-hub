import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Info, Sparkles } from "lucide-react";
import { getSeatsForHall, getSeatStatusForShowtime } from "@/data/mockData";
import { SeatGrid } from "@/components/SeatGrid";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { format } from "date-fns";
import { PageLayout, PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { StickyFooter } from "@/components/ui/sticky-footer";

const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const { movie, showtime, selectedSeats, toggleSeat, setSeatDetails, ticketTotal } =
    useBooking();

  useEffect(() => {
    if (!movie || !showtime) {
      navigate("/");
    }
  }, [movie, showtime, navigate]);

  const seats = useMemo(() => {
    if (!showtime) return [];
    return getSeatsForHall(showtime.hallId);
  }, [showtime]);

  const seatStatuses = useMemo(() => {
    if (!showtime) return [];
    return getSeatStatusForShowtime(showtime.id);
  }, [showtime]);

  useEffect(() => {
    setSeatDetails(seats);
  }, [selectedSeats, seats, setSeatDetails]);

  const selectedSeatLabels = useMemo(() => {
    return seats
      .filter((s) => selectedSeats.includes(s.id))
      .map((s) => `${s.row}${s.number}`)
      .join(", ");
  }, [seats, selectedSeats]);

  if (!movie || !showtime) return null;

  // Custom subtitle for header
  const headerSubtitle = (
    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
      <span className="flex items-center gap-1">
        <Calendar className="w-3 h-3 text-primary" />
        {format(new Date(showtime.date), "EEE, d MMM")}
      </span>
      <span className="text-border">|</span>
      <span className="flex items-center gap-1">
        <Clock className="w-3 h-3 text-primary" />
        {showtime.time}
      </span>
      <span className="text-border">|</span>
      <span className="flex items-center gap-1">
        <MapPin className="w-3 h-3 text-primary" />
        {showtime.hallName}
      </span>
    </div>
  );

  return (
    <PageLayout showHeader={false} backgroundVariant="subtle" bottomPadding="small">
      {/* Custom Header with movie details */}
      <PageHeader
        title={movie.title}
        showBackButton
        rightContent={headerSubtitle}
        className="[&_h1]:text-lg [&_h1]:truncate"
      />

      {/* Hall Type Badge */}
      <div className="flex justify-center py-4">
        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 neon-border-purple">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-semibold tracking-wide">
            {showtime.hallType} Experience
          </span>
        </div>
      </div>

      {/* Pricing Info - Using SectionCard */}
      <div className="px-4 mb-4">
        <SectionCard className="flex items-center justify-center gap-6 p-3">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Standard</p>
            <p className="text-sm font-semibold text-foreground">
              RM {showtime.price}
            </p>
          </div>
          <div className="w-px h-8 bg-border/50" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground">VIP</p>
            <p className="text-sm font-semibold text-primary">
              RM {(showtime.price * 1.5).toFixed(0)}
            </p>
          </div>
          <div className="w-px h-8 bg-border/50" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Twin</p>
            <p className="text-sm font-semibold text-accent">
              RM {(showtime.price * 2.5).toFixed(0)}
            </p>
          </div>
        </SectionCard>
      </div>

      {/* Seat Grid */}
      <div className="w-full overflow-x-auto hide-scrollbar px-2">
        <SeatGrid
          seats={seats}
          seatStatuses={seatStatuses}
          selectedSeats={selectedSeats}
          onSeatSelect={toggleSeat}
        />
      </div>

      {/* Tip */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 mt-4">
        <Info className="w-4 h-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Tap a seat to select. Scroll left/right for more seats.
        </p>
      </div>

      {/* Footer */}
      <StickyFooter visible={selectedSeats.length > 0}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"}{" "}
              Selected
            </p>
            <p className="text-sm font-medium text-foreground">{selectedSeatLabels}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="font-display text-2xl font-bold text-accent neon-text-gold">
              RM {ticketTotal.toFixed(2)}
            </p>
          </div>
        </div>
        <Button
          variant="cinema"
          size="xl"
          className="w-full"
          onClick={() => navigate("/concessions")}
        >
          Continue to Add-ons
        </Button>
      </StickyFooter>
    </PageLayout>
  );
};

export default SeatSelectionPage;

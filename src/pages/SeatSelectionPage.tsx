import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { getSeatsForHall, getSeatStatusForShowtime, seatLayouts } from "@/data/mockData";
import { SeatGrid } from "@/components/SeatGrid";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { format } from "date-fns";

const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const { movie, showtime, selectedSeats, toggleSeat, setSeatDetails, ticketTotal } = useBooking();

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
      .filter(s => selectedSeats.includes(s.id))
      .map(s => `${s.row}${s.number}`)
      .join(", ");
  }, [seats, selectedSeats]);

  if (!movie || !showtime) return null;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-dark border-b border-border/50">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="font-display text-lg font-bold text-foreground line-clamp-1">
                {movie.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(showtime.date), "EEE, d MMM")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {showtime.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {showtime.hallName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hall Type Badge */}
      <div className="flex justify-center py-3">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/30">
          {showtime.hallType} Experience
        </span>
      </div>

      {/* Seat Grid */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="min-w-[360px] px-2">
          <SeatGrid
            seats={seats}
            seatStatuses={seatStatuses}
            selectedSeats={selectedSeats}
            onSeatSelect={toggleSeat}
          />
        </div>
      </div>

      {/* Footer */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-border/50 p-4 pb-safe animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">
                {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"} Selected
              </p>
              <p className="text-sm font-medium text-foreground">{selectedSeatLabels}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-display text-xl font-bold text-accent neon-text-gold">
                RM {ticketTotal.toFixed(2)}
              </p>
            </div>
          </div>
          <Button
            variant="cinema"
            size="lg"
            className="w-full"
            onClick={() => navigate("/concessions")}
          >
            Continue to Add-ons
          </Button>
        </div>
      )}
    </div>
  );
};

export default SeatSelectionPage;

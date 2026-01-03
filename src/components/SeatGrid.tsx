import { useMemo } from "react";
import { Seat, SeatStatus } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Armchair, Crown, Users, Accessibility } from "lucide-react";

interface SeatGridProps {
  seats: Seat[];
  seatStatuses: SeatStatus[];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}

export const SeatGrid = ({ seats, seatStatuses, selectedSeats, onSeatSelect }: SeatGridProps) => {
  const statusMap = useMemo(() => {
    const map = new Map<string, SeatStatus["status"]>();
    seatStatuses.forEach(s => map.set(s.seatId, s.status));
    return map;
  }, [seatStatuses]);

  const gridData = useMemo(() => {
    const maxX = Math.max(...seats.map(s => s.gridX)) + 1;
    const maxY = Math.max(...seats.map(s => s.gridY)) + 1;
    const seatMap = new Map<string, Seat>();
    seats.forEach(s => seatMap.set(`${s.gridX}-${s.gridY}`, s));
    
    const rows = Array.from({ length: maxY }, (_, y) => y + 1);
    const cols = Array.from({ length: maxX }, (_, x) => x + 1);
    
    return { rows, cols, seatMap, maxX };
  }, [seats]);

  const getSeatStyle = (seat: Seat, status: SeatStatus["status"], isSelected: boolean) => {
    if (isSelected) {
      return "bg-neon-green border-neon-green text-background neon-glow-green";
    }
    
    switch (status) {
      case "booked":
        return "bg-seat-booked border-seat-booked text-muted-foreground cursor-not-allowed opacity-50";
      case "locked":
        return "bg-seat-locked border-seat-locked text-destructive-foreground cursor-not-allowed";
      default:
        if (seat.type === "VIP") {
          return "border-seat-vip text-seat-vip hover:bg-seat-vip/20 cursor-pointer";
        }
        return "border-seat-available text-seat-available hover:bg-foreground/10 cursor-pointer";
    }
  };

  const getSeatIcon = (type: Seat["type"]) => {
    switch (type) {
      case "VIP":
        return Crown;
      case "Twin":
        return Users;
      case "Wheelchair":
        return Accessibility;
      default:
        return Armchair;
    }
  };

  const handleSeatClick = (seat: Seat) => {
    const status = statusMap.get(seat.id) || "available";
    if (status !== "available") return;
    onSeatSelect(seat.id);
  };

  // Get row labels
  const rowLabels = [...new Set(seats.map(s => s.row))].sort();

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Screen */}
      <div className="relative w-full max-w-xs">
        <div className="screen-curve h-8 w-full rounded-t-full" />
        <p className="text-center text-xs text-muted-foreground mt-2 font-medium tracking-widest">
          SCREEN
        </p>
      </div>

      {/* Seat Grid */}
      <div className="flex flex-col gap-1.5 px-2">
        {gridData.rows.map((y) => {
          const rowSeats = seats.filter(s => s.gridY === y);
          if (rowSeats.length === 0) return null;
          const rowLabel = rowSeats[0]?.row;
          
          return (
            <div key={y} className="flex items-center gap-1">
              {/* Row Label */}
              <span className="w-5 text-xs text-muted-foreground font-medium text-center">
                {rowLabel}
              </span>
              
              {/* Seats */}
              <div className="flex gap-1">
                {gridData.cols.map((x) => {
                  const seat = gridData.seatMap.get(`${x}-${y}`);
                  
                  if (!seat) {
                    // Check if this is the aisle gap
                    const midPoint = gridData.maxX / 2 + 1;
                    if (x === midPoint || x === midPoint + 1) {
                      return <div key={`gap-${x}`} className="w-2" />;
                    }
                    return <div key={`empty-${x}`} className="w-7 h-7" />;
                  }

                  const status = statusMap.get(seat.id) || "available";
                  const isSelected = selectedSeats.includes(seat.id);
                  const SeatIcon = getSeatIcon(seat.type);
                  
                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={status !== "available"}
                      className={cn(
                        "w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all duration-200",
                        seat.type === "Twin" && "w-14",
                        getSeatStyle(seat, status, isSelected)
                      )}
                      title={`${seat.row}${seat.number} - ${seat.type}`}
                    >
                      <SeatIcon className={cn("w-3.5 h-3.5", seat.type === "Twin" && "w-4 h-4")} />
                    </button>
                  );
                })}
              </div>
              
              {/* Row Label (right side) */}
              <span className="w-5 text-xs text-muted-foreground font-medium text-center">
                {rowLabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 border-seat-available" />
          <span className="text-xs text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-neon-green border-2 border-neon-green" />
          <span className="text-xs text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-seat-booked border-2 border-seat-booked opacity-50" />
          <span className="text-xs text-muted-foreground">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-seat-locked border-2 border-seat-locked" />
          <span className="text-xs text-muted-foreground">Locked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 border-seat-vip flex items-center justify-center">
            <Crown className="w-3 h-3 text-seat-vip" />
          </div>
          <span className="text-xs text-muted-foreground">VIP</span>
        </div>
      </div>
    </div>
  );
};

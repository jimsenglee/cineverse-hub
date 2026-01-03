import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CreditCard, Wallet, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const LOCK_DURATION = 5 * 60; // 5 minutes in seconds

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { 
    movie, 
    showtime, 
    selectedSeats, 
    seatDetails,
    concessions, 
    ticketTotal, 
    concessionTotal, 
    calculateTotal,
    clearBooking 
  } = useBooking();
  
  const [timeLeft, setTimeLeft] = useState(LOCK_DURATION);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!movie || !showtime || selectedSeats.length === 0) {
      navigate("/");
    }
  }, [movie, showtime, selectedSeats, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("Session expired! Your seats have been released.");
          clearBooking();
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, clearBooking]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handlePayment = async () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Payment successful! Enjoy your movie!");
    clearBooking();
    navigate("/tickets");
  };

  const seatLabels = seatDetails.map(s => `${s.row}${s.number}`).join(", ");

  if (!movie || !showtime) return null;

  const isLowTime = timeLeft < 60;

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
              <h1 className="font-display text-lg font-bold text-foreground">
                Checkout
              </h1>
            </div>
            {/* Timer */}
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
              isLowTime 
                ? "bg-destructive/20 text-destructive animate-pulse" 
                : "bg-secondary/50 text-muted-foreground"
            )}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Booking Summary */}
      <div className="p-4 space-y-4">
        {/* Movie Info */}
        <div className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-20 h-28 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-display font-bold text-foreground">{movie.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {showtime.hallName} ({showtime.hallType})
            </p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(showtime.date), "EEE, d MMM yyyy")} • {showtime.time}
            </p>
            <p className="text-sm text-primary font-medium mt-2">
              Seats: {seatLabels}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-3">
          <h4 className="font-semibold text-foreground">Order Summary</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {selectedSeats.length}x Movie Ticket{selectedSeats.length > 1 ? "s" : ""}
              </span>
              <span className="text-foreground">RM {ticketTotal.toFixed(2)}</span>
            </div>
            
            {concessions.map(c => (
              <div key={c.item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {c.quantity}x {c.item.name}
                </span>
                <span className="text-foreground">
                  RM {(c.item.price * c.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border/50 flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-display text-2xl font-bold text-accent neon-text-gold">
              RM {calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Payment Method</h4>
          
          <button
            onClick={() => setSelectedPayment("card")}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
              selectedPayment === "card"
                ? "bg-primary/10 border-primary neon-border-purple"
                : "bg-card/50 border-border/50 hover:border-primary/50"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">Credit / Debit Card</p>
              <p className="text-xs text-muted-foreground">Visa, Mastercard, AMEX</p>
            </div>
            {selectedPayment === "card" && (
              <Check className="w-5 h-5 text-primary" />
            )}
          </button>

          <button
            onClick={() => setSelectedPayment("tng")}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
              selectedPayment === "tng"
                ? "bg-primary/10 border-primary neon-border-purple"
                : "bg-card/50 border-border/50 hover:border-primary/50"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">Touch 'n Go eWallet</p>
              <p className="text-xs text-muted-foreground">Pay with TnG balance</p>
            </div>
            {selectedPayment === "tng" && (
              <Check className="w-5 h-5 text-primary" />
            )}
          </button>

          <button
            onClick={() => setSelectedPayment("grab")}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
              selectedPayment === "grab"
                ? "bg-primary/10 border-primary neon-border-purple"
                : "bg-card/50 border-border/50 hover:border-primary/50"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">GrabPay</p>
              <p className="text-xs text-muted-foreground">Pay with GrabPay wallet</p>
            </div>
            {selectedPayment === "grab" && (
              <Check className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-xs text-destructive/90">
            Your seats are temporarily locked. Complete payment within the time limit or your booking will be cancelled.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-border/50 p-4 pb-safe">
        <Button
          variant="cinema"
          size="xl"
          className="w-full"
          onClick={handlePayment}
          disabled={!selectedPayment || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `Pay RM ${calculateTotal().toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;

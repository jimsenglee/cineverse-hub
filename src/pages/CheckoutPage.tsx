import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CreditCard, Wallet, Check, AlertCircle, Shield, Sparkles, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PageLayout, PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { StickyFooter } from "@/components/ui/sticky-footer";

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
    clearBooking,
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
      setTimeLeft((prev) => {
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
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handlePayment = async () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Payment successful! Enjoy your movie!");
    clearBooking();
    navigate("/tickets");
  };

  const seatLabels = seatDetails.map((s) => `${s.row}${s.number}`).join(", ");

  if (!movie || !showtime) return null;

  const isLowTime = timeLeft < 60;

  // Timer badge for header
  const timerBadge = (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
        isLowTime
          ? "bg-destructive/20 text-destructive animate-pulse neon-glow-purple"
          : "bg-primary/10 text-primary border border-primary/30"
      )}
    >
      <Clock className="w-4 h-4" />
      <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
    </div>
  );

  return (
    <PageLayout showHeader={false} backgroundVariant="mixed" bottomPadding="small">
      {/* Custom Header with timer */}
      <PageHeader title="Checkout" showBackButton rightContent={timerBadge} />

      <div className="p-4 space-y-4">
        {/* Ticket Summary Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border/50">
          {/* Ticket Top */}
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 p-4 border-b border-dashed border-border/50">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Ticket className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                E-Ticket
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">
              {movie.title}
            </h3>
          </div>

          {/* Ticket Body */}
          <div className="bg-card/50 p-4">
            <div className="flex gap-4">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-20 h-28 rounded-xl object-cover shadow-lg border border-border/30"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Cinema:</span>
                  <span className="text-foreground font-medium">
                    {showtime.hallName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                    {showtime.hallType}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="text-foreground font-medium">
                    {format(new Date(showtime.date), "EEE, d MMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="text-foreground font-medium">{showtime.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Seats:</span>
                  <span className="text-primary font-semibold">{seatLabels}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cutout effect */}
          <div className="absolute left-0 top-[72px] w-4 h-8 bg-background rounded-r-full" />
          <div className="absolute right-0 top-[72px] w-4 h-8 bg-background rounded-l-full" />
        </div>

        {/* Order Summary - Using SectionCard */}
        <SectionCard className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Order Summary
          </h4>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {selectedSeats.length}x Movie Ticket{selectedSeats.length > 1 ? "s" : ""}
              </span>
              <span className="text-foreground font-medium">
                RM {ticketTotal.toFixed(2)}
              </span>
            </div>

            {concessions.map((c) => (
              <div key={c.item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {c.quantity}x {c.item.name}
                </span>
                <span className="text-foreground font-medium">
                  RM {(c.item.price * c.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border/30 flex justify-between items-center">
            <span className="font-semibold text-foreground">Total Amount</span>
            <span className="font-display text-2xl font-bold text-accent neon-text-gold">
              RM {calculateTotal().toFixed(2)}
            </span>
          </div>
        </SectionCard>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Select Payment Method</h4>

          <PaymentOption
            id="card"
            label="Credit / Debit Card"
            description="Visa, Mastercard, AMEX"
            icon={CreditCard}
            gradient="from-blue-500 via-purple-500 to-pink-500"
            selected={selectedPayment === "card"}
            onSelect={() => setSelectedPayment("card")}
          />

          <PaymentOption
            id="tng"
            label="Touch 'n Go eWallet"
            description="Pay with TnG balance"
            icon={Wallet}
            gradient="from-blue-600 to-blue-400"
            selected={selectedPayment === "tng"}
            onSelect={() => setSelectedPayment("tng")}
          />

          <PaymentOption
            id="grab"
            label="GrabPay"
            description="Pay with GrabPay wallet"
            icon={Wallet}
            gradient="from-green-500 to-green-600"
            selected={selectedPayment === "grab"}
            onSelect={() => setSelectedPayment("grab")}
          />
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 py-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Secured by 256-bit SSL encryption
          </p>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-destructive">Seats Locked</p>
            <p className="text-xs text-destructive/80 mt-0.5">
              Complete payment within {formatTime(timeLeft)} or your booking will be
              cancelled and seats released.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <StickyFooter>
        <Button
          variant="cinema"
          size="xl"
          className="w-full h-14 text-lg"
          onClick={handlePayment}
          disabled={!selectedPayment || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-3">
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing Payment...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Pay RM {calculateTotal().toFixed(2)}
            </span>
          )}
        </Button>
      </StickyFooter>
    </PageLayout>
  );
};

// Extracted PaymentOption component - DRY approach for payment methods
interface PaymentOptionProps {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  selected: boolean;
  onSelect: () => void;
}

const PaymentOption = ({
  label,
  description,
  icon: Icon,
  gradient,
  selected,
  onSelect,
}: PaymentOptionProps) => (
  <button
    onClick={onSelect}
    className={cn(
      "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300",
      selected
        ? "bg-primary/10 border-primary neon-border-purple"
        : "bg-card/30 border-border/50 hover:border-primary/50"
    )}
  >
    <div
      className={cn(
        "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
        gradient
      )}
    >
      <Icon className="w-7 h-7 text-white" />
    </div>
    <div className="flex-1 text-left">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    {selected && (
      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
        <Check className="w-4 h-4 text-primary-foreground" />
      </div>
    )}
  </button>
);

export default CheckoutPage;

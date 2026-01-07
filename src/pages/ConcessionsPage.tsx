import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Sparkles, Flame } from "lucide-react";
import { concessionItems, ConcessionItem } from "@/data/mockData";
import { ConcessionItemCard } from "@/components/ConcessionItem";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { FilterChips } from "@/components/FilterChips";
import { PageLayout, PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { StickyFooter } from "@/components/ui/sticky-footer";

const categories = ["All", "Combos", "Popcorn", "Drinks", "Snacks"];

const ConcessionsPage = () => {
  const navigate = useNavigate();
  const {
    movie,
    showtime,
    concessions,
    updateConcession,
    ticketTotal,
    concessionTotal,
    calculateTotal,
  } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!movie || !showtime) {
      navigate("/");
    }
  }, [movie, showtime, navigate]);

  const filteredItems =
    selectedCategory === "All"
      ? concessionItems
      : concessionItems.filter((item) => item.category === selectedCategory);

  const getQuantity = (itemId: string) => {
    return concessions.find((c) => c.item.id === itemId)?.quantity || 0;
  };

  const handleQuantityChange = (item: ConcessionItem, quantity: number) => {
    updateConcession(item, quantity);
  };

  const totalItems = concessions.reduce((sum, c) => sum + c.quantity, 0);

  if (!movie || !showtime) return null;

  // Custom right content for header
  const cartBadge =
    totalItems > 0 ? (
      <div className="relative p-2">
        <ShoppingBag className="w-6 h-6 text-foreground" />
        <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center px-1.5 neon-glow-purple">
          {totalItems}
        </span>
      </div>
    ) : undefined;

  return (
    <PageLayout showHeader={false} backgroundVariant="default" bottomPadding="small">
      {/* Custom Header with cart badge */}
      <PageHeader
        title="Food & Drinks"
        subtitle="Enhance your movie experience"
        showBackButton
        rightContent={cartBadge}
      />

      {/* Featured Banner */}
      <div className="px-4 pt-4">
        <SectionCard className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border-primary/20">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Combo Deals</p>
              <p className="text-xs text-muted-foreground">
                Save up to 20% with our combos
              </p>
            </div>
            <Flame className="w-5 h-5 text-accent animate-pulse" />
          </div>
        </SectionCard>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 border-b border-border/20">
        <FilterChips
          items={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Items List */}
      <div className="p-4 space-y-3">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="animate-fade-in"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <ConcessionItemCard
              item={item}
              quantity={getQuantity(item.id)}
              onQuantityChange={(qty) => handleQuantityChange(item, qty)}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <StickyFooter>
        {/* Price Breakdown */}
        <SectionCard className="space-y-2 mb-4 p-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Movie Tickets</span>
            <span className="text-foreground font-medium">
              RM {ticketTotal.toFixed(2)}
            </span>
          </div>
          {concessionTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <ShoppingBag className="w-3.5 h-3.5" />
                Food & Drinks
              </span>
              <span className="text-foreground font-medium">
                RM {concessionTotal.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-border/30">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-display text-xl font-bold text-accent neon-text-gold">
              RM {calculateTotal().toFixed(2)}
            </span>
          </div>
        </SectionCard>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 border-border/50 hover:bg-secondary/50"
            onClick={() => navigate("/checkout")}
          >
            Skip
          </Button>
          <Button
            variant="cinema"
            size="lg"
            className="flex-1"
            onClick={() => navigate("/checkout")}
          >
            {concessionTotal > 0 ? "Checkout" : "Continue"}
          </Button>
        </div>
      </StickyFooter>
    </PageLayout>
  );
};

export default ConcessionsPage;

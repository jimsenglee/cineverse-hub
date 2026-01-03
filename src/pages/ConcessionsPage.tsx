import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { concessionItems, ConcessionItem } from "@/data/mockData";
import { ConcessionItemCard } from "@/components/ConcessionItem";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { FilterChips } from "@/components/FilterChips";

const categories = ["All", "Combos", "Popcorn", "Drinks", "Snacks"];

const ConcessionsPage = () => {
  const navigate = useNavigate();
  const { movie, showtime, concessions, updateConcession, ticketTotal, concessionTotal, calculateTotal } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!movie || !showtime) {
      navigate("/");
    }
  }, [movie, showtime, navigate]);

  const filteredItems = selectedCategory === "All"
    ? concessionItems
    : concessionItems.filter(item => item.category === selectedCategory);

  const getQuantity = (itemId: string) => {
    return concessions.find(c => c.item.id === itemId)?.quantity || 0;
  };

  const handleQuantityChange = (item: ConcessionItem, quantity: number) => {
    updateConcession(item, quantity);
  };

  const totalItems = concessions.reduce((sum, c) => sum + c.quantity, 0);

  if (!movie || !showtime) return null;

  return (
    <div className="min-h-screen bg-background pb-40">
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
                Food & Drinks
              </h1>
              <p className="text-xs text-muted-foreground">Add some treats to your movie</p>
            </div>
            {totalItems > 0 && (
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-foreground" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="px-4 py-3 border-b border-border/30">
        <FilterChips
          items={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Items List */}
      <div className="p-4 space-y-3">
        {filteredItems.map(item => (
          <ConcessionItemCard
            key={item.id}
            item={item}
            quantity={getQuantity(item.id)}
            onQuantityChange={(qty) => handleQuantityChange(item, qty)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-border/50 p-4 pb-safe">
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tickets</span>
            <span className="text-foreground">RM {ticketTotal.toFixed(2)}</span>
          </div>
          {concessionTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Food & Drinks</span>
              <span className="text-foreground">RM {concessionTotal.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-border/50">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-display text-xl font-bold text-accent neon-text-gold">
              RM {calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
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
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConcessionsPage;

import { Minus, Plus } from "lucide-react";
import { ConcessionItem as ItemType } from "@/data/mockData";
import { Button } from "./ui/button";

interface ConcessionItemProps {
  item: ItemType;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const ConcessionItemCard = ({ item, quantity, onQuantityChange }: ConcessionItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
      <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center text-3xl">
        {item.imageUrl}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground">{item.name}</h4>
        <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
        <p className="text-sm font-semibold text-primary mt-1">RM {item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 rounded-full"
          onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
          disabled={quantity === 0}
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <span className="w-8 text-center font-semibold text-foreground">
          {quantity}
        </span>
        
        <Button
          variant="neon"
          size="icon"
          className="w-8 h-8 rounded-full"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

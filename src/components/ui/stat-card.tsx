import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    iconClassName?: string;
    className?: string;
}

/**
 * Reusable stat card for displaying statistics with icon.
 * Used in Profile, Dashboard, BookingHistory pages.
 */
export function StatCard({
    icon: Icon,
    label,
    value,
    iconClassName,
    className,
}: StatCardProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center p-4 rounded-2xl bg-card/30 border border-border/30",
                className
            )}
        >
            <Icon className={cn("w-5 h-5 text-primary mb-2", iconClassName)} />
            <p className="font-display text-xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground text-center mt-0.5">{label}</p>
        </div>
    );
}

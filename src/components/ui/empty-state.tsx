import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    actionLabel?: string;
    actionPath?: string;
    onAction?: () => void;
    className?: string;
    iconClassName?: string;
}

/**
 * Reusable empty state component for lists/sections with no content
 * Used in: TicketsPage, FavoritesPage, BookingHistoryPage
 */
export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionPath,
    onAction,
    className,
    iconClassName,
}: EmptyStateProps) {
    const navigate = useNavigate();

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else if (actionPath) {
            navigate(actionPath);
        }
    };

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-16 text-center",
                className
            )}
        >
            <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mb-4", iconClassName ? "bg-opacity-10" : "bg-primary/10")}>
                <Icon className={cn("w-10 h-10", iconClassName || "text-primary/50")} />
            </div>
            <p className="text-foreground font-medium">{title}</p>
            {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
            {(actionLabel && (actionPath || onAction)) && (
                <Button variant="neon" className="mt-4" onClick={handleAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}

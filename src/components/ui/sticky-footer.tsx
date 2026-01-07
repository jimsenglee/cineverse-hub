import * as React from "react";
import { cn } from "@/lib/utils";

interface StickyFooterProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

/**
 * Reusable sticky footer component for checkout/action bars
 * Used in: SeatSelectionPage, ConcessionsPage, CheckoutPage
 */
export function StickyFooter({
    children,
    className,
    visible = true,
}: StickyFooterProps) {
    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50 transition-all duration-500",
                visible ? "translate-y-0" : "translate-y-full",
                className
            )}
        >
            <div className="glass-dark border-t border-border/30 p-4 pb-8">
                {children}
            </div>
        </div>
    );
}

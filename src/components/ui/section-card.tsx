import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    noPadding?: boolean;
}

/**
 * Reusable card container with consistent styling.
 * Provides the standard card background, border, and rounded corners.
 */
const SectionCard = React.forwardRef<HTMLDivElement, SectionCardProps>(
    ({ className, children, noPadding = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-2xl bg-card/50 border border-border/50",
                    !noPadding && "p-4",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
SectionCard.displayName = "SectionCard";

export { SectionCard };

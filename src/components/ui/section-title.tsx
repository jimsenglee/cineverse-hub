import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SectionTitleProps {
    children: React.ReactNode;
    icon?: LucideIcon;
    variant?: "default" | "small";
    className?: string;
}

/**
 * Reusable section title component 
 * Variants:
 * - default: "text-lg font-semibold text-foreground mb-4" (for main sections)
 * - small: "text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider" (for subsections)
 */
export function SectionTitle({
    children,
    icon: Icon,
    variant = "default",
    className,
}: SectionTitleProps) {
    const baseClasses =
        variant === "default"
            ? "text-lg font-semibold text-foreground mb-4"
            : "text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider";

    return (
        <h2 className={cn(baseClasses, "flex items-center gap-2", className)}>
            {Icon && (
                <Icon
                    className={cn(
                        "w-4 h-4",
                        variant === "default" ? "w-5 h-5 text-primary" : ""
                    )}
                />
            )}
            {children}
        </h2>
    );
}

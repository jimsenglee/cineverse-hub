import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
    variant?: "default" | "accent" | "mixed" | "subtle";
    className?: string;
}

/**
 * Reusable animated background component with gradient blurs.
 * Used across all pages for consistent visual effects.
 * 
 * Variants:
 * - default: Primary gradient from top-right
 * - accent: Accent color gradient
 * - mixed: Both primary and accent
 * - subtle: Very light effect
 */
export function AnimatedBackground({
    variant = "default",
    className
}: AnimatedBackgroundProps) {
    return (
        <div className={cn("fixed inset-0 overflow-hidden pointer-events-none", className)}>
            {variant === "default" && (
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            )}

            {variant === "accent" && (
                <>
                    <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 left-0 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
                </>
            )}

            {variant === "mixed" && (
                <>
                    <div className="absolute -top-1/2 right-0 w-full h-full bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
                </>
            )}

            {variant === "subtle" && (
                <>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-gradient-to-b from-primary/10 to-transparent blur-3xl" />
                </>
            )}
        </div>
    );
}

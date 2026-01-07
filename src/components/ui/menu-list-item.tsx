import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuListItemProps {
    icon: LucideIcon;
    label: string;
    description?: string;
    iconClassName?: string;
    onClick?: () => void;
    showChevron?: boolean;
    rightContent?: React.ReactNode;
    variant?: "default" | "destructive";
    className?: string;
}

/**
 * Reusable menu list item for navigation rows.
 * Used in Profile, Settings, Help pages.
 */
export function MenuListItem({
    icon: Icon,
    label,
    description,
    iconClassName,
    onClick,
    showChevron = true,
    rightContent,
    variant = "default",
    className,
}: MenuListItemProps) {
    const isDestructive = variant === "destructive";

    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 active:scale-[0.98]",
                isDestructive
                    ? "hover:bg-destructive/10 text-destructive"
                    : "hover:bg-secondary/30",
                className
            )}
        >
            <div
                className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    isDestructive ? "bg-destructive/10" : "bg-secondary/50"
                )}
            >
                <Icon className={cn("w-5 h-5", iconClassName)} />
            </div>

            <div className="flex-1 text-left">
                <p className={cn("font-medium", isDestructive ? "" : "text-foreground")}>
                    {label}
                </p>
                {description && (
                    <p className={cn("text-xs", isDestructive ? "text-destructive/70" : "text-muted-foreground")}>
                        {description}
                    </p>
                )}
            </div>

            {rightContent && rightContent}

            {showChevron && !rightContent && (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
        </button>
    );
}

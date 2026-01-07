import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    showBackButton?: boolean;
    onBackClick?: () => void;
    rightContent?: React.ReactNode;
    /** Custom content to replace the default title - use for logos or complex headers */
    customTitle?: React.ReactNode;
    className?: string;
}

/**
 * Reusable page header component with consistent styling.
 * Features:
 * - Sticky positioning with glass effect
 * - Optional back button with navigation
 * - Optional right-side content slot
 * - Optional custom title slot for logos/complex headers
 * - Consistent styling across all pages
 */
export function PageHeader({
    title,
    subtitle,
    showBackButton = false,
    onBackClick,
    rightContent,
    customTitle,
    className,
}: PageHeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            navigate(-1);
        }
    };

    return (
        <header className={cn("sticky top-0 z-40 glass-dark border-b border-border/30", className)}>
            <div className="px-4 py-3">
                <div className="flex items-center gap-3">
                    {showBackButton && (
                        <button
                            onClick={handleBack}
                            className="p-2 -ml-2 rounded-xl hover:bg-secondary/50 transition-colors active:scale-95"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-foreground" />
                        </button>
                    )}

                    <div className="flex-1">
                        {customTitle ? (
                            customTitle
                        ) : (
                            <>
                                <h1 className="font-display text-xl font-bold text-foreground">
                                    {title}
                                </h1>
                                {subtitle && (
                                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                                )}
                            </>
                        )}
                    </div>

                    {rightContent && (
                        <div className="flex items-center gap-2">
                            {rightContent}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

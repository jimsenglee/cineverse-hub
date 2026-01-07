import { cn } from "@/lib/utils";
import { AnimatedBackground } from "./AnimatedBackground";
import { PageHeader } from "./PageHeader";

interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    showBackButton?: boolean;
    onBackClick?: () => void;
    headerRightContent?: React.ReactNode;
    showHeader?: boolean;
    backgroundVariant?: "default" | "accent" | "mixed" | "subtle" | "none";
    bottomPadding?: "none" | "small" | "large";
    className?: string;
}

/**
 * Master page layout component that provides consistent structure.
 * Combines: page wrapper, animated background, and header.
 * 
 * Use this for all customer-facing pages to ensure consistency.
 */
export function PageLayout({
    children,
    title,
    subtitle,
    showBackButton = false,
    onBackClick,
    headerRightContent,
    showHeader = true,
    backgroundVariant = "default",
    bottomPadding = "large",
    className,
}: PageLayoutProps) {
    const paddingClass = {
        none: "pb-0",
        small: "pb-6",
        large: "pb-24",
    }[bottomPadding];

    return (
        <div className={cn("min-h-screen bg-background", paddingClass, className)}>
            {/* Animated Background */}
            {backgroundVariant !== "none" && (
                <AnimatedBackground variant={backgroundVariant} />
            )}

            {/* Header */}
            {showHeader && title && (
                <PageHeader
                    title={title}
                    subtitle={subtitle}
                    showBackButton={showBackButton}
                    onBackClick={onBackClick}
                    rightContent={headerRightContent}
                />
            )}

            {/* Page Content */}
            {children}
        </div>
    );
}

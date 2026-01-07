import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
    title: string;
    value: string | number | React.ReactNode;
    icon: React.ReactNode;
    iconClassName?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string | number;
    trendLabel?: string;
    className?: string;
    valueClassName?: string;
}

export function KPICard({
    title,
    value,
    icon,
    iconClassName,
    trend,
    trendValue,
    trendLabel,
    className,
    valueClassName,
}: KPICardProps) {
    return (
        <Card className={className}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <div className={cn("text-2xl font-bold", valueClassName)}>
                            {value}
                        </div>
                        {trendValue !== undefined && (
                            <div className="flex items-center gap-1">
                                {trend === 'up' ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                                ) : trend === 'down' ? (
                                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                                ) : null}
                                <span
                                    className={cn("text-xs font-medium",
                                        trend === 'up' ? 'text-green-500' :
                                            trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                                    )}
                                >
                                    {typeof trendValue === 'number' && trendValue > 0 ? '+' : ''}{trendValue}% {trendLabel}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center", iconClassName || "bg-primary/10")}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

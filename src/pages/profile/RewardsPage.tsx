import { Gift, Star, Sparkles, Award, Zap } from "lucide-react";
import { currentUser } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageLayout } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { SectionTitle } from "@/components/ui/section-title";

const rewards = [
    { id: "1", name: "Free Popcorn", points: 500, icon: "🍿", description: "Large popcorn of your choice" },
    { id: "2", name: "Free Drink", points: 300, icon: "🥤", description: "Any regular size drink" },
    { id: "3", name: "Movie Ticket", points: 1000, icon: "🎬", description: "One standard movie ticket" },
    { id: "4", name: "VIP Upgrade", points: 750, icon: "⭐", description: "Upgrade to VIP seating" },
    { id: "5", name: "Combo Deal", points: 800, icon: "🎁", description: "Popcorn + drink combo" },
];

export default function RewardsPage() {
    const userPoints = currentUser.pointsBalance;
    const nextTierPoints = 5000;

    return (
        <PageLayout
            title="My Rewards"
            showBackButton
            backgroundVariant="accent"
        >
            <div className="p-4 space-y-6">
                {/* Points Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 border border-accent/30 p-6">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                                <Star className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Your Points</p>
                                <p className="font-display text-3xl font-bold text-accent neon-text-gold">
                                    {userPoints}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress to Platinum</span>
                                <span className="text-foreground">
                                    {userPoints} / {nextTierPoints}
                                </span>
                            </div>
                            <Progress value={(userPoints / nextTierPoints) * 100} className="h-2" />
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <SectionCard className="flex flex-col items-center p-3">
                        <Award className="w-5 h-5 text-primary mb-1" />
                        <p className="font-bold text-foreground">Gold</p>
                        <p className="text-xs text-muted-foreground">Tier</p>
                    </SectionCard>
                    <SectionCard className="flex flex-col items-center p-3">
                        <Gift className="w-5 h-5 text-accent mb-1" />
                        <p className="font-bold text-foreground">5</p>
                        <p className="text-xs text-muted-foreground">Rewards</p>
                    </SectionCard>
                    <SectionCard className="flex flex-col items-center p-3">
                        <Zap className="w-5 h-5 text-green-400 mb-1" />
                        <p className="font-bold text-foreground">2x</p>
                        <p className="text-xs text-muted-foreground">Points</p>
                    </SectionCard>
                </div>

                {/* Available Rewards */}
                <section>
                    <SectionTitle icon={Sparkles} className="[&_svg]:text-accent">
                        Redeem Rewards
                    </SectionTitle>
                    <div className="space-y-3">
                        {rewards.map((reward) => {
                            const canRedeem = userPoints >= reward.points;
                            return (
                                <SectionCard
                                    key={reward.id}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                                        {reward.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-foreground">{reward.name}</h3>
                                        <p className="text-xs text-muted-foreground">{reward.description}</p>
                                        <p className="text-sm font-semibold text-accent mt-1">
                                            {reward.points} points
                                        </p>
                                    </div>
                                    <Button
                                        variant={canRedeem ? "neon" : "outline"}
                                        size="sm"
                                        disabled={!canRedeem}
                                        className={!canRedeem ? "opacity-50" : ""}
                                    >
                                        Redeem
                                    </Button>
                                </SectionCard>
                            );
                        })}
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}

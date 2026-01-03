import { User } from "@/data/mockData";
import { Crown, Star, Gift, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface MembershipCardProps {
  user: User;
}

export const MembershipCard = ({ user }: MembershipCardProps) => {
  const getTierStyles = (tier: User["membershipTier"]) => {
    switch (tier) {
      case "Platinum":
        return "from-slate-300 via-slate-100 to-slate-400 text-slate-900";
      case "Gold":
        return "from-amber-400 via-yellow-300 to-amber-500 text-amber-900";
      case "Silver":
        return "from-gray-300 via-gray-100 to-gray-400 text-gray-800";
      default:
        return "from-amber-700 via-amber-600 to-amber-800 text-amber-100";
    }
  };

  const getTierIcon = (tier: User["membershipTier"]) => {
    switch (tier) {
      case "Platinum":
        return Zap;
      case "Gold":
        return Crown;
      case "Silver":
        return Star;
      default:
        return Gift;
    }
  };

  const TierIcon = getTierIcon(user.membershipTier);

  return (
    <div className={cn(
      "relative w-full aspect-[1.6] rounded-2xl p-6 overflow-hidden",
      "bg-gradient-to-br shadow-xl",
      getTierStyles(user.membershipTier)
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/30 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium opacity-80 tracking-wider">GALAXY CINEMAS</p>
            <h3 className="font-display text-xl font-bold mt-1">{user.membershipTier} Member</h3>
          </div>
          <TierIcon className="w-10 h-10 opacity-80" />
        </div>
        
        <div>
          <p className="font-display text-lg font-semibold tracking-wide">{user.name}</p>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-xs opacity-70">Member Since</p>
              <p className="text-sm font-medium">{new Date(user.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-70">Points Balance</p>
              <p className="font-display text-2xl font-bold">{user.pointsBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

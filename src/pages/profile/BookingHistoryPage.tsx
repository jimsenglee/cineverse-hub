import { Clock, Calendar, MapPin, Ticket, Search } from "lucide-react";
import { bookingHistory } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PageLayout } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { EmptyState } from "@/components/ui/empty-state";

export default function BookingHistoryPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const allBookings = bookingHistory;
    const filteredBookings = allBookings.filter(b =>
        b.movieTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <PageLayout
            title="Booking History"
            showBackButton
            backgroundVariant="default"
        >
            <div className="p-4 space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search bookings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Booking Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <SectionCard>
                        <p className="text-muted-foreground text-sm">Total Bookings</p>
                        <p className="font-display text-2xl font-bold text-foreground mt-1">
                            {allBookings.length}
                        </p>
                    </SectionCard>
                    <SectionCard>
                        <p className="text-muted-foreground text-sm">Total Spent</p>
                        <p className="font-display text-2xl font-bold text-accent mt-1">
                            RM {allBookings.reduce((sum, b) => sum + b.totalAmount, 0).toFixed(0)}
                        </p>
                    </SectionCard>
                </div>

                {/* Bookings List */}
                <div className="space-y-3">
                    {filteredBookings.length === 0 ? (
                        <EmptyState
                            icon={Ticket}
                            title="No bookings found"
                            description="Try a different search term"
                        />
                    ) : (
                        filteredBookings.map((booking) => (
                            <SectionCard key={booking.id} className="flex gap-4">
                                <img
                                    src={booking.posterUrl}
                                    alt={booking.movieTitle}
                                    className="w-16 h-24 rounded-xl object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-foreground line-clamp-1">
                                            {booking.movieTitle}
                                        </h3>
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${booking.status === "confirmed"
                                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                : booking.status === "completed"
                                                    ? "bg-secondary text-muted-foreground"
                                                    : "bg-destructive/20 text-destructive"
                                                }`}
                                        >
                                            {booking.status.charAt(0).toUpperCase() +
                                                booking.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            <span>
                                                {new Date(booking.date).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            <span>{booking.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <MapPin className="w-3 h-3" />
                                            <span>{booking.hall}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                                        <span className="text-xs text-muted-foreground">
                                            Seats: {booking.seats.join(", ")}
                                        </span>
                                        <span className="text-sm font-semibold text-primary">
                                            RM {booking.totalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </SectionCard>
                        ))
                    )}
                </div>
            </div>
        </PageLayout>
    );
}

import { Star, Heart, Trash2, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { movies } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PageLayout } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { EmptyState } from "@/components/ui/empty-state";

export default function FavoritesPage() {
    const navigate = useNavigate();
    // Mock favorites - first 3 movies from the list
    const [favorites, setFavorites] = useState(movies.slice(0, 3));

    const removeFavorite = (id: string) => {
        setFavorites(favorites.filter((m) => m.id !== id));
    };

    return (
        <PageLayout
            title="Favorites"
            subtitle={`${favorites.length} movies saved`}
            showBackButton
            backgroundVariant="default"
        >
            <div className="p-4">
                {favorites.length === 0 ? (
                    <EmptyState
                        icon={Heart}
                        title="No favorites yet"
                        description="Start saving movies you love"
                        actionLabel="Browse Movies"
                        actionPath="/"
                    />
                ) : (
                    <div className="space-y-4">
                        {favorites.map((movie) => (
                            <SectionCard key={movie.id} className="flex gap-4">
                                <div className="relative">
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="w-24 h-36 rounded-xl object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-xl">
                                        <Play className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-display text-lg font-bold text-foreground line-clamp-1">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Star className="w-4 h-4 text-accent fill-accent" />
                                        <span className="text-sm text-foreground">{movie.rating}</span>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-sm text-muted-foreground">
                                            {movie.duration} min
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                        {movie.synopsis}
                                    </p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Button size="sm" variant="neon" onClick={() => navigate("/")}>
                                            Book Now
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => removeFavorite(movie.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </SectionCard>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}

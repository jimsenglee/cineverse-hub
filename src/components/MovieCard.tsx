import { Star } from "lucide-react";
import { Movie } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  variant?: "poster" | "featured";
  onClick?: () => void;
}

export const MovieCard = ({ movie, variant = "poster", onClick }: MovieCardProps) => {
  if (variant === "featured") {
    return (
      <div
        onClick={onClick}
        className="relative w-72 h-96 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-xs font-medium border border-primary/30">
              {movie.genre[0]}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-accent/20 text-accent text-xs font-medium border border-accent/30">
              {movie.language}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-foreground font-medium">{movie.rating}</span>
            </span>
            <span>{movie.duration} min</span>
          </div>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-all duration-300" />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer group",
        "w-28 h-40 sm:w-32 sm:h-44"
      )}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-xs font-medium text-foreground line-clamp-2">{movie.title}</p>
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-background/80 backdrop-blur-sm">
        <Star className="w-3 h-3 text-accent fill-accent" />
        <span className="text-xs font-medium">{movie.rating}</span>
      </div>
    </div>
  );
};

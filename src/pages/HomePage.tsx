import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Play, X, ChevronDown, Sparkles } from "lucide-react";
import { movies, genres, languages, showtimes, getShowtimesForMovie } from "@/data/mockData";
import { MovieCard } from "@/components/MovieCard";
import { FilterChips } from "@/components/FilterChips";
import { DateSelector } from "@/components/DateSelector";
import { ShowtimeCard } from "@/components/ShowtimeCard";
import { useBooking } from "@/context/BookingContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const navigate = useNavigate();
  const { setMovie, setShowtime } = useBooking();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const genreMatch = selectedGenre === "All" || movie.genre.includes(selectedGenre);
      const languageMatch = selectedLanguage === "All" || movie.language === selectedLanguage;
      return genreMatch && languageMatch;
    });
  }, [selectedGenre, selectedLanguage]);

  const selectedMovie = movies.find(m => m.id === selectedMovieId);
  
  const movieShowtimes = useMemo(() => {
    if (!selectedMovieId) return [];
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    return getShowtimesForMovie(selectedMovieId, dateStr);
  }, [selectedMovieId, selectedDate]);

  const groupedShowtimes = useMemo(() => {
    const groups: Record<string, typeof showtimes> = {};
    movieShowtimes.forEach(st => {
      const key = `${st.hallName} (${st.hallType})`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(st);
    });
    return groups;
  }, [movieShowtimes]);

  const handleMovieClick = (movieId: string) => {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      setMovie(movie);
      setSelectedMovieId(movieId);
    }
  };

  const handleShowtimeClick = (showtime: typeof showtimes[0]) => {
    setShowtime(showtime);
    navigate("/seats");
  };

  const heroMovie = movies[heroIndex];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse-neon" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 glass-dark border-b border-border/30">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold neon-text-purple tracking-wider">
                GALAXY
              </h1>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="w-3 h-3 text-primary" />
                <span>KLCC, Kuala Lumpur</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
            <button className="p-3 rounded-2xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300 active:scale-95">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroMovie.posterUrl}
            alt={heroMovie.title}
            className="w-full h-full object-cover scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </div>
        
        <div className="relative h-full flex items-end p-4 pb-6">
          <div className="flex gap-4 items-end">
            <div className="relative group cursor-pointer" onClick={() => handleMovieClick(heroMovie.id)}>
              <img
                src={heroMovie.posterUrl}
                alt={heroMovie.title}
                className="w-28 h-40 rounded-xl object-cover shadow-2xl border-2 border-primary/30 neon-border-purple transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary-foreground ml-1" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-xs font-medium border border-primary/30 neon-border-purple">
                  {heroMovie.genre[0]}
                </span>
                <span className="flex items-center gap-1 text-accent text-sm font-semibold">
                  <Sparkles className="w-3 h-3" />
                  {heroMovie.rating}
                </span>
              </div>
              <h2 className="font-display text-xl font-bold text-foreground leading-tight">
                {heroMovie.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {heroMovie.duration} min • {heroMovie.language}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Indicators */}
        <div className="absolute bottom-3 right-4 flex gap-1.5">
          {movies.slice(0, 4).map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === heroIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      </section>

      {/* Now Showing Carousel */}
      <section className="py-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-lg font-semibold text-foreground">Now Showing</h2>
          <button className="text-sm text-primary font-medium">See All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-2">
          {movies.map((movie, idx) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant="featured"
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 py-3 space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Genre</p>
          <FilterChips
            items={genres}
            selected={selectedGenre}
            onSelect={setSelectedGenre}
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Language</p>
          <FilterChips
            items={languages}
            selected={selectedLanguage}
            onSelect={setSelectedLanguage}
            variant="secondary"
          />
        </div>
      </section>

      {/* All Movies Grid */}
      <section className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">All Movies</h2>
          <span className="text-sm text-muted-foreground">{filteredMovies.length} movies</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      </section>

      {/* Movie Details & Showtimes Sheet */}
      {selectedMovie && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedMovieId(null)}
          />
          
          {/* Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
            <div className="glass-dark border-t border-border/30 rounded-t-3xl max-h-[75vh] overflow-y-auto pb-24">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              {/* Movie Header */}
              <div className="px-4 pb-4 border-b border-border/30">
                <div className="flex gap-4">
                  <img
                    src={selectedMovie.posterUrl}
                    alt={selectedMovie.title}
                    className="w-24 h-36 rounded-xl object-cover shadow-lg border border-border/50"
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-foreground leading-tight">
                      {selectedMovie.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 text-accent font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        {selectedMovie.rating}
                      </span>
                      <span>•</span>
                      <span>{selectedMovie.duration} min</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {selectedMovie.genre.map(g => (
                        <span key={g} className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs border border-primary/20">
                          {g}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      An epic adventure that will keep you on the edge of your seat.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMovieId(null)}
                    className="w-8 h-8 rounded-full bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center justify-center transition-colors self-start"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Date Selector */}
              <div className="px-4 py-4 border-b border-border/20">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Select Date</p>
                <DateSelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
              </div>

              {/* Showtimes */}
              <div className="p-4 space-y-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Available Showtimes</p>
                
                {Object.keys(groupedShowtimes).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">No showtimes available</p>
                    <p className="text-sm text-muted-foreground/70">Try selecting a different date</p>
                  </div>
                ) : (
                  Object.entries(groupedShowtimes).map(([hallName, times]) => (
                    <div key={hallName} className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        {hallName}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {times.map(st => (
                          <ShowtimeCard
                            key={st.id}
                            showtime={st}
                            onClick={() => handleShowtimeClick(st)}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

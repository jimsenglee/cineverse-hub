import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { movies, genres, languages, showtimes, getShowtimesForMovie } from "@/data/mockData";
import { MovieCard } from "@/components/MovieCard";
import { FilterChips } from "@/components/FilterChips";
import { DateSelector } from "@/components/DateSelector";
import { ShowtimeCard } from "@/components/ShowtimeCard";
import { useBooking } from "@/context/BookingContext";
import { format } from "date-fns";

const HomePage = () => {
  const navigate = useNavigate();
  const { setMovie, setShowtime } = useBooking();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-dark border-b border-border/50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-display text-xl font-bold text-foreground neon-text-purple">
                Galaxy
              </h1>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>KLCC, Kuala Lumpur</span>
              </div>
            </div>
            <button className="p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Now Showing Carousel */}
      <section className="py-4">
        <h2 className="px-4 text-lg font-semibold text-foreground mb-3">Now Showing</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-2">
          {movies.map((movie) => (
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
      <section className="px-4 py-2 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Genre</p>
          <FilterChips
            items={genres}
            selected={selectedGenre}
            onSelect={setSelectedGenre}
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Language</p>
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
        <h2 className="text-lg font-semibold text-foreground mb-3">All Movies</h2>
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
        <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
          <div className="glass-dark border-t border-border/50 rounded-t-3xl max-h-[70vh] overflow-y-auto pb-24">
            {/* Movie Header */}
            <div className="sticky top-0 glass-dark p-4 border-b border-border/50">
              <div className="flex gap-4">
                <img
                  src={selectedMovie.posterUrl}
                  alt={selectedMovie.title}
                  className="w-20 h-28 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {selectedMovie.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span className="text-accent font-semibold">★ {selectedMovie.rating}</span>
                    <span>•</span>
                    <span>{selectedMovie.duration} min</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedMovie.genre.map(g => (
                      <span key={g} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs border border-primary/20">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMovieId(null)}
                  className="w-8 h-8 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Date Selector */}
            <div className="px-4 py-3 border-b border-border/30">
              <DateSelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            </div>

            {/* Showtimes */}
            <div className="p-4 space-y-4">
              {Object.keys(groupedShowtimes).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No showtimes available for this date
                </p>
              ) : (
                Object.entries(groupedShowtimes).map(([hallName, times]) => (
                  <div key={hallName}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
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
      )}
    </div>
  );
};

export default HomePage;

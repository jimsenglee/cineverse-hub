// Movies Table
export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  duration: number; // in minutes
  genre: string[];
  language: string;
  releaseDate: string;
  synopsis: string;
  director: string;
  cast: string[];
}

export const movies: Movie[] = [
  {
    id: "m1",
    title: "Neon Horizon",
    posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=600&fit=crop",
    rating: 8.7,
    duration: 148,
    genre: ["Sci-Fi", "Action"],
    language: "English",
    releaseDate: "2025-12-15",
    synopsis: "In a dystopian future where neon lights never dim, a rogue AI seeks to rewrite humanity's fate.",
    director: "Elena Voss",
    cast: ["Ryan Chen", "Maya Rodriguez", "Alex Okonkwo"]
  },
  {
    id: "m2",
    title: "Shadow Protocol",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop",
    rating: 9.1,
    duration: 156,
    genre: ["Thriller", "Action"],
    language: "English",
    releaseDate: "2025-12-20",
    synopsis: "An elite spy must infiltrate the world's most secure facility to prevent a global catastrophe.",
    director: "Marcus Wei",
    cast: ["Sarah Kim", "James Foster", "Priya Sharma"]
  },
  {
    id: "m3",
    title: "Eternal Echoes",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=600&fit=crop",
    rating: 8.4,
    duration: 132,
    genre: ["Romance", "Drama"],
    language: "Korean",
    releaseDate: "2025-12-18",
    synopsis: "Two souls separated by time find each other through mysterious letters that transcend decades.",
    director: "Park Ji-won",
    cast: ["Lee Min-ho", "Kim Soo-yeon", "Choi Woo-shik"]
  },
  {
    id: "m4",
    title: "Crimson Thunder",
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop",
    rating: 7.9,
    duration: 141,
    genre: ["Action", "Adventure"],
    language: "Mandarin",
    releaseDate: "2025-12-22",
    synopsis: "A legendary martial artist emerges from retirement to protect her village from an ancient evil.",
    director: "Zhang Wei",
    cast: ["Liu Yifei", "Donnie Yen", "Michelle Yeoh"]
  },
  {
    id: "m5",
    title: "Digital Dreams",
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1200&h=600&fit=crop",
    rating: 8.2,
    duration: 118,
    genre: ["Sci-Fi", "Mystery"],
    language: "English",
    releaseDate: "2025-12-25",
    synopsis: "When virtual reality becomes indistinguishable from real life, one programmer discovers a terrifying truth.",
    director: "Anna Kowalski",
    cast: ["Tom Blake", "Zoe Martinez", "David Park"]
  }
];

// Cinemas & Halls
export interface Hall {
  id: string;
  name: string;
  type: "Standard" | "IMAX" | "Dolby" | "4DX";
  totalSeats: number;
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
  halls: Hall[];
}

export const cinemas: Cinema[] = [
  {
    id: "c1",
    name: "Galaxy Cineplex",
    location: "KLCC, Kuala Lumpur",
    halls: [
      { id: "h1", name: "Hall 1", type: "IMAX", totalSeats: 120 },
      { id: "h2", name: "Hall 2", type: "Dolby", totalSeats: 80 },
      { id: "h3", name: "Hall 3", type: "Standard", totalSeats: 150 },
      { id: "h4", name: "Hall 4", type: "4DX", totalSeats: 60 }
    ]
  }
];

// Showtimes
export interface Showtime {
  id: string;
  movieId: string;
  hallId: string;
  hallName: string;
  hallType: string;
  date: string;
  time: string;
  price: number;
  vipPrice: number;
}

export const showtimes: Showtime[] = [
  // Neon Horizon
  { id: "s1", movieId: "m1", hallId: "h1", hallName: "Hall 1", hallType: "IMAX", date: "2026-01-03", time: "10:30", price: 25, vipPrice: 45 },
  { id: "s2", movieId: "m1", hallId: "h1", hallName: "Hall 1", hallType: "IMAX", date: "2026-01-03", time: "14:00", price: 25, vipPrice: 45 },
  { id: "s3", movieId: "m1", hallId: "h2", hallName: "Hall 2", hallType: "Dolby", date: "2026-01-03", time: "11:00", price: 22, vipPrice: 40 },
  { id: "s4", movieId: "m1", hallId: "h3", hallName: "Hall 3", hallType: "Standard", date: "2026-01-03", time: "19:30", price: 18, vipPrice: 32 },
  { id: "s5", movieId: "m1", hallId: "h1", hallName: "Hall 1", hallType: "IMAX", date: "2026-01-04", time: "10:30", price: 25, vipPrice: 45 },
  { id: "s6", movieId: "m1", hallId: "h4", hallName: "Hall 4", hallType: "4DX", date: "2026-01-04", time: "16:00", price: 35, vipPrice: 55 },
  
  // Shadow Protocol
  { id: "s7", movieId: "m2", hallId: "h1", hallName: "Hall 1", hallType: "IMAX", date: "2026-01-03", time: "13:00", price: 25, vipPrice: 45 },
  { id: "s8", movieId: "m2", hallId: "h2", hallName: "Hall 2", hallType: "Dolby", date: "2026-01-03", time: "16:30", price: 22, vipPrice: 40 },
  { id: "s9", movieId: "m2", hallId: "h3", hallName: "Hall 3", hallType: "Standard", date: "2026-01-03", time: "20:00", price: 18, vipPrice: 32 },
  { id: "s10", movieId: "m2", hallId: "h1", hallName: "Hall 1", hallType: "IMAX", date: "2026-01-05", time: "15:00", price: 25, vipPrice: 45 },
  
  // Eternal Echoes
  { id: "s11", movieId: "m3", hallId: "h3", hallName: "Hall 3", hallType: "Standard", date: "2026-01-03", time: "11:30", price: 18, vipPrice: 32 },
  { id: "s12", movieId: "m3", hallId: "h3", hallName: "Hall 3", hallType: "Standard", date: "2026-01-03", time: "17:00", price: 18, vipPrice: 32 },
  { id: "s13", movieId: "m3", hallId: "h2", hallName: "Hall 2", hallType: "Dolby", date: "2026-01-04", time: "14:30", price: 22, vipPrice: 40 },
  
  // Crimson Thunder
  { id: "s14", movieId: "m4", hallId: "h4", hallName: "Hall 4", hallType: "4DX", date: "2026-01-03", time: "12:00", price: 35, vipPrice: 55 },
  { id: "s15", movieId: "m4", hallId: "h1", hallName: "Hall 1", hallType: "IMAX", date: "2026-01-03", time: "21:00", price: 25, vipPrice: 45 },
  { id: "s16", movieId: "m4", hallId: "h4", hallName: "Hall 4", hallType: "4DX", date: "2026-01-05", time: "18:00", price: 35, vipPrice: 55 },
  
  // Digital Dreams
  { id: "s17", movieId: "m5", hallId: "h2", hallName: "Hall 2", hallType: "Dolby", date: "2026-01-03", time: "09:30", price: 22, vipPrice: 40 },
  { id: "s18", movieId: "m5", hallId: "h3", hallName: "Hall 3", hallType: "Standard", date: "2026-01-03", time: "15:00", price: 18, vipPrice: 32 },
  { id: "s19", movieId: "m5", hallId: "h2", hallName: "Hall 2", hallType: "Dolby", date: "2026-01-04", time: "20:30", price: 22, vipPrice: 40 },
];

// Seat Layout
export interface Seat {
  id: string;
  hallId: string;
  row: string;
  number: number;
  gridX: number;
  gridY: number;
  type: "Standard" | "VIP" | "Twin" | "Wheelchair";
}

// Generate seats for Hall 1 (IMAX - 120 seats, 10 rows x 12 seats)
const generateSeatsForHall = (hallId: string, rows: number, seatsPerRow: number, hasVipRows: boolean = false): Seat[] => {
  const seats: Seat[] = [];
  const rowLabels = "ABCDEFGHIJKLMNOP".split("");
  
  for (let r = 0; r < rows; r++) {
    for (let s = 1; s <= seatsPerRow; s++) {
      // Add gap in the middle (aisle)
      let gridX = s;
      if (s > seatsPerRow / 2) {
        gridX = s + 2; // Gap of 2 for aisle
      }
      
      let type: Seat["type"] = "Standard";
      if (hasVipRows && r >= rows - 2) {
        type = "VIP";
      }
      // Twin seats at the back corners
      if (r === rows - 1 && (s <= 2 || s > seatsPerRow - 2)) {
        type = "Twin";
      }
      // Wheelchair accessible in front
      if (r === 0 && (s === 1 || s === seatsPerRow)) {
        type = "Wheelchair";
      }
      
      seats.push({
        id: `${hallId}-${rowLabels[r]}${s}`,
        hallId,
        row: rowLabels[r],
        number: s,
        gridX,
        gridY: r + 1,
        type
      });
    }
  }
  return seats;
};

export const seatLayouts: Seat[] = [
  ...generateSeatsForHall("h1", 10, 12, true),  // IMAX
  ...generateSeatsForHall("h2", 8, 10, true),   // Dolby
  ...generateSeatsForHall("h3", 12, 12, false), // Standard
  ...generateSeatsForHall("h4", 6, 10, true),   // 4DX
];

// Showtime Seat Status
export interface SeatStatus {
  showtimeId: string;
  seatId: string;
  status: "available" | "booked" | "locked";
}

// Generate random booked/locked seats for showtimes
const generateSeatStatus = (): SeatStatus[] => {
  const statuses: SeatStatus[] = [];
  
  showtimes.forEach(showtime => {
    const hallSeats = seatLayouts.filter(s => s.hallId === showtime.hallId);
    
    hallSeats.forEach(seat => {
      // Random 30% booked, 5% locked
      const rand = Math.random();
      let status: SeatStatus["status"] = "available";
      if (rand < 0.30) {
        status = "booked";
      } else if (rand < 0.35) {
        status = "locked";
      }
      
      statuses.push({
        showtimeId: showtime.id,
        seatId: seat.id,
        status
      });
    });
  });
  
  return statuses;
};

export const showtimeSeatStatus: SeatStatus[] = generateSeatStatus();

// Concession Items
export interface ConcessionItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Popcorn" | "Drinks" | "Snacks" | "Combos";
  imageUrl: string;
}

export const concessionItems: ConcessionItem[] = [
  {
    id: "ci1",
    name: "Large Popcorn",
    description: "Buttery, freshly popped goodness",
    price: 12,
    category: "Popcorn",
    imageUrl: "🍿"
  },
  {
    id: "ci2",
    name: "Caramel Popcorn",
    description: "Sweet caramelized delight",
    price: 14,
    category: "Popcorn",
    imageUrl: "🍿"
  },
  {
    id: "ci3",
    name: "Large Coke",
    description: "Ice-cold refreshment",
    price: 8,
    category: "Drinks",
    imageUrl: "🥤"
  },
  {
    id: "ci4",
    name: "Iced Latte",
    description: "Premium coffee blend",
    price: 12,
    category: "Drinks",
    imageUrl: "☕"
  },
  {
    id: "ci5",
    name: "Nachos Grande",
    description: "Loaded with cheese & jalapeños",
    price: 15,
    category: "Snacks",
    imageUrl: "🧀"
  },
  {
    id: "ci6",
    name: "Hot Dog",
    description: "Classic cinema hot dog",
    price: 10,
    category: "Snacks",
    imageUrl: "🌭"
  },
  {
    id: "ci7",
    name: "Movie Combo",
    description: "Large popcorn + 2 drinks",
    price: 25,
    category: "Combos",
    imageUrl: "🎬"
  },
  {
    id: "ci8",
    name: "Premium Combo",
    description: "Large popcorn + 2 drinks + nachos",
    price: 38,
    category: "Combos",
    imageUrl: "⭐"
  }
];

// User & Membership
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  pointsBalance: number;
  memberSince: string;
  qrCode: string;
}

export const currentUser: User = {
  id: "u1",
  name: "Alex Chen",
  email: "alex.chen@email.com",
  phone: "+60 12-345 6789",
  membershipTier: "Gold",
  pointsBalance: 2450,
  memberSince: "2023-06-15",
  qrCode: "MEMBER-GOLD-2450-AC"
};

// Booking History
export interface Booking {
  id: string;
  movieTitle: string;
  posterUrl: string;
  date: string;
  time: string;
  hall: string;
  seats: string[];
  totalAmount: number;
  status: "confirmed" | "completed" | "cancelled";
}

export const bookingHistory: Booking[] = [
  {
    id: "b1",
    movieTitle: "Neon Horizon",
    posterUrl: movies[0].posterUrl,
    date: "2025-12-28",
    time: "19:30",
    hall: "Hall 1 (IMAX)",
    seats: ["E5", "E6"],
    totalAmount: 90,
    status: "completed"
  },
  {
    id: "b2",
    movieTitle: "Shadow Protocol",
    posterUrl: movies[1].posterUrl,
    date: "2025-12-25",
    time: "14:00",
    hall: "Hall 2 (Dolby)",
    seats: ["D7", "D8", "D9"],
    totalAmount: 126,
    status: "completed"
  }
];

// Helper functions
export const getMovieById = (id: string) => movies.find(m => m.id === id);
export const getShowtimeById = (id: string) => showtimes.find(s => s.id === id);
export const getShowtimesForMovie = (movieId: string, date?: string) => 
  showtimes.filter(s => s.movieId === movieId && (!date || s.date === date));
export const getSeatsForHall = (hallId: string) => seatLayouts.filter(s => s.hallId === hallId);
export const getSeatStatusForShowtime = (showtimeId: string) => 
  showtimeSeatStatus.filter(s => s.showtimeId === showtimeId);

export const genres = ["All", "Sci-Fi", "Action", "Thriller", "Romance", "Drama", "Adventure", "Mystery"];
export const languages = ["All", "English", "Korean", "Mandarin"];

/* CineMania - Tipos Globais */

export interface Movie {
  id: string;
  title: string;
  synopsis: string;
  poster: string;
  banner: string;
  trailer: string;
  duration: number;
  rating: number;
  genre: string[];
  director: string;
  cast: string[];
  releaseDate: string;
  classification: string;
  inTheaters: boolean;
  upcomingRelease: boolean;
}

export interface Session {
  id: string;
  movieId: string;
  roomId: string;
  date: string;
  time: string;
  availableSeats: number;
  totalSeats: number;
}

export interface Room {
  id: string;
  name: string;
  totalSeats: number;
  layout: string[][];
  isVIP: boolean;
  isAccessible: boolean;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  isVIP: boolean;
  isAccessible: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  seats: Seat[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Ticket {
  id: string;
  bookingId: string;
  movieTitle: string;
  roomName: string;
  sessionDate: string;
  sessionTime: string;
  seats: string[];
  qrCode: string;
  status: 'valid' | 'used' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  movieId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface PaymentMethod {
  type: 'card' | 'pix' | 'google_pay' | 'apple_pay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  pixKey?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalMovies: number;
  totalSessions: number;
  totalBookings: number;
  totalUsers: number;
  totalRevenue: number;
}

export interface BookingByDay {
  date: string;
  count: number;
}

export interface PopularMovie {
  movieId: string;
  title: string;
  bookings: number;
}

export interface RoomOccupancy {
  roomId: string;
  roomName: string;
  occupancy: number;
}
